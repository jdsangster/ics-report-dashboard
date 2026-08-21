# Prompt for generating the CSS Analysis Report JSON

Paste the block below into the Claude chat/project where you generate the CSS Analysis Report (CDR Team). Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"Operational Complaint Analysis (CSS)"** in the report type dropdown there).

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

---

## Reference schema (real example)

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

## Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **Operational Complaint Analysis (CSS)**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/operational-complaints`.
