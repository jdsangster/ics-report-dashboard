# Prompt for generating the CL Case Review JSON

Unlike the other four reports, this one isn't a narrative weekly report you already
generate — it's built directly from the raw "CL and Setter Case Review (Report
Control)" CSV export (columns: Date, Sender, Subject, Description, CDR, TL, "Type of
complain", "Column1"=category, Year, Month, Day, "Qualification Sub-Issue"). Paste the
block below into any Claude chat along with that CSV whenever you have a fresh export,
and it will convert it into the exact JSON the dashboard expects, ready to paste into
`/admin` (select **"CL Case Review"** in the report type dropdown there).

---

## Instruction to paste into your Claude chat (attach the CSV export with it)

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

---

## Reference schema (real example)

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

## Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **CL Case Review**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/cl-case-review`.

Since the source export has no stable per-row ID, each publish sends the **full
current case list** — the newest publish simply replaces what the dashboard shows.
