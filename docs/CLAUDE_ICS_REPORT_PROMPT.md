# Prompt for generating the ICS report JSON

Paste the block below into the Claude chat/project where you already upload the Power BI Excel export — either as a permanent instruction for that chat/project, or right after you ask for the weekly report. Claude should keep generating the usual Word/Teams report, **and additionally** output a JSON block in the exact format the dashboard expects, ready to paste into `/admin`.

This prompt is written to be strict on purpose — a previous attempt produced JSON with the wrong field names (`name` instead of `cdr`, a flat `period` instead of nested `metadata.periodLabel`, etc.), which the dashboard rejected. The instructions below spell out the exact keys and explicitly list the mistakes to avoid.

---

## Instruction to paste into your Claude chat

```
In addition to the narrative report you always generate, output a JSON block
that matches the schema below EXACTLY. This is a strict data contract, not a
style guide — an automated system parses this JSON and will reject it if any
key is renamed, missing, restructured, or spelled differently. Do not "improve"
or reword the field names, even if a different name feels more natural.

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": string,        // e.g. "Power BI ICS Report"
    "cadence": "Weekly" | "Daily" | "Weekend",
    "periodLabel": string        // e.g. "07/27 – 08/02"
  },
  "summary": {
    "totalLabel": string,        // "Weekly Total" | "Daily Total" | "Weekend Total"
    "currentValue": number,
    "previousValue": number,
    "diffText": string,          // e.g. "-258 IC (-16.7%)" — ONE combined string
    "status": "growth" | "decline" | "flat"
  },
  "outstandingPerformers": [
    { "cdr": string, "team": string, "totalIC": number, "workedDays": number, "avgDay": number }
  ],
  "comparisonTable": [
    { "cdr": string, "team": string, "prevAvg": number, "currentAvg": number, "diff": string, "badge": "🔺" | "🔻" | "➖" | "New" }
  ],
  "teamTotals": [
    { "team": string, "total": number }
  ],
  "highlights": {
    "mostImproved": string[],    // e.g. "Marialys Ramirez 🔺+4.2"
    "biggestDeclines": string[],
    "observations": string[]     // REQUIRED — do not omit this array
  },
  "organizationalChanges": [     // OPTIONAL — omit the whole key if there were none this period
    { "contributor": string, "icGenerated": number, "status": string }
  ],
  "conclusion": string           // if long, separate into 2-4 short paragraphs
                                  // using a blank line ("\n\n") between them
}

CRITICAL — exact key names, do not substitute:
- Person's name is always "cdr" in outstandingPerformers and comparisonTable —
  never "name".
- Person's name is "contributor" in organizationalChanges — never "name".
- metadata.periodLabel — never a top-level "period" field.
- summary.diffText is ONE string combining the diff and percentage —
  never separate "diff" (number) and "diffPercent" fields.
- teamTotals uses "total" — never "totalIC" or "totalCalls".
- highlights.observations is REQUIRED. It must always be present with at
  least 2-4 entries, even if you also write it in the narrative report.
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

RULES:
- "cadence" is "Weekly", "Daily", or "Weekend" based on the report period.
- "totalLabel" must match cadence: "Weekly Total", "Daily Total", or "Weekend Total".
- summary.status is "growth" if currentValue > previousValue, "decline" if
  lower, "flat" if equal.
- comparisonTable[].badge:
  - "🔺" when diff is positive
  - "🔻" when diff is negative
  - "➖" when diff is exactly 0.0
  - "New" when the contributor had no prevAvg last period (prevAvg: 0)
- comparisonTable[].diff is a signed string, e.g. "+4.2", "-5.2", "0.0", or
  the literal string "New" when badge is "New".
- outstandingPerformers includes only contributors with avgDay >= 10.0.
- highlights.mostImproved / biggestDeclines: up to 5 each, formatted exactly
  like the narrative report ("Name 🔺+X.X").

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, summary, outstandingPerformers,
    comparisonTable, teamTotals, highlights, conclusion (+ organizationalChanges
    if applicable) — no other top-level keys.
[ ] metadata is a nested object with reportType, cadence, periodLabel.
[ ] Every person in outstandingPerformers and comparisonTable uses "cdr".
[ ] Every person in organizationalChanges uses "contributor".
[ ] summary has a single "diffText" string, not separate diff/diffPercent.
[ ] teamTotals items use "total".
[ ] highlights.observations is present and non-empty.

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

---

## Reference schema (with a real example based on Week 5)

```json
{
  "metadata": {
    "reportType": "Power BI ICS Report",
    "cadence": "Weekly",
    "periodLabel": "07/27 – 08/02"
  },
  "summary": {
    "totalLabel": "Weekly Total",
    "currentValue": 1285,
    "previousValue": 1543,
    "diffText": "-258 IC (-16.7%)",
    "status": "decline"
  },
  "outstandingPerformers": [
    { "cdr": "Lucia Tellez", "team": "Team Angelo", "totalIC": 60, "workedDays": 5, "avgDay": 12.0 }
  ],
  "comparisonTable": [
    { "cdr": "Marialys Ramirez", "team": "Team Mairenis", "prevAvg": 5.6, "currentAvg": 9.8, "diff": "+4.2", "badge": "🔺" },
    { "cdr": "Ianis Gavriz", "team": "Team Angelo", "prevAvg": 7.8, "currentAvg": 7.8, "diff": "0.0", "badge": "➖" },
    { "cdr": "Alejandro Portillo", "team": "Team Angelo", "prevAvg": 13.8, "currentAvg": 8.6, "diff": "-5.2", "badge": "🔻" },
    { "cdr": "Diego Brandan", "team": "Team Ruth", "prevAvg": 0, "currentAvg": 6.5, "diff": "New", "badge": "New" }
  ],
  "teamTotals": [
    { "team": "Team Angelo", "total": 493 },
    { "team": "Team Ruth", "total": 393 },
    { "team": "Team Mairenis", "total": 387 },
    { "team": "Team Martin", "total": 12 }
  ],
  "highlights": {
    "mostImproved": ["Marialys Ramirez 🔺+4.2", "Valentina Mateluna 🔺+1.4"],
    "biggestDeclines": ["Alejandro Portillo 🔻-5.2", "Salome Gutierrez 🔻-5.2"],
    "observations": [
      "Company total fell sharply to 1,285 IC (-16.7%), the steepest weekly drop of the period.",
      "Only one contributor (Lucia Tellez, 12.0 avg) hit the Outstanding threshold this week."
    ]
  },
  "organizationalChanges": [
    { "contributor": "Joshua Schmitz", "icGenerated": 34, "status": "Confirmed promoted (excluded from team totals)" },
    { "contributor": "Santiago Peralta", "icGenerated": 21, "status": "Confirmed resigned (excluded from team totals)" }
  ],
  "conclusion": "The operation closed Week 5 with 1,285 IC, a 16.7% decline from Week 4..."
}
```

**Fields and types:**

| Field | Type | Notes |
| --- | --- | --- |
| `metadata.cadence` | `"Weekly" \| "Daily" \| "Weekend"` | Drives the main KPI title |
| `metadata.periodLabel` | string | The date range as it appears in the report |
| `summary.status` | `"growth" \| "decline" \| "flat"` | Colors the KPI (green/red/gray) |
| `comparisonTable[].badge` | `"🔺" \| "🔻" \| "➖" \| "New"` | Colors the badge in the table |
| `organizationalChanges` | array, **optional** | Omit entirely if there were no changes this period |

## Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `https://ics-report-dashboard.vercel.app/admin` (or `http://localhost:3000/admin` locally).
3. Log in with the admin password.
4. Paste the JSON into the text box and click **Publicar reporte**.
5. The report appears immediately on the dashboard (`/reports/ics`).

If the JSON doesn't match the schema, the page shows an error explaining what's missing or wrong — nothing broken gets published to the dashboard.

## If it still comes out wrong

If your Claude chat keeps drifting from the schema (renaming fields, dropping `observations`, etc.), the most reliable fix is pasting the **entire instruction block above** fresh into the conversation right before asking for that week's report, rather than relying on it as a saved/background instruction — long chat histories can cause earlier instructions to get deprioritized.
