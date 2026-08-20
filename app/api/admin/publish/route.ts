import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { insertReport, isValidReportPayloadFor, REPORT_TYPE_SLUGS, ReportTypeSlug } from "@/lib/reports";

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { reportType, payload } = body as { reportType?: unknown; payload?: unknown };

  if (typeof reportType !== "string" || !REPORT_TYPE_SLUGS.includes(reportType as ReportTypeSlug)) {
    return NextResponse.json({ error: "Missing or invalid reportType" }, { status: 400 });
  }

  if (!isValidReportPayloadFor(reportType as ReportTypeSlug, payload)) {
    return NextResponse.json(
      { error: "Payload does not match the expected report schema" },
      { status: 422 }
    );
  }

  try {
    const { id } = await insertReport(reportType as ReportTypeSlug, payload);
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
