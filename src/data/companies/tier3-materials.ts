import { Company } from '../types';

/**
 * TIER 3 MATERIALS - Raw material suppliers
 *
 * Update cadence: Quarterly (commodity prices fluctuate)
 * Expertise needed: Steel/GOES markets, copper mining, cable industry
 */
export const tier3Materials: Company[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // GOES / Electrical Steel
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
    exposure_rationale: {
      'c11': {
        rationale: 'World\'s largest steel producer with major GOES production facilities across Europe and Americas, supplying transformer manufacturers globally',
        metric: '~25% global GOES market share',
        source: 'Company Annual Report 2024, steel industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 32.9,
    revenue_ttm_usd: 61.1,
    grid_revenue_pct: 20,
    description: 'World\'s largest steel producer with significant GOES (grain-oriented electrical steel) production for transformer cores.',
    headquarters: 'Luxembourg City, Luxembourg',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Company Annual Report 2024', 'Bloomberg', 'FMP API'],
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
    exposure_rationale: {
      'c11': {
        rationale: 'Leading Asian GOES producer with advanced HiB (high magnetic flux density) grades, dominant supplier to Korean and Asian transformer OEMs',
        metric: '~20% global GOES capacity, #1 in Asia',
        source: 'Company Annual Report 2024, Asian steel market data'
      }
    },
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
    exposure_rationale: {
      'c11': {
        rationale: 'Japan\'s largest steel producer with premium GOES grades for high-efficiency transformers, key supplier to Hitachi Energy, Toshiba, and Mitsubishi Electric',
        metric: '~18% global GOES market, leading Japanese producer',
        source: 'Company FY2024 Report, Japanese steel industry data'
      }
    },
    is_public: true,
    market_cap_usd: 20.7,
    revenue_ttm_usd: 52.1,
    grid_revenue_pct: 20,
    description: 'Japan\'s largest steelmaker with electrical steel production for transformer and motor applications.',
    headquarters: 'Tokyo, Japan',
    primary_exchange: 'TSE',
    data_updated: '2025-12-09',
    data_sources: ['Company FY2024 Report', 'FMP API'],
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
    exposure_rationale: {
      'c11': {
        rationale: 'European electrical steel producer via Steel Europe division, regional supplier to Siemens Energy and other European transformer manufacturers',
        metric: '~8-10% European GOES market share',
        source: 'Company Annual Report 2024, European steel market analysis'
      }
    },
    is_public: true,
    market_cap_usd: 6.5,
    revenue_ttm_usd: 37.5,
    grid_revenue_pct: 20,
    description: 'German industrial conglomerate with electrical steel production through its Steel Europe division.',
    headquarters: 'Essen, Germany',
    primary_exchange: 'XETRA',
    data_updated: '2025-12-09',
    data_sources: ['Company Annual Report 2024', 'FMP API'],
    data_confidence: 'medium'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Copper Miners
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_fcx',
    name: 'Freeport-McMoRan',
    ticker: 'FCX',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.75,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c12': 5, 'c8': 4, 'c19': 4 },
    exposure_rationale: {
      'c12': {
        rationale: 'World\'s largest publicly traded copper producer with operations in Americas (Morenci, Cerro Verde, Grasberg). Copper is fundamental input for all grid infrastructure',
        metric: '~8% global mined copper production (1.6M tons annually)',
        source: 'FCX 10-K 2024, Q3 2024 Earnings'
      },
      'c8': {
        rationale: 'Copper feedstock for ACSR and conductor manufacturers globally, tight supply drives conductor pricing',
        metric: 'Copper represents 75% of revenue',
        source: 'FCX 10-K 2024'
      },
      'c19': {
        rationale: 'Primary copper input for underground and submarine cable manufacturers (Prysmian, Nexans, NKT)',
        metric: 'Critical material for HV cable insulation systems',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 62.5,
    revenue_ttm_usd: 22.8,
    grid_revenue_pct: 75,
    description: 'Largest publicly traded copper producer globally, operating major mines in Americas and Indonesia. Copper represents ~75% of revenue, critical feedstock for all electrical infrastructure.',
    headquarters: 'Phoenix, AZ, USA',
    primary_exchange: 'NYSE',
    data_updated: '2024-12-01',
    data_sources: ['FCX 10-K 2024', 'Q3 2024 Earnings', 'Industry estimates'],
    data_confidence: 'medium'
  },
  {
    id: 'co_scco',
    name: 'Southern Copper',
    ticker: 'SCCO',
    region: 'ROW',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.85,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c12': 5, 'c8': 4, 'c19': 4 },
    exposure_rationale: {
      'c12': {
        rationale: 'Top-3 global copper producer with world-class low-cost mines in Peru (Cuajone, Toquepala) and Mexico (Buenavista). Largest copper reserves among publicly traded miners',
        metric: '~5% global copper production (~1M tons annually)',
        source: 'SCCO 10-K 2024, Q3 2024 Earnings'
      },
      'c8': {
        rationale: 'Pure-play copper exposure (85% of revenue) provides direct feedstock to conductor wire manufacturers',
        metric: 'Lowest cost quartile producer, margin advantage',
        source: 'SCCO 10-K 2024'
      },
      'c19': {
        rationale: 'High-purity copper cathode output supplies cable manufacturers for HV underground and subsea applications',
        metric: 'Premium copper grades for electrical applications',
        source: 'Industry estimates'
      }
    },
    is_public: true,
    market_cap_usd: 115.4,
    revenue_ttm_usd: 12.3,
    grid_revenue_pct: 85,
    description: 'Low-cost copper producer with mines in Peru and Mexico. One of world\'s largest copper reserves, ~85% of revenue from copper production.',
    headquarters: 'Phoenix, AZ, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['SCCO 10-K 2024', 'Q3 2024 Earnings', 'Industry estimates', 'FMP API'],
    data_confidence: 'medium'
  },
  {
    id: 'co_aurubis',
    name: 'Aurubis AG',
    ticker: 'NDA.DE',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.6,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c12': 5, 'c8': 3, 'c19': 3 },
    exposure_rationale: {
      'c12': {
        rationale: 'Europe\'s largest copper smelter and recycler, produces premium oxygen-free copper (OFC) and CTC for transformer windings. Critical European supplier',
        metric: '~1M tons annual copper cathode capacity, EU market leader',
        source: 'Aurubis Annual Report 2024'
      },
      'c8': {
        rationale: 'Specialty copper rod products for conductor and magnet wire applications, particularly for European T&D market',
        metric: 'Premium rod production for electrical applications',
        source: 'Industry reports'
      },
      'c19': {
        rationale: 'High-purity copper feedstock for European cable manufacturers including Prysmian and Nexans',
        metric: 'Key supplier to EU HV cable industry',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 5.8,
    revenue_ttm_usd: 17.2,
    grid_revenue_pct: 60,
    description: 'Europe\'s largest copper producer and recycler with specialty in oxygen-free copper rod for magnet wire and CTC (continuously transposed conductor) used in transformer windings.',
    headquarters: 'Hamburg, Germany',
    primary_exchange: 'XETRA',
    data_updated: '2024-12-01',
    data_sources: ['Aurubis Annual Report 2024', 'Industry reports'],
    data_confidence: 'medium'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Cable Manufacturers
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_prysmian',
    name: 'Prysmian Group',
    ticker: 'PRY.MI',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.9,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c8': 5, 'c19': 5, 'c12': 3 },
    exposure_rationale: {
      'c8': {
        rationale: 'Global leader in overhead transmission conductors (ACSR, ACCC) with manufacturing across Europe, Americas, and Asia. Acquired General Cable (2018) for market dominance',
        metric: '~30% global HV conductor market share',
        source: 'Prysmian Annual Report 2024, T&D World'
      },
      'c19': {
        rationale: 'World\'s #1 subsea HVDC cable manufacturer with proprietary P-Laser technology, dominant in offshore wind interconnectors and cross-border links. Multi-year backlog',
        metric: '~35-40% global HVDC subsea cable market, 50%+ in offshore wind',
        source: 'Prysmian Annual Report 2024, industry reports'
      },
      'c12': {
        rationale: 'Major copper consumer for cable production, vertically integrated with copper rod manufacturing in some facilities',
        metric: 'Significant copper procurement volumes',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 28.1,
    revenue_ttm_usd: 15.5,
    grid_revenue_pct: 90,
    description: 'World\'s largest cable manufacturer with leadership in subsea HVDC cables, transmission conductors, and underground MV/HV cables. Acquired General Cable (2018).',
    headquarters: 'Milan, Italy',
    primary_exchange: 'Borsa Italiana',
    data_updated: '2025-12-09',
    data_sources: ['Prysmian Annual Report 2024', 'Industry reports', 'T&D World', 'FMP API'],
    data_confidence: 'medium'
  },
  {
    id: 'co_nexans',
    name: 'Nexans',
    ticker: 'NEX.PA',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.85,
    backlog_strength: 5,
    pricing_power: 4,
    exposure: { 'c8': 5, 'c19': 5, 'c12': 3 },
    exposure_rationale: {
      'c8': {
        rationale: 'Major overhead conductor supplier particularly strong in European and emerging markets, full range from distribution to EHV transmission',
        metric: '~15-20% European HV conductor market',
        source: 'Nexans Annual Report 2024, industry reports'
      },
      'c19': {
        rationale: '#2 global player in subsea HVDC cables, key supplier for offshore wind (including Dogger Bank), land HV cables, and distribution networks. Divested building wire to focus on electrification',
        metric: '~25% global HVDC subsea market, strong European land cable position',
        source: 'Nexans Annual Report 2024, industry analysis'
      },
      'c12': {
        rationale: 'Significant copper procurement for cable operations, exposure to copper price volatility in cable pricing',
        metric: 'Large-scale copper consumer',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 6.2,
    revenue_ttm_usd: 7.8,
    grid_revenue_pct: 85,
    description: 'Major European cable manufacturer with strong positions in HVDC subsea cables, land transmission cables, and distribution cables. Focused electrification strategy.',
    headquarters: 'Courbevoie, France',
    primary_exchange: 'Euronext Paris',
    data_updated: '2025-12-09',
    data_sources: ['Nexans Annual Report 2024', 'Industry reports', 'FMP API'],
    data_confidence: 'medium'
  },
  {
    id: 'co_nkt',
    name: 'NKT A/S',
    ticker: 'NKT.CO',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.95,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c8': 4, 'c19': 5, 'c12': 2 },
    exposure_rationale: {
      'c8': {
        rationale: 'Land-based HV conductor production, secondary to subsea cable focus but serves Nordic and European utilities',
        metric: 'Regional HV conductor supplier',
        source: 'NKT Annual Report 2024'
      },
      'c19': {
        rationale: 'Pure-play HV cable specialist, #3 globally in HVDC subsea cables with particular strength in offshore wind export cables. Record backlog (EUR 4B+) driven by European offshore wind buildout',
        metric: '~15-20% global HVDC subsea market, growing in offshore wind',
        source: 'NKT Annual Report 2024, industry reports'
      },
      'c12': {
        rationale: 'Copper input for cable manufacturing, smaller scale vs Prysmian/Nexans',
        metric: 'Moderate copper consumer',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 6.6,
    revenue_ttm_usd: 2.5,
    grid_revenue_pct: 95,
    description: 'Danish HV cable specialist, pure-play on power cables with particular strength in offshore wind HVDC export cables. Record backlog driven by European offshore wind.',
    headquarters: 'Brøndby, Denmark',
    primary_exchange: 'Nasdaq Copenhagen',
    data_updated: '2025-12-09',
    data_sources: ['NKT Annual Report 2024', 'Industry reports', 'FMP API'],
    data_confidence: 'medium'
  },
  {
    id: 'co_southwire',
    name: 'Southwire',
    ticker: 'Private',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 0.9,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c8': 5, 'c19': 4, 'c12': 4 },
    exposure_rationale: {
      'c8': {
        rationale: 'Largest US wire and cable manufacturer, dominant supplier of overhead transmission conductors (ACSR, ACCC, ACSS) to US utilities and EPC contractors',
        metric: '~40% US transmission conductor market share',
        source: 'T&D World, industry reports'
      },
      'c19': {
        rationale: 'Major US supplier of underground distribution and transmission cables, MV/HV land cables for utility and industrial markets',
        metric: 'Leading US position in land-based HV cables',
        source: 'Industry reports, T&D World'
      },
      'c12': {
        rationale: 'Vertically integrated with copper rod production (rod mills in Georgia), reducing supply chain risk. Major copper consumer',
        metric: 'Own copper rod mills, significant procurement volumes',
        source: 'Company website, industry analysis'
      }
    },
    is_public: false,
    grid_revenue_pct: 90,
    description: 'Largest US-based wire and cable manufacturer, private company. Major supplier of transmission conductors (ACSR, ACCC), distribution cables, and building wire.',
    headquarters: 'Carrollton, GA, USA',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'T&D World', 'Company website'],
    data_confidence: 'low'
  },
  {
    id: 'co_toray',
    name: 'Toray Industries',
    ticker: '3402.T',
    region: 'JP',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.15,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c8': 4 },
    exposure_rationale: {
      'c8': {
        rationale: 'World\'s leading carbon fiber manufacturer, critical supplier of carbon fiber composite cores for ACCC (Aluminum Conductor Composite Core) high-temperature low-sag transmission conductors. ACCC enables higher capacity on existing towers',
        metric: '~30% global carbon fiber market, monopoly in ACCC core material',
        source: 'Toray Annual Report FY2024, CTC Global (ACCC licensee)'
      }
    },
    is_public: true,
    market_cap_usd: 9.8,
    revenue_ttm_usd: 22.5,
    grid_revenue_pct: 15,
    description: 'Japanese materials conglomerate and world leader in carbon fiber. Supplies carbon fiber core for ACCC (Aluminum Conductor Composite Core) high-temperature transmission conductors.',
    headquarters: 'Tokyo, Japan',
    primary_exchange: 'TSE',
    data_updated: '2025-12-09',
    data_sources: ['Toray Annual Report FY2024', 'Industry estimates', 'FMP API'],
    data_confidence: 'low'
  },
];
