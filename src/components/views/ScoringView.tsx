'use client';

import { Trophy, TrendingUp, Target, Sparkles } from 'lucide-react';
import { ScoredCompany } from '@/data';
import { TypeBadge } from '@/components/ui/TypeBadge';

interface ScoringViewProps {
  companies: ScoredCompany[];
  onSelectCompany?: (company: ScoredCompany) => void;
}

export function ScoringView({ companies, onSelectCompany }: ScoringViewProps) {
  // Sort by TBI descending
  const rankedCompanies = [...companies].sort((a, b) => b.scores.TBI - a.scores.TBI);
  const top3 = rankedCompanies.slice(0, 3);
  const rest = rankedCompanies.slice(3);

  return (
    <div className="space-y-6">
      {/* Scoring Explanation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          TBI Scoring Methodology
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-blue-400 font-medium mb-1">BES (50%)</div>
            <div className="text-slate-400 text-xs">
              Bottleneck Exposure Score — measures exposure to high-severity supply chain constraints
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-purple-400 font-medium mb-1">Pricing Power (30%)</div>
            <div className="text-slate-400 text-xs">
              Ability to pass through costs and maintain margins in constrained markets
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-emerald-400 font-medium mb-1">Backlog (20%)</div>
            <div className="text-slate-400 text-xs">
              Order book strength providing revenue visibility and demand validation
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs text-slate-500 bg-slate-800/30 rounded-lg p-3">
          <strong className="text-slate-400">Weighted TBI</strong> = TBI × Purity Score. Higher purity means more focused grid infrastructure exposure.
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
        <div className="p-4 border-b border-slate-800">
          <h3 className="font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Full Rankings
          </h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-950 text-xs text-slate-400 uppercase tracking-wider">
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-right">BES</th>
              <th className="p-3 text-right">TBI</th>
              <th className="p-3 text-right">Purity</th>
              <th className="p-3 text-right">Weighted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rankedCompanies.map((company, idx) => (
              <tr
                key={company.id}
                onClick={() => onSelectCompany?.(company)}
                className="hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="p-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    idx < 3
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {idx + 1}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
