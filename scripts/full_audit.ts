/**
 * Full audit of ALL sub-component key_players against company exposures.
 *
 * Exposure = Market Share (NOT revenue mix):
 * - 5 = Dominant (40%+ / monopoly/duopoly leader)
 * - 4 = Major (20-40% / oligopoly leader)
 * - 3 = Meaningful (10-20%)
 * - 2 = Minor (5-10%)
 * - 1 = Minimal (<5%)
 */

import { companies, components } from '../src/data';

interface AuditResult {
  componentId: string;
  componentName: string;
  subComponentName: string;
  severity: number;
  marketStructure: string;
  keyPlayer: string;
  parsedPlayer: string;
  matchedCompany: string | null;
  companyId: string | null;
  currentExposure: number;
  expectedExposure: number;
  status: 'OK' | 'MISSING' | 'LOW' | 'NOT_IN_ROSTER';
  notes: string;
}

function normalizeForMatch(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractMarketShare(text: string): number | null {
  // Look for patterns like "~50%", "50-60%", "70-80%"
  const match = text.match(/~?(\d+)(?:-(\d+))?%/);
  if (match) {
    const low = parseInt(match[1]);
    const high = match[2] ? parseInt(match[2]) : low;
    return (low + high) / 2;
  }
  return null;
}

function expectedExposureFromStructure(structure: string, keyPlayerText: string, isFirst: boolean): number {
  const marketShare = extractMarketShare(keyPlayerText);
  const structureLower = structure.toLowerCase();

  // If we have explicit market share, use it
  if (marketShare !== null) {
    if (marketShare >= 40) return 5;
    if (marketShare >= 20) return 4;
    if (marketShare >= 10) return 3;
    if (marketShare >= 5) return 2;
    return 1;
  }

  // Otherwise infer from market structure
  if (structureLower.includes('monopoly')) {
    return 5; // Monopoly = dominant
  }
  if (structureLower.includes('duopoly')) {
    return isFirst ? 5 : 4; // First player usually larger
  }
  if (structureLower.includes('oligopoly')) {
    return isFirst ? 4 : 3; // Leaders get 4, others get 3
  }
  if (structureLower.includes('fragmented')) {
    return 3; // Even leaders in fragmented markets are meaningful but not dominant
  }

  return 3; // Default to meaningful
}

// Known aliases for companies that appear under different names in key_player text
// NOTE: Subsidiaries map to their parent companies (investors buy parent stock)
const COMPANY_ALIASES: Record<string, string[]> = {
  'Hubbell Incorporated': ['Hubbell Power Systems', 'Hubbell'],
  'GE Vernova': ['GE Grid Solutions', 'GE Grid', 'General Electric Grid'],
  'Schweitzer Engineering Labs': ['SEL', 'Schweitzer'],
  'Fortive (Qualitrol)': ['Qualitrol', 'Qualitrol Corporation'],
  'Microchip Technology': ['Microchip', 'Microsemi'],
  // Hitachi subsidiaries all map to parent Hitachi Ltd
  'Hitachi Ltd': ['Hitachi Energy', 'Hitachi Metals', 'Hitachi', 'Hitachi Metglas', 'Metglas', 'Finemet'],
  // Siemens Energy owns Trench Group
  'Siemens Energy': ['Trench', 'Trench Group'],
  // Schneider owns AVEVA (PI System)
  'Schneider Electric': ['AVEVA', 'PI System'],
  '3M Company': ['3M'],
  'Essex Furukawa Magnet Wire': ['Superior Essex', 'Essex'],
};

function findMatchingCompany(playerName: string): { company: typeof companies[0] | null; matchType: string } {
  const normalized = normalizeForMatch(playerName);

  // Try exact match first
  for (const company of companies) {
    const companyNorm = normalizeForMatch(company.name);
    if (companyNorm === normalized) {
      return { company, matchType: 'exact' };
    }
  }

  // Try known aliases
  for (const company of companies) {
    const aliases = COMPANY_ALIASES[company.name];
    if (aliases) {
      for (const alias of aliases) {
        const aliasNorm = normalizeForMatch(alias);
        if (aliasNorm === normalized || normalized.includes(aliasNorm) || aliasNorm.includes(normalized)) {
          return { company, matchType: 'alias' };
        }
      }
    }
  }

  // Try partial match (company contains player or vice versa)
  for (const company of companies) {
    const companyNorm = normalizeForMatch(company.name);
    if (companyNorm.length >= 3 && normalized.length >= 3) {
      if (companyNorm.includes(normalized) || normalized.includes(companyNorm)) {
        return { company, matchType: 'partial' };
      }
    }
  }

  // Try matching parenthetical alias
  const aliasMatch = playerName.match(/\(([^)]+)\)/);
  if (aliasMatch) {
    const alias = aliasMatch[1].toLowerCase().trim();
    if (alias.length >= 2) {
      for (const company of companies) {
        const companyNorm = normalizeForMatch(company.name);
        if (companyNorm.includes(alias)) {
          return { company, matchType: 'alias' };
        }
      }
    }
  }

  return { company: null, matchType: 'none' };
}

