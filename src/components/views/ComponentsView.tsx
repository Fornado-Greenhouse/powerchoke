'use client';

import { useState, useMemo } from 'react';
import { Microscope, AlertTriangle, ChevronRight, Users } from 'lucide-react';
import { ComponentRow, ScoredCompany } from '@/data';
import { SeverityBadge, TypeBadge } from '@/components/ui/TypeBadge';

interface ComponentsViewProps {
  components: ComponentRow[];
  companies: ScoredCompany[];
  onSelectComponent: (component: ComponentRow) => void;
}

export function ComponentsView({ components, companies, onSelectComponent }: ComponentsViewProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const categories = Array.from(new Set(components.map(c => c.category)));

  const filteredComponents = useMemo(() => {
    let filtered = [...components];
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(c => c.category === categoryFilter);
    }
    if (severityFilter !== 'all') {
      filtered = filtered.filter(c => c.bottleneck_severity >= parseInt(severityFilter));
    }
    return filtered;
  }, [components, categoryFilter, severityFilter]);

  const groupedComponents = useMemo(() => {
    const groups: Record<string, ComponentRow[]> = {};
    filteredComponents.forEach(c => {
      if (!groups[c.category]) groups[c.category] = [];
      groups[c.category].push(c);
    });
    return groups;
  }, [filteredComponents]);

  // Get exposed company count for a component
  const getExposedCompanies = (componentId: string) => {
    return companies.filter(c => (c.exposure[componentId] || 0) >= 3);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Filters */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-3 md:p-4 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-xs text-slate-500">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-blue-500 flex-1 sm:flex-initial"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-xs text-slate-500">Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-blue-500 flex-1 sm:flex-initial"
          >
            <option value="all">All</option>
            <option value="5">Critical (5)</option>
            <option value="4">High (4+)</option>
            <option value="3">Medium (3+)</option>
          </select>
        </div>
        <div className="sm:ml-auto text-[10px] md:text-xs text-slate-500">
          {filteredComponents.length} components
        </div>
      </div>

      {/* Component Cards by Category */}
      {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
        <div key={category}>
          <h3 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 md:mb-3 px-1">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {categoryComponents.map(component => {
              const exposedCompanies = getExposedCompanies(component.id);
              return (
                <button
                  key={component.id}
                  onClick={() => onSelectComponent(component)}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-3 md:p-4 hover:border-slate-700 hover:bg-slate-800/50 transition-all group text-left"
                >
                  <div className="flex items-start justify-between mb-2 md:mb-3">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <span className="text-[10px] md:text-xs font-mono text-slate-500 bg-slate-800 px-1 md:px-1.5 py-0.5 rounded">
                        #{component.row_number}
                      </span>
                      <SeverityBadge severity={component.bottleneck_severity} />
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>

                  <h4 className="font-medium text-sm md:text-base text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {component.name}
                  </h4>
                  <p className="text-[10px] md:text-xs text-slate-500 mb-2 md:mb-3 line-clamp-2">
                    {component.role}
                  </p>

                  <div className="flex items-center justify-between text-[10px] md:text-xs">
                    <div className="flex items-center gap-1 text-slate-400">
                      <span className="text-slate-600">{component.market_structure}</span>
                    </div>
                    {component.sub_components && component.sub_components.length > 0 && (
                      <div className="flex items-center gap-1 text-amber-500">
                        <Microscope className="w-3 h-3" />
                        <span>{component.sub_components.length} sub</span>
                      </div>
                    )}
                  </div>

                  {/* Exposed companies preview */}
                  {exposedCompanies.length > 0 && (
                    <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-slate-800">
                      <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-500">
                        <Users className="w-3 h-3" />
                        <span>{exposedCompanies.length} exposed</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5 md:mt-2">
                        {exposedCompanies.slice(0, 4).map(c => (
                          <span
                            key={c.id}
                            className="text-[10px] px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded font-mono"
                          >
                            {c.ticker}
                          </span>
                        ))}
                        {exposedCompanies.length > 4 && (
                          <span className="text-[10px] px-1.5 py-0.5 text-slate-500">
                            +{exposedCompanies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
