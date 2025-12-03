import { ComponentRow } from './types';

/**
 * The 20-row grid infrastructure component matrix.
 *
 * Categories:
 * - Transformers & Inputs: Core transformer equipment and raw materials
 * - Switchgear & Protection: Circuit breakers, relays, reactive power
 * - Transmission Infra: HVDC, conductors, towers, cables
 * - Distribution & Grid Edge: Medium/distribution transformers, modular substations
 * - Services & Software: EPC, integration, utilities, software
 */
export const components: ComponentRow[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // GROUP 1: TRANSFORMERS & INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'c1',
    row_number: 1,
    category: 'Transformers & Inputs',
    name: 'Large Power Transformers (LPT)',
    voltage_level: '115–765 kV',
    role: 'Step up/down transmission voltage',
    demand_drivers: 'DC load, renewables, fleet replacement',
    bottleneck_severity: 5,
    pricing_power: 5,
    market_structure: 'Global oligopoly',
    investable_types: 'OEMs',
    risks: 'Policy shocks, factory execution risk',
    tier_type: 'TIER_1_OEM',
    sub_components: [
      { name: 'Tap Changers (OLTC)', role: 'Voltage Regulation', severity: 5, market_structure: 'Monopoly', key_player: 'Reinhausen (MR)' },
      { name: 'Bushings', role: 'Insulation', severity: 4, market_structure: 'Oligopoly', key_player: 'Hitachi / Trench' }
    ]
  },
  {
    id: 'c11',
    row_number: 11,
    category: 'Transformers & Inputs',
    name: 'Grain-Oriented Electrical Steel (GOES)',
    voltage_level: 'N/A',
    role: 'Core magnetic material',
    demand_drivers: 'All transformers',
    bottleneck_severity: 4,
    pricing_power: 5,
    market_structure: 'Few major mills',
    investable_types: 'Steel producers',
    risks: 'Capacity expansion margin crush',
    tier_type: 'TIER_3_MATERIAL',
    sub_components: [
      { name: 'High-Permeability GOES', role: 'Efficiency Grade', severity: 5, market_structure: 'Oligopoly', key_player: 'Nippon Steel / Thyssen' }
    ]
  },
  {
    id: 'c13',
    row_number: 13,
    category: 'Transformers & Inputs',
    name: 'HV Insulation & Bushings',
    voltage_level: 'All HV',
    role: 'Reliability components',
    demand_drivers: 'Transformer volumes',
    bottleneck_severity: 3,
    pricing_power: 4,
    market_structure: 'Niche specialists',
    investable_types: 'Component makers',
    risks: 'Product liability, in-sourcing',
    tier_type: 'TIER_2_COMPONENT',
    sub_components: [
      { name: 'Cellulose Pressboard', role: 'Internal Insulation', severity: 4, market_structure: 'Duopoly', key_player: 'Weidmann' }
    ]
  },
  {
    id: 'c12',
    row_number: 12,
    category: 'Transformers & Inputs',
    name: 'Copper (Wire/Windings)',
    voltage_level: 'N/A',
    role: 'Primary conductor',
    demand_drivers: 'Electrification everywhere',
    bottleneck_severity: 3,
    pricing_power: 3,
    market_structure: 'Global commodity',
    investable_types: 'Miners',
    risks: 'Cyclicality, substitution',
    tier_type: 'TIER_3_MATERIAL'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GROUP 2: SWITCHGEAR & PROTECTION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'c4',
    row_number: 4,
    category: 'Switchgear & Protection',
    name: 'HV Circuit Breakers',
    voltage_level: '69–765 kV',
    role: 'Switching & fault isolation',
    demand_drivers: 'Reliability mandates',
    bottleneck_severity: 4,
    pricing_power: 4,
    market_structure: 'Oligopoly at HV',
    investable_types: 'OEMs',
    risks: 'SF6 phase-out tech transition',
    tier_type: 'TIER_1_OEM',
    sub_components: [
      { name: 'Vacuum Interrupters', role: 'Arc Extinction', severity: 4, market_structure: 'Oligopoly', key_player: 'Meidensha / Eaton' },
      { name: 'Clean Air / SF6-Free Gas', role: 'Insulation Medium', severity: 3, market_structure: 'Emerging', key_player: '3M / Nuova' }
    ]
  },
  {
    id: 'c5',
    row_number: 5,
    category: 'Switchgear & Protection',
    name: 'Protection & Control (Relays)',
    voltage_level: 'All levels',
    role: 'Substation nervous system',
    demand_drivers: 'Digital upgrades',
    bottleneck_severity: 3,
    pricing_power: 4,
    market_structure: 'Oligopoly high-end',
    investable_types: 'Automation firms',
    risks: 'Tech obsolescence, software comp',
    tier_type: 'TIER_2_COMPONENT'
  },
  {
    id: 'c6',
    row_number: 6,
    category: 'Switchgear & Protection',
    name: 'Reactive Power (STATCOM)',
    voltage_level: '69–500 kV',
    role: 'Voltage stability for DCs',
    demand_drivers: 'Peaky loads, renewables',
    bottleneck_severity: 4,
    pricing_power: 4,
    market_structure: 'Few global players',
    investable_types: 'Power electronics',
    risks: 'Lumpy bookings, tech leapfrog',
    tier_type: 'TIER_1_OEM'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GROUP 3: TRANSMISSION INFRASTRUCTURE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'c7',
    row_number: 7,
    category: 'Transmission Infra',
    name: 'HVDC Converter Stations',
    voltage_level: '±320–800 kV',
    role: 'Long-distance bulk transfer',
    demand_drivers: 'Remote renewables',
    bottleneck_severity: 4,
    pricing_power: 5,
    market_structure: 'Very small set',
    investable_types: 'OEM/EPC',
    risks: 'Mega-project risk, permitting',
    tier_type: 'TIER_1_OEM',
    sub_components: [
      { name: 'IGBT Modules', role: 'Power Switching', severity: 5, market_structure: 'Duopoly', key_player: 'Infineon / Mitsubishi' },
      { name: 'DC Capacitors', role: 'Energy Storage', severity: 3, market_structure: 'Oligopoly', key_player: 'Hitachi / Vishay' }
    ]
  },
  {
    id: 'c8',
    row_number: 8,
    category: 'Transmission Infra',
    name: 'Transmission Conductors',
    voltage_level: '69–765 kV',
    role: 'Carry bulk power',
    demand_drivers: 'New lines, reconductoring',
    bottleneck_severity: 3,
    pricing_power: 3,
    market_structure: 'Commodity-ish',
    investable_types: 'Cable makers',
    risks: 'Permitting delays > factory limits',
    tier_type: 'TIER_3_MATERIAL'
  },
  {
    id: 'c9',
    row_number: 9,
    category: 'Transmission Infra',
    name: 'Towers & Poles',
    voltage_level: '69–765 kV',
    role: 'Physical support structures',
    demand_drivers: 'New lines',
    bottleneck_severity: 3,
    pricing_power: 3,
    market_structure: 'Fragmented regional',
    investable_types: 'Steel fabricators',
    risks: 'Steel price vol, project delays',
    tier_type: 'TIER_3_MATERIAL'
  },
  {
    id: 'c19',
    row_number: 19,
    category: 'Transmission Infra',
    name: 'Underground Cables',
    voltage_level: 'HV/MV',
    role: 'Urban / NIMBY areas',
    demand_drivers: 'Urban load',
    bottleneck_severity: 3,
    pricing_power: 4,
    market_structure: 'Few capable firms',
    investable_types: 'Cable OEMs',
    risks: 'Civil/tunneling risk',
    tier_type: 'TIER_1_OEM',
    sub_components: [
      { name: 'XLPE Compound', role: 'Insulation', severity: 5, market_structure: 'Oligopoly', key_player: 'Borealis / Dow' }
    ]
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GROUP 4: DISTRIBUTION & GRID EDGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'c2',
    row_number: 2,
    category: 'Distribution & Grid Edge',
    name: 'Medium Power Transformers',
    voltage_level: '34.5–138 kV',
    role: 'Regional to local feeder',
    demand_drivers: 'DC clusters, EV depots',
    bottleneck_severity: 4,
    pricing_power: 4,
    market_structure: 'Concentrated',
    investable_types: 'OEMs',
    risks: 'Local competitors, price pressure',
    tier_type: 'TIER_1_OEM'
  },
  {
    id: 'c3',
    row_number: 3,
    category: 'Distribution & Grid Edge',
    name: 'Distribution Transformers',
    voltage_level: '4–35 kV',
    role: 'Final step-down',
    demand_drivers: 'Electrification, housing',
    bottleneck_severity: 3,
    pricing_power: 3,
    market_structure: 'Many players',
    investable_types: 'Diversified OEMs',
    risks: 'Cyclicality, commoditization',
    tier_type: 'TIER_1_OEM'
  },
  {
    id: 'c18',
    row_number: 18,
    category: 'Distribution & Grid Edge',
    name: 'Modular Substations / Skids',
    voltage_level: 'MV',
    role: 'Speed deployment',
    demand_drivers: 'Time-to-power',
    bottleneck_severity: 4,
    pricing_power: 4,
    market_structure: 'Emerging niche',
    investable_types: 'Niche fabricators',
    risks: 'Standards fragmentation',
    tier_type: 'TIER_1_OEM'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GROUP 5: SERVICES & SOFTWARE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'c14',
    row_number: 14,
    category: 'Services & Software',
    name: 'Transmission EPC',
    voltage_level: 'All',
    role: 'Plan, build, maintain',
    demand_drivers: 'All CAPEX',
    bottleneck_severity: 4,
    pricing_power: 4,
    market_structure: 'Regional oligopolies',
    investable_types: 'EPC firms',
    risks: 'Fixed-price blowups, labor scarcity',
    tier_type: 'SERVICE_EPC'
  },
  {
    id: 'c10',
    row_number: 10,
    category: 'Services & Software',
    name: 'Substation Integration',
    voltage_level: 'All',
    role: 'Turnkey design+build',
    demand_drivers: 'New interconnects',
    bottleneck_severity: 4,
    pricing_power: 4,
    market_structure: 'Mix Global/Regional',
    investable_types: 'EPC/OEM',
    risks: 'Execution quality, labor',
    tier_type: 'SERVICE_EPC'
  },
  {
    id: 'c20',
    row_number: 20,
    category: 'Services & Software',
    name: 'DC Power Integrators',
    voltage_level: 'MV/LV',
    role: 'Grid to DC fence',
    demand_drivers: 'Hyperscalers',
    bottleneck_severity: 4,
    pricing_power: 4,
    market_structure: 'Design-build niche',
    investable_types: 'Specialized EPC',
    risks: 'Customer concentration',
    tier_type: 'SERVICE_EPC'
  },
  {
    id: 'c16',
    row_number: 16,
    category: 'Services & Software',
    name: 'Grid Planning / SCADA',
    voltage_level: 'N/A',
    role: 'Operations software',
    demand_drivers: 'Digitalization',
    bottleneck_severity: 3,
    pricing_power: 4,
    market_structure: 'Concentrated',
    investable_types: 'Software vendors',
    risks: 'Long sales cycles, cyber reqs',
    tier_type: 'SOFTWARE'
  },
  {
    id: 'c17',
    row_number: 17,
    category: 'Services & Software',
    name: 'Monitoring & Diagnostics',
    voltage_level: 'N/A',
    role: 'Condition monitoring',
    demand_drivers: 'Aging fleet',
    bottleneck_severity: 3,
    pricing_power: 3,
    market_structure: 'Fragmented',
    investable_types: 'Sensor makers',
    risks: 'Delays hardware replacement',
    tier_type: 'SOFTWARE'
  },
  {
    id: 'c15',
    row_number: 15,
    category: 'Services & Software',
    name: 'Regulated Utilities',
    voltage_level: 'All',
    role: 'Own & rate-base assets',
    demand_drivers: 'Policy, load growth',
    bottleneck_severity: 3,
    pricing_power: 2,
    market_structure: 'Local monopolies',
    investable_types: 'Public Utilities',
    risks: 'Regulatory ROE pressure, fire risk',
    tier_type: 'UTILITY'
  },
];
