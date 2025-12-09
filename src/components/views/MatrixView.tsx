'use client';

import React, { useMemo } from 'react';
import { Info, Microscope } from 'lucide-react';
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
  // Group components by category for row grouping
  const groupedComponents = useMemo(() => {
    const groups: Record<string, ComponentRow[]> = {};
    components.forEach((c) => {
      if (!groups[c.category]) groups[c.category] = [];
      groups[c.category].push(c);
    });
    return groups;
  }, [components]);

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
                  className="p-2 w-14 text-center border-r border-slate-800/50 bg-slate-950/50"
                >
                  <button
                    onClick={() => onSelectComponent(comp)}
                    className="flex flex-col items-center gap-1 group w-full"
                  >
                    <span className="text-[9px] font-mono text-slate-500">#{comp.row_number}</span>
                    <div className="w-full h-12 flex items-center justify-center">
                      <span
                        className="text-[10px] text-slate-400 group-hover:text-blue-400 transition-colors transform -rotate-45 origin-center whitespace-nowrap"
                        title={comp.name}
                      >
                        {comp.name.length > 16 ? comp.name.slice(0, 16) + '…' : comp.name}
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
                    className="p-1 h-14 border-r border-slate-800/30 relative"
                  >
                    <ExposureCell value={company.exposure[comp.id] || 0} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-950 p-4 border-t border-slate-800 flex justify-center text-xs text-slate-500 gap-2">
        <Info className="w-4 h-4" />
        <p>
          Click company names for details. Click column headers for <strong className="text-slate-300">Bottleneck Anatomy</strong>.
          Exposure: 1 (low) to 5 (core business).
        </p>
      </div>
    </div>
  );
}
