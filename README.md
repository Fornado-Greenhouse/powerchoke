# powerchoke

Grid infrastructure bottleneck analysis tool for identifying supply chain chokepoints in the power grid sector.

## Overview

powerchoke models a **20-component grid infrastructure matrix** to help investors identify:
- **Hidden monopolies**: Niche suppliers with outsized pricing power
- **Supply chain bottlenecks**: Components with severe lead time and capacity constraints
- **Pure-play opportunities**: Companies with concentrated grid infrastructure exposure

## Quick Start

```bash
npm install
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

### Linear issue lookup (no MCP required)

If the MCP Linear tool isn't available, you can still fetch an issue's metadata (identifier, title, state, gitBranchName) directly from Linear's REST API:

```bash
export LINEAR_API_KEY="<your_linear_api_key>"
npm run linear:issue FNF-260
```

The script uses `LINEAR_API_KEY` from your environment or `.env` file and prints the branch name to create for the issue.

## Architecture

### Core Domain Model

- **Components** (`src/data/components.ts`): 20 critical grid infrastructure categories
- **Companies** (`src/data/companies.ts`): Companies with exposure ratings to each component
- **Sub-components**: Hidden monopolies within each component category

### Scoring Engine

Three key metrics calculated in `src/lib/scoring.ts`:

| Metric | Description |
|--------|-------------|
| **BES** | Bottleneck Exposure Score - weighted exposure to constrained components |
| **TBI** | Total Bottleneck Index - combined score with pricing power and backlog |
| **WeightedTBI** | TBI adjusted by purity score (pure-play premium) |

### Data Provenance

All company and component data includes:
- `data_updated`: Last validation date
- `data_sources`: Source citations (10-K, earnings calls, industry reports)
- `data_confidence`: high / medium / low

## Documentation

- **[Scoring Methodology](docs/SCORING_METHODOLOGY.md)**: Detailed rubrics for all scores
  - Exposure Score (1-5) definitions and examples
  - Purity Score calculation methodology
  - Pricing Power and Backlog Strength assessment criteria
  - Data provenance standards

## Tech Stack

- **Next.js 16** with Turbopack
- **React Compiler** (automatic memoization)
- **TypeScript** with strict mode
- **Tailwind CSS** for styling
- **Recharts** for visualizations

## Project Structure

```
src/
├── components/           # React components
│   ├── Powerchoke.tsx   # Main orchestrator
│   └── views/           # Tab-based views
├── data/                # Static data layer
│   ├── types.ts         # TypeScript interfaces
│   ├── companies.ts     # Company roster with exposures
│   └── components.ts    # 20-component matrix
└── lib/
    └── scoring.ts       # Scoring engine

docs/
└── SCORING_METHODOLOGY.md  # Scoring rubrics and provenance standards
```

## License

Private - Fornado Greenhouse
