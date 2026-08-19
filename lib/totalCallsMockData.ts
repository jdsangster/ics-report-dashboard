import { TotalCallsData } from "./types";

export const mockTotalCallsReports: TotalCallsData[] = [
  {
    id: "total-calls-w-0810",
    metadata: {
      reportType: "Weekly Calls Report",
      cadence: "Weekly",
      periodLabel: "08/10 – 08/16",
    },
    summary: {
      totalCalls: 24074,
      adjustedActiveCalls: 22069,
      totalICs: 1273,
      excludedContributors: [
        "Lucia Tellez",
        "Lionel Katemo",
        "Salome Gutierrez",
        "Martin Caneva",
        "Joaquin Zarate",
      ],
      excludedCalls: 1375,
    },
    teams: [
      {
        team: "Team Angelo",
        totalCalls: 7292,
        totalICs: 461,
        highlights: [
          { cdr: "Iara Berdayes", calls: 658, ics: 1 },
          { cdr: "Abril Rochas", calls: 539, ics: 28 },
          { cdr: "Nicolas Soto", calls: 644, ics: 50 },
          { cdr: "Ianis Gavriz", calls: 588, ics: 41 },
          { cdr: "Juan Pablo Gutierrez", calls: 564, ics: 47 },
        ],
        analysis:
          "Team Angelo posted the strongest IC total of the operation. Nicolas Soto led in conversion efficiency (50 ICs), while Iara Berdayes — newly counted here after moving from Team Martin — led the team in raw volume.",
      },
      {
        team: "Team Ruth",
        totalCalls: 6810,
        totalICs: 426,
        highlights: [
          { cdr: "Ximena Lopez", calls: 796, ics: 27 },
          { cdr: "Alan Castellano", calls: 639, ics: 48 },
          { cdr: "Valentina Mantegazza", calls: 587, ics: 41 },
          { cdr: "Diego Brandan", calls: 558, ics: 47 },
          { cdr: "Sofia Lopez", calls: 498, ics: 24 },
        ],
        analysis:
          "Ximena Lopez led the entire operation in raw call volume. Alan Castellano delivered the team's strongest conversion performance (48 ICs).",
      },
      {
        team: "Team Mairenis",
        totalCalls: 6951,
        totalICs: 372,
        highlights: [
          { cdr: "Marcio Oliveira", calls: 834, ics: 25 },
          { cdr: "Marialys Ramirez", calls: 637, ics: 19 },
          { cdr: "Fernanda Fernandez", calls: 635, ics: 38 },
          { cdr: "Stefania Ramundo", calls: 594, ics: 17 },
          { cdr: "Loraine Castillo", calls: 562, ics: 17 },
        ],
        analysis:
          "Team Mairenis finished as the highest-volume team of the week. Marcio Oliveira led the entire operation with 834 calls. Stephania Arcila Puerto shows no activity this week — worth checking on her status.",
      },
      {
        team: "Team Martin",
        totalCalls: 1016,
        totalICs: 14,
        highlights: [
          { cdr: "Agustin Mauvezin", calls: 469, ics: 10 },
          { cdr: "Rodrigo Cohen", calls: 447, ics: 4 },
          { cdr: "Camila Aput", calls: 94, ics: 0 },
        ],
        analysis:
          "Team Martin's activity came almost entirely from Agustin Mauvezin and Rodrigo Cohen. Javier Garcia, Kevin Perez, Milagros Cudeiro, and Renee Castillo show only token activity (1–2 calls), and 8 of the team's 16 members — Cameron Moorcraft, Joao Miguel Campos, Maria Eduarda Camba, Melissa Sales, Motunrayo Bamgbose, Natalia Colombo, Oriana Tuttobene, and Victoria Antunes Bueno — show none at all.",
      },
    ],
    topPerformers: [
      { rank: 1, cdr: "Marcio Oliveira", team: "Team Mairenis", calls: 834 },
      { rank: 2, cdr: "Ximena Lopez", team: "Team Ruth", calls: 796 },
      { rank: 3, cdr: "Iara Berdayes", team: "Team Angelo", calls: 658 },
      { rank: 4, cdr: "Nicolas Soto", team: "Team Angelo", calls: 644 },
      { rank: 5, cdr: "Alan Castellano", team: "Team Ruth", calls: 639 },
      { rank: 6, cdr: "Marialys Ramirez", team: "Team Mairenis", calls: 637 },
      { rank: 7, cdr: "Fernanda Fernandez", team: "Team Mairenis", calls: 635 },
      { rank: 8, cdr: "Stefania Ramundo", team: "Team Mairenis", calls: 594 },
      { rank: 9, cdr: "Ianis Gavriz", team: "Team Angelo", calls: 588 },
      { rank: 10, cdr: "Valentina Mantegazza", team: "Team Ruth", calls: 587 },
    ],
    attentionByTeam: [
      {
        team: "Team Angelo",
        contributors: [
          { cdr: "Alejandro Portillo", belowTargetDays: [{ date: "11/08", calls: 85 }, { date: "13/08", calls: 88 }, { date: "15/08", calls: 1 }] },
          { cdr: "Florencia Santos", belowTargetDays: [{ date: "10/08", calls: 88 }, { date: "11/08", calls: 86 }, { date: "14/08", calls: 88 }] },
          { cdr: "Ianis Gavriz", belowTargetDays: [{ date: "11/08", calls: 74 }] },
          { cdr: "Iara Berdayes", belowTargetDays: [{ date: "10/08", calls: 71 }] },
          { cdr: "Juan Pablo Gutierrez", belowTargetDays: [{ date: "11/08", calls: 98 }] },
          { cdr: "Julieta Lorenzetti", belowTargetDays: [{ date: "13/08", calls: 88 }] },
          { cdr: "Khomotso Mosena", belowTargetDays: [{ date: "11/08", calls: 96 }, { date: "12/08", calls: 98 }] },
          { cdr: "Martina Nasif", belowTargetDays: [{ date: "13/08", calls: 91 }] },
          { cdr: "Melissa Katemo", belowTargetDays: [{ date: "11/08", calls: 96 }, { date: "15/08", calls: 99 }] },
          { cdr: "Nicolas Soto", belowTargetDays: [{ date: "10/08", calls: 99 }] },
          { cdr: "Noraly Camargo", belowTargetDays: [{ date: "13/08", calls: 87 }, { date: "14/08", calls: 97 }] },
          { cdr: "Valentina Squillari", belowTargetDays: [{ date: "10/08", calls: 86 }, { date: "11/08", calls: 87 }, { date: "12/08", calls: 85 }, { date: "14/08", calls: 84 }, { date: "15/08", calls: 90 }] },
        ],
      },
      {
        team: "Team Ruth",
        contributors: [
          { cdr: "Alicia Romano", belowTargetDays: [{ date: "15/08", calls: 97 }] },
          { cdr: "Jesus Castillo", belowTargetDays: [{ date: "11/08", calls: 99 }, { date: "12/08", calls: 2 }, { date: "13/08", calls: 9 }] },
          { cdr: "Lucas DaSilva", belowTargetDays: [{ date: "12/08", calls: 92 }] },
          { cdr: "Marcos Villa", belowTargetDays: [{ date: "10/08", calls: 93 }, { date: "11/08", calls: 83 }, { date: "13/08", calls: 2 }] },
          { cdr: "Monica Solon", belowTargetDays: [{ date: "10/08", calls: 94 }, { date: "11/08", calls: 88 }, { date: "12/08", calls: 90 }] },
          { cdr: "Stefanny Navarro", belowTargetDays: [{ date: "10/08", calls: 96 }, { date: "14/08", calls: 96 }] },
          { cdr: "Valentina Mateluna", belowTargetDays: [{ date: "10/08", calls: 92 }, { date: "13/08", calls: 3 }, { date: "14/08", calls: 94 }] },
        ],
      },
      {
        team: "Team Mairenis",
        contributors: [
          { cdr: "Fernanda Fernandez", belowTargetDays: [{ date: "13/08", calls: 1 }] },
          { cdr: "Laura Bracalenti", belowTargetDays: [{ date: "10/08", calls: 79 }, { date: "11/08", calls: 79 }, { date: "12/08", calls: 78 }, { date: "13/08", calls: 91 }] },
          { cdr: "Luis Ramirez", belowTargetDays: [{ date: "10/08", calls: 42 }, { date: "12/08", calls: 95 }] },
          { cdr: "Maria Toledo", belowTargetDays: [{ date: "14/08", calls: 93 }] },
          { cdr: "Mariana Ricaurte", belowTargetDays: [{ date: "10/08", calls: 80 }, { date: "14/08", calls: 83 }] },
          { cdr: "Stefania Ramundo", belowTargetDays: [{ date: "11/08", calls: 99 }] },
          { cdr: "Valentina Franco", belowTargetDays: [{ date: "11/08", calls: 60 }] },
        ],
      },
      {
        team: "Team Martin",
        contributors: [
          { cdr: "Agustin Mauvezin", belowTargetDays: [{ date: "10/08", calls: 2 }, { date: "11/08", calls: 73 }] },
          { cdr: "Camila Aput", belowTargetDays: [{ date: "13/08", calls: 1 }, { date: "14/08", calls: 93 }] },
          { cdr: "Javier Garcia", belowTargetDays: [{ date: "14/08", calls: 1 }] },
          { cdr: "Kevin Perez", belowTargetDays: [{ date: "14/08", calls: 2 }] },
          { cdr: "Milagros Cudeiro", belowTargetDays: [{ date: "14/08", calls: 1 }] },
          { cdr: "Renee Castillo", belowTargetDays: [{ date: "13/08", calls: 1 }, { date: "14/08", calls: 1 }] },
          { cdr: "Rodrigo Cohen", belowTargetDays: [{ date: "11/08", calls: 33 }] },
        ],
      },
    ],
    teamRanking: [
      { rank: 1, team: "Team Mairenis", calls: 6951, ics: 372 },
      { rank: 2, team: "Team Angelo", calls: 7292, ics: 461 },
      { rank: 3, team: "Team Ruth", calls: 6810, ics: 426 },
      { rank: 4, team: "Team Martin", calls: 1016, ics: 14 },
    ],
    keyTakeaways: {
      positiveTrends: [
        "The active operation generated 22,069 calls and 1,273 ICs this week.",
        "Team Angelo posted the highest call volume (7,292) and the strongest IC total (461) of any team.",
        "Marcio Oliveira recorded the highest individual production (834 calls).",
        "Nicolas Soto delivered the strongest individual conversion performance (50 ICs).",
      ],
      opportunities: [
        "Team Martin's coverage remains thin, with 8 of 16 members showing zero activity this week.",
        "Five contributors (Lucia Tellez, Lionel Katemo, Salome Gutierrez, Martin Caneva, Joaquin Zarate) transitioned out mid-week, removing 1,375 combined calls from the active total.",
        "Stephania Arcila Puerto (Team Mairenis) shows no recorded activity this week.",
      ],
      mainAttentionPoints: [
        "Jesus Castillo had a sharp mid-week drop (2 calls on 12/08) after a strong start.",
        "Abril Rochas and Sofia Lopez, both active through Aug 16, no longer appear on the confirmed current roster — worth confirming their departure date.",
        "Team Martin's active coverage (8 of 16 members) remains the clearest gap in the operation as the rest of its roster onboards.",
      ],
    },
    executiveSummary:
      "The operation generated 24,074 calls for the week of August 10–16, with an adjusted active total of 22,069 calls after excluding five contributors who transitioned out mid-week. Team Angelo led in call volume (7,292) and IC production (461), narrowly ahead of Team Mairenis (6,951 calls) and Team Ruth (6,810 calls); Team Martin remained smallest at 1,016 calls, with half its roster still inactive.\n\nAt the individual level, Marcio Oliveira led the operation with 834 calls, followed by Ximena Lopez (796) and Iara Berdayes (658, in her first week counted under Team Angelo). Abril Rochas and Sofia Lopez both had strong weeks despite not appearing on the current roster — worth confirming whether their transition took effect at the end of this period.",
  },
];

export function getTotalCallsReportById(id: string): TotalCallsData | undefined {
  return mockTotalCallsReports.find((r) => r.id === id);
}
