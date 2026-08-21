# Prompt for generating the IC and Show Up Rate JSON

Paste the block below into the Claude chat/project where you generate the ICS Ratio Ranking report. Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"IC and Show Up Rate"** in the report type dropdown there).

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

---

## Reference schema (real example)

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

## Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **IC and Show Up Rate**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/ic-show-up-rate`.
