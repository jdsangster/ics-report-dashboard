# Prompt for generating the Total Calls Report JSON

Paste the block below into the Claude chat/project where you generate the Weekly Calls Report. Claude should keep generating the usual narrative report, **and additionally** output a JSON block matching the schema below exactly, ready to paste into `/admin` (select **"Total Calls Report"** in the report type dropdown there).

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

---

## Reference schema (real example)

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

## Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **Total Calls Report**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/total-calls`.
