# Prompt for generating the CDR Scorecard JSON

This report turns the **CDR Scorecard workbook** (`01 - CDR Scorecard.xlsx`) into a snapshot of how
each team lead is reviewing their CDRs' calls: coverage per lead, reviews per week, and which CDRs
are overdue. Publish a new snapshot whenever you want the dashboard refreshed (weekly is typical).
The dashboard computes every ranking itself, so the JSON only carries the raw per-CDR rows and the
weekly counts.

The workbook has a `DASHBOARD` sheet (one row per CDR: last review date, reviews logged, days since
last review, status, team leader), one sheet per CDR (one row per reviewed call, with the date in
column A), and a `Distribuition` sheet (CDR → team → team lead). Attach the workbook (or a PDF/CSV
export of those sheets) to the chat together with the prompt below.

---

## Instruction to paste into your Claude chat

```
Convert the attached CDR Scorecard workbook into a CDR Scorecard JSON. This is a strict data
contract — an automated system parses this JSON and will reject it if any key is renamed, missing,
or restructured.

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": "CDR Scorecard",
    "cadence": "Weekly",
    "periodLabel": string              // "MM/DD – MM/DD": the Monday–Sunday week of "asOf"
  },
  "asOf": string,                      // ISO "YYYY-MM-DD" — the date the workbook was read
  "cdrs": [
    {
      "cdr": string,                   // full name; see NAMES below
      "teamLead": string,              // "Angelo" | "Valentina" | "Mairenis" | "Martin"
      "callsReviewed": number,         // total reviews logged for this CDR (DASHBOARD "Calls reviewed")
      "lastReviewed": string,          // OPTIONAL, ISO date of the latest review; omit if never reviewed
      "daysSinceReview": number,       // OPTIONAL, days between lastReviewed and "asOf"; omit if never reviewed
      "status": string                 // "Up to date" | "Outdated" | "Not reviewed" — copied from DASHBOARD
    }
  ],
  "weeks": [                           // the last 8 Monday–Sunday weeks, OLDEST FIRST; the last one is the
    {                                  // current week (still in progress)
      "label": string,                 // "MM/DD – MM/DD"
      "byLead": [
        { "teamLead": string, "calls": number }   // one entry per team lead, 0 when none
      ]
    }
  ]
}

RULES:
- Include only CDRs listed under a team lead on the DASHBOARD sheet (Valentina, Mairenis, Angelo,
  Team 4). Skip the "NO TEAM" group (former CDRs).
- "Team 4" is led by Martin: write "teamLead": "Martin". The other three use their first name.
- "callsReviewed", "status", "lastReviewed" and "daysSinceReview" come straight from the DASHBOARD
  sheet — do not recalculate them. Convert Excel date serials to ISO dates.
- NAMES: the DASHBOARD sheet often has only a first name ("Jesus"). Use the full name from the
  `Distribuition` sheet when exactly one entry matches; otherwise keep the DASHBOARD name as is.
  Never invent a surname.
- "weeks": count each row of every CDR's own sheet (column A, "Date of call reviewed") in the
  Monday–Sunday week it falls in, and add it to that CDR's team lead. Ignore blank or non-date rows.
  The sum over all weeks can be lower than the sum of "callsReviewed" (older reviews).
- Do not add keys that are not in the schema (no recovered-CDR counts, missed dispositions, etc.).

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly metadata, asOf, cdrs, weeks.
[ ] No CDR from the "NO TEAM" group is included.
[ ] Every "status" is "Up to date", "Outdated", or "Not reviewed".
[ ] A CDR with callsReviewed 0 has no lastReviewed / daysSinceReview.
[ ] "weeks" has 8 entries, oldest first, each with one byLead entry per team lead.
[ ] Dates are ISO "YYYY-MM-DD"; labels are "MM/DD – MM/DD".

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

---

## Reference schema (excerpt)

```json
{
  "metadata": { "reportType": "CDR Scorecard", "cadence": "Weekly", "periodLabel": "11/09 – 11/15" },
  "asOf": "2026-11-13",
  "cdrs": [
    { "cdr": "Jesus Castillo", "teamLead": "Valentina", "callsReviewed": 14, "status": "Up to date", "lastReviewed": "2026-10-22", "daysSinceReview": 22 },
    { "cdr": "Alicia Romano", "teamLead": "Valentina", "callsReviewed": 0, "status": "Not reviewed" }
  ],
  "weeks": [
    {
      "label": "11/02 – 11/08",
      "byLead": [
        { "teamLead": "Angelo", "calls": 2 },
        { "teamLead": "Valentina", "calls": 5 },
        { "teamLead": "Mairenis", "calls": 7 },
        { "teamLead": "Martin", "calls": 12 }
      ]
    }
  ]
}
```

## Publishing it

1. Copy the JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **CDR Scorecard**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/cdr-scorecard`. Each publish is a new snapshot; the period
   selector in the header switches between them.

## What the dashboard shows

- **Team Lead Management:** each lead ranked by *coverage* — the share of their CDRs with at least
  one review logged — plus up-to-date share, never-reviewed CDRs, reviews logged, reviews in the
  last full week, and the average per week.
- **Call Reviews per Week:** the 8 weeks, by team lead.
- **CDR Review Status:** every CDR, filterable by team lead and status, never-reviewed first.
