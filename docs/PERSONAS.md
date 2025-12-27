# User Personas

This document defines the five primary personas for powerchoke. These personas were developed through a committee review process (December 2025) to validate product priorities and identify feature gaps.

> **For developers**: Typed persona data is available at `src/data/personas.ts` for programmatic use.
> **For AI assistants**: A summary is included in `CLAUDE.md` for development context.

---

## Overview

| Persona | Role | Organization | Primary Use Case |
|---------|------|--------------|------------------|
| **Sarah** | Portfolio Manager | $500M clean energy fund | Portfolio monitoring, new ideas |
| **Marcus** | Equity Research Analyst | Sell-side investment bank | Building defensible analysis |
| **Chen** | Independent Investor | Self / Fintwit | Quick lookups, sharing insights |
| **Elena** | Supply Chain Consultant | Industrial advisory firm | Component risk assessment |
| **David** | CIO | $50M family office | Watchlist tracking, alternatives |

---

## Sarah Chen
### Portfolio Manager, Clean Energy Fund

**Demographics**
- Age: 38
- Location: Boston, MA
- Experience: 12 years in asset management

**Organization**
- $500M AUM clean energy / energy transition fund
- Team of 4 analysts
- Quarterly investor letters, annual LP meetings

**Goals**
- Monitor 20+ grid infrastructure holdings efficiently
- Find new investment ideas before they're consensus
- Understand supply chain risks that could impact portfolio

**Jobs To Be Done**
1. "When I open powerchoke, I want to see what's changed since my last visit so I can prioritize my research time."
2. "When I'm comparing two potential investments, I want to see them side-by-side so I can make a defensible decision for our IC."
3. "When I'm preparing for an earnings call, I want to quickly pull up a company's exposure profile so I can ask informed questions."

**Pain Points**
- Tracking 20+ companies across multiple data sources is time-consuming
- Hard to compare companies on supply chain dimensions (existing tools focus on financials)
- Need to justify investment decisions to LP with data

**Feature Priorities**
| Priority | Feature | Why |
|----------|---------|-----|
| Critical | Side-by-side comparison (FNF-254) | "I compare GEV vs ETN weekly" |
| Critical | Watchlist (FNF-258) | "I need to track my holdings" |
| High | What's New dashboard (FNF-271) | "Show me what changed since last week" |
| Medium | CSV export (FNF-255) | "For portfolio integration" |

**Quote**
> "I don't have time to dig through 10-Ks for every company. Give me the supply chain exposure in one view."

---

## Marcus Thompson
### Equity Research Analyst, Sell-Side Bank

**Demographics**
- Age: 29
- Location: New York, NY
- Experience: 5 years in equity research

**Organization**
- Top-10 investment bank, Industrials coverage
- Publishes research notes, initiates coverage
- Clients are institutional buy-side (like Sarah)

**Goals**
- Build differentiated, defensible research
- Understand supply chain dynamics that others miss
- Create models with accurate input data

**Jobs To Be Done**
1. "When I'm initiating coverage on a company, I want to understand its supply chain position so I can identify risks and advantages others miss."
2. "When I'm writing a research note, I want to export data into my model so I don't waste time on manual data entry."
3. "When I present to clients, I want to cite my sources so my analysis is credible."

**Pain Points**
- Building supply chain maps manually is tedious and error-prone
- Hard to find reliable data on component-level exposure
- Needs everything in Excel for modeling

**Feature Priorities**
| Priority | Feature | Why |
|----------|---------|-----|
| Critical | CSV export (FNF-255) | "Non-negotiable. I live in Excel." |
| Critical | Side-by-side comparison (FNF-254) | "Table stakes for equity research" |
| High | Print/PDF export (FNF-273) | "I need to drop this into a research report" |
| High | Methodology docs | "Need to cite sources" |

**Quote**
> "If I can't export it to Excel and cite the source, it doesn't exist for my purposes."

---

## Chen Wei
### Independent Investor / Fintwit Influencer

**Demographics**
- Age: 34
- Location: Austin, TX (remote)
- Experience: 8 years self-directed investing

**Organization**
- Personal portfolio (~$2M)
- 50K Twitter/X followers, writes Substack newsletter
- Known for deep-dives on energy transition plays

**Goals**
- Find under-the-radar investment opportunities
- Create shareable content for audience
- Quick lookups while researching or on-the-go

**Jobs To Be Done**
1. "When I'm researching a company on my phone, I want to quickly see its bottleneck exposure so I can decide if it's worth a deeper dive."
2. "When I'm writing a thread, I want to share a specific view so my followers can see exactly what I'm talking about."
3. "When I find an interesting company, I want to save it to my watchlist so I can track it over time."

