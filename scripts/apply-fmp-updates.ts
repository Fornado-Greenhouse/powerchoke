/**
 * Apply FMP validation updates to company files
 *
 * Usage: npx tsx scripts/apply-fmp-updates.ts
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';

// Update data from FMP validation (market caps in billions USD)
const updates: Record<string, { market_cap_usd: number; revenue_ttm_usd?: number }> = {
  '6501.T': { market_cap_usd: 143.1 },       // Hitachi
  'GEV': { market_cap_usd: 172.0, revenue_ttm_usd: 37.7 },  // GE Vernova
  'ENR.DE': { market_cap_usd: 109.6 },       // Siemens Energy
  'ABBN.SW': { market_cap_usd: 132.6 },      // ABB
  '6503.T': { market_cap_usd: 60.6 },        // Mitsubishi Elec
  '267260.KS': { market_cap_usd: 20.8 },     // Hyundai Electric
  '6504.T': { market_cap_usd: 10.8 },        // Fuji Electric
  '6508.T': { market_cap_usd: 1.7 },         // Meidensha
  '600089.SS': { market_cap_usd: 15.9 },     // TBEA
  '601179.SS': { market_cap_usd: 6.1 },      // China XD Electric
  '601727.SS': { market_cap_usd: 18.7 },     // Shanghai Electric
  '600406.SS': { market_cap_usd: 25.6 },     // NARI
  'SU.PA': { market_cap_usd: 153.2 },        // Schneider Electric
  'IFX.DE': { market_cap_usd: 56.7 },        // Infineon
  '6762.T': { market_cap_usd: 28.8 },        // TDK
  'HUBB': { market_cap_usd: 23.4, revenue_ttm_usd: 5.7 },   // Hubbell
  'PLPC': { market_cap_usd: 1.1, revenue_ttm_usd: 0.7 },    // PLPC
  'MT': { market_cap_usd: 32.9, revenue_ttm_usd: 61.1 },    // ArcelorMittal
  '5401.T': { market_cap_usd: 20.7 },        // Nippon Steel
  'TKA.DE': { market_cap_usd: 6.5 },         // thyssenkrupp
  'SCCO': { market_cap_usd: 115.4, revenue_ttm_usd: 12.3 }, // Southern Copper
  'PRY.MI': { market_cap_usd: 28.1 },        // Prysmian
  'NEX.PA': { market_cap_usd: 6.2 },         // Nexans
  'NKT.CO': { market_cap_usd: 6.6 },         // NKT
  '3402.T': { market_cap_usd: 9.8 },         // Toray
  'PWR': { market_cap_usd: 68.7, revenue_ttm_usd: 27.1 },   // Quanta
  'MYRG': { market_cap_usd: 3.5, revenue_ttm_usd: 3.5 },    // MYR Group
  'MTZ': { market_cap_usd: 17.5, revenue_ttm_usd: 13.8 },   // MasTec
  'PRIM': { market_cap_usd: 7.2, revenue_ttm_usd: 7.5 },    // Primoris
  'DY': { market_cap_usd: 10.1, revenue_ttm_usd: 5.2 },     // Dycom
  'EN.PA': { market_cap_usd: 19.4 },         // Bouygues
  '028260.KS': { market_cap_usd: 27.8 },     // Samsung C&T
  'AEP': { market_cap_usd: 62.2, revenue_ttm_usd: 21.4 },   // AEP
  'NGG': { market_cap_usd: 74.5, revenue_ttm_usd: 36.2 },   // National Grid
  'ENEL.MI': { market_cap_usd: 102.2 },      // Enel
  'IBE.MC': { market_cap_usd: 138.9 },       // Iberdrola
  'EOAN.DE': { market_cap_usd: 47.3 },       // E.ON
  '015760.KS': { market_cap_usd: 22.2 },     // KEPCO
  '9501.T': { market_cap_usd: 6.5 },         // TEPCO
  'BSY': { market_cap_usd: 12.2, revenue_ttm_usd: 1.5 },    // Bentley
  'LAND.SW': { market_cap_usd: 1.9 },        // Landis+Gyr (declined)
  'FTNT': { market_cap_usd: 63.9, revenue_ttm_usd: 6.6 },   // Fortinet (declined)
  'TENB': { market_cap_usd: 3.2, revenue_ttm_usd: 1.0 },    // Tenable (declined)
  'FTV': { market_cap_usd: 18.4, revenue_ttm_usd: 5.6 },    // Fortive (declined)
};

// Files to update
const files = [
  'tier1-oems.ts',
  'tier2-components.ts',
  'tier3-materials.ts',
  'service-epc.ts',
  'utilities.ts',
  'software.ts',
];

const companiesDir = path.join(__dirname, '../src/data/companies');
const today = new Date().toISOString().split('T')[0];

function updateFile(filename: string): number {
  const filepath = path.join(companiesDir, filename);
  let content = fs.readFileSync(filepath, 'utf8');
  let updateCount = 0;

  for (const [ticker, data] of Object.entries(updates)) {
    // Check if this ticker exists in this file
    const tickerPattern = new RegExp(`ticker:\\s*['"]${ticker.replace('.', '\\.')}['"]`);
    if (!tickerPattern.test(content)) continue;

    // Update market_cap_usd
    const mktCapPattern = new RegExp(
      `(ticker:\\s*['"]${ticker.replace('.', '\\.')}['"][\\s\\S]*?market_cap_usd:\\s*)([\\d.]+)`
    );
    if (mktCapPattern.test(content)) {
      content = content.replace(mktCapPattern, `$1${data.market_cap_usd}`);
      console.log(`  Updated ${ticker} market_cap_usd: ${data.market_cap_usd}B`);
      updateCount++;
    }

    // Update revenue_ttm_usd if we have it
    if (data.revenue_ttm_usd) {
      const revPattern = new RegExp(
        `(ticker:\\s*['"]${ticker.replace('.', '\\.')}['"][\\s\\S]*?revenue_ttm_usd:\\s*)([\\d.]+)`
      );
      if (revPattern.test(content)) {
        content = content.replace(revPattern, `$1${data.revenue_ttm_usd}`);
        console.log(`  Updated ${ticker} revenue_ttm_usd: ${data.revenue_ttm_usd}B`);
      }
    }

    // Update data_updated date
    const datePattern = new RegExp(
      `(ticker:\\s*['"]${ticker.replace('.', '\\.')}['"][\\s\\S]*?data_updated:\\s*)['"][^'"]+['"]`
    );
    if (datePattern.test(content)) {
      content = content.replace(datePattern, `$1'${today}'`);
    }

    // Update data_sources to include FMP
    const sourcesPattern = new RegExp(
      `(ticker:\\s*['"]${ticker.replace('.', '\\.')}['"][\\s\\S]*?data_sources:\\s*)\\[[^\\]]+\\]`
    );
    if (sourcesPattern.test(content)) {
      // Extract existing sources and add FMP if not present
      const match = content.match(sourcesPattern);
      if (match && !match[0].includes('FMP')) {
        const newSources = match[0].replace(/\]$/, ", 'FMP API']");
        content = content.replace(sourcesPattern, newSources.replace(match[1], '$1'));
      }
    }
  }

  if (updateCount > 0) {
    fs.writeFileSync(filepath, content, 'utf8');
  }

  return updateCount;
}

function main() {
  console.log('Applying FMP data updates to company files...\n');

  let totalUpdates = 0;

  for (const file of files) {
    console.log(`Processing ${file}...`);
    const count = updateFile(file);
    totalUpdates += count;
    if (count === 0) {
      console.log('  No updates needed');
    }
  }

  console.log(`\nTotal updates applied: ${totalUpdates}`);
  console.log(`Data date updated to: ${today}`);
}

main();
