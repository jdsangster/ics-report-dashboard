import { NextResponse } from "next/server";
import { mockReports } from "@/lib/mockData";
import { getSupabaseServerClient, REPORTS_TABLE } from "@/lib/supabaseClient";
import { ReportData } from "@/lib/types";

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "true";

export async function GET() {
  if (DEMO_MODE) {
    return NextResponse.json({ source: "mock", count: mockReports.length, reports: mockReports });
  }

  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from(REPORTS_TABLE)
    .select("id, created_at, data")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const reports: ReportData[] = (data ?? []).map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    ...row.data,
  }));

  return NextResponse.json({ source: "live", count: reports.length, reports });
}
