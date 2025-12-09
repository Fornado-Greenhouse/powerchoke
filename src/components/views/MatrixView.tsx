'use client';

import React, { useMemo } from 'react';
import { Info } from 'lucide-react';
import { ComponentRow, ScoredCompany } from '@/data';
import { ExposureCell } from '@/components/ui/ExposureCell';
import { SeverityBadge, TypeIcon } from '@/components/ui/TypeBadge';
import { buildBottleneckMap, getBottleneckForCell } from '@/lib/bottlenecks';

interface MatrixViewProps {
  components: ComponentRow[];
  companies: ScoredCompany[];
  onSelectComponent: (component: ComponentRow) => void;
  onSelectCompany?: (company: ScoredCompany) => void;
}

export function MatrixView({ components, companies, onSelectComponent, onSelectCompany }: MatrixViewProps) {
  // Sort components by bottleneck severity (highest first), then by row_number for stability
  const sortedComponents = useMemo(() => {
    return [...components].sort((a, b) => {
      if (b.bottleneck_severity !== a.bottleneck_severity) {
        return b.bottleneck_severity - a.bottleneck_severity;
      }
      return a.row_number - b.row_number;
    });
  }, [components]);

  // Pre-compute bottleneck map for O(1) cell lookups
  const bottleneckMap = useMemo(() => {
    return buildBottleneckMap(companies, components);
  }, [companies, components]);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            {/* Column group label row */}
            <tr className="bg-slate-950 border-b border-slate-800/50">
              <th className="sticky left-0 bg-slate-950 z-20 border-r border-slate-800" />
              <th className="border-r border-slate-800" />
              <th
                colSpan={sortedComponents.length}
                className="py-2 text-center text-xs font-medium text-slate-400 uppercase tracking-wider"
              >
                Components <span className="text-slate-600 font-normal normal-case">(sorted by bottleneck severity)</span>
              </th>
            </tr>
            <tr className="bg-slate-950 border-b border-slate-700">
              <th className="p-4 text-left w-80 text-slate-400 font-medium sticky left-0 bg-slate-950 z-20 border-r border-slate-800">
                Company
              </th>
              <th
                className="p-3 w-20 text-center text-slate-400 font-medium border-r border-slate-800 cursor-help"
                title="Total Bottleneck Index - Composite score measuring supply chain leverage"
              >
                TBI
              </th>
              {sortedComponents.map((comp) => (
                <th
                  key={comp.id}
                  className="p-1 w-12 text-center border-r border-slate-800/50 bg-slate-950/50"
                >
                  <button
                    onClick={() => onSelectComponent(comp)}
                    className="flex flex-col items-center gap-0.5 group w-full"
                  >
                    <span className="text-[8px] font-mono text-slate-600">#{comp.row_number}</span>
                    <div
                      className="h-36 flex items-end justify-center pb-1"
                      style={{ writingMode: 'vertical-rl' }}
                    >
                      <span
                        className="text-[10px] text-slate-400 group-hover:text-blue-400 transition-colors transform rotate-180 leading-tight text-center"
                        style={{ maxHeight: '140px', wordBreak: 'break-word', whiteSpace: 'normal' }}
                        title={comp.name}
                      >
                        {comp.name}
                      </span>
                    </div>
                    <SeverityBadge severity={comp.bottleneck_severity} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {companies.map((company, idx) => (
              <tr
                key={company.id}
                className="group hover:bg-slate-800/50 transition-colors"
              >
                {/* Company Name */}
                <td className="p-0 sticky left-0 z-10 border-r border-slate-800 bg-slate-900 group-hover:bg-slate-800">
                  <button
                    onClick={() => onSelectCompany?.(company)}
                    className="w-full p-3 flex items-center gap-3 text-left hover:bg-slate-700/50 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <TypeIcon type={company.type} size="sm" />
                        <span className="font-medium text-slate-200 text-sm truncate group-hover:text-blue-400 transition-colors">
                          {company.name}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {company.ticker} • {company.region}
                      </div>
                    </div>
                  </button>
                </td>

                {/* TBI Score */}
                <td className="p-3 text-center border-r border-slate-800/50">
                  <div className="font-mono font-bold text-white">{company.scores.TBI.toFixed(2)}</div>
                  <div className="text-[10px] text-slate-500">{(company.purity_score * 100).toFixed(0)}%</div>
                </td>

                {/* Exposure Cells */}
                {sortedComponents.map((comp) => (
                  <td
                    key={`${company.id}-${comp.id}`}
                    className="p-0.5 h-12 border-r border-slate-800/30 relative"
                  >
                    <ExposureCell
                      value={company.exposure[comp.id] || 0}
                      bottleneck={getBottleneckForCell(bottleneckMap, company.id, comp.id)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-col gap-3 items-center">
        <div className="flex items-center gap-4 text-xs flex-wrap justify-center">
          <span className="text-slate-500">Exposure:</span>
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 bg-yellow-600/70 rounded-sm flex items-center justify-center text-yellow-100 text-[10px] font-bold">2</span>
            <span className="text-slate-500">Minor</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 bg-amber-500/80 rounded-sm flex items-center justify-center text-amber-100 text-[10px] font-bold">3</span>
            <span className="text-slate-500">Meaningful</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 bg-orange-500/90 rounded-sm flex items-center justify-center text-orange-100 text-[10px] font-bold">4</span>
            <span className="text-slate-500">Major</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center text-white text-[10px] font-bold">5</span>
            <span className="text-slate-500">Dominant</span>
          </div>
          <span className="text-slate-700 mx-2">|</span>
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white ring-offset-1 ring-offset-slate-950 shadow-[0_0_8px_rgba(255,255,255,0.5)]">5</span>
            <span className="text-slate-400 font-medium">True Bottleneck</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4" />
          <p>
            <strong className="text-white">White ring</strong> = Key player in monopoly/duopoly sub-component.
            Click company names for details. Click column headers for <strong className="text-slate-300">Bottleneck Anatomy</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
