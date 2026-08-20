import { WeekendData } from "./types";

export const mockWeekendReports: WeekendData[] = [
  {
    id: "weekend-0815",
    metadata: {
      reportType: "Weekend IC Report",
      cadence: "Weekend",
      periodLabel: "08/15 – 08/16",
      days: ["15/08", "16/08"],
    },
    summary: {
      totalICs: 162,
      benchmarkPerDay: 10,
      leadingTeam: "Team Mairenis",
    },
    teams: [
      {
        team: "Team Angelo",
        totalICs: 56,
        highlights: [
          { cdr: "Juan Pablo Gutierrez", ics: 15 },
          { cdr: "Martina Nasif", ics: 14 },
          { cdr: "Valentina Squillari", ics: 9 },
          { cdr: "Ianis Gavriz", ics: 8 },
        ],
        analysis:
          "Juan Pablo Gutierrez was the only contributor on the team to clear the 10-ICs/day benchmark. Iara Berdayes, Ludmila Catalan, and Melissa Katemo — newly counted here after their move from Team Martin — combined for 9 ICs.",
      },
      {
        team: "Team Ruth",
        totalICs: 38,
        highlights: [
          { cdr: "Ximena Lopez", ics: 11 },
          { cdr: "Diego Brandan", ics: 7 },
          { cdr: "Araceli Pinget", ics: 6 },
          { cdr: "Marcos Villa", ics: 6 },
        ],
        analysis:
          "With Sofia Lopez no longer on the roster, Team Ruth's weekend total drops to 38. No contributor cleared the daily benchmark on either individual day.",
      },
      {
        team: "Team Mairenis",
        totalICs: 59,
        highlights: [
          { cdr: "Fernanda Fernandez", ics: 14 },
          { cdr: "Mariana Ricaurte", ics: 14 },
          { cdr: "Valentina Franco", ics: 11 },
          { cdr: "Stefania Ramundo", ics: 6 },
        ],
        analysis:
          "Team Mairenis led the operation this weekend. Valentina Franco was the only contributor to clear the daily benchmark, doing so on Saturday.",
      },
      {
        team: "Team Martin",
        totalICs: 9,
        highlights: [
          { cdr: "Agustin Mauvezin", ics: 7 },
          { cdr: "Rodrigo Cohen", ics: 2 },
        ],
        analysis:
          "Team Martin's weekend activity came from just two contributors — Agustin Mauvezin and Rodrigo Cohen. The remaining 13 members show no activity, consistent with most of the roster having just joined.",
      },
    ],
    topPerformers: [
      { rank: 1, cdr: "Juan Pablo Gutierrez", team: "Team Angelo", ics: 15 },
      { rank: 2, cdr: "Martina Nasif", team: "Team Angelo", ics: 14 },
      { rank: 3, cdr: "Fernanda Fernandez", team: "Team Mairenis", ics: 14 },
      { rank: 4, cdr: "Mariana Ricaurte", team: "Team Mairenis", ics: 14 },
      { rank: 5, cdr: "Ximena Lopez", team: "Team Ruth", ics: 11 },
      { rank: 6, cdr: "Valentina Franco", team: "Team Mairenis", ics: 11 },
    ],
    attentionByTeam: [
      {
        team: "Team Angelo",
        contributors: [
          { cdr: "Alejandro Portillo", days: [{ date: "15/08", ics: 1 }, { date: "16/08", ics: null }] },
          { cdr: "Ianis Gavriz", days: [{ date: "15/08", ics: 8 }, { date: "16/08", ics: null }] },
          { cdr: "Martina Nasif", days: [{ date: "15/08", ics: 10 }, { date: "16/08", ics: 4 }] },
          { cdr: "Valentina Squillari", days: [{ date: "15/08", ics: 9 }, { date: "16/08", ics: null }] },
          { cdr: "Iara Berdayes", days: [{ date: "15/08", ics: null }, { date: "16/08", ics: 1 }] },
          { cdr: "Ludmila Catalan", days: [{ date: "15/08", ics: 1 }, { date: "16/08", ics: 1 }] },
          { cdr: "Melissa Katemo", days: [{ date: "15/08", ics: 4 }, { date: "16/08", ics: 2 }] },
        ],
      },
      {
        team: "Team Ruth",
        contributors: [
          { cdr: "Alan Castellano", days: [{ date: "15/08", ics: 3 }, { date: "16/08", ics: null }] },
          { cdr: "Alicia Romano", days: [{ date: "15/08", ics: 5 }, { date: "16/08", ics: null }] },
          { cdr: "Araceli Pinget", days: [{ date: "15/08", ics: 6 }, { date: "16/08", ics: null }] },
          { cdr: "Diego Brandan", days: [{ date: "15/08", ics: 7 }, { date: "16/08", ics: null }] },
          { cdr: "Marcos Villa", days: [{ date: "15/08", ics: 3 }, { date: "16/08", ics: 3 }] },
          { cdr: "Ximena Lopez", days: [{ date: "15/08", ics: 2 }, { date: "16/08", ics: 9 }] },
        ],
      },
      {
        team: "Team Mairenis",
        contributors: [
          { cdr: "Fernanda Fernandez", days: [{ date: "15/08", ics: 7 }, { date: "16/08", ics: 7 }] },
          { cdr: "Katheryn Parada", days: [{ date: "15/08", ics: 3 }, { date: "16/08", ics: null }] },
          { cdr: "Loraine Castillo", days: [{ date: "15/08", ics: 3 }, { date: "16/08", ics: 1 }] },
          { cdr: "Marcio Oliveira", days: [{ date: "15/08", ics: 4 }, { date: "16/08", ics: null }] },
          { cdr: "Mariana Ricaurte", days: [{ date: "15/08", ics: 9 }, { date: "16/08", ics: 5 }] },
          { cdr: "Stefania Ramundo", days: [{ date: "15/08", ics: 3 }, { date: "16/08", ics: 3 }] },
          { cdr: "Tomas Vega", days: [{ date: "15/08", ics: 2 }, { date: "16/08", ics: 1 }] },
        ],
      },
      {
        team: "Team Martin",
        contributors: [
          { cdr: "Agustin Mauvezin", days: [{ date: "15/08", ics: 2 }, { date: "16/08", ics: 5 }] },
          { cdr: "Rodrigo Cohen", days: [{ date: "15/08", ics: null }, { date: "16/08", ics: 2 }] },
        ],
      },
    ],
    teamRanking: [
      { rank: 1, team: "Team Mairenis", ics: 59 },
      { rank: 2, team: "Team Angelo", ics: 56 },
      { rank: 3, team: "Team Ruth", ics: 38 },
      { rank: 4, team: "Team Martin", ics: 9 },
    ],
    keyTakeaways: {
      positiveTrends: [
        "The active operation generated 162 ICs during the weekend.",
        "Team Mairenis narrowly led the operation, ahead of a reshaped Team Angelo.",
        "Juan Pablo Gutierrez was the only contributor to clear the daily benchmark outright (15 on Saturday).",
        "Rodrigo Cohen contributed on his first tracked weekend with the company.",
      ],
      opportunities: [
        "Team Martin's coverage remains thin — only 2 of 16 current members show activity this weekend.",
        "Almost no contributor cleared the 10-ICs/day benchmark on either day.",
        "Most of Team Martin's roster is brand new with no activity history yet — worth watching as they onboard.",
      ],
      mainAttentionPoints: [
        "Ximena Lopez had a sharp swing from 2 ICs Saturday to 9 Sunday.",
        "Martina Nasif dropped off notably on Sunday (4) after a strong Saturday (10).",
        "Team Martin's active coverage remains the clearest operational gap this weekend under the new roster.",
      ],
    },
    executiveSummary:
      "Under the updated team roster, the weekend of August 15–16 closed with 162 active ICs. Team Mairenis led narrowly (59) over a reshaped Team Angelo (56, now including Iara Berdayes, Ludmila Catalan, and Melissa Katemo), followed by Team Ruth (38) and Team Martin (9, including Rodrigo Cohen's first tracked activity).\n\nTeam Martin's coverage remains a significant concern — with 14 of its 16 current members showing no recorded activity, largely because most just joined. Worth confirming onboarding timelines for that group heading into next week.",
  },
];

export function getWeekendReportById(id: string): WeekendData | undefined {
  return mockWeekendReports.find((r) => r.id === id);
}
