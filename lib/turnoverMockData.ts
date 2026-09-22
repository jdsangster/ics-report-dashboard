import { TurnoverData } from "./types";

/**
 * A single cumulative log, same pattern as caseReviewMockData.ts — each publish
 * sends the full current event list (there's no stable per-row ID from the
 * source), so the "latest row wins" and simply replaces what the dashboard shows.
 */
export const mockTurnoverReports: TurnoverData[] = [
  {
    id: "cdr-turnover-log",
    metadata: {
      reportType: "CDR Turnover Report",
      cadence: "Daily",
      periodLabel: "09/18 – 09/18",
    },
    events: [
      {
        cdr: "Noraly Camargo",
        team: "Titans",
        outcome: "Offboarded",
        date: "2026-09-18",
        startDate: "2026-06-09",
      },
      {
        cdr: "Marcio Oliveira",
        team: "Lightyear",
        outcome: "Promoted to CL",
        date: "2026-09-18",
        startDate: "2026-05-27",
      },
      {
        cdr: "Valentina Franco",
        team: "Lightyear",
        outcome: "Promoted to CL",
        date: "2026-09-18",
        startDate: "2026-06-16",
      },
    ],
  },
];

export function getTurnoverReportById(id: string): TurnoverData | undefined {
  return mockTurnoverReports.find((r) => r.id === id);
}
