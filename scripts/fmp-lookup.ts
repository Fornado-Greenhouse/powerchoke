/**
 * FMP (Financial Modeling Prep) API integration for company data lookup
 *
 * Usage:
 *   npx tsx scripts/fmp-lookup.ts search "Hitachi"
 *   npx tsx scripts/fmp-lookup.ts profile HTHIY
 *   npx tsx scripts/fmp-lookup.ts validate          # Validate all companies
 *   npx tsx scripts/fmp-lookup.ts update HTHIY      # Update single company data
 *
 * Requires FMP_API_KEY environment variable (loaded from .env file)
 */

import 'dotenv/config';

const FMP_BASE_URL = 'https://financialmodelingprep.com/stable';

interface FMPProfile {
  symbol: string;
  companyName: string;
  exchange: string;           // Short name like "NYSE", "NASDAQ"
  exchangeFullName: string;   // Full name like "New York Stock Exchange"
  currency: string;
  marketCap: number;          // Market cap in USD
  city: string;
  state: string;
  country: string;
  industry: string;
  sector: string;
  description: string;
  isActivelyTrading: boolean;
}

interface FMPIncomeStatement {
  date: string;
  symbol: string;
  revenue: number;
  period: string;
  calendarYear: string;
}

interface FMPSearchResult {
  symbol: string;
  name: string;
  exchange: string;
  stockExchange: string;
}

function getApiKey(): string {
  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) {
    console.error('Error: FMP_API_KEY environment variable not set');
    console.error('Set it with: export FMP_API_KEY=your_key');
    console.error('Get a key at: https://site.financialmodelingprep.com/developer/docs');
    process.exit(1);
  }
  return apiKey;
}

