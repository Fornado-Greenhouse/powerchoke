import { Company } from './types';

/**
 * Company roster for the grid infrastructure supply chain.
 *
 * Exposure map: componentId -> strength (1-5)
 * - 5: Core business, dominant position
 * - 4: Major revenue contributor
 * - 3: Meaningful exposure
 * - 2: Minor exposure
 * - 1: Tangential
 */
export const companies: Company[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // TIER 1 OEMs - The Big 5
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_hitachi',
    name: 'Hitachi Ltd',
    ticker: '6501.T',
    region: 'JP',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.3,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c1': 5, 'c7': 5, 'c4': 5, 'c10': 4, 'c2': 4 }
  },
  {
    id: 'co_ge',
    name: 'GE Vernova',
    ticker: 'GEV',
    region: 'NA',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.95,
    backlog_strength: 5,
    pricing_power: 4,
    exposure: { 'c1': 5, 'c4': 5, 'c7': 4, 'c10': 4 }
  },
  {
    id: 'co_siemens',
    name: 'Siemens Energy',
    ticker: 'ENR.DE',
    region: 'EU',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.8,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c1': 5, 'c7': 5, 'c4': 5, 'c6': 4 }
  },
  {
    id: 'co_abb',
    name: 'ABB Ltd',
    ticker: 'ABBN.SW',
    region: 'EU',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.6,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c2': 5, 'c3': 4, 'c4': 4, 'c5': 5 }
  },
  {
    id: 'co_mitsubishi',
    name: 'Mitsubishi Elec',
    ticker: '6503.T',
    region: 'JP',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.5,
    backlog_strength: 4,
    pricing_power: 3,
    exposure: { 'c4': 5, 'c6': 4, 'c7': 4, 'c1': 3 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TIER 1 OEMs - Followers
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_toshiba',
    name: 'Toshiba',
    ticker: '6502.T',
    region: 'JP',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.4,
    backlog_strength: 3,
    pricing_power: 3,
    exposure: { 'c1': 4, 'c7': 3, 'c2': 3 }
  },
  {
    id: 'co_hyundai',
    name: 'Hyundai Electric',
    ticker: '267260.KS',
    region: 'KR',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.95,
    backlog_strength: 5,
    pricing_power: 4,
    exposure: { 'c1': 5, 'c2': 5, 'c4': 3 }
  },
  {
    id: 'co_cg',
    name: 'CG Power',
    ticker: 'CGPOWER',
    region: 'ROW',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.9,
    backlog_strength: 3,
    pricing_power: 2,
    exposure: { 'c2': 4, 'c3': 4, 'c1': 2 }
  },
  {
    id: 'co_weg',
    name: 'WEG',
    ticker: 'WEGE3',
    region: 'ROW',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.7,
    backlog_strength: 3,
    pricing_power: 2,
    exposure: { 'c2': 4, 'c3': 4 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MATERIALS - GOES / Steel
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_arcelor',
    name: 'ArcelorMittal',
    ticker: 'MT',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.2,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c11': 5 }
  },
  {
    id: 'co_posco',
    name: 'POSCO Holdings',
    ticker: 'PKX',
    region: 'KR',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.3,
    backlog_strength: 4,
    pricing_power: 3,
    exposure: { 'c11': 5 }
  },
  {
    id: 'co_nippon',
    name: 'Nippon Steel',
    ticker: '5401.T',
    region: 'JP',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.2,
    backlog_strength: 3,
    pricing_power: 3,
    exposure: { 'c11': 5 }
  },
  {
    id: 'co_thyssen',
    name: 'thyssenkrupp',
    ticker: 'TKA.DE',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.2,
    backlog_strength: 3,
    pricing_power: 3,
    exposure: { 'c11': 4 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SERVICE EPCs
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_quanta',
    name: 'Quanta Services',
    ticker: 'PWR',
    region: 'NA',
    type: 'SERVICE_EPC',
    universe: 'INVESTABLE',
    purity_score: 0.9,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c14': 5, 'c10': 4, 'c19': 3 }
  },
  {
    id: 'co_myr',
    name: 'MYR Group',
    ticker: 'MYRG',
    region: 'NA',
    type: 'SERVICE_EPC',
    universe: 'INVESTABLE',
    purity_score: 0.9,
    backlog_strength: 3,
    pricing_power: 3,
    exposure: { 'c14': 4, 'c10': 3 }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HIDDEN MONOPOLIES - Not publicly investable but critical to understand
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_mr',
    name: 'Reinhausen (MR)',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c1': 5 }
  },
];
