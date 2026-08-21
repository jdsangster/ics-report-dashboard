# Prompt for generating the SF Weekly Report JSON

Paste the block below into the Claude chat/project where you generate the Short Funnel weekly report. Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"SF Weekly Report"** in the report type dropdown there).

---

## Instruction to paste into your Claude chat

```
In addition to the narrative report you always generate, output a JSON block
that matches the schema below EXACTLY. This is a strict data contract — an
automated system parses this JSON and will reject it if any key is renamed,
missing, or restructured.

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": string,        // e.g. "Weekly Calls Report"
    "cadence": "Weekly" | "Daily" | "Weekend",
    "periodLabel": string,       // e.g. "08/03 – 08/07"
    "benchmarkPerDay": number    // the Short Funnel/day target, e.g. 15
  },
  "summary": {
    "cdrsEvaluated": number,
    "meetingCoverageTarget": number,
    "belowCoverageTarget": number,
    "coverageRate": string        // e.g. "9.5%"
  },
  "meetingTarget": [
    { "cdr": string, "team": string, "daysEvaluated": number, "avgSfPerDay": number, "daysBelowTarget": number }
  ],
  "belowTarget": [
    { "cdr": string, "team": string, "avgSfPerDay": number, "daysBelowTarget": number }
    // no "daysEvaluated" here — matches the source report, which only
    // shows that column for the "Meeting Target" table
  ]
}

CRITICAL — exact key names, do not substitute:
- "meetingTarget" and "belowTarget" are two SEPARATE arrays (not one array
  with a status flag) — matches the two separate tables in the source report.
- Only "meetingTarget" rows include "daysEvaluated". Do not add it to
  "belowTarget" rows, and do not omit it from "meetingTarget" rows.
- "team" is a plain string like "Team 1" — use "N/A" verbatim when the
  source report shows N/A.
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

RULES:
- A CDR goes in "meetingTarget" if they meet the benchmarkPerDay average
  overall for the period (per the source report's own classification),
  otherwise "belowTarget".
- summary.cdrsEvaluated should equal meetingTarget.length + belowTarget.length.

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, summary, meetingTarget, belowTarget.
[ ] metadata includes benchmarkPerDay as a number.
[ ] meetingTarget rows have daysEvaluated; belowTarget rows do not.
[ ] summary.cdrsEvaluated matches the combined row count.

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

---

## Reference schema (real example)

```json
{
  "metadata": {
    "reportType": "Weekly Calls Report",
    "cadence": "Weekly",
    "periodLabel": "08/03 – 08/07",
    "benchmarkPerDay": 15
  },
  "summary": {
    "cdrsEvaluated": 42,
    "meetingCoverageTarget": 4,
    "belowCoverageTarget": 38,
    "coverageRate": "9.5%"
  },
  "meetingTarget": [
    { "cdr": "Lucia Tellez", "team": "Team 1", "daysEvaluated": 5, "avgSfPerDay": 21.0, "daysBelowTarget": 0 }
  ],
  "belowTarget": [
    { "cdr": "Nicolas Soto", "team": "Team 1", "avgSfPerDay": 13.5, "daysBelowTarget": 2 }
  ]
}
```

## Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **SF Weekly Report**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/sf-weekly`.
