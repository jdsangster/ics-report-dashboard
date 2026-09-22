import { getSupabaseServerClient, REPORTS_TABLE } from "./supabaseClient";
import {
  CaseReviewPayload,
  ConversionTrackerPayload,
  CSSPayload,
  ICSInconsistencyPayload,
  ICSRatioPayload,
  ReportPayload,
  SFWeeklyPayload,
  TotalCallsPayload,
  TurnoverPayload,
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
  | "operational-complaints"
  | "conversion-tracker"
  | "cdr-turnover";

export const REPORT_TYPE_SLUGS: ReportTypeSlug[] = [
  "ics",
  "total-calls",
  "weekend-report",
  "cl-case-review",
  "sf-weekly",
  "ic-show-up-rate",
  "ic-inconsistency",
  "operational-complaints",
  "conversion-tracker",
  "cdr-turnover",
];

type AnyReportPayload =
  | ReportPayload
  | TotalCallsPayload
  | WeekendPayload
  | CaseReviewPayload
  | SFWeeklyPayload
  | ICSRatioPayload
  | ICSInconsistencyPayload
  | CSSPayload
  | ConversionTrackerPayload
  | TurnoverPayload;

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

export function isValidConversionTrackerPayload(body: unknown): body is ConversionTrackerPayload {
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

  const methodology = b.methodology as Record<string, unknown> | undefined;
  if (
    !methodology ||
    typeof methodology !== "object" ||
    typeof methodology.sfThreshold !== "number" ||
    typeof methodology.campThreshold !== "number" ||
    typeof methodology.sfThresholdBasis !== "string" ||
    typeof methodology.campThresholdBasis !== "string" ||
    typeof methodology.note !== "string"
  ) {
    return false;
  }

  const summary = b.summary as Record<string, unknown> | undefined;
  if (
    !summary ||
    typeof summary !== "object" ||
    typeof summary.totalEvaluated !== "number" ||
    typeof summary.clubCount !== "number" ||
    typeof summary.eligibleCount !== "number" ||
    typeof summary.belowThresholdCount !== "number"
  ) {
    return false;
  }

  if (
    !Array.isArray(b.observations) ||
    !b.observations.every((o) => typeof o === "string")
  ) {
    return false;
  }

  if (!Array.isArray(b.cdrs)) return false;
  const validStatuses = new Set(["70club", "eligible", "below-threshold"]);
  return b.cdrs.every((c) => {
    if (!c || typeof c !== "object") return false;
    const r = c as Record<string, unknown>;
    return (
      typeof r.cdr === "string" &&
      typeof r.team === "string" &&
      typeof r.qualifiedPCsOverall === "number" &&
      typeof r.icsOverall === "number" &&
      typeof r.overallPct === "number" &&
      typeof r.qualifiedPCsSF === "number" &&
      typeof r.icsSF === "number" &&
      typeof r.sfPct === "number" &&
      typeof r.qualifiedPCsCamp === "number" &&
      typeof r.icsCamp === "number" &&
      typeof r.campPct === "number" &&
      typeof r.status === "string" &&
      validStatuses.has(r.status as string)
    );
  });
}

const TURNOVER_OUTCOMES = new Set(["Offboarded", "Quit", "Promoted to CL"]);

export function isValidTurnoverPayload(body: unknown): body is TurnoverPayload {
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
  if (!Array.isArray(b.events)) return false;
  return b.events.every((e) => {
    if (!e || typeof e !== "object") return false;
    const ev = e as Record<string, unknown>;
    return (
      typeof ev.cdr === "string" &&
      typeof ev.team === "string" &&
      typeof ev.outcome === "string" &&
      TURNOVER_OUTCOMES.has(ev.outcome as string) &&
      typeof ev.date === "string" &&
      (ev.startDate === undefined || typeof ev.startDate === "string") &&
      (ev.note === undefined || typeof ev.note === "string")
    );
  });
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
  if (reportType === "conversion-tracker") return isValidConversionTrackerPayload(body);
  if (reportType === "cdr-turnover") return isValidTurnoverPayload(body);
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
