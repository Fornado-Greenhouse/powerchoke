'use client';

import { useMemo } from 'react';
import { Layers, Building2, AlertTriangle, Trophy, ChevronRight } from 'lucide-react';
import { ComponentRow, ScoredCompany } from '@/data';
import { getAllBottlenecks } from '@/lib/bottlenecks';

type TabType = 'matrix' | 'companies' | 'components' | 'scoring' | 'bottlenecks';

interface StatsWidgetsProps {
  components: ComponentRow[];
  companies: ScoredCompany[];
  onNavigate: (tab: TabType) => void;
}

export function StatsWidgets({ components, companies, onNavigate }: StatsWidgetsProps) {
  // Count true bottleneck positions (company × component pairs meeting all criteria)
  const trueBottlenecks = useMemo(() => {
    return getAllBottlenecks(companies, components);
  }, [companies, components]);
  const topScorer = companies[0];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-6">
      {/* Components */}
      <button
        onClick={() => onNavigate('components')}
        className="bg-slate-900 border border-slate-800 rounded-xl p-3 md:p-4 hover:border-slate-700 hover:bg-slate-800/50 transition-all group text-left"
      >
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <div className="bg-purple-500/20 p-1.5 md:p-2 rounded-lg">
            <Layers className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{components.length}</div>
        <div className="text-xs md:text-sm text-slate-400">Components</div>
        <div className="text-[10px] md:text-xs text-slate-500 mt-1 hidden sm:block">Grid infrastructure categories</div>
      </button>

      {/* Companies */}
      <button
        onClick={() => onNavigate('companies')}
        className="bg-slate-900 border border-slate-800 rounded-xl p-3 md:p-4 hover:border-slate-700 hover:bg-slate-800/50 transition-all group text-left"
      >
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-lg">
            <Building2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{companies.length}</div>
        <div className="text-xs md:text-sm text-slate-400">Companies</div>
        <div className="text-[10px] md:text-xs text-slate-500 mt-1 hidden sm:block">Tracked across supply chain</div>
      </button>

      {/* Critical Bottlenecks */}
      <button
        onClick={() => onNavigate('bottlenecks')}
        className="bg-slate-900 border border-slate-800 rounded-xl p-3 md:p-4 hover:border-slate-700 hover:bg-slate-800/50 transition-all group text-left"
      >
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <div className="bg-red-500/20 p-1.5 md:p-2 rounded-lg">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
        </div>
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{trueBottlenecks.length}</div>
        <div className="text-xs md:text-sm text-slate-400">True Bottlenecks</div>
        <div className="text-[10px] md:text-xs text-slate-500 mt-1 hidden sm:block">Monopoly/duopoly positions</div>
      </button>

      {/* Top Scorer */}
      <button
        onClick={() => onNavigate('scoring')}
        className="bg-slate-900 border border-slate-800 rounded-xl p-3 md:p-4 hover:border-slate-700 hover:bg-slate-800/50 transition-all group text-left"
      >
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <div className="bg-amber-500/20 p-1.5 md:p-2 rounded-lg">
            <Trophy className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
        </div>
        {topScorer ? (
          <>
            <div className="text-lg md:text-xl font-bold text-white mb-1 truncate">{topScorer.ticker}</div>
            <div className="text-xs md:text-sm text-slate-400">Top TBI Score</div>
            <div className="text-[10px] md:text-xs text-amber-400 font-mono mt-1">
              {topScorer.scores.TBI.toFixed(2)} • {(topScorer.purity_score * 100).toFixed(0)}% purity
            </div>
          </>
        ) : (
          <>
            <div className="text-lg md:text-xl font-bold text-slate-500 mb-1">—</div>
            <div className="text-xs md:text-sm text-slate-400">Top Scorer</div>
          </>
        )}
      </button>
    </div>
  );
}
