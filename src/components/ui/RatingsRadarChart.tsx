'use client';

import { FinancialRatings } from '@/data/types';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface RatingsRadarChartProps {
  ratings: FinancialRatings;
  size?: 'sm' | 'md';
}

// Labels for each metric - short for chart, full for tooltip
const METRIC_LABELS: Record<string, { short: string; full: string }> = {
  dcfScore: { short: 'DCF', full: 'Discounted Cash Flow' },
  roeScore: { short: 'ROE', full: 'Return on Equity' },
  roaScore: { short: 'ROA', full: 'Return on Assets' },
  deScore: { short: 'D/E', full: 'Debt to Equity' },
  peScore: { short: 'P/E', full: 'Price to Earnings' },
  pbScore: { short: 'P/B', full: 'Price to Book' },
};

// Rating color based on letter grade
function getRatingColor(rating: string): string {
  const grade = rating.charAt(0).toUpperCase();
  switch (grade) {
    case 'A': return '#22c55e'; // green-500
    case 'B': return '#3b82f6'; // blue-500
    case 'C': return '#eab308'; // yellow-500
    case 'D': return '#f97316'; // orange-500
    case 'F': return '#ef4444'; // red-500
    default: return '#64748b'; // slate-500
  }
}

// Background color class for rating badge
function getRatingBgClass(rating: string): string {
  const grade = rating.charAt(0).toUpperCase();
  switch (grade) {
    case 'A': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'B': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'C': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'D': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    case 'F': return 'bg-red-500/20 text-red-300 border-red-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
}

// Custom tooltip component
function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { metric: string; value: number; fullName: string } }> }) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-lg">
      <div className="text-xs text-slate-400">{data.fullName}</div>
      <div className="text-sm font-bold text-white">{data.value}/5</div>
    </div>
  );
}

export function RatingsRadarChart({ ratings, size = 'md' }: RatingsRadarChartProps) {
  // Transform ratings into chart data
  const chartData = [
    { metric: 'DCF', value: ratings.dcfScore, fullName: METRIC_LABELS.dcfScore.full },
    { metric: 'ROE', value: ratings.roeScore, fullName: METRIC_LABELS.roeScore.full },
    { metric: 'ROA', value: ratings.roaScore, fullName: METRIC_LABELS.roaScore.full },
    { metric: 'D/E', value: ratings.deScore, fullName: METRIC_LABELS.deScore.full },
    { metric: 'P/E', value: ratings.peScore, fullName: METRIC_LABELS.peScore.full },
    { metric: 'P/B', value: ratings.pbScore, fullName: METRIC_LABELS.pbScore.full },
  ];

  const ratingColor = getRatingColor(ratings.rating);
  const chartHeight = size === 'sm' ? 180 : 220;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-3 md:p-4">
      {/* Header with rating badge */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-slate-400 text-[10px] md:text-xs font-medium uppercase tracking-wide">
          Financial Health
        </div>
        <div className={`px-2 py-0.5 rounded text-xs md:text-sm font-bold border ${getRatingBgClass(ratings.rating)}`}>
          {ratings.rating}
        </div>
      </div>

      {/* Radar Chart */}
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid
              stroke="#334155"
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: '#94a3b8', fontSize: size === 'sm' ? 10 : 11 }}
              tickLine={false}
            />
            <PolarRadiusAxis
              domain={[0, 5]}
              tickCount={6}
              tick={{ fill: '#64748b', fontSize: 9 }}
              axisLine={false}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke={ratingColor}
              fill={ratingColor}
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Overall score at bottom */}
      <div className="mt-1 text-center">
        <span className="text-slate-500 text-[10px] md:text-xs">
          Overall Score: <span className="text-slate-300 font-mono">{ratings.ratingScore}/5</span>
        </span>
      </div>
    </div>
  );
}

// Placeholder component when no ratings available
export function RatingsRadarPlaceholder() {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 border-dashed p-4 md:p-6">
      <div className="text-center">
        <div className="text-slate-500 text-xs md:text-sm mb-1">Financial Health</div>
        <div className="text-slate-600 text-[10px] md:text-xs">
          No ratings data available
        </div>
      </div>
    </div>
  );
}
