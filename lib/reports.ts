import { getSupabaseServerClient, REPORTS_TABLE } from "./supabaseClient";
import {
  CaseReviewPayload,
  CSSPayload,
  ICSInconsistencyPayload,
  ICSRatioPayload,
  ReportPayload,
  SFWeeklyPayload,
  TotalCallsPayload,
  WeekendPayload,
} from "./types";

export type ReportTypeSlug =
  | "ics"
  | "total-calls"
  | "weekend-report"
  | "cl-case-review"
  | "sf-weekly"
  | "ic-show-up-rate"
  | "ic-inconsistency"
  | "operational-complaints";

export const REPORT_TYPE_SLUGS: ReportTypeSlug[] = [
  "ics",
  "total-calls",
  "weekend-report",
  "cl-case-review",
  "sf-weekly",
  "ic-show-up-rate",
  "ic-inconsistency",
  "operational-complaints",
];

type AnyReportPayload =
  | ReportPayload
  | TotalCallsPayload
  | WeekendPayload
  | CaseReviewPayload
  | SFWeeklyPayload
  | ICSRatioPayload
  | ICSInconsistencyPayload
  | CSSPayload;

export function isValidReportPayload(body: unknown): body is ReportPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.metadata === "object" &&
    b.metadata !== null &&
    typeof (b.metadata as Record<string, unknown>).cadence === "string" &&
    typeof (b.metadata as Record<string, unknown>).periodLabel === "string" &&
    typeof b.summary === "object" &&
    Array.isArray(b.comparisonTable) &&
    Array.isArray(b.teamTotals) &&
    Array.isArray(b.outstandingPerformers) &&
    typeof b.conclusion === "string"
  );
}

export function isValidTotalCallsPayload(body: unknown): body is TotalCallsPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.metadata === "object" &&
    b.metadata !== null &&
    typeof (b.metadata as Record<string, unknown>).cadence === "string" &&
    typeof (b.metadata as Record<string, unknown>).periodLabel === "string" &&
    typeof b.summary === "object" &&
    Array.isArray(b.teams) &&
    Array.isArray(b.topPerformers) &&
    Array.isArray(b.attentionByTeam) &&
    Array.isArray(b.teamRanking) &&
    typeof b.keyTakeaways === "object" &&
    typeof b.executiveSummary === "string"
  );
}

export function isValidWeekendPayload(body: unknown): body is WeekendPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.metadata === "object" &&
    b.metadata !== null &&
    typeof (b.metadata as Record<string, unknown>).cadence === "string" &&
    typeof (b.metadata as Record<string, unknown>).periodLabel === "string" &&
    Array.isArray((b.metadata as Record<string, unknown>).days) &&
    typeof b.summary === "object" &&
    Array.isArray(b.teams) &&
    Array.isArray(b.topPerformers) &&
    Array.isArray(b.attentionByTeam) &&
    Array.isArray(b.teamRanking) &&
    typeof b.keyTakeaways === "object" &&
    typeof b.executiveSummary === "string"
  );
}

const REQUIRED_CASE_FIELDS = [
  "date",
  "datetime",
  "sender",
  "subject",
  "description",
  "cdr",
  "tl",
  "type",
  "category",
  "year",
  "month",
  "day",
  "link",
] as const;

export function isValidCaseReviewPayload(body: unknown): body is CaseReviewPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (
    typeof b.metadata !== "object" ||
    b.metadata === null ||
    typeof (b.metadata as Record<string, unknown>).cadence !== "string" ||
    typeof (b.metadata as Record<string, unknown>).periodLabel !== "string"
  ) {
    return false;
  }
  if (!Array.isArray(b.cases)) return false;
  return b.cases.every((c) => {
    if (!c || typeof c !== "object") return false;
    const row = c as Record<string, unknown>;
    return REQUIRED_CASE_FIELDS.every((field) => field in row);
  });
}

export function isValidSFWeeklyPayload(body: unknown): body is SFWeeklyPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.metadata === "object" &&
    b.metadata !== null &&
    typeof (b.metadata as Record<string, unknown>).cadence === "string" &&
    typeof (b.metadata as Record<string, unknown>).periodLabel === "string" &&
    typeof b.summary === "object" &&
    Array.isArray(b.meetingTarget) &&
    Array.isArray(b.belowTarget)
  );
}

export function isValidICSRatioPayload(body: unknown): body is ICSRatioPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (
    typeof b.metadata !== "object" ||
    b.metadata === null ||
    typeof (b.metadata as Record<string, unknown>).cadence !== "string" ||
    typeof (b.metadata as Record<string, unknown>).periodLabel !== "string" ||
    typeof b.summary !== "object" ||
    b.summary === null ||
    !Array.isArray((b.summary as Record<string, unknown>).teamSnapshot) ||
    typeof b.narrative !== "string" ||
    !Array.isArray(b.tiers)
  ) {
    return false;
  }
  return (b.tiers as unknown[]).every((t) => {
    if (!t || typeof t !== "object") return false;
    const tier = t as Record<string, unknown>;
    return (
      typeof tier.key === "string" &&
      typeof tier.label === "string" &&
      typeof tier.rangeLabel === "string" &&
      typeof tier.note === "string" &&
      Array.isArray(tier.cdrs)
    );
  });
}

