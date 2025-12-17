'use client';

import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { Search, Building2, Package, MapPin, Globe } from 'lucide-react';
import type { ScoredCompany, ComponentRow } from '@/data';

interface CommandPaletteProps {
  companies: ScoredCompany[];
  components: ComponentRow[];
  onSelectCompany: (company: ScoredCompany) => void;
  onSelectComponent: (component: ComponentRow) => void;
  onNavigateToCompanies: () => void;
}

export function CommandPalette({
  companies,
  components,
  onSelectCompany,
  onSelectComponent,
  onNavigateToCompanies,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  const handleSelect = useCallback((type: 'company' | 'component', id: string) => {
    if (type === 'company') {
      const company = companies.find(c => c.id === id);
      if (company) {
        onSelectCompany(company);
        onNavigateToCompanies();
      }
    } else {
      const component = components.find(c => c.id === id);
      if (component) {
        onSelectComponent(component);
      }
    }
    setOpen(false);
    setSearch('');
  }, [companies, components, onSelectCompany, onSelectComponent, onNavigateToCompanies]);

  const openPalette = useCallback(() => {
    setOpen(true);
  }, []);

  // Region icon helper
  const RegionIcon = ({ region }: { region: string }) => {
    if (region === 'Global') {
      return <Globe className="w-3 h-3 text-slate-500" />;
    }
    return <MapPin className="w-3 h-3 text-slate-500" />;
  };

  if (!open) {
    return (
      <button
        onClick={openPalette}
        className="flex items-center gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors text-slate-400 hover:text-slate-300"
        aria-label="Open search (Cmd+K)"
      >
        <Search className="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span className="text-xs hidden md:inline">Search...</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 rounded border border-slate-700">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={() => setOpen(false)}
      />

      {/* Command Palette */}
      <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
        <Command
          className="w-full max-w-xl bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          shouldFilter={true}
          loop
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 border-b border-slate-700">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search companies and components..."
              className="flex-1 py-4 bg-transparent text-white placeholder:text-slate-500 outline-none text-sm"
              autoFocus
            />
            <kbd className="px-2 py-1 text-[10px] font-mono text-slate-500 bg-slate-800 rounded border border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-slate-500">
              No results found.
            </Command.Empty>

            {/* Companies Group */}
            <Command.Group
              heading={
                <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <Building2 className="w-3 h-3" /> Companies
                </span>
              }
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
            >
              {companies.map((company) => (
                <Command.Item
                  key={`company-${company.id}`}
                  value={`${company.name} ${company.ticker} ${company.region}`}
                  onSelect={() => handleSelect('company', company.id)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-slate-300 data-[selected=true]:bg-blue-600/20 data-[selected=true]:text-white transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-400 text-sm">
                        {company.ticker}
                      </span>
                      <span className="text-sm truncate">{company.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <RegionIcon region={company.region} />
                      <span className="text-xs text-slate-500">{company.region}</span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-slate-500">
                        TBI {company.scores.TBI.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Components Group */}
            <Command.Group
              heading={
                <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-2">
                  <Package className="w-3 h-3" /> Components
                </span>
              }
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
            >
              {components.map((component) => (
                <Command.Item
                  key={`component-${component.id}`}
                  value={`${component.name} ${component.category} ${component.role}`}
                  onSelect={() => handleSelect('component', component.id)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-slate-300 data-[selected=true]:bg-blue-600/20 data-[selected=true]:text-white transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">
                        #{component.row_number}
                      </span>
                      <span className="text-sm truncate">{component.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        component.bottleneck_severity >= 5
                          ? 'bg-red-500/20 text-red-300'
                          : component.bottleneck_severity >= 4
                          ? 'bg-orange-500/20 text-orange-300'
                          : 'bg-slate-700 text-slate-400'
                      }`}>
                        Sev {component.bottleneck_severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500">{component.category}</span>
                    </div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-700 bg-slate-800/50 text-[10px] text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-700">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-700">↵</kbd>
                select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-700">esc</kbd>
              close
            </span>
          </div>
        </Command>
      </div>
    </>
  );
}
