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
    exposure: { 'c11': 5, 'c9': 3 },
    exposure_rationale: {
      'c11': {
        rationale: 'World\'s largest steel producer with major GOES production facilities across Europe and Americas, supplying transformer manufacturers globally',
        metric: '~25% global GOES market share',
        source: 'Company Annual Report 2024, steel industry analysis'
      },
      'c9': {
        rationale: 'Major supplier of structural steel for transmission towers and lattice structures. Serves tower fabricators globally with hot-rolled sections and plate steel.',
        metric: '~15-20% global market share in transmission tower steel',
        source: 'Industry reports, steel market analysis'
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
    data_confidence: 'high',
    financial_ratings: {
      rating: 'A-',
      ratingScore: 4,
      dcfScore: 4,
      roeScore: 3,
      roaScore: 4,
      deScore: 2,
      peScore: 3,
      pbScore: 4,
      roeValue: 4.8,
      roaValue: 2.5,
      deValue: 0.25,
      peValue: 13.9,
      pbValue: 0.6,
      source: 'FMP API',
      updated: '2025-12-17'
    }
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
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'B+',
      ratingScore: 3,
      dcfScore: 3,
      roeScore: 3,
      roaScore: 4,
      deScore: 2,
      peScore: 1,
      pbScore: 5,
      roeValue: 0.9,
      roaValue: 0.5,
      deValue: 0.53,
      peValue: 49.1,
      pbValue: 0.5,
      source: 'FMP API',
      updated: '2025-12-17'
    }
  },
  {
    id: 'co_nippon',
    name: 'Nippon Steel',
    ticker: '5401.T',
    adr_tickers: ['NPSCY'],
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
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'C+',
      ratingScore: 2,
      dcfScore: 5,
      roeScore: 1,
      roaScore: 1,
      deScore: 1,
      peScore: 1,
      pbScore: 4
    }
  },
  {
    id: 'co_thyssen',
    name: 'thyssenkrupp',
    ticker: 'TKA.DE',
    adr_tickers: ['TKAMY'],
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
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'C+',
      ratingScore: 2,
      dcfScore: 1,
      roeScore: 1,
      roaScore: 1,
      deScore: 3,
      peScore: 1,
      pbScore: 5
    }
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
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'B+',
      ratingScore: 3,
      dcfScore: 4,
      roeScore: 4,
      roaScore: 5,
      deScore: 2,
      peScore: 2,
      pbScore: 2,
      roeValue: 11.5,
      roaValue: 3.6,
      deValue: 0.50,
      peValue: 33.5,
      pbValue: 3.7,
      source: 'FMP API',
      updated: '2025-12-17'
    }
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
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'B+',
      ratingScore: 3,
      dcfScore: 4,
      roeScore: 5,
      roaScore: 5,
      deScore: 1,
      peScore: 2,
      pbScore: 1,
      roeValue: 39.0,
      roaValue: 18.8,
      deValue: 0.71,
      peValue: 30.5,
      pbValue: 11.2,
      source: 'FMP API',
      updated: '2025-12-17'
    }
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
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'A-',
      ratingScore: 4,
      dcfScore: 3,
      roeScore: 4,
      roaScore: 5,
      deScore: 2,
      peScore: 3,
      pbScore: 4
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Cable Manufacturers
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_prysmian',
    name: 'Prysmian Group',
    ticker: 'PRY.MI',
    adr_tickers: ['PRYMY'],
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
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'A-',
      ratingScore: 4,
      dcfScore: 4,
      roeScore: 5,
      roaScore: 4,
      deScore: 2,
      peScore: 3,
      pbScore: 2
    }
  },
  {
    id: 'co_nexans',
    name: 'Nexans',
    ticker: 'NEX.PA',
    adr_tickers: ['NEXNY'],
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
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'A-',
      ratingScore: 4,
      dcfScore: 4,
      roeScore: 5,
      roaScore: 4,
      deScore: 1,
      peScore: 4,
      pbScore: 3
    }
  },
  {
    id: 'co_nkt',
    name: 'NKT A/S',
    ticker: 'NKT.CO',
    adr_tickers: ['NRKBF'],
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
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'A-',
      ratingScore: 4,
      dcfScore: 5,
      roeScore: 4,
      roaScore: 4,
      deScore: 1,
      peScore: 3,
      pbScore: 3
    }
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
    adr_tickers: ['TRYIY'],
    region: 'JP',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.15,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c8': 5 },
    exposure_rationale: {
      'c8': {
        rationale: 'DUOPOLY leader in carbon fiber composite cores for ACCC high-temperature transmission conductors. World\'s #1 carbon fiber manufacturer supplying ~50-60% of carbon fiber for ACCC cores (vs Hexcel ~15%). No ACCC conductor can be made without Toray or Hexcel carbon fiber - critical bottleneck for grid capacity expansion.',
        metric: '~50-60% market share in ACCC carbon fiber core material',
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

  // ═══════════════════════════════════════════════════════════════════════════
  // Insulation & Transformer Fluids
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_huntsman',
    name: 'Huntsman Corporation',
    ticker: 'HUN',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.25,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c13': 5, 'c1': 4, 'c2': 4, 'c3': 4, 'c19': 3 },
    exposure_rationale: {
      'c13': {
        rationale: 'Dominant position in bushing epoxy resins via Araldite brand. ~25-30% market share in HV bushing epoxy systems used by Trench, ABB, Siemens for RIP (Resin Impregnated Paper) bushings.',
        metric: '~25-30% global market share in bushing epoxy',
        source: 'Industry reports, company materials'
      },
      'c1': {
        rationale: 'Epoxy resins for transformer winding insulation and casting compounds. Araldite systems used in dry-type transformers and HV equipment potting.',
        metric: '~20% market share in transformer insulation epoxy',
        source: 'Industry analysis'
      },
      'c2': {
        rationale: 'Strong position in MV transformer casting resins for dry-type distribution transformers. Growing demand due to fire safety requirements.',
        metric: '~20-25% market share in MV casting resins',
        source: 'Company materials'
      },
      'c3': {
        rationale: 'Major supplier of casting resins and insulation compounds for distribution transformer manufacturing. Araldite epoxy systems used in dry-type distribution transformers.',
        metric: '~20-25% market share in distribution transformer insulation compounds',
        source: 'Industry reports'
      },
      'c19': {
        rationale: 'Epoxy resins for cable joint and termination insulation. Moderate position in accessory materials.',
        metric: '~15% market share in cable joint compounds',
        source: 'Industry reports'
      }
    },
    is_public: true,
    market_cap_usd: 3.2,
    revenue_ttm_usd: 6.1,
    grid_revenue_pct: 25,
    description: 'Specialty chemicals company with dominant position in bushing epoxy resins via Araldite brand. Critical supplier for transformer and bushing insulation systems.',
    headquarters: 'The Woodlands, TX, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Company materials'],
    data_confidence: 'medium'
  },
  {
    id: 'co_elantas',
    name: 'Elantas (ALTANA AG)',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 0.95,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c1': 5, 'c2': 5, 'c3': 3, 'c11': 4 },
    exposure_rationale: {
      'c1': {
        rationale: 'Global leader in transformer insulation resins with ~40% market share. Beckers Elantas brand is industry standard for varnishes, enamels, and impregnating resins used by all major LPT manufacturers.',
        metric: '~40% global market share in transformer insulation resins',
        source: 'Industry reports, ALTANA annual report'
      },
      'c2': {
        rationale: 'Market leader in wire enamels and varnishes for MV transformers with ~35% market share. Essential coating materials for transformer windings.',
        metric: '~35% global market share in wire enamels',
        source: 'Industry analysis'
      },
      'c3': {
        rationale: 'Strong position in insulation varnishes and enamels for distribution transformers. Elantas products used by major distribution transformer manufacturers globally.',
        metric: '~30% global market share in distribution transformer varnishes',
        source: 'Industry reports'
      },
      'c11': {
        rationale: 'Supplies core plate insulation coatings for GOES steel used in transformer cores. Specialized coating formulations for low-loss performance.',
        metric: '~25% market share in GOES coatings',
        source: 'Industry reports'
      }
    },
    is_public: false,
    grid_revenue_pct: 95,
    description: 'Division of ALTANA AG with near-monopoly (~40% global) in transformer insulation resins and varnishes. Beckers Elantas brand is industry standard for LPT insulation.',
    headquarters: 'Wesel, Germany',
    data_updated: '2025-12-09',
    data_sources: ['ALTANA Annual Report', 'Industry reports'],
    data_confidence: 'medium'
  },
  {
    id: 'co_vonroll',
    name: 'Von Roll',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 0.85,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c1': 4, 'c2': 4, 'c3': 3, 'c13': 3 },
    exposure_rationale: {
      'c1': {
        rationale: 'Swiss specialist in composite insulation systems with 10-15% European market share. VPI (vacuum pressure impregnation) systems and laminated insulation materials for HV transformers.',
        metric: '~10-15% European market share in transformer insulation',
        source: 'Industry reports'
      },
      'c2': {
        rationale: 'Strong position in laminated insulation materials for MV transformers and rotating machines. Competes with Elantas in European market.',
        metric: '~12% European market share in MV insulation',
        source: 'Industry analysis'
      },
      'c3': {
        rationale: 'Meaningful position in epoxy resin casting systems for distribution transformers. Von Roll VPI systems used in dry-type distribution transformer manufacturing.',
        metric: '~10-15% market share in distribution transformer casting resins',
        source: 'Industry reports'
      },
      'c13': {
        rationale: 'HV insulation components for bushings. Niche position in specialized bushing insulation materials.',
        metric: '~8% market share in bushing insulation components',
        source: 'Industry reports'
      }
    },
    is_public: false,
    grid_revenue_pct: 85,
    description: 'Swiss specialist in VPI (vacuum pressure impregnation) systems and composite insulation materials for transformers and rotating machines.',
    headquarters: 'Breitenbach, Switzerland',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Company website'],
    data_confidence: 'low'
  },
  {
    id: 'co_borealis',
    name: 'Borealis AG',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 0.3,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c19': 5 },
    exposure_rationale: {
      'c19': {
        rationale: 'Leading XLPE compound producer with 30-35% market share (duopoly with Dow). Borlink brand XLPE compounds are critical bottleneck material for HVDC subsea cables used by Prysmian, Nexans, NKT. No substitutes for HV cable insulation.',
        metric: '~30-35% global market share in XLPE compounds',
        source: 'Industry reports, cable manufacturer data'
      }
    },
    is_public: false,
    grid_revenue_pct: 30,
    description: 'Austrian polyolefin producer with duopoly position in XLPE compounds for HVDC cable insulation. Borlink brand is critical bottleneck for subsea cable manufacturing.',
    headquarters: 'Vienna, Austria',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Company materials'],
    data_confidence: 'medium'
  },
  {
    id: 'co_dow',
    name: 'Dow Inc.',
    ticker: 'DOW',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.15,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c19': 5, 'c13': 3, 'c1': 2 },
    exposure_rationale: {
      'c19': {
        rationale: 'Major XLPE producer with 25-30% market share (duopoly with Borealis). HFDB and DFDA-5370 XLPE grades widely used in subsea HVDC cables. Critical supplier to Prysmian, Nexans, NKT.',
        metric: '~25-30% global market share in XLPE compounds',
        source: 'Industry reports, cable manufacturer data'
      },
      'c13': {
        rationale: 'Silicone elastomers for outdoor insulators and bushing weather sheds. Moderate position in high-voltage insulation polymers.',
        metric: '~15% market share in silicone insulators',
        source: 'Industry analysis'
      },
      'c1': {
        rationale: 'Silicone-based insulation fluids and gels for transformer applications. Minor position vs traditional mineral oil.',
        metric: '~5% market share in transformer insulation fluids',
        source: 'Industry reports'
      }
    },
    is_public: true,
    market_cap_usd: 34.8,
    revenue_ttm_usd: 44.6,
    grid_revenue_pct: 15,
    description: 'Diversified chemical giant with duopoly position (with Borealis) in XLPE compounds for HVDC cable insulation. Critical supplier to subsea cable manufacturers.',
    headquarters: 'Midland, MI, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Dow Annual Report', 'Industry reports'],
    data_confidence: 'high'
  },
  {
    id: 'co_cargill_fluids',
    name: 'Cargill (Envirotemp FR3)',
    ticker: 'Private',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 0.02,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c1': 4, 'c2': 3, 'c3': 4 },
    exposure_rationale: {
      'c1': {
        rationale: 'Monopoly position (~60% market share) in natural ester transformer fluids via Envirotemp FR3 brand. Bio-based alternative to mineral oil adopted by major utilities (ConEd, National Grid) for fire safety and environmental benefits.',
        metric: '~60% global market share in natural ester transformer fluids',
        source: 'Industry reports, utility procurement data'
      },
      'c2': {
        rationale: 'Growing penetration in distribution transformers as utilities shift to ester-based fluids for fire safety in urban installations.',
        metric: '~50% natural ester market in MV transformers',
        source: 'Industry analysis'
      },
      'c3': {
        rationale: 'Dominant position in bio-based insulating fluids for distribution transformers. FR3 natural ester increasingly specified for pad-mounted and pole-mounted distribution transformers in fire-sensitive locations.',
        metric: '~55% market share in natural ester distribution transformer fluids',
        source: 'Industry reports, utility procurement data'
      }
    },
    is_public: false,
    grid_revenue_pct: 2,
    description: 'Agribusiness giant with monopoly position in natural ester transformer fluids via Envirotemp FR3 brand. Leading bio-based alternative to mineral oil for fire-safe transformers.',
    headquarters: 'Minneapolis, MN, USA',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Utility procurement data'],
    data_confidence: 'medium'
  },
  {
    id: 'co_mi_materials',
    name: 'M&I Materials (MIDEL)',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 0.95,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c1': 4, 'c2': 4, 'c3': 3 },
    exposure_rationale: {
      'c1': {
        rationale: 'MIDEL synthetic ester fluids hold 35-40% of synthetic ester market. Competes with Cargill FR3 in transformer fluid alternatives. Strong position in European market and transformer retrofit applications.',
        metric: '~35-40% synthetic ester market share',
        source: 'Industry reports, company materials'
      },
      'c2': {
        rationale: 'Leading European supplier for ester-filled distribution transformers. MIDEL 7131 widely specified for MV applications requiring fire safety.',
        metric: '~40% European ester transformer fluid market',
        source: 'Industry analysis'
      },
      'c3': {
        rationale: 'Meaningful position in synthetic ester fluids for distribution transformers. MIDEL fluids used in fire-safe distribution transformer applications, particularly in European markets.',
        metric: '~25% synthetic ester market in distribution transformers',
        source: 'Industry analysis'
      }
    },
    is_public: false,
    grid_revenue_pct: 95,
    description: 'UK specialist in synthetic ester transformer fluids via MIDEL brand. Competes with Cargill FR3 in alternative transformer fluid market.',
    headquarters: 'Manchester, UK',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Company materials'],
    data_confidence: 'medium'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Steel & Structural Materials
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_ssab',
    name: 'SSAB AB',
    ticker: 'SSAB-A.ST',
    adr_tickers: ['SSAAY', 'SSABF'],
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.4,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c9': 5, 'c11': 3 },
    exposure_rationale: {
      'c9': {
        rationale: 'Leading supplier of high-strength steel for transmission towers and structures via Strenx and Hardox brands. High-strength steel enables lighter tower designs with reduced material costs.',
        metric: '~20% European market share in transmission structure steel',
        source: 'SSAB Annual Report, industry analysis'
      },
      'c11': {
        rationale: 'Minor position in electrical steel via specialty grades. Secondary to core structural steel business.',
        metric: '~5% electrical steel market share',
        source: 'Industry reports'
      }
    },
    is_public: true,
    market_cap_usd: 4.2,
    revenue_ttm_usd: 8.5,
    grid_revenue_pct: 40,
    description: 'Swedish high-strength steel producer with leading position in transmission tower steel via Strenx/Hardox brands. Enables lighter, lower-cost transmission structures.',
    headquarters: 'Stockholm, Sweden',
    primary_exchange: 'Nasdaq Stockholm',
    data_updated: '2025-12-09',
    data_sources: ['SSAB Annual Report', 'Industry analysis'],
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'A',
      ratingScore: 4,
      dcfScore: 5,
      roeScore: 4,
      roaScore: 5,
      deScore: 2,
      peScore: 3,
      pbScore: 4
    }
  },
  {
    id: 'co_nucor',
    name: 'Nucor Corporation',
    ticker: 'NUE',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.3,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c9': 5, 'c11': 2 },
    exposure_rationale: {
      'c9': {
        rationale: 'Largest US steel producer with dominant position in structural steel for transmission towers and substation structures. Buy-America requirements drive utility procurement to domestic suppliers.',
        metric: '~35% US market share in transmission structure steel',
        source: 'Nucor 10-K, industry analysis'
      },
      'c11': {
        rationale: 'Minor electrical steel production. Primary focus on structural and plate steel for energy infrastructure.',
        metric: '~3% US electrical steel market',
        source: 'Industry reports'
      }
    },
    is_public: true,
    market_cap_usd: 38.5,
    revenue_ttm_usd: 35.2,
    grid_revenue_pct: 30,
    description: 'Largest US steel producer with dominant position in structural steel for transmission infrastructure. Buy-America compliant supplier for utility projects.',
    headquarters: 'Charlotte, NC, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Nucor 10-K', 'Industry analysis'],
    data_confidence: 'high',
    financial_ratings: {
      rating: 'A-',
      ratingScore: 4,
      dcfScore: 5,
      roeScore: 4,
      roaScore: 5,
      deScore: 2,
      peScore: 2,
      pbScore: 3,
      roeValue: 8.1,
      roaValue: 4.8,
      deValue: 0.33,
      peValue: 22.4,
      pbValue: 1.8,
      source: 'FMP API',
      updated: '2025-12-17'
    }
  },
  {
    id: 'co_hexcel',
    name: 'Hexcel Corporation',
    ticker: 'HXL',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'INVESTABLE',
    purity_score: 0.2,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c8': 4 },
    exposure_rationale: {
      'c8': {
        rationale: 'Major carbon fiber manufacturer supplying composite cores for ACCC (Aluminum Conductor Composite Core) high-temperature conductors. Alternative supplier to Toray for transmission conductor carbon fiber.',
        metric: '~15% market share in ACCC carbon fiber (vs Toray ~30%)',
        source: 'Hexcel 10-K, industry analysis'
      }
    },
    is_public: true,
    market_cap_usd: 5.8,
    revenue_ttm_usd: 1.8,
    grid_revenue_pct: 20,
    description: 'Carbon fiber composites manufacturer supplying carbon fiber cores for ACCC high-temperature transmission conductors. Alternative supplier to Toray.',
    headquarters: 'Stamford, CT, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Hexcel 10-K', 'Industry analysis'],
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'C+',
      ratingScore: 2,
      dcfScore: 3,
      roeScore: 2,
      roaScore: 3,
      deScore: 2,
      peScore: 1,
      pbScore: 2,
      roeValue: 4.5,
      roaValue: 2.5,
      deValue: 0.48,
      peValue: 85.1,
      pbValue: 3.7,
      source: 'FMP API',
      updated: '2025-12-17'
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Specialty Wire & Conductor Materials
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_ctc_global',
    name: 'CTC Global',
    ticker: 'Private',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c8': 5 },
    exposure_rationale: {
      'c8': {
        rationale: 'Patent holder and licensor of ACCC (Aluminum Conductor Composite Core) technology - the leading high-temperature low-sag conductor. Near-monopoly in advanced conductor technology through patent licensing. ACCC enables 2x capacity on existing transmission corridors.',
        metric: '100% patent ownership of ACCC technology',
        source: 'CTC Global materials, patent filings'
      }
    },
    is_public: false,
    grid_revenue_pct: 100,
    description: 'Pure-play patent holder and licensor of ACCC technology. Near-monopoly in advanced high-temperature conductor technology enabling grid capacity expansion.',
    headquarters: 'Irvine, CA, USA',
    data_updated: '2025-12-09',
    data_sources: ['CTC Global materials', 'Patent filings'],
    data_confidence: 'medium'
  },
  {
    id: 'co_afl',
    name: 'AFL (Fujikura)',
    ticker: 'Private',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 0.85,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c8': 5, 'c19': 3 },
    exposure_rationale: {
      'c8': {
        rationale: 'Market leader in OPGW (Optical Ground Wire) for transmission lines with ~30-35% global market share. OPGW combines ground wire protection with fiber optic communications, critical for smart grid infrastructure.',
        metric: '~30-35% global market share in OPGW',
        source: 'Industry reports, company materials'
      },
      'c19': {
        rationale: 'Fiber optic cables for utility communications networks. Secondary position to OPGW business but growing with grid digitalization.',
        metric: '~15% utility fiber optic market',
        source: 'Industry analysis'
      }
    },
    is_public: false,
    grid_revenue_pct: 85,
    description: 'Fujikura subsidiary and market leader in OPGW (Optical Ground Wire) for transmission lines. Critical supplier for smart grid communications infrastructure.',
    headquarters: 'Duncan, SC, USA',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Company materials'],
    data_confidence: 'medium'
  },
  {
    id: 'co_essex_furukawa',
    name: 'Essex Furukawa Magnet Wire',
    ticker: 'Private',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c1': 5, 'c12': 3 },
    exposure_rationale: {
      'c1': {
        rationale: 'Joint venture between Superior Essex and Furukawa Electric dominating CTC (Continuously Transposed Conductor) for transformer windings. ~40% North American market share. Key supplier to ABB, Siemens, Hitachi Energy for LPT windings.',
        metric: '~40% North American CTC market share',
        source: 'Industry reports, transformer manufacturer data'
      },
      'c12': {
        rationale: 'Major copper consumer for magnet wire production. Specialty copper processing for electrical applications.',
        metric: 'Significant copper procurement volumes',
        source: 'Industry analysis'
      }
    },
    is_public: false,
    grid_revenue_pct: 100,
    description: 'Joint venture dominating CTC (Continuously Transposed Conductor) for transformer windings in North America. Critical bottleneck for LPT manufacturing.',
    headquarters: 'Fort Wayne, IN, USA',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Transformer manufacturer data'],
    data_confidence: 'medium'
  },
  {
    id: 'co_rea_magnet',
    name: 'Rea Magnet Wire',
    ticker: 'Private',
    region: 'NA',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c1': 4, 'c12': 3 },
    exposure_rationale: {
      'c1': {
        rationale: 'Major US magnet wire producer with ~20-25% market share. Specializes in rectangular wire for large power transformer windings. Competes with Essex Furukawa in North American market.',
        metric: '~20-25% US magnet wire market share',
        source: 'Industry reports'
      },
      'c12': {
        rationale: 'Copper feedstock for magnet wire production. Specialty copper processing and coating operations.',
        metric: 'Significant copper procurement',
        source: 'Industry analysis'
      }
    },
    is_public: false,
    grid_revenue_pct: 100,
    description: 'US magnet wire producer with ~20-25% market share. Specializes in rectangular wire for large power transformer windings.',
    headquarters: 'Fort Wayne, IN, USA',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports'],
    data_confidence: 'low'
  },
  {
    id: 'co_luvata',
    name: 'Luvata',
    ticker: 'Private',
    region: 'EU',
    type: 'TIER_3_MATERIAL',
    universe: 'GLOBAL',
    purity_score: 0.7,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c12': 5, 'c1': 4, 'c8': 3 },
    exposure_rationale: {
      'c12': {
        rationale: 'Finnish specialty copper producer with ~15% European market share in oxygen-free copper (OFC) rod for electrical applications. Premium copper grades for high-conductivity applications.',
        metric: '~15% European electrical copper market',
        source: 'Industry reports'
      },
      'c1': {
        rationale: 'OFC copper rod for transformer winding wire. Supplies magnet wire manufacturers with premium copper feedstock.',
        metric: '~12% European transformer copper market',
        source: 'Industry analysis'
      },
      'c8': {
        rationale: 'Specialty copper rod for conductor manufacturing. Premium grades for ACCC and specialty conductors.',
        metric: '~10% European conductor copper market',
        source: 'Industry reports'
      }
    },
    is_public: false,
    grid_revenue_pct: 70,
    description: 'Finnish specialty copper producer with strong position in oxygen-free copper (OFC) rod for transformer and conductor applications.',
    headquarters: 'Espoo, Finland',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports'],
    data_confidence: 'low'
  },
  // NOTE: Hitachi Metglas exposure is on parent company Hitachi Ltd (co_hitachi) in tier1-oems.ts
];
