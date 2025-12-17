/**
 * Automated Financial Data Updater
 *
 * This script fetches fresh financial data from FMP API and updates
 * company files with the latest ratings and raw metric values.
 *
 * Usage:
 *   npx tsx scripts/update-financial-data.ts           # Update all companies
 *   npx tsx scripts/update-financial-data.ts --dry-run # Preview changes without writing
 *   npx tsx scripts/update-financial-data.ts --ticker GEV  # Update single ticker
 *
 * Environment:
 *   FMP_API_KEY - Required. Your Financial Modeling Prep API key.
 *
 * Designed to be run by GitHub Actions weekly to create PRs with updated data.
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

const FMP_BASE_URL = 'https://financialmodelingprep.com/stable';
const RATE_LIMIT_MS = 250; // 4 requests per second max

// ═══════════════════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════════════════

interface FMPRatingsSnapshot {
  symbol: string;
  rating: string;
  overallScore: number;
  discountedCashFlowScore: number;
  returnOnEquityScore: number;
  returnOnAssetsScore: number;
  debtToEquityScore: number;
  priceToEarningsScore: number;
  priceToBookScore: number;
}

interface FMPKeyMetricsTTM {
  symbol: string;
  returnOnAssetsTTM: number;
  returnOnEquityTTM: number;
}

interface FMPRatiosTTM {
  symbol: string;
  priceToEarningsRatioTTM: number;
  priceToBookRatioTTM: number;
  debtToEquityRatioTTM: number;
}

interface FinancialRatings {
  rating: string;
  ratingScore: number;
  dcfScore: number;
  roeScore: number;
  roaScore: number;
  deScore: number;
  peScore: number;
  pbScore: number;
  roeValue?: number;
  roaValue?: number;
  deValue?: number;
  peValue?: number;
  pbValue?: number;
  source?: string;
  updated?: string;
}

interface CompanyUpdate {
  ticker: string;
  name: string;
  file: string;
  oldRatings: FinancialRatings | null;
  newRatings: FinancialRatings | null;
  status: 'updated' | 'unchanged' | 'no_data' | 'error' | 'skipped';
  error?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// FMP API Functions
// ═══════════════════════════════════════════════════════════════════════════

function getApiKey(): string {
  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) {
    console.error('Error: FMP_API_KEY environment variable not set');
    process.exit(1);
  }
  return apiKey;
}

async function fetchWithRetry<T>(url: string, retries = 3): Promise<T | null> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429) {
          // Rate limited - wait and retry
          console.log(`  Rate limited, waiting ${attempt * 2}s...`);
          await sleep(attempt * 2000);
          continue;
        }
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      await sleep(1000);
    }
  }
  return null;
}

async function getRatingsSnapshot(symbol: string): Promise<FMPRatingsSnapshot | null> {
  const apiKey = getApiKey();
  const url = `${FMP_BASE_URL}/ratings-snapshot?symbol=${encodeURIComponent(symbol)}&apikey=${apiKey}`;
  return fetchWithRetry(url);
}

async function getKeyMetricsTTM(symbol: string): Promise<FMPKeyMetricsTTM | null> {
  const apiKey = getApiKey();
  const url = `${FMP_BASE_URL}/key-metrics-ttm?symbol=${encodeURIComponent(symbol)}&apikey=${apiKey}`;
  return fetchWithRetry(url);
}

async function getRatiosTTM(symbol: string): Promise<FMPRatiosTTM | null> {
  const apiKey = getApiKey();
  const url = `${FMP_BASE_URL}/ratios-ttm?symbol=${encodeURIComponent(symbol)}&apikey=${apiKey}`;
  return fetchWithRetry(url);
}

// ═══════════════════════════════════════════════════════════════════════════
// Data Validation
// ═══════════════════════════════════════════════════════════════════════════

function validateRatings(ratings: FMPRatingsSnapshot, ratios: FMPRatiosTTM | null): string[] {
  const warnings: string[] = [];

  // Check scores are in valid range (1-5)
  const scores = [
    ratings.overallScore,
    ratings.discountedCashFlowScore,
    ratings.returnOnEquityScore,
    ratings.returnOnAssetsScore,
    ratings.debtToEquityScore,
    ratings.priceToEarningsScore,
    ratings.priceToBookScore,
  ];

  for (const score of scores) {
    if (score < 1 || score > 5) {
      warnings.push(`Invalid score value: ${score}`);
    }
  }

  // Check D/E ratio is non-negative (debt can't be negative)
  if (ratios && ratios.debtToEquityRatioTTM < 0) {
    warnings.push(`Negative D/E ratio: ${ratios.debtToEquityRatioTTM}`);
  }

  // Check P/B ratio (should generally be positive)
  if (ratios && ratios.priceToBookRatioTTM < 0) {
    warnings.push(`Negative P/B ratio: ${ratios.priceToBookRatioTTM}`);
  }

  return warnings;
}

function hasSignificantChange(oldRatings: FinancialRatings | null, newRatings: FinancialRatings): boolean {
  if (!oldRatings) return true;

  // Check if rating letter changed
  if (oldRatings.rating !== newRatings.rating) return true;

  // Check if any score changed
  if (oldRatings.ratingScore !== newRatings.ratingScore) return true;
  if (oldRatings.dcfScore !== newRatings.dcfScore) return true;
  if (oldRatings.roeScore !== newRatings.roeScore) return true;
  if (oldRatings.roaScore !== newRatings.roaScore) return true;
  if (oldRatings.deScore !== newRatings.deScore) return true;
  if (oldRatings.peScore !== newRatings.peScore) return true;
  if (oldRatings.pbScore !== newRatings.pbScore) return true;

  // Check if raw values changed significantly (>5% relative change)
  const checkValueChange = (oldVal: number | undefined, newVal: number | undefined): boolean => {
    if (oldVal === undefined && newVal !== undefined) return true;
    if (oldVal !== undefined && newVal === undefined) return true;
    if (oldVal === undefined || newVal === undefined) return false;
    if (oldVal === 0) return newVal !== 0;
    return Math.abs((newVal - oldVal) / oldVal) > 0.05;
  };

  if (checkValueChange(oldRatings.roeValue, newRatings.roeValue)) return true;
  if (checkValueChange(oldRatings.roaValue, newRatings.roaValue)) return true;
  if (checkValueChange(oldRatings.deValue, newRatings.deValue)) return true;
  if (checkValueChange(oldRatings.peValue, newRatings.peValue)) return true;
  if (checkValueChange(oldRatings.pbValue, newRatings.pbValue)) return true;

  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
// File Operations
// ═══════════════════════════════════════════════════════════════════════════

interface CompanyInfo {
  ticker: string;
  adrTickers?: string[];
  name: string;
  isPublic: boolean;
  hasFinancialRatings: boolean;
  file: string;
}

function extractCompaniesFromFile(filePath: string): CompanyInfo[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const companies: CompanyInfo[] = [];

  // Regex to find company objects with their tickers
  const companyRegex = /\{\s*id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?ticker:\s*'([^']+)'[\s\S]*?(?:adr_tickers:\s*\[([^\]]*)\])?[\s\S]*?is_public:\s*(true|false)[\s\S]*?(?:financial_ratings:\s*\{[\s\S]*?\})?[\s\S]*?\}/g;

  let match;
  while ((match = companyRegex.exec(content)) !== null) {
    const [fullMatch, , name, ticker, adrTickersStr, isPublicStr] = match;

    // Parse ADR tickers if present
    let adrTickers: string[] | undefined;
    if (adrTickersStr) {
      adrTickers = adrTickersStr.match(/'([^']+)'/g)?.map(s => s.replace(/'/g, ''));
    }

    const isPublic = isPublicStr === 'true';
    const hasFinancialRatings = fullMatch.includes('financial_ratings:');

    companies.push({
      ticker,
      adrTickers,
      name,
      isPublic,
      hasFinancialRatings,
      file: filePath,
    });
  }

  return companies;
}

function updateFileWithRatings(filePath: string, ticker: string, newRatings: FinancialRatings): boolean {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Find the company block by ticker
  // Look for ticker: 'TICKER' and find the financial_ratings block after it
  const tickerPattern = new RegExp(
    `(ticker:\\s*'${ticker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[\\s\\S]*?)(financial_ratings:\\s*\\{[\\s\\S]*?\\n\\s*\\})`,
    'g'
  );

  const ratingsBlock = `financial_ratings: {
      rating: '${newRatings.rating}',
      ratingScore: ${newRatings.ratingScore},
      dcfScore: ${newRatings.dcfScore},
      roeScore: ${newRatings.roeScore},
      roaScore: ${newRatings.roaScore},
      deScore: ${newRatings.deScore},
      peScore: ${newRatings.peScore},
      pbScore: ${newRatings.pbScore},${newRatings.roeValue !== undefined ? `
      roeValue: ${newRatings.roeValue.toFixed(1)},` : ''}${newRatings.roaValue !== undefined ? `
      roaValue: ${newRatings.roaValue.toFixed(1)},` : ''}${newRatings.deValue !== undefined ? `
      deValue: ${newRatings.deValue.toFixed(2)},` : ''}${newRatings.peValue !== undefined ? `
      peValue: ${newRatings.peValue.toFixed(1)},` : ''}${newRatings.pbValue !== undefined ? `
      pbValue: ${newRatings.pbValue.toFixed(1)},` : ''}
      source: 'FMP API',
      updated: '${newRatings.updated}'
    }`;

  const newContent = content.replace(tickerPattern, `$1${ratingsBlock}`);

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    return true;
  }

  return false;
}

function extractExistingRatings(filePath: string, ticker: string): FinancialRatings | null {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Find the company block by ticker and extract financial_ratings
  const tickerEscaped = ticker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `ticker:\\s*'${tickerEscaped}'[\\s\\S]*?financial_ratings:\\s*\\{([\\s\\S]*?)\\n\\s*\\}`,
    'g'
  );

  const match = pattern.exec(content);
  if (!match) return null;

  const ratingsBlock = match[1];

  // Parse individual fields
  const extract = (field: string): string | undefined => {
    const m = ratingsBlock.match(new RegExp(`${field}:\\s*([^,\\n]+)`));
    return m ? m[1].trim().replace(/'/g, '') : undefined;
  };

  const extractNum = (field: string): number | undefined => {
    const val = extract(field);
    return val ? parseFloat(val) : undefined;
  };

  return {
    rating: extract('rating') || '',
    ratingScore: extractNum('ratingScore') || 0,
    dcfScore: extractNum('dcfScore') || 0,
    roeScore: extractNum('roeScore') || 0,
    roaScore: extractNum('roaScore') || 0,
    deScore: extractNum('deScore') || 0,
    peScore: extractNum('peScore') || 0,
    pbScore: extractNum('pbScore') || 0,
    roeValue: extractNum('roeValue'),
    roaValue: extractNum('roaValue'),
    deValue: extractNum('deValue'),
    peValue: extractNum('peValue'),
    pbValue: extractNum('pbValue'),
    source: extract('source'),
    updated: extract('updated'),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════════════════════════════

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatDate(): string {
  return new Date().toISOString().split('T')[0];
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Update Logic
// ═══════════════════════════════════════════════════════════════════════════

async function fetchFinancialData(ticker: string): Promise<FinancialRatings | null> {
  // Fetch all data in parallel
  const [ratings, keyMetrics, ratios] = await Promise.all([
    getRatingsSnapshot(ticker).catch(() => null),
    getKeyMetricsTTM(ticker).catch(() => null),
    getRatiosTTM(ticker).catch(() => null),
  ]);

  if (!ratings) {
    return null;
  }

  // Validate the data
  const warnings = validateRatings(ratings, ratios);
  if (warnings.length > 0) {
    console.log(`  Warnings for ${ticker}: ${warnings.join(', ')}`);
  }

  return {
    rating: ratings.rating,
    ratingScore: ratings.overallScore,
    dcfScore: ratings.discountedCashFlowScore,
    roeScore: ratings.returnOnEquityScore,
    roaScore: ratings.returnOnAssetsScore,
    deScore: ratings.debtToEquityScore,
    peScore: ratings.priceToEarningsScore,
    pbScore: ratings.priceToBookScore,
    roeValue: keyMetrics?.returnOnEquityTTM !== undefined
      ? keyMetrics.returnOnEquityTTM * 100
      : undefined,
    roaValue: keyMetrics?.returnOnAssetsTTM !== undefined
      ? keyMetrics.returnOnAssetsTTM * 100
      : undefined,
    deValue: ratios?.debtToEquityRatioTTM,
    peValue: ratios?.priceToEarningsRatioTTM,
    pbValue: ratios?.priceToBookRatioTTM,
    source: 'FMP API',
    updated: formatDate(),
  };
}

async function updateCompany(company: CompanyInfo, dryRun: boolean): Promise<CompanyUpdate> {
  const result: CompanyUpdate = {
    ticker: company.ticker,
    name: company.name,
    file: path.basename(company.file),
    oldRatings: null,
    newRatings: null,
    status: 'skipped',
  };

  // Skip private companies or those without financial_ratings
  if (!company.isPublic || company.ticker === 'Private') {
    result.status = 'skipped';
    return result;
  }

  if (!company.hasFinancialRatings) {
    result.status = 'skipped';
    return result;
  }

  // Get existing ratings
  result.oldRatings = extractExistingRatings(company.file, company.ticker);

  // Try primary ticker first, then ADRs
  const tickersToTry = [company.ticker, ...(company.adrTickers || [])];

  for (const ticker of tickersToTry) {
    try {
      const newRatings = await fetchFinancialData(ticker);

      if (newRatings) {
        result.newRatings = newRatings;

        // Check if there's a significant change
        if (hasSignificantChange(result.oldRatings, newRatings)) {
          if (!dryRun) {
            // Use the original ticker for the file update (not the ADR)
            const updated = updateFileWithRatings(company.file, company.ticker, newRatings);
            result.status = updated ? 'updated' : 'error';
          } else {
            result.status = 'updated';
          }
        } else {
          result.status = 'unchanged';
        }

        return result;
      }
    } catch (error) {
      // Try next ticker
      continue;
    }

    // Rate limiting between API calls
    await sleep(RATE_LIMIT_MS);
  }

  // No data found from any ticker
  result.status = 'no_data';
  return result;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const singleTicker = args.find(a => a.startsWith('--ticker='))?.split('=')[1]
    || (args.includes('--ticker') ? args[args.indexOf('--ticker') + 1] : null);

  console.log('═'.repeat(70));
  console.log('Financial Data Updater');
  console.log('═'.repeat(70));
  console.log(`Mode: ${dryRun ? 'DRY RUN (no files will be modified)' : 'LIVE UPDATE'}`);
  console.log(`Date: ${formatDate()}`);
  console.log('');

  // Find all company files
  const companiesDir = path.join(__dirname, '..', 'src', 'data', 'companies');
  const files = fs.readdirSync(companiesDir)
    .filter(f => f.endsWith('.ts') && f !== 'index.ts')
    .map(f => path.join(companiesDir, f));

  console.log(`Found ${files.length} company files`);

  // Extract all companies
  const allCompanies: CompanyInfo[] = [];
  for (const file of files) {
    const companies = extractCompaniesFromFile(file);
    allCompanies.push(...companies);
  }

  // Filter to just public companies with financial_ratings
  let targetCompanies = allCompanies.filter(c =>
    c.isPublic && c.ticker !== 'Private' && c.hasFinancialRatings
  );

  // If single ticker specified, filter to just that
  if (singleTicker) {
    targetCompanies = targetCompanies.filter(c =>
      c.ticker === singleTicker || c.adrTickers?.includes(singleTicker)
    );
    if (targetCompanies.length === 0) {
      console.error(`Ticker ${singleTicker} not found`);
      process.exit(1);
    }
  }

  console.log(`Processing ${targetCompanies.length} public companies with financial_ratings`);
  console.log('');

  // Process each company
  const results: CompanyUpdate[] = [];

  for (let i = 0; i < targetCompanies.length; i++) {
    const company = targetCompanies[i];
    process.stdout.write(`[${i + 1}/${targetCompanies.length}] ${company.ticker.padEnd(10)} `);

    try {
      const result = await updateCompany(company, dryRun);
      results.push(result);

      // Status indicator
      const statusIcon = {
        'updated': '✓ UPDATED',
        'unchanged': '- unchanged',
        'no_data': '! no data',
        'error': '✗ ERROR',
        'skipped': '○ skipped',
      }[result.status];

      console.log(statusIcon);

      // Rate limiting between companies
      await sleep(RATE_LIMIT_MS);
    } catch (error) {
      console.log('✗ ERROR:', error instanceof Error ? error.message : String(error));
      results.push({
        ticker: company.ticker,
        name: company.name,
        file: path.basename(company.file),
        oldRatings: null,
        newRatings: null,
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Summary
  console.log('');
  console.log('═'.repeat(70));
  console.log('Summary');
  console.log('═'.repeat(70));

  const updated = results.filter(r => r.status === 'updated');
  const unchanged = results.filter(r => r.status === 'unchanged');
  const noData = results.filter(r => r.status === 'no_data');
  const errors = results.filter(r => r.status === 'error');

  console.log(`Updated:   ${updated.length}`);
  console.log(`Unchanged: ${unchanged.length}`);
  console.log(`No data:   ${noData.length}`);
  console.log(`Errors:    ${errors.length}`);

  // Detailed changes for PR description
  if (updated.length > 0) {
    console.log('');
    console.log('Changes:');
    console.log('─'.repeat(70));
    for (const u of updated) {
      const oldRating = u.oldRatings?.rating || 'N/A';
      const newRating = u.newRatings?.rating || 'N/A';
      const ratingChange = oldRating !== newRating ? ` (${oldRating} → ${newRating})` : '';
      console.log(`  ${u.ticker.padEnd(10)} ${u.name.slice(0, 30).padEnd(32)} ${ratingChange}`);
    }
  }

  if (noData.length > 0) {
    console.log('');
    console.log('No FMP data available:');
    console.log('─'.repeat(70));
    for (const n of noData) {
      console.log(`  ${n.ticker.padEnd(10)} ${n.name.slice(0, 30)}`);
    }
  }

  if (errors.length > 0) {
    console.log('');
    console.log('Errors:');
    console.log('─'.repeat(70));
    for (const e of errors) {
      console.log(`  ${e.ticker.padEnd(10)} ${e.error}`);
    }
  }

  // Output for GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    const summaryLines = [
      `- **Updated:** ${updated.length} companies`,
      `- **Unchanged:** ${unchanged.length} companies`,
      `- **No data:** ${noData.length} companies`,
      `- **Errors:** ${errors.length} companies`,
    ];

    if (updated.length > 0) {
      summaryLines.push('', '### Updated Companies', '');
      for (const u of updated) {
        const oldRating = u.oldRatings?.rating || 'N/A';
        const newRating = u.newRatings?.rating || 'N/A';
        if (oldRating !== newRating) {
          summaryLines.push(`- **${u.ticker}** (${u.name}): ${oldRating} → ${newRating}`);
        } else {
          summaryLines.push(`- **${u.ticker}** (${u.name}): metrics updated`);
        }
      }
    }

    const summary = summaryLines.join('\n');
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `summary<<EOF\n${summary}\nEOF\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `has_changes=${updated.length > 0}\n`);
  }

  // Exit code
  if (errors.length > 0 && errors.length === results.length) {
    // All failed - something is wrong
    process.exit(1);
  }

  process.exit(0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
