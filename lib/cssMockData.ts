import { CSSData } from "./types";

export const mockCSSReports: CSSData[] = [
  {
    id: "css-0806-0812",
    metadata: {
      reportType: "CSS Analysis Report (CDR Team)",
      cadence: "Weekly",
      periodLabel: "August 6 – August 12",
    },
    volumeSummary: {
      totalComplaints: 41,
      avgPerDay: 5.9,
      daysInPeriod: 7,
      previousTotal: 21,
      previousAvgPerDay: 3.0,
      changePercent: 95.2,
      insight:
        "Previous week total: 21 complaints. Previous avg/day: 3.0. Current avg/day: 5.9. Increase of ~95.2% week over week (total complaints up from 21 to 41).",
      observation:
        "Complaint volume nearly doubled this week, reversing the two-week downward trend. The increase was broad-based: WA Call Requested doubled in absolute count (10 → 20), Unq PC - Unq Nurturing jumped six-fold (1 → 6), Communication Fail quadrupled (1 → 4), and General Complaint rose (2 → 5). This is the sharpest single-week increase observed in the recent reporting history.",
    },
    distribution: {
      rows: [
        { category: "WA Call Requested", previousShare: 48, currentShare: 49, trend: "— Stable (share), but absolute count doubled" },
        { category: "Communication Fail", previousShare: 5, currentShare: 10, trend: "⬆ Increase" },
        { category: "Unq Complaint", previousShare: 0, currentShare: 0, trend: "— Stable" },
        { category: "Late Call / Early Call", previousShare: 10, currentShare: 2, trend: "⬇ Improvement" },
        { category: "Assistance", previousShare: 14, currentShare: 0, trend: "⬇ Eliminated" },
        { category: "Checking Eligibility Pending", previousShare: 5, currentShare: 0, trend: "⬇ Eliminated" },
        { category: "Pending FU", previousShare: 5, currentShare: 2, trend: "⬇ Improvement" },
        { category: "General Complaint", previousShare: 10, currentShare: 12, trend: "⬆ Slight increase" },
        { category: "No Contact", previousShare: 0, currentShare: 7, trend: "⬆ New increase" },
        { category: "No Clarity in Call", previousShare: 0, currentShare: 2, trend: "⬆ New increase" },
      ],
      insight:
        "WA Call Requested held its share of total complaints (~49%), but because overall volume nearly doubled, the absolute number of cases doubled as well — it remains the single largest driver of customer dissatisfaction. Communication Fail doubled its share, and two dormant categories (No Contact, No Clarity in Call) resurfaced.",
      observation:
        "While several operational categories improved or were eliminated (Assistance, Checking Eligibility Pending, Late Call/Early Call), the emergence of No Contact and No Clarity in Call — both zero for multiple weeks — signals new gaps in customer engagement quality that were not present in prior weeks.",
    },
    secondaryCategories: {
      rows: [
        { category: "Unq PC - Nurturing", previousShare: 5, currentShare: 15, trend: "⬆ Significant increase" },
        { category: "Correct Information", previousShare: 0, currentShare: 0, trend: "— Stable" },
        { category: "Bad Review Social Media", previousShare: 0, currentShare: 0, trend: "— Stable" },
      ],
      insight:
        "Unq PC - Nurturing tripled its share of complaints, moving from an isolated case to the third-largest category overall (15%, 6 cases). This is now the most notable secondary-category shift.",
      positiveFindings:
        "No Correct Information or Bad Review Social Media cases were reported, maintaining a clean record in both categories.",
      operationalConcerns:
        'The Unq PC - Nurturing increase is spread across multiple CDRs (Marcio Oliveira with 2 cases, plus one case each from Laura Bracalenti, Ximena Lopez, Tomas Vega, and "None"), suggesting a systemic gap in completing final nurturing steps after Legal Team responses rather than an isolated incident.',
    },
    ranking: {
      rows: [
        { rank: 1, cdr: "Laura Bracalenti", totalComplaints: 4, types: "1 General Complaint, 1 WA Call Requested, 1 Late Call / Early Call, 1 Unq PC - Unq Nurturing" },
        { rank: 2, cdr: "Marcio Oliveira", totalComplaints: 4, types: "1 No Clarity in Call, 1 WA Call Requested, 2 Unq PC - Unq Nurturing" },
        { rank: 3, cdr: "Valentina Mateluna", totalComplaints: 4, types: "4 WA Call Requested" },
        { rank: 4, cdr: "Marialys Ramirez", totalComplaints: 3, types: "1 No Contact, 2 WA Call Requested" },
        { rank: 5, cdr: "Julieta Lorenzetti", totalComplaints: 2, types: "1 WA Call Requested, 1 Communication Fail" },
        { rank: 6, cdr: "martina nasif", totalComplaints: 2, types: "1 Pending FU, 1 WA Call Requested" },
        { rank: 7, cdr: "VALENTINA Squillari", totalComplaints: 2, types: "1 General Complaint, 1 WA Call Requested" },
        { rank: 8, cdr: "Valentina Mantegazza", totalComplaints: 2, types: "1 General Complaint, 1 WA Call Requested" },
        { rank: 9, cdr: "Ximena Lopez", totalComplaints: 2, types: "1 WA Call Requested, 1 Unq PC - Unq Nurturing" },
        { rank: 10, cdr: "Mariana Ricaurte", totalComplaints: 2, types: "1 No Contact, 1 WA Call Requested" },
        { rank: 11, cdr: "Alejandro Portillo", totalComplaints: 1, types: "1 Communication Fail" },
        { rank: 12, cdr: "Martin Caneva", totalComplaints: 1, types: "1 Communication Fail" },
        { rank: 13, cdr: "Paula Brunatti", totalComplaints: 1, types: "1 Communication Fail" },
        { rank: 14, cdr: "Juan Pablo Gutierrez", totalComplaints: 1, types: "1 WA Call Requested" },
        { rank: 15, cdr: "Lucia Tellez", totalComplaints: 1, types: "1 WA Call Requested" },
        { rank: 16, cdr: "Marcos Villa", totalComplaints: 1, types: "1 WA Call Requested" },
        { rank: 17, cdr: "Melissa Katemo", totalComplaints: 1, types: "1 WA Call Requested" },
        { rank: 18, cdr: "Nicolas Soto", totalComplaints: 1, types: "1 WA Call Requested" },
        { rank: 19, cdr: "Noraly Camargo", totalComplaints: 1, types: "1 WA Call Requested" },
        { rank: 20, cdr: "Abril Rochas", totalComplaints: 1, types: "1 General Complaint" },
        { rank: 21, cdr: "Alan Castellano", totalComplaints: 1, types: "1 No Contact" },
        { rank: 22, cdr: "Monica Solon", totalComplaints: 1, types: "1 General Complaint" },
        { rank: 23, cdr: "Tomas Vega", totalComplaints: 1, types: "1 Unq PC - Unq Nurturing" },
      ],
      note:
        'Within the 4-complaint tier, Laura Bracalenti ranks first due to the presence of a Late Call/Early Call (highest operational-impact category); Marcio Oliveira and Valentina Mateluna are tied on operational impact (WA Call Requested as their highest-priority category) and are ordered alphabetically. The same logic applies within the 2- and 1-complaint tiers. "None" (1 Unq PC - Unq Nurturing) is excluded from ranking per standing rules.',
    },
    conclusion: {
      volume:
        "Complaint volume increased sharply, nearly doubling from 21 to 41 total complaints (+95.2%), with average daily complaints rising from 3.0 to 5.9. This reverses the two-week improvement trend and represents the largest single-week increase in recent reporting.",
      structure:
        "WA Call Requested remained the dominant category and held its share (~49%), but its absolute volume doubled, reflecting the overall spike rather than a new scheduling-specific problem. Unq PC - Unq Nurturing rose sharply (5% → 15%) to become the third-largest category, and Communication Fail doubled its share (5% → 10%). Two categories that had been at 0% for weeks — No Contact and No Clarity in Call — reappeared.",
      positiveResults: [
        "Assistance requests fully eliminated (14% → 0%).",
        "Checking Eligibility Pending fully eliminated (5% → 0%).",
        "Late Call / Early Call improved significantly (10% → 2%).",
        "Pending FU improved slightly (5% → 2%).",
        "No Correct Information or Bad Review Social Media cases reported.",
      ],
      operationalRisks: [
        "Overall complaint volume nearly doubled, the primary concern this week.",
        "Unq PC - Unq Nurturing tripled in share and is spread across multiple CDRs, pointing to a systemic — not isolated — process gap.",
        "Communication Fail doubled, now affecting more CDRs than in prior weeks.",
        "No Contact (7%, 3 cases) and No Clarity in Call (2%, 1 case) resurfaced after being absent — these represent higher-severity customer experience failures.",
        "Valentina Mateluna logged 4 WA Call Requested complaints alone, the highest single-CDR concentration seen this period.",
      ],
    },
  },
];

export function getCSSReportById(id: string): CSSData | undefined {
  return mockCSSReports.find((r) => r.id === id);
}
