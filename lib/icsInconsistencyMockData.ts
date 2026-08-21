import { ICSInconsistencyData } from "./types";

export const mockICSInconsistencyReports: ICSInconsistencyData[] = [
  {
    id: "ics-inconsistency-0813",
    metadata: {
      reportType: "IC Inconsistency",
      cadence: "Daily",
      periodLabel: "08/13",
    },
    contributors: [
      {
        cdr: "Luis Ramirez",
        biCount: 18,
        excelCount: 15,
        issues: [
          "Doesn't reflect in Excel for Claudia Manriquez.",
          "Doesn't reflect in Excel for Alithu Araujo.",
          "Missing ICS disposition for Guillermo Fernandez.",
          "Missing IC disposition for Linnette Muñoz.",
          "Marked IC twice, once in Sales Dialer and once in Just Call, for Luis Carlos Valenzuela Orci.",
        ],
      },
      {
        cdr: "Juan Pablo Gutierrez",
        biCount: 16,
        excelCount: 18,
        issues: [
          "Not reflected in Excel; selected the tag instead of using the IC disposition for Bruno Teixeira — because he created a duplicate contact (New JustCall Contact).",
          "Created a new JustCall contact tagged as Initial Consultation; didn't save the number properly, ended up calling twice, creating and marking as IC (New JustCall Contact).",
          "No call recorded; selected the tag instead of using a disposition in JustCall for Ernest Prayuda.",
          "Blank disposition in JustCall; selected the tag manually instead of using the disposition for Zoe Hagley.",
        ],
      },
    ],
  },
];

export function getICSInconsistencyReportById(id: string): ICSInconsistencyData | undefined {
  return mockICSInconsistencyReports.find((r) => r.id === id);
}
