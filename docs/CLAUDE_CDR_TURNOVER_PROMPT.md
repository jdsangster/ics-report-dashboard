# Prompt for generating the CDR Turnover Report JSON

Unlike the weekly/weekly-cadence reports, this one isn't published on a schedule — it's a running
log you update **as CDR changes happen** (an offboarding, a resignation, a promotion to CL),
one or a few at a time. There's no source export to convert; you give Claude (or whoever
generates the JSON) the new event(s), plus the full list of everything logged so far, and it
outputs the updated full JSON — same "send the whole current state" pattern as
[`CLAUDE_CL_CASE_REVIEW_PROMPT.md`](CLAUDE_CL_CASE_REVIEW_PROMPT.md).

This report tracks **what happened**, neutrally — it is not a target or quota tracker. It does
not compute or display "how many more to hit a monthly number." If your team has a monthly target
tied to this data, that's a conversation for leadership/HR to have directly — this report just
keeps an accurate, dated record of outcomes.

---

## Instruction to paste into your Claude chat

```
Add the new CDR change(s) below to the existing CDR Turnover Report JSON, then output the FULL
updated JSON (existing events + the new one(s), not just the new one). This is a strict data
contract — an automated system parses this JSON and will reject it if any key is renamed,
missing, or restructured.

New change(s) to add:
<paste the CDR name(s), team, outcome, and date here>

EXISTING JSON (paste the current full JSON here, or say "this is the first entry" if there isn't
one yet):
<paste here>

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": "CDR Turnover Report",
    "cadence": "Daily",              // fixed placeholder — this report has no real cadence
    "periodLabel": string            // "MM/DD – MM/DD" spanning the earliest to latest date
                                      // across ALL events in the list
  },
  "events": [
    {
      "cdr": string,
      "team": string,                // Titans | Lightyear | The Booking Machines | Academia
      "outcome": "Offboarded" | "Quit" | "Promoted to CL",
      "date": string,                 // ISO "YYYY-MM-DD" — when the outcome took effect
      "startDate": string,            // OPTIONAL, ISO "YYYY-MM-DD" — when the CDR started, if known
      "note": string                  // OPTIONAL — free-text context/reason
    }
  ]
}

CRITICAL — exact key names, do not substitute:
- "outcome" is one of exactly three literal strings: "Offboarded", "Quit", "Promoted to CL" — use
  "Offboarded" for involuntary exits (including "Fired"), "Quit" for voluntary resignations.
- "cadence" is always the literal string "Daily" for this report.
- Every event from prior publishes must be preserved — this isn't additive on the server side,
  the JSON you send is the full replacement.
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, events.
[ ] "events" includes every previously-logged change plus the new one(s) — nothing dropped.
[ ] Every event's "outcome" is exactly one of the three literal strings above.
[ ] periodLabel spans the earliest to latest date actually present in "events".

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

---

## Reference schema (real example)

```json
{
  "metadata": {
    "reportType": "CDR Turnover Report",
    "cadence": "Daily",
    "periodLabel": "09/18 – 09/18"
  },
  "events": [
    { "cdr": "Noraly Camargo", "team": "Titans", "outcome": "Offboarded", "date": "2026-09-18", "startDate": "2026-06-09" },
    { "cdr": "Marcio Oliveira", "team": "Lightyear", "outcome": "Promoted to CL", "date": "2026-09-18", "startDate": "2026-05-27" },
    { "cdr": "Valentina Franco", "team": "Lightyear", "outcome": "Promoted to CL", "date": "2026-09-18", "startDate": "2026-06-16" }
  ]
}
```

## Publishing it

1. Copy the full JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **CDR Turnover Report**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/cdr-turnover`.

Since there's no stable per-row ID, each publish sends the **full current event list** — the
newest publish simply replaces what the dashboard shows, same as CL Case Review.
