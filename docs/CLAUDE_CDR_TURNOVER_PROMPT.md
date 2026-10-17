# Prompt for generating the CDR Turnover Report JSON

Unlike the weekly reports, this one isn't published on a schedule — it's a running log you update
**as CDR changes happen** (an offboarding, a resignation, or a promotion to any role), along with
the reason behind each exit. There's no source export to convert, and **each publish contains only
the new event(s)**: the dashboard merges every publish into one log, so you never resend (or even
look at) the existing list. This is the opposite of [`CLAUDE_CL_CASE_REVIEW_PROMPT.md`](CLAUDE_CL_CASE_REVIEW_PROMPT.md), which still needs the full list every time.

This report keeps an accurate, dated record of **what happened** and why. Leadership's monthly
goals (6 promotions and 3 exits — offboarded + quit — per month, from October 2026) are shown on
the dashboard next to the counts as "N of goal"; they live in `lib/turnoverUtils.ts`
(`MONTHLY_GOALS`), not in this JSON, so the JSON you generate never needs to include them.

---

## Instruction to paste into your Claude chat

```
Convert the new CDR change(s) below into a CDR Turnover Report JSON that contains ONLY those
events — do not include any previously logged events. This is a strict data contract — an
automated system parses this JSON and will reject it if any key is renamed, missing, or
restructured.

New change(s):
<paste the CDR name(s), team, outcome, date and reason here — a pasted spreadsheet row is fine>

SCHEMA (use these exact keys, nesting, and types):

{
  "events": [
    {
      "cdr": string,
      "team": string,                // Titans | Lightyear | The Booking Machines | Academia
      "outcome": string,              // "Offboarded" | "Quit" | "Promoted to <role>"
                                      // e.g. "Promoted to CL", "Promoted to TL"
      "date": string,                 // ISO "YYYY-MM-DD" — when the outcome took effect
      "startDate": string,            // OPTIONAL, ISO "YYYY-MM-DD" — when the CDR started, if known
      "note": string,                 // OPTIONAL but strongly encouraged for "Offboarded" and
                                      // "Quit": a concise reason (e.g. "Bad performance",
                                      // "Found a better job opportunity", "Studies")
      "reasonCategory": string,       // OPTIONAL but strongly encouraged for "Offboarded" and
                                      // "Quit": a SHORT label used to group reasons in the
                                      // quarterly summary, e.g. "Better job opportunity",
                                      // "Studies", "Personal family issues", "Bad performance".
                                      // Reuse the exact same label for the same kind of reason.
      "remove": boolean               // OPTIONAL, only to delete a previously logged event (see
                                      // CORRECTIONS below). A removal needs just cdr + outcome.
    }
  ]
}

CORRECTIONS (only when the user says an already-logged event was wrong):
- Fix a date, team, reason or start date: send the event again with the same "cdr" and the same
  "outcome" and the corrected fields. The newest publish for that cdr + outcome wins.
- Delete an event that should not be in the log: send { "cdr": "...", "outcome": "...", "remove": true }.
- Change the outcome itself (e.g. "Promoted to TL" -> "Promoted to Operations", or "Offboarded" ->
  "Quit"): send one removal for the old outcome plus the new event, in the same JSON.

CRITICAL — exact key names, do not substitute:
- The only top-level key is "events". Do NOT add "metadata", "periodLabel" or "cadence" — the system
  fills those in. Do not add a top-level "id" and do not wrap the object in "report" or "data".
- "outcome" is "Offboarded" (involuntary exits, including fired for bad performance), "Quit"
  (voluntary resignations), or "Promoted to <role>" with the exact destination role spelled out
  ("Promoted to CL", "Promoted to TL", "Promoted to Operations", "Promoted to Support
  Specialist", ...). Never use "Promoted to CL" for a promotion to a different role.
- For every "Offboarded" and "Quit" event, include a short "note" with the reason when it is known
  (keep it to one or two sentences; no names of other people, no dates already in "date").
- "reasonCategory" is a short, consistent label (same wording every time for the same reason) —
  the quarterly summary counts exits by this label, falling back to "note" when it is missing.
- Spell each CDR's name exactly as it appears in the spreadsheet, every time: corrections and
  removals match on the name (case-insensitive) plus the outcome.

Before you respond, verify your JSON against this checklist:
[ ] The only top-level key is "events", and it lists ONLY the new/corrected/removed events.
[ ] Every event's "outcome" is "Offboarded", "Quit", or "Promoted to <role>".
[ ] Every "Offboarded" and "Quit" event has a "note" and a short "reasonCategory", if the reason is known.
[ ] Dates are ISO "YYYY-MM-DD".

Output ONLY a single fenced JSON code block. No explanation before or after it.
```

---

## Reference schema (real examples)

One new promotion:

```json
{
  "events": [
    { "cdr": "Laura Bracalenti", "team": "Lightyear", "outcome": "Promoted to CL", "date": "2026-10-16", "startDate": "2026-05-05" }
  ]
}
```

A resignation with its reason:

```json
{
  "events": [
    { "cdr": "Camila Abran", "team": "Academia", "outcome": "Quit", "date": "2026-09-30", "startDate": "2026-08-31", "note": "Personal family issues", "reasonCategory": "Personal family issues" }
  ]
}
```

A correction (new date for an event already logged) plus a removal:

```json
{
  "events": [
    { "cdr": "Florencia Santos", "team": "Titans", "outcome": "Promoted to CL", "date": "2026-10-16", "startDate": "2026-05-05" },
    { "cdr": "Patricia Gomez", "outcome": "Quit", "remove": true }
  ]
}
```

## Publishing it

1. Copy the JSON block Claude generated.
2. Go to `/admin`, log in.
3. In **Tipo de reporte**, select **CDR Turnover Report**.
4. Paste the JSON and click **Publicar reporte**.
5. It appears immediately at `/reports/cdr-turnover`.

## How the log is assembled

The dashboard rebuilds the log from every publish, oldest first, so publishing is just "append":

- An events-only JSON (like the ones above) is an **additive** publish: new events are added on top
  of the current log.
- Same CDR + same outcome as an existing event → the newest publish replaces it (that's how a
  correction works, instead of creating a duplicate). `"remove": true` deletes it.
- The period label ("MM/DD – MM/DD") is computed from the events — never write it yourself.
- **Older publishes keep working.** A JSON that still has the old `metadata` block plus the
  complete event list is treated as a full reset (everything before it is replaced by that list),
  so use that form only if you ever need to rebuild the whole log from scratch.
