import { SFWeeklyData } from "./types";

export const mockSFWeeklyReports: SFWeeklyData[] = [
  {
    id: "sf-weekly-0803",
    metadata: {
      reportType: "Weekly Calls Report",
      cadence: "Weekly",
      periodLabel: "08/03 – 08/07",
      benchmarkPerDay: 15,
    },
    summary: {
      cdrsEvaluated: 42,
      meetingCoverageTarget: 4,
      belowCoverageTarget: 38,
      coverageRate: "9.5%",
    },
    meetingTarget: [
      { cdr: "Lucia Tellez", team: "Team 1", daysEvaluated: 5, avgSfPerDay: 21.0, daysBelowTarget: 0 },
      { cdr: "Marialys Ramirez", team: "Team 3", daysEvaluated: 4, avgSfPerDay: 19.5, daysBelowTarget: 0 },
      { cdr: "Valentina Mateluna", team: "Team 2", daysEvaluated: 4, avgSfPerDay: 19.0, daysBelowTarget: 0 },
      { cdr: "Monica Solon", team: "Team 2", daysEvaluated: 4, avgSfPerDay: 16.5, daysBelowTarget: 2 },
    ],
    belowTarget: [
      { cdr: "Nicolas Soto", team: "Team 1", avgSfPerDay: 13.5, daysBelowTarget: 2 },
      { cdr: "Marcos Villa", team: "Team 2", avgSfPerDay: 13.0, daysBelowTarget: 1 },
      { cdr: "Valentina Mantegazza", team: "Team 2", avgSfPerDay: 12.8, daysBelowTarget: 4 },
      { cdr: "Lucas DaSilva", team: "Team 2", avgSfPerDay: 12.5, daysBelowTarget: 3 },
      { cdr: "Martina Nasif", team: "Team 1", avgSfPerDay: 11.0, daysBelowTarget: 2 },
      { cdr: "Khomotso Mosena", team: "Team 1", avgSfPerDay: 10.8, daysBelowTarget: 5 },
      { cdr: "Marcio Oliveira", team: "Team 3", avgSfPerDay: 10.8, daysBelowTarget: 3 },
      { cdr: "Stefanny Navarro", team: "Team 2", avgSfPerDay: 10.5, daysBelowTarget: 4 },
      { cdr: "Ianis Gavriz", team: "Team 1", avgSfPerDay: 10.0, daysBelowTarget: 4 },
      { cdr: "Maria Toledo", team: "Team 3", avgSfPerDay: 9.3, daysBelowTarget: 3 },
      { cdr: "Juan Gutierrez", team: "N/A", avgSfPerDay: 9.2, daysBelowTarget: 4 },
      { cdr: "Julieta Lorenzetti", team: "Team 1", avgSfPerDay: 9.0, daysBelowTarget: 4 },
      { cdr: "Stephania Arcila Puerto", team: "Team 3", avgSfPerDay: 8.5, daysBelowTarget: 4 },
      { cdr: "Valentina Franco", team: "Team 3", avgSfPerDay: 8.5, daysBelowTarget: 2 },
      { cdr: "Florencia Santos", team: "Team 1", avgSfPerDay: 8.0, daysBelowTarget: 3 },
      { cdr: "Noraly Camargo", team: "Team 1", avgSfPerDay: 8.0, daysBelowTarget: 4 },
      { cdr: "Katheryn Parada", team: "Team 3", avgSfPerDay: 7.0, daysBelowTarget: 3 },
      { cdr: "Mariana Ricaurte", team: "Team 3", avgSfPerDay: 7.0, daysBelowTarget: 2 },
      { cdr: "Paula Brunati", team: "Team 3", avgSfPerDay: 7.0, daysBelowTarget: 4 },
      { cdr: "Diego Brandan", team: "N/A", avgSfPerDay: 7.0, daysBelowTarget: 2 },
      { cdr: "Alejandro Portillo", team: "Team 1", avgSfPerDay: 6.6, daysBelowTarget: 5 },
      { cdr: "Sofia Lopez", team: "Team 2", avgSfPerDay: 6.5, daysBelowTarget: 2 },
      { cdr: "Laura Bracalenti", team: "Team 3", avgSfPerDay: 6.4, daysBelowTarget: 5 },
      { cdr: "Abril Rochas", team: "Team 1", avgSfPerDay: 6.0, daysBelowTarget: 3 },
      { cdr: "Alicia Romano", team: "Team 2", avgSfPerDay: 5.7, daysBelowTarget: 3 },
      { cdr: "Lionel Katemo", team: "Team 1", avgSfPerDay: 5.7, daysBelowTarget: 3 },
      { cdr: "Valentina Squillari", team: "Team 1", avgSfPerDay: 5.7, daysBelowTarget: 3 },
      { cdr: "Salome Gutierrez", team: "Team 1", avgSfPerDay: 5.0, daysBelowTarget: 1 },
      { cdr: "Martin Caneva", team: "Team 2", avgSfPerDay: 4.8, daysBelowTarget: 4 },
      { cdr: "Araceli Pinget", team: "Team 2", avgSfPerDay: 4.7, daysBelowTarget: 3 },
      { cdr: "Loraine Castillo", team: "Team 4", avgSfPerDay: 4.0, daysBelowTarget: 2 },
      { cdr: "Luis Ramirez", team: "Team 4", avgSfPerDay: 3.8, daysBelowTarget: 5 },
      { cdr: "Alan Castellano", team: "Team 2", avgSfPerDay: 3.7, daysBelowTarget: 3 },
      { cdr: "Jesus Castillo", team: "Team 2", avgSfPerDay: 3.7, daysBelowTarget: 3 },
      { cdr: "Ximena Lopez", team: "Team 2", avgSfPerDay: 2.5, daysBelowTarget: 2 },
      { cdr: "Tomas Vega", team: "N/A", avgSfPerDay: 2.0, daysBelowTarget: 2 },
      { cdr: "Stefania Ramundo", team: "N/A", avgSfPerDay: 1.5, daysBelowTarget: 2 },
      { cdr: "Fernanda Fernandez", team: "Team 4", avgSfPerDay: 1.0, daysBelowTarget: 3 },
    ],
  },
];

export function getSFWeeklyReportById(id: string): SFWeeklyData | undefined {
  return mockSFWeeklyReports.find((r) => r.id === id);
}
