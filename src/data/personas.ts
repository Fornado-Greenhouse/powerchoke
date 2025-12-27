/**
 * User Personas for powerchoke
 *
 * Typed persona data for programmatic use in:
 * - Feature flags and A/B testing
 * - Analytics segmentation
 * - User research tracking
 * - UI customization
 *
 * Full documentation: docs/PERSONAS.md
 */

export type PersonaId = 'sarah' | 'marcus' | 'chen' | 'elena' | 'david';

export type PersonaSegment =
  | 'institutional_buyside'
  | 'institutional_sellside'
  | 'retail_investor'
  | 'consultant'
  | 'family_office';

export type DevicePreference = 'desktop_primary' | 'mobile_primary' | 'both';

export type FeaturePriority = 'critical' | 'high' | 'medium' | 'low';

export interface JobToBeDone {
  id: string;
  situation: string;
  motivation: string;
  outcome: string;
}

export interface FeatureNeed {
  issueId: string;
  title: string;
  priority: FeaturePriority;
  quote?: string;
}

export interface Persona {
  id: PersonaId;
  name: string;
  role: string;
  organization: string;
  segment: PersonaSegment;

  // Demographics
  ageRange: [number, number];
  experienceYears: number;
  location: string;

  // Behavior
  devicePreference: DevicePreference;
  sessionFrequency: 'daily' | 'weekly' | 'monthly';
  sessionDuration: 'quick' | 'medium' | 'deep';

  // Needs
  primaryGoals: string[];
  painPoints: string[];
  jobsToBeDone: JobToBeDone[];
  featureNeeds: FeatureNeed[];

  // Quotes
  quote: string;
}

