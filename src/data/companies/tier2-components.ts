import { Company } from '../types';

/**
 * TIER 2 COMPONENTS - Hidden monopolies and niche specialists
 *
 * Update cadence: Annually (many are private)
 * Expertise needed: Deep component-level supply chain knowledge
 */
export const tier2Components: Company[] = [
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
    exposure_rationale: {
      'c1': {
        rationale: 'Global monopoly in on-load tap changers (OLTCs) - critical voltage regulation component for all large power transformers. No LPT can be commissioned without an OLTC, giving MR extreme pricing power.',
        metric: '~70% global market share in OLTCs',
        source: 'T&D World industry reports 2024'
      }
    },
    is_public: false,
    grid_revenue_pct: 100,
    description: 'German private company with ~70% global market share in on-load tap changers (OLTCs) for power transformers.',
    headquarters: 'Regensburg, Germany',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'T&D World'],
    data_confidence: 'medium'
  },
  {
    id: 'co_weidmann',
    name: 'Weidmann Electrical Technology',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.95,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c1': 5, 'c13': 5, 'c2': 3 },
    exposure_rationale: {
      'c1': {
        rationale: 'Duopoly position in cellulose pressboard for transformer internal insulation. Every LPT requires Weidmann pressboard - no viable substitutes at HV levels. Supply bottleneck for entire LPT industry.',
        metric: '~60-70% global market share in cellulose pressboard',
        source: 'T&D World industry reports 2024'
      },
      'c13': {
        rationale: 'Dominant supplier of high-voltage insulation materials and bushings. Vertically integrated from raw cellulose to finished bushings gives unmatched quality control for 500kV+ applications.',
        metric: '~65% market share in HV transformer insulation systems',
        source: 'Industry reports, company website'
      },
      'c2': {
        rationale: 'Moderate exposure through medium-voltage transformer insulation materials. Less dominant at MV levels due to more substitutes and regional competitors.',
        metric: '~30-40% market share in MV insulation',
        source: 'Industry reports'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.9,
    grid_revenue_pct: 95,
    description: 'Swiss private company with ~60-70% global market share in cellulose pressboard and transformer insulation materials. Critical bottleneck for all large power transformers.',
    headquarters: 'Rapperswil, Switzerland',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'T&D World', 'Company website'],
    data_confidence: 'medium'
  },
  {
    id: 'co_sel',
    name: 'Schweitzer Engineering Labs',
    ticker: 'Private',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c5': 5, 'c16': 5, 'c10': 4 },
    exposure_rationale: {
      'c5': {
        rationale: 'Market leader in protection relays for transmission and distribution. Gold standard for North American utilities, especially for critical substations. Made-in-USA provenance critical for ITAR/security requirements.',
        metric: '~35-40% North American market share, ~25% global in protection relays',
        source: 'T&D World, utility procurement data 2024'
      },
      'c16': {
        rationale: 'Dominant position in Remote Terminal Units (RTUs) and SCADA systems for substations. SEL RTUs are preferred for critical transmission applications due to reliability and cybersecurity certifications.',
        metric: '~30% market share in utility RTU/SCADA systems',
        source: 'Industry reports, utility procurement data'
      },
      'c10': {
        rationale: 'Strong position in turnkey substation integration through protection systems expertise. SEL acts as system integrator for protection/control packages, particularly for new transmission substations.',
        metric: 'Preferred supplier for ~25% of major transmission substation projects',
        source: 'Utility procurement data, industry reports'
      }
    },
    is_public: false,
    revenue_ttm_usd: 1.8,
    grid_revenue_pct: 100,
    description: 'Employee-owned US company with ~30-40% market share in protection relays and RTUs. Gold standard for utility protection systems with Made-in-USA provenance.',
    headquarters: 'Pullman, WA, USA',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'T&D World', 'Utility procurement data'],
    data_confidence: 'medium'
  },
  {
    id: 'co_infineon',
    name: 'Infineon Technologies',
    ticker: 'IFX.DE',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.35,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c7': 5, 'c6': 5, 'c5': 3 },
    exposure_rationale: {
      'c7': {
        rationale: 'Duopoly with Mitsubishi Electric in high-voltage IGBT modules for HVDC converters. No HVDC project can proceed without Infineon or Mitsubishi IGBTs. 2-3 year lead times give extreme pricing power.',
        metric: '~45% global market share in HVDC IGBT modules (3.3kV-6.5kV)',
        source: 'IHS Markit Power Semiconductor Report 2024, Infineon Annual Report'
      },
      'c6': {
        rationale: 'Market leader in IGBT modules for STATCOM and FACTS devices. Same duopoly dynamics as HVDC - critical component with no viable substitutes for high-power reactive compensation.',
        metric: '~40% market share in STATCOM power semiconductors',
        source: 'IHS Markit Power Semiconductor Report 2024'
      },
      'c5': {
        rationale: 'Moderate exposure through gate driver ICs and power semiconductors for protection relay power supplies. Less critical than HVDC/STATCOM applications due to more competition at lower power levels.',
        metric: '~15-20% market share in protection relay semiconductors',
        source: 'IHS Markit Power Semiconductor Report'
      }
    },
    is_public: true,
    market_cap_usd: 56.7,
    revenue_ttm_usd: 16.3,
    grid_revenue_pct: 35,
    description: 'German semiconductor giant with ~45% global market share in IGBT modules for HVDC and power electronics. Duopoly with Mitsubishi Electric. Critical bottleneck for all HVDC projects.',
    headquarters: 'Neubiberg, Germany',
    primary_exchange: 'XETRA',
    data_updated: '2025-12-09',
    data_sources: ['Infineon Annual Report 2024', 'IHS Markit Power Semiconductor Report', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_tdk',
    name: 'TDK Corporation',
    ticker: '6762.T',
    region: 'JP',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.25,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c6': 5, 'c7': 4, 'c5': 3 },
    exposure_rationale: {
      'c6': {
        rationale: 'Market leader via EPCOS brand in high-voltage film capacitors for STATCOM DC-link applications. Oligopoly with Vishay - no STATCOM can be built without TDK/EPCOS or Vishay capacitors. Multi-year qualification cycles create moat.',
        metric: '~40% global market share in HV DC-link film capacitors',
        source: 'EPCOS Technical Catalog, TDK Annual Report FY2024'
      },
      'c7': {
        rationale: 'Strong position in DC capacitors for HVDC converter stations. EPCOS capacitors used in ABB, Siemens Energy, and Hitachi Energy HVDC projects. Less dominant than in STATCOM due to competition from Hitachi capacitors.',
        metric: '~30% market share in HVDC DC capacitors',
        source: 'TDK Annual Report FY2024, EPCOS product portfolio'
      },
      'c5': {
        rationale: 'Moderate exposure through ferrite cores and magnetics for protection relay power supplies and signal conditioning. Niche position in specialized high-frequency transformers for relay electronics.',
        metric: '~20% market share in protection relay magnetics/ferrites',
        source: 'TDK Annual Report, EPCOS catalog'
      }
    },
    is_public: true,
    market_cap_usd: 28.8,
    revenue_ttm_usd: 15.2,
    grid_revenue_pct: 25,
    description: 'Japanese electronics giant owning EPCOS brand with dominant position (~40% market share) in high-voltage film capacitors for STATCOM DC-link and HVDC applications.',
    headquarters: 'Tokyo, Japan',
    primary_exchange: 'TSE',
    data_updated: '2025-12-09',
    data_sources: ['TDK Annual Report FY2024', 'EPCOS Technical Catalog', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_hubbell',
    name: 'Hubbell Incorporated',
    ticker: 'HUBB',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.6,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c8': 4, 'c13': 4, 'c2': 3, 'c14': 3 },
    exposure_rationale: {
      'c8': {
        rationale: 'Top-3 North American supplier of transmission conductor hardware via Hubbell Power Systems. Oligopoly with AFL and Preformed Line Products in dead-end fittings, compression splices, and suspension hardware. Buy-America compliant manufacturing critical for utility procurement.',
        metric: '~25-30% North American market share in conductor hardware',
        source: 'Hubbell 10-K 2024, industry analysis'
      },
      'c13': {
        rationale: 'Strong position in medium-voltage bushings and high-voltage insulation components. Hubbell bushings specified for many pad-mounted transformers and MV switchgear applications. Less dominant at transmission voltages where Trench/ABB lead.',
        metric: '~20-25% market share in MV bushings (15-69kV)',
        source: 'Hubbell Power Systems division data, 10-K 2024'
      },
      'c2': {
        rationale: 'Moderate exposure through medium-voltage transformer accessories and components. Supplies bushings, fittings, and accessories to regional MV transformer manufacturers. Fragmented market with many competitors.',
        metric: '~15-20% market share in MV transformer accessories',
        source: 'Hubbell Q3 2024 earnings, industry reports'
      },
      'c14': {
        rationale: 'Indirect exposure as key hardware supplier to transmission EPC contractors. Hubbell products specified in most major transmission line builds, but company is component supplier rather than prime EPC contractor.',
        metric: 'Products used in ~30% of transmission EPC projects',
        source: 'Hubbell 10-K 2024, utility procurement data'
      }
    },
    is_public: true,
    market_cap_usd: 23.4,
    revenue_ttm_usd: 5.7,
    grid_revenue_pct: 60,
    description: 'US manufacturer with strong positions in transmission conductor hardware (dead-end fittings, splices), bushings, and utility products via Hubbell Power Systems division.',
    headquarters: 'Shelton, CT, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Hubbell 10-K 2024', 'Q3 2024 Earnings', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_plpc',
    name: 'Preformed Line Products',
    ticker: 'PLPC',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.85,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c8': 5, 'c14': 4 },
    exposure_rationale: {
      'c8': {
        rationale: 'Market leader in specialty transmission conductor hardware, particularly helical armor rods and automatic full-tension splices. PLPC invented and dominates the helical fitting category - near-monopoly in this critical niche. Pure-play focus gives superior product breadth vs diversified competitors.',
        metric: '~40% global market share in helical fittings, ~35% in automatic splices',
        source: 'PLPC 10-K 2024, investor presentation'
      },
      'c14': {
        rationale: 'Strategic supplier to transmission EPC contractors for conductor installation hardware. PLPC products specified in most major transmission line projects globally. Less direct exposure than EPC primes but benefits from all transmission construction activity.',
        metric: 'Products used in ~35-40% of global transmission line installations',
        source: 'PLPC investor presentation, industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 1.1,
    revenue_ttm_usd: 0.7,
    grid_revenue_pct: 85,
    description: 'Pure-play manufacturer of transmission conductor hardware including helical fittings, armor rods, and automatic full-tension splices. Dominant position in specialty conductor accessories.',
    headquarters: 'Mayfield Heights, OH, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['PLPC 10-K 2024', 'Company investor presentation', 'FMP API'],
    data_confidence: 'high'
  },
];
