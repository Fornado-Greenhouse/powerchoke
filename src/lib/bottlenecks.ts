/**
 * Bottleneck Detection Library
 *
 * Identifies "true bottleneck" positions where a company holds a key player role
 * in a severe monopoly/duopoly sub-component with high market share exposure.
 *
 * Criteria for TRUE BOTTLENECK:
 * 1. Sub-component severity >= 4
 * 2. Market structure = "Monopoly" or "Duopoly"
 * 3. Company name matches one of the key_players
 * 4. Company has exposure >= 4 to that component
 */

import { Company, ComponentRow, BottleneckMatch, SubComponent } from '@/data/types';

/**
 * Normalize a string for fuzzy matching:
 * - Lowercase
 * - Remove parentheticals like "(MR)" or "(EPCOS)"
 * - Trim whitespace
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, ' ')  // Remove parentheticals
    .replace(/\s+/g, ' ')               // Collapse whitespace
    .trim();
}

/**
 * Known aliases mapping company names to their variants in key_player fields.
 * Also maps subsidiaries to parent company names.
 */
const COMPANY_ALIASES: Record<string, string[]> = {
  'Reinhausen (MR)': ['Reinhausen', 'MR', 'MR Reinhausen'],
  'Hitachi Ltd': ['Hitachi', 'Hitachi Energy', 'Hitachi Metals', 'Hitachi Metglas', 'Metglas', 'Finemet'],
  'ABB Ltd': ['ABB', 'ABB HybridBreaker', 'HybridBreaker'],
  'Infineon Technologies': ['Infineon'],
  'Mitsubishi Elec': ['Mitsubishi', 'Mitsubishi Electric'],
  'CTC Global': ['CTC'],
  'Toray Industries': ['Toray'],
  'Hexcel Corporation': ['Hexcel'],
  'Weidmann Electrical Technology': ['Weidmann'],
  'Vacuumschmelze (VAC)': ['Vacuumschmelze', 'VAC', 'VITROPERM'],
  'Bentley Systems': ['Bentley', 'Power Line Systems', 'PLS-CADD', 'PLS'],
  'Analog Devices': ['ADI', 'Analog Devices'],
  'Texas Instruments': ['TI', 'Texas Instruments'],
  'Omicron Electronics': ['Omicron'],
  'Doble Engineering (ESCO)': ['Doble'],
  'ETAP': ['ETAP'],
  'SKM Systems Analysis': ['SKM', 'SKM Systems'],
  'Essex Furukawa Magnet Wire': ['Essex Furukawa', 'Essex', 'Superior Essex'],
  'Siemens Energy': ['Siemens', 'Trench', 'Trench Group'],
  'Schneider Electric': ['Schneider', 'AVEVA', 'PI System'],
  'GE Vernova': ['GE', 'GE Grid Solutions', 'GE Vernova'],
  'TDK Corporation': ['TDK', 'EPCOS'],
};

/**
 * Check if a company name matches a key_player string.
 * Handles:
 * - Direct matches
 * - Alias matches
 * - Slash-separated duopolies (e.g., "Infineon / Mitsubishi")
 * - Parenthetical variations (e.g., "Reinhausen (MR)")
 */
