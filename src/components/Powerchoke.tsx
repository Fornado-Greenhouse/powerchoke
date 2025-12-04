'use client';

import React, { useState, useMemo } from 'react';
import {
  Zap,
  X,
  AlertTriangle,
  Microscope,
  Globe,
  Filter,
} from 'lucide-react';

import {
  components as seedComponents,
  companies as seedCompanies,
  DEFAULT_SCENARIO,
  type ComponentRow,
  type UniverseType,
} from '@/data';
import { scoreAndRankCompanies } from '@/lib/scoring';

import { StatsWidgets } from './StatsWidgets';
import { TabNav, type TabType } from './TabNav';
import { MatrixView } from './views/MatrixView';
import { CompaniesView } from './views/CompaniesView';
import { ComponentsView } from './views/ComponentsView';
import { ScoringView } from './views/ScoringView';

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
// MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

export default function Powerchoke() {
  const [activeTab, setActiveTab] = useState<TabType>('matrix');
  const [universe, setUniverse] = useState<UniverseType>('INVESTABLE');
  const [selectedComponent, setSelectedComponent] = useState<ComponentRow | null>(null);

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

      {/* HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setActiveTab('matrix')}
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
          onNavigate={setActiveTab}
        />

        {/* TAB NAVIGATION */}
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* TAB CONTENT */}
        {activeTab === 'matrix' && (
          <MatrixView
            components={components}
            companies={filteredCompanies}
            onSelectComponent={setSelectedComponent}
          />
        )}
        {activeTab === 'companies' && (
          <CompaniesView
            companies={filteredCompanies}
            components={components}
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
          />
        )}
      </main>
    </div>
  );
}