const results: AuditResult[] = [];

console.log('='.repeat(80));
console.log('FULL AUDIT: All Sub-Component Key Players vs Company Exposures');
console.log('='.repeat(80));
console.log('');

for (const component of components) {
  if (!component.sub_components || component.sub_components.length === 0) {
    continue;
  }

  for (const sub of component.sub_components) {
    // Parse key_player (may have multiple separated by /)
    const players = sub.key_player.split('/').map(p => p.trim());

    players.forEach((player, idx) => {
      const { company, matchType } = findMatchingCompany(player);
      const expectedExp = expectedExposureFromStructure(sub.market_structure, player, idx === 0);

      let status: AuditResult['status'];
      let notes = '';
      let currentExp = 0;

      if (!company) {
        status = 'NOT_IN_ROSTER';
        notes = `Key player "${player}" not found in company roster`;
      } else {
        currentExp = company.exposure[component.id] || 0;

        if (currentExp === 0) {
          status = 'MISSING';
          notes = `Company has NO exposure to ${component.id}, expected ${expectedExp}`;
        } else if (currentExp < expectedExp) {
          status = 'LOW';
          notes = `Exposure ${currentExp} is lower than expected ${expectedExp} for ${sub.market_structure}`;
        } else {
          status = 'OK';
          notes = matchType !== 'exact' ? `Matched via ${matchType}` : '';
        }
      }

      results.push({
        componentId: component.id,
        componentName: component.name,
        subComponentName: sub.name,
        severity: sub.severity,
        marketStructure: sub.market_structure,
        keyPlayer: sub.key_player,
        parsedPlayer: player,
        matchedCompany: company?.name || null,
        companyId: company?.id || null,
        currentExposure: currentExp,
        expectedExposure: expectedExp,
        status,
        notes
      });
    });
  }
}

// Group and display results
const byStatus = {
  MISSING: results.filter(r => r.status === 'MISSING'),
  LOW: results.filter(r => r.status === 'LOW'),
  NOT_IN_ROSTER: results.filter(r => r.status === 'NOT_IN_ROSTER'),
  OK: results.filter(r => r.status === 'OK')
};

console.log('SUMMARY');
console.log('-'.repeat(40));
console.log(`✓ OK:            ${byStatus.OK.length}`);
console.log(`✗ MISSING:       ${byStatus.MISSING.length} (company exists but no exposure)`);
console.log(`⚠ LOW:           ${byStatus.LOW.length} (exposure too low for market position)`);
console.log(`? NOT_IN_ROSTER: ${byStatus.NOT_IN_ROSTER.length} (key player not in company database)`);
console.log('');

if (byStatus.MISSING.length > 0) {
  console.log('='.repeat(80));
  console.log('CRITICAL: Companies with MISSING exposure (need to ADD exposure)');
  console.log('='.repeat(80));
  for (const r of byStatus.MISSING) {
    console.log(`\n${r.matchedCompany} → ${r.componentId} (${r.componentName})`);
    console.log(`  Sub-component: ${r.subComponentName}`);
    console.log(`  Market: ${r.marketStructure}, Severity: ${r.severity}/5`);
    console.log(`  Key player text: "${r.parsedPlayer}"`);
    console.log(`  Current: ${r.currentExposure}, Expected: ${r.expectedExposure}`);
  }
}

if (byStatus.LOW.length > 0) {
  console.log('\n' + '='.repeat(80));
  console.log('WARNING: Companies with LOW exposure (may need to INCREASE)');
  console.log('='.repeat(80));
  for (const r of byStatus.LOW) {
    console.log(`\n${r.matchedCompany} → ${r.componentId} (${r.componentName})`);
    console.log(`  Sub-component: ${r.subComponentName}`);
    console.log(`  Market: ${r.marketStructure}, Severity: ${r.severity}/5`);
    console.log(`  Key player text: "${r.parsedPlayer}"`);
    console.log(`  Current: ${r.currentExposure}, Expected: ${r.expectedExposure}`);
  }
}

if (byStatus.NOT_IN_ROSTER.length > 0) {
  console.log('\n' + '='.repeat(80));
  console.log('INFO: Key players NOT in company roster');
  console.log('='.repeat(80));
  const unique = [...new Set(byStatus.NOT_IN_ROSTER.map(r => r.parsedPlayer))];
  for (const player of unique) {
    const entries = byStatus.NOT_IN_ROSTER.filter(r => r.parsedPlayer === player);
    console.log(`\n"${player}"`);
    for (const e of entries) {
      console.log(`  - ${e.componentId}: ${e.subComponentName} (${e.marketStructure})`);
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log('DETAILED OK ENTRIES (for verification)');
console.log('='.repeat(80));
for (const r of byStatus.OK) {
  console.log(`✓ ${r.matchedCompany}: ${r.componentId}=${r.currentExposure} (${r.subComponentName}, ${r.marketStructure})`);
}
