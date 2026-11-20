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
      "minutes": number,               // whole minutes the CDR was in the meeting window; 0 if absent
      "excused": boolean               // OPTIONAL: true ONLY when the CDR was not there AND could not be, see EXCUSED
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

EXCUSED (schedule):
- Each ROSTER line has the CDR's work days and shift (EST). The meetings are Tuesday and Friday,
  13:00-14:00 EST, so check the weekday of "meeting.date" against the CDR's days ("Friday - Tuesday"
  wraps over the weekend; "Monday - Thursday +" means no Friday, the "+" is a weekend day).
- Set "excused": true when the CDR did NOT attend (under 90% of the window) AND that weekday is a day
  off for them, or the meeting window falls outside their shift that day. Omit "excused" otherwise.
- A CDR who attended on a day off is just present: no "excused". Breaks and lunch are never a reason.
- The dashboard leaves excused CDRs out of the attendance %, so do not mark someone who simply missed
  a meeting they were scheduled to work.

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
  you could not match to the roster, ROSTER CDRs with 0 minutes that you did NOT mark excused, and the
  ones you marked excused, so I can double check them.

ROSTER (active CDRs by team, with "days | shift in EST"):

Team Valentina (The Booking Machines):
  Alan Castellano | Mon - Wed + Fri - Sat | 12:00 PM - 8:30 PM
  Araceli Pinget | Monday - Thursday + | 12:00 PM - 8:30 PM
  Camila Aput | Monday - Friday | 9:00 AM - 5:30 PM
  Dayana Jaramillo | Monday - Thursday + | 11:00 AM - 7:30 PM
  Diego Brandan | Tuesday - Saturday | 11:00 AM - 7:30 PM
  Florencia Barria | Wednesday - Sunday | 9:00 AM - 5:30 PM
  Javier Garcia | Friday - Tuesday | Tuesday & Friday 7:30 AM - 3:00 PM
  Jesus Castillo | Tuesday - Saturday | 12:00 PM - 8:30 PM
  Kevin Perez | Friday - Tuesday | 12:00 PM - 8:30 PM
  Lucas DaSilva | Monday - Friday | 11:00 AM - 7:30 PM
  Luis Gonzalez | Wednesday - Sunday | 9:00 AM - 5:30 PM
  Marcos Villa | Tuesday - Saturday | Tue 12:30 PM - 9:00 PM; Wed 1:00 PM - 9:30 PM; Thu-Sat 12:00 PM - 8:30 PM
  Milena Ferreira | Wednesday - Sunday | 9:00 AM - 5:30 PM
  Pedro Moreno | Monday - Friday | 7:00 AM - 3:30 PM
  Renee Castillo | Monday - Friday | 9:00 AM - 5:30 PM
  Stefanny Navarro | Monday - Friday | 12:00 PM - 8:30 PM
  Ximena Lopez | Friday - Tuesday | 12:00 PM - 8:30 PM

Team Mairenis (Lightyear):
  Angel Fuquen | Wednesday - Sunday | 11:00 AM - 7:30 PM
  Ayelen Mannucci | Monday - Thursday + Saturday | 6:00 AM - 2:30 PM
  Emma Donnewald | Tuesday - Saturday | 9:00 AM - 5:30 PM
  Fernanda Fernandez | Tuesday - Saturday | 9:00 AM - 5:30 PM
  Joao Miguel Campos | Monday - Friday | 7:00 AM - 3:00 PM
  Josefina Rubino | Monday - Friday | 9:00 AM - 5:30 PM
  Juan Milano | Wednesday - Sunday | 9:00 AM - 5:30 PM
  Lihue Alvarez | Monday - Thursday + | 9:00 AM - 5:30 PM
  Malena Sosa | Wednesday - Sunday | 9:00 AM - 5:30 PM
  Marcelo Gerbeaut | Wednesday - Sunday | 9:00 AM - 5:30 PM
  Maria Camba | Monday - Friday | 9:00 AM - 5:30 PM
  Maria Josefina Boldrer | Monday - Friday | 9:00 AM - 5:30 PM
  Milagros Cudeiro | Monday - Friday | 9:00 AM - 5:30 PM
  Oriana Tuttobene | Friday - Tuesday | 12:00 PM - 8:30 PM
  Stefania Ramundo | Tuesday - Saturday | 9:00 AM - 5:30 PM
  Valentin Cruz | Wednesday - Sunday | 9:00 AM - 5:30 PM

Team Angelo (Titans):
  Agustin Mauvezin | Monday - Friday | 9:00 AM - 5:30 PM
  Ailen Leiva | Monday - Thursday + | 9:00 AM - 5:30 PM
  Alejandra Saa | Monday - Thursday + | 9:00 AM - 5:30 PM
  Allan Martins | Wednesday - Sunday | 11:00 AM - 7:30 PM
  Ianis Gavriz | Monday - Friday | 8:00 AM - 4:30 PM
  Iara Berdayes | Friday - Tuesday | 12:00 PM - 8:30 PM
  Janaina Aicardo | Monday - Thursday + | 9:00 AM - 5:30 PM
  Juan Pablo Gutierrez | Monday - Thursday + | 9:00 AM - 5:30 PM
  Katharina Thiede | Wednesday - Sunday | 11:00 AM - 7:30 PM
  Ludmila Catalan | Monday - Friday | 9:00 AM - 5:30 PM
  Martina Nasif | Wednesday - Sunday | 9:00 AM - 5:30 PM
  Melissa Katemo | Friday - Tuesday | 7:00 AM - 3:30 PM
  Melissa Salas | Monday - Thursday + | 12:00 PM - 8:30 PM
  Motunrayo Bamgbose | Monday - Friday | 7:00 AM - 3:30 PM
  Nicolas Soto | Monday - Friday | 9:00 AM - 5:30 PM
  Victoria Antunes Bueno | Friday - Tuesday | 12:00 PM - 8:30 PM

Team Martin (Academia):
  Anabella Roldan | Monday - Friday | 11:00 AM - 7:30 PM
  Elbert Arcila | Monday - Thursday + | 11:00 AM - 7:30 PM
  Joana Garcia | Wednesday - Sunday | 11:00 AM - 7:30 PM
  Joaquin Castillo | Wednesday - Sunday | 11:00 AM - 7:30 PM
  Leonardo De Rezende | Wednesday - Sunday | 11:00 AM - 7:30 PM
  Lucia Torralba | Wednesday - Sunday | 11:00 AM - 7:30 PM
  Luhanna Vegh | Monday - Thursday + | 11:00 AM - 7:30 PM
  Magali Rocio | Wednesday - Sunday | 11:00 AM - 7:30 PM
  Maria Clara Lima | Monday - Thursday + | 11:00 AM - 7:30 PM
  Richard Silva | Monday - Thursday + | 11:00 AM - 7:30 PM
  Sebastian Balao | Wednesday - Sunday | 11:00 AM - 7:30 PM
  Sebastian Estrello | Wednesday - Sunday | 11:00 AM - 7:30 PM
  Suellen Grabowski | Monday - Thursday + | 12:00 PM - 8:30 PM
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
  across all meetings, leaving out the CDRs excused by schedule, best and lowest highlighted, plus the % of each of the last six meetings.
- **CDR Attendance:** every CDR with their status in the latest meeting (Present / Left early or late
  / Absent / Excused), minutes, and their overall attendance. Defaults to the ones who missed the latest meeting.
- The "For María Antonia" section on the landing page links here as question 5.
