import { ScorecardCdr, ScorecardWeek } from "./types";
import { TEAM_LEADS } from "./turnoverUtils";

export interface LeadStats {
  lead: string;
  team: string | undefined;
  cdrs: number;
  reviewed: number;
  notReviewed: number;
  upToDate: number;
  outdated: number;
  /** Share of the lead's CDRs with at least one review logged. */
  coveragePct: number;
  upToDatePct: number;
  totalCalls: number;
  /** Reviews logged in the most recent full week (null when the report has fewer than two weeks). */
  lastFullWeekCalls: number | null;
  /** Average reviews per week over every full week in the report. */
  avgPerWeek: number | null;
}

const TEAM_BY_LEAD: Record<string, string> = Object.fromEntries(
  Object.entries(TEAM_LEADS).map(([team, lead]) => [lead, team])
);

export function teamOfLead(lead: string): string | undefined {
  return TEAM_BY_LEAD[lead];
}

/** Per team lead stats, ordered by coverage (then up-to-date share, then total reviews). */
export function leadStats(cdrs: ScorecardCdr[], weeks: ScorecardWeek[]): LeadStats[] {
  const fullWeeks = weeks.slice(0, -1);
  const leads = Array.from(new Set(cdrs.map((c) => c.teamLead)));
  const stats = leads.map((lead) => {
    const mine = cdrs.filter((c) => c.teamLead === lead);
    const reviewed = mine.filter((c) => c.callsReviewed > 0).length;
    const upToDate = mine.filter((c) => c.status === "Up to date").length;
    const callsIn = (w: ScorecardWeek) => w.byLead.find((b) => b.teamLead === lead)?.calls ?? 0;
    const weekCalls = fullWeeks.map(callsIn);
    return {
      lead,
      team: teamOfLead(lead),
      cdrs: mine.length,
      reviewed,
      notReviewed: mine.filter((c) => c.status === "Not reviewed").length,
      upToDate,
      outdated: mine.filter((c) => c.status === "Outdated").length,
      coveragePct: mine.length ? (reviewed / mine.length) * 100 : 0,
      upToDatePct: mine.length ? (upToDate / mine.length) * 100 : 0,
      totalCalls: mine.reduce((sum, c) => sum + c.callsReviewed, 0),
      lastFullWeekCalls: fullWeeks.length ? weekCalls[weekCalls.length - 1] : null,
      avgPerWeek: fullWeeks.length ? weekCalls.reduce((a, b) => a + b, 0) / fullWeeks.length : null,
    };
  });
  return stats.sort(
    (a, b) => b.coveragePct - a.coveragePct || b.upToDatePct - a.upToDatePct || b.totalCalls - a.totalCalls
  );
}
