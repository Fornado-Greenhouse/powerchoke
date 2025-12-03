'use client';

import React, { useState, useMemo } from 'react';
import {
  Info,
  Zap,
  Factory,
  Microscope,
  X,
  Cpu,
  AlertTriangle,
  HardHat,
  Pickaxe,
  Radio,
} from 'lucide-react';

import {
  components as seedComponents,
  companies as seedCompanies,
  DEFAULT_SCENARIO,
  type ComponentRow,
  type TierType,
  type UniverseType,
  type ScoredCompany,
} from '@/data';
import { scoreAndRankCompanies } from '@/lib/scoring';

// ─────────────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function HeatmapCell({ value, type }: { value: number; type: TierType }) {
  if (!value) return <div className="w-full h-full bg-slate-900/30" />;

  const colors: Record<TierType, string[]> = {
    TIER_1_OEM: ['bg-slate-900', 'bg-blue-900/40', 'bg-blue-700/60', 'bg-blue-600/80', 'bg-blue-500', 'bg-blue-400'],
    TIER_2_COMPONENT: ['bg-slate-900', 'bg-amber-900/40', 'bg-amber-700/60', 'bg-amber-600/80', 'bg-amber-500', 'bg-amber-400'],
    TIER_3_MATERIAL: ['bg-slate-900', 'bg-purple-900/40', 'bg-purple-700/60', 'bg-purple-600/80', 'bg-purple-500', 'bg-purple-400'],
    SERVICE_EPC: ['bg-slate-900', 'bg-orange-900/40', 'bg-orange-700/60', 'bg-orange-600/80', 'bg-orange-500', 'bg-orange-400'],
    UTILITY: ['bg-slate-900', 'bg-emerald-900/40', 'bg-emerald-700/60', 'bg-emerald-600/80', 'bg-emerald-500', 'bg-emerald-400'],
    SOFTWARE: ['bg-slate-900', 'bg-cyan-900/40', 'bg-cyan-700/60', 'bg-cyan-600/80', 'bg-cyan-500', 'bg-cyan-400'],
  };

  const palette = colors[type] || colors['TIER_1_OEM'];
  const bgClass = palette[Math.min(5, Math.round(value))];

  return (
    <div
      className={`w-full h-full ${bgClass} flex items-center justify-center text-xs font-bold text-white shadow-sm transition-all hover:scale-105`}
    >
      {value}
    </div>
  );
}

