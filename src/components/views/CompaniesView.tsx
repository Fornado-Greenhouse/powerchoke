'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Globe, MapPin } from 'lucide-react';
import { ScoredCompany, ComponentRow } from '@/data';
import { TypeBadge, TypeIcon } from '@/components/ui/TypeBadge';
import { ExposureDots } from '@/components/ui/ExposureCell';

type SortField = 'name' | 'ticker' | 'tbi' | 'purity' | 'region' | 'type';
type SortDir = 'asc' | 'desc';

function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (sortField !== field) return <ArrowUpDown className="w-3 h-3 text-slate-600" />;
  return sortDir === 'desc'
    ? <ArrowDown className="w-3 h-3 text-blue-400" />
    : <ArrowUp className="w-3 h-3 text-blue-400" />;
}

interface CompaniesViewProps {
  companies: ScoredCompany[];
  components: ComponentRow[];
  onSelectCompany?: (company: ScoredCompany) => void;
}

export function CompaniesView({ companies, components, onSelectCompany }: CompaniesViewProps) {
  const [sortField, setSortField] = useState<SortField>('tbi');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const sortedCompanies = useMemo(() => {
    let filtered = [...companies];

    if (typeFilter !== 'all') {
      filtered = filtered.filter(c => c.type === typeFilter);
    }
    if (regionFilter !== 'all') {
      filtered = filtered.filter(c => c.region === regionFilter);
    }

    return filtered.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'name': cmp = a.name.localeCompare(b.name); break;
        case 'ticker': cmp = a.ticker.localeCompare(b.ticker); break;
        case 'tbi': cmp = a.scores.TBI - b.scores.TBI; break;
        case 'purity': cmp = a.purity_score - b.purity_score; break;
        case 'region': cmp = a.region.localeCompare(b.region); break;
        case 'type': cmp = a.type.localeCompare(b.type); break;
      }
      return sortDir === 'desc' ? -cmp : cmp;
    });
  }, [companies, sortField, sortDir, typeFilter, regionFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const regions = Array.from(new Set(companies.map(c => c.region)));
  const types = Array.from(new Set(companies.map(c => c.type)));

  // Calculate total exposure for each company
  const getExposureCount = (company: ScoredCompany) => {
    return Object.values(company.exposure).filter(v => v >= 3).length;
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-slate-800 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Types</option>
            {types.map(t => (
              <option key={t} value={t}>{t.replace('TIER_', 'Tier ').replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Region:</span>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Regions</option>
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="ml-auto text-xs text-slate-500">
          {sortedCompanies.length} companies
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-950 text-left text-xs text-slate-400 uppercase tracking-wider">
              <th className="p-4">
                <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-white">
                  Company <SortIcon field="name" sortField={sortField} sortDir={sortDir} />
                </button>
              </th>
              <th className="p-4">
                <button onClick={() => handleSort('ticker')} className="flex items-center gap-1 hover:text-white">
                  Ticker <SortIcon field="ticker" sortField={sortField} sortDir={sortDir} />
                </button>
              </th>
              <th className="p-4">
                <button onClick={() => handleSort('type')} className="flex items-center gap-1 hover:text-white">
                  Type <SortIcon field="type" sortField={sortField} sortDir={sortDir} />
                </button>
              </th>
              <th className="p-4">
                <button onClick={() => handleSort('region')} className="flex items-center gap-1 hover:text-white">
                  Region <SortIcon field="region" sortField={sortField} sortDir={sortDir} />
                </button>
              </th>
              <th className="p-4">
                <button onClick={() => handleSort('tbi')} className="flex items-center gap-1 hover:text-white">
                  TBI Score <SortIcon field="tbi" sortField={sortField} sortDir={sortDir} />
                </button>
              </th>
              <th className="p-4">
                <button onClick={() => handleSort('purity')} className="flex items-center gap-1 hover:text-white">
                  Purity <SortIcon field="purity" sortField={sortField} sortDir={sortDir} />
                </button>
              </th>
              <th className="p-4">Exposure</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sortedCompanies.map((company, idx) => (
              <tr
                key={company.id}
                onClick={() => onSelectCompany?.(company)}
                className="hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-medium text-white">{company.name}</div>
                      <div className="text-xs text-slate-500">{company.universe === 'GLOBAL' ? 'Global Universe' : 'Investable'}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-mono text-sm text-slate-200">{company.ticker}</span>
                </td>
                <td className="p-4">
                  <TypeBadge type={company.type} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1.5 text-sm text-slate-300">
                    {company.region === 'Global' ? (
                      <Globe className="w-3 h-3 text-slate-500" />
                    ) : (
                      <MapPin className="w-3 h-3 text-slate-500" />
                    )}
                    {company.region}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">{company.scores.TBI.toFixed(2)}</span>
                    <div className="text-[10px] text-slate-500">
                      <div>BES: {company.scores.BES.toFixed(2)}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                        style={{ width: `${company.purity_score * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{(company.purity_score * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <ExposureDots exposure={getExposureCount(company)} maxDots={5} />
                    <span className="text-xs text-slate-500">{getExposureCount(company)} components</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
