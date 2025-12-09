import { Company } from '../types';

/**
 * UTILITIES - Regulated electric utilities and TSOs
 *
 * Update cadence: Quarterly (rate cases, capex updates)
 * Expertise needed: Utility regulation, T&D capex programs
 */
export const utilities: Company[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // North America
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_nextera',
    name: 'NextEra Energy',
    ticker: 'NEE',
    region: 'NA',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.65,
    backlog_strength: 5,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'Largest US utility by market cap with FPL operating nation\'s largest rate-regulated T&D system',
        metric: '$7-8B annual T&D capex at FPL alone',
        source: 'NextEra Energy 10-K 2023, Q3 2024 Earnings Call'
      }
    },
    is_public: true,
    market_cap_usd: 145.8,
    revenue_ttm_usd: 28.1,
    grid_revenue_pct: 65,
    description: 'Largest US electric utility holding company, owns Florida Power & Light (FPL) and major transmission assets. Leading T&D capex investor with focus on grid hardening and reliability.',
    headquarters: 'Juno Beach, FL, USA',
    primary_exchange: 'NYSE',
    data_updated: '2024-12-01',
    data_sources: ['NextEra Energy 10-K 2023', 'Q3 2024 Earnings Call', 'Industry analysis'],
    data_confidence: 'high'
  },
  {
    id: 'co_duke',
    name: 'Duke Energy',
    ticker: 'DUK',
    region: 'NA',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.95,
    backlog_strength: 5,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'Second-largest US utility by revenue with major T&D operations across six states',
        metric: '$6-7B annual T&D capex for grid modernization and storm hardening',
        source: 'Duke Energy 10-K 2023, Investor presentation 2024'
      }
    },
    is_public: true,
    market_cap_usd: 78.5,
    revenue_ttm_usd: 29.2,
    grid_revenue_pct: 95,
    description: 'Major US regulated utility serving Carolinas, Florida, Ohio, Indiana. Significant T&D investment in grid modernization, storm hardening, and interconnecting renewables.',
    headquarters: 'Charlotte, NC, USA',
    primary_exchange: 'NYSE',
    data_updated: '2024-12-01',
    data_sources: ['Duke Energy 10-K 2023', 'Investor presentation 2024'],
    data_confidence: 'high'
  },
  {
    id: 'co_southern',
    name: 'Southern Company',
    ticker: 'SO',
    region: 'NA',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.9,
    backlog_strength: 4,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'Top 3 US utility with extensive transmission ownership across Southeast, major transmission JV (Southern Power)',
        metric: '$5-6B annual T&D capex for renewable interconnection and grid hardening',
        source: 'Southern Company 10-K 2023, Q3 2024 results'
      }
    },
    is_public: true,
    market_cap_usd: 92.3,
    revenue_ttm_usd: 25.4,
    grid_revenue_pct: 90,
    description: 'Large southeastern US utility holding company serving Georgia, Alabama, Mississippi. Major transmission owner with significant grid modernization and renewable integration investments.',
    headquarters: 'Atlanta, GA, USA',
    primary_exchange: 'NYSE',
    data_updated: '2024-12-01',
    data_sources: ['Southern Company 10-K 2023', 'Q3 2024 results'],
    data_confidence: 'high'
  },
  {
    id: 'co_dominion',
    name: 'Dominion Energy',
    ticker: 'D',
    region: 'NA',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.85,
    backlog_strength: 4,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'Major Mid-Atlantic utility focused on regulated electric T&D after portfolio streamlining',
        metric: '$3-4B annual T&D and renewable grid integration capex',
        source: 'Dominion Energy 10-K 2023, Investor materials'
      }
    },
    is_public: true,
    market_cap_usd: 45.2,
    revenue_ttm_usd: 14.8,
    grid_revenue_pct: 85,
    description: 'Virginia-based regulated utility with electric T&D operations in Mid-Atlantic. Significant offshore wind and transmission investment pipeline after portfolio rationalization.',
    headquarters: 'Richmond, VA, USA',
    primary_exchange: 'NYSE',
    data_updated: '2024-12-01',
    data_sources: ['Dominion Energy 10-K 2023', 'Investor materials'],
    data_confidence: 'high'
  },
  {
    id: 'co_aep',
    name: 'American Electric Power',
    ticker: 'AEP',
    region: 'NA',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.9,
    backlog_strength: 5,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'Operates largest transmission system in US (40,000+ circuit miles) across MISO/PJM footprint',
        metric: '$4-5B annual transmission capex, leading renewable interconnection queue investor',
        source: 'AEP 10-K 2023, Q3 2024 earnings'
      }
    },
    is_public: true,
    market_cap_usd: 62.2,
    revenue_ttm_usd: 21.4,
    grid_revenue_pct: 90,
    description: 'One of largest US electric utilities with nation\'s largest transmission system (40,000+ miles). Major MISO/PJM transmission owner with significant renewable interconnection investments.',
    headquarters: 'Columbus, OH, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['AEP 10-K 2023', 'Q3 2024 earnings', 'FMP API'],
    data_confidence: 'high'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Europe
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_nationalgrid',
    name: 'National Grid',
    ticker: 'NGG',
    region: 'EU',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.95,
    backlog_strength: 5,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'Pure-play transmission/distribution TSO owning GB high-voltage grid plus NY/MA distribution networks',
        metric: '£7-8B annual capex (~$9-10B USD), largest T&D investor in UK',
        source: 'National Grid Annual Report 2024'
      }
    },
    is_public: true,
    market_cap_usd: 74.5,
    revenue_ttm_usd: 36.2,
    grid_revenue_pct: 95,
    description: 'UK/US transmission system operator. Owns GB electricity transmission, major NY/MA utilities. Leading investor in transmission upgrades for renewable integration and interconnectors.',
    headquarters: 'London, UK',
    primary_exchange: 'LSE',
    data_updated: '2025-12-09',
    data_sources: ['National Grid Annual Report 2024', 'Bloomberg', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_enel',
    name: 'Enel',
    ticker: 'ENEL.MI',
    region: 'EU',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.7,
    backlog_strength: 4,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'Largest private utility in Europe by customers, Enel Grids operates 2.2M km distribution network across 4 continents',
        metric: '€5-6B annual grid capex for smart grid digitalization and network upgrades',
        source: 'Enel Strategic Plan 2024-2026, Annual Report 2023'
      }
    },
    is_public: true,
    market_cap_usd: 102.2,
    revenue_ttm_usd: 98.5,
    grid_revenue_pct: 70,
    description: 'Italian multinational utility with major distribution networks in Italy, Spain, Latin America. Enel Grids division invests heavily in smart grid technology and digitalization.',
    headquarters: 'Rome, Italy',
    primary_exchange: 'Borsa Italiana',
    data_updated: '2025-12-09',
    data_sources: ['Enel Annual Report 2023', 'Strategic Plan 2024-2026', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_iberdrola',
    name: 'Iberdrola',
    ticker: 'IBE.MC',
    region: 'EU',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.75,
    backlog_strength: 5,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'Largest utility by market cap globally, networks business (50% EBITDA) spans Spain, UK, US, Brazil',
        metric: '€6-7B annual networks capex for smart grids and offshore wind transmission',
        source: 'Iberdrola Integrated Report 2023, FY2024 results'
      }
    },
    is_public: true,
    market_cap_usd: 138.9,
    revenue_ttm_usd: 58.3,
    grid_revenue_pct: 75,
    description: 'Spanish utility giant with networks in Spain, UK (ScottishPower), US (Avangrid). Major smart grid investor, owns significant US transmission through Avangrid.',
    headquarters: 'Bilbao, Spain',
    primary_exchange: 'Madrid Stock Exchange',
    data_updated: '2025-12-09',
    data_sources: ['Iberdrola Integrated Report 2023', 'FY2024 results', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_eon',
    name: 'E.ON',
    ticker: 'EOAN.DE',
    region: 'EU',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.95,
    backlog_strength: 4,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'Pure-play distribution operator post-2019 Innogy acquisition, largest DSO in Germany',
        metric: '€4-5B annual distribution network capex for digitalization and renewable integration',
        source: 'E.ON Annual Report 2023, Investor materials'
      }
    },
    is_public: true,
    market_cap_usd: 47.3,
    revenue_ttm_usd: 70.8,
    grid_revenue_pct: 95,
    description: 'German utility transformed into pure-play distribution network operator after 2019 restructuring. Operates networks in Germany, Sweden, Czech Republic. Major smart grid investor.',
    headquarters: 'Essen, Germany',
    primary_exchange: 'XETRA',
    data_updated: '2025-12-09',
    data_sources: ['E.ON Annual Report 2023', 'Investor materials', 'FMP API'],
    data_confidence: 'high'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Asia-Pacific
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_kepco',
    name: 'KEPCO',
    ticker: '015760.KS',
    region: 'KR',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.85,
    backlog_strength: 4,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'State monopoly controlling 100% of South Korea transmission grid and distribution networks',
        metric: '₩8-10T annual T&D capex (~$6-7B USD) for offshore wind interconnection and HVDC links',
        source: 'KEPCO Annual Report 2023'
      }
    },
    is_public: true,
    market_cap_usd: 22.2,
    revenue_ttm_usd: 58.5,
    grid_revenue_pct: 85,
    description: 'Korea Electric Power Corporation - state-controlled monopoly utility. Operates all transmission in South Korea, major smart grid investments, DC interconnection with renewables.',
    headquarters: 'Naju, South Korea',
    primary_exchange: 'KRX',
    data_updated: '2025-12-09',
    data_sources: ['KEPCO Annual Report 2023', 'Industry sources', 'FMP API'],
    data_confidence: 'medium'
  },
  {
    id: 'co_tepco',
    name: 'Tokyo Electric Power',
    ticker: '9501.T',
    region: 'JP',
    type: 'UTILITY',
    universe: 'INVESTABLE',
    purity_score: 0.8,
    backlog_strength: 3,
    pricing_power: 2,
    exposure: { 'c15': 5 },
    exposure_rationale: {
      'c15': {
        rationale: 'Largest power utility in Japan serving 29M customers in Greater Tokyo metro area',
        metric: '¥600-700B annual T&D capex (~$4-5B USD) for grid resilience and renewable integration',
        source: 'TEPCO Annual Report 2023, Financial statements'
      }
    },
    is_public: true,
    market_cap_usd: 6.5,
    revenue_ttm_usd: 62.3,
    grid_revenue_pct: 80,
    description: 'Tokyo Electric Power Company - serves greater Tokyo area with largest utility network in Japan. Significant T&D investment for renewable integration and grid resilience.',
    headquarters: 'Tokyo, Japan',
    primary_exchange: 'TSE',
    data_updated: '2025-12-09',
    data_sources: ['TEPCO Annual Report 2023', 'Financial statements', 'FMP API'],
    data_confidence: 'medium'
  },
];
