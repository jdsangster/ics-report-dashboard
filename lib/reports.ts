import { getSupabaseServerClient, REPORTS_TABLE } from "./supabaseClient";
import { ReportPayload } from "./types";

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

export async function insertReport(payload: ReportPayload): Promise<{ id: string }> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from(REPORTS_TABLE)
    .insert({
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
