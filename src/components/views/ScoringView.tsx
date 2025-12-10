'use client';

import { useState, useMemo } from 'react';
import { Trophy, TrendingUp, Sparkles, BookOpen, ExternalLink, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { ScoredCompany } from '@/data';
import { TypeBadge } from '@/components/ui/TypeBadge';

type SortField = 'rank' | 'name' | 'type' | 'bes' | 'tbi' | 'purity' | 'weighted';
type SortDir = 'asc' | 'desc';

function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (sortField !== field) return <ArrowUpDown className="w-3 h-3 text-slate-600" />;
  return sortDir === 'desc'
    ? <ArrowDown className="w-3 h-3 text-blue-400" />
    : <ArrowUp className="w-3 h-3 text-blue-400" />;
}

interface ScoringViewProps {
  companies: ScoredCompany[];
  onSelectCompany?: (company: ScoredCompany) => void;
}

export function ScoringView({ companies, onSelectCompany }: ScoringViewProps) {
  const [sortField, setSortField] = useState<SortField>('tbi');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  // Base ranking by TBI (for top 3 podium and rank column)
  const baseRankedCompanies = useMemo(() => {
    return [...companies].sort((a, b) => b.scores.TBI - a.scores.TBI);
  }, [companies]);

  const top3 = baseRankedCompanies.slice(0, 3);

  // Create a map of company ID to their TBI rank
  const rankMap = useMemo(() => {
    const map = new Map<string, number>();
    baseRankedCompanies.forEach((c, idx) => map.set(c.id, idx + 1));
    return map;
  }, [baseRankedCompanies]);

  // Sorted companies for the table (can be sorted by any field)
  const sortedCompanies = useMemo(() => {
    return [...companies].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'rank': cmp = (rankMap.get(a.id) || 0) - (rankMap.get(b.id) || 0); break;
        case 'name': cmp = a.name.localeCompare(b.name); break;
        case 'type': cmp = a.type.localeCompare(b.type); break;
        case 'bes': cmp = a.scores.BES - b.scores.BES; break;
        case 'tbi': cmp = a.scores.TBI - b.scores.TBI; break;
        case 'purity': cmp = a.purity_score - b.purity_score; break;
        case 'weighted': cmp = a.scores.WeightedTBI - b.scores.WeightedTBI; break;
      }
      return sortDir === 'desc' ? -cmp : cmp;
    });
  }, [companies, sortField, sortDir, rankMap]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Scoring Explanation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
              Total Bottleneck Index (TBI)
            </h3>
            <p className="text-[10px] md:text-xs text-slate-500 mt-1 ml-6 md:ml-7">Composite score ranking companies by grid infrastructure supply chain leverage</p>
          </div>
          <a
            href="https://github.com/Fornado-Greenhouse/powerchoke/blob/main/docs/SCORING_METHODOLOGY.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 hover:border-blue-500/40 self-start"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Full Methodology</span>
            <span className="sm:hidden">Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Formula Display - hidden on mobile, shown on tablet+ */}
        <div className="hidden sm:block bg-slate-950 rounded-lg p-4 mb-4 font-mono text-sm border border-slate-800">
          <div className="text-slate-500 text-xs mb-2 font-sans">Formulas:</div>
          <div className="space-y-1 text-xs md:text-sm">
            <div><span className="text-blue-400">BES</span> <span className="text-slate-600">=</span> <span className="text-slate-300">Σ(exposure × severity × monopoly_bonus) / count / 4</span></div>
            <div><span className="text-amber-400">TBI</span> <span className="text-slate-600">=</span> <span className="text-blue-400">0.5</span><span className="text-slate-500">×BES</span> <span className="text-slate-600">+</span> <span className="text-purple-400">0.3</span><span className="text-slate-500">×pricing_power</span> <span className="text-slate-600">+</span> <span className="text-emerald-400">0.2</span><span className="text-slate-500">×backlog</span></div>
            <div><span className="text-cyan-400">WeightedTBI</span> <span className="text-slate-600">=</span> <span className="text-slate-300">TBI × purity_score</span></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-3 md:p-4">
            <div className="text-blue-400 font-medium mb-1 text-sm">BES (50%)</div>
            <div className="text-slate-400 text-[10px] md:text-xs">
              Bottleneck Exposure Score — weighted exposure to high-severity supply chain constraints.
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 md:p-4">
            <div className="text-purple-400 font-medium mb-1 text-sm">Pricing Power (30%)</div>
            <div className="text-slate-400 text-[10px] md:text-xs">
              Ability to pass through costs and maintain margins.
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 md:p-4">
            <div className="text-emerald-400 font-medium mb-1 text-sm">Backlog (20%)</div>
            <div className="text-slate-400 text-[10px] md:text-xs">
              Order book strength providing revenue visibility.
            </div>
          </div>
        </div>
        <div className="mt-3 md:mt-4 text-[10px] md:text-xs text-slate-500 bg-slate-800/30 rounded-lg p-2 md:p-3">
          <strong className="text-cyan-400">Weighted TBI</strong> = TBI × Purity Score. Rewards pure-play grid infrastructure companies.
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {top3.map((company, idx) => {
          const colors = [
            { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: 'text-amber-500' },
            { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-300', icon: 'text-slate-400' },
            { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', icon: 'text-orange-500' },
          ][idx];

          return (
            <button
              key={company.id}
              onClick={() => onSelectCompany?.(company)}
              className={`${colors.bg} border ${colors.border} rounded-xl p-4 md:p-6 hover:scale-[1.02] transition-all text-left`}
            >
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className={`text-2xl md:text-4xl font-bold ${colors.text}`}>#{idx + 1}</div>
                <Trophy className={`w-6 h-6 md:w-8 md:h-8 ${colors.icon}`} />
              </div>
              <div className="text-lg md:text-xl font-bold text-white mb-1 truncate">{company.name}</div>
              <div className="font-mono text-xs md:text-sm text-slate-400 mb-2 md:mb-3">{company.ticker}</div>
              <TypeBadge type={company.type} />
              <div className="mt-3 md:mt-4 grid grid-cols-2 gap-2 md:gap-4">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white">{company.scores.TBI.toFixed(2)}</div>
                  <div className="text-[10px] md:text-xs text-slate-500">TBI Score</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-white">{(company.purity_score * 100).toFixed(0)}%</div>
                  <div className="text-[10px] md:text-xs text-slate-500">Purity</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-3 md:p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white flex items-center gap-2 text-sm md:text-base">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Full Rankings
          </h3>
          <div className="text-[10px] md:text-xs text-slate-500 hidden sm:block">
            Click column headers to sort
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-950 text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">
                <th className="p-2 md:p-3 text-left">
                  <button onClick={() => handleSort('rank')} className="flex items-center gap-1 hover:text-white">
                    # <SortIcon field="rank" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-2 md:p-3 text-left">
                  <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-white">
                    Company <SortIcon field="name" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-2 md:p-3 text-left hidden sm:table-cell">
                  <button onClick={() => handleSort('type')} className="flex items-center gap-1 hover:text-white">
                    Type <SortIcon field="type" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-2 md:p-3 text-right hidden lg:table-cell">
                  <button onClick={() => handleSort('bes')} className="flex items-center gap-1 hover:text-white justify-end">
                    BES <SortIcon field="bes" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-2 md:p-3 text-right">
                  <button onClick={() => handleSort('tbi')} className="flex items-center gap-1 hover:text-white justify-end">
                    TBI <SortIcon field="tbi" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-2 md:p-3 text-right hidden md:table-cell">
                  <button onClick={() => handleSort('purity')} className="flex items-center gap-1 hover:text-white justify-end">
                    Purity <SortIcon field="purity" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-2 md:p-3 text-right hidden lg:table-cell">
                  <button onClick={() => handleSort('weighted')} className="flex items-center gap-1 hover:text-white justify-end">
                    Weighted <SortIcon field="weighted" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sortedCompanies.map((company) => {
                const rank = rankMap.get(company.id) || 0;
                return (
                  <tr
                    key={company.id}
                    onClick={() => onSelectCompany?.(company)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="p-2 md:p-3">
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-xs md:text-sm font-bold ${
                        rank <= 3
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {rank}
                      </div>
                    </td>
                    <td className="p-2 md:p-3">
                      <div className="font-medium text-white text-sm md:text-base truncate max-w-[120px] md:max-w-none">{company.name}</div>
                      <div className="text-[10px] md:text-xs text-slate-500 font-mono">{company.ticker}</div>
                    </td>
                    <td className="p-2 md:p-3 hidden sm:table-cell">
                      <TypeBadge type={company.type} showLabel={false} />
                    </td>
                    <td className="p-2 md:p-3 text-right hidden lg:table-cell">
                      <span className="font-mono text-slate-300 text-sm">{company.scores.BES.toFixed(2)}</span>
                    </td>
                    <td className="p-2 md:p-3 text-right">
                      <span className="font-mono font-bold text-white text-sm">{company.scores.TBI.toFixed(2)}</span>
                    </td>
                    <td className="p-2 md:p-3 text-right hidden md:table-cell">
                      <span className="font-mono text-slate-400 text-sm">{(company.purity_score * 100).toFixed(0)}%</span>
                    </td>
                    <td className="p-2 md:p-3 text-right hidden lg:table-cell">
                      <span className="font-mono text-blue-400 text-sm">{company.scores.WeightedTBI.toFixed(2)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
