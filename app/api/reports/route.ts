import { NextRequest, NextResponse } from "next/server";
import { mockReports } from "@/lib/mockData";
import { mockTotalCallsReports } from "@/lib/totalCallsMockData";
import { mockWeekendReports } from "@/lib/weekendMockData";
import { mockCaseReviewReports } from "@/lib/caseReviewMockData";
import { mockSFWeeklyReports } from "@/lib/sfWeeklyMockData";
import { getSupabaseServerClient, REPORTS_TABLE } from "@/lib/supabaseClient";
import { CaseReviewData, ReportData, SFWeeklyData, TotalCallsData, WeekendData } from "@/lib/types";
import { REPORT_TYPE_SLUGS, ReportTypeSlug } from "@/lib/reports";

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

function getMockReports(reportType: ReportTypeSlug) {
  if (reportType === "total-calls") return mockTotalCallsReports;
  if (reportType === "weekend-report") return mockWeekendReports;
  if (reportType === "cl-case-review") return mockCaseReviewReports;
  if (reportType === "sf-weekly") return mockSFWeeklyReports;
  return mockReports;
}

export async function GET(req: NextRequest) {
  const typeParam = req.nextUrl.searchParams.get("type") ?? "ics";
  const reportType: ReportTypeSlug = REPORT_TYPE_SLUGS.includes(typeParam as ReportTypeSlug)
    ? (typeParam as ReportTypeSlug)
    : "ics";

  if (DEMO_MODE) {
    const reports = getMockReports(reportType);
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

  const reports: (ReportData | TotalCallsData | WeekendData | CaseReviewData | SFWeeklyData)[] = (
    data ?? []
  ).map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    ...row.data,
  }));

  return NextResponse.json({ source: "live", count: reports.length, reports });
}
