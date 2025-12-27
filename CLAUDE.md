# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build with Turbopack (static export to /out)
npm run lint     # Run ESLint
```

This is a **Next.js 16** app with:
- **Turbopack** as the default bundler (2-5x faster builds)
- **React Compiler** enabled (automatic memoization)
- **ESLint 9** with flat config (`eslint.config.mjs`)
- Static export (`output: 'export'` in next.config.js) for Netlify hosting

## Architecture

**powerchoke** is a grid infrastructure bottleneck analysis tool that helps investors identify supply chain chokepoints in the power grid sector.

### Core Domain Model

The application models a **20-component grid infrastructure matrix** where:
- **Components** (`src/data/components.ts`): 20 critical grid infrastructure categories (transformers, HVDC converters, circuit breakers, etc.)
- **Companies** (`src/data/companies.ts`): Companies with exposure ratings (1-5) to each component
- **Sub-components**: "Hidden monopolies" - niche suppliers within components that control critical bottlenecks

### Scoring Engine (`src/lib/scoring.ts`)

Calculates three metrics for each company:
- **BES** (Bottleneck Exposure Score): Weighted sum of component exposures × severity × monopoly bonus
- **TBI** (Total Bottleneck Index): `0.5×BES + 0.3×pricing_power + 0.2×backlog_strength`
- **WeightedTBI**: TBI × purity_score (how "pure play" the company is on grid infra)

### Data Layer (`src/data/`)

All data is static TypeScript (no database). Key types in `types.ts`:
- `Company`: ticker, region, type (tier), universe (GLOBAL|INVESTABLE), exposure map, purity_score
- `ComponentRow`: grid component with severity, pricing_power, market_structure, sub_components
- `Scenario`: multipliers that adjust scoring weights

### UI Architecture (`src/components/`)

Single-page app with tab-based navigation:
- `Powerchoke.tsx`: Main orchestrator with state management and component modal
- `views/MatrixView.tsx`: Company×Component exposure heatmap
- `views/CompaniesView.tsx`: Sortable company table with filtering
- `views/ComponentsView.tsx`: Components grouped by category
- `views/ScoringView.tsx`: TBI leaderboard with podium visualization

### Key Patterns

- Universe filter (GLOBAL vs INVESTABLE) flows through all views
- Scored companies are computed once via `useMemo` then filtered
- Component detail opens in modal, not separate route
- Import from `@/data` for types and seed data, `@/lib/scoring` for calculations
- **React Compiler rule**: Define helper components outside parent components (not inline during render) to avoid state resets

## User Personas

Five primary personas drive product decisions. When building features, consider which persona(s) you're serving:

| Persona | Role | Key Need | Quote |
|---------|------|----------|-------|
| **Sarah** | PM at $500M fund | Portfolio monitoring, comparison | "I compare GEV vs ETN weekly" |
| **Marcus** | Sell-side analyst | Excel export, defensible research | "If I can't export it, it doesn't exist" |
| **Chen** | Fintwit investor | Mobile, shareable links | "If I can't share it, followers won't see it" |
| **Elena** | Supply chain consultant | Filters, sub-component data | "Sub-components are where monopolies hide" |
| **David** | Family office CIO | Watchlist, what's changed | "I just need to know when something changes" |

**Full documentation**: `docs/PERSONAS.md`
**Typed data**: `src/data/personas.ts`

When evaluating a feature:
1. Which persona(s) does this serve?
2. Is it critical for at least 1 persona OR needed by 2+ personas?
3. Does it address a stated job-to-be-done?

## Linear + Git Workflow

This project uses Linear for issue tracking. Issues are in the **Friends&Family** team with prefix `FNF-`.

### Branch Names from Linear Issues

Each Linear issue has a pre-formatted git branch name. Use the MCP tool to fetch it:

```
mcp__linear-server__get_issue with id: "FNF-244"
```

The response includes `gitBranchName`, e.g.: `alex/fnf-244-enhance-data-schema-with-market-cap-revenue-mix-and-data`

Create the branch:
```bash
git checkout -b alex/fnf-244-enhance-data-schema-with-market-cap-revenue-mix-and-data
```

### Closing Issues via PR or Commit

Include the issue ID with a **closing magic word** in your PR description or commit message:

```
Closes FNF-244
Fixes FNF-244
Resolves FNF-244
```

All closing keywords: `close`, `closes`, `closed`, `closing`, `fix`, `fixes`, `fixed`, `fixing`, `resolve`, `resolves`, `resolved`, `resolving`, `complete`, `completes`, `completed`, `completing`

### Referencing Issues Without Closing

Use **non-closing magic words** to link without auto-closing:

```
Ref FNF-244
Part of FNF-244
Related to FNF-244
Contributes to FNF-244
```

All non-closing keywords: `ref`, `refs`, `references`, `part of`, `related to`, `contributes to`, `toward`, `towards`

### Example PR Description

```markdown
## Summary
- Added market_cap and grid_revenue_pct fields to Company type
- Updated 10 companies with new data

Closes FNF-244
Part of FNF-247
```

### Example Commit Message

```
feat: add data provenance fields to schema

- Added data_updated, data_sources, data_confidence fields
- Updated Company and ComponentRow types

Fixes FNF-244
```

## FMP API (Financial Modeling Prep)

A **paid FMP API key** is stored in `.env` as `FMP_API_KEY`. Use the lookup script to fetch company data:

```bash
npx tsx scripts/fmp-lookup.ts search "Hitachi"     # Search for companies
npx tsx scripts/fmp-lookup.ts profile HTHIY        # Get company profile
npx tsx scripts/fmp-lookup.ts ratings AAPL         # Get financial ratings with raw values
```

The ratings command fetches:
- Ratings snapshot (scores 1-5)
- Key metrics (ROE, ROA, D/E, P/E, P/B ratios)
- DCF intrinsic value

Output is formatted for direct copy-paste into company data files.
