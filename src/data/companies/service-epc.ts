import { Company } from '../types';

/**
 * SERVICE EPCs - Construction and engineering contractors
 *
 * Update cadence: Quarterly (backlog figures in earnings)
 * Expertise needed: Utility construction markets, labor dynamics
 */
export const serviceEpcs: Company[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // North America
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
    exposure_rationale: {
      'c14': { rationale: 'Largest US utility contractor by revenue with dominant T&D construction market share', metric: '$27B+ annual revenue, 90% grid-related', source: 'Quanta 10-K 2024' },
      'c10': { rationale: 'Leading provider of substation construction and integration services across North America', metric: 'Electric Power Infrastructure segment ~$20B revenue', source: 'Earnings Q3 2024' },
      'c19': { rationale: 'Growing underground and submarine cable installation capabilities through specialized divisions', metric: 'Underground transmission and distribution services', source: 'Quanta 10-K 2024' }
    },
    is_public: true,
    market_cap_usd: 68.7,
    revenue_ttm_usd: 27.1,
    grid_revenue_pct: 90,
    description: 'Largest US specialty contractor for electric power, pipeline, and telecom infrastructure with record backlog.',
    headquarters: 'Houston, TX, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Quanta 10-K 2024', 'Earnings Q3 2024', 'FMP API'],
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
    exposure_rationale: {
      'c14': { rationale: 'Pure-play T&D contractor significantly expanded through Pike Electric acquisition', metric: '$3.5B revenue, 90% grid infrastructure', source: 'MYR Group 10-K 2024' },
      'c10': { rationale: 'Provides comprehensive substation construction and upgrade services for utility clients', metric: 'Transmission & Distribution segment serves major US utilities', source: 'MYR Group 10-K 2024' }
    },
    is_public: true,
    market_cap_usd: 3.5,
    revenue_ttm_usd: 3.5,
    grid_revenue_pct: 90,
    description: 'Specialty electrical contractor focused on transmission and distribution infrastructure construction. Acquired Pike Electric in 2022.',
    headquarters: 'Thornton, CO, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['MYR Group 10-K 2024', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_mastec',
    name: 'MasTec',
    ticker: 'MTZ',
    region: 'NA',
    type: 'SERVICE_EPC',
    universe: 'INVESTABLE',
    purity_score: 0.65,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c14': 4, 'c10': 4, 'c19': 3 },
    exposure_rationale: {
      'c14': { rationale: 'Power Delivery segment is top-3 US utility contractor for transmission and distribution construction', metric: '~$9B Power Delivery revenue (65% of total)', source: 'MasTec 10-K 2024' },
      'c10': { rationale: 'Major provider of substation construction, upgrades, and integration services nationwide', metric: 'Serves investor-owned utilities, co-ops, and municipals', source: 'Q3 2024 Earnings' },
      'c19': { rationale: 'Significant underground cable installation capabilities for both transmission and distribution projects', metric: 'Specialized underground infrastructure services', source: 'MasTec 10-K 2024' }
    },
    is_public: true,
    market_cap_usd: 17.5,
    revenue_ttm_usd: 13.8,
    grid_revenue_pct: 65,
    description: 'Major US infrastructure contractor serving energy, utility, and communications markets. Power Delivery segment focuses on transmission and distribution infrastructure.',
    headquarters: 'Coral Gables, FL, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['MasTec 10-K 2024', 'Q3 2024 Earnings', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_primoris',
    name: 'Primoris Services',
    ticker: 'PRIM',
    region: 'NA',
    type: 'SERVICE_EPC',
    universe: 'INVESTABLE',
    purity_score: 0.5,
    backlog_strength: 3,
    pricing_power: 3,
    exposure: { 'c14': 3, 'c10': 3, 'c19': 2 },
    exposure_rationale: {
      'c14': { rationale: 'Power, Industrial & Engineering division provides T&D construction services across utilities and renewables sectors', metric: '~$3.8B utility/power revenue (50% of total)', source: 'Primoris 10-K 2024' },
      'c10': { rationale: 'Delivers substation construction and electrical infrastructure services for utility and renewable energy projects', metric: 'Electrical and instrumentation capabilities', source: 'Primoris 10-K 2024' },
      'c19': { rationale: 'Underground utility construction services including conduit and cable installation for distribution networks', metric: 'Underground infrastructure in utility segment', source: 'Industry analysis' }
    },
    is_public: true,
    market_cap_usd: 7.2,
    revenue_ttm_usd: 7.5,
    grid_revenue_pct: 50,
    description: 'Specialty contractor focused on utilities, energy, and renewables with T&D services through Power, Industrial & Engineering division.',
    headquarters: 'Dallas, TX, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Primoris 10-K 2024', 'Industry analysis', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_dycom',
    name: 'Dycom Industries',
    ticker: 'DY',
    region: 'NA',
    type: 'SERVICE_EPC',
    universe: 'INVESTABLE',
    purity_score: 0.25,
    backlog_strength: 3,
    pricing_power: 3,
    exposure: { 'c19': 2, 'c10': 2 },
    exposure_rationale: {
      'c19': { rationale: 'Leading underground infrastructure contractor expanding from telecom into electric utility underground cable installation', metric: '~$1.3B electric utility revenue (25% of total)', source: 'Dycom 10-K 2024' },
      'c10': { rationale: 'Growing capabilities in utility substation and distribution infrastructure construction as electric utility segment expands', metric: 'Electric utility services to IOUs and co-ops', source: 'Dycom 10-K 2024' }
    },
    is_public: true,
    market_cap_usd: 10.1,
    revenue_ttm_usd: 5.2,
    grid_revenue_pct: 25,
    description: 'Specialty contractor primarily focused on telecommunications underground infrastructure, with growing utility underground cable installation services.',
    headquarters: 'Palm Beach Gardens, FL, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Dycom 10-K 2024', 'FMP API'],
    data_confidence: 'high'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // International
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_vinci',
    name: 'Vinci',
    ticker: 'DG.PA',
    region: 'EU',
    type: 'SERVICE_EPC',
    universe: 'INVESTABLE',
    purity_score: 0.15,
    backlog_strength: 5,
    pricing_power: 4,
    exposure: { 'c14': 3, 'c10': 4 },
    exposure_rationale: {
      'c14': { rationale: 'Vinci Energies division is major European energy infrastructure contractor with T&D construction capabilities across multiple countries', metric: '~€19B Vinci Energies revenue, ~15% grid-related', source: 'Vinci Annual Report 2024' },
      'c10': { rationale: 'Strong substation integration and electrical infrastructure capabilities through Omexom and Actemium brands across Europe', metric: 'Network infrastructure services in 60+ countries', source: 'Vinci Annual Report 2024' }
    },
    is_public: true,
    market_cap_usd: 68.5,
    revenue_ttm_usd: 72.8,
    grid_revenue_pct: 15,
    description: 'French construction and concession giant. Vinci Energies division (~€19B revenue) provides energy infrastructure services including T&D EPC work.',
    headquarters: 'Nanterre, France',
    primary_exchange: 'Euronext Paris',
    data_updated: '2024-12-01',
    data_sources: ['Vinci Annual Report 2024', 'Bloomberg'],
    data_confidence: 'high'
  },
  {
    id: 'co_bouygues',
    name: 'Bouygues',
    ticker: 'EN.PA',
    region: 'EU',
    type: 'SERVICE_EPC',
    universe: 'INVESTABLE',
    purity_score: 0.12,
    backlog_strength: 4,
    pricing_power: 3,
    exposure: { 'c14': 3, 'c10': 3 },
    exposure_rationale: {
      'c14': { rationale: 'Bouygues Energies & Services division provides T&D construction and electrical infrastructure services across France and Europe', metric: '~€7B energy services revenue (12% grid infrastructure)', source: 'Bouygues Annual Report 2024' },
      'c10': { rationale: 'Multi-technical services include substation construction, electrical installations, and grid modernization projects', metric: 'Electrical engineering and industrial services capabilities', source: 'Bouygues Annual Report 2024' }
    },
    is_public: true,
    market_cap_usd: 19.4,
    revenue_ttm_usd: 58.2,
    grid_revenue_pct: 12,
    description: 'French construction and telecom conglomerate. Bouygues Energies & Services provides multi-technical services including electrical infrastructure and grid services.',
    headquarters: 'Paris, France',
    primary_exchange: 'Euronext Paris',
    data_updated: '2025-12-09',
    data_sources: ['Bouygues Annual Report 2024', 'FMP API'],
    data_confidence: 'medium'
  },
  {
    id: 'co_lt',
    name: 'Larsen & Toubro',
    ticker: 'LT.NS',
    region: 'ROW',
    type: 'SERVICE_EPC',
    universe: 'INVESTABLE',
    purity_score: 0.35,
    backlog_strength: 5,
    pricing_power: 3,
    exposure: { 'c14': 5, 'c10': 4, 'c19': 3, 'c20': 4 },
    exposure_rationale: {
      'c14': { rationale: 'Power T&D business is dominant EPC player in India and major international contractor for transmission projects', metric: '~$9B Power T&D revenue (35% of total)', source: 'L&T Annual Report FY2024' },
      'c10': { rationale: 'Leading substation EPC contractor with extensive experience in 765kV, 400kV, and 220kV substations across India and Middle East', metric: 'Largest T&D EPC order book in India', source: 'L&T Annual Report FY2024' },
      'c19': { rationale: 'Underground and submarine cable installation capabilities for transmission and distribution projects including cross-border interconnectors', metric: 'Cable laying and jointing expertise', source: 'Industry analysis' },
      'c20': { rationale: 'HVDC integration capabilities including converter stations and system integration for long-distance transmission projects', metric: 'HVDC project experience in India and Middle East', source: 'L&T Annual Report FY2024' }
    },
    is_public: true,
    market_cap_usd: 58.2,
    revenue_ttm_usd: 25.8,
    grid_revenue_pct: 35,
    description: 'Indian engineering and construction conglomerate. Power T&D business is a major domestic and international EPC player with HVDC integration capabilities.',
    headquarters: 'Mumbai, India',
    primary_exchange: 'NSE',
    data_updated: '2024-12-01',
    data_sources: ['L&T Annual Report FY2024', 'Industry analysis'],
    data_confidence: 'high'
  },
  {
    id: 'co_powerchina',
    name: 'PowerChina',
    ticker: '601669.SS',
    region: 'CN',
    type: 'SERVICE_EPC',
    universe: 'INVESTABLE',
    purity_score: 0.6,
    backlog_strength: 5,
    pricing_power: 4,
    exposure: { 'c14': 5, 'c10': 5, 'c19': 4, 'c20': 4 },
    exposure_rationale: {
      'c14': { rationale: 'World\'s largest power EPC contractor with dominant position in China\'s UHV transmission build-out and major international projects', metric: '~$50B power transmission revenue (60% of total)', source: 'Company Annual Report 2024' },
      'c10': { rationale: 'Leading EPC contractor for ultra-high voltage substations and converter stations in China\'s nationwide UHV network', metric: 'Built majority of China\'s 1000kV and 800kV substations', source: 'Industry analysis' },
      'c19': { rationale: 'Extensive underground and submarine cable installation capabilities including long-distance HVDC cable projects', metric: 'Cross-strait and offshore transmission projects', source: 'Company Annual Report 2024' },
      'c20': { rationale: 'Major HVDC integration capabilities with experience in VSC and LCC converter stations for China\'s UHV backbone', metric: 'Multiple ±800kV and ±1100kV HVDC projects', source: 'Industry analysis' }
    },
    is_public: true,
    market_cap_usd: 12.5,
    revenue_ttm_usd: 82.5,
    grid_revenue_pct: 60,
    description: 'Chinese state-owned enterprise and world\'s largest power EPC contractor. Specializes in UHV transmission projects, HVDC integration, and large-scale substation construction.',
    headquarters: 'Beijing, China',
    primary_exchange: 'SSE',
    data_updated: '2024-12-01',
    data_sources: ['Company Annual Report 2024', 'Industry analysis'],
    data_confidence: 'medium'
  },
  {
    id: 'co_samsung_ct',
    name: 'Samsung C&T',
    ticker: '028260.KS',
    region: 'KR',
    type: 'SERVICE_EPC',
    universe: 'INVESTABLE',
    purity_score: 0.2,
    backlog_strength: 4,
    pricing_power: 3,
    exposure: { 'c14': 3, 'c10': 3, 'c20': 3 },
    exposure_rationale: {
      'c14': { rationale: 'Energy & Plant division provides EPC services for transmission infrastructure in Korea and international markets', metric: '~$7.6B energy/plant revenue (20% grid infrastructure)', source: 'Samsung C&T Annual Report 2024' },
      'c10': { rationale: 'Substation construction and electrical infrastructure capabilities for utility-scale projects domestically and abroad', metric: 'Substation and switchyard EPC services', source: 'Samsung C&T Annual Report 2024' },
      'c20': { rationale: 'HVDC integration experience including converter station construction for offshore wind and long-distance transmission projects', metric: 'Offshore converter platforms and HVDC systems', source: 'Industry analysis' }
    },
    is_public: true,
    market_cap_usd: 27.8,
    revenue_ttm_usd: 38.2,
    grid_revenue_pct: 20,
    description: 'Samsung Group\'s engineering and construction arm. Energy & Plant division provides EPC services for power transmission, substations, and renewable energy projects globally.',
    headquarters: 'Seoul, South Korea',
    primary_exchange: 'KRX',
    data_updated: '2025-12-09',
    data_sources: ['Samsung C&T Annual Report 2024', 'Industry analysis', 'FMP API'],
    data_confidence: 'medium'
  },
];
