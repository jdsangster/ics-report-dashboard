import { NextRequest, NextResponse } from "next/server";
import { insertReport, isValidReportPayload } from "@/lib/reports";

const WEBHOOK_API_KEY = process.env.WEBHOOK_API_KEY;

function isAuthorized(req: NextRequest): boolean {
  if (!WEBHOOK_API_KEY) return false;
  const header = req.headers.get("authorization") ?? req.headers.get("x-api-key");
  const provided = header?.replace(/^Bearer\s+/i, "").trim();
  return provided === WEBHOOK_API_KEY;
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

  if (!isValidReportPayload(body)) {
    return NextResponse.json(
      { error: "Payload does not match the expected report schema" },
      { status: 422 }
    );
  }

  try {
    const { id } = await insertReport("ics", body);
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
