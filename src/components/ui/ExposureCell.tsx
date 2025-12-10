'use client';

import { useState, useRef, useCallback } from 'react';
import { BottleneckMatch, ExposureRationale } from '@/data/types';

interface ExposureCellProps {
  value: number;
  bottleneck?: BottleneckMatch;
  componentName?: string;
  rationale?: ExposureRationale;
}

/**
 * Exposure cell for the matrix view.
 * Heat map color scheme: higher exposure = "hotter" color.
 * Scores 1-2 are muted (rarely used), 3-5 are the meaningful range.
 *
 * TRUE BOTTLENECK cells (key player in monopoly/duopoly sub-component)
 * are highlighted with a white ring and glow effect.
 *
 * Hover shows a popover with detailed rationale, metric, and source.
 */
export function ExposureCell({ value, bottleneck, componentName, rationale }: ExposureCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<'top' | 'bottom'>('top');
  const cellRef = useRef<HTMLDivElement>(null);

  // Calculate popover position when mouse enters
  const handleMouseEnter = useCallback(() => {
    if (cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      const spaceAbove = rect.top;
      const popoverHeight = 200; // Approximate height

      setPopoverPosition(spaceAbove < popoverHeight + 20 ? 'bottom' : 'top');
    }
    setIsHovered(true);
  }, []);

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

  // Should show popover on hover?
  const hasPopoverContent = rationale || bottleneck;

  return (
    <div
      ref={cellRef}
      className={`w-full h-full ${bg} ${border} border flex items-center justify-center text-xs font-bold ${text} transition-all hover:scale-105 hover:z-10 rounded-sm ${bottleneckStyles} relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      {value}

      {/* Popover */}
      {isHovered && hasPopoverContent && (
        <div
          className={`absolute w-72 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-3 text-left ${
            popoverPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          } left-1/2 -translate-x-1/2`}
          style={{ pointerEvents: 'none', zIndex: 100 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                score === 5 ? 'bg-red-600 text-white' :
                score === 4 ? 'bg-orange-500/90 text-white' :
                score === 3 ? 'bg-amber-500/80 text-amber-100' :
                score === 2 ? 'bg-yellow-600/70 text-yellow-100' :
                'bg-slate-700 text-slate-400'
              }`}>
                {value}/5
              </span>
              {componentName && (
                <span className="text-xs text-slate-300 font-medium truncate max-w-[150px]">
                  {componentName}
                </span>
              )}
            </div>
          </div>

          {/* Bottleneck badge */}
          {bottleneck && (
            <div className="mb-2 flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/40">
                TRUE BOTTLENECK
              </span>
              <span className="text-[10px] text-slate-500">
                {bottleneck.marketStructure}
              </span>
            </div>
          )}

          {/* Sub-component for bottleneck */}
          {bottleneck && (
            <div className="text-xs text-slate-400 mb-2 bg-slate-800/50 px-2 py-1 rounded">
              <span className="text-slate-500">Sub-component:</span>{' '}
              <span className="text-amber-300">{bottleneck.subComponentName}</span>
            </div>
          )}

          {/* Rationale content */}
          {rationale ? (
            <div className="space-y-1.5">
              <p className="text-xs text-slate-300 leading-relaxed">
                {rationale.rationale}
              </p>
              {rationale.metric && (
                <p className="text-[10px] text-slate-500 font-mono">
                  📊 {rationale.metric}
                </p>
              )}
              {rationale.source && (
                <p className="text-[10px] text-slate-600">
                  📖 {rationale.source}
                </p>
              )}
            </div>
          ) : bottleneck ? (
            <p className="text-[10px] text-slate-600 italic">
              Key player: {bottleneck.keyPlayer}
            </p>
          ) : null}

          {/* Arrow pointer */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-l-transparent border-r-transparent ${
              popoverPosition === 'top'
                ? 'top-full border-t-8 border-t-slate-700'
                : 'bottom-full border-b-8 border-b-slate-700'
            }`}
          />
        </div>
      )}
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
