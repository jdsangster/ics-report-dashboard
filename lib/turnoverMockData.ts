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
      periodLabel: "08/24 – 10/01",
    },
    events: [
      {
        cdr: "Katheryn Parada",
        team: "Lightyear",
        outcome: "Promoted to Support Specialist",
        date: "2026-10-01",
        startDate: "2026-05-05",
      },
      {
        cdr: "Camila Abran",
        team: "Academia",
        outcome: "Quit",
        date: "2026-09-30",
        startDate: "2026-08-31",
        note: "Personal family issues",
        reasonCategory: "Personal family issues",
      },
      {
        cdr: "Valentina Mantegazza",
        team: "The Booking Machines",
        outcome: "Promoted to TL",
        date: "2026-08-24",
      },
      {
        cdr: "Noraly Camargo",
        team: "Titans",
        outcome: "Offboarded",
        date: "2026-09-18",
        startDate: "2026-06-09",
        note: "Bad performance",
        reasonCategory: "Bad performance",
      },
      {
        cdr: "Marcio Oliveira",
        team: "Lightyear",
        outcome: "Promoted to CL",
        date: "2026-09-18",
        startDate: "2026-05-27",
      },
    ],
  },
];

export function getTurnoverReportById(id: string): TurnoverData | undefined {
  return mockTurnoverReports.find((r) => r.id === id);
}
