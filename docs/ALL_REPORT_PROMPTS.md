# All Report Prompts — Colombo&Hurd Reports Center

This is a single combined reference containing every `docs/CLAUDE_*_PROMPT.md` file in this repo — one prompt template per report type, each one a strict instruction block you paste into the Claude chat/project that already generates that report, so it also outputs a matching JSON block ready to paste into `/admin`.

Each report type still has its own standalone file in `docs/` (linked below) — this file just puts them all in one place for quick reference. If you only need one report type's prompt, the standalone file is lighter to work with; use this one when you want the full picture or need to hand the whole set to someone else.

## Contents

1. [ICS Performance Report](#1-ics-performance-report) — [`docs/CLAUDE_ICS_REPORT_PROMPT.md`](CLAUDE_ICS_REPORT_PROMPT.md)
2. [SF Weekly Report](#2-sf-weekly-report) — [`docs/CLAUDE_SF_WEEKLY_PROMPT.md`](CLAUDE_SF_WEEKLY_PROMPT.md)
3. [Total Calls Report](#3-total-calls-report) — [`docs/CLAUDE_TOTAL_CALLS_PROMPT.md`](CLAUDE_TOTAL_CALLS_PROMPT.md)
4. [IC and Show Up Rate](#4-ic-and-show-up-rate) — [`docs/CLAUDE_IC_SHOW_UP_RATE_PROMPT.md`](CLAUDE_IC_SHOW_UP_RATE_PROMPT.md)
5. [IC Inconsistency](#5-ic-inconsistency) — [`docs/CLAUDE_IC_INCONSISTENCY_PROMPT.md`](CLAUDE_IC_INCONSISTENCY_PROMPT.md)
6. [Operational Complaint Analysis (CSS)](#6-operational-complaint-analysis-css) — [`docs/CLAUDE_CSS_ANALYSIS_PROMPT.md`](CLAUDE_CSS_ANALYSIS_PROMPT.md)
7. [CL Case Review](#7-cl-case-review) — [`docs/CLAUDE_CL_CASE_REVIEW_PROMPT.md`](CLAUDE_CL_CASE_REVIEW_PROMPT.md)
8. [Weekend Report](#8-weekend-report) — [`docs/CLAUDE_WEEKEND_REPORT_PROMPT.md`](CLAUDE_WEEKEND_REPORT_PROMPT.md)

Publishing is the same last step for all eight: copy the JSON block Claude generates, go to `/admin`, log in, pick the matching report type from **Tipo de reporte**, paste the JSON, click **Publicar reporte**. It appears immediately on that report's dashboard page.

---

## 1. ICS Performance Report

Paste the block below into the Claude chat/project where you already upload the Power BI Excel export — either as a permanent instruction for that chat/project, or right after you ask for the weekly report. Claude should keep generating the usual Word/Teams report, **and additionally** output a JSON block in the exact format the dashboard expects, ready to paste into `/admin`.

This prompt is written to be strict on purpose — a previous attempt produced JSON with the wrong field names (`name` instead of `cdr`, a flat `period` instead of nested `metadata.periodLabel`, etc.), which the dashboard rejected. The instructions below spell out the exact keys and explicitly list the mistakes to avoid.

### Instruction to paste into your Claude chat

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

### Reference schema (with a real example based on Week 5)

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

### Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `https://ics-report-dashboard.vercel.app/admin` (or `http://localhost:3000/admin` locally).
3. Log in with the admin password.
4. Paste the JSON into the text box and click **Publicar reporte**.
5. The report appears immediately on the dashboard (`/reports/ics`).

If the JSON doesn't match the schema, the page shows an error explaining what's missing or wrong — nothing broken gets published to the dashboard.

**If it still comes out wrong:** if your Claude chat keeps drifting from the schema (renaming fields, dropping `observations`, etc.), the most reliable fix is pasting the **entire instruction block above** fresh into the conversation right before asking for that week's report, rather than relying on it as a saved/background instruction — long chat histories can cause earlier instructions to get deprioritized.

---

## 2. SF Weekly Report

Paste the block below into the Claude chat/project where you generate the Short Funnel weekly report. Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"SF Weekly Report"** in the report type dropdown there).

### Instruction to paste into your Claude chat

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

### Reference schema (real example)

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

### Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **SF Weekly Report**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/sf-weekly`.

---

## 3. Total Calls Report

Paste the block below into the Claude chat/project where you generate the Weekly Calls Report. Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"Total Calls Report"** in the report type dropdown there).

### Instruction to paste into your Claude chat

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
    "periodLabel": string        // e.g. "08/10 – 08/16"
  },
  "summary": {
    "totalCalls": number,              // before excluding transitioned-out contributors
    "adjustedActiveCalls": number,     // after excluding them
    "totalICs": number,
    "excludedContributors": string[],  // names of contributors who transitioned out mid-period
    "excludedCalls": number            // combined calls removed by excluding them
  },
  "teams": [
    {
      "team": string,
      "totalCalls": number,
      "totalICs": number,
      "highlights": [
        { "cdr": string, "calls": number, "ics": number }
      ],
      "analysis": string           // 1-3 sentence narrative for this team
    }
  ],
  "topPerformers": [
    { "rank": number, "cdr": string, "team": string, "calls": number }
  ],
  "attentionByTeam": [
    {
      "team": string,
      "contributors": [
        {
          "cdr": string,
          "belowTargetDays": [
            { "date": string, "calls": number }   // date as it appears in the source, e.g. "11/08"
          ]
        }
      ]
    }
  ],
  "teamRanking": [
    { "rank": number, "team": string, "calls": number, "ics": number }
  ],
  "keyTakeaways": {
    "positiveTrends": string[],
    "opportunities": string[],
    "mainAttentionPoints": string[]
  },
  "executiveSummary": string      // if long, separate into 2-4 short paragraphs
                                   // using a blank line ("\n\n") between them
}

CRITICAL — exact key names, do not substitute:
- Person's name is always "cdr" — never "name" or "teammate".
- "teams" (plural, array) — each team's roster highlights go under "highlights".
- "attentionByTeam" groups contributors by "team", each with a "contributors"
  array; each contributor's underperforming days go under "belowTargetDays"
  as { "date", "calls" } pairs — never a single combined string.
- "teamRanking" is separate from "teams" — it's just rank/team/calls/ics for
  the summary ranking table, in whatever order the source ranks them (do not
  re-sort it yourself even if the raw call totals look out of order — the
  source report's own ranking logic may weigh things beyond raw calls).
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

RULES:
- "cadence" is "Weekly", "Daily", or "Weekend" based on the report period.
- Only include contributors in "topPerformers" who are ranked in the source
  report's top-performers list (typically top 10).
- "attentionByTeam" only includes contributors who had at least one day below
  the minimum-calls-per-day benchmark, and only their below-target days (not
  every day they worked).
- teams with no below-target contributors that period can be omitted from
  "attentionByTeam", or included with an empty "contributors" array.

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, summary, teams, topPerformers,
    attentionByTeam, teamRanking, keyTakeaways, executiveSummary — no others.
[ ] Every person uses "cdr", never "name" or "teammate".
[ ] Each team in "teams" has highlights (array) and analysis (string).
[ ] "attentionByTeam" nests contributors -> belowTargetDays as {date, calls}.
[ ] keyTakeaways has all three arrays: positiveTrends, opportunities,
    mainAttentionPoints — even if one is empty ([]).

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

### Reference schema (real example)

```json
{
  "metadata": {
    "reportType": "Weekly Calls Report",
    "cadence": "Weekly",
    "periodLabel": "08/10 – 08/16"
  },
  "summary": {
    "totalCalls": 24074,
    "adjustedActiveCalls": 22069,
    "totalICs": 1273,
    "excludedContributors": ["Lucia Tellez", "Lionel Katemo", "Salome Gutierrez", "Martin Caneva", "Joaquin Zarate"],
    "excludedCalls": 1375
  },
  "teams": [
    {
      "team": "Team Angelo",
      "totalCalls": 7292,
      "totalICs": 461,
      "highlights": [
        { "cdr": "Iara Berdayes", "calls": 658, "ics": 1 },
        { "cdr": "Nicolas Soto", "calls": 644, "ics": 50 }
      ],
      "analysis": "Team Angelo posted the strongest IC total of the operation. Nicolas Soto led in conversion efficiency (50 ICs)."
    }
  ],
  "topPerformers": [
    { "rank": 1, "cdr": "Marcio Oliveira", "team": "Team Mairenis", "calls": 834 },
    { "rank": 2, "cdr": "Ximena Lopez", "team": "Team Ruth", "calls": 796 }
  ],
  "attentionByTeam": [
    {
      "team": "Team Angelo",
      "contributors": [
        { "cdr": "Alejandro Portillo", "belowTargetDays": [{ "date": "11/08", "calls": 85 }, { "date": "13/08", "calls": 88 }] }
      ]
    }
  ],
  "teamRanking": [
    { "rank": 1, "team": "Team Mairenis", "calls": 6951, "ics": 372 },
    { "rank": 2, "team": "Team Angelo", "calls": 7292, "ics": 461 }
  ],
  "keyTakeaways": {
    "positiveTrends": ["The active operation generated 22,069 calls and 1,273 ICs this week."],
    "opportunities": ["Team Martin's coverage remains thin, with 8 of 16 members showing zero activity this week."],
    "mainAttentionPoints": ["Jesus Castillo had a sharp mid-week drop (2 calls on 12/08) after a strong start."]
  },
  "executiveSummary": "The operation generated 24,074 calls for the week of August 10–16..."
}
```

### Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **Total Calls Report**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/total-calls`.

---

## 4. IC and Show Up Rate

Paste the block below into the Claude chat/project where you generate the ICS Ratio Ranking report. Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"IC and Show Up Rate"** in the report type dropdown there).

### Instruction to paste into your Claude chat

```
In addition to the narrative report you always generate, output a JSON block
that matches the schema below EXACTLY. This is a strict data contract — an
automated system parses this JSON and will reject it if any key is renamed,
missing, or restructured.

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": "ICS Ratio Ranking",
    "cadence": "Weekly" | "Daily" | "Weekend",
    "periodLabel": string           // e.g. "06/01 – 06/07"
  },
  "summary": {
    "description": string,          // the short line describing what this
                                     // metric measures (usually fixed text)
    "teamSnapshot": string[]        // the bullet list under "Team Snapshot"
  },
  "tiers": [
    {
      "key": "elite" | "high" | "solid" | "opportunity" | "critical",
      "label": string,               // e.g. "Elite Level"
      "rangeLabel": string,          // e.g. "90%+", "80% - 89.99%", "<60%"
      "note": string,                // the fixed descriptive note for that tier
      "cdrs": [
        { "cdr": string, "ratio": number }   // ratio as a plain number, e.g. 93.75 (not "93.75%")
      ]
    }
  ],
  "narrative": string               // the closing message paragraph(s), joined
                                     // with "\n\n" between paragraphs
}

CRITICAL — exact key names, do not substitute:
- "tiers" is ALWAYS exactly 5 entries, in this fixed order, using these exact
  "key" values:
  1. key="elite", label="Elite Level", rangeLabel="90%+"
  2. key="high", label="High Performance", rangeLabel="80% - 89.99%"
  3. key="solid", label="Solid Base", rangeLabel="70% - 79.99%"
  4. key="opportunity", label="Opportunity Area", rangeLabel="60% - 69.99%"
  5. key="critical", label="Critical Opportunity Area", rangeLabel="<60%"
- Include all 5 tiers even if a tier's "cdrs" array is empty for that period.
- "ratio" is a number (e.g. 93.75), never a string and never including "%".
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

RULES:
- Sort each tier's "cdrs" array descending by "ratio" (highest first) —
  matches how the source report lists them.
- "narrative" should combine every closing paragraph from the source report
  into one string, with "\n\n" between paragraphs.

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, summary, tiers, narrative.
[ ] tiers has exactly 5 entries with the fixed key/label/rangeLabel values above.
[ ] Every CDR's "ratio" is a plain number, not a string.
[ ] summary.teamSnapshot contains the bullet points as separate strings.

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

### Reference schema (real example)

```json
{
  "metadata": {
    "reportType": "ICS Ratio Ranking",
    "cadence": "Weekly",
    "periodLabel": "06/01 – 06/07"
  },
  "summary": {
    "description": "This metric shows how effective you are after qualifying. This is where intention turns into action.",
    "teamSnapshot": [
      "4 CDRs achieved Elite Level performance (90%+)."
    ]
  },
  "tiers": [
    {
      "key": "elite",
      "label": "Elite Level",
      "rangeLabel": "90%+",
      "note": "Outstanding execution. These teammates consistently convert qualified opportunities into successful next steps and set the benchmark for the team.",
      "cdrs": [
        { "cdr": "Ioshua Schmitz", "ratio": 93.75 }
      ]
    }
  ],
  "narrative": "The first week of June showed excellent conversion performance across the board.\n\nLet's build on this momentum, continue sharing best practices, and maintain the consistency that drives outstanding results."
}
```

### Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **IC and Show Up Rate**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/ic-show-up-rate`.

---

## 5. IC Inconsistency

Paste the block below into the Claude chat/project where you generate the IC Inconsistency report. Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"IC Inconsistency"** in the report type dropdown there).

### Instruction to paste into your Claude chat

```
In addition to the narrative report you always generate, output a JSON block
that matches the schema below EXACTLY. This is a strict data contract — an
automated system parses this JSON and will reject it if any key is renamed,
missing, or restructured.

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": "IC Inconsistency",
    "cadence": "Daily" | "Weekend" | "Weekly",
    "periodLabel": string            // e.g. "08/13"
  },
  "contributors": [
    {
      "cdr": string,
      "biCount": number,             // IC count as reported in Power BI
      "excelCount": number,          // IC count as logged in Excel
      "issues": string[]             // one entry per discrepancy/case note,
                                      // plain sentences, no bullet markers
    }
  ],
  "narrative": string                // OPTIONAL — omit the key entirely if
                                      // there's no closing summary this period
}

CRITICAL — exact key names, do not substitute:
- Only include a contributor in "contributors" if their BI count and Excel
  count actually differ (or otherwise has a flagged disposition issue) — this
  report is a discrepancy log, not a full roster.
- "issues" entries are full sentences describing what went wrong (missing
  disposition, duplicate contact, wrong tag used instead of a disposition,
  etc.) and who it affected — write them the same way you already describe
  these cases, just as plain strings in the array.
- "biCount" and "excelCount" are plain numbers, never strings.
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, contributors, and optionally narrative.
[ ] Every contributor has cdr, biCount, excelCount (numbers), and issues (array of strings).
[ ] Only contributors with an actual BI/Excel mismatch or disposition issue are included.

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

### Reference schema (real example)

```json
{
  "metadata": {
    "reportType": "IC Inconsistency",
    "cadence": "Daily",
    "periodLabel": "08/13"
  },
  "contributors": [
    {
      "cdr": "Luis Ramirez",
      "biCount": 18,
      "excelCount": 15,
      "issues": [
        "Doesn't reflect in Excel for Claudia Manriquez.",
        "Missing ICS disposition for Guillermo Fernandez.",
        "Marked IC twice, once in Sales Dialer and once in Just Call, for Luis Carlos Valenzuela Orci."
      ]
    }
  ]
}
```

### Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **IC Inconsistency**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/ic-inconsistency`.

---

## 6. Operational Complaint Analysis (CSS)

Paste the block below into the Claude chat/project where you generate the CSS Analysis Report (CDR Team). Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"Operational Complaint Analysis (CSS)"** in the report type dropdown there).

### Instruction to paste into your Claude chat

```
In addition to the narrative report you always generate, output a JSON block
that matches the schema below EXACTLY. This is a strict data contract — an
automated system parses this JSON and will reject it if any key is renamed,
missing, or restructured.

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": "CSS Analysis Report (CDR Team)",
    "cadence": "Weekly" | "Daily" | "Weekend",
    "periodLabel": string          // e.g. "August 6 – August 12"
  },
  "volumeSummary": {
    "totalComplaints": number,
    "avgPerDay": number,
    "daysInPeriod": number,
    "previousTotal": number,
    "previousAvgPerDay": number,
    "changePercent": number,        // e.g. 95.2 for a +95.2% w/w change
    "insight": string,
    "observation": string
  },
  "distribution": {
    "rows": [
      { "category": string, "previousShare": number, "currentShare": number, "trend": string }
    ],
    "insight": string,
    "observation": string
  },
  "secondaryCategories": {
    "rows": [
      { "category": string, "previousShare": number, "currentShare": number, "trend": string }
    ],
    "insight": string,
    "positiveFindings": string,
    "operationalConcerns": string
  },
  "ranking": {
    "rows": [
      { "rank": number, "cdr": string, "totalComplaints": number, "types": string }
    ],
    "note": string
  },
  "conclusion": {
    "volume": string,
    "structure": string,
    "positiveResults": string[],
    "operationalRisks": string[]
  }
}

CRITICAL — exact key names, do not substitute:
- "previousShare" / "currentShare" are plain numbers representing a percent,
  e.g. 48 for "48%" — never include the "%" sign, never a string.
- "trend" is the free-text trend cell exactly as written in the source report
  (e.g. "⬆ Increase", "⬇ Eliminated", "— Stable (share), but absolute count
  doubled") — keep the leading arrow/dash symbol, it drives the UI color.
- "distribution.rows" covers the main "Complaint Distribution" table;
  "secondaryCategories.rows" covers the separate "Secondary Categories
  Behavior" table — do not merge them into one array.
- "ranking.rows" is ordered by rank ascending (1 = most complaints, using
  the source report's own tie-break rules) and "types" is the full
  "Types of Complaints" cell as one string (e.g. "1 General Complaint, 1 WA
  Call Requested").
- Exclude any row explicitly marked as excluded from ranking (e.g. a "None"
  contributor placeholder) per the source report's standing rules — note why
  in "ranking.note" if relevant.
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, volumeSummary, distribution, secondaryCategories, ranking, conclusion.
[ ] Every previousShare/currentShare is a plain number, no "%" sign.
[ ] ranking.rows is sorted by rank ascending and excludes any explicitly-excluded contributor.
[ ] conclusion.positiveResults and conclusion.operationalRisks are arrays of full sentences, not a single string.

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

### Reference schema (real example)

```json
{
  "metadata": {
    "reportType": "CSS Analysis Report (CDR Team)",
    "cadence": "Weekly",
    "periodLabel": "August 6 – August 12"
  },
  "volumeSummary": {
    "totalComplaints": 41,
    "avgPerDay": 5.9,
    "daysInPeriod": 7,
    "previousTotal": 21,
    "previousAvgPerDay": 3.0,
    "changePercent": 95.2,
    "insight": "Previous week total: 21 complaints...",
    "observation": "Complaint volume nearly doubled this week..."
  },
  "distribution": {
    "rows": [
      { "category": "WA Call Requested", "previousShare": 48, "currentShare": 49, "trend": "— Stable (share), but absolute count doubled" }
    ],
    "insight": "WA Call Requested held its share...",
    "observation": "While several operational categories improved..."
  },
  "secondaryCategories": {
    "rows": [
      { "category": "Unq PC - Nurturing", "previousShare": 5, "currentShare": 15, "trend": "⬆ Significant increase" }
    ],
    "insight": "Unq PC - Nurturing tripled its share...",
    "positiveFindings": "No Correct Information or Bad Review Social Media cases were reported...",
    "operationalConcerns": "The Unq PC - Nurturing increase is spread across multiple CDRs..."
  },
  "ranking": {
    "rows": [
      { "rank": 1, "cdr": "Laura Bracalenti", "totalComplaints": 4, "types": "1 General Complaint, 1 WA Call Requested, 1 Late Call / Early Call, 1 Unq PC - Unq Nurturing" }
    ],
    "note": "Within the 4-complaint tier, Laura Bracalenti ranks first due to..."
  },
  "conclusion": {
    "volume": "Complaint volume increased sharply...",
    "structure": "WA Call Requested remained the dominant category...",
    "positiveResults": ["Assistance requests fully eliminated (14% → 0%)."],
    "operationalRisks": ["Overall complaint volume nearly doubled, the primary concern this week."]
  }
}
```

### Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **Operational Complaint Analysis (CSS)**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/operational-complaints`.

---

## 7. CL Case Review

Unlike the other reports, this one isn't a narrative weekly report you already generate — it's built directly from the raw "CL and Setter Case Review (Report Control)" CSV export (columns: Date, Sender, Subject, Description, CDR, TL, "Type of complain", "Column1"=category, Year, Month, Day, "Qualification Sub-Issue"). Paste the block below into any Claude chat along with that CSV whenever you have a fresh export, and it will convert it into the exact JSON the dashboard expects, ready to paste into `/admin` (select **"CL Case Review"** in the report type dropdown there).

### Instruction to paste into your Claude chat (attach the CSV export with it)

```
Convert the attached CSV export into a JSON object that matches this schema EXACTLY.
This is a strict data contract — an automated system parses this JSON and will reject
it if any key is renamed, missing, or restructured.

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": "CL Case Review",
    "cadence": "Daily",              // fixed placeholder — this report has no real
                                      // cadence, but the field is required
    "periodLabel": string            // "MM/DD – MM/DD" spanning the earliest to
                                      // latest Date in the CSV
  },
  "cases": [
    {
      "date": string,                // ISO "YYYY-MM-DD", converted from the CSV's
                                      // "M/D/YYYY" Date column
      "datetime": string,            // "YYYY-MM-DD 00:00" (just date + " 00:00")
      "sender": string,               // CSV "Sender", whitespace/newlines collapsed
      "subject": string,              // CSV "Subject", whitespace/newlines collapsed
      "description": string,          // CSV "Description", whitespace/newlines collapsed
      "cdr": string,                  // CSV "CDR"
      "tl": string,                   // CSV "TL"
      "type": string,                 // CSV "Type of complain"
      "category": string,             // CSV "Column1"
      "year": number,                 // parsed from the Date column
      "month": number,                // parsed from the Date column (1-12)
      "day": number,                  // parsed from the Date column
      "link": string                  // see link extraction rule below
    }
  ]
}

CRITICAL — exact key names, do not substitute:
- Every field in "cases" is required (use "" for a genuinely empty text field —
  never omit the key).
- "cadence" is always the literal string "Daily" for this report.
- Ignore the CSV's "Qualification Sub-Issue" column — it isn't part of this schema.
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

LINK EXTRACTION RULE:
- Search the combined "subject" + " " + "description" text for any http(s) URLs.
- If more than one URL is present, prefer a pipedrive.com URL over any other
  (e.g. a graph.microsoft.com Teams attachment URL) — the Pipedrive link is the
  actually-useful record link.
- If no URL is found in the text, use "".
- Strip trailing punctuation from URLs (e.g. a trailing "." or ")").

ROW HANDLING:
- Collapse all whitespace/newlines in subject/description to single spaces and trim.
- Skip (silently drop) any row missing a Date or Sender, or whose Date can't be
  parsed as M/D/YYYY — don't fail the whole conversion over one bad row.

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, cases.
[ ] Every case has all 13 fields listed above, with the correct types.
[ ] Links prefer pipedrive.com when multiple URLs are present in a case's text.
[ ] periodLabel spans the earliest to latest date actually present in "cases".

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

### Reference schema (real example)

```json
{
  "metadata": {
    "reportType": "CL Case Review",
    "cadence": "Daily",
    "periodLabel": "06/01 – 08/20"
  },
  "cases": [
    {
      "date": "2026-06-01",
      "datetime": "2026-06-01 00:00",
      "sender": "Barbara Kloss",
      "subject": "No case?",
      "description": "Hi team, I have this PC with two notes the same day at the same time from different CDRs...",
      "cdr": "Diego Brandan",
      "tl": "Ruth",
      "type": "CRM/System Issue",
      "category": "System Error",
      "year": 2026,
      "month": 6,
      "day": 1,
      "link": "https://colombohurd.pipedrive.com/activities/list/user/24824722?selected=2008886&tab=person"
    }
  ]
}
```

### Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **CL Case Review**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/cl-case-review`.

Since the source export has no stable per-row ID, each publish sends the **full current case list** — the newest publish simply replaces what the dashboard shows.

---

## 8. Weekend Report

Paste the block below into the Claude chat/project where you generate the Weekend IC Report. Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"Weekend Report"** in the report type dropdown there).

### Instruction to paste into your Claude chat

```
In addition to the narrative report you always generate, output a JSON block
that matches the schema below EXACTLY. This is a strict data contract — an
automated system parses this JSON and will reject it if any key is renamed,
missing, or restructured.

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": string,        // e.g. "Weekend IC Report"
    "cadence": "Weekend",
    "periodLabel": string,       // e.g. "08/15 – 08/16"
    "days": string[]             // the weekend's two calendar dates, e.g. ["15/08", "16/08"]
                                  // — used as the attention-table column headers (IC 15, IC 16)
  },
  "summary": {
    "totalICs": number,
    "benchmarkPerDay": number,   // e.g. 10
    "leadingTeam": string        // e.g. "Team Mairenis"
  },
  "teams": [
    {
      "team": string,
      "totalICs": number,
      "highlights": [
        { "cdr": string, "ics": number }
      ],
      "analysis": string           // 1-3 sentence narrative for this team
    }
  ],
  "topPerformers": [
    { "rank": number, "cdr": string, "team": string, "ics": number }
  ],
  "attentionByTeam": [
    {
      "team": string,
      "contributors": [
        {
          "cdr": string,
          "days": [
            { "date": string, "ics": number | null }
            // one entry per date in metadata.days, SAME ORDER for every
            // contributor. Use null (not 0, not "—") when they didn't work
            // that day.
          ]
        }
      ]
    }
  ],
  "teamRanking": [
    { "rank": number, "team": string, "ics": number }
  ],
  "keyTakeaways": {
    "positiveTrends": string[],
    "opportunities": string[],
    "mainAttentionPoints": string[]
  },
  "executiveSummary": string      // if long, separate into 2-4 short paragraphs
                                   // using a blank line ("\n\n") between them
}

CRITICAL — exact key names, do not substitute:
- Person's name is always "cdr" — never "name" or "teammate".
- "cadence" is always the literal string "Weekend" for this report.
- metadata.days is an array of the two (or more) weekend dates as they
  appear in the source, e.g. "15/08" — not full dates, not day names.
- attentionByTeam's per-contributor "days" array must have the SAME LENGTH
  and SAME ORDER as metadata.days, one entry per date, using "date" + "ics".
  A day the contributor didn't work is "ics": null — never omit the entry
  or use 0 (0 means they worked and produced zero; null means no shift).
- "teamRanking" is separate from "teams" — just rank/team/ics for the
  summary ranking table.
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

RULES:
- attentionByTeam includes the full roster shown in the source's
  "Contributors Requiring Attention" table for each team — this table in
  the source already shows every tracked contributor's day-by-day ICs
  (not just below-benchmark ones), so mirror it as-is.
- Only include contributors in "topPerformers" who are ranked in the
  source's top-performers list.

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, summary, teams, topPerformers,
    attentionByTeam, teamRanking, keyTakeaways, executiveSummary — no others.
[ ] metadata.days has one short date string per day of the weekend.
[ ] Every person uses "cdr", never "name" or "teammate".
[ ] Every contributor's "days" array matches metadata.days in length/order,
    using null (not 0 or "—") for days not worked.
[ ] keyTakeaways has all three arrays: positiveTrends, opportunities,
    mainAttentionPoints — even if one is empty ([]).

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

### Reference schema (real example)

```json
{
  "metadata": {
    "reportType": "Weekend IC Report",
    "cadence": "Weekend",
    "periodLabel": "08/15 – 08/16",
    "days": ["15/08", "16/08"]
  },
  "summary": {
    "totalICs": 162,
    "benchmarkPerDay": 10,
    "leadingTeam": "Team Mairenis"
  },
  "teams": [
    {
      "team": "Team Angelo",
      "totalICs": 56,
      "highlights": [
        { "cdr": "Juan Pablo Gutierrez", "ics": 15 },
        { "cdr": "Martina Nasif", "ics": 14 }
      ],
      "analysis": "Juan Pablo Gutierrez was the only contributor on the team to clear the 10-ICs/day benchmark."
    }
  ],
  "topPerformers": [
    { "rank": 1, "cdr": "Juan Pablo Gutierrez", "team": "Team Angelo", "ics": 15 },
    { "rank": 2, "cdr": "Martina Nasif", "team": "Team Angelo", "ics": 14 }
  ],
  "attentionByTeam": [
    {
      "team": "Team Angelo",
      "contributors": [
        { "cdr": "Martina Nasif", "days": [{ "date": "15/08", "ics": 10 }, { "date": "16/08", "ics": 4 }] },
        { "cdr": "Iara Berdayes", "days": [{ "date": "15/08", "ics": null }, { "date": "16/08", "ics": 1 }] }
      ]
    }
  ],
  "teamRanking": [
    { "rank": 1, "team": "Team Mairenis", "ics": 59 },
    { "rank": 2, "team": "Team Angelo", "ics": 56 }
  ],
  "keyTakeaways": {
    "positiveTrends": ["The active operation generated 162 ICs during the weekend."],
    "opportunities": ["Team Martin's coverage remains thin — only 2 of 16 current members show activity this weekend."],
    "mainAttentionPoints": ["Ximena Lopez had a sharp swing from 2 ICs Saturday to 9 Sunday."]
  },
  "executiveSummary": "Under the updated team roster, the weekend of August 15–16 closed with 162 active ICs..."
}
```

### Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **Weekend Report**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/weekend-report`.
