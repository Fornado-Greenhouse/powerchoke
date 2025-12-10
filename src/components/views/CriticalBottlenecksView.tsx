'use client';

import React, { useMemo } from 'react';
import { AlertTriangle, Building2, Layers, Shield, TrendingUp } from 'lucide-react';
import { ComponentRow, BottleneckMatch, ScoredCompany } from '@/data/types';
import { getAllBottlenecks } from '@/lib/bottlenecks';

interface CriticalBottlenecksViewProps {
  companies: ScoredCompany[];
  components: ComponentRow[];
  onSelectCompany?: (company: ScoredCompany) => void;
  onSelectComponent?: (component: ComponentRow) => void;
}

/**
 * Critical Bottlenecks View
 *
 * Displays all "true bottleneck" positions where companies hold key player roles
 * in severe monopoly/duopoly sub-components with high market share exposure.
 *
 * Provides detailed explanations of each bottleneck for investment analysis.
 */
export function CriticalBottlenecksView({
  companies,
  components,
  onSelectCompany,
  onSelectComponent,
}: CriticalBottlenecksViewProps) {
  // Get all bottleneck matches sorted by severity
  const bottlenecks = useMemo(() => {
    return getAllBottlenecks(companies, components);
  }, [companies, components]);

  // Group by severity for display
  const severity5Bottlenecks = bottlenecks.filter(b => b.subComponentSeverity === 5);
  const severity4Bottlenecks = bottlenecks.filter(b => b.subComponentSeverity === 4);

  // Helper to find company and component objects
  const findCompany = (id: string): ScoredCompany | undefined => companies.find(c => c.id === id);
  const findComponent = (id: string) => components.find(c => c.id === id);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950/50 to-slate-900 rounded-xl border border-red-900/50 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex items-center gap-4 sm:block">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-red-600/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
            </div>
            <div className="sm:hidden">
              <div className="text-2xl font-bold text-red-400">{bottlenecks.length}</div>
              <div className="text-xs text-slate-500">Bottleneck Positions</div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Critical Bottlenecks</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-3xl">
              These are <strong className="text-white">true supply chain chokepoints</strong> where
              a single company controls a monopoly or duopoly position in a critical sub-component.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-3xl md:text-4xl font-bold text-red-400">{bottlenecks.length}</div>
            <div className="text-xs md:text-sm text-slate-500">Bottleneck Positions</div>
          </div>
        </div>

        {/* Criteria Explanation */}
        <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <div className="bg-slate-900/50 rounded-lg p-2 md:p-3 border border-slate-800">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1">
              <Shield className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
              <span className="text-[10px] md:text-xs font-medium text-slate-400">Severity</span>
            </div>
            <div className="text-xs md:text-sm text-white">4-5 (Critical)</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-2 md:p-3 border border-slate-800">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1">
              <Layers className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />
              <span className="text-[10px] md:text-xs font-medium text-slate-400">Market</span>
            </div>
            <div className="text-xs md:text-sm text-white">Monopoly / Duopoly</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-2 md:p-3 border border-slate-800">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1">
              <Building2 className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-[10px] md:text-xs font-medium text-slate-400">Company Role</span>
            </div>
            <div className="text-xs md:text-sm text-white">Key Player Match</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-2 md:p-3 border border-slate-800">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              <span className="text-[10px] md:text-xs font-medium text-slate-400">Exposure</span>
            </div>
            <div className="text-xs md:text-sm text-white">4-5 (Major/Dominant)</div>
          </div>
        </div>
      </div>

      {/* Severity 5 Bottlenecks */}
      {severity5Bottlenecks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-xs md:text-sm">
              5
            </div>
            <h3 className="text-base md:text-lg font-semibold text-white">Maximum Severity Bottlenecks</h3>
            <span className="text-xs md:text-sm text-slate-500">({severity5Bottlenecks.length})</span>
          </div>
          <div className="grid gap-3 md:gap-4">
            {severity5Bottlenecks.map((bottleneck, idx) => (
              <BottleneckCard
                key={`${bottleneck.companyId}-${bottleneck.componentId}-${idx}`}
                bottleneck={bottleneck}
                company={findCompany(bottleneck.companyId)}
                component={findComponent(bottleneck.componentId)}
                onSelectCompany={onSelectCompany}
                onSelectComponent={onSelectComponent}
              />
            ))}
          </div>
        </div>
      )}

      {/* Severity 4 Bottlenecks */}
      {severity4Bottlenecks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-xs md:text-sm">
              4
            </div>
            <h3 className="text-base md:text-lg font-semibold text-white">High Severity Bottlenecks</h3>
            <span className="text-xs md:text-sm text-slate-500">({severity4Bottlenecks.length})</span>
          </div>
          <div className="grid gap-3 md:gap-4">
            {severity4Bottlenecks.map((bottleneck, idx) => (
              <BottleneckCard
                key={`${bottleneck.companyId}-${bottleneck.componentId}-${idx}`}
                bottleneck={bottleneck}
                company={findCompany(bottleneck.companyId)}
                component={findComponent(bottleneck.componentId)}
                onSelectCompany={onSelectCompany}
                onSelectComponent={onSelectComponent}
              />
            ))}
          </div>
        </div>
      )}

      {bottlenecks.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No critical bottlenecks found matching the criteria.
        </div>
      )}
    </div>
  );
}

