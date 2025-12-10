'use client';

import { LayoutGrid, Building2, Layers, Trophy, AlertTriangle } from 'lucide-react';

export type TabType = 'matrix' | 'companies' | 'components' | 'scoring' | 'bottlenecks';

interface TabNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string; shortLabel: string; Icon: typeof LayoutGrid }[] = [
  { id: 'matrix', label: 'Matrix', shortLabel: 'Matrix', Icon: LayoutGrid },
  { id: 'bottlenecks', label: 'Critical Bottlenecks', shortLabel: 'Bottlenecks', Icon: AlertTriangle },
  { id: 'companies', label: 'Companies', shortLabel: 'Companies', Icon: Building2 },
  { id: 'components', label: 'Components', shortLabel: 'Components', Icon: Layers },
  { id: 'scoring', label: 'Scoring', shortLabel: 'Scoring', Icon: Trophy },
];

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 mb-6 overflow-x-auto">
      {TABS.map(({ id, label, shortLabel, Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
            activeTab === id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{shortLabel}</span>
        </button>
      ))}
    </div>
  );
}
