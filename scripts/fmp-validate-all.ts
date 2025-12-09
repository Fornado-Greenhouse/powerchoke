/**
 * Comprehensive FMP validation and update script
 *
 * Fetches real-time data for all public companies, converts to USD,
 * and generates updates for companies.ts files.
 *
 * Usage: npx tsx scripts/fmp-validate-all.ts
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

const FMP_BASE_URL = 'https://financialmodelingprep.com';

interface FMPProfile {
  symbol: string;
  companyName: string;
  exchange: string;
  exchangeFullName: string;
  currency: string;
  marketCap: number;
  city: string;
  state: string;
  country: string;
  industry: string;
  sector: string;
  isActivelyTrading: boolean;
}

interface FMPForexQuote {
  symbol: string;
  price: number;
}

interface Company {
  id: string;
  name: string;
  ticker: string;
  is_public: boolean;
  market_cap_usd?: number;
  revenue_ttm_usd?: number;
  headquarters?: string;
  primary_exchange?: string;
}

interface ValidationResult {
  ticker: string;
  name: string;
  ourMktCap: number;
  fmpMktCap: number;
  fmpMktCapUsd: number;
  currency: string;
  diff: number;
  ourRevenue: number;
  fmpRevenue: number;
  status: 'OK' | 'UPDATE' | 'NOT_FOUND' | 'ERROR';
  exchange: string;
  headquarters: string;
}

function getApiKey(): string {
  const apiKey = process.env.FMP_API_KEY;
  if (!apiKey) {
    console.error('Error: FMP_API_KEY environment variable not set');
    process.exit(1);
  }
  return apiKey;
}

// Fetch forex rate (returns how many units of currency = 1 USD)
async function getForexRate(currency: string): Promise<number> {
  if (currency === 'USD') return 1;

  const apiKey = getApiKey();
  const pair = `USD${currency}`;
  const url = `${FMP_BASE_URL}/api/v3/quote/${pair}?apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0].price;
    }
  } catch (e) {
    console.warn(`Could not fetch forex rate for ${currency}, using fallback`);
  }

  // Fallback rates (approximate Dec 2025)
  const fallbackRates: Record<string, number> = {
    JPY: 156,
    EUR: 0.95,
    GBP: 0.79,
    CHF: 0.88,
    KRW: 1400,
    CNY: 7.3,
    INR: 84,
    BRL: 6.0,
    TWD: 32,
    HKD: 7.8,
    SEK: 11,
    NOK: 11,
    DKK: 7.1,
    AUD: 1.6,
    CAD: 1.4,
    SGD: 1.35,
    MXN: 17.5,
    ZAR: 18,
    PLN: 4.1,
  };

  return fallbackRates[currency] || 1;
}

async function getProfile(symbol: string): Promise<FMPProfile | null> {
  const apiKey = getApiKey();
  const url = `${FMP_BASE_URL}/stable/profile?symbol=${encodeURIComponent(symbol)}&apikey=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) return null;

  const data = await response.json();
  return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

async function getIncomeStatement(symbol: string): Promise<number> {
  const apiKey = getApiKey();

  // Try quarterly for TTM
  try {
    const url = `${FMP_BASE_URL}/stable/income-statement?symbol=${encodeURIComponent(symbol)}&period=quarter&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (Array.isArray(data) && data.length >= 4) {
      return data.slice(0, 4).reduce((sum: number, q: { revenue?: number }) => sum + (q.revenue || 0), 0);
    }
  } catch {}

  // Fallback to annual
  try {
    const url = `${FMP_BASE_URL}/stable/income-statement?symbol=${encodeURIComponent(symbol)}&period=annual&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0].revenue || 0;
    }
  } catch {}

  return 0;
}

// Cache forex rates to avoid repeated API calls
const forexCache: Map<string, number> = new Map();

async function getCachedForexRate(currency: string): Promise<number> {
  if (!forexCache.has(currency)) {
    const rate = await getForexRate(currency);
    forexCache.set(currency, rate);
  }
  return forexCache.get(currency)!;
}

async function validateCompany(company: Company): Promise<ValidationResult> {
  const result: ValidationResult = {
    ticker: company.ticker,
    name: company.name,
    ourMktCap: company.market_cap_usd || 0,
    fmpMktCap: 0,
    fmpMktCapUsd: 0,
    currency: 'USD',
    diff: 0,
    ourRevenue: company.revenue_ttm_usd || 0,
    fmpRevenue: 0,
    status: 'NOT_FOUND',
    exchange: '',
    headquarters: '',
  };

  try {
    const profile = await getProfile(company.ticker);
    if (!profile) {
      return result;
    }

    result.currency = profile.currency;
    result.fmpMktCap = profile.marketCap;
    result.exchange = profile.exchange;
    result.headquarters = [profile.city, profile.state, profile.country].filter(Boolean).join(', ');

    // Convert to USD
    const forexRate = await getCachedForexRate(profile.currency);
    result.fmpMktCapUsd = profile.marketCap / forexRate / 1_000_000_000; // Convert to billions USD

    // Get revenue
    const revenue = await getIncomeStatement(company.ticker);
    result.fmpRevenue = revenue / forexRate / 1_000_000_000; // Convert to billions USD

    // Calculate difference
    if (result.ourMktCap > 0) {
      result.diff = Math.abs(result.fmpMktCapUsd - result.ourMktCap) / result.ourMktCap;
    }

    result.status = result.diff > 0.15 ? 'UPDATE' : 'OK';
  } catch (error) {
    result.status = 'ERROR';
  }

  return result;
}

async function main() {
  console.log('═'.repeat(100));
  console.log('FMP Company Data Validation');
  console.log('═'.repeat(100));

  // Import companies
  const companiesPath = path.join(__dirname, '../src/data/companies/index');
  let companies: Company[];
  try {
    const module = await import(companiesPath);
    companies = module.companies;
  } catch (error) {
    console.error('Could not load companies:', error);
    process.exit(1);
  }

  const publicCompanies = companies.filter(c => c.is_public && c.ticker !== 'Private');
  console.log(`\nFound ${publicCompanies.length} public companies to validate\n`);

  // Pre-fetch common forex rates
  console.log('Fetching forex rates...');
  const currencies = ['JPY', 'EUR', 'GBP', 'CHF', 'KRW', 'CNY', 'INR', 'BRL'];
  for (const currency of currencies) {
    const rate = await getCachedForexRate(currency);
    console.log(`  USD/${currency}: ${rate.toFixed(2)}`);
  }
  console.log();

  // Validate all companies
  const results: ValidationResult[] = [];
  const updateNeeded: ValidationResult[] = [];

  console.log('Validating companies...\n');
  console.log(
    'Ticker'.padEnd(14) +
    'Name'.padEnd(28) +
    'Our MktCap'.padEnd(12) +
    'FMP MktCap'.padEnd(12) +
    'Currency'.padEnd(8) +
    'Our Rev'.padEnd(10) +
    'FMP Rev'.padEnd(10) +
    'Status'
  );
  console.log('─'.repeat(100));

  for (const company of publicCompanies) {
    const result = await validateCompany(company);
    results.push(result);

    const statusColor = result.status === 'OK' ? '✓' : result.status === 'UPDATE' ? '⚠' : '✗';

    console.log(
      result.ticker.padEnd(14) +
      result.name.slice(0, 26).padEnd(28) +
      `$${result.ourMktCap.toFixed(1)}B`.padEnd(12) +
      `$${result.fmpMktCapUsd.toFixed(1)}B`.padEnd(12) +
      result.currency.padEnd(8) +
      `$${result.ourRevenue.toFixed(1)}B`.padEnd(10) +
      `$${result.fmpRevenue.toFixed(1)}B`.padEnd(10) +
      `${statusColor} ${result.status}` +
      (result.diff > 0.15 ? ` (${(result.diff * 100).toFixed(0)}%)` : '')
    );

    if (result.status === 'UPDATE') {
      updateNeeded.push(result);
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 150));
  }

  // Summary
  console.log('\n' + '═'.repeat(100));
  console.log('SUMMARY');
  console.log('═'.repeat(100));

  const okCount = results.filter(r => r.status === 'OK').length;
  const updateCount = results.filter(r => r.status === 'UPDATE').length;
  const notFoundCount = results.filter(r => r.status === 'NOT_FOUND').length;
  const errorCount = results.filter(r => r.status === 'ERROR').length;

  console.log(`  OK:        ${okCount} companies (within 15% of FMP data)`);
  console.log(`  UPDATE:    ${updateCount} companies (>15% difference)`);
  console.log(`  NOT FOUND: ${notFoundCount} companies`);
  console.log(`  ERROR:     ${errorCount} companies`);

  if (updateNeeded.length > 0) {
    console.log('\n' + '═'.repeat(100));
    console.log('COMPANIES NEEDING UPDATE');
    console.log('═'.repeat(100));

    for (const r of updateNeeded) {
      console.log(`
${r.name} (${r.ticker})
  Current:  market_cap_usd: ${r.ourMktCap.toFixed(1)}, revenue_ttm_usd: ${r.ourRevenue.toFixed(1)}
  FMP:      market_cap_usd: ${r.fmpMktCapUsd.toFixed(1)}, revenue_ttm_usd: ${r.fmpRevenue.toFixed(1)}
  Exchange: ${r.exchange}
  HQ:       ${r.headquarters}`);
    }

    // Generate update data
    console.log('\n' + '═'.repeat(100));
    console.log('UPDATE DATA (copy these values to update company files)');
    console.log('═'.repeat(100));

    const updateData = updateNeeded.map(r => ({
      ticker: r.ticker,
      market_cap_usd: parseFloat(r.fmpMktCapUsd.toFixed(1)),
      revenue_ttm_usd: parseFloat(r.fmpRevenue.toFixed(1)),
      primary_exchange: r.exchange,
      headquarters: r.headquarters,
      data_updated: new Date().toISOString().split('T')[0],
      data_sources: ['FMP API'],
    }));

    console.log(JSON.stringify(updateData, null, 2));
  }
}

main().catch(console.error);
