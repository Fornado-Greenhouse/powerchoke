/**
 * Company roster - Split by tier for maintainability
 *
 * Each file can be updated independently by domain experts:
 * - tier1-oems.ts: Power transformer, switchgear, HVDC markets
 * - tier2-components.ts: Hidden monopolies, niche suppliers
 * - tier3-materials.ts: Steel/GOES, copper, cables
 * - service-epc.ts: Construction contractors
 * - utilities.ts: Regulated utilities, TSOs
 * - software.ts: Grid software, cybersecurity
 *
 * Update cadence:
 * - Quarterly: utilities, service-epc, tier3-materials (earnings)
 * - Annually: tier1-oems, tier2-components, software (10-K filings)
 */

import { Company } from '../types';
import { tier1Oems } from './tier1-oems';
import { tier2Components } from './tier2-components';
import { tier3Materials } from './tier3-materials';
import { serviceEpcs } from './service-epc';
import { utilities } from './utilities';
import { software } from './software';

// Re-export individual arrays for targeted updates
export { tier1Oems } from './tier1-oems';
export { tier2Components } from './tier2-components';
export { tier3Materials } from './tier3-materials';
export { serviceEpcs } from './service-epc';
export { utilities } from './utilities';
export { software } from './software';

// Combined array for the application
export const companies: Company[] = [
  ...tier1Oems,
  ...tier2Components,
  ...tier3Materials,
  ...serviceEpcs,
  ...utilities,
  ...software,
];

// Utility functions for future data management
export function getCompaniesByType(type: Company['type']): Company[] {
  return companies.filter(c => c.type === type);
}

export function getCompaniesByRegion(region: Company['region']): Company[] {
  return companies.filter(c => c.region === region);
}

export function getInvestableCompanies(): Company[] {
  return companies.filter(c => c.universe === 'INVESTABLE');
}

export function getCompanyById(id: string): Company | undefined {
  return companies.find(c => c.id === id);
}
