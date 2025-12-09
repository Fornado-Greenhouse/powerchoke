/**
 * Company roster re-export for backwards compatibility.
 *
 * The actual data is now split by tier type in the companies/ directory
 * for easier maintenance. See companies/index.ts for the structure.
 */
export {
  companies,
  tier1Oems,
  tier2Components,
  tier3Materials,
  serviceEpcs,
  utilities,
  software,
  getCompaniesByType,
  getCompaniesByRegion,
  getInvestableCompanies,
  getCompanyById,
} from './companies/index';
