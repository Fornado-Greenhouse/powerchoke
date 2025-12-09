'use client';

import { BottleneckMatch } from '@/data/types';

interface ExposureCellProps {
  value: number;
  bottleneck?: BottleneckMatch;
}

/**
 * Exposure cell for the matrix view.
 * Heat map color scheme: higher exposure = "hotter" color.
 * Scores 1-2 are muted (rarely used), 3-5 are the meaningful range.
 *
 * TRUE BOTTLENECK cells (key player in monopoly/duopoly sub-component)
 * are highlighted with a white ring and glow effect.
 */
export function ExposureCell({ value, bottleneck }: ExposureCellProps) {
  if (!value) return <div className="w-full h-full bg-slate-900/20" />;

  // Heat map: cooler (low/rare) → hotter (high/dominant)
  // Clear visual progression: gray → yellow → amber → orange → red
  const config: Record<number, { bg: string; text: string; border: string }> = {
    1: { bg: 'bg-slate-700/40', text: 'text-slate-500', border: 'border-slate-700/50' },
    2: { bg: 'bg-yellow-600/70', text: 'text-yellow-100', border: 'border-yellow-500/50' },
    3: { bg: 'bg-amber-500/80', text: 'text-amber-100', border: 'border-amber-400/50' },
    4: { bg: 'bg-orange-500/90', text: 'text-orange-100', border: 'border-orange-400/50' },
    5: { bg: 'bg-red-600', text: 'text-white', border: 'border-red-500/50' },
  };

  const score = Math.min(5, Math.max(1, Math.round(value)));
  const { bg, text, border } = config[score];

  // TRUE BOTTLENECK styling: white ring with subtle glow
  const bottleneckStyles = bottleneck
    ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-900 shadow-[0_0_8px_rgba(255,255,255,0.5)]'
    : '';

  // Tooltip content for bottleneck cells
  const tooltipTitle = bottleneck
    ? `TRUE BOTTLENECK: ${bottleneck.subComponentName} (${bottleneck.marketStructure})`
    : undefined;

  return (
    <div
      className={`w-full h-full ${bg} ${border} border flex items-center justify-center text-xs font-bold ${text} transition-all hover:scale-105 hover:z-10 rounded-sm ${bottleneckStyles}`}
      title={tooltipTitle}
    >
      {value}
    </div>
  );
}

/**
 * Compact exposure indicator for list views
 */
export function ExposureDots({ exposure, maxDots = 5 }: { exposure: number; maxDots?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxDots }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < exposure ? 'bg-blue-500' : 'bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
}
