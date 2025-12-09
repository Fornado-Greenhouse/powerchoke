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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Total Bottleneck Index (TBI)
            </h3>
            <p className="text-xs text-slate-500 mt-1 ml-7">Composite score ranking companies by grid infrastructure supply chain leverage</p>
          </div>
          <a
            href="https://github.com/Fornado-Greenhouse/powerchoke/blob/main/docs/SCORING_METHODOLOGY.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 hover:border-blue-500/40"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Full Methodology
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Formula Display */}
        <div className="bg-slate-950 rounded-lg p-4 mb-4 font-mono text-sm border border-slate-800">
          <div className="text-slate-500 text-xs mb-2 font-sans">Formulas:</div>
          <div className="space-y-1">
            <div><span className="text-blue-400">BES</span> <span className="text-slate-600">=</span> <span className="text-slate-300">Σ(exposure × severity × monopoly_bonus) / count / 4</span></div>
            <div><span className="text-amber-400">TBI</span> <span className="text-slate-600">=</span> <span className="text-blue-400">0.5</span><span className="text-slate-500">×BES</span> <span className="text-slate-600">+</span> <span className="text-purple-400">0.3</span><span className="text-slate-500">×pricing_power</span> <span className="text-slate-600">+</span> <span className="text-emerald-400">0.2</span><span className="text-slate-500">×backlog</span></div>
            <div><span className="text-cyan-400">WeightedTBI</span> <span className="text-slate-600">=</span> <span className="text-slate-300">TBI × purity_score</span></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-blue-400 font-medium mb-1">BES (50%)</div>
            <div className="text-slate-400 text-xs">
              Bottleneck Exposure Score — weighted exposure to high-severity supply chain constraints. Monopoly positions get 1.3× bonus.
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-purple-400 font-medium mb-1">Pricing Power (30%)</div>
            <div className="text-slate-400 text-xs">
              Ability to pass through costs and maintain margins. Based on market structure, backlog commentary, and margin trends.
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-emerald-400 font-medium mb-1">Backlog (20%)</div>
            <div className="text-slate-400 text-xs">
              Order book strength providing revenue visibility. Measured by book-to-bill ratio and coverage months.
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs text-slate-500 bg-slate-800/30 rounded-lg p-3">
          <strong className="text-cyan-400">Weighted TBI</strong> = TBI × Purity Score. Higher purity (grid revenue / total revenue) means more focused grid infrastructure exposure, rewarding pure-play companies.
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              className={`${colors.bg} border ${colors.border} rounded-xl p-6 hover:scale-[1.02] transition-all text-left`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`text-4xl font-bold ${colors.text}`}>#{idx + 1}</div>
                <Trophy className={`w-8 h-8 ${colors.icon}`} />
              </div>
              <div className="text-xl font-bold text-white mb-1">{company.name}</div>
              <div className="font-mono text-sm text-slate-400 mb-3">{company.ticker}</div>
              <TypeBadge type={company.type} />
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white">{company.scores.TBI.toFixed(2)}</div>
                  <div className="text-xs text-slate-500">TBI Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{(company.purity_score * 100).toFixed(0)}%</div>
                  <div className="text-xs text-slate-500">Purity</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Full Rankings
          </h3>
          <div className="text-xs text-slate-500">
            Click column headers to sort
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider">
                <th className="p-3 text-left">
                  <button onClick={() => handleSort('rank')} className="flex items-center gap-1 hover:text-white">
                    Rank <SortIcon field="rank" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-white">
                    Company <SortIcon field="name" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button onClick={() => handleSort('type')} className="flex items-center gap-1 hover:text-white">
                    Type <SortIcon field="type" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-3 text-right">
                  <button onClick={() => handleSort('bes')} className="flex items-center gap-1 hover:text-white justify-end">
                    BES <SortIcon field="bes" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-3 text-right">
                  <button onClick={() => handleSort('tbi')} className="flex items-center gap-1 hover:text-white justify-end">
                    TBI <SortIcon field="tbi" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-3 text-right">
                  <button onClick={() => handleSort('purity')} className="flex items-center gap-1 hover:text-white justify-end">
                    Purity <SortIcon field="purity" sortField={sortField} sortDir={sortDir} />
                  </button>
                </th>
                <th className="p-3 text-right">
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
                    <td className="p-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        rank <= 3
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {rank}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-white">{company.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{company.ticker}</div>
                    </td>
                    <td className="p-3">
                      <TypeBadge type={company.type} showLabel={false} />
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-mono text-slate-300">{company.scores.BES.toFixed(2)}</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-mono font-bold text-white">{company.scores.TBI.toFixed(2)}</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-mono text-slate-400">{(company.purity_score * 100).toFixed(0)}%</span>
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-mono text-blue-400">{company.scores.WeightedTBI.toFixed(2)}</span>
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
