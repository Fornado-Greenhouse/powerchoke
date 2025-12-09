import { Company } from '../types';

/**
 * SOFTWARE - Grid operations, monitoring, and cybersecurity
 *
 * Update cadence: Annually (subscription renewals)
 * Expertise needed: Utility IT/OT systems, SCADA/EMS markets
 */
export const software: Company[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Grid Operations & Planning
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_bentley',
    name: 'Bentley Systems',
    ticker: 'BSY',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'INVESTABLE',
    purity_score: 0.7,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c16': 5, 'c17': 3 },
    is_public: true,
    market_cap_usd: 12.2,
    revenue_ttm_usd: 1.5,
    grid_revenue_pct: 70,
    description: 'Infrastructure software company with ~90% market share in transmission line design via PLS-CADD. Serves utilities for grid planning and asset management.',
    headquarters: 'Exton, PA, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Bentley Systems 10-K 2024', 'Industry analysis', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_aveva',
    name: 'AVEVA Group',
    ticker: 'Private',
    region: 'EU',
    type: 'SOFTWARE',
    universe: 'GLOBAL',
    purity_score: 0.4,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c16': 5, 'c17': 4 },
    is_public: false,
    revenue_ttm_usd: 3.8,
    grid_revenue_pct: 40,
    description: 'Industrial software company fully acquired by Schneider Electric in 2023. PI System historian platform serves ~95% of global utilities for operational data management.',
    headquarters: 'Cambridge, UK',
    data_updated: '2025-12-09',
    data_sources: ['FMP API', 'Schneider Electric acquisition announcement'],
    data_confidence: 'high'
  },
  {
    id: 'co_etap',
    name: 'ETAP',
    ticker: 'Private',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c5': 5, 'c16': 4 },
    is_public: false,
    grid_revenue_pct: 100,
    description: 'Pure-play electrical power system analysis software with ~80% penetration in major utilities for protection coordination, short-circuit analysis, and arc flash studies.',
    headquarters: 'Irvine, CA, USA',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'Utility surveys'],
    data_confidence: 'medium'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Smart Grid & Metering
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_itron',
    name: 'Itron',
    ticker: 'ITRI',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'INVESTABLE',
    purity_score: 0.85,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c16': 4, 'c17': 5 },
    is_public: true,
    market_cap_usd: 4.8,
    revenue_ttm_usd: 2.1,
    grid_revenue_pct: 85,
    description: 'Smart grid solutions provider with AMI infrastructure, distribution sensors, and grid analytics. Leading position in grid edge intelligence and DERMS platforms.',
    headquarters: 'Liberty Lake, WA, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2024-12-01',
    data_sources: ['Itron 10-K 2024', 'Q3 2024 Earnings'],
    data_confidence: 'high'
  },
  {
    id: 'co_landis',
    name: 'Landis+Gyr',
    ticker: 'LAND.SW',
    region: 'EU',
    type: 'SOFTWARE',
    universe: 'INVESTABLE',
    purity_score: 0.9,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c16': 3, 'c17': 5 },
    is_public: true,
    market_cap_usd: 1.9,
    revenue_ttm_usd: 1.8,
    grid_revenue_pct: 90,
    description: 'Pure-play smart metering and grid edge solutions company. Leading global supplier of smart meters, AMI communications, and distribution automation sensors.',
    headquarters: 'Cham, Switzerland',
    primary_exchange: 'SIX',
    data_updated: '2025-12-09',
    data_sources: ['Landis+Gyr Annual Report 2024', 'Industry reports', 'FMP API'],
    data_confidence: 'high'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OT Cybersecurity
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_fortinet',
    name: 'Fortinet',
    ticker: 'FTNT',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'INVESTABLE',
    purity_score: 0.15,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c16': 3 },
    is_public: true,
    market_cap_usd: 63.9,
    revenue_ttm_usd: 6.6,
    grid_revenue_pct: 15,
    description: 'Cybersecurity leader with FortiGate OT Security platform for SCADA/ICS protection. Growing presence in utility OT security compliance (NERC CIP).',
    headquarters: 'Sunnyvale, CA, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Fortinet 10-K 2024', 'Q3 2024 Earnings', 'FMP API'],
    data_confidence: 'high'
  },
  {
    id: 'co_tenable',
    name: 'Tenable',
    ticker: 'TENB',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'INVESTABLE',
    purity_score: 0.12,
    backlog_strength: 3,
    pricing_power: 3,
    exposure: { 'c16': 2 },
    is_public: true,
    market_cap_usd: 3.2,
    revenue_ttm_usd: 1,
    grid_revenue_pct: 12,
    description: 'Vulnerability management company with OT security capabilities via acquisitions. Tenable.ot provides asset discovery and vulnerability assessment for industrial control systems.',
    headquarters: 'Columbia, MD, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Tenable 10-K 2024', 'Industry analysis', 'FMP API'],
    data_confidence: 'medium'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Monitoring & Diagnostics
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_fortive',
    name: 'Fortive (Qualitrol)',
    ticker: 'FTV',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'INVESTABLE',
    purity_score: 0.2,
    backlog_strength: 4,
    pricing_power: 5,
    exposure: { 'c17': 5 },
    is_public: true,
    market_cap_usd: 18.4,
    revenue_ttm_usd: 5.6,
    grid_revenue_pct: 20,
    description: 'Industrial technology conglomerate with Qualitrol division holding ~35% global market share in transformer monitoring systems (DGA sensors, bushing monitors).',
    headquarters: 'Everett, WA, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Fortive 10-K 2024', 'Q3 2024 Earnings', 'FMP API'],
    data_confidence: 'medium'
  },
];
