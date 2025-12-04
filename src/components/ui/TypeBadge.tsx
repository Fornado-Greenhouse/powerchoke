'use client';

import { Factory, Cpu, Pickaxe, HardHat, Zap, Radio } from 'lucide-react';
import { TierType } from '@/data';

export const TIER_CONFIG: Record<TierType, { label: string; color: string; bgColor: string; borderColor: string; Icon: typeof Factory }> = {
  TIER_1_OEM: { label: 'OEM', color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30', Icon: Factory },
  TIER_2_COMPONENT: { label: 'Component', color: 'text-amber-400', bgColor: 'bg-amber-500/20', borderColor: 'border-amber-500/30', Icon: Cpu },
  TIER_3_MATERIAL: { label: 'Material', color: 'text-purple-400', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500/30', Icon: Pickaxe },
  SERVICE_EPC: { label: 'EPC', color: 'text-orange-400', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-500/30', Icon: HardHat },
  UTILITY: { label: 'Utility', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20', borderColor: 'border-emerald-500/30', Icon: Zap },
  SOFTWARE: { label: 'Software', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', borderColor: 'border-cyan-500/30', Icon: Radio },
};

export function TypeIcon({ type, size = 'sm' }: { type: TierType; size?: 'sm' | 'md' | 'lg' }) {
  const config = TIER_CONFIG[type] || TIER_CONFIG.TIER_1_OEM;
  const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
  return <config.Icon className={`${sizeClass} ${config.color}`} />;
}

export function TypeBadge({ type, showLabel = true }: { type: TierType; showLabel?: boolean }) {
  const config = TIER_CONFIG[type] || TIER_CONFIG.TIER_1_OEM;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${config.bgColor} ${config.color} border ${config.borderColor}`}>
      <config.Icon className="w-3 h-3" />
      {showLabel && config.label}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: number }) {
  const config = severity >= 5
    ? { bg: 'bg-red-900/40', text: 'text-red-400', border: 'border-red-500/30' }
    : severity >= 4
    ? { bg: 'bg-orange-900/40', text: 'text-orange-400', border: 'border-orange-500/30' }
    : severity >= 3
    ? { bg: 'bg-yellow-900/40', text: 'text-yellow-400', border: 'border-yellow-500/30' }
    : { bg: 'bg-slate-800', text: 'text-slate-400', border: 'border-slate-700' };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${config.bg} ${config.text} border ${config.border}`}>
      {severity}/5
    </span>
  );
}
