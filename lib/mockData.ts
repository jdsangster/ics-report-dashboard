import { ReportData } from "./types";

export const mockReports: ReportData[] = [
  {
    id: "weekly-w5",
    metadata: {
      reportType: "Power BI ICS Report",
      cadence: "Weekly",
      periodLabel: "07/27 – 08/02",
      filename: "Power BI ICS Report (07/27 – 08/02).docx",
    },
    summary: {
      totalLabel: "Weekly Total",
      currentValue: 1285,
      previousValue: 1543,
      diffText: "-258 IC (-16.7%)",
      status: "decline",
    },
    outstandingPerformers: [
      { cdr: "Lucia Tellez", team: "Team Angelo", totalIC: 60, workedDays: 5, avgDay: 12.0 },
    ],
    comparisonTable: [
      { cdr: "Marialys Ramirez", team: "Team Mairenis", prevAvg: 5.6, currentAvg: 9.8, diff: "+4.2", badge: "🔺" },
      { cdr: "Valentina Mateluna", team: "Team Ruth", prevAvg: 6.4, currentAvg: 7.8, diff: "+1.4", badge: "🔺" },
      { cdr: "Ianis Gavriz", team: "Team Angelo", prevAvg: 7.8, currentAvg: 7.8, diff: "0.0", badge: "➖" },
      { cdr: "Lucia Tellez", team: "Team Angelo", prevAvg: 10.6, currentAvg: 12.0, diff: "+1.4", badge: "🔺" },
      { cdr: "Alejandro Portillo", team: "Team Angelo", prevAvg: 13.8, currentAvg: 8.6, diff: "-5.2", badge: "🔻" },
      { cdr: "Salome Gutierrez", team: "Team Mairenis", prevAvg: 11.0, currentAvg: 5.8, diff: "-5.2", badge: "🔻" },
      { cdr: "Martin Ovalle", team: "Team Martin", prevAvg: 3.2, currentAvg: 2.4, diff: "-0.8", badge: "🔻" },
      { cdr: "Ruth Delgado", team: "Team Ruth", prevAvg: 9.1, currentAvg: 8.9, diff: "-0.2", badge: "🔻" },
    ],
    teamTotals: [
      { team: "Team Angelo", total: 493 },
      { team: "Team Ruth", total: 393 },
      { team: "Team Mairenis", total: 387 },
      { team: "Team Martin", total: 12 },
    ],
    highlights: {
      mostImproved: ["Marialys Ramirez 🔺+4.2", "Valentina Mateluna 🔺+1.4"],
      biggestDeclines: ["Alejandro Portillo 🔻-5.2", "Salome Gutierrez 🔻-5.2"],
      observations: [
        "Company total fell sharply to 1,285 IC (-16.7%), the steepest weekly drop of the period.",
        "Only one contributor (Lucia Tellez, 12.0 avg) hit the Outstanding threshold this week.",
        "Team Martin remains critically understaffed at 12 total IC — needs immediate coverage review.",
        "Alejandro Portillo and Salome Gutierrez both posted the largest single-agent declines (-5.2 avg).",
      ],
    },
    organizationalChanges: [
      { contributor: "Joshua Schmitz", icGenerated: 34, status: "Confirmed promoted (excluded from team totals)" },
      { contributor: "Santiago Peralta", icGenerated: 21, status: "Confirmed resigned (excluded from team totals)" },
    ],
    conclusion:
      "The operation closed Week 5 with 1,285 IC, a 16.7% decline from Week 4. The drop was broad-based across teams, with Team Angelo the only group holding above 450 IC. Leadership should prioritize a check-in with Alejandro Portillo and Salome Gutierrez, and evaluate staffing on Team Martin before Week 6.",
  },
  {
    id: "weekly-w4",
    metadata: {
      reportType: "Power BI ICS Report",
      cadence: "Weekly",
      periodLabel: "07/20 – 07/26",
      filename: "Power BI ICS Report (07/20 – 07/26).docx",
    },
    summary: {
      totalLabel: "Weekly Total",
      currentValue: 1543,
      previousValue: 1489,
      diffText: "+54 IC (+3.6%)",
      status: "growth",
    },
    outstandingPerformers: [
      { cdr: "Lucia Tellez", team: "Team Angelo", totalIC: 53, workedDays: 5, avgDay: 10.6 },
      { cdr: "Alejandro Portillo", team: "Team Angelo", totalIC: 69, workedDays: 5, avgDay: 13.8 },
    ],
    comparisonTable: [
      { cdr: "Alejandro Portillo", team: "Team Angelo", prevAvg: 9.9, currentAvg: 13.8, diff: "+3.9", badge: "🔺" },
      { cdr: "Lucia Tellez", team: "Team Angelo", prevAvg: 9.0, currentAvg: 10.6, diff: "+1.6", badge: "🔺" },
      { cdr: "Ianis Gavriz", team: "Team Angelo", prevAvg: 7.5, currentAvg: 7.8, diff: "+0.3", badge: "🔺" },
      { cdr: "Salome Gutierrez", team: "Team Mairenis", prevAvg: 10.2, currentAvg: 11.0, diff: "+0.8", badge: "🔺" },
      { cdr: "Marialys Ramirez", team: "Team Mairenis", prevAvg: 6.0, currentAvg: 5.6, diff: "-0.4", badge: "🔻" },
      { cdr: "Valentina Mateluna", team: "Team Ruth", prevAvg: 6.9, currentAvg: 6.4, diff: "-0.5", badge: "🔻" },
      { cdr: "Ruth Delgado", team: "Team Ruth", prevAvg: 9.1, currentAvg: 9.1, diff: "0.0", badge: "➖" },
    ],
    teamTotals: [
      { team: "Team Angelo", total: 561 },
      { team: "Team Mairenis", total: 448 },
      { team: "Team Ruth", total: 402 },
      { team: "Team Martin", total: 132 },
    ],
    highlights: {
      mostImproved: ["Alejandro Portillo 🔺+3.9", "Lucia Tellez 🔺+1.6"],
      biggestDeclines: ["Valentina Mateluna 🔻-0.5", "Marialys Ramirez 🔻-0.4"],
      observations: [
        "Company total rebounded to 1,543 IC (+3.6%), the strongest week of the month.",
        "Two contributors hit the Outstanding threshold — Alejandro Portillo (13.8 avg) and Lucia Tellez (10.6 avg).",
        "Team Angelo led all teams for the third consecutive week at 561 total IC.",
      ],
    },
    conclusion:
      "Week 4 delivered a solid recovery to 1,543 IC (+3.6%), driven primarily by Team Angelo's outstanding performers. Momentum should be reinforced heading into Week 5, with attention to Team Martin's still-low volume relative to peers.",
  },
  {
    id: "weekly-w3",
    metadata: {
      reportType: "Power BI ICS Report",
      cadence: "Weekly",
      periodLabel: "07/13 – 07/19",
      filename: "Power BI ICS Report (07/13 – 07/19).docx",
    },
    summary: {
      totalLabel: "Weekly Total",
      currentValue: 1489,
      previousValue: 1402,
      diffText: "+87 IC (+6.2%)",
      status: "growth",
    },
    outstandingPerformers: [
      { cdr: "Alejandro Portillo", team: "Team Angelo", totalIC: 50, workedDays: 5, avgDay: 10.0 },
    ],
    comparisonTable: [
      { cdr: "Alejandro Portillo", team: "Team Angelo", prevAvg: 8.4, currentAvg: 10.0, diff: "+1.6", badge: "🔺" },
      { cdr: "Salome Gutierrez", team: "Team Mairenis", prevAvg: 8.9, currentAvg: 10.2, diff: "+1.3", badge: "🔺" },
      { cdr: "Lucia Tellez", team: "Team Angelo", prevAvg: 8.5, currentAvg: 9.0, diff: "+0.5", badge: "🔺" },
      { cdr: "Ianis Gavriz", team: "Team Angelo", prevAvg: 7.2, currentAvg: 7.5, diff: "+0.3", badge: "🔺" },
      { cdr: "Marialys Ramirez", team: "Team Mairenis", prevAvg: 6.3, currentAvg: 6.0, diff: "-0.3", badge: "🔻" },
    ],
    teamTotals: [
      { team: "Team Angelo", total: 520 },
      { team: "Team Ruth", total: 410 },
      { team: "Team Mairenis", total: 400 },
      { team: "Team Martin", total: 159 },
    ],
    highlights: {
      mostImproved: ["Alejandro Portillo 🔺+1.6", "Salome Gutierrez 🔺+1.3"],
      biggestDeclines: ["Marialys Ramirez 🔻-0.3"],
      observations: [
        "Company total climbed to 1,489 IC (+6.2%), the second consecutive week of growth.",
        "Alejandro Portillo hit the Outstanding threshold for the first time this cycle (10.0 avg).",
        "Team Martin posted its strongest week yet at 159 total IC.",
      ],
    },
    conclusion:
      "Week 3 continued the recovery with 1,489 IC (+6.2%), led by Team Angelo. Team Martin's uptick to 159 IC is encouraging after several flat weeks — worth watching whether it holds into Week 4.",
  },
  {
    id: "daily-0805",
    metadata: {
      reportType: "Power BI ICS Report",
      cadence: "Daily",
      periodLabel: "08/05/2026",
      filename: "Power BI ICS Report (08-05-2026).docx",
    },
    summary: {
      totalLabel: "Daily Total",
      currentValue: 214,
      previousValue: 198,
      diffText: "+16 IC (+8.1%)",
      status: "growth",
    },
    outstandingPerformers: [
      { cdr: "Alejandro Portillo", team: "Team Angelo", totalIC: 15, workedDays: 1, avgDay: 15.0 },
    ],
    comparisonTable: [
      { cdr: "Alejandro Portillo", team: "Team Angelo", prevAvg: 9.6, currentAvg: 15.0, diff: "+5.4", badge: "🔺" },
      { cdr: "Lucia Tellez", team: "Team Angelo", prevAvg: 10.8, currentAvg: 11.5, diff: "+0.7", badge: "🔺" },
      { cdr: "Marialys Ramirez", team: "Team Mairenis", prevAvg: 9.4, currentAvg: 9.4, diff: "0.0", badge: "➖" },
      { cdr: "Ianis Gavriz", team: "Team Angelo", prevAvg: 8.1, currentAvg: 7.2, diff: "-0.9", badge: "🔻" },
      { cdr: "Ruth Delgado", team: "Team Ruth", prevAvg: 9.0, currentAvg: 8.4, diff: "-0.6", badge: "🔻" },
      { cdr: "Diego Fuentes", team: "Team Ruth", prevAvg: 0, currentAvg: 6.1, diff: "New", badge: "New" },
    ],
    teamTotals: [
      { team: "Team Angelo", total: 89 },
      { team: "Team Ruth", total: 71 },
      { team: "Team Mairenis", total: 42 },
      { team: "Team Martin", total: 12 },
    ],
    highlights: {
      mostImproved: ["Alejandro Portillo 🔺+5.4", "Lucia Tellez 🔺+0.7"],
      biggestDeclines: ["Ianis Gavriz 🔻-0.9", "Ruth Delgado 🔻-0.6"],
      observations: [
        "Daily volume rose to 214 IC (+8.1%) versus the prior day, led by Team Angelo.",
        "New contributor Diego Fuentes logged his first tracked day with 6.1 IC.",
        "Alejandro Portillo posted the single best day of the week at 15.0 avg.",
      ],
    },
    conclusion:
      "Tuesday closed at 214 IC, up 8.1% day-over-day on strong individual performance from Team Angelo. Diego Fuentes' onboarding day looks promising and is worth tracking through his first full week.",
  },
  {
    id: "weekend-0802",
    metadata: {
      reportType: "Power BI ICS Report",
      cadence: "Weekend",
      periodLabel: "08/01 – 08/02",
      filename: "Power BI ICS Report (08-01 - 08-02).docx",
    },
    summary: {
      totalLabel: "Weekend Total",
      currentValue: 356,
      previousValue: 402,
      diffText: "-46 IC (-11.4%)",
      status: "decline",
    },
    outstandingPerformers: [
      { cdr: "Marialys Ramirez", team: "Team Mairenis", totalIC: 21, workedDays: 2, avgDay: 10.5 },
    ],
    comparisonTable: [
      { cdr: "Marialys Ramirez", team: "Team Mairenis", prevAvg: 7.2, currentAvg: 10.5, diff: "+3.3", badge: "🔺" },
      { cdr: "Ruth Delgado", team: "Team Ruth", prevAvg: 8.0, currentAvg: 8.4, diff: "+0.4", badge: "🔺" },
      { cdr: "Lucia Tellez", team: "Team Angelo", prevAvg: 9.5, currentAvg: 9.5, diff: "0.0", badge: "➖" },
      { cdr: "Ianis Gavriz", team: "Team Angelo", prevAvg: 8.4, currentAvg: 6.1, diff: "-2.3", badge: "🔻" },
      { cdr: "Alejandro Portillo", team: "Team Angelo", prevAvg: 11.0, currentAvg: 7.9, diff: "-3.1", badge: "🔻" },
    ],
    teamTotals: [
      { team: "Team Angelo", total: 148 },
      { team: "Team Mairenis", total: 101 },
      { team: "Team Ruth", total: 84 },
      { team: "Team Martin", total: 23 },
    ],
    highlights: {
      mostImproved: ["Marialys Ramirez 🔺+3.3", "Ruth Delgado 🔺+0.4"],
      biggestDeclines: ["Alejandro Portillo 🔻-3.1", "Ianis Gavriz 🔻-2.3"],
      observations: [
        "Weekend volume slipped to 356 IC (-11.4%), consistent with typical weekend staffing dips.",
        "Marialys Ramirez was the standout performer, hitting Outstanding status with a 10.5 avg.",
        "Team Angelo's weekend regulars underperformed their weekday pace by a wide margin.",
      ],
    },
    conclusion:
      "The weekend closed at 356 IC, down 11.4% from the prior weekend. Coverage held steady but per-agent averages softened, particularly for Team Angelo. Marialys Ramirez's weekend consistency stands out as a scheduling asset worth reinforcing.",
  },
];

export function getReportById(id: string): ReportData | undefined {
  return mockReports.find((r) => r.id === id);
}
