import { NextRequest, NextResponse } from "next/server";
import { mockReports } from "@/lib/mockData";
import { mockTotalCallsReports } from "@/lib/totalCallsMockData";
import { getSupabaseServerClient, REPORTS_TABLE } from "@/lib/supabaseClient";
import { ReportData, TotalCallsData } from "@/lib/types";
import { ReportTypeSlug } from "@/lib/reports";

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
const VALID_TYPES: ReportTypeSlug[] = ["ics", "total-calls"];

export async function GET(req: NextRequest) {
  const typeParam = req.nextUrl.searchParams.get("type") ?? "ics";
  const reportType: ReportTypeSlug = VALID_TYPES.includes(typeParam as ReportTypeSlug)
    ? (typeParam as ReportTypeSlug)
    : "ics";

  if (DEMO_MODE) {
    const reports = reportType === "total-calls" ? mockTotalCallsReports : mockReports;
    return NextResponse.json({ source: "mock", count: reports.length, reports });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from(REPORTS_TABLE)
    .select("id, created_at, data")
    .eq("report_type", reportType)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const reports: (ReportData | TotalCallsData)[] = (data ?? []).map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    ...row.data,
  }));

  return NextResponse.json({ source: "live", count: reports.length, reports });
}
