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
    exposure: { 'c1': 5, 'c7': 5, 'c4': 5, 'c10': 4, 'c2': 4 },
    // New fields
    is_public: true,
    market_cap_usd: 42.5,
    revenue_ttm_usd: 80.2,
    grid_revenue_pct: 30,
    description: 'Japanese conglomerate with leading positions in HVDC systems, large power transformers, and rail infrastructure.',
    headquarters: 'Tokyo, Japan',
    primary_exchange: 'TSE',
    data_updated: '2024-12-01',
    data_sources: ['Company 10-K FY2024', 'Bloomberg'],
    data_confidence: 'high'
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
    exposure: { 'c1': 5, 'c4': 5, 'c7': 4, 'c10': 4 },
    // New fields
    is_public: true,
    market_cap_usd: 91.2,
    revenue_ttm_usd: 34.9,
    grid_revenue_pct: 95,
    description: 'Pure-play energy company spun off from GE, leading in gas turbines, grid solutions, and renewable energy equipment.',
    headquarters: 'Cambridge, MA, USA',
    primary_exchange: 'NYSE',
    data_updated: '2024-12-01',
    data_sources: ['GE Vernova 10-K 2024', 'Earnings Q3 2024'],
    data_confidence: 'high'
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
    exposure: { 'c1': 5, 'c7': 5, 'c4': 5, 'c6': 4 },
    // New fields
    is_public: true,
    market_cap_usd: 52.8,
    revenue_ttm_usd: 37.5,
    grid_revenue_pct: 80,
    description: 'German energy technology company with strong positions in grid technologies, gas turbines, and wind power (via Gamesa).',
    headquarters: 'Munich, Germany',
    primary_exchange: 'XETRA',
    data_updated: '2024-12-01',
    data_sources: ['Siemens Energy Annual Report 2024', 'Bloomberg'],
    data_confidence: 'high'
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
    exposure: { 'c2': 5, 'c3': 4, 'c4': 4, 'c5': 5 },
    // New fields
    is_public: true,
    market_cap_usd: 98.5,
    revenue_ttm_usd: 32.2,
    grid_revenue_pct: 60,
    description: 'Swiss-Swedish multinational specializing in electrification, robotics, and automation with strong medium-voltage and protection systems.',
    headquarters: 'Zurich, Switzerland',
    primary_exchange: 'SIX',
    data_updated: '2024-12-01',
    data_sources: ['ABB Annual Report 2024', 'Bloomberg'],
    data_confidence: 'high'
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
    exposure: { 'c4': 5, 'c6': 4, 'c7': 4, 'c1': 3 },
    // New fields
    is_public: true,
    market_cap_usd: 38.2,
    revenue_ttm_usd: 41.8,
    grid_revenue_pct: 50,
    description: 'Japanese electronics and electrical equipment manufacturer with positions in switchgear, FACTS devices, and HVDC.',
    headquarters: 'Tokyo, Japan',
    primary_exchange: 'TSE',
    data_updated: '2024-12-01',
    data_sources: ['Company FY2024 Report', 'Bloomberg'],
    data_confidence: 'high'
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
    exposure: { 'c1': 4, 'c7': 3, 'c2': 3 },
    // New fields
    is_public: true,
    market_cap_usd: 15.8,
    revenue_ttm_usd: 28.5,
    grid_revenue_pct: 40,
    description: 'Japanese conglomerate with energy systems, infrastructure, and electronics divisions. Privatized in 2023.',
    headquarters: 'Tokyo, Japan',
    primary_exchange: 'TSE',
    data_updated: '2024-12-01',
    data_sources: ['Company FY2024 Report'],
    data_confidence: 'medium'
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
    exposure: { 'c1': 5, 'c2': 5, 'c4': 3 },
    // New fields
    is_public: true,
    market_cap_usd: 8.2,
    revenue_ttm_usd: 3.1,
    grid_revenue_pct: 95,
    description: 'Korean pure-play power equipment manufacturer specializing in large transformers and switchgear for global markets.',
    headquarters: 'Seoul, South Korea',
    primary_exchange: 'KRX',
    data_updated: '2024-12-01',
    data_sources: ['Company Annual Report 2024', 'Bloomberg'],
    data_confidence: 'high'
  },
  {
    id: 'co_cg',
    name: 'CG Power',
    ticker: 'CGPOWER.NS',
    region: 'ROW',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.9,
    backlog_strength: 3,
    pricing_power: 2,
    exposure: { 'c2': 4, 'c3': 4, 'c1': 2 },
    // New fields
    is_public: true,
    market_cap_usd: 12.5,
    revenue_ttm_usd: 1.8,
    grid_revenue_pct: 90,
    description: 'Indian electrical equipment company focused on transformers, switchgear, and industrial motors.',
    headquarters: 'Mumbai, India',
    primary_exchange: 'NSE',
    data_updated: '2024-12-01',
    data_sources: ['Company Annual Report FY2024'],
    data_confidence: 'medium'
  },
  {
    id: 'co_weg',
    name: 'WEG',
    ticker: 'WEGE3.SA',
    region: 'ROW',
    type: 'TIER_1_OEM',
    universe: 'INVESTABLE',
    purity_score: 0.7,
    backlog_strength: 3,
    pricing_power: 2,
    exposure: { 'c2': 4, 'c3': 4 },
    // New fields
    is_public: true,
    market_cap_usd: 35.2,
    revenue_ttm_usd: 8.5,
    grid_revenue_pct: 70,
    description: 'Brazilian industrial equipment manufacturer with strong positions in motors, transformers, and automation.',
    headquarters: 'Jaraguá do Sul, Brazil',
    primary_exchange: 'B3',
    data_updated: '2024-12-01',
    data_sources: ['Company Annual Report 2024'],
    data_confidence: 'medium'
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
    exposure: { 'c11': 5 },
    // New fields
    is_public: true,
    market_cap_usd: 22.1,
    revenue_ttm_usd: 68.3,
    grid_revenue_pct: 20,
    description: 'World\'s largest steel producer with significant GOES (grain-oriented electrical steel) production for transformer cores.',
    headquarters: 'Luxembourg City, Luxembourg',
    primary_exchange: 'NYSE',
    data_updated: '2024-12-01',
    data_sources: ['Company Annual Report 2024', 'Bloomberg'],
    data_confidence: 'high'
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
    exposure: { 'c11': 5 },
    // New fields
    is_public: true,
    market_cap_usd: 18.5,
    revenue_ttm_usd: 58.2,
    grid_revenue_pct: 30,
    description: 'Korean steel conglomerate and major GOES producer, also expanding into battery materials.',
    headquarters: 'Pohang, South Korea',
    primary_exchange: 'KRX',
    data_updated: '2024-12-01',
    data_sources: ['Company Annual Report 2024'],
    data_confidence: 'medium'
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
    exposure: { 'c11': 5 },
    // New fields
    is_public: true,
    market_cap_usd: 24.8,
    revenue_ttm_usd: 52.1,
    grid_revenue_pct: 20,
    description: 'Japan\'s largest steelmaker with electrical steel production for transformer and motor applications.',
    headquarters: 'Tokyo, Japan',
    primary_exchange: 'TSE',
    data_updated: '2024-12-01',
    data_sources: ['Company FY2024 Report'],
    data_confidence: 'medium'
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
    exposure: { 'c11': 4 },
    // New fields
    is_public: true,
    market_cap_usd: 3.8,
    revenue_ttm_usd: 37.5,
    grid_revenue_pct: 20,
    description: 'German industrial conglomerate with electrical steel production through its Steel Europe division.',
    headquarters: 'Essen, Germany',
    primary_exchange: 'XETRA',
    data_updated: '2024-12-01',
    data_sources: ['Company Annual Report 2024'],
    data_confidence: 'medium'
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
    exposure: { 'c14': 5, 'c10': 4, 'c19': 3 },
    // New fields
    is_public: true,
    market_cap_usd: 48.5,
    revenue_ttm_usd: 23.7,
    grid_revenue_pct: 90,
    description: 'Largest US specialty contractor for electric power, pipeline, and telecom infrastructure with record backlog.',
    headquarters: 'Houston, TX, USA',
    primary_exchange: 'NYSE',
    data_updated: '2024-12-01',
    data_sources: ['Quanta 10-K 2024', 'Earnings Q3 2024'],
    data_confidence: 'high'
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
    exposure: { 'c14': 4, 'c10': 3 },
    // New fields
    is_public: true,
    market_cap_usd: 2.1,
    revenue_ttm_usd: 3.4,
    grid_revenue_pct: 90,
    description: 'Specialty electrical contractor focused on transmission and distribution infrastructure construction.',
    headquarters: 'Thornton, CO, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2024-12-01',
    data_sources: ['MYR Group 10-K 2024'],
    data_confidence: 'high'
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
    exposure: { 'c1': 5 },
    // New fields
    is_public: false,
    grid_revenue_pct: 100,
    description: 'German private company with ~70% global market share in on-load tap changers (OLTCs) for power transformers.',
    headquarters: 'Regensburg, Germany',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'T&D World'],
    data_confidence: 'medium'
  },
];
