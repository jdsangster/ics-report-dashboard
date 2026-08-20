# Prompt for generating the Weekend Report JSON

Paste the block below into the Claude chat/project where you generate the Weekend IC Report. Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"Weekend Report"** in the report type dropdown there).

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

---

## Reference schema (real example)

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

## Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **Weekend Report**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/weekend-report`.