function TypeIcon({ type }: { type: TierType }) {
  switch (type) {
    case 'TIER_1_OEM':
      return <Factory className="w-3 h-3 text-blue-400" />;
    case 'TIER_2_COMPONENT':
      return <Cpu className="w-3 h-3 text-amber-400" />;
    case 'TIER_3_MATERIAL':
      return <Pickaxe className="w-3 h-3 text-purple-400" />;
    case 'SERVICE_EPC':
      return <HardHat className="w-3 h-3 text-orange-400" />;
    case 'UTILITY':
      return <Zap className="w-3 h-3 text-emerald-400" />;
    case 'SOFTWARE':
      return <Radio className="w-3 h-3 text-cyan-400" />;
    default:
      return <Factory className="w-3 h-3 text-slate-400" />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DEEP DIVE MODAL
// ─────────────────────────────────────────────────────────────────────────────

function ComponentModal({
  component,
  scoredCompanies,
  onClose,
}: {
  component: ComponentRow;
  scoredCompanies: ScoredCompany[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-4xl rounded-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* HEADER */}
        <div className="p-6 border-b border-slate-700 flex justify-between items-start bg-slate-800/50 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-bold border border-blue-500/30 font-mono">
                ROW {component.row_number}
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
            {/* LEFT: THESIS RISKS */}
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
              </div>
            </div>

            {/* RIGHT: SUB-COMPONENTS & HIDDEN MONOPOLIES */}
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
              Top Exposed Companies
            </h3>
            <div className="flex flex-wrap gap-2">
              {scoredCompanies
                .filter((c) => c.exposure[component.id] >= 4)
                .map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        c.type === 'TIER_1_OEM'
                          ? 'bg-blue-500'
                          : c.type === 'TIER_2_COMPONENT'
                          ? 'bg-amber-500'
                          : 'bg-purple-500'
                      }`}
                    ></span>
                    <span className="text-sm text-slate-200 font-bold">{c.ticker}</span>
                    <span className="text-xs text-slate-500 border-l border-slate-600 pl-2">
                      {c.scores.TBI} TBI
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Powerchoke() {
  const [universe, setUniverse] = useState<UniverseType>('INVESTABLE');
  const [selectedComponent, setSelectedComponent] = useState<ComponentRow | null>(null);

  // Use seed data directly (no Firebase)
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

  // Group components by category
  const groupedComponents = useMemo(() => {
    const groups: Record<string, ComponentRow[]> = {};
    components.forEach((c) => {
      if (!groups[c.category]) groups[c.category] = [];
      groups[c.category].push(c);
    });
    return groups;
  }, [components]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      {/* DEEP DIVE MODAL */}
      {selectedComponent && (
        <ComponentModal
          component={selectedComponent}
          scoredCompanies={scoredCompanies}
          onClose={() => setSelectedComponent(null)}
        />
      )}

      {/* HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/50">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                powerchoke
                <span className="text-xs bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                  beta
                </span>
              </h1>
              <p className="text-xs text-slate-400">Grid Infrastructure Bottleneck Analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setUniverse('GLOBAL')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${
                universe === 'GLOBAL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Global
            </button>
            <button
              onClick={() => setUniverse('INVESTABLE')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${
                universe === 'INVESTABLE'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Investable
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* LEGEND */}
        <div className="flex flex-wrap gap-4 mb-6 bg-slate-900 p-4 rounded-xl border border-slate-800">
          {[
            { label: 'OEM', color: 'bg-blue-500', Icon: Factory },
            { label: 'Component', color: 'bg-amber-500', Icon: Cpu },
            { label: 'Material', color: 'bg-purple-500', Icon: Pickaxe },
            { label: 'EPC', color: 'bg-orange-500', Icon: HardHat },
            { label: 'Utility', color: 'bg-emerald-500', Icon: Zap },
            { label: 'Software', color: 'bg-cyan-500', Icon: Radio },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2 text-xs">
              <div className={`w-3 h-3 ${t.color} rounded-sm`}></div>
              <t.Icon className="w-3 h-3 text-slate-400" />
              <span className="text-slate-300">{t.label}</span>
            </div>
          ))}
        </div>

        {/* THE 20-ROW MATRIX */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-700">
                  <th className="p-4 text-left w-96 text-slate-400 font-medium sticky left-0 bg-slate-950 z-20 border-r border-slate-800 shadow-xl">
                    Component & Thesis Role
                  </th>
                  <th className="p-4 w-48 text-center text-slate-400 font-medium border-r border-slate-800">
                    Market Profile
                  </th>
                  {filteredCompanies.map((c) => (
                    <th
                      key={c.id}
                      className="p-2 w-24 text-center border-r border-slate-800/50 bg-slate-950/50"
                    >
                      <div className="flex flex-col items-center gap-1 group relative cursor-help">
                        <span className="font-bold text-[10px] truncate max-w-[80px] text-slate-300">
                          {c.ticker}
                        </span>
                        <div className="flex justify-center">
                          <TypeIcon type={c.type} />
                        </div>
                        {/* Hover Tooltip */}
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 p-3 rounded-lg shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 text-left">
                          <div className="font-bold text-white mb-1">{c.name}</div>
                          <div className="text-xs text-slate-400 mb-2">
                            {c.region} • {c.type}
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>TBI Score:</span>
                            <span className="font-mono text-white">{c.scores.TBI}</span>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Purity:</span>
                            <span className="font-mono text-white">
                              {(c.purity_score * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {Object.entries(groupedComponents).map(([category, rows]) => (
                  <React.Fragment key={category}>
                    {/* CATEGORY HEADER */}
                    <tr className="bg-slate-950/80">
                      <td
                        colSpan={2 + filteredCompanies.length}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-y border-slate-800"
                      >
                        {category}
                      </td>
                    </tr>
                    {rows.map((component) => (
                      <tr
                        key={component.id}
                        className="group hover:bg-slate-800/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedComponent(component)}
                      >
                        {/* NAME & ROLE (CLICKABLE) */}
                        <td className="p-0 sticky left-0 z-10 border-r border-slate-800 bg-slate-900 group-hover:bg-slate-800">
                          <div className="p-3 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-slate-500 w-6">
                                  #{component.row_number}
                                </span>
                                <div className="font-medium text-slate-200 text-sm group-hover:text-blue-400 transition-colors">
                                  {component.name}
                                </div>
                              </div>
                              <div className="text-[10px] text-slate-500 pl-8 mt-0.5">
                                {component.role}
                              </div>
                            </div>

                            {/* Sub-component indicator */}
                            {component.sub_components && (
                              <div className="flex items-center gap-1 text-[10px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Microscope className="w-3 h-3" />
                                Analyse
                              </div>
                            )}
                          </div>
                        </td>

                        {/* MARKET PROFILE */}
                        <td className="p-3 text-center border-r border-slate-800/50">
                          <span
                            className={`text-[10px] px-2 py-1 rounded font-bold uppercase block mb-1 ${
                              component.bottleneck_severity >= 5
                                ? 'bg-red-900/40 text-red-400 border border-red-500/30'
                                : component.bottleneck_severity >= 4
                                ? 'bg-orange-900/40 text-orange-400 border border-orange-500/30'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            Severity: {component.bottleneck_severity}/5
                          </span>
                          <div className="text-[10px] text-slate-400">
                            {component.market_structure}
                          </div>
                        </td>

                        {/* COMPANY EXPOSURE CELLS */}
                        {filteredCompanies.map((c) => (
                          <td
                            key={`${c.id}-${component.id}`}
                            className="p-1 h-16 border-r border-slate-800/30 relative"
                          >
                            <HeatmapCell value={c.exposure[component.id] || 0} type={c.type} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-center text-xs text-slate-500 gap-2">
            <Info className="w-4 h-4" />
            <p>
              Click any row to open the{' '}
              <strong className="text-slate-300">Bottleneck Anatomy</strong> and view Sub-Components
              (e.g. Tap Changers, IGBTs).
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