/**
 * Individual bottleneck card with detailed explanation
 */
function BottleneckCard({
  bottleneck,
  company,
  component,
  onSelectCompany,
  onSelectComponent,
}: {
  bottleneck: BottleneckMatch;
  company?: ScoredCompany;
  component?: ComponentRow;
  onSelectCompany?: (company: ScoredCompany) => void;
  onSelectComponent?: (component: ComponentRow) => void;
}) {
  const severityColor = bottleneck.subComponentSeverity === 5 ? 'red' : 'orange';
  const isMonopoly = bottleneck.marketStructure.toLowerCase() === 'monopoly';

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors">
      <div className="p-3 md:p-5">
        <div className="flex items-start gap-3 md:gap-4">
          {/* Severity indicator */}
          <div
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-${severityColor}-600/20 flex items-center justify-center flex-shrink-0 ring-2 ring-white/20`}
          >
            <span className={`text-lg md:text-xl font-bold text-${severityColor}-400`}>
              {bottleneck.subComponentSeverity}
            </span>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Company and Component */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
              {company && (
                <button
                  onClick={() => onSelectCompany?.(company)}
                  className="text-base md:text-lg font-semibold text-white hover:text-blue-400 transition-colors text-left"
                >
                  {bottleneck.companyName}
                </button>
              )}
              <span className="text-slate-600 hidden sm:inline">/</span>
              {component && (
                <button
                  onClick={() => onSelectComponent?.(component)}
                  className="text-sm md:text-lg font-medium text-slate-400 hover:text-blue-400 transition-colors text-left"
                >
                  {bottleneck.componentName}
                </button>
              )}
            </div>

            {/* Sub-component name */}
            <div className="text-xs md:text-sm text-slate-300 mb-2 md:mb-3">
              <span className="text-slate-500">Sub-component:</span>{' '}
              <span className="font-medium">{bottleneck.subComponentName}</span>
            </div>

            {/* Key metrics row */}
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              {/* Market Structure Badge */}
              <div
                className={`inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${
                  isMonopoly
                    ? 'bg-red-600/20 text-red-300 border border-red-500/30'
                    : 'bg-orange-600/20 text-orange-300 border border-orange-500/30'
                }`}
              >
                {isMonopoly ? (
                  <Shield className="w-2.5 h-2.5 md:w-3 md:h-3" />
                ) : (
                  <Layers className="w-2.5 h-2.5 md:w-3 md:h-3" />
                )}
                {bottleneck.marketStructure}
              </div>

              {/* Exposure */}
              <div className="text-[10px] md:text-xs">
                <span className="text-slate-600">Exposure:</span>{' '}
                <span
                  className={`font-bold ${
                    bottleneck.exposure === 5
                      ? 'text-red-400'
                      : 'text-orange-400'
                  }`}
                >
                  {bottleneck.exposure}/5
                </span>
              </div>

              {/* Company ticker if public */}
              {company?.is_public && company.ticker && (
                <div className="text-[10px] md:text-xs font-mono text-slate-500 bg-slate-800 px-1.5 md:px-2 py-0.5 rounded">
                  {company.ticker}
                </div>
              )}
            </div>
          </div>

          {/* Market cap if available - hidden on small screens */}
          {company?.market_cap_usd && (
            <div className="text-right flex-shrink-0 hidden sm:block">
              <div className="text-base md:text-lg font-bold text-white">
                ${company.market_cap_usd.toFixed(1)}B
              </div>
              <div className="text-[10px] md:text-xs text-slate-500">Market Cap</div>
            </div>
          )}
        </div>

        {/* Exposure rationale if available */}
        {company?.exposure_rationale?.[bottleneck.componentId] && (
          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-800">
            <div className="text-[10px] md:text-xs text-slate-500 mb-1">Investment Rationale:</div>
            <p className="text-xs md:text-sm text-slate-300">
              {company.exposure_rationale[bottleneck.componentId].rationale}
            </p>
            {company.exposure_rationale[bottleneck.componentId].metric && (
              <p className="text-[10px] md:text-xs text-slate-500 mt-1 md:mt-1.5 font-mono">
                📊 {company.exposure_rationale[bottleneck.componentId].metric}
              </p>
            )}
            {company.exposure_rationale[bottleneck.componentId].source && (
              <p className="text-[10px] md:text-xs text-slate-600 mt-1">
                📖 {company.exposure_rationale[bottleneck.componentId].source}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
