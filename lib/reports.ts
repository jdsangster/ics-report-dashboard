import { getSupabaseServerClient, REPORTS_TABLE } from "./supabaseClient";
import { CaseReviewPayload, ReportPayload, TotalCallsPayload, WeekendPayload } from "./types";

export type ReportTypeSlug = "ics" | "total-calls" | "weekend-report" | "cl-case-review";

export const REPORT_TYPE_SLUGS: ReportTypeSlug[] = [
  "ics",
  "total-calls",
  "weekend-report",
  "cl-case-review",
];

type AnyReportPayload = ReportPayload | TotalCallsPayload | WeekendPayload | CaseReviewPayload;

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

export function isValidReportPayloadFor(
  reportType: ReportTypeSlug,
  body: unknown
): body is AnyReportPayload {
  if (reportType === "total-calls") return isValidTotalCallsPayload(body);
  if (reportType === "weekend-report") return isValidWeekendPayload(body);
  if (reportType === "cl-case-review") return isValidCaseReviewPayload(body);
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
