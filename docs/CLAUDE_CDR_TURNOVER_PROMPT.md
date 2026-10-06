# Prompt for generating the CDR Turnover Report JSON

Unlike the weekly/weekly-cadence reports, this one isn't published on a schedule — it's a running
log you update **as CDR changes happen** (an offboarding, a resignation, or a promotion to any
role), one or a few at a time, along with the reason behind each exit. There's no source export to convert;
you give Claude (or whoever
generates the JSON) the new event(s), plus the full list of everything logged so far, and it
outputs the updated full JSON — same "send the whole current state" pattern as
[`CLAUDE_CL_CASE_REVIEW_PROMPT.md`](CLAUDE_CL_CASE_REVIEW_PROMPT.md).

This report keeps an accurate, dated record of **what happened** and why. Leadership's monthly
goals (6 promotions and 3 exits — offboarded + quit — per month, from October 2026) are shown on
the dashboard next to the counts as "N of goal"; they live in `lib/turnoverUtils.ts`
(`MONTHLY_GOALS`), not in this JSON, so the JSON you generate never needs to include them.

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
      "outcome": string,              // "Offboarded" | "Quit" | "Promoted to <role>"
                                      // e.g. "Promoted to CL", "Promoted to TL"
      "date": string,                 // ISO "YYYY-MM-DD" — when the outcome took effect
      "startDate": string,            // OPTIONAL, ISO "YYYY-MM-DD" — when the CDR started, if known
      "note": string                  // OPTIONAL but strongly encouraged for "Offboarded" and
                                      // "Quit": a concise reason (e.g. "Bad performance",
                                      // "Found a better job opportunity", "Studies")
      "reasonCategory": string        // OPTIONAL but strongly encouraged for "Offboarded" and
                                      // "Quit": a SHORT label used to group reasons in the
                                      // quarterly summary, e.g. "Better job opportunity",
                                      // "Studies", "Personal family issues", "Bad performance".
                                      // Reuse the exact same label for the same kind of reason.
    }
  ]
}

CRITICAL — exact key names, do not substitute:
- "outcome" is "Offboarded" (involuntary exits, including fired for bad performance), "Quit"
  (voluntary resignations), or "Promoted to <role>" with the exact destination role spelled out
  ("Promoted to CL", "Promoted to TL", "Promoted to Operations", "Promoted to Support
  Specialist", ...). Never use "Promoted to CL" for a promotion to a different role.
- For every "Offboarded" and "Quit" event, include a short "note" with the reason when it is known
  (keep it to one or two sentences; no names of other people, no dates already in "date").
- "reasonCategory" is a short, consistent label (same wording every time for the same reason) —
  the quarterly summary counts exits by this label, falling back to "note" when it is missing.
- "cadence" is always the literal string "Daily" for this report.
- Every event from prior publishes must be preserved — this isn't additive on the server side,
  the JSON you send is the full replacement.
- Do not add a top-level "id" field — the system assigns that.
- Do not wrap the object in extra keys like "report" or "data".

Before you respond, verify your JSON against this checklist:
[ ] Top-level keys are exactly: metadata, events.
[ ] "events" includes every previously-logged change plus the new one(s) — nothing dropped.
[ ] Every event's "outcome" is "Offboarded", "Quit", or "Promoted to <role>".
[ ] Every "Offboarded" and "Quit" event has a "note" with the reason, if the reason is known.
[ ] Every "Offboarded" and "Quit" event also has a short "reasonCategory", worded consistently.
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
    "periodLabel": "08/24 – 10/01"
  },
  "events": [
    { "cdr": "Katheryn Parada", "team": "Lightyear", "outcome": "Promoted to Support Specialist", "date": "2026-10-01", "startDate": "2026-05-05" },
    { "cdr": "Camila Abran", "team": "Academia", "outcome": "Quit", "date": "2026-09-30", "startDate": "2026-08-31", "note": "Personal family issues", "reasonCategory": "Personal family issues" },
    { "cdr": "Cameron Moorcraft", "team": "Titans", "outcome": "Quit", "date": "2026-09-28", "startDate": "2026-08-17", "note": "Found a better job opportunity", "reasonCategory": "Better job opportunity" },
    { "cdr": "Marcio Oliveira", "team": "Lightyear", "outcome": "Promoted to CL", "date": "2026-09-18", "startDate": "2026-05-27" },
    { "cdr": "Noraly Camargo", "team": "Titans", "outcome": "Offboarded", "date": "2026-09-18", "startDate": "2026-06-09", "note": "Bad performance", "reasonCategory": "Bad performance" },
    { "cdr": "Valentina Mantegazza", "team": "The Booking Machines", "outcome": "Promoted to TL", "date": "2026-08-24" }
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
