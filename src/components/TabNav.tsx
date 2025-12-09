'use client';

import { LayoutGrid, Building2, Layers, Trophy, AlertTriangle } from 'lucide-react';

export type TabType = 'matrix' | 'companies' | 'components' | 'scoring' | 'bottlenecks';

interface TabNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string; Icon: typeof LayoutGrid }[] = [
  { id: 'matrix', label: 'Matrix', Icon: LayoutGrid },
  { id: 'bottlenecks', label: 'Critical Bottlenecks', Icon: AlertTriangle },
  { id: 'companies', label: 'Companies', Icon: Building2 },
  { id: 'components', label: 'Components', Icon: Layers },
  { id: 'scoring', label: 'Scoring', Icon: Trophy },
];

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 mb-6">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
