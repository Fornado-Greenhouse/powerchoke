/**
 * Core type definitions for the Grid Bottleneck analysis model
 */

export type UniverseType = 'GLOBAL' | 'INVESTABLE';

export type TierType =
  | 'TIER_1_OEM'
  | 'TIER_2_COMPONENT'
  | 'TIER_3_MATERIAL'
  | 'SERVICE_EPC'
  | 'UTILITY'
  | 'SOFTWARE';

export type RegionType = 'NA' | 'EU' | 'JP' | 'KR' | 'CN' | 'ROW' | 'Global';

/**
 * Represents a critical sub-component within a larger component category.
 * These are often the "hidden monopolies" - niche suppliers with outsized pricing power.
 */
export interface SubComponent {
  name: string;
  role: string;
  severity: number;           // 1-5 bottleneck severity
  market_structure: string;   // e.g., "Monopoly", "Duopoly", "Oligopoly"
  key_player: string;         // The dominant supplier
}

/**
 * A row in the 20-component grid infrastructure matrix.
 * Each component represents a critical piece of grid infrastructure.
 */
export interface ComponentRow {
  id: string;
  category: string;
  row_number: number;
  name: string;
  voltage_level: string;
  role: string;
  demand_drivers: string;
  bottleneck_severity: number;    // 1-5
  pricing_power: number;          // 1-5
  market_structure: string;
  investable_types: string;
  risks: string;
  tier_type: TierType;
  sub_components?: SubComponent[];

  // Market dynamics
  lead_time_months?: number;      // Typical manufacturing lead time
  capacity_utilization?: number;  // Industry capacity utilization % (0-100)
  yoy_demand_growth?: number;     // Year-over-year demand growth %

  // Data provenance
  data_updated?: string;          // ISO date of last update
  data_sources?: string[];        // List of sources used
}

/**
 * Data confidence level for provenance tracking.
 */
export type DataConfidence = 'high' | 'medium' | 'low';

/**
 * Rationale for a single exposure score assignment.
 * Provides audit trail for why a company received a particular exposure score.
 */
export interface ExposureRationale {
  rationale: string;          // Why this score was assigned (e.g., "Top-3 LPT globally via Hitachi Energy")
  metric?: string;            // Quantitative basis if available (e.g., "~$8B LPT revenue, 45% of grid segment")
  source?: string;            // Source document (e.g., "10-K FY2024 p.45")
}

/**
 * A company that participates in the grid infrastructure supply chain.
 */
export interface Company {
  id: string;
  name: string;
  ticker: string;
  region: RegionType;
  type: TierType;
  universe: UniverseType;
  purity_score: number;           // 0-1, how "pure play" on grid infra
  exposure: Record<string, number>; // componentId -> exposure strength (1-5)
  exposure_rationale?: Record<string, ExposureRationale>; // Audit trail for exposure scores
  backlog_strength: number;       // 1-5
  pricing_power: number;          // 1-5

  // Market data
  market_cap_usd?: number;        // Latest market cap in USD (billions)
  revenue_ttm_usd?: number;       // Trailing 12-month revenue in USD (billions)
  grid_revenue_pct?: number;      // % of revenue from grid infrastructure (0-100)

  // Company info
  description?: string;           // 1-2 sentence company description
  headquarters?: string;          // City, Country

  // Investment characteristics
  is_public: boolean;             // Publicly traded?
  primary_exchange?: string;      // NYSE, TSE, XETRA, etc.

  // Data provenance
  data_updated?: string;          // ISO date of last update (YYYY-MM-DD)
  data_sources?: string[];        // List of sources used
  data_confidence?: DataConfidence;
}

/**
 * A company with calculated scores based on the scoring engine.
 */
export interface ScoredCompany extends Company {
  scores: {
    BES: number;          // Bottleneck Exposure Score
    TBI: number;          // Total Bottleneck Index
    WeightedTBI: number;  // TBI weighted by purity score
  };
}

/**
 * A scenario configuration that adjusts scoring weights.
 */
export interface Scenario {
  id: string;
  name: string;
  description: string;
  multipliers: {
    severity_weight: number;
    tier2_premium: number;
  };
}
