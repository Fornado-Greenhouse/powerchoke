/**
 * Data layer exports
 *
 * This module provides access to the grid infrastructure bottleneck model data.
 */

// Types
export type {
  UniverseType,
  TierType,
  RegionType,
  SubComponent,
  ComponentRow,
  Company,
  ScoredCompany,
  Scenario,
} from './types';

// Data
export { components } from './components';
export { companies } from './companies';
export { scenarios, DEFAULT_SCENARIO } from './scenarios';
