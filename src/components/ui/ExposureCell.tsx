'use client';

/**
 * Exposure cell for the matrix view.
 * Heat map color scheme: higher exposure = "hotter" color.
 * Scores 1-2 are muted (rarely used), 3-5 are the meaningful range.
 */
export function ExposureCell({ value }: { value: number }) {
  if (!value) return <div className="w-full h-full bg-slate-900/20" />;

  // Heat map: cooler (low/rare) → hotter (high/dominant)
  // 1-2: Muted slate (tangential exposure - rarely used)
  // 3: Amber (meaningful exposure)
  // 4: Orange (major player)
  // 5: Red/rose (dominant - core business)
  const config: Record<number, { bg: string; text: string; border: string }> = {
    1: { bg: 'bg-slate-700/30', text: 'text-slate-500', border: 'border-slate-700/50' },
    2: { bg: 'bg-slate-600/40', text: 'text-slate-400', border: 'border-slate-600/50' },
    3: { bg: 'bg-amber-600/70', text: 'text-amber-100', border: 'border-amber-500/50' },
    4: { bg: 'bg-orange-500/80', text: 'text-orange-100', border: 'border-orange-400/50' },
    5: { bg: 'bg-rose-500', text: 'text-white', border: 'border-rose-400/50' },
  };

  const score = Math.min(5, Math.max(1, Math.round(value)));
  const { bg, text, border } = config[score];

  return (
    <div
      className={`w-full h-full ${bg} ${border} border flex items-center justify-center text-xs font-bold ${text} transition-all hover:scale-105 hover:z-10 rounded-sm`}
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