async function searchCompany(query: string): Promise<FMPSearchResult[]> {
  const apiKey = getApiKey();
  const url = `${FMP_BASE_URL}/search-name?query=${encodeURIComponent(query)}&apikey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`FMP API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function getProfile(symbol: string): Promise<FMPProfile | null> {
  const apiKey = getApiKey();
  const url = `${FMP_BASE_URL}/profile?symbol=${encodeURIComponent(symbol)}&apikey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`FMP API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

async function getIncomeStatement(symbol: string, period: 'annual' | 'quarter' = 'annual'): Promise<FMPIncomeStatement[]> {
  const apiKey = getApiKey();
  const url = `${FMP_BASE_URL}/income-statement?symbol=${encodeURIComponent(symbol)}&period=${period}&apikey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`FMP API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function formatMarketCap(mktCap: number): string {
  const billions = mktCap / 1_000_000_000;
  return `$${billions.toFixed(1)}B`;
}

function formatRevenue(revenue: number): string {
  const billions = revenue / 1_000_000_000;
  return `$${billions.toFixed(1)}B`;
}

async function runSearch(query: string): Promise<void> {
  console.log(`\nSearching for: "${query}"\n`);

  const results = await searchCompany(query);

  if (results.length === 0) {
    console.log('No results found.');
    return;
  }

  console.log('Results:');
  console.log('─'.repeat(80));

  for (const result of results.slice(0, 15)) {
    console.log(`  ${result.symbol.padEnd(12)} ${result.name.slice(0, 40).padEnd(42)} ${result.exchange || ''}`);
  }

  if (results.length > 15) {
    console.log(`  ... and ${results.length - 15} more results`);
  }
}

async function runProfile(symbol: string): Promise<void> {
  console.log(`\nFetching profile for: ${symbol}\n`);

  const profile = await getProfile(symbol);

  if (!profile) {
    console.log('Company not found.');
    return;
  }

  // Also fetch income statement for revenue
  let ttmRevenue = 0;
  try {
    const quarterlyStatements = await getIncomeStatement(symbol, 'quarter');
    // Sum last 4 quarters for TTM
    if (quarterlyStatements.length >= 4) {
      ttmRevenue = quarterlyStatements.slice(0, 4).reduce((sum, q) => sum + (q.revenue || 0), 0);
    }
  } catch {
    // Annual fallback
    try {
      const annualStatements = await getIncomeStatement(symbol, 'annual');
      if (annualStatements.length > 0) {
        ttmRevenue = annualStatements[0].revenue || 0;
      }
    } catch {
      console.log('  (Could not fetch revenue data)');
    }
  }

  const headquarters = [profile.city, profile.state, profile.country]
    .filter(Boolean)
    .join(', ');

  console.log('Company Profile:');
  console.log('─'.repeat(60));
  console.log(`  Name:         ${profile.companyName}`);
  console.log(`  Symbol:       ${profile.symbol}`);
  console.log(`  Exchange:     ${profile.exchange} (${profile.exchangeFullName})`);
  console.log(`  Market Cap:   ${formatMarketCap(profile.marketCap)}`);
  if (ttmRevenue > 0) {
    console.log(`  Revenue TTM:  ${formatRevenue(ttmRevenue)}`);
  }
  console.log(`  Headquarters: ${headquarters}`);
  console.log(`  Sector:       ${profile.sector}`);
  console.log(`  Industry:     ${profile.industry}`);
  console.log(`  Active:       ${profile.isActivelyTrading ? 'Yes' : 'No'}`);

  // Output in format suitable for Company type
  console.log('\nFor companies.ts:');
  console.log('─'.repeat(60));
  console.log(`  market_cap_usd: ${(profile.marketCap / 1_000_000_000).toFixed(1)},`);
  if (ttmRevenue > 0) {
    console.log(`  revenue_ttm_usd: ${(ttmRevenue / 1_000_000_000).toFixed(1)},`);
  }
  console.log(`  headquarters: '${headquarters}',`);
  console.log(`  primary_exchange: '${profile.exchange}',`);
  console.log(`  data_updated: '${new Date().toISOString().split('T')[0]}',`);
  console.log(`  data_sources: ['FMP API'],`);
}

async function runValidate(): Promise<void> {
  console.log('\nValidating company data against FMP...\n');

  // Import companies dynamically
  const companiesPath = '../src/data/companies/index';
  let companies;
  try {
    const module = await import(companiesPath);
    companies = module.companies;
  } catch (error) {
    console.error('Could not load companies data:', error);
    process.exit(1);
  }

  const publicCompanies = companies.filter((c: { is_public: boolean; ticker: string }) =>
    c.is_public && c.ticker !== 'Private'
  );

  console.log(`Found ${publicCompanies.length} public companies to validate\n`);
  console.log('Ticker'.padEnd(12), 'Name'.padEnd(30), 'Our MktCap'.padEnd(12), 'FMP MktCap'.padEnd(12), 'Status');
  console.log('─'.repeat(80));

  let validated = 0;
  let mismatched = 0;
  let notFound = 0;

  for (const company of publicCompanies.slice(0, 10)) { // Limit to 10 for rate limiting
    try {
      const profile = await getProfile(company.ticker);

      if (!profile) {
        console.log(
          company.ticker.padEnd(12),
          company.name.slice(0, 28).padEnd(30),
          company.market_cap_usd ? `$${company.market_cap_usd}B`.padEnd(12) : 'N/A'.padEnd(12),
          'N/A'.padEnd(12),
          'NOT FOUND'
        );
        notFound++;
        continue;
      }

      const fmpMktCap = profile.marketCap / 1_000_000_000;
      const ourMktCap = company.market_cap_usd || 0;
      const diff = Math.abs(fmpMktCap - ourMktCap) / ourMktCap;

      let status = 'OK';
      if (diff > 0.2) {
        status = `DIFF ${(diff * 100).toFixed(0)}%`;
        mismatched++;
      } else {
        validated++;
      }

      console.log(
        company.ticker.padEnd(12),
        company.name.slice(0, 28).padEnd(30),
        `$${ourMktCap.toFixed(1)}B`.padEnd(12),
        `$${fmpMktCap.toFixed(1)}B`.padEnd(12),
        status
      );

      // Rate limiting - FMP has limits
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.log(
        company.ticker.padEnd(12),
        company.name.slice(0, 28).padEnd(30),
        'ERROR',
        '',
        String(error)
      );
    }
  }

  console.log('\n─'.repeat(80));
  console.log(`Summary: ${validated} validated, ${mismatched} mismatched, ${notFound} not found`);
  console.log('\nNote: Only checked first 10 companies to avoid rate limits.');
  console.log('Run individual lookups with: npx tsx scripts/fmp-lookup.ts profile <TICKER>');
}

// Main CLI handler
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
FMP Company Data Lookup

Usage:
  npx tsx scripts/fmp-lookup.ts search <query>    Search for companies by name
  npx tsx scripts/fmp-lookup.ts profile <ticker>  Get company profile
  npx tsx scripts/fmp-lookup.ts validate          Validate companies against FMP

Examples:
  npx tsx scripts/fmp-lookup.ts search "Hitachi"
  npx tsx scripts/fmp-lookup.ts profile HTHIY
  npx tsx scripts/fmp-lookup.ts profile 6501.T

Requires FMP_API_KEY environment variable.
Get your API key at: https://site.financialmodelingprep.com/developer/docs
`);
    process.exit(0);
  }

  const [command, ...rest] = args;

  switch (command) {
    case 'search':
      if (rest.length === 0) {
        console.error('Usage: search <query>');
        process.exit(1);
      }
      await runSearch(rest.join(' '));
      break;

    case 'profile':
      if (rest.length === 0) {
        console.error('Usage: profile <ticker>');
        process.exit(1);
      }
      await runProfile(rest[0]);
      break;

    case 'validate':
      await runValidate();
      break;

    default:
      console.error(`Unknown command: ${command}`);
      console.error('Use: search, profile, or validate');
      process.exit(1);
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
