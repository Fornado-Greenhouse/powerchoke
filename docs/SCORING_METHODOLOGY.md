# Scoring Methodology

This document defines the scoring rubrics used in powerchoke to evaluate grid infrastructure companies and their supply chain exposure.

## Overview

powerchoke uses three derived metrics to rank companies:

| Metric | Name | Description |
|--------|------|-------------|
| **BES** | Bottleneck Exposure Score | How exposed a company is to supply chain bottlenecks |
| **TBI** | Total Bottleneck Index | Combined score factoring in pricing power and backlog |
| **WeightedTBI** | Weighted TBI | TBI weighted by purity score (how "pure play" the company is) |

### Formula

```
BES = Σ(exposure × severity × monopoly_bonus) / count / 4
TBI = 0.5 × BES + 0.3 × pricing_power + 0.2 × backlog_strength
WeightedTBI = TBI × purity_score
```

Where `monopoly_bonus = 1.3` for monopoly market structures, `1.0` otherwise.

---

## Exposure Score (1-5)

The exposure score measures a company's revenue dependency on a specific grid infrastructure component.

| Score | Level | Definition | Revenue Dependency | Example |
|-------|-------|------------|-------------------|---------|
| **5** | Core | Core business, dominant market position | >40% of segment revenue | Hitachi in LPT, Reinhausen in tap changers |
| **4** | Major | Major revenue contributor | 20-40% of segment revenue | GE Vernova in HVDC converters |
| **3** | Meaningful | Meaningful exposure | 10-20% of segment revenue | ABB in distribution transformers |
| **2** | Minor | Minor exposure | 5-10% of segment revenue | Diversified conglomerate with small grid unit |
| **1** | Tangential | Tangential or emerging | <5% of segment revenue | Company entering the space |

### How Exposure is Determined

1. **Primary source**: Company 10-K/Annual Report segment disclosures
2. **Secondary sources**: Earnings call commentary, investor presentations
3. **Triangulation**: Industry reports (T&D World, Power Engineering), analyst estimates

### Example: Hitachi Ltd

```typescript
exposure: { 'c1': 5, 'c7': 5, 'c4': 5, 'c10': 4, 'c2': 4 }
```

- **c1 (LPT): 5** - Hitachi Energy is #2 globally in large power transformers
- **c7 (HVDC): 5** - Top-3 global position in HVDC systems
- **c4 (HV Breakers): 5** - Major switchgear business via Hitachi Energy
- **c10 (Substation Integration): 4** - Strong but not dominant
- **c2 (Medium Transformers): 4** - Meaningful but smaller than LPT

---

## Purity Score (0-1)

The purity score measures how "pure play" a company is on grid infrastructure.

### Formula

```
purity_score = grid_revenue / total_revenue
```

Where `grid_revenue` includes:
- Power transformers (all voltage classes)
- Switchgear and circuit breakers
- HVDC and FACTS equipment
- Grid protection and control systems
- Transmission EPC services
- Grid software (SCADA, EMS, monitoring)

### Score Interpretation

| Range | Classification | Example |
|-------|---------------|---------|
| **0.9-1.0** | Pure play | GE Vernova (0.95), Hyundai Electric (0.95) |
| **0.7-0.9** | Focused | Quanta Services (0.90), Siemens Energy (0.80) |
| **0.5-0.7** | Mixed | ABB (0.60), Mitsubishi Electric (0.50) |
| **0.3-0.5** | Diversified | Hitachi (0.30), Toshiba (0.40) |
| **<0.3** | Conglomerate | ArcelorMittal (0.20), thyssenkrupp (0.20) |

### Data Sources

- **Primary**: 10-K segment reporting, geographic revenue breakdowns
- **Secondary**: Management commentary on "grid" or "electrification" revenue
- **Estimation**: When segments don't align perfectly, use revenue bridge analysis

---

## Pricing Power (1-5)

The pricing power score measures a company's ability to pass through costs and maintain/expand margins.

| Score | Level | Indicators |
|-------|-------|------------|
| **5** | Very Strong | Monopoly/duopoly position, multi-year backlogs, pricing escalators in contracts, margin expansion |
| **4** | Strong | Oligopoly position, 12+ month backlogs, consistent price increases accepted by customers |
| **3** | Moderate | Competitive market but differentiated product, can hold margins |
| **2** | Weak | Commodity product, price taker, margin pressure from competition |
| **1** | Very Weak | Highly commoditized, imports/substitutes available, margin compression |

### Assessment Factors

1. **Market structure**: Monopoly > Duopoly > Oligopoly > Fragmented
2. **Backlog commentary**: "Pricing actions" or "margin improvement" language
3. **Margin trends**: Gross margin expansion/stability over 3 years
4. **Customer concentration**: High = less power, diversified = more power

### Example Assessment: Quanta Services

- **Score: 5** (Very Strong)
- **Rationale**:
  - Record $30B+ backlog provides multi-year visibility
  - Labor shortage gives contractors pricing power
  - Earnings calls cite "improved pricing" and "margin expansion"
  - Book-to-bill consistently >1.0x
