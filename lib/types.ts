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

// ---------------------------------------------------------------------------
// Weekend Report
// ---------------------------------------------------------------------------

export interface WeekendMetadata {
  reportType: string;
  cadence: Cadence;
  periodLabel: string;
  /** The weekend's calendar dates, e.g. ["15/08", "16/08"] — used as attention-table column headers. */
  days: string[];
}

export interface WeekendSummary {
  totalICs: number;
  benchmarkPerDay: number;
  leadingTeam: string;
}

export interface WeekendTeamHighlight {
  cdr: string;
  ics: number;
}

export interface WeekendTeamStat {
  team: string;
  totalICs: number;
  highlights: WeekendTeamHighlight[];
  analysis: string;
}

export interface WeekendTopPerformer {
  rank: number;
  cdr: string;
  team: string;
  ics: number;
}

export interface WeekendDayValue {
  date: string;
  /** null when the contributor didn't work that day (rendered as "—"). */
  ics: number | null;
}

export interface WeekendContributorAttention {
  cdr: string;
  days: WeekendDayValue[];
}

export interface WeekendTeamAttention {
  team: string;
  contributors: WeekendContributorAttention[];
}

export interface WeekendTeamRanking {
  rank: number;
  team: string;
  ics: number;
}

export interface WeekendKeyTakeaways {
  positiveTrends: string[];
  opportunities: string[];
  mainAttentionPoints: string[];
}

/** Shape stored in Supabase's `reports.data` JSONB column for the Weekend report type. */
export interface WeekendPayload {
  metadata: WeekendMetadata;
  summary: WeekendSummary;
  teams: WeekendTeamStat[];
  topPerformers: WeekendTopPerformer[];
  attentionByTeam: WeekendTeamAttention[];
  teamRanking: WeekendTeamRanking[];
  keyTakeaways: WeekendKeyTakeaways;
  executiveSummary: string;
}

export interface WeekendData extends WeekendPayload {
  id: string;
  createdAt?: string;
}

// ---------------------------------------------------------------------------
// CL Case Review
// ---------------------------------------------------------------------------

/** One row of the CDR & Setter case log, exactly as the dashboard's JS renders it. */
export interface CaseRecord {
  date: string; // ISO "YYYY-MM-DD"
  datetime: string; // "YYYY-MM-DD 00:00"
  sender: string;
  subject: string;
  description: string;
  cdr: string;
  tl: string;
  type: string;
  category: string;
  year: number;
  month: number;
  day: number;
  link: string;
}

export interface CaseReviewMetadata {
  reportType: string;
  cadence: Cadence;
  periodLabel: string;
}

/** Shape stored in Supabase's `reports.data` JSONB column for the CL Case Review report type. */
export interface CaseReviewPayload {
  metadata: CaseReviewMetadata;
  cases: CaseRecord[];
}

export interface CaseReviewData extends CaseReviewPayload {
  id: string;
  createdAt?: string;
}

// ---------------------------------------------------------------------------
// SF Weekly Report (Short Funnel coverage)
// ---------------------------------------------------------------------------

export interface SFCdrStat {
  cdr: string;
  team: string;
  avgSfPerDay: number;
  daysBelowTarget: number;
  /** Only reported for CDRs meeting the target in the source report. */
  daysEvaluated?: number;
}

export interface SFWeeklySummary {
  cdrsEvaluated: number;
  meetingCoverageTarget: number;
  belowCoverageTarget: number;
  coverageRate: string;
}

export interface SFWeeklyMetadata {
  reportType: string;
  cadence: Cadence;
  periodLabel: string;
  benchmarkPerDay: number;
}

/** Shape stored in Supabase's `reports.data` JSONB column for the SF Weekly report type. */
export interface SFWeeklyPayload {
  metadata: SFWeeklyMetadata;
  summary: SFWeeklySummary;
  meetingTarget: SFCdrStat[];
  belowTarget: SFCdrStat[];
}

export interface SFWeeklyData extends SFWeeklyPayload {
  id: string;
  createdAt?: string;
}
