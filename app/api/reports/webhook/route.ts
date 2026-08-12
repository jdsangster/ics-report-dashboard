import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, REPORTS_TABLE } from "@/lib/supabaseClient";
import { ReportPayload } from "@/lib/types";

const WEBHOOK_API_KEY = process.env.WEBHOOK_API_KEY;

function isAuthorized(req: NextRequest): boolean {
  if (!WEBHOOK_API_KEY) return false;
  return req.headers.get("x-api-key") === WEBHOOK_API_KEY;
}

function isValidPayload(body: unknown): body is ReportPayload {
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
    Array.isArray(b.outstandingPerformers)
  );
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Payload does not match the expected report schema" },
      { status: 422 }
    );
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from(REPORTS_TABLE)
    .insert({
      cadence: body.metadata.cadence,
      period_label: body.metadata.periodLabel,
      data: body,
    })
    .select("id, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
}
