import { getSupabaseServerClient, REPORTS_TABLE } from "./supabaseClient";
import { ReportPayload, TotalCallsPayload } from "./types";

export type ReportTypeSlug = "ics" | "total-calls";

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

export function isValidReportPayloadFor(
  reportType: ReportTypeSlug,
  body: unknown
): body is ReportPayload | TotalCallsPayload {
  return reportType === "total-calls" ? isValidTotalCallsPayload(body) : isValidReportPayload(body);
}

export async function insertReport(
  reportType: ReportTypeSlug,
  payload: ReportPayload | TotalCallsPayload
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
