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
    exposure: { 'c14': 5, 'c16': 3, 'c17': 3 },
    exposure_rationale: {
      'c14': { rationale: 'MONOPOLY in transmission line design software via PLS-CADD with ~90% global market share. Industry standard for sag-tension analysis, 3D line modeling, and structural analysis. Every major transmission EPC project uses PLS-CADD for engineering. Power Line Systems (now Bentley) controls critical software bottleneck.', metric: '~90% market share in transmission line design software', source: 'Bentley investor materials, industry analysis' },
      'c16': { rationale: 'AssetWise provides grid asset management and lifecycle tracking. Secondary offering for SCADA/operations compared to dedicated EMS vendors.', source: 'Bentley product portfolio' },
      'c17': { rationale: 'AssetWise APM provides condition monitoring and predictive analytics for grid assets. Secondary offering compared to specialized sensor companies.', source: 'Bentley product portfolio' }
    },
    is_public: true,
    market_cap_usd: 12.2,
    revenue_ttm_usd: 1.5,
    grid_revenue_pct: 70,
    description: 'Infrastructure software company with ~90% market share in transmission line design via PLS-CADD. Serves utilities for grid planning and asset management.',
    headquarters: 'Exton, PA, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Bentley Systems 10-K 2024', 'Industry analysis', 'FMP API'],
    data_confidence: 'high',
    financial_ratings: {
      rating: 'B',
      ratingScore: 3,
      dcfScore: 4,
      roeScore: 5,
      roaScore: 4,
      deScore: 1,
      peScore: 1,
      pbScore: 1
    }
  },
  // NOTE: AVEVA Group (PI System) exposure is on parent company Schneider Electric (co_schneider) in tier1-oems.ts - acquired 2023
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
    exposure_rationale: {
      'c5': { rationale: '~55% market share in protection coordination software (per component c10). Industry standard for relay coordination studies, short-circuit analysis, arc flash calculations. Essential for protection relay engineering and commissioning.', source: 'Component c10 sub-components, utility surveys' },
      'c16': { rationale: 'Real-time SCADA/EMS capabilities with load flow analysis and state estimation. Comprehensive power system planning and operations suite used by transmission operators.', source: 'ETAP product portfolio' }
    },
    is_public: false,
    grid_revenue_pct: 100,
    description: 'Pure-play electrical power system analysis software with ~80% penetration in major utilities for protection coordination, short-circuit analysis, and arc flash studies.',
    headquarters: 'Irvine, CA, USA',
    data_updated: '2024-12-01',
    data_sources: ['Industry reports', 'Utility surveys'],
    data_confidence: 'medium'
  },
  {
    id: 'co_skm',
    name: 'SKM Systems Analysis',
    ticker: 'Private',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 3,
    pricing_power: 4,
    exposure: { 'c5': 5, 'c16': 3 },
    exposure_rationale: {
      'c5': { rationale: '~30% market share in protection coordination software. PTW (Power*Tools for Windows) platform is the primary competitor to ETAP for relay coordination studies, arc flash analysis, and short-circuit calculations. Essential for protection engineering workflows.', source: 'Industry reports, utility surveys' },
      'c16': { rationale: 'Power system analysis capabilities feed into SCADA integration for protection settings management and coordination verification.', source: 'SKM product documentation' }
    },
    is_public: false,
    grid_revenue_pct: 100,
    description: 'Pure-play power systems analysis software with ~30% market share in protection coordination. PTW platform competes with ETAP for relay coordination and arc flash studies.',
    headquarters: 'Manhattan Beach, CA, USA',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Utility surveys'],
    data_confidence: 'medium'
  },
  {
    id: 'co_osi',
    name: 'OSI (Open Systems International)',
    ticker: 'Private',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c16': 5 },
    exposure_rationale: {
      'c16': { rationale: '~25% global market share in EMS/SCADA systems. Monarch platform is critical infrastructure software for grid operations with 15-20 year replacement cycles. Market leader in North America alongside GE Vernova. Part of Emerson Electric since 2011.', source: 'Industry reports, Emerson investor materials' }
    },
    is_public: false,
    grid_revenue_pct: 100,
    description: 'Pure-play EMS/SCADA software vendor with ~25% global market share. Monarch platform serves transmission operators with mission-critical grid management software. Owned by Emerson Electric.',
    headquarters: 'Medina, MN, USA',
    data_updated: '2025-12-09',
    data_sources: ['Industry reports', 'Emerson investor materials'],
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
    exposure_rationale: {
      'c16': { rationale: 'Leading DERMS (Distributed Energy Resource Management System) and DMS (Distribution Management System) platform. Grid analytics and forecasting for distribution operators. Competes with GE Vernova and OSI in distribution automation.', source: 'Itron 10-K 2024, product portfolio' },
      'c17': { rationale: 'Market leader in grid edge intelligence via AMI (Advanced Metering Infrastructure) communications and distribution sensors. Provides real-time voltage/power quality monitoring, outage detection, and load profiling through smart meter networks.', source: 'Itron Q3 2024 earnings' }
    },
    is_public: true,
    market_cap_usd: 4.8,
    revenue_ttm_usd: 2.1,
    grid_revenue_pct: 85,
    description: 'Smart grid solutions provider with AMI infrastructure, distribution sensors, and grid analytics. Leading position in grid edge intelligence and DERMS platforms.',
    headquarters: 'Liberty Lake, WA, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2024-12-01',
    data_sources: ['Itron 10-K 2024', 'Q3 2024 Earnings'],
    data_confidence: 'high',
    financial_ratings: {
      rating: 'B+',
      ratingScore: 3,
      dcfScore: 3,
      roeScore: 4,
      roaScore: 4,
      deScore: 2,
      peScore: 3,
      pbScore: 3
    }
  },
  {
    id: 'co_landis',
    name: 'Landis+Gyr',
    ticker: 'LAND.SW',
    adr_tickers: ['LGYRF'],
    region: 'EU',
    type: 'SOFTWARE',
    universe: 'INVESTABLE',
    purity_score: 0.9,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c16': 3, 'c17': 5 },
    exposure_rationale: {
      'c16': { rationale: 'Gridstream grid management software for AMI head-end systems and distribution automation. Secondary player in DMS compared to dedicated software vendors like GE and Itron.', source: 'Landis+Gyr product portfolio' },
      'c17': { rationale: 'Global leader in smart metering hardware and AMI communications infrastructure. Over 300 million smart meters installed worldwide. Provides real-time grid edge monitoring via meter data, distribution sensors, and power quality analytics.', source: 'Landis+Gyr Annual Report 2024' }
    },
    is_public: true,
    market_cap_usd: 1.9,
    revenue_ttm_usd: 1.8,
    grid_revenue_pct: 90,
    description: 'Pure-play smart metering and grid edge solutions company. Leading global supplier of smart meters, AMI communications, and distribution automation sensors.',
    headquarters: 'Cham, Switzerland',
    primary_exchange: 'SIX',
    data_updated: '2025-12-09',
    data_sources: ['Landis+Gyr Annual Report 2024', 'Industry reports', 'FMP API'],
    data_confidence: 'high',
    financial_ratings: {
      rating: 'C+',
      ratingScore: 2,
      dcfScore: 3,
      roeScore: 1,
      roaScore: 1,
      deScore: 3,
      peScore: 1,
      pbScore: 3
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OT Cybersecurity
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'co_claroty',
    name: 'Claroty',
    ticker: 'Private',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c16': 5 },
    exposure_rationale: {
      'c16': { rationale: 'Market leader in utility OT/ICS cybersecurity with ~40% penetration at North American utilities. Purpose-built platform for NERC CIP compliance with deep integration to major SCADA vendors (OSI, GE, Siemens). Leading solution for asset discovery, vulnerability management, and threat detection in grid OT environments.', source: 'Industry analysis, utility surveys 2024' }
    },
    is_public: false,
    grid_revenue_pct: 100,
    description: 'Pure-play OT/ICS cybersecurity platform for utilities with ~40% North American utility penetration. Leading NERC CIP compliance solution with deep SCADA integration.',
    headquarters: 'New York, NY, USA',
    data_updated: '2025-12-09',
    data_sources: ['Industry analysis', 'Utility surveys'],
    data_confidence: 'medium'
  },
  {
    id: 'co_nozomi',
    name: 'Nozomi Networks',
    ticker: 'Private',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 4,
    pricing_power: 4,
    exposure: { 'c16': 5 },
    exposure_rationale: {
      'c16': { rationale: 'Leading OT/IoT security vendor with 1000+ energy/utility sites globally. Passive network monitoring and asset discovery for SCADA/ICS environments. Strong presence in European utilities, expanding in North America. Competes with Claroty and Dragos for utility OT security.', source: 'Company materials, industry reports 2024' }
    },
    is_public: false,
    grid_revenue_pct: 95,
    description: 'Pure-play OT/IoT security platform with 1000+ energy/utility installations. Leading passive network monitoring for SCADA environments.',
    headquarters: 'San Francisco, CA, USA',
    data_updated: '2025-12-09',
    data_sources: ['Company materials', 'Industry reports'],
    data_confidence: 'medium'
  },
  {
    id: 'co_dragos',
    name: 'Dragos',
    ticker: 'Private',
    region: 'NA',
    type: 'SOFTWARE',
    universe: 'GLOBAL',
    purity_score: 1.0,
    backlog_strength: 5,
    pricing_power: 5,
    exposure: { 'c16': 5 },
    exposure_rationale: {
      'c16': { rationale: 'Market leader in industrial cybersecurity with proprietary ICS/OT threat intelligence. ~35% penetration at US investor-owned utilities. Preferred vendor for high-security utility environments and government critical infrastructure. Founded by former NSA/US-CERT analysts.', source: 'Industry analysis, utility surveys 2024' }
    },
    is_public: false,
    grid_revenue_pct: 100,
    description: 'Pure-play industrial cybersecurity platform with ~35% US IOU penetration. Leading threat intelligence and hunting capabilities for grid OT environments.',
    headquarters: 'Hanover, MD, USA',
    data_updated: '2025-12-09',
    data_sources: ['Industry analysis', 'Utility surveys'],
    data_confidence: 'medium'
  },
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
    exposure_rationale: {
      'c16': { rationale: 'FortiGate OT Security platform for SCADA/ICS network protection. Growing adoption for NERC CIP compliance (deep packet inspection, anomaly detection per component c16). Competes with Claroty, Nozomi, and Dragos in OT cybersecurity appliances. Utility segment estimated at ~15% of revenue.', source: 'Fortinet 10-K 2024, industry analysis' }
    },
    is_public: true,
    market_cap_usd: 63.9,
    revenue_ttm_usd: 6.6,
    grid_revenue_pct: 15,
    description: 'Cybersecurity leader with FortiGate OT Security platform for SCADA/ICS protection. Growing presence in utility OT security compliance (NERC CIP).',
    headquarters: 'Sunnyvale, CA, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Fortinet 10-K 2024', 'Q3 2024 Earnings', 'FMP API'],
    data_confidence: 'high',
    financial_ratings: {
      rating: 'B+',
      ratingScore: 3,
      dcfScore: 4,
      roeScore: 5,
      roaScore: 5,
      deScore: 1,
      peScore: 2,
      pbScore: 1
    }
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
    exposure_rationale: {
      'c16': { rationale: 'Tenable.ot provides passive asset discovery and vulnerability assessment for SCADA/ICS environments. Later entrant to OT security via Indegy acquisition (2021). Lower utility penetration than dedicated OT security vendors. Estimated ~12% revenue from industrial/utility verticals.', source: 'Tenable 10-K 2024, industry reports' }
    },
    is_public: true,
    market_cap_usd: 3.2,
    revenue_ttm_usd: 1,
    grid_revenue_pct: 12,
    description: 'Vulnerability management company with OT security capabilities via acquisitions. Tenable.ot provides asset discovery and vulnerability assessment for industrial control systems.',
    headquarters: 'Columbia, MD, USA',
    primary_exchange: 'NASDAQ',
    data_updated: '2025-12-09',
    data_sources: ['Tenable 10-K 2024', 'Industry analysis', 'FMP API'],
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'C+',
      ratingScore: 2,
      dcfScore: 5,
      roeScore: 1,
      roaScore: 1,
      deScore: 3,
      peScore: 1,
      pbScore: 1
    }
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
    exposure_rationale: {
      'c17': { rationale: '~35% global market share in transformer condition monitoring via Qualitrol division. Market leader in DGA (Dissolved Gas Analysis) sensors for online transformer oil monitoring (per component c17). Also provides bushing monitoring systems and partial discharge detection. Qualitrol estimated at ~20% of Fortive revenue.', source: 'Component c17 sub-components, Fortive 10-K 2024' }
    },
    is_public: true,
    market_cap_usd: 18.4,
    revenue_ttm_usd: 5.6,
    grid_revenue_pct: 20,
    description: 'Industrial technology conglomerate with Qualitrol division holding ~35% global market share in transformer monitoring systems (DGA sensors, bushing monitors).',
    headquarters: 'Everett, WA, USA',
    primary_exchange: 'NYSE',
    data_updated: '2025-12-09',
    data_sources: ['Fortive 10-K 2024', 'Q3 2024 Earnings', 'FMP API'],
    data_confidence: 'medium',
    financial_ratings: {
      rating: 'A-',
      ratingScore: 4,
      dcfScore: 5,
      roeScore: 4,
      roaScore: 4,
      deScore: 2,
      peScore: 2,
      pbScore: 3
    }
  },
];
