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

export interface OrganizationalChange {
  contributor: string;
  icGenerated: number;
  status: string;
}

/** Shape stored in Supabase's `reports.data` JSONB column (and returned by the webhook payload). */
export interface ReportPayload {
  metadata: ReportMetadata;
  summary: ReportSummary;
  outstandingPerformers: OutstandingPerformer[];
  comparisonTable: ComparisonRow[];
  teamTotals: TeamTotal[];
  highlights: ReportHighlights;
  organizationalChanges?: OrganizationalChange[];
  conclusion: string;
}

/** ReportPayload plus the row identity/timestamp assigned once it's persisted. */
export interface ReportData extends ReportPayload {
  id: string;
  createdAt?: string;
}

/** Minimal shape shared by every report type — enough for header filtering/selection. */
export interface ReportListItem {
  id: string;
  metadata: {
    cadence: Cadence;
    periodLabel: string;
  };
}

// ---------------------------------------------------------------------------
// Total Calls Report
// ---------------------------------------------------------------------------

export interface TotalCallsMetadata {
  reportType: string;
  cadence: Cadence;
  periodLabel: string;
}

export interface TotalCallsSummary {
  totalCalls: number;
  adjustedActiveCalls: number;
  totalICs: number;
  excludedContributors: string[];
  excludedCalls: number;
}

export interface TeamCallsHighlight {
  cdr: string;
  calls: number;
  ics: number;
}

export interface TeamCallsStat {
  team: string;
  totalCalls: number;
  totalICs: number;
  highlights: TeamCallsHighlight[];
  analysis: string;
}

export interface TopPerformer {
  rank: number;
  cdr: string;
  team: string;
  calls: number;
}

export interface AttentionDay {
  date: string;
  calls: number;
}

export interface ContributorAttention {
  cdr: string;
  belowTargetDays: AttentionDay[];
}

export interface TeamAttention {
  team: string;
  contributors: ContributorAttention[];
}

export interface TeamRanking {
  rank: number;
  team: string;
  calls: number;
  ics: number;
}

export interface TotalCallsKeyTakeaways {
  positiveTrends: string[];
  opportunities: string[];
  mainAttentionPoints: string[];
}

/** Shape stored in Supabase's `reports.data` JSONB column for the Total Calls report type. */
export interface TotalCallsPayload {
  metadata: TotalCallsMetadata;
  summary: TotalCallsSummary;
  teams: TeamCallsStat[];
  topPerformers: TopPerformer[];
  attentionByTeam: TeamAttention[];
  teamRanking: TeamRanking[];
  keyTakeaways: TotalCallsKeyTakeaways;
  executiveSummary: string;
}

export interface TotalCallsData extends TotalCallsPayload {
  id: string;
  createdAt?: string;
}
