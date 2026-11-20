# Prompt for generating the CDR Attendance JSON

This report answers: **which team attends the CDR meetings the least?** The meetings are held twice a
week (Tuesday and Friday). After each one, export the **Zoom participants report** (the CSV named
`participants_<meeting id>_<date>.csv`) and give it to Claude together with the prompt below. One
meeting = one JSON = one publish; the dashboard stacks every published meeting and computes the
rankings itself, so the JSON only carries minutes per CDR.

Publishing the same meeting date twice replaces the earlier one (the newest publish wins), so a
corrected JSON can simply be published again.

**Keep the roster current.** Attendance is measured against the list of active CDRs, because the Zoom
file only shows who joined, not who was missing. Update the ROSTER block below whenever someone is
promoted, leaves, or joins (the team-distribution list is the source; the `Distribuition` sheet of the CDR
Scorecard workbook also keeps people who already left, so don't copy it blindly). A stale roster makes a team look
like it attends less than it really does.

---

## Instruction to paste into your Claude chat

```
Convert the attached Zoom participants CSV into a CDR Attendance JSON. This is a strict data contract
— an automated system parses this JSON and will reject it if any key is renamed, missing, or
restructured.

SCHEMA (use these exact keys, nesting, and types):

{
  "metadata": {
    "reportType": "CDR Attendance",
    "cadence": "Weekly",
    "periodLabel": string              // "MM/DD" of the meeting
  },
  "meeting": {
    "date": string,                    // ISO "YYYY-MM-DD" of the meeting
    "start": string,                   // "HH:mm" 24h — see MEETING WINDOW
    "end": string,                     // "HH:mm" 24h — see MEETING WINDOW
    "durationMinutes": number          // end minus start, in minutes
  },
  "records": [
    {
      "cdr": string,                   // the ROSTER spelling, not the Zoom display name
      "teamLead": string,              // "Angelo" | "Valentina" | "Mairenis" | "Martin"
      "minutes": number                // whole minutes the CDR was in the meeting window; 0 if absent
    }
  ]
}

MEETING WINDOW:
- The CDRs sit in the Zoom waiting room until the host admits them. Time in the waiting room is NOT
  attendance (rows with "In waiting room" = Yes only count as waiting).
- start = the moment the bulk of the CDRs were admitted (the many rows that switch from the waiting
  room to the meeting at almost the same second). end = the moment the bulk of them left.
- Round both to the minute. If the CSV makes the window unclear, ask me before answering.
- "minutes" is measured only inside [start, end]. Anything before start or after end is ignored.

HOW TO COUNT MINUTES:
1. Ignore bots and note-takers: any participant whose name contains "Notetaker", "notetaker" or
   "Fireflies". A bot joined for a person does NOT count as that person attending.
2. A person can have several rows (they left and rejoined, or were admitted from the waiting room).
   Merge the rows of the same person (same email; if no email, same name) and take the UNION of their
   time inside the window, so overlapping or back-to-back rows are not double counted.
3. Match Zoom people to the ROSTER by email and name, ignoring accents and capitalization. Zoom names
   can be shorter, longer, or in another style than the roster ("MOTUNRAYO" with mbamgbose@... is
   Motunrayo Bamgbose; "Lucas Da Silva" is Lucas DaSilva). Guests with no email are matched by name.
4. Include EVERY CDR in the ROSTER in "records": the ones that joined with their minutes, the ones that
   never joined with 0.
5. Do NOT include people who are not in the ROSTER (team leads, management, Clients Liaisons, bots).
   Never invent a CDR. If a Zoom name could be two roster CDRs, or you are not sure, ask me.

OUTPUT:
- Output ONLY the JSON block, then, below it, a short list of: the window you used, Zoom participants
  you could not match to the roster, and ROSTER CDRs with 0 minutes, so I can double check them.

ROSTER (active CDRs by team):

Team Valentina (The Booking Machines):
  Alan Castellano
  Araceli Pinget
  Camila Aput
  Dayana Jaramillo
  Diego Brandan
  Florencia Barria
  Javier Garcia
  Jesus Castillo
  Kevin Perez
  Lucas DaSilva
  Luis Gonzalez
  Marcos Villa
  Milena Ferreira
  Pedro Moreno
  Renee Castillo
  Stefanny Navarro
  Ximena Lopez

Team Mairenis (Lightyear):
  Angel Fuquen
  Ayelen Mannucci
  Emma Donnewald
  Fernanda Fernandez
  Joao Miguel Campos
  Josefina Rubino
  Juan Milano
  Lihue Alvarez
  Malena Sosa
  Marcelo Gerbeaut
  Maria Camba
  Maria Josefina Boldrer
  Milagros Cudeiro
  Oriana Tuttobene
  Stefania Ramundo
  Valentin Cruz

Team Angelo (Titans):
  Agustin Mauvezin
  Ailen Leiva
  Alejandra Saa
  Allan Martins
  Ianis Gavriz
  Iara Berdayes
  Janaina Aicardo
  Juan Pablo Gutierrez
  Katharina Thiede
  Ludmila Catalan
  Martina Nasif
  Melissa Katemo
  Melissa Salas
  Motunrayo Bamgbose
  Nicolas Soto
  Victoria Antunes Bueno

Team Martin (Academia):
  Elbert Arcila
  Leonardo De Rezende
  Lucia Torralba
  Luhanna Vegh
  Magali Rocio
  Maria Clara Lima
  Richard Silva
  Suellen Grabowski
```

---

## Example of the output (first rows only)

```json
{
  "metadata": {
    "reportType": "CDR Attendance",
    "cadence": "Weekly",
    "periodLabel": "11/17"
  },
  "meeting": {
    "date": "2026-11-17",
    "start": "13:01",
    "end": "14:00",
    "durationMinutes": 59
  },
  "records": [
    {
      "cdr": "Alan Castellano",
      "teamLead": "Valentina",
      "minutes": 59
    },
    {
      "cdr": "Araceli Pinget",
      "teamLead": "Valentina",
      "minutes": 57
    },
    {
      "cdr": "Camila Aput",
      "teamLead": "Valentina",
      "minutes": 0
    }
  ]
}
```

## What the dashboard shows

- **Attendance by Team:** each team lead's share of CDRs present (in at least **90%** of the meeting)
  across all meetings, best and lowest highlighted, plus the % of each of the last six meetings.
- **CDR Attendance:** every CDR with their status in the latest meeting (Present / Left early or late
  / Absent), minutes, and their overall attendance. Defaults to the ones who missed the latest meeting.
- The "For María Antonia" section on the landing page links here as question 5.
