# Prompt for generating the CDR Conversion Tracker JSON ("The 70% Club")

Unlike most of the other reports, this one isn't built from a narrative report you already
generate — it's computed directly from three raw Power BI pivot exports for the week, each
filtered to the same date range: **Full Data** (all sources — "Deep Analysis"), **Short Funnel**,
and **Campaigns**. Paste the block below into any Claude chat along with those three files (as
`.xlsx` or pasted as tables) whenever a new week closes, and it will compute the ranking and
output the exact JSON the dashboard expects, ready to paste into `/admin` (select
**"CDR Conversion Tracker"** in the report type dropdown there).

---

## Instruction to paste into your Claude chat (attach the three exports with it)

```
Convert the attached three Power BI exports (Full Data, Short Funnel, Campaigns — same date
range) into a JSON object matching this schema EXACTLY. This is a strict data contract — an
automated system parses this JSON and will reject it if any key is renamed, missing, or
restructured.

Each export is a pivot with columns: Team, Teammate, Total Calls, Unique Calls, Answered Calls,
Answered on Unique, Unqualified PCs, Unqualified on Answered, Qualified PCs, Qualified on
Answered, ICS Code, ICS on Qualified — with "Team N" subtotal rows above each team's roster.
"Qualified PCs" and "ICS Code" (the IC count) are the two numbers you need from each file, per
teammate.

CALCULATION RULES (apply in this exact order):

1. For every CDR that appears in the Full Data export, look up their Qualified PCs and ICS Code
   in that same export (this gives "Overall"), then look them up again in the Short Funnel export
   (gives "SF") and the Campaigns export (gives "Camp"). If a CDR has no row in the SF or Campaigns
   file, their Qualified PCs and ICS Code for that funnel are 0.
2. Compute each of the three conversion percentages as ICS Code ÷ Qualified PCs × 100, rounded to
   2 decimals. If Qualified PCs is 0, the percentage is 0.
3. sfThreshold = the average Qualified PCs (Short Funnel) across CDRs who have Qualified PCs > 0
   in the Short Funnel export — EXCLUDE CDRs with 0 Qualified PCs in that file from the average.
   Round to 1 decimal.
4. campThreshold = the same calculation, but on the Campaigns export.
5. A CDR is "eligible" (qualifies for the ranking) only if their Qualified PCs (SF) >= sfThreshold
   AND their Qualified PCs (Camp) >= campThreshold — both funnels, regardless of how high their
   conversion rate is.
6. status:
   - "70club" if eligible AND overallPct >= 70
   - "eligible" if eligible AND overallPct < 70
   - "below-threshold" if not eligible (failed the volume bar in at least one funnel)
7. Every CDR that appears in the Full Data export is included in "cdrs" — publish everyone, not
   just those who qualify. Sort "cdrs" descending by overallPct.
8. "team" is the CDR's current team name (Titans / Lightyear / The Booking Machines / Academia —
   map from "Team 1"/"Team 2"/"Team 3"/"Team 4" using the current roster; ask if a Team N mapping
   is unclear or has changed).

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": "CDR Conversion Tracker",
    "cadence": "Weekly",
    "periodLabel": string          // e.g. "09/14 – 09/20"
  },
  "methodology": {
    "sfThreshold": number,          // from rule 3 above
    "campThreshold": number,        // from rule 4 above
    "sfThresholdBasis": string,     // one sentence describing rule 3
    "campThresholdBasis": string,   // one sentence describing rule 4
    "note": string                  // one paragraph explaining the dual-funnel volume filter
                                     // and why (avoids small-sample outliers like 8/8 = 100%)
  },
  "summary": {
    "totalEvaluated": number,       // cdrs.length
    "clubCount": number,            // count of status === "70club"
    "eligibleCount": number,        // count of status === "eligible"
    "belowThresholdCount": number   // count of status === "below-threshold"
  },
  "cdrs": [
    {
      "cdr": string,
      "team": string,
      "qualifiedPCsOverall": number,
      "icsOverall": number,
      "overallPct": number,
      "qualifiedPCsSF": number,
      "icsSF": number,
      "sfPct": number,
      "qualifiedPCsCamp": number,
      "icsCamp": number,
      "campPct": number,
      "status": "70club" | "eligible" | "below-threshold"
    }
  ],
  "observations": string[]          // 3-5 bullet-point sentences on this week's notable movers,
                                     // the Club member(s), and anything data-quality-worthy
                                     // (e.g. CDRs with a high % but 0 volume in one funnel)
}

CRITICAL — exact key names, do not substitute:
- "cadence" is always the literal string "Weekly" for this report.
- Every numeric field is a plain number, never a string, never including "%".
- "status" is one of exactly three literal strings: "70club", "eligible", "below-threshold".
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, methodology, summary, cdrs, observations.
[ ] summary counts match the actual status breakdown in cdrs.
[ ] sfThreshold/campThreshold were computed excluding zero-Qualified-PCs CDRs from the average.
[ ] Every CDR from the Full Data export appears in cdrs, sorted descending by overallPct.
[ ] status is set purely by the eligibility + 70% rule above — not by eyeballing the percentage.

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

---

## Reference schema (real example — week of 09/14–09/20)

```json
{
  "metadata": {
    "reportType": "CDR Conversion Tracker",
    "cadence": "Weekly",
    "periodLabel": "09/14 – 09/20"
  },
  "methodology": {
    "sfThreshold": 33.1,
    "campThreshold": 11.4,
    "sfThresholdBasis": "Average Qualified PCs among CDRs with Short Funnel activity this week (zero-activity CDRs excluded).",
    "campThresholdBasis": "Average Qualified PCs among CDRs with Campaigns activity this week (zero-activity CDRs excluded).",
    "note": "A CDR only qualifies for the ranking if their Qualified PCs meet or exceed both thresholds — Short Funnel AND Campaigns — regardless of how high their conversion rate is. This prevents small-sample outliers (e.g. 8 Qualified PCs / 8 ICs = 100%) from outranking sustained performance on a much larger base."
  },
  "summary": {
    "totalEvaluated": 60,
    "clubCount": 1,
    "eligibleCount": 2,
    "belowThresholdCount": 57
  },
  "cdrs": [
    {
      "cdr": "Rodrigo Cohen",
      "team": "Lightyear",
      "qualifiedPCsOverall": 14,
      "icsOverall": 14,
      "overallPct": 100.0,
      "qualifiedPCsSF": 14,
      "icsSF": 14,
      "sfPct": 100.0,
      "qualifiedPCsCamp": 0,
      "icsCamp": 0,
      "campPct": 0.0,
      "status": "below-threshold"
    },
    {
      "cdr": "Nicolas Soto",
      "team": "Titans",
      "qualifiedPCsOverall": 94,
      "icsOverall": 72,
      "overallPct": 76.6,
      "qualifiedPCsSF": 76,
      "icsSF": 62,
      "sfPct": 81.58,
      "qualifiedPCsCamp": 18,
      "icsCamp": 10,
      "campPct": 55.56,
      "status": "70club"
    }
  ],
  "observations": [
    "Only Nicolas Soto (Titans) cleared both volume thresholds and reached 70%+ overall this week (76.6%) — the sole member of The 70% Club.",
    "Several CDRs posted very high overall percentages but had 0 Qualified PCs in Campaigns this week — exactly the small/one-sided sample the volume filter is designed to screen out."
  ]
}
```

## Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **CDR Conversion Tracker**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/conversion-tracker`.

## How the week-over-week trend works

Unlike some other reports, this JSON does **not** include the previous week's percentage per CDR
— the dashboard computes the trend itself, by matching each CDR's name against the immediately
prior published report for this same report type. For that matching to work, **spell each CDR's
name exactly the same way every week** — if a name changes (e.g. a legal name correction in the
CRM), that CDR will show as "New" that week instead of a trend, since the dashboard can't tell
it's the same person under a different string.

The first week ever published has nothing to compare against, so every CDR shows "—" for the
trend column until a second week is published.
