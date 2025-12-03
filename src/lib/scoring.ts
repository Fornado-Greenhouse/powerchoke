import { Company, ComponentRow, Scenario, ScoredCompany } from '@/data';

/**
 * Scoring engine for the Grid Bottleneck model.
 *
 * Calculates three key metrics:
 * - BES (Bottleneck Exposure Score): How exposed a company is to supply chain bottlenecks
 * - TBI (Total Bottleneck Index): Combined score factoring in pricing power and backlog
 * - WeightedTBI: TBI weighted by purity score (how "pure play" the company is)
 */
export function calculateScores(
  company: Company,
  components: ComponentRow[],
  scenario: Scenario
): ScoredCompany {
  let totalScore = 0;
  let count = 0;

  Object.entries(company.exposure).forEach(([compId, strength]) => {
    const component = components.find((c) => c.id === compId);
    if (component) {
      const severity = component.bottleneck_severity * scenario.multipliers.severity_weight;
      // Bonus for monopoly positions
      const monopolyBonus = component.market_structure.includes('Monopoly') ? 1.3 : 1.0;
      totalScore += strength * severity * monopolyBonus;
      count++;
    }
  });

  const bes = count === 0 ? 0 : Math.min(5, Math.max(1, totalScore / count / 4));

  const tbi = 0.5 * bes + 0.3 * company.pricing_power + 0.2 * company.backlog_strength;
  const weightedTBI = tbi * company.purity_score;

  return {
    ...company,
    scores: {
      BES: Number(bes.toFixed(2)),
      TBI: Number(tbi.toFixed(2)),
      WeightedTBI: Number(weightedTBI.toFixed(2)),
    },
  };
}

/**
 * Score all companies and sort by TBI descending.
 */
export function scoreAndRankCompanies(
  companies: Company[],
  components: ComponentRow[],
  scenario: Scenario
): ScoredCompany[] {
  return companies
    .map((c) => calculateScores(c, components, scenario))
    .sort((a, b) => b.scores.TBI - a.scores.TBI);
}
