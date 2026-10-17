import { TurnoverData } from "./types";

/**
 * Demo data: one merged log. In live mode the API builds this same shape from every
 * published row (see mergeTurnoverRows) — the dashboard only ever sees one report.
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