- **Sources**: Quanta 10-K 2024, Q3 2024 earnings call

---

## Backlog Strength (1-5)

The backlog strength score measures order visibility and demand sustainability.

| Score | Level | Book-to-Bill | Backlog Coverage | Characteristics |
|-------|-------|--------------|------------------|-----------------|
| **5** | Very Strong | >1.2x | >2 years | Record backlogs, growing orders, multi-year projects |
| **4** | Strong | 1.0-1.2x | 1-2 years | Solid pipeline, steady order intake |
| **3** | Moderate | 0.9-1.0x | 6-12 months | Stable but not growing |
| **2** | Weak | 0.7-0.9x | 3-6 months | Declining orders, short visibility |
| **1** | Very Weak | <0.7x | <3 months | Order cancellations, project delays |

### Data Sources

1. **Primary**: Quarterly earnings reports (backlog figures)
2. **Secondary**: Investor day presentations, management guidance
3. **Qualitative**: Earnings call tone on "pipeline" and "opportunities"

---

## Bottleneck Severity (1-5)

Applied to **components** (not companies). Measures supply constraint severity.

| Score | Level | Lead Time | Capacity | Characteristics |
|-------|-------|-----------|----------|-----------------|
| **5** | Critical | >24 months | <80% available | Single/dual source, patent protection, capital-intensive expansion |
| **4** | Severe | 12-24 months | 80-90% available | Few suppliers, specialized manufacturing, certification barriers |
| **3** | Moderate | 6-12 months | 90-95% available | Several qualified suppliers, some regional constraints |
| **2** | Mild | 3-6 months | 95-99% available | Multiple suppliers, standard specifications |
| **1** | Low | <3 months | Abundant | Commodity product, many suppliers, easy substitution |

### Current Severity Assessments

| Component | Severity | Rationale |
|-----------|----------|-----------|
| Large Power Transformers | 5 | 24-36 month lead times, 3 major suppliers, capacity maxed |
| HVDC Converters | 4 | 18-24 months, requires IGBT modules (duopoly) |
| GOES | 4 | Few mills, capacity expansion takes 3+ years |
| Distribution Transformers | 3 | More suppliers but amorphous core bottleneck |
| Towers & Poles | 3 | Steel availability, galvanizing capacity constraints |

---

## Data Provenance

Every company and component record includes provenance metadata:

```typescript
interface Provenance {
  data_updated: string;      // ISO date: "2024-12-01"
  data_sources: string[];    // e.g., ["10-K 2024", "Bloomberg", "T&D World"]
  data_confidence: 'high' | 'medium' | 'low';
}
```

### Confidence Levels

| Level | Definition | Typical Sources |
|-------|------------|-----------------|
| **high** | Direct disclosure, audited financials | 10-K, Annual Report, official filings |
| **medium** | Derived from public sources, management commentary | Earnings calls, investor presentations, industry reports |
| **low** | Estimated, industry knowledge, third-party data | Analyst estimates, news articles, expert interviews |

### Update Cadence

- **Quarterly**: Backlog, pricing power (after earnings)
- **Annually**: Exposure scores, purity scores (after 10-K)
- **As-needed**: New companies, M&A activity, market structure changes

---

## Example: Fully Documented Company

```typescript
{
  id: 'co_ge',
  name: 'GE Vernova',
  ticker: 'GEV',
  region: 'NA',
  type: 'TIER_1_OEM',
  universe: 'INVESTABLE',

  // Scores with methodology
  purity_score: 0.95,        // Grid segment = 95% of revenue per 10-K
  backlog_strength: 5,       // Record $44B backlog, book-to-bill 1.2x (Q3 2024)
  pricing_power: 4,          // "Improved pricing across segments" - Q3 call

  exposure: {
    'c1': 5,   // LPT: Top-3 global, highlighted in Grid segment
    'c4': 5,   // HV Breakers: Major switchgear business
    'c7': 4,   // HVDC: Growing but behind Hitachi/Siemens
    'c10': 4   // Substation: Strong integration services
  },

  // Market data
  market_cap_usd: 91.2,
  revenue_ttm_usd: 34.9,
  grid_revenue_pct: 95,

  // Provenance
  data_updated: '2024-12-01',
  data_sources: ['GE Vernova 10-K 2024', 'Earnings Q3 2024'],
  data_confidence: 'high'
}
```

---

## Maintaining Consistency

When adding new companies or updating scores:

1. **Use this rubric** - Don't assign scores without referencing definitions
2. **Cite sources** - Every score change should reference a source
3. **Date updates** - Always update `data_updated` field
4. **Cross-reference** - Compare to similar companies for consistency
5. **Document rationale** - Add notes for non-obvious assessments

### Review Checklist

- [ ] Exposure scores align with segment revenue disclosures
- [ ] Purity score matches grid_revenue_pct calculation
- [ ] Pricing power reflects recent earnings commentary
- [ ] Backlog strength matches latest quarterly figures
- [ ] All sources are cited and dated
- [ ] Confidence level is appropriate for source quality
