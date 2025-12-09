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
    tier_type: 'TIER_3_MATERIAL',
    sub_components: [
      { name: 'CTC (Continuously Transposed Conductor)', role: 'Flat conductor bundle reducing eddy losses in LPT windings', severity: 5, market_structure: 'Duopoly', key_player: 'Essex Furukawa / Hitachi Metals' },
      { name: 'Magnet Wire (Enameled)', role: 'Insulated copper wire for transformer windings', severity: 4, market_structure: 'Oligopoly', key_player: 'Superior Essex / Rea Magnet Wire' },
      { name: 'Oxygen-Free Copper Rod', role: 'Ultra-pure (99.99%) copper feedstock for magnet wire', severity: 4, market_structure: 'Oligopoly', key_player: 'Aurubis / Luvata' }
    ]
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
    tier_type: 'TIER_2_COMPONENT',
    sub_components: [
      { name: 'Protection DSPs (C2000 series)', role: 'Real-time fault detection and protection algorithm execution', severity: 4, market_structure: 'Oligopoly', key_player: 'Texas Instruments / Analog Devices' },
      { name: '24-bit Isolated ADCs', role: 'High-precision current/voltage measurement from CT/PT sensors', severity: 4, market_structure: 'Duopoly', key_player: 'Analog Devices / Texas Instruments' },
      { name: 'IEC 61850 Protocol ASICs', role: 'Hardware implementation of substation automation protocols', severity: 3, market_structure: 'Oligopoly', key_player: 'Marvell / Microchip / AMD (Xilinx)' }
    ]
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
    tier_type: 'TIER_1_OEM',
    sub_components: [
      { name: 'High-Voltage Film Capacitors (DC-Link)', role: 'Energy storage and voltage ripple filtering in STATCOM DC bus', severity: 5, market_structure: 'Oligopoly', key_player: 'TDK (EPCOS) / Vishay' },
      { name: 'Isolated IGBT/SiC Gate Drivers', role: 'High-speed switching control with 15-25kV isolation', severity: 4, market_structure: 'Oligopoly', key_player: 'Infineon / Power Integrations' },
      { name: 'Nanocrystalline Magnetic Cores', role: 'Low-loss cores for AC filter inductors', severity: 4, market_structure: 'Duopoly', key_player: 'Hitachi Metals (Finemet) / Vacuumschmelze' },
      { name: 'DC Circuit Breakers (kV-Class)', role: 'Fast fault clearing in STATCOM DC bus', severity: 5, market_structure: 'Monopoly', key_player: 'ABB (HybridBreaker)' }
    ]
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
    tier_type: 'TIER_3_MATERIAL',
    sub_components: [
      { name: 'ACCC (Aluminum Conductor Composite Core)', role: 'High-capacity conductor using carbon fiber core - doubles capacity vs ACSR', severity: 5, market_structure: 'Monopoly', key_player: 'CTC Global (patent holder)' },
      { name: 'Carbon Fiber Core (Unidirectional)', role: 'Structural core for ACCC conductors - aerospace-grade', severity: 5, market_structure: 'Duopoly', key_player: 'Toray Industries / Hexcel' },
      { name: 'Dead-End Compression Fittings', role: 'Terminal hardware for securing high-tension conductors to towers', severity: 4, market_structure: 'Oligopoly', key_player: 'Hubbell Power Systems / AFL / Preformed Line Products' },
      { name: 'Full-Tension Automatic Splices', role: 'Field-installed conductor joints maintaining 95%+ strength', severity: 4, market_structure: 'Oligopoly', key_player: 'Preformed Line Products / Hubbell' }
    ]
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
    tier_type: 'TIER_3_MATERIAL',
    sub_components: [
      { name: 'High-Strength Weathering Steel (Corten)', role: 'Corrosion-resistant structural steel eliminating need for painting', severity: 4, market_structure: 'Oligopoly', key_player: 'SSAB / ArcelorMittal / Nucor' },
      { name: 'Ultra-Heavy-Duty Galvanizing (>610 g/m²)', role: 'Hot-dip galvanizing for extreme corrosion protection', severity: 4, market_structure: 'Oligopoly', key_player: 'Valmont Industries / AZZ Inc' },
      { name: 'Composite Crossarms', role: 'Non-conductive pultruded fiberglass alternative to wood/steel', severity: 3, market_structure: 'Duopoly', key_player: 'RS Technologies / Trident Industries' }
    ]
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
    tier_type: 'TIER_1_OEM',
    sub_components: [
      { name: 'Medium Voltage OLTCs', role: 'Voltage regulation under load for 34.5-138 kV transformers', severity: 4, market_structure: 'Oligopoly', key_player: 'MR Reinhausen (50%) / Hitachi Energy' },
      { name: 'Medium Voltage Bushings', role: 'Insulated conductor pass-through for 34.5-138 kV connections', severity: 3, market_structure: 'Oligopoly', key_player: 'Trench / Hubbell / MGC Moser-Glaser' },
      { name: 'Radiator Cooling Systems', role: 'Heat dissipation for oil-cooled transformers', severity: 2, market_structure: 'Fragmented', key_player: 'Kelvion / SPX / Alfa Laval' }
    ]
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
    tier_type: 'TIER_1_OEM',
    sub_components: [
      { name: 'Amorphous Metal Cores', role: 'Ultra-low loss core material for high-efficiency distribution transformers', severity: 5, market_structure: 'Monopoly', key_player: 'Hitachi Metglas (70-80% market)' },
      { name: 'Epoxy Resin Casting Systems', role: 'Insulation system for dry-type distribution transformers', severity: 3, market_structure: 'Oligopoly', key_player: 'Huntsman / Elantas / Von Roll' },
      { name: 'Bio-Based Dielectric Fluids', role: 'Fire-resistant insulating oil replacing mineral oil', severity: 3, market_structure: 'Oligopoly', key_player: 'Cargill (Envirotemp FR3) / M&I Materials' }
    ]
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
    tier_type: 'TIER_1_OEM',
    sub_components: [
      { name: 'E-House Integrated Protection Systems', role: 'Factory-assembled protection relays, SCADA, and control panels', severity: 5, market_structure: 'Oligopoly', key_player: 'ABB / Siemens / GE Grid Solutions' },
      { name: 'Type-Tested Switchgear Modules (IEC 62271-200)', role: 'Pre-certified MV switchgear eliminating on-site testing', severity: 4, market_structure: 'Oligopoly', key_player: 'Schneider Electric / ABB / Eaton' },
      { name: 'Cable Penetration Systems', role: 'Fire-rated, waterproof cable transit with integrated grounding', severity: 3, market_structure: 'Oligopoly', key_player: 'Roxtec / MCT Brattberg / Hilti' }
    ]
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
    tier_type: 'SERVICE_EPC',
    sub_components: [
      { name: 'Certified Transmission Linemen', role: 'High-voltage line construction, energized work, tower assembly', severity: 5, market_structure: 'Fragmented (labor shortage)', key_player: 'IBEW-trained contractors' },
      { name: 'PLS-CADD Software', role: 'Transmission line design, sag-tension analysis, 3D modeling', severity: 4, market_structure: 'Monopoly', key_player: 'Power Line Systems (Bentley)' },
      { name: 'Specialized Heavy Lift Cranes (>200 ton)', role: 'Lifting transformers and large substation components', severity: 4, market_structure: 'Oligopoly', key_player: 'Mammoet / Sarens / Lampson' },
      { name: 'Wire Tensioning Equipment', role: 'Conductor stringing, tensioning, and sagging', severity: 3, market_structure: 'Oligopoly', key_player: 'Sherman & Reilly / Condux' }
    ]
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
    tier_type: 'SERVICE_EPC',
    sub_components: [
      { name: 'Substation Commissioning Engineers', role: 'Testing, energization, protection validation', severity: 5, market_structure: 'Fragmented (skill shortage)', key_player: 'Specialized contractors (Leidos, Burns & McDonnell)' },
      { name: 'Relay Testing Equipment', role: 'Protection relay commissioning and periodic testing', severity: 4, market_structure: 'Duopoly', key_player: 'Omicron (~50%) / Doble (~30%)' },
      { name: 'Protection Coordination Software', role: 'Protection studies, arc flash analysis, short circuit', severity: 4, market_structure: 'Duopoly', key_player: 'ETAP (~55%) / SKM Systems (~30%)' }
    ]
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
    tier_type: 'SERVICE_EPC',
    sub_components: [
      { name: 'Busway Systems (High-Current >6000A)', role: 'Low-impedance power distribution for datacenters', severity: 4, market_structure: 'Oligopoly', key_player: 'Schneider Electric / Siemens / Starline (ABB)' },
      { name: 'UPS Battery Systems (VRLA/Li-ion)', role: 'Backup power for critical loads during grid transients', severity: 4, market_structure: 'Oligopoly', key_player: 'EnerSys / C&D Technologies / Vertiv' },
      { name: 'High-Power DC-DC Converters (>100kW)', role: 'Voltage conversion for 380VDC datacenter architectures', severity: 4, market_structure: 'Oligopoly', key_player: 'Vertiv / Delta Electronics / Vicor' }
    ]
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
    tier_type: 'SOFTWARE',
    sub_components: [
      { name: 'Energy Management System (EMS) Software', role: 'Real-time grid monitoring, state estimation, optimal power flow', severity: 5, market_structure: 'Oligopoly', key_player: 'GE Vernova (~35%) / OSI (~25%) / Siemens' },
      { name: 'OT Cybersecurity Appliances', role: 'NERC CIP compliance, deep packet inspection, anomaly detection', severity: 5, market_structure: 'Oligopoly', key_player: 'Claroty / Nozomi Networks / Dragos' },
      { name: 'GPS Time Synchronization (IEEE C37.238)', role: 'Sub-microsecond time sync for phasor measurement', severity: 4, market_structure: 'Oligopoly', key_player: 'Microchip (Microsemi) ~40% / SEL' },
      { name: 'Remote Terminal Units (RTUs)', role: 'Substation data acquisition, protocol conversion', severity: 4, market_structure: 'Oligopoly', key_player: 'SEL / GE Grid Solutions / ABB' }
    ]
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
    tier_type: 'SOFTWARE',
    sub_components: [
      { name: 'Dissolved Gas Analysis (DGA) Sensors', role: 'Online transformer health monitoring via oil gas detection', severity: 4, market_structure: 'Oligopoly', key_player: 'Qualitrol (Danaher) ~35% / Vaisala ~25%' },
      { name: 'Partial Discharge Monitoring Systems', role: 'Early insulation failure detection in transformers/cables/switchgear', severity: 4, market_structure: 'Oligopoly', key_player: 'Omicron / LDIC (EA Technology) / Doble' },
      { name: 'Bushing Monitoring Systems', role: 'Capacitance, power factor, DGA monitoring for transformer bushings', severity: 4, market_structure: 'Oligopoly', key_player: 'Qualitrol / Doble / Weidmann' }
    ]
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
