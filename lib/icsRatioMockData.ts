import { ICSRatioData } from "./types";

export const mockICSRatioReports: ICSRatioData[] = [
  {
    id: "ics-ratio-0601",
    metadata: {
      reportType: "ICS Ratio Ranking",
      cadence: "Weekly",
      periodLabel: "06/01 – 06/07",
    },
    summary: {
      description:
        "This metric shows how effective you are after qualifying. This is where intention turns into action.",
      teamSnapshot: [
        "4 CDRs achieved Elite Level performance (90%+).",
        "13 CDRs finished above 80%, demonstrating strong conversion effectiveness across the team.",
        "31 CDRs achieved 70% or higher, showing a solid overall conversion rate during the first week of June.",
        "Only 1 CDR finished below 60%, indicating that post-qualification execution was a team strength during this period.",
      ],
    },
    tiers: [
      {
        key: "elite",
        label: "Elite Level",
        rangeLabel: "90%+",
        note: "Outstanding execution. These teammates consistently convert qualified opportunities into successful next steps and set the benchmark for the team.",
        cdrs: [
          { cdr: "Ioshua Schmitz", ratio: 93.75 },
          { cdr: "Santiago Peralta", ratio: 93.65 },
          { cdr: "Gonzalo Fernandez", ratio: 90.16 },
          { cdr: "Valentina Squillari", ratio: 90.0 },
        ],
      },
      {
        key: "high",
        label: "High Performance",
        rangeLabel: "80% - 89.99%",
        note: "Strong conversion discipline and consistent execution. You are capturing the vast majority of your qualified opportunities.",
        cdrs: [
          { cdr: "Estefanía Osores", ratio: 89.38 },
          { cdr: "Ana Fallico", ratio: 87.88 },
          { cdr: "Abril Rochas", ratio: 86.96 },
          { cdr: "Aldemara Barbosa", ratio: 86.67 },
          { cdr: "Stefanny Navarro", ratio: 85.71 },
          { cdr: "Martin Ferreyra", ratio: 84.31 },
          { cdr: "Laura Lucia Tellez", ratio: 83.7 },
          { cdr: "Maria Toledo", ratio: 82.35 },
          { cdr: "Micaela Nunez", ratio: 82.05 },
          { cdr: "Yosmar Mendoza", ratio: 81.58 },
          { cdr: "Valentina Mantegazza", ratio: 81.16 },
          { cdr: "Juliana Toledo", ratio: 80.65 },
          { cdr: "Luciana Molina", ratio: 80.33 },
        ],
      },
      {
        key: "solid",
        label: "Solid Base",
        rangeLabel: "70% - 79.99%",
        note: "Good foundation. There is still room to improve urgency creation, objection handling, and next-step commitment.",
        cdrs: [
          { cdr: "Ianis Gavriz", ratio: 79.76 },
          { cdr: "Salome Gutierrez", ratio: 79.66 },
          { cdr: "Benjamin Martinez", ratio: 78.79 },
          { cdr: "Lionel Katemo", ratio: 78.05 },
          { cdr: "Martin Caneva", ratio: 78.05 },
          { cdr: "Florencia Santos", ratio: 77.78 },
          { cdr: "Jean Duran", ratio: 77.78 },
          { cdr: "Luciana Moscatelli", ratio: 77.61 },
          { cdr: "Valentina Mateluna", ratio: 75.86 },
          { cdr: "Andymar Mendoza", ratio: 75.0 },
          { cdr: "Diego Brandan", ratio: 75.0 },
          { cdr: "Katheryn Parada", ratio: 73.13 },
          { cdr: "Alejandro Portillo", ratio: 72.84 },
          { cdr: "Abril Figueroa Muller", ratio: 71.59 },
        ],
      },
      {
        key: "opportunity",
        label: "Opportunity Area",
        rangeLabel: "60% - 69.99%",
        note: "Qualified opportunities are advancing inconsistently. Focus on strengthening commitment, urgency creation, and the transition to the next step.",
        cdrs: [
          { cdr: "Julieta Lorenzetti", ratio: 68.18 },
          { cdr: "Stephania Arcila Puerto", ratio: 67.57 },
          { cdr: "Khomotso Mosena", ratio: 67.31 },
          { cdr: "Martina Nasif", ratio: 66.67 },
          { cdr: "Paula Brunati", ratio: 64.52 },
          { cdr: "Patricia Gomez", ratio: 60.61 },
        ],
      },
      {
        key: "critical",
        label: "Critical Opportunity Area",
        rangeLabel: "<60%",
        note: "This is currently the largest opportunity for improvement. Increasing post-qualification conversion will have an immediate impact on overall performance.",
        cdrs: [{ cdr: "Marialys Ramirez", ratio: 52.38 }],
      },
    ],
    narrative:
      "The first week of June showed excellent conversion performance across the board. The distribution is heavily concentrated in the High Performance and Solid Base categories, suggesting strong qualification quality and effective next-step commitment.\n\nStrong start to the month! The team demonstrated excellent execution during the first week of June, with a large concentration of CDRs performing above the 70% benchmark and multiple teammates reaching elite conversion levels.\n\nLet's build on this momentum, continue sharing best practices, and maintain the consistency that drives outstanding results.",
  },
];

export function getICSRatioReportById(id: string): ICSRatioData | undefined {
  return mockICSRatioReports.find((r) => r.id === id);
}
