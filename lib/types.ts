export type Cadence = "Daily" | "Weekend" | "Weekly";
export type SummaryStatus = "growth" | "decline" | "flat";
export type Badge = "🔺" | "🔻" | "➖" | "New";

export interface ReportMetadata {
  reportType: string;
  cadence: Cadence;
  periodLabel: string;
  filename?: string;
}

export interface ReportSummary {
  totalLabel: string;
  currentValue: number;
  previousValue: number;
  diffText: string;
  status: SummaryStatus;
}

export interface OutstandingPerformer {
  cdr: string;
  team: string;
  totalIC: number;
  workedDays: number;
  avgDay: number;
}

export interface ComparisonRow {
  cdr: string;
  team: string;
  prevAvg: number;
  currentAvg: number;
  diff: string;
  badge: Badge;
}

export interface TeamTotal {
  team: string;
  total: number;
}

export interface ReportHighlights {
  mostImproved: string[];
  biggestDeclines: string[];
  observations: string[];
}

/** Shape stored in Supabase's `reports.data` JSONB column (and returned by the webhook payload). */
export interface ReportPayload {
  metadata: ReportMetadata;
  summary: ReportSummary;
  outstandingPerformers: OutstandingPerformer[];
  comparisonTable: ComparisonRow[];
  teamTotals: TeamTotal[];
  highlights: ReportHighlights;
  conclusion: string;
}

/** ReportPayload plus the row identity/timestamp assigned once it's persisted. */
export interface ReportData extends ReportPayload {
  id: string;
  createdAt?: string;
}