**Pain Points**
- Most financial tools are desktop-only or have clunky mobile experiences
- Can't share specific views with followers (links don't preserve state)
- Wants to appear data-driven but doesn't have Bloomberg terminal access

**Feature Priorities**
| Priority | Feature | Why |
|----------|---------|-----|
| Critical | Mobile responsive (FNF-260) | Done - "I research on my phone" |
| Critical | URL persistence (FNF-256) | "I can't share specific views" |
| High | Watchlist (FNF-258) | "Track my positions" |
| Medium | Cmd+K search (FNF-252) | Done - "Quick lookups" |

**Quote**
> "If I can't share it with a link, my followers will never see it."

---

## Elena Rodriguez
### Supply Chain Risk Consultant

**Demographics**
- Age: 45
- Location: Chicago, IL
- Experience: 20 years in supply chain / operations

**Organization**
- Boutique advisory firm specializing in industrial supply chain
- Clients: utilities, grid operators, industrial manufacturers
- Engagements: risk assessments, supplier audits, contingency planning

**Goals**
- Identify single-source dependencies for clients
- Assess supplier concentration risk
- Recommend mitigation strategies

**Jobs To Be Done**
1. "When I'm assessing a client's supply chain, I want to see which components have monopoly suppliers so I can flag risks."
2. "When I'm comparing supplier options, I want to filter by region and capability so I can find alternatives."
3. "When I'm stress-testing a scenario, I want to adjust severity weights so I can model different disruption scenarios."

**Pain Points**
- Sub-component supplier data is hard to find (hidden monopolies)
- Need to filter by geography (e.g., "show me all Japanese transformer suppliers")
- Clients ask "what if" questions that require scenario modeling

**Feature Priorities**
| Priority | Feature | Why |
|----------|---------|-----|
| Critical | Sub-components data (FNF-245) | Done - "This is the hidden monopoly data" |
| High | Advanced filters (FNF-272) | "Show me all Japanese suppliers" |
| High | Side-by-side comparison (FNF-254) | "Compare supplier risk" |
| Medium | Scenario modeling (FNF-257) | "Stress test different disruptions" |

**Quote**
> "The sub-component data is the real value. That's where the hidden monopolies live."

---

## David Park
### CIO, Family Office

**Demographics**
- Age: 52
- Location: San Francisco, CA
- Experience: 25 years in finance, 10 years running family office

**Organization**
- $50M single-family office
- Thematic allocation to power grid / energy transition
- Long-term holder, low turnover

**Goals**
- Monitor existing positions efficiently
- Find similar companies when adding to theme
- Understand what's happening across the portfolio

**Jobs To Be Done**
1. "When I log in, I want to see if any of my 15 holdings had rating changes so I can investigate."
2. "When I'm looking to add exposure, I want to find companies similar to my current winners so I can diversify within theme."
3. "When my advisors ask for an update, I want to export a summary so I can brief them quickly."

**Pain Points**
- Too many positions to track manually
- Hard to find "similar" companies without deep research
- Needs simple, clear outputs for non-technical advisors

**Feature Priorities**
| Priority | Feature | Why |
|----------|---------|-----|
| Critical | Watchlist (FNF-258) | "I need to track my 15 holdings" |
| High | What's New dashboard (FNF-271) | "Did any of my holdings change?" |
| High | Similar companies (FNF-259) | "Find alternatives and diversification" |
| Medium | CSV export (FNF-255) | "For my own models" |

**Quote**
> "I'm not a day trader. I just need to know when something important changes."

---

## Persona Usage Guidelines

### For Product Decisions

When evaluating a feature, ask:
1. Which persona(s) does this serve?
2. What job-to-be-done does it address?
3. Is it critical/high/medium priority for that persona?

A feature should serve at least 2 personas OR be critical for 1 persona to be prioritized.

### For Development

When implementing a feature:
1. Consider the persona's context (mobile vs desktop, time-constrained vs deep-dive)
2. Use their language in UI copy
3. Test against their jobs-to-be-done

### For Design

When designing interfaces:
1. Sarah and Marcus need power-user features (keyboard shortcuts, bulk actions)
2. Chen needs mobile-first, shareable views
3. Elena needs filtering and scenario tools
4. David needs dashboard/summary views

---

## Revision History

| Date | Change | Author |
|------|--------|--------|
| 2025-12-26 | Initial personas from committee review | Claude + Alex |
