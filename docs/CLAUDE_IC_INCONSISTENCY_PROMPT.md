# Prompt for generating the IC Inconsistency JSON

Paste the block below into the Claude chat/project where you generate the IC Inconsistency report. Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"IC Inconsistency"** in the report type dropdown there).

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

---

## Reference schema (real example)

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

## Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **IC Inconsistency**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/ic-inconsistency`.
