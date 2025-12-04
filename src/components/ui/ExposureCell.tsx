'use client';

/**
 * Exposure cell for the matrix view.
 * Color intensity based on exposure strength (1-5), using a single color scale.
 */
export function ExposureCell({ value }: { value: number }) {
  if (!value) return <div className="w-full h-full bg-slate-900/30" />;

  // Single color scale based on exposure strength - blue gradient
  const colors = [
    'bg-slate-900',      // 0 (unused)
    'bg-blue-900/40',    // 1
    'bg-blue-800/60',    // 2
    'bg-blue-700/70',    // 3
    'bg-blue-600/80',    // 4
    'bg-blue-500',       // 5
  ];

  const bgClass = colors[Math.min(5, Math.max(0, Math.round(value)))];

  return (
    <div
      className={`w-full h-full ${bgClass} flex items-center justify-center text-xs font-bold text-white shadow-sm transition-all hover:scale-105 hover:z-10`}
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
