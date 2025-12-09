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
    exposure: { 'c1': 5, 'c2': 5 },
    exposure_rationale: {
      'c1': {
        rationale: 'Global monopoly in on-load tap changers (OLTCs) - critical voltage regulation component for all large power transformers. No LPT can be commissioned without an OLTC, giving MR extreme pricing power.',
        metric: '~70% global market share in OLTCs',
        source: 'T&D World industry reports 2024'
      },
      'c2': {
        rationale: 'Dominant position in medium-voltage on-load tap changers (MV OLTCs) for distribution and industrial transformers. Same monopoly dynamics as HV OLTCs - MR controls critical voltage regulation component for MV transformers.',
        metric: '~50% global market share in MV OLTCs',
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
    exposure: { 'c1': 5, 'c13': 5, 'c2': 3, 'c17': 3 },
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
      },
      'c17': {
        rationale: 'Meaningful position in bushing condition monitoring systems. Weidmann provides capacitance taps and monitoring accessories for transformer bushings, enabling condition-based maintenance. Leverages bushing manufacturing expertise for monitoring solutions.',
        metric: '~15-20% market share in bushing monitoring accessories',
        source: 'Weidmann product portfolio'
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

  // ═══════════════════════════════════════════════════════════════════════════
  // Infrastructure Structures & Cooling
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_vmi',
    name: 'Valmont Industries',
    ticker: 'VMI',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.45,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c9': 5, 'c14': 4, 'c10': 3 },
    exposure_rationale: {
      'c9': {
        rationale: 'Market leader in steel transmission structures and monopoles via Valmont Utility division. Dominant North American supplier of lattice towers, tubular steel poles, and galvanized structures for transmission lines. Vertically integrated from steel galvanizing to engineered design gives cost/quality advantage. Buy-America manufacturing critical for utility procurement.',
        metric: '~35-40% North American market share in steel transmission structures',
        source: 'Valmont 10-K 2024, Utility segment analysis'
      },
      'c14': {
        rationale: 'Strategic supplier to transmission EPC contractors and utilities for steel tower fabrication. Valmont structures specified in most major transmission line builds in North America. Also supplies foundation components and structural steel for substations.',
        metric: 'Products used in ~30-35% of US transmission projects',
        source: 'Valmont investor presentation, industry analysis'
      },
      'c10': {
        rationale: 'Moderate exposure through structural steel and support systems for substation equipment mounting. Supplies steel platforms, cable trays, and structural components to substation integrators. Less differentiated than transmission structures due to more regional competition.',
        metric: '~20% market share in substation structural components',
        source: 'Valmont Utility segment data'
      }
    },
    is_public: true,
    market_cap_usd: 6.8,
    revenue_ttm_usd: 4.2,
    grid_revenue_pct: 45,
    description: 'US manufacturer with leading position in steel transmission structures, monopoles, and lattice towers. Vertically integrated with in-house galvanizing. Utility segment represents ~45% of revenue alongside irrigation and lighting infrastructure.',
    headquarters: 'Omaha, NE, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Valmont 10-K 2024', 'Industry reports', 'Company website'],
    data_confidence: 'high'
  },
  {
    id: 'co_azz',
    name: 'AZZ Inc',
    ticker: 'AZZ',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.65,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c9': 5, 'c14': 4, 'c10': 3 },
    exposure_rationale: {
      'c9': {
        rationale: 'Dominant North American supplier of hot-dip galvanizing services for transmission towers and steel structures. AZZ operates the largest galvanizing network in North America - critical corrosion protection for all steel transmission infrastructure. Multi-year backlogs and capacity constraints give strong pricing power. Every steel tower must be galvanized before installation.',
        metric: '~45-50% North American market share in utility-scale hot-dip galvanizing',
        source: 'AZZ 10-K 2024, Galvanizing segment analysis'
      },
      'c14': {
        rationale: 'Essential service provider to transmission EPC contractors and tower manufacturers. All fabricated steel towers transit through AZZ galvanizing facilities before field installation. Logistics and kettle size constraints create regional monopolies at key hubs.',
        metric: 'Galvanizing capacity for ~40% of US transmission tower production',
        source: 'AZZ investor presentation, industry data'
      },
      'c10': {
        rationale: 'Moderate exposure through galvanizing of substation structural steel, bus supports, and outdoor equipment frames. Less dominant than transmission towers due to more alternatives (paint, stainless steel) for lower-height structures.',
        metric: '~25% market share in substation steel galvanizing',
        source: 'AZZ segment data, industry reports'
      }
    },
    is_public: true,
    market_cap_usd: 2.3,
    revenue_ttm_usd: 1.5,
    grid_revenue_pct: 65,
    description: 'Leading North American provider of hot-dip galvanizing services for transmission towers and utility infrastructure. Operates largest galvanizing network with ~45-50% market share in utility-scale corrosion protection.',
    headquarters: 'Fort Worth, TX, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['AZZ 10-K 2024', 'Industry reports', 'Company website'],
    data_confidence: 'high'
  },
  {
    id: 'co_rstech',
    name: 'RS Technologies',
    ticker: 'Private',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.95,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c9': 5, 'c14': 3 },
    exposure_rationale: {
      'c9': {
        rationale: 'DUOPOLY leader in composite (fiberglass) crossarms and utility structures. RS Technologies controls ~50-60% of North American composite crossarm market alongside Trident Industries. Critical for wildfire mitigation and corrosion-resistant infrastructure.',
        metric: '~50-60% North American market share in composite crossarms/poles',
        source: 'Industry reports, company website 2024'
      },
      'c14': {
        rationale: 'Emerging supplier to transmission projects in corrosive environments (coastal, industrial). Composite structures eliminate galvanizing requirement and reduce foundation costs. Still niche vs steel towers but gaining traction for specialized applications.',
        metric: 'Used in ~5-10% of specialized transmission projects (coastal, aesthetic)',
        source: 'Industry analysis, utility case studies'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.15,
    grid_revenue_pct: 95,
    description: 'Private US manufacturer specializing in fiberglass composite utility poles and transmission structures. Dominant position in composite alternatives to wood/steel with superior corrosion resistance for harsh environments.',
    headquarters: 'Fort Smith, AR, USA',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'Company website', 'Utility case studies'],
    data_confidence: 'medium'
  },
  {
    id: 'co_trident',
    name: 'Trident Industries',
    ticker: 'Private',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.90,
    backlog_strength: 3,
    pricing_power: 3,
    exposure: { 'c9': 4, 'c14': 3 },
    exposure_rationale: {
      'c9': {
        rationale: 'Strong position in composite utility structures including fiberglass crossarms, poles, and substation components. Duopoly with RS Technologies in composite alternatives to wood/steel. Growing adoption driven by wildfire prevention (non-conductive), corrosion resistance, and reduced maintenance.',
        metric: '~40% North American market share in composite crossarms and structures',
        source: 'Industry reports, company website 2024'
      },
      'c14': {
        rationale: 'Supplier to distribution and transmission projects requiring non-conductive or corrosion-resistant structures. Trident composite crossarms specified for wildfire mitigation and coastal transmission lines. Niche but growing segment as utilities prioritize fire safety.',
        metric: 'Used in ~8-12% of wildfire mitigation transmission projects',
        source: 'Utility wildfire plans, industry analysis'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.12,
    grid_revenue_pct: 90,
    description: 'Private manufacturer of composite utility structures including fiberglass crossarms and poles. Strong position in wildfire mitigation and corrosion-resistant alternatives to traditional wood/steel infrastructure.',
    headquarters: 'Houston, TX, USA',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'Company website', 'Utility wildfire plans'],
    data_confidence: 'medium'
  },
  {
    id: 'co_kelvion',
    name: 'Kelvion',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.40,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c1': 4, 'c2': 3, 'c7': 3 },
    exposure_rationale: {
      'c1': {
        rationale: 'Top-tier supplier of oil-to-air and oil-to-water heat exchangers (radiators) for large power transformer cooling systems. Kelvion cooling systems critical for thermal management of 100+ MVA transformers. Oligopoly market with long qualification cycles and custom engineering requirements per transformer design.',
        metric: '~25-30% global market share in transformer cooling radiators',
        source: 'Industry reports, T&D World 2024'
      },
      'c2': {
        rationale: 'Moderate position in medium-voltage transformer cooling equipment. More competition at MV levels from regional suppliers. Kelvion focuses on larger distribution transformers and specialized applications (HVAC cooling, pumped oil systems).',
        metric: '~15-20% market share in MV transformer cooling',
        source: 'Industry reports, company product portfolio'
      },
      'c7': {
        rationale: 'Growing exposure through cooling systems for HVDC converter stations. HVDC converters generate massive heat loads requiring custom radiator designs. Kelvion supplies water-cooled and air-cooled heat exchangers for IGBT/thyristor cooling in major HVDC projects.',
        metric: '~20% market share in HVDC cooling systems',
        source: 'Company website, HVDC project references'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.8,
    grid_revenue_pct: 40,
    description: 'German private company specializing in industrial heat exchangers with strong position in transformer cooling radiators and HVDC converter cooling systems. Part of broader industrial heat transfer portfolio.',
    headquarters: 'Bochum, Germany',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'Company website', 'T&D World'],
    data_confidence: 'medium'
  },
  {
    id: 'co_spxc',
    name: 'SPX Corporation',
    ticker: 'SPXC',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.35,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c1': 4, 'c2': 3, 'c7': 3 },
    exposure_rationale: {
      'c1': {
        rationale: 'Market leader via SPX Cooling Technologies division in transformer cooling radiators and forced-air/oil cooling systems. SPX Marley brand radiators specified by major transformer OEMs (Hitachi Energy, Siemens Energy). Oligopoly position with Kelvion in engineered cooling systems for large power transformers. Custom radiator designs per transformer thermal requirements create switching costs.',
        metric: '~30-35% North American market share in transformer cooling equipment',
        source: 'SPXC 10-K 2024, Cooling Technologies segment'
      },
      'c2': {
        rationale: 'Moderate exposure through cooling equipment for medium-voltage transformers and industrial applications. SPX cooling systems used in larger distribution transformers and specialized MV applications. More fragmented market vs large power transformers.',
        metric: '~20% market share in MV transformer cooling',
        source: 'SPXC segment data, industry analysis'
      },
      'c7': {
        rationale: 'Growing position in cooling systems for HVDC converter stations and power electronics. SPX supplies custom air-cooled and liquid-cooled heat exchangers for semiconductor cooling in HVDC projects. Engineering expertise in high-heat-flux applications translates well to power electronics.',
        metric: '~20-25% market share in HVDC cooling systems',
        source: 'SPXC investor presentation, HVDC project references'
      }
    },
    is_public: true,
    market_cap_usd: 5.8,
    revenue_ttm_usd: 1.6,
    grid_revenue_pct: 35,
    description: 'US diversified industrial company with leading position in transformer cooling radiators and HVDC cooling systems via SPX Cooling Technologies division. Marley brand radiators widely specified by transformer OEMs.',
    headquarters: 'Charlotte, NC, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['SPXC 10-K 2024', 'Industry reports', 'Company website'],
    data_confidence: 'high'
  },
  {
    id: 'co_alfalaval',
    name: 'Alfa Laval',
    ticker: 'ALFA.ST',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.25,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c1': 4, 'c7': 4, 'c2': 3 },
    exposure_rationale: {
      'c1': {
        rationale: 'Top-tier supplier of oil-cooled heat exchangers and thermal management systems for large power transformers. Alfa Laval plate heat exchangers and radiator systems specified by European and Asian transformer OEMs. Strong position in forced oil/water cooling systems for 300+ MVA transformers. Engineering expertise in oil cooling translates to transformer applications.',
        metric: '~25-30% European market share in transformer heat exchangers',
        source: 'Alfa Laval Annual Report 2024, industry analysis'
      },
      'c7': {
        rationale: 'Strategic position in cooling systems for HVDC converter stations. Alfa Laval supplies high-efficiency plate heat exchangers and liquid cooling systems for IGBT/thyristor cooling in HVDC projects. Custom designs per project thermal requirements. Growing segment as HVDC deployment accelerates.',
        metric: '~25% market share in HVDC liquid cooling systems',
        source: 'Alfa Laval Energy division, HVDC project case studies'
      },
      'c2': {
        rationale: 'Moderate exposure through heat exchangers for medium-voltage transformers and industrial cooling applications. Less differentiated at MV levels where simpler air cooling dominates. Alfa Laval focuses on larger MV units with forced cooling requirements.',
        metric: '~15% market share in MV transformer cooling systems',
        source: 'Alfa Laval segment data'
      }
    },
    is_public: true,
    market_cap_usd: 23.5,
    revenue_ttm_usd: 6.2,
    grid_revenue_pct: 25,
    description: 'Swedish industrial equipment manufacturer with leading position in heat exchangers for transformer and HVDC cooling. Energy division supplies thermal management systems for power infrastructure alongside marine, food, and industrial segments.',
    headquarters: 'Lund, Sweden',
    primary_exchange: 'Nasdaq Stockholm',
    data_updated: '2025-12-09',
    data_sources: ['Alfa Laval Annual Report 2024', 'Industry reports', 'Company website'],
    data_confidence: 'high'
  },
  {
    id: 'co_roxtec',
    name: 'Roxtec',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.70,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c10': 5, 'c11': 4, 'c18': 4 },
    exposure_rationale: {
      'c10': {
        rationale: 'Global market leader in modular cable and pipe sealing systems for substations and control buildings. Roxtec seals provide fire protection, water ingress protection, and EMC shielding where cables penetrate substation walls/floors. Specified in IEC/IEEE substation standards for safety-critical applications. Near-monopoly in high-voltage substations due to stringent fire/environmental certification requirements. Adaptable seal design accommodates cable additions without re-engineering.',
        metric: '~60-70% global market share in substation cable transit seals',
        source: 'Industry reports, IEC substation design guides 2024'
      },
      'c11': {
        rationale: 'Strong position in cable sealing for GIS (Gas-Insulated Switchgear) installations. Roxtec transit systems specified for maintaining SF6 gas integrity and fire compartmentation in GIS buildings. Critical safety component for indoor/underground substations. Multi-year qualification per GIS OEM design.',
        metric: '~50% market share in GIS cable transit systems',
        source: 'GIS manufacturer specifications, industry data'
      },
      'c18': {
        rationale: 'Dominant position in cable sealing systems for E-Houses and modular substations. Roxtec modular seals are industry standard for prefabricated electrical rooms where fire rating and environmental sealing are critical. Every E-House requires cable transits for power/control cables.',
        metric: '~50-60% market share in E-House cable transit systems',
        source: 'E-House manufacturer specifications, industry data'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.4,
    grid_revenue_pct: 70,
    description: 'Swedish private company with dominant global position in modular cable/pipe sealing systems for substations. Industry standard for fire-rated cable transits in high-voltage substation control buildings and GIS installations.',
    headquarters: 'Karlskrona, Sweden',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'IEC standards', 'Company website'],
    data_confidence: 'medium'
  },
  {
    id: 'co_mctbrattberg',
    name: 'MCT Brattberg',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.85,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c10': 4, 'c11': 4, 'c18': 3 },
    exposure_rationale: {
      'c10': {
        rationale: 'Duopoly position with Roxtec in cable transit systems for substations. MCT Brattberg specializes in heavy-duty penetrations for large cable bundles and pipes in control buildings. Strong position in offshore substations and harsh environment applications where robust sealing is critical. Multi-cable transits allow future expansion without wall modification.',
        metric: '~30-40% global market share in substation cable transit systems',
        source: 'Industry reports, offshore substation specs 2024'
      },
      'c11': {
        rationale: 'Strategic position in cable sealing for GIS and compact substations. MCT Brattberg transit modules specified for SF6 containment and fire barrier applications. Particularly strong in Asian GIS projects and European offshore installations. Custom designs per GIS manufacturer requirements.',
        metric: '~25-30% market share in GIS cable transit systems',
        source: 'GIS project specifications, industry analysis'
      },
      'c18': {
        rationale: 'Meaningful position in cable sealing for E-Houses and modular substations, particularly for offshore and heavy industrial applications. MCT specializes in heavy-duty transits for larger cable bundles in prefabricated electrical rooms.',
        metric: '~20-25% market share in E-House cable transit systems',
        source: 'E-House manufacturer specifications'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.08,
    grid_revenue_pct: 85,
    description: 'Swedish private company specializing in heavy-duty cable transit systems for substations and industrial facilities. Strong position in offshore substations and GIS installations requiring robust cable/pipe sealing.',
    headquarters: 'Brevik, Sweden',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'Offshore substation specs', 'Company website'],
    data_confidence: 'medium'
  },
  {
    id: 'co_hilti',
    name: 'Hilti',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.15,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c10': 3, 'c11': 3, 'c14': 2, 'c18': 3 },
    exposure_rationale: {
      'c10': {
        rationale: 'Market leader in firestop and cable management systems for substation buildings and control rooms. Hilti firestop solutions maintain fire compartmentation where cables/pipes penetrate walls/floors - critical life-safety requirement per NFPA 70/IEC standards. Dominant position in North American/European substations due to comprehensive testing/certifications and contractor familiarity. Bundled with mechanical anchoring and fastening systems.',
        metric: '~40-50% market share in substation firestop systems',
        source: 'Industry reports, utility specifications 2024'
      },
      'c11': {
        rationale: 'Strategic position in firestop and cable tray systems for GIS buildings. Hilti products specified to maintain fire ratings in GIS enclosures and maintain SF6 containment boundaries. Also supplies anchoring systems for GIS equipment mounting. Less differentiated than Roxtec/MCT for primary cable transits but broader product range.',
        metric: '~30% market share in GIS firestop/cable management',
        source: 'GIS installation specs, industry data'
      },
      'c14': {
        rationale: 'Low direct exposure as supplier of construction tools and fastening systems to EPC contractors. Hilti products used in transmission/substation construction but company is tooling/consumables supplier rather than critical component. Volume exposure to all T&D construction activity.',
        metric: 'Products used in ~50%+ of substation construction projects',
        source: 'Contractor surveys, company data'
      },
      'c18': {
        rationale: 'Meaningful position in firestop systems for E-Houses and modular substations. Hilti firestop sealants and cable transits maintain fire ratings in prefabricated electrical rooms. Broad product range but less specialized than Roxtec/MCT for modular substation applications.',
        metric: '~15-20% market share in E-House firestop systems',
        source: 'E-House manufacturer specifications'
      }
    },
    is_public: false,
    revenue_ttm_usd: 7.2,
    grid_revenue_pct: 15,
    description: 'Liechtenstein private company and global leader in construction tools, fasteners, and firestop systems. Dominant market position in substation firestop/cable management alongside broader construction and industrial markets.',
    headquarters: 'Schaan, Liechtenstein',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'NFPA/IEC standards', 'Company website'],
    data_confidence: 'medium'
  },
  {
    id: 'co_mgc',
    name: 'MGC Moser-Glaser',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c13': 5, 'c1': 5, 'c2': 4 },
    exposure_rationale: {
      'c13': {
        rationale: 'Tier-1 global player in high-voltage bushings for transformers, circuit breakers, and switchgear. Duopoly with Trench Group (ABB spin-off) in 400kV+ bushings - every EHV/UHV transformer requires MGC or Trench bushings. MGC RIP (Resin Impregnated Paper) bushing technology is industry standard for reliability. Multi-year lead times and stringent testing requirements create extreme barriers. Recent bushing failures at competitors (HSP, CG Power) strengthened MGC/Trench duopoly.',
        metric: '~45% global market share in 400kV+ transformer bushings',
        source: 'T&D World, transformer OEM sourcing data 2024'
      },
      'c1': {
        rationale: 'Critical bottleneck supplier to all large power transformer OEMs. No LPT can be commissioned without bushings - MGC is sole-source or dual-source on most EHV projects. Bushing lead time often determines transformer delivery. Recent shortages gave MGC extreme pricing power. Quality issues at competing bushing suppliers drove consolidation to MGC/Trench.',
        metric: 'Sole-source or primary supplier on ~50% of global LPT orders',
        source: 'Transformer OEM supplier data, industry analysis'
      },
      'c2': {
        rationale: 'Strong position in medium-voltage bushings for distribution transformers and MV switchgear. More competition at MV levels (ABB, Siemens, regional suppliers) but MGC quality premium drives specification in critical applications. Lower barriers vs HV bushings due to simpler designs and less stringent testing.',
        metric: '~25-30% global market share in MV bushings',
        source: 'Industry reports, MV transformer sourcing'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.25,
    grid_revenue_pct: 100,
    description: 'Swiss private company with dominant global position in high-voltage bushings for transformers and switchgear. Duopoly with Trench Group in 400kV+ bushings - critical bottleneck for all EHV/UHV transformer production.',
    headquarters: 'Wohlen, Switzerland',
    data_updated: '2024-12-01',
    data_sources: ['T&D World', 'Transformer OEM sourcing data', 'Industry reports'],
    data_confidence: 'medium'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Test & Monitoring Equipment
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_omicron',
    name: 'Omicron Electronics',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.95,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c5': 5, 'c17': 4 },
    exposure_rationale: {
      'c5': {
        rationale: 'Market leader in protection relay test equipment with ~50% global market share. Omicron CMC test sets are the gold standard for commissioning and maintenance of protection relays. No major substation can be commissioned without Omicron or Doble test equipment - creates vendor lock-in through utility engineering specs.',
        metric: '~50% global market share in relay test equipment',
        source: 'Industry analysis, utility procurement data 2024'
      },
      'c17': {
        rationale: 'Strong position in transformer diagnostics via sweep frequency response analysis (SFRA) and partial discharge testing equipment. Omicron DIRANA and FRA systems widely adopted for condition assessment of aging transformer fleets.',
        metric: '~25-30% market share in transformer diagnostic equipment',
        source: 'Industry reports 2024'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.2,
    grid_revenue_pct: 95,
    description: 'Austrian private company with ~50% global market share in protection relay test equipment. Industry gold standard for commissioning and diagnostics of protection systems.',
    headquarters: 'Klaus, Austria',
    data_updated: '2025-12-09',
    data_sources: ['Industry analysis', 'Utility procurement data'],
    data_confidence: 'medium'
  },
  {
    id: 'co_doble',
    name: 'Doble Engineering (ESCO)',
    ticker: 'ESE',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.3,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c5': 5, 'c17': 5, 'c1': 3 },
    exposure_rationale: {
      'c5': {
        rationale: 'Top-3 global supplier of protection relay test equipment with ~30% market share. Doble F6150 test sets preferred by many North American utilities for relay commissioning and maintenance. Duopoly with Omicron in high-end relay testing creates pricing power through limited alternatives.',
        metric: '~30% global market share in relay test equipment, ~40% in North America',
        source: 'ESCO Technologies 10-K 2024, industry analysis'
      },
      'c17': {
        rationale: 'Market leader in transformer diagnostics and condition monitoring systems. Doble M-series systems are the industry standard for dissolved gas analysis (DGA), power factor testing, and insulation diagnostics. Near-monopoly position in transformer asset management software (doblePRIME) creates recurring revenue stream.',
        metric: '~45-50% global market share in transformer diagnostic equipment',
        source: 'ESCO Technologies investor presentation, T&D World 2024'
      },
      'c1': {
        rationale: 'Moderate exposure through factory acceptance testing (FAT) equipment for large power transformers. Doble systems used by LPT manufacturers for quality control testing before shipment.',
        metric: '~20-25% market share in LPT factory test systems',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 3.2,
    revenue_ttm_usd: 1.1,
    grid_revenue_pct: 30,
    description: 'Leading provider of transformer diagnostics and relay testing equipment, owned by ESCO Technologies (ESE). Dominant position (~45-50%) in transformer condition monitoring with recurring software revenue.',
    headquarters: 'Watertown, MA, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['ESCO Technologies 10-K 2024', 'Investor presentation', 'T&D World'],
    data_confidence: 'high'
  },
  {
    id: 'co_vaisala',
    name: 'Vaisala',
    ticker: 'VAIAS.HE',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.25,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c17': 5, 'c1': 3 },
    exposure_rationale: {
      'c17': {
        rationale: 'Market leader in dissolved gas analysis (DGA) sensors for online transformer monitoring with ~25% global market share. Vaisala Optimus sensors widely deployed for continuous condition monitoring of critical transformers. Growth driver from utilities shifting to predictive maintenance vs scheduled maintenance.',
        metric: '~25% global market share in online DGA sensors for transformers',
        source: 'Vaisala Annual Report 2024, industry analysis'
      },
      'c1': {
        rationale: 'Moderate exposure through bushings monitoring sensors and partial discharge detection systems for large power transformers. Vaisala sensors increasingly specified for new LPT installations to enable condition-based maintenance.',
        metric: '~15-20% market share in LPT online monitoring sensors',
        source: 'Industry reports'
      }
    },
    is_public: true,
    market_cap_usd: 2.4,
    revenue_ttm_usd: 0.5,
    grid_revenue_pct: 25,
    description: 'Finnish sensor company with ~25% market share in online dissolved gas analysis (DGA) sensors for transformer condition monitoring. Leading position in predictive maintenance sensors for power grid.',
    headquarters: 'Vantaa, Finland',
    primary_exchange: 'NASDAQ Helsinki',
    data_updated: '2025-12-09',
    data_sources: ['Vaisala Annual Report 2024', 'Industry analysis'],
    data_confidence: 'medium'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Semiconductors & Power Electronics
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_txn',
    name: 'Texas Instruments',
    ticker: 'TXN',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.12,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c5': 4, 'c17': 4, 'c16': 3 },
    exposure_rationale: {
      'c5': {
        rationale: 'Leading supplier of analog/mixed-signal ICs for protection relays including ADCs, signal conditioning, and power management. TI chips in nearly every modern protection relay for data acquisition and analog front-end functions.',
        metric: '~30% market share in protection relay analog semiconductors',
        source: 'Industry analysis, TI Annual Report'
      },
      'c17': {
        rationale: 'Strong position in precision analog ICs for transformer monitoring sensors. TI ADCs and signal chains used in DGA sensors, partial discharge monitors, and temperature measurement systems.',
        metric: '~25% market share in grid sensor analog ICs',
        source: 'Industry reports'
      },
      'c16': {
        rationale: 'Moderate exposure through communication ICs and processors for SCADA/RTU systems. Less dominant than specialty SCADA chip suppliers but broad portfolio covers many grid applications.',
        metric: '~15% market share in SCADA analog/mixed-signal ICs',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 175.0,
    revenue_ttm_usd: 16.5,
    grid_revenue_pct: 12,
    description: 'Global leader in analog semiconductors with broad portfolio serving protection relays, grid sensors, and SCADA systems. ~12% revenue exposure to grid infrastructure.',
    headquarters: 'Dallas, TX, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['TI Annual Report', 'Industry analysis'],
    data_confidence: 'high'
  },
  {
    id: 'co_adi',
    name: 'Analog Devices',
    ticker: 'ADI',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.15,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c5': 5, 'c17': 5, 'c6': 3 },
    exposure_rationale: {
      'c5': {
        rationale: 'DUOPOLY position in 24-bit Isolated ADCs with Texas Instruments - critical component for precision current/voltage measurement in modern protection relays. ADI AD7190/AD7124 series are industry standard for relay analog front-ends. ~40-50% market share in isolated ADCs for protection applications.',
        metric: '~40-50% market share in 24-bit isolated ADCs for protection relays',
        source: 'ADI Annual Report, industry analysis'
      },
      'c17': {
        rationale: 'Dominant position in precision measurement ICs for transformer monitoring and grid sensors. ADI iSensor MEMS and high-resolution ADCs enable next-generation condition monitoring. Strong position in smart grid sensor applications.',
        metric: '~30% market share in grid sensor precision ICs',
        source: 'ADI Industrial segment data'
      },
      'c6': {
        rationale: 'Growing position in gate driver ICs and isolation products for STATCOM and FACTS power electronics. ADI iCoupler technology used in IGBT gate drivers for high-voltage power conversion.',
        metric: '~15% market share in STATCOM gate driver ICs',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 110.0,
    revenue_ttm_usd: 9.4,
    grid_revenue_pct: 15,
    description: 'Leading precision analog semiconductor company with strong positions in grid sensors, protection relays, and power electronics. ~15% revenue exposure to industrial/grid infrastructure.',
    headquarters: 'Wilmington, MA, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['ADI Annual Report', 'Industry analysis'],
    data_confidence: 'high'
  },
  {
    id: 'co_vishay',
    name: 'Vishay Intertechnology',
    ticker: 'VSH',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.2,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c6': 5, 'c7': 4, 'c5': 3 },
    exposure_rationale: {
      'c6': {
        rationale: 'Oligopoly position in high-voltage film capacitors for STATCOM DC-link applications alongside TDK/EPCOS. Vishay MKP and MKK series capacitors specified for major FACTS/STATCOM projects. Long qualification cycles create customer lock-in.',
        metric: '~30% global market share in STATCOM film capacitors',
        source: 'Industry analysis, Vishay product portfolio'
      },
      'c7': {
        rationale: 'Strong position in DC capacitors and thyristors for HVDC converter stations. Vishay power thyristors used in LCC-HVDC projects. Film capacitors specified for HVDC filter banks.',
        metric: '~20% market share in HVDC thyristors/capacitors',
        source: 'HVDC project specifications'
      },
      'c5': {
        rationale: 'Moderate exposure through resistors, capacitors, and discrete semiconductors for protection relay power supplies and signal conditioning circuits.',
        metric: '~15% market share in protection relay passive components',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 2.8,
    revenue_ttm_usd: 3.0,
    grid_revenue_pct: 20,
    description: 'Diversified passive component and semiconductor manufacturer with strong positions in STATCOM capacitors, HVDC thyristors, and power electronics components.',
    headquarters: 'Malvern, PA, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Vishay Annual Report', 'Industry analysis'],
    data_confidence: 'medium'
  },
  {
    id: 'co_microchip',
    name: 'Microchip Technology',
    ticker: 'MCHP',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.1,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c16': 5, 'c5': 4 },
    exposure_rationale: {
      'c16': {
        rationale: 'Dominant position (~40%) in PTP (Precision Time Protocol) timing ICs for grid synchronization via Microsemi acquisition. Every substation SCADA/RTU system requires precise time synchronization - Microchip timing ICs are industry standard for IEEE 1588 PTP applications.',
        metric: '~40% market share in PTP timing ICs for grid applications',
        source: 'Microchip investor presentation, industry analysis'
      },
      'c5': {
        rationale: 'Strong position in protection relay microcontrollers and FPGAs via Microsemi. FPGA-based protection relays enable programmable protection logic. Growing adoption in digital substations for IEC 61850 applications.',
        metric: '~25% market share in protection relay FPGAs',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 38.0,
    revenue_ttm_usd: 7.6,
    grid_revenue_pct: 10,
    description: 'Semiconductor company with dominant position in PTP timing ICs for grid synchronization and strong FPGA/microcontroller presence in protection relays via Microsemi acquisition.',
    headquarters: 'Chandler, AZ, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Microchip 10-K', 'Industry analysis'],
    data_confidence: 'high'
  },
  {
    id: 'co_marvell',
    name: 'Marvell Technology',
    ticker: 'MRVL',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.08,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c16': 4, 'c5': 4 },
    exposure_rationale: {
      'c16': {
        rationale: 'Growing position in networking ICs and FPGAs for smart grid communications and SCADA systems via Xilinx competition. Marvell Ethernet switches and processors used in substation networking equipment. Expanding presence in IEC 61850 digital substation applications.',
        metric: '~15-20% market share in substation networking ICs',
        source: 'Industry analysis, Marvell product portfolio'
      },
      'c5': {
        rationale: 'Major position in IEC 61850 Protocol ASICs and networking processors for digital protection relays. Marvell PHYs and switches widely used in modern protection relay communications. Oligopoly participant in relay networking silicon.',
        metric: '~20-25% market share in IEC 61850 relay networking ICs',
        source: 'Industry analysis, relay OEM sourcing data'
      }
    },
    is_public: true,
    market_cap_usd: 75.0,
    revenue_ttm_usd: 5.5,
    grid_revenue_pct: 8,
    description: 'Data infrastructure semiconductor company with growing presence in smart grid networking and substation communications. ~8% revenue from industrial/grid applications.',
    headquarters: 'Wilmington, DE, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Marvell Annual Report', 'Industry analysis'],
    data_confidence: 'medium'
  },
  {
    id: 'co_power_integrations',
    name: 'Power Integrations',
    ticker: 'POWI',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.15,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c6': 4, 'c7': 3, 'c5': 3 },
    exposure_rationale: {
      'c6': {
        rationale: 'Leading supplier of gate driver ICs for IGBT and SiC modules in STATCOM and power electronics. SCALE gate driver technology widely adopted for high-voltage power conversion. Integrated protection features simplify STATCOM design.',
        metric: '~25% market share in STATCOM gate driver ICs',
        source: 'Power Integrations investor materials'
      },
      'c7': {
        rationale: 'Strong position in gate drivers for HVDC converter stations. SCALE drivers used in VSC-HVDC projects for IGBT switching. Growing adoption as VSC-HVDC displaces LCC technology.',
        metric: '~20% market share in HVDC gate drivers',
        source: 'Industry analysis'
      },
      'c5': {
        rationale: 'Moderate exposure through power supply ICs for protection relay auxiliary power. AC-DC and DC-DC converter ICs used in relay power supplies. Broad product portfolio covers many grid applications.',
        metric: '~15% market share in protection relay power supply ICs',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 4.2,
    revenue_ttm_usd: 0.5,
    grid_revenue_pct: 15,
    description: 'Semiconductor company specializing in gate driver ICs for power electronics with strong positions in STATCOM and HVDC applications. SCALE gate driver technology is industry standard for high-voltage IGBT switching.',
    headquarters: 'San Jose, CA, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Power Integrations 10-K', 'Industry analysis'],
    data_confidence: 'medium'
  },
  {
    id: 'co_vacuumschmelze',
    name: 'Vacuumschmelze (VAC)',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.5,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c1': 5, 'c2': 4, 'c6': 4 },
    exposure_rationale: {
      'c1': {
        rationale: 'Duopoly with Hitachi Metals (Metglas) in amorphous and nanocrystalline metal cores for transformer applications. VITROPERM nanocrystalline cores enable ultra-low-loss distribution transformers. Critical material for energy-efficient transformer designs mandated by DOE efficiency standards.',
        metric: '~30% global market share in amorphous/nanocrystalline cores (vs Hitachi ~70%)',
        source: 'Industry analysis, transformer OEM sourcing'
      },
      'c2': {
        rationale: 'Strong position in amorphous metal distribution transformer cores. Growing adoption driven by DOE 2024 efficiency standards requiring lower core losses. VAC competes with Hitachi Metglas for utility and OEM business.',
        metric: '~25% market share in amorphous MV transformer cores',
        source: 'Industry reports'
      },
      'c6': {
        rationale: 'Growing position in nanocrystalline cores for STATCOM and power electronics inductors. VITROPERM cores enable high-frequency, low-loss magnetics for power conversion. Adoption growing with SiC/GaN high-frequency switching.',
        metric: '~20% market share in power electronics nanocrystalline cores',
        source: 'VAC product portfolio, industry analysis'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.5,
    grid_revenue_pct: 50,
    description: 'German private company with duopoly position (alongside Hitachi Metglas) in amorphous and nanocrystalline magnetic materials. VITROPERM cores critical for energy-efficient transformers and power electronics.',
    headquarters: 'Hanau, Germany',
    data_updated: '2025-12-09',
    data_sources: ['Industry analysis', 'Transformer OEM sourcing data'],
    data_confidence: 'medium'
  },
  // NOTE: Trench Group exposure is on parent company Siemens Energy (co_siemens) in tier1-oems.ts
  {
    id: 'co_cd_tech',
    name: 'C&D Technologies',
    ticker: 'Private',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.85,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c20': 4, 'c10': 3 },
    exposure_rationale: {
      'c20': {
        rationale: 'Major supplier of VRLA (valve-regulated lead-acid) battery systems for utility UPS and substation backup power. Oligopoly participant alongside EnerSys and Vertiv in mission-critical battery systems.',
        metric: '~20-25% North American market share in utility UPS batteries',
        source: 'Industry reports, utility procurement data'
      },
      'c10': {
        rationale: 'Supplier of substation DC power and battery backup systems. C&D batteries specified in many utility substation designs for protection system backup.',
        metric: '~15% market share in substation battery systems',
        source: 'Industry analysis'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.5,
    grid_revenue_pct: 85,
    description: 'Leading supplier of industrial batteries and chargers for utility UPS and substation backup power applications.',
    headquarters: 'Blue Bell, PA, USA',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Utility procurement data'],
    data_confidence: 'medium'
  },
  {
    id: 'co_vicor',
    name: 'Vicor Corporation',
    ticker: 'VICR',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.3,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c20': 4, 'c7': 3 },
    exposure_rationale: {
      'c20': {
        rationale: 'Oligopoly position in high-power DC-DC converters (>100kW) for data center and utility power distribution. Vicor power modules enable efficient power conversion in critical infrastructure.',
        metric: '~20-25% market share in high-power DC-DC converters',
        source: 'Vicor 10-K, industry analysis'
      },
      'c7': {
        rationale: 'Growing position in high-efficiency power conversion for HVDC auxiliary systems. Vicor modules used in converter station control power.',
        metric: '~10% market share in HVDC auxiliary power systems',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 2.8,
    revenue_ttm_usd: 0.35,
    grid_revenue_pct: 30,
    description: 'High-efficiency power conversion specialist with strong position in high-power DC-DC converters for data centers and utility applications.',
    headquarters: 'Andover, MA, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Vicor 10-K', 'Industry analysis'],
    data_confidence: 'medium'
  },
  {
    id: 'co_amd_xilinx',
    name: 'AMD (Xilinx)',
    ticker: 'AMD',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.05,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c5': 4, 'c16': 3 },
    exposure_rationale: {
      'c5': {
        rationale: 'Oligopoly position in FPGAs and ASICs for IEC 61850 digital protection relays via Xilinx acquisition (2022). Xilinx FPGAs widely used in advanced protection relay platforms for programmable logic and high-speed communications.',
        metric: '~25-30% market share in protection relay FPGAs',
        source: 'Industry analysis, relay OEM sourcing'
      },
      'c16': {
        rationale: 'Growing position in FPGAs for SCADA/RTU applications. Xilinx Zynq platform increasingly used for embedded grid automation systems.',
        metric: '~15% market share in SCADA FPGAs',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 215.0,
    revenue_ttm_usd: 22.7,
    grid_revenue_pct: 5,
    description: 'Semiconductor giant with leading position in FPGAs (via Xilinx) for protection relays and grid automation. ~5% estimated grid infrastructure exposure.',
    headquarters: 'Santa Clara, CA, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['AMD 10-K', 'Industry analysis'],
    data_confidence: 'medium'
  },
  {
    id: 'co_3m',
    name: '3M Company',
    ticker: 'MMM',
    region: 'NA',
    type: 'TIER_2_COMPONENT',
    universe: 'INVESTABLE',
    purity_score: 0.08,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c4': 3, 'c13': 3 },
    exposure_rationale: {
      'c4': {
        rationale: 'Emerging position in SF6-free switchgear via 3M Novec dielectric fluids. Growing adoption as utilities and OEMs seek alternatives to SF6 greenhouse gas. GE and Schneider using Novec in next-gen GIS.',
        metric: '~30-40% market share in SF6-alternative dielectric fluids',
        source: 'Industry reports, GIS OEM announcements'
      },
      'c13': {
        rationale: 'Supplier of specialty tapes and insulation materials for transformer and bushing applications. Scotch electrical tapes used in transformer manufacturing.',
        metric: '~15% market share in transformer insulation tapes',
        source: 'Industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 72.0,
    revenue_ttm_usd: 33.8,
    grid_revenue_pct: 8,
    description: 'Diversified conglomerate with emerging position in SF6-free switchgear dielectric fluids (Novec) and electrical insulation materials.',
    headquarters: 'Saint Paul, MN, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['3M 10-K', 'Industry reports', 'GIS OEM data'],
    data_confidence: 'medium'
  },
  {
    id: 'co_ea_technology',
    name: 'EA Technology (LDIC)',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_2_COMPONENT',
    universe: 'GLOBAL',
    purity_score: 0.9,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c17': 4 },
    exposure_rationale: {
      'c17': {
        rationale: 'Oligopoly position in partial discharge (PD) monitoring systems for transformers and cables. LDIC (Low-Frequency Injection Coupler) technology enables online PD detection for condition-based maintenance.',
        metric: '~20-25% market share in utility PD monitoring systems',
        source: 'Industry reports, utility surveys'
      }
    },
    is_public: false,
    revenue_ttm_usd: 0.05,
    grid_revenue_pct: 90,
    description: 'UK specialist in partial discharge monitoring systems for transformers and cables. LDIC technology leader for online condition monitoring.',
    headquarters: 'Chester, UK',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Utility surveys'],
    data_confidence: 'medium'
  },
];
