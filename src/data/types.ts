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
  backlog_strength: number;       // 1-5
  pricing_power: number;          // 1-5
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