function companyMatchesKeyPlayer(companyName: string, keyPlayer: string): boolean {
  const normalizedCompany = normalizeName(companyName);
  const normalizedKeyPlayer = normalizeName(keyPlayer);

  // Direct match
  if (normalizedKeyPlayer.includes(normalizedCompany)) {
    return true;
  }

  // Check aliases
  const aliases = COMPANY_ALIASES[companyName] || [];
  for (const alias of aliases) {
    const normalizedAlias = normalizeName(alias);
    if (normalizedKeyPlayer.includes(normalizedAlias)) {
      return true;
    }
  }

  // Split by "/" for duopolies and check each
  const keyPlayerParts = keyPlayer.split('/').map(s => s.trim());
  for (const part of keyPlayerParts) {
    const normalizedPart = normalizeName(part);
    if (normalizedPart.includes(normalizedCompany)) {
      return true;
    }
    // Check against aliases
    for (const alias of aliases) {
      const normalizedAlias = normalizeName(alias);
      if (normalizedPart.includes(normalizedAlias)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Check if a sub-component qualifies as a "true bottleneck" candidate.
 * Criteria: severity >= 4 AND (Monopoly OR Duopoly)
 */
function isBottleneckSubComponent(sub: SubComponent): boolean {
  if (sub.severity < 4) return false;

  const structure = sub.market_structure.toLowerCase();
  return structure === 'monopoly' || structure === 'duopoly';
}

/**
 * Find all bottleneck matches for a given company across all components.
 */
export function findBottleneckMatches(
  company: Company,
  components: ComponentRow[]
): BottleneckMatch[] {
  const matches: BottleneckMatch[] = [];

  for (const component of components) {
    if (!component.sub_components) continue;

    // Check if company has exposure >= 4 to this component
    const exposure = company.exposure[component.id];
    if (!exposure || exposure < 4) continue;

    // Check each sub-component
    for (const sub of component.sub_components) {
      if (!isBottleneckSubComponent(sub)) continue;

      // Check if company matches key_player
      if (companyMatchesKeyPlayer(company.name, sub.key_player)) {
        matches.push({
          companyId: company.id,
          companyName: company.name,
          componentId: component.id,
          componentName: component.name,
          subComponentName: sub.name,
          subComponentSeverity: sub.severity,
          marketStructure: sub.market_structure,
          keyPlayer: sub.key_player,
          exposure,
        });
      }
    }
  }

  return matches;
}

/**
 * Build a lookup map of all bottleneck positions.
 * Key: "companyId:componentId"
 * Value: Array of BottleneckMatch objects (a company can have multiple bottlenecks in same component)
 */
export function buildBottleneckMap(
  companies: Company[],
  components: ComponentRow[]
): Map<string, BottleneckMatch[]> {
  const map = new Map<string, BottleneckMatch[]>();

  for (const company of companies) {
    const matches = findBottleneckMatches(company, components);
    for (const match of matches) {
      const key = `${match.companyId}:${match.componentId}`;
      const existing = map.get(key) || [];
      existing.push(match);
      map.set(key, existing);
    }
  }

  return map;
}

/**
 * Check if a specific cell (company × component) is a bottleneck position.
 * Returns the bottleneck info if true, undefined otherwise.
 */
export function getBottleneckForCell(
  map: Map<string, BottleneckMatch[]>,
  companyId: string,
  componentId: string
): BottleneckMatch | undefined {
  const key = `${companyId}:${componentId}`;
  const matches = map.get(key);
  // Return first match (highest severity if multiple)
  return matches?.[0];
}

/**
 * Get all bottleneck matches across all companies, sorted by severity (descending).
 */
export function getAllBottlenecks(
  companies: Company[],
  components: ComponentRow[]
): BottleneckMatch[] {
  const allMatches: BottleneckMatch[] = [];

  for (const company of companies) {
    const matches = findBottleneckMatches(company, components);
    allMatches.push(...matches);
  }

  // Sort by severity (descending), then by company name
  return allMatches.sort((a, b) => {
    if (b.subComponentSeverity !== a.subComponentSeverity) {
      return b.subComponentSeverity - a.subComponentSeverity;
    }
    return a.companyName.localeCompare(b.companyName);
  });
}

/**
 * Group bottleneck matches by component for display purposes.
 */
export function groupBottlenecksByComponent(
  matches: BottleneckMatch[]
): Map<string, BottleneckMatch[]> {
  const grouped = new Map<string, BottleneckMatch[]>();

  for (const match of matches) {
    const existing = grouped.get(match.componentId) || [];
    existing.push(match);
    grouped.set(match.componentId, existing);
  }

  return grouped;
}