export const personas: Record<PersonaId, Persona> = {
  sarah: {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Portfolio Manager',
    organization: '$500M clean energy fund',
    segment: 'institutional_buyside',
    ageRange: [35, 45],
    experienceYears: 12,
    location: 'Boston, MA',
    devicePreference: 'desktop_primary',
    sessionFrequency: 'weekly',
    sessionDuration: 'medium',
    primaryGoals: [
      'Monitor 20+ grid infrastructure holdings',
      'Find new investment ideas before consensus',
      'Understand supply chain risks',
    ],
    painPoints: [
      'Tracking many companies across multiple data sources',
      'Hard to compare on supply chain dimensions',
      'Need to justify decisions with data',
    ],
    jobsToBeDone: [
      {
        id: 'sarah-jtbd-1',
        situation: 'When I open powerchoke',
        motivation: 'I want to see what changed since my last visit',
        outcome: 'so I can prioritize my research time',
      },
      {
        id: 'sarah-jtbd-2',
        situation: 'When comparing two potential investments',
        motivation: 'I want to see them side-by-side',
        outcome: 'so I can make a defensible decision for our IC',
      },
      {
        id: 'sarah-jtbd-3',
        situation: 'When preparing for an earnings call',
        motivation: 'I want to quickly pull up a company exposure profile',
        outcome: 'so I can ask informed questions',
      },
    ],
    featureNeeds: [
      { issueId: 'FNF-254', title: 'Side-by-side comparison', priority: 'critical', quote: 'I compare GEV vs ETN weekly' },
      { issueId: 'FNF-258', title: 'Watchlist', priority: 'critical', quote: 'I need to track my holdings' },
      { issueId: 'FNF-271', title: 'What\'s New dashboard', priority: 'high', quote: 'Show me what changed' },
      { issueId: 'FNF-255', title: 'CSV export', priority: 'medium', quote: 'For portfolio integration' },
    ],
    quote: "I don't have time to dig through 10-Ks for every company. Give me the supply chain exposure in one view.",
  },

  marcus: {
    id: 'marcus',
    name: 'Marcus Thompson',
    role: 'Equity Research Analyst',
    organization: 'Top-10 investment bank',
    segment: 'institutional_sellside',
    ageRange: [26, 35],
    experienceYears: 5,
    location: 'New York, NY',
    devicePreference: 'desktop_primary',
    sessionFrequency: 'daily',
    sessionDuration: 'deep',
    primaryGoals: [
      'Build differentiated, defensible research',
      'Understand supply chain dynamics others miss',
      'Create models with accurate input data',
    ],
    painPoints: [
      'Building supply chain maps manually is tedious',
      'Hard to find component-level exposure data',
      'Needs everything in Excel',
    ],
    jobsToBeDone: [
      {
        id: 'marcus-jtbd-1',
        situation: 'When initiating coverage on a company',
        motivation: 'I want to understand its supply chain position',
        outcome: 'so I can identify risks and advantages others miss',
      },
      {
        id: 'marcus-jtbd-2',
        situation: 'When writing a research note',
        motivation: 'I want to export data into my model',
        outcome: 'so I don\'t waste time on manual data entry',
      },
      {
        id: 'marcus-jtbd-3',
        situation: 'When presenting to clients',
        motivation: 'I want to cite my sources',
        outcome: 'so my analysis is credible',
      },
    ],
    featureNeeds: [
      { issueId: 'FNF-255', title: 'CSV export', priority: 'critical', quote: 'Non-negotiable. I live in Excel.' },
      { issueId: 'FNF-254', title: 'Side-by-side comparison', priority: 'critical', quote: 'Table stakes for equity research' },
      { issueId: 'FNF-273', title: 'Print/PDF export', priority: 'high', quote: 'I need to drop this into a research report' },
    ],
    quote: "If I can't export it to Excel and cite the source, it doesn't exist for my purposes.",
  },

  chen: {
    id: 'chen',
    name: 'Chen Wei',
    role: 'Independent Investor / Fintwit',
    organization: 'Self / 50K followers',
    segment: 'retail_investor',
    ageRange: [28, 40],
    experienceYears: 8,
    location: 'Austin, TX',
    devicePreference: 'both',
    sessionFrequency: 'daily',
    sessionDuration: 'quick',
    primaryGoals: [
      'Find under-the-radar investment opportunities',
      'Create shareable content for audience',
      'Quick lookups while researching',
    ],
    painPoints: [
      'Most tools are desktop-only or clunky on mobile',
      'Can\'t share specific views with followers',
      'Wants to appear data-driven without Bloomberg',
    ],
    jobsToBeDone: [
      {
        id: 'chen-jtbd-1',
        situation: 'When researching a company on my phone',
        motivation: 'I want to quickly see its bottleneck exposure',
        outcome: 'so I can decide if it\'s worth a deeper dive',
      },
      {
        id: 'chen-jtbd-2',
        situation: 'When writing a thread',
        motivation: 'I want to share a specific view',
        outcome: 'so my followers can see exactly what I\'m talking about',
      },
      {
        id: 'chen-jtbd-3',
        situation: 'When I find an interesting company',
        motivation: 'I want to save it to my watchlist',
        outcome: 'so I can track it over time',
      },
    ],
    featureNeeds: [
      { issueId: 'FNF-260', title: 'Mobile responsive', priority: 'critical', quote: 'I research on my phone' },
      { issueId: 'FNF-256', title: 'URL persistence', priority: 'critical', quote: "I can't share specific views" },
      { issueId: 'FNF-258', title: 'Watchlist', priority: 'high', quote: 'Track my positions' },
      { issueId: 'FNF-252', title: 'Cmd+K search', priority: 'medium', quote: 'Quick lookups' },
    ],
    quote: "If I can't share it with a link, my followers will never see it.",
  },

  elena: {
    id: 'elena',
    name: 'Elena Rodriguez',
    role: 'Supply Chain Risk Consultant',
    organization: 'Boutique advisory firm',
    segment: 'consultant',
    ageRange: [40, 55],
    experienceYears: 20,
    location: 'Chicago, IL',
    devicePreference: 'desktop_primary',
    sessionFrequency: 'weekly',
    sessionDuration: 'deep',
    primaryGoals: [
      'Identify single-source dependencies',
      'Assess supplier concentration risk',
      'Recommend mitigation strategies',
    ],
    painPoints: [
      'Sub-component supplier data is hard to find',
      'Need to filter by geography',
      'Clients ask what-if questions',
    ],
    jobsToBeDone: [
      {
        id: 'elena-jtbd-1',
        situation: "When assessing a client's supply chain",
        motivation: 'I want to see which components have monopoly suppliers',
        outcome: 'so I can flag risks',
      },
      {
        id: 'elena-jtbd-2',
        situation: 'When comparing supplier options',
        motivation: 'I want to filter by region and capability',
        outcome: 'so I can find alternatives',
      },
      {
        id: 'elena-jtbd-3',
        situation: 'When stress-testing a scenario',
        motivation: 'I want to adjust severity weights',
        outcome: 'so I can model different disruption scenarios',
      },
    ],
    featureNeeds: [
      { issueId: 'FNF-245', title: 'Sub-components data', priority: 'critical', quote: 'This is the hidden monopoly data' },
      { issueId: 'FNF-272', title: 'Advanced filters', priority: 'high', quote: 'Show me all Japanese suppliers' },
      { issueId: 'FNF-254', title: 'Side-by-side comparison', priority: 'high', quote: 'Compare supplier risk' },
      { issueId: 'FNF-257', title: 'Scenario modeling', priority: 'medium', quote: 'Stress test different disruptions' },
    ],
    quote: "The sub-component data is the real value. That's where the hidden monopolies live.",
  },

  david: {
    id: 'david',
    name: 'David Park',
    role: 'CIO',
    organization: '$50M family office',
    segment: 'family_office',
    ageRange: [45, 60],
    experienceYears: 25,
    location: 'San Francisco, CA',
    devicePreference: 'desktop_primary',
    sessionFrequency: 'weekly',
    sessionDuration: 'medium',
    primaryGoals: [
      'Monitor existing positions efficiently',
      'Find similar companies for diversification',
      'Understand what\'s happening across portfolio',
    ],
    painPoints: [
      'Too many positions to track manually',
      'Hard to find similar companies',
      'Needs simple outputs for advisors',
    ],
    jobsToBeDone: [
      {
        id: 'david-jtbd-1',
        situation: 'When I log in',
        motivation: 'I want to see if any holdings had rating changes',
        outcome: 'so I can investigate',
      },
      {
        id: 'david-jtbd-2',
        situation: 'When looking to add exposure',
        motivation: 'I want to find companies similar to my current winners',
        outcome: 'so I can diversify within theme',
      },
      {
        id: 'david-jtbd-3',
        situation: 'When my advisors ask for an update',
        motivation: 'I want to export a summary',
        outcome: 'so I can brief them quickly',
      },
    ],
    featureNeeds: [
      { issueId: 'FNF-258', title: 'Watchlist', priority: 'critical', quote: 'I need to track my 15 holdings' },
      { issueId: 'FNF-271', title: 'What\'s New dashboard', priority: 'high', quote: 'Did any of my holdings change?' },
      { issueId: 'FNF-259', title: 'Similar companies', priority: 'high', quote: 'Find alternatives and diversification' },
      { issueId: 'FNF-255', title: 'CSV export', priority: 'medium', quote: 'For my own models' },
    ],
    quote: "I'm not a day trader. I just need to know when something important changes.",
  },
};

// Utility functions

/**
 * Get all personas that need a specific feature
 */
export function getPersonasForFeature(issueId: string): Persona[] {
  return Object.values(personas).filter((p) =>
    p.featureNeeds.some((f) => f.issueId === issueId)
  );
}

/**
 * Get all personas that consider a feature critical
 */
export function getPersonasWithCriticalNeed(issueId: string): Persona[] {
  return Object.values(personas).filter((p) =>
    p.featureNeeds.some((f) => f.issueId === issueId && f.priority === 'critical')
  );
}

/**
 * Get all features that at least N personas need
 */
export function getFeaturesWithBroadSupport(minPersonas: number = 2): string[] {
  const featureCounts = new Map<string, number>();

  Object.values(personas).forEach((p) => {
    p.featureNeeds.forEach((f) => {
      featureCounts.set(f.issueId, (featureCounts.get(f.issueId) || 0) + 1);
    });
  });

  return Array.from(featureCounts.entries())
    .filter(([, count]) => count >= minPersonas)
    .map(([issueId]) => issueId);
}

/**
 * Get persona by segment (for analytics/feature flags)
 */
export function getPersonasBySegment(segment: PersonaSegment): Persona[] {
  return Object.values(personas).filter((p) => p.segment === segment);
}
