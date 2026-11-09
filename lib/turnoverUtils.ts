import { TurnoverEvent } from "./types";

/** Calendar quarter key for an ISO date, e.g. "2026-08-14" -> "2026-Q3". */
export function quarterKey(date: string): string {
  const [year, month] = date.split("-").map(Number);
  return `${year}-Q${Math.floor((month - 1) / 3) + 1}`;
}

/** "2026-Q3" -> "Q3 2026". */
export function quarterLabel(key: string): string {
  const [year, q] = key.split("-");
  return `${q} ${year}`;
}

/** "2026-Q3" -> "Jul 1 – Sep 30". */
export function quarterRange(key: string): string {
  const [year, q] = key.split("-");
  const startMonth = (Number(q.slice(1)) - 1) * 3;
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(new Date(Number(year), startMonth, 1))} – ${fmt(new Date(Number(year), startMonth + 3, 0))}`;
}

/** Short grouping label for an exit reason: the explicit category, else the note. */
export function reasonOf(e: TurnoverEvent): string | undefined {
  return e.reasonCategory ?? e.note;
}

/** Monthly goals set by leadership, applied from `effectiveFrom` ("YYYY-MM") onward. Exits = Offboarded + Quit. */
export const MONTHLY_GOALS = { promotions: 6, exits: 3, effectiveFrom: "2026-10" } as const;

export function currentMonthKey(now: Date = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function monthCounts(events: TurnoverEvent[], monthKey: string): { promotions: number; exits: number } {
  let promotions = 0;
  let exits = 0;
  for (const e of events) {
    if (e.date.slice(0, 7) !== monthKey) continue;
    if (e.outcome === "Offboarded" || e.outcome === "Quit") exits += 1;
    else if (e.outcome.startsWith("Promoted to ")) promotions += 1;
  }
  return { promotions, exits };
}

/** Months of a quarter ("2026-Q4") that count toward the goals, up to `uptoMonth` ("YYYY-MM"). */
export function goalMonthsInQuarter(key: string, uptoMonth: string): string[] {
  const [year, q] = key.split("-");
  const first = (Number(q.slice(1)) - 1) * 3 + 1;
  return [0, 1, 2]
    .map((i) => `${year}-${String(first + i).padStart(2, "0")}`)
    .filter((m) => m >= MONTHLY_GOALS.effectiveFrom && m <= uptoMonth);
}

export function monthName(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/** Team lead per turnover team (Team 1-4 in the roster sheet), as of today. */
export const TEAM_LEADS: Record<string, string> = {
  Titans: "Angelo",
  "The Booking Machines": "Valentina",
  Lightyear: "Mairenis",
  Academia: "Martin",
};

/** Earlier leads, used for events dated before `until` (exclusive). Valentina took over Ruth's team on 2026-08-24. */
const PAST_TEAM_LEADS: Record<string, { lead: string; until: string }[]> = {
  "The Booking Machines": [{ lead: "Ruth", until: "2026-08-24" }],
};

/** Team lead of `team` on the given ISO date. */
export function teamLeadOn(team: string, date: string): string | undefined {
  const past = PAST_TEAM_LEADS[team]?.find((p) => date < p.until);
  return past ? past.lead : TEAM_LEADS[team];
}

/** CDR -> CL promotions only ("Promoted to CL", "Promoted to CL Onboarding"); other roles don't count. */
export function isCLPromotion(e: TurnoverEvent): boolean {
  return e.outcome.startsWith("Promoted to CL");
}