export function isValidICSInconsistencyPayload(body: unknown): body is ICSInconsistencyPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (
    typeof b.metadata !== "object" ||
    b.metadata === null ||
    typeof (b.metadata as Record<string, unknown>).cadence !== "string" ||
    typeof (b.metadata as Record<string, unknown>).periodLabel !== "string" ||
    !Array.isArray(b.contributors) ||
    (b.narrative !== undefined && typeof b.narrative !== "string")
  ) {
    return false;
  }
  return (b.contributors as unknown[]).every((c) => {
    if (!c || typeof c !== "object") return false;
    const contributor = c as Record<string, unknown>;
    return (
      typeof contributor.cdr === "string" &&
      typeof contributor.biCount === "number" &&
      typeof contributor.excelCount === "number" &&
      Array.isArray(contributor.issues) &&
      contributor.issues.every((i) => typeof i === "string")
    );
  });
}

function isValidCategoryRow(row: unknown): boolean {
  if (!row || typeof row !== "object") return false;
  const r = row as Record<string, unknown>;
  return (
    typeof r.category === "string" &&
    typeof r.previousShare === "number" &&
    typeof r.currentShare === "number" &&
    typeof r.trend === "string"
  );
}

export function isValidCSSPayload(body: unknown): body is CSSPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (
    typeof b.metadata !== "object" ||
    b.metadata === null ||
    typeof (b.metadata as Record<string, unknown>).cadence !== "string" ||
    typeof (b.metadata as Record<string, unknown>).periodLabel !== "string"
  ) {
    return false;
  }

  const volumeSummary = b.volumeSummary as Record<string, unknown> | undefined;
  if (
    !volumeSummary ||
    typeof volumeSummary !== "object" ||
    typeof volumeSummary.totalComplaints !== "number" ||
    typeof volumeSummary.avgPerDay !== "number" ||
    typeof volumeSummary.daysInPeriod !== "number" ||
    typeof volumeSummary.previousTotal !== "number" ||
    typeof volumeSummary.previousAvgPerDay !== "number" ||
    typeof volumeSummary.changePercent !== "number" ||
    typeof volumeSummary.insight !== "string" ||
    typeof volumeSummary.observation !== "string"
  ) {
    return false;
  }

  const distribution = b.distribution as Record<string, unknown> | undefined;
  if (
    !distribution ||
    typeof distribution !== "object" ||
    !Array.isArray(distribution.rows) ||
    !distribution.rows.every(isValidCategoryRow) ||
    typeof distribution.insight !== "string" ||
    typeof distribution.observation !== "string"
  ) {
    return false;
  }

  const secondaryCategories = b.secondaryCategories as Record<string, unknown> | undefined;
  if (
    !secondaryCategories ||
    typeof secondaryCategories !== "object" ||
    !Array.isArray(secondaryCategories.rows) ||
    !secondaryCategories.rows.every(isValidCategoryRow) ||
    typeof secondaryCategories.insight !== "string" ||
    typeof secondaryCategories.positiveFindings !== "string" ||
    typeof secondaryCategories.operationalConcerns !== "string"
  ) {
    return false;
  }

  const ranking = b.ranking as Record<string, unknown> | undefined;
  if (
    !ranking ||
    typeof ranking !== "object" ||
    !Array.isArray(ranking.rows) ||
    typeof ranking.note !== "string" ||
    !ranking.rows.every((row) => {
      if (!row || typeof row !== "object") return false;
      const r = row as Record<string, unknown>;
      return (
        typeof r.rank === "number" &&
        typeof r.cdr === "string" &&
        typeof r.totalComplaints === "number" &&
        typeof r.types === "string"
      );
    })
  ) {
    return false;
  }

  const conclusion = b.conclusion as Record<string, unknown> | undefined;
  if (
    !conclusion ||
    typeof conclusion !== "object" ||
    typeof conclusion.volume !== "string" ||
    typeof conclusion.structure !== "string" ||
    !Array.isArray(conclusion.positiveResults) ||
    !conclusion.positiveResults.every((s) => typeof s === "string") ||
    !Array.isArray(conclusion.operationalRisks) ||
    !conclusion.operationalRisks.every((s) => typeof s === "string")
  ) {
    return false;
  }

  return true;
}

export function isValidReportPayloadFor(
  reportType: ReportTypeSlug,
  body: unknown
): body is AnyReportPayload {
  if (reportType === "total-calls") return isValidTotalCallsPayload(body);
  if (reportType === "weekend-report") return isValidWeekendPayload(body);
  if (reportType === "cl-case-review") return isValidCaseReviewPayload(body);
  if (reportType === "sf-weekly") return isValidSFWeeklyPayload(body);
  if (reportType === "ic-show-up-rate") return isValidICSRatioPayload(body);
  if (reportType === "ic-inconsistency") return isValidICSInconsistencyPayload(body);
  if (reportType === "operational-complaints") return isValidCSSPayload(body);
  return isValidReportPayload(body);
}

export async function insertReport(
  reportType: ReportTypeSlug,
  payload: AnyReportPayload
): Promise<{ id: string }> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from(REPORTS_TABLE)
    .insert({
      report_type: reportType,
      cadence: payload.metadata.cadence,
      period_label: payload.metadata.periodLabel,
      data: payload,
    })
    .select("id, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { id: data.id };
}
