'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Zap,
  X,
  AlertTriangle,
  Microscope,
  Globe,
  Filter,
  MapPin,
  TrendingUp,
  Package,
  BarChart3,
  Building2,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

import {
  components as seedComponents,
  companies as seedCompanies,
  DEFAULT_SCENARIO,
  type ComponentRow,
  type UniverseType,
  type ScoredCompany,
} from '@/data';
import { TypeBadge } from './ui/TypeBadge';
import { scoreAndRankCompanies } from '@/lib/scoring';

import { StatsWidgets } from './StatsWidgets';
import { TabNav, type TabType } from './TabNav';
import { MatrixView } from './views/MatrixView';
import { CompaniesView } from './views/CompaniesView';
import { ComponentsView } from './views/ComponentsView';
import { ScoringView } from './views/ScoringView';
import { CriticalBottlenecksView } from './views/CriticalBottlenecksView';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT DETAIL MODAL
// ─────────────────────────────────────────────────────────────────────────────

function ComponentModal({
  component,
  companies,
  onClose,
}: {
  component: ComponentRow;
  companies: ReturnType<typeof scoreAndRankCompanies>;
  onClose: () => void;
}) {
  const exposedCompanies = companies.filter(c => (c.exposure[component.id] || 0) >= 3);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-4xl rounded-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* HEADER */}
        <div className="p-6 border-b border-slate-700 flex justify-between items-start bg-slate-800/50 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-bold border border-blue-500/30 font-mono">
                #{component.row_number}
              </div>
              <div className={`px-2 py-1 rounded text-xs font-bold border ${
                component.bottleneck_severity >= 5
                  ? 'bg-red-500/20 text-red-300 border-red-500/30'
                  : component.bottleneck_severity >= 4
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                  : 'bg-slate-700 text-slate-300 border-slate-600'
              }`}>
                Severity {component.bottleneck_severity}/5
              </div>
              <h2 className="text-2xl font-bold text-white">{component.name}</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              {component.role}. {component.demand_drivers}.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT: THESIS RISKS & INFO */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Investment Risks
                </h3>
                <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-xl flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                  <p className="text-sm text-red-200">{component.risks}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-xs mb-1">Voltage Level</div>
                  <div className="text-white font-mono font-bold">{component.voltage_level}</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-xs mb-1">Market Structure</div>
                  <div className="text-white font-bold">{component.market_structure}</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-xs mb-1">Pricing Power</div>
                  <div className="text-white font-bold">{component.pricing_power}/5</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-xs mb-1">Tier Type</div>
                  <div className="text-white font-bold text-sm">{component.tier_type.replace('TIER_', 'T').replace('_', ' ')}</div>
                </div>
              </div>
            </div>

            {/* RIGHT: SUB-COMPONENTS */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Microscope className="w-4 h-4" /> Bottleneck Anatomy
              </h3>

              {component.sub_components && component.sub_components.length > 0 ? (
                <div className="space-y-3">
                  {component.sub_components.map((sub, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-amber-500/50 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-amber-100 group-hover:text-amber-400 transition-colors">
                          {sub.name}
                        </div>
                        <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-700">
                          {sub.market_structure}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mb-3">{sub.role}</div>
                      <div className="flex items-center gap-2 text-xs bg-slate-900/50 p-2 rounded">
                        <span className="text-slate-500">Key Player:</span>
                        <span className="text-amber-300 font-mono">{sub.key_player}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center border border-slate-800 border-dashed rounded-xl text-slate-500 text-sm">
                  No critical sub-component bottlenecks identified for this category.
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM: EXPOSED COMPANIES */}
          <div className="mt-8 pt-8 border-t border-slate-800">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              Exposed Companies ({exposedCompanies.length})
            </h3>
            {exposedCompanies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {exposedCompanies.map((c) => (
                  <div
                    key={c.id}
                    className="bg-slate-800 p-3 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{c.ticker}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        c.exposure[component.id] >= 5
                          ? 'bg-blue-500/30 text-blue-300'
                          : c.exposure[component.id] >= 4
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-700 text-slate-400'
                      }`}>
                        {c.exposure[component.id]}/5
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">{c.name}</div>
                    <div className="text-xs text-slate-600 mt-1">TBI: {c.scores.TBI.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 text-sm">No companies with significant exposure (3+)</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY DETAIL MODAL
// ─────────────────────────────────────────────────────────────────────────────

function ScoreBar({ value, max = 5, label }: { value: number; max?: number; label: string }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <div className="text-slate-400 text-xs mb-2">{label}</div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: max }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-4 rounded-sm ${
                i < value ? 'bg-blue-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
        <span className="text-white font-bold">{value}/{max}</span>
      </div>
    </div>
  );
}

function CompanyModal({
  company,
  components,
  onClose,
  onSelectComponent,
}: {
  company: ScoredCompany;
  components: ComponentRow[];
  onClose: () => void;
  onSelectComponent: (component: ComponentRow) => void;
}) {
  // Get components this company has exposure to, sorted by exposure level
  const exposedComponents = useMemo(() => {
    return components
      .filter(c => (company.exposure[c.id] || 0) > 0)
      .sort((a, b) => (company.exposure[b.id] || 0) - (company.exposure[a.id] || 0));
  }, [company, components]);

  // Group exposed components by category
  const groupedExposures = useMemo(() => {
    const groups: Record<string, { component: ComponentRow; exposure: number }[]> = {};
    exposedComponents.forEach(comp => {
      if (!groups[comp.category]) groups[comp.category] = [];
      groups[comp.category].push({
        component: comp,
        exposure: company.exposure[comp.id] || 0,
      });
    });
    return groups;
  }, [exposedComponents, company]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-4xl rounded-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* HEADER */}
        <div className="p-6 border-b border-slate-700 flex justify-between items-start bg-slate-800/50 rounded-t-2xl">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="font-mono text-lg font-bold text-blue-400">{company.ticker}</span>
              <TypeBadge type={company.type} />
              <div className="flex items-center gap-1 text-xs text-slate-400">
                {company.region === 'Global' ? (
                  <Globe className="w-3 h-3" />
                ) : (
                  <MapPin className="w-3 h-3" />
                )}
                {company.region}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded border ${
                company.universe === 'INVESTABLE'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-slate-700 text-slate-300 border-slate-600'
              }`}>
                {company.universe === 'INVESTABLE' ? 'Investable' : 'Global Only'}
              </span>
              {!company.is_public && (
                <span className="text-xs px-2 py-0.5 rounded border bg-amber-500/20 text-amber-300 border-amber-500/30">
                  Private
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">{company.name}</h2>
            {company.description && (
              <p className="text-slate-400 text-sm mt-2 max-w-2xl">{company.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 overflow-y-auto">
          {/* SCORES SECTION */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Scores
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* TBI - Main Score */}
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5 rounded-xl border border-blue-500/30 col-span-2 md:col-span-1">
                <div className="text-blue-300 text-xs mb-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Total Bottleneck Index
                </div>
                <div className="text-4xl font-bold text-white">{company.scores.TBI.toFixed(2)}</div>
              </div>

              {/* BES */}
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-xs mb-1">BES Score</div>
                <div className="text-2xl font-bold text-white">{company.scores.BES.toFixed(2)}</div>
              </div>

              {/* Weighted TBI */}
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-xs mb-1">Weighted TBI</div>
                <div className="text-2xl font-bold text-white">{company.scores.WeightedTBI.toFixed(2)}</div>
              </div>

              {/* Purity Score */}
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-slate-400 text-xs mb-2">Purity Score</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                      style={{ width: `${company.purity_score * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-bold">{(company.purity_score * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* Pricing Power */}
              <ScoreBar value={company.pricing_power} label="Pricing Power" />

              {/* Backlog Strength */}
              <ScoreBar value={company.backlog_strength} label="Backlog Strength" />
            </div>
          </div>

          {/* COMPANY INFO SECTION */}
          {(company.market_cap_usd || company.headquarters || company.primary_exchange) && (
            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Company Info
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {company.market_cap_usd !== undefined && (
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-slate-400 text-xs mb-1 flex items-center gap-1">
                      <DollarSign className="w-3 h-3" /> Market Cap
                    </div>
                    <div className="text-white font-bold">${company.market_cap_usd.toFixed(1)}B</div>
                  </div>
                )}
                {company.revenue_ttm_usd !== undefined && (
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-slate-400 text-xs mb-1">Revenue (TTM)</div>
                    <div className="text-white font-bold">${company.revenue_ttm_usd.toFixed(1)}B</div>
                  </div>
                )}
                {company.grid_revenue_pct !== undefined && (
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-slate-400 text-xs mb-1">Grid Revenue %</div>
                    <div className="text-white font-bold">{company.grid_revenue_pct}%</div>
                  </div>
                )}
                {company.headquarters && (
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-slate-400 text-xs mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> HQ
                    </div>
                    <div className="text-white font-bold text-sm">{company.headquarters}</div>
                  </div>
                )}
                {company.primary_exchange && (
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <div className="text-slate-400 text-xs mb-1">Exchange</div>
                    <div className="text-white font-bold">{company.primary_exchange}</div>
                  </div>
                )}
              </div>

              {/* Data Provenance */}
              {(company.data_updated || company.data_confidence) && (
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  {company.data_updated && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Updated: {company.data_updated}
                    </div>
                  )}
                  {company.data_confidence && (
                    <div className="flex items-center gap-1">
                      {company.data_confidence === 'high' ? (
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                      ) : company.data_confidence === 'medium' ? (
                        <AlertCircle className="w-3 h-3 text-amber-500" />
                      ) : (
                        <HelpCircle className="w-3 h-3 text-slate-500" />
                      )}
                      <span className={
                        company.data_confidence === 'high' ? 'text-emerald-400' :
                        company.data_confidence === 'medium' ? 'text-amber-400' : 'text-slate-400'
                      }>
                        {company.data_confidence.charAt(0).toUpperCase() + company.data_confidence.slice(1)} confidence
                      </span>
                    </div>
                  )}
                  {company.data_sources && company.data_sources.length > 0 && (
                    <div className="flex items-center gap-1 text-slate-600">
                      Sources: {company.data_sources.join(', ')}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* EXPOSURE BREAKDOWN */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Package className="w-4 h-4" /> Component Exposure ({exposedComponents.length} components)
            </h3>

            {Object.keys(groupedExposures).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedExposures).map(([category, items]) => (
                  <div key={category}>
                    <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
                      {category}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {items.map(({ component, exposure }) => (
                        <button
                          key={component.id}
                          onClick={() => {
                            onClose();
                            onSelectComponent(component);
                          }}
                          className="bg-slate-800 p-3 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors text-left group flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-slate-500">#{component.row_number}</span>
                            <span className="text-sm text-slate-200 group-hover:text-blue-400 transition-colors">
                              {component.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1.5 h-3 rounded-sm ${
                                    i < exposure ? 'bg-blue-500' : 'bg-slate-700'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              exposure >= 5
                                ? 'bg-blue-500/30 text-blue-300'
                                : exposure >= 4
                                ? 'bg-blue-500/20 text-blue-400'
                                : exposure >= 3
                                ? 'bg-slate-700 text-slate-300'
                                : 'bg-slate-800 text-slate-500'
                            }`}>
                              {exposure}/5
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center border border-slate-800 border-dashed rounded-xl text-slate-500 text-sm">
                No component exposures defined for this company.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

// Valid tab types for URL hash
const VALID_TABS: TabType[] = ['matrix', 'bottlenecks', 'companies', 'components', 'scoring'];

function getTabFromHash(): TabType {
  if (typeof window === 'undefined') return 'matrix';
  const hash = window.location.hash.slice(1); // Remove '#'
  return VALID_TABS.includes(hash as TabType) ? (hash as TabType) : 'matrix';
}

export default function Powerchoke() {
  // Initialize tab from URL hash (lazy initialization avoids useEffect setState)
  const [activeTab, setActiveTab] = useState<TabType>(() => getTabFromHash());
  const [universe, setUniverse] = useState<UniverseType>('INVESTABLE');
  const [selectedComponent, setSelectedComponent] = useState<ComponentRow | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<ScoredCompany | null>(null);

  // Listen for hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(getTabFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash when tab changes
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.history.pushState(null, '', `#${tab}`);
  };

  // Data
  const components = seedComponents;
  const scenario = DEFAULT_SCENARIO;

  // Score all companies
  const scoredCompanies = useMemo(() => {
    return scoreAndRankCompanies(seedCompanies, components, scenario);
  }, [components, scenario]);

  // Filter by universe
  const filteredCompanies = useMemo(() => {
    return scoredCompanies.filter((c) => universe === 'GLOBAL' || c.universe === universe);
  }, [scoredCompanies, universe]);

  // Counts for filter badges
  const globalCount = scoredCompanies.length;
  const investableCount = scoredCompanies.filter(c => c.universe === 'INVESTABLE').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      {/* COMPONENT MODAL */}
      {selectedComponent && (
        <ComponentModal
          component={selectedComponent}
          companies={filteredCompanies}
          onClose={() => setSelectedComponent(null)}
        />
      )}

      {/* COMPANY MODAL */}
      {selectedCompany && (
        <CompanyModal
          company={selectedCompany}
          components={components}
          onClose={() => setSelectedCompany(null)}
          onSelectComponent={setSelectedComponent}
        />
      )}

      {/* HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => handleTabChange('matrix')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/50">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                powerchoke
                <span className="text-xs bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                  beta
                </span>
              </h1>
              <p className="text-xs text-slate-400">Grid Infrastructure Bottleneck Analysis</p>
            </div>
          </button>

          {/* Universe Filter */}
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-500" />
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setUniverse('GLOBAL')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-2 ${
                  universe === 'GLOBAL'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-3 h-3" />
                All ({globalCount})
              </button>
              <button
                onClick={() => setUniverse('INVESTABLE')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  universe === 'INVESTABLE'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Investable ({investableCount})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* STATS WIDGETS */}
        <StatsWidgets
          components={components}
          companies={filteredCompanies}
          onNavigate={handleTabChange}
        />

        {/* TAB NAVIGATION */}
        <TabNav activeTab={activeTab} onTabChange={handleTabChange} />

        {/* TAB CONTENT */}
        {activeTab === 'matrix' && (
          <MatrixView
            components={components}
            companies={filteredCompanies}
            onSelectComponent={setSelectedComponent}
            onSelectCompany={setSelectedCompany}
          />
        )}
        {activeTab === 'bottlenecks' && (
          <CriticalBottlenecksView
            companies={filteredCompanies}
            components={components}
            onSelectCompany={setSelectedCompany}
            onSelectComponent={setSelectedComponent}
          />
        )}
        {activeTab === 'companies' && (
          <CompaniesView
            companies={filteredCompanies}
            components={components}
            onSelectCompany={setSelectedCompany}
          />
        )}
        {activeTab === 'components' && (
          <ComponentsView
            components={components}
            companies={filteredCompanies}
            onSelectComponent={setSelectedComponent}
          />
        )}
        {activeTab === 'scoring' && (
          <ScoringView
            companies={filteredCompanies}
            onSelectCompany={setSelectedCompany}
          />
        )}
      </main>
    </div>
  );
}
