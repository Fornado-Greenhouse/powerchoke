import { Scenario } from './types';

/**
 * Scenario configurations for adjusting the scoring model.
 * These allow stress-testing the portfolio under different market conditions.
 */
export const scenarios: Scenario[] = [
  {
    id: 'base',
    name: 'Base Case',
    description: 'Standard constraints with current market dynamics.',
    multipliers: {
      severity_weight: 1.0,
      tier2_premium: 1.2,
    },
  },
  {
    id: 'stress_supply',
    name: 'Supply Crunch',
    description: 'Heightened supply chain stress, bottlenecks intensify.',
    multipliers: {
      severity_weight: 1.5,
      tier2_premium: 1.5,
    },
  },
  {
    id: 'demand_surge',
    name: 'Demand Surge',
    description: 'Accelerated electrification and data center buildout.',
    multipliers: {
      severity_weight: 1.3,
      tier2_premium: 1.3,
    },
  },
];

export const DEFAULT_SCENARIO = scenarios[0];
