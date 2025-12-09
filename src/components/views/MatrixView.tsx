'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { ComponentRow, ScoredCompany } from '@/data';
import { ExposureCell } from '@/components/ui/ExposureCell';
import { SeverityBadge, TypeIcon } from '@/components/ui/TypeBadge';

interface MatrixViewProps {
  components: ComponentRow[];
  companies: ScoredCompany[];
  onSelectComponent: (component: ComponentRow) => void;
  onSelectCompany?: (company: ScoredCompany) => void;
}

export function MatrixView({ components, companies, onSelectComponent, onSelectCompany }: MatrixViewProps) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
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
              {components.map((comp) => (
                <th
                  key={comp.id}
                  className="p-1 w-10 text-center border-r border-slate-800/50 bg-slate-950/50"
                >
                  <button
                    onClick={() => onSelectComponent(comp)}
                    className="flex flex-col items-center gap-0.5 group w-full"
                  >
                    <span className="text-[8px] font-mono text-slate-600">#{comp.row_number}</span>
                    <div
                      className="h-24 flex items-end justify-center pb-1"
                      style={{ writingMode: 'vertical-rl' }}
                    >
                      <span
                        className="text-[10px] text-slate-400 group-hover:text-blue-400 transition-colors transform rotate-180 whitespace-nowrap max-w-[90px] overflow-hidden text-ellipsis"
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
                {components.map((comp) => (
                  <td
                    key={`${company.id}-${comp.id}`}
                    className="p-0.5 h-12 border-r border-slate-800/30 relative"
                  >
                    <ExposureCell value={company.exposure[comp.id] || 0} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-col gap-3 items-center">
        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-500">Exposure:</span>
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 bg-slate-600/40 rounded-sm flex items-center justify-center text-slate-400 text-[10px] font-bold">2</span>
            <span className="text-slate-600">Minor</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 bg-amber-600/70 rounded-sm flex items-center justify-center text-amber-100 text-[10px] font-bold">3</span>
            <span className="text-slate-500">Meaningful</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 bg-orange-500/80 rounded-sm flex items-center justify-center text-orange-100 text-[10px] font-bold">4</span>
            <span className="text-slate-500">Major</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 bg-rose-500 rounded-sm flex items-center justify-center text-white text-[10px] font-bold">5</span>
            <span className="text-slate-500">Dominant</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4" />
          <p>
            Click company names for details. Click column headers for <strong className="text-slate-300">Bottleneck Anatomy</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
