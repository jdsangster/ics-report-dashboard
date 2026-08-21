# Colombo&Hurd Reports Center

Executive reporting hub for Colombo&Hurd. A landing page lets you pick a report type; each one gets its own dashboard. Live report types today: **ICS Performance** (Daily / Weekend / Weekly inbound call metrics), **SF Weekly Report** (Short Funnel coverage vs. target, by CDR), **Total Calls Report** (weekly call volume, team/individual performance, contributors needing attention), **CL Case Review** (searchable CDR & Setter case log), and **Weekend Report** (weekend IC production, day-by-day attention matrix). More report types are added the same way as they're needed.

Built with Next.js (App Router), Tailwind CSS, and Supabase, with a password-protected internal `/admin` page for publishing new reports — no SharePoint, Power Automate, or IT dependency required to ship a new report.

Runs in two modes from a single codebase:

- **Company mode** (`NEXT_PUBLIC_DEMO_MODE=false`) — reads real reports from Supabase.
- **Portfolio / demo mode** (`NEXT_PUBLIC_DEMO_MODE=true`) — serves interactive mock data (`lib/mockData.ts`) and shows a "Demo Mode / Portfolio Preview" badge, so anyone visiting the deployed Vercel link can try the UI without any backend setup.

## How a report actually gets published

This matches the real workflow at Colombo&Hurd: the weekly ICS numbers already get exported from Power BI as Excel and turned into a written report by a Claude chat/project, which gets posted to Teams.

```
Power BI → Excel export
        │
        ▼
Claude chat/project (existing workflow)
  - Generates the narrative report for Teams, same as today
  - ALSO generates a JSON block matching that report type's schema
    (prompt templates: docs/CLAUDE_ICS_REPORT_PROMPT.md for ICS,
     docs/CLAUDE_SF_WEEKLY_PROMPT.md for SF Weekly,
     docs/CLAUDE_TOTAL_CALLS_PROMPT.md for Total Calls,
     docs/CLAUDE_WEEKEND_REPORT_PROMPT.md for Weekend,
     docs/CLAUDE_CL_CASE_REVIEW_PROMPT.md for CL Case Review — this one
     converts a raw CSV export instead of a narrative report)
        │
        ▼
/admin page (password protected)
  - Pick the report type from the dropdown, paste the JSON, click "Publicar reporte"
  - app/api/admin/publish/route.ts validates the shape for that report type
    and inserts into Supabase `reports` (report_type, cadence, period_label, data JSONB)
        │
        ▼
Supabase Postgres — `reports` table (one table, `report_type` column tells types apart)
        │
        ▼
app/api/reports/route.ts?type=<slug> (GET)
  - NEXT_PUBLIC_DEMO_MODE=true  → returns that type's mock data
  - NEXT_PUBLIC_DEMO_MODE=false → queries Supabase filtered to report_type = <slug>, newest first
        │
        ▼
app/reports/<slug>/page.tsx — fetches, filters by cadence + period, renders that report's dashboard
```

An `app/api/reports/webhook/route.ts` endpoint (API-key protected) also exists and inserts through the same shared logic — it's there for later, if this ever gets automated with Power Automate, Zapier, or a script instead of the manual paste-and-publish step. It is **not** required for the current workflow.

## Project structure

```
app/
  page.tsx                          Reports Center landing page — pick a report type
  admin/page.tsx                    Password-gated report publishing page
  reports/
    ics/page.tsx                    ICS Performance dashboard (live)
    sf-weekly/page.tsx              SF Weekly Report dashboard (live)
    total-calls/page.tsx            Total Calls Report dashboard (live)
    weekend-report/page.tsx         Weekend Report dashboard (live)
    cl-case-review/page.tsx         CL Case Review — iframe embed of public/reports/cl-case-review.html, which fetches its data from the API at runtime (live)
    [slug]/page.tsx                 "Coming soon" placeholder for not-yet-built report types
  api/
    reports/route.ts                GET ?type=<slug> — list reports of that type (mock or Supabase)
    reports/webhook/route.ts        POST — external automation ingestion, ICS only (optional, future)
    admin/login/route.ts            POST — check password, set session cookie
    admin/logout/route.ts           POST — clear session cookie
    admin/publish/route.ts          POST { reportType, payload } — publish a report (session-cookie protected)
components/
  ReportTypeCard.tsx                 Landing page report card (live / coming soon)
  ReportHeader.tsx                   Generic header: brand, cadence filter, period selector (used by every report page)
  BrandLogo.tsx                      ColomboHurd logo, used in every header
  KpiCard.tsx / TeamTotalsCard.tsx / WeekOverWeekCard.tsx / OutstandingSection.tsx /
  HighlightsSection.tsx / OrganizationalChangesCard.tsx / ConclusionCard.tsx /
  WeeklyTrendChart.tsx               ICS report components
  TotalCallsSummaryCard.tsx / TeamCallsCard.tsx / TopPerformersCard.tsx /
  AttentionCard.tsx / TeamRankingCard.tsx / CallsTakeawaysSection.tsx
                                      Total Calls report components
  WeekendSummaryCard.tsx / TeamWeekendCard.tsx / WeekendTopPerformersCard.tsx /
  WeekendAttentionCard.tsx / WeekendTeamRankingCard.tsx
                                      Weekend report components (reuses CallsTakeawaysSection + ConclusionCard)
  SFSummaryCard.tsx / SFMeetingTargetCard.tsx / SFBelowTargetCard.tsx
                                      SF Weekly report components
  admin/AdminLoginForm.tsx           Password form
  admin/AdminPublishForm.tsx         Report-type selector + JSON paste + publish form
lib/
  types.ts                           Shared TypeScript types — one payload/data interface pair per report type
  reportTypes.ts                     Registry of all report types shown on the landing page and the admin selector
  reports.ts                         Per-type payload validation + Supabase insert (used by webhook and admin publish)
  mockData.ts                        Simulated multi-period ICS reports for demo mode
  totalCallsMockData.ts              Simulated Total Calls report for demo mode
  weekendMockData.ts                 Simulated Weekend report for demo mode
  caseReviewMockData.ts              Simulated CL Case Review cases for demo mode
  sfWeeklyMockData.ts                Simulated SF Weekly report for demo mode
  supabaseClient.ts                  Server-only Supabase client (service role key)
  adminAuth.ts                       Password check + session cookie helpers
  utils.ts                           Formatting + badge/status style helpers + paragraph splitting
docs/
  CLAUDE_ICS_REPORT_PROMPT.md        Prompt template for the ICS report JSON
  CLAUDE_TOTAL_CALLS_PROMPT.md       Prompt template for the Total Calls report JSON
  CLAUDE_WEEKEND_REPORT_PROMPT.md    Prompt template for the Weekend report JSON
  CLAUDE_SF_WEEKLY_PROMPT.md         Prompt template for the SF Weekly report JSON
  CLAUDE_CL_CASE_REVIEW_PROMPT.md    Prompt template for converting the CL Case Review CSV export to JSON
```

## Report JSON schema (ICS)

This is both the `/admin` publish payload and the shape stored in Supabase's `reports.data` JSONB column. Full field-by-field reference and a real example: [`docs/CLAUDE_ICS_REPORT_PROMPT.md`](docs/CLAUDE_ICS_REPORT_PROMPT.md).

```json
{
  "metadata": {
    "reportType": "Power BI ICS Report",
    "cadence": "Weekly",
    "periodLabel": "07/27 – 08/02"
  },
  "summary": {
    "totalLabel": "Weekly Total",
    "currentValue": 1285,
    "previousValue": 1543,
    "diffText": "-258 IC (-16.7%)",
    "status": "decline"
  },
  "outstandingPerformers": [
    { "cdr": "Lucia Tellez", "team": "Team Angelo", "totalIC": 60, "workedDays": 5, "avgDay": 12.0 }
  ],
  "comparisonTable": [
    { "cdr": "Marialys Ramirez", "team": "Team Mairenis", "prevAvg": 5.6, "currentAvg": 9.8, "diff": "+4.2", "badge": "🔺" }
  ],
  "teamTotals": [
    { "team": "Team Angelo", "total": 493 },
    { "team": "Team Ruth", "total": 393 }
  ],
  "highlights": {
    "mostImproved": ["Marialys Ramirez 🔺+4.2"],
    "biggestDeclines": ["Alejandro Portillo 🔻-5.2"],
    "observations": ["Company total fell sharply..."]
  },
  "organizationalChanges": [
    { "contributor": "Joshua Schmitz", "icGenerated": 34, "status": "Confirmed promoted (excluded from team totals)" }
  ],
  "conclusion": "The operation closed Week 5 with 1,285 IC..."
}
```

`cadence` is `"Daily" | "Weekend" | "Weekly"` and drives the dynamic KPI title (`summary.totalLabel`). `badge` is one of `🔺` (green, improved), `🔻` (red, declined), `➖` (neutral, unchanged), or `New` (blue, first-time contributor). `organizationalChanges` is optional — omit it on weeks with no promotions/resignations.

## Report JSON schema (Total Calls)

Full field-by-field reference and a real example: [`docs/CLAUDE_TOTAL_CALLS_PROMPT.md`](docs/CLAUDE_TOTAL_CALLS_PROMPT.md). Top-level shape: `metadata`, `summary` (totalCalls/adjustedActiveCalls/totalICs/excludedContributors/excludedCalls), `teams` (per-team highlights + analysis), `topPerformers`, `attentionByTeam` (contributors below the daily call benchmark), `teamRanking`, `keyTakeaways` (positiveTrends/opportunities/mainAttentionPoints), and `executiveSummary`.

## Report JSON schema (Weekend)

Full field-by-field reference and a real example: [`docs/CLAUDE_WEEKEND_REPORT_PROMPT.md`](docs/CLAUDE_WEEKEND_REPORT_PROMPT.md). Top-level shape: `metadata` (includes `days`, the weekend's calendar dates — drives the attention table's column headers), `summary` (totalICs/benchmarkPerDay/leadingTeam), `teams`, `topPerformers`, `attentionByTeam` (every contributor's per-day IC count, `null` for days not worked), `teamRanking`, `keyTakeaways`, and `executiveSummary`.

## Report JSON schema (CL Case Review)

Unlike the other report types, this one is a single flat list of raw case records (no per-team breakdown, takeaways, etc.) — it powers a standalone interactive dashboard (`public/reports/cl-case-review.html`, embedded via `<iframe>` in `app/reports/cl-case-review/page.tsx`) with its own search/filter/pagination/charts. That HTML fetches its data at runtime from `GET /api/reports?type=cl-case-review` — same demo/live branching as every other report type, nothing baked in statically anymore.

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
      "description": "Hi team, I have this PC with two notes...",
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

`cadence` is a required-but-unused placeholder (this report has no real cadence concept — the field only exists because every report shares the same `reports` table schema). `link` is extracted from free text in `subject`/`description` — prefer a `pipedrive.com` URL when the text contains more than one link (e.g. alongside a Teams attachment URL), since that's the actually-useful record link.

**Publishing an update:** since the source Excel export doesn't have a stable per-row ID, each publish sends the **full current case list**, not just new rows — the newest publish simply replaces what the dashboard shows (same "latest row wins" pattern as every other report type here). Use [`docs/CLAUDE_CL_CASE_REVIEW_PROMPT.md`](docs/CLAUDE_CL_CASE_REVIEW_PROMPT.md) to convert a fresh CSV export into this JSON whenever you have new cases, then paste it into `/admin` → **CL Case Review** → **Publicar reporte**, same flow as the other report types.

## Report JSON schema (SF Weekly)

Full field-by-field reference and a real example: [`docs/CLAUDE_SF_WEEKLY_PROMPT.md`](docs/CLAUDE_SF_WEEKLY_PROMPT.md). Top-level shape: `metadata` (includes `benchmarkPerDay`, the Short Funnel/day target), `summary` (cdrsEvaluated/meetingCoverageTarget/belowCoverageTarget/coverageRate), and two separate CDR arrays — `meetingTarget` (includes `daysEvaluated`) and `belowTarget` (doesn't) — matching the two tables in the source report.

## Adding a new report type

1. Add an entry to `lib/reportTypes.ts` (slug, name, description, icon, `status: "coming-soon"`).
2. It immediately shows up on the landing page as a "Coming Soon" card, and `app/reports/[slug]/page.tsx` renders a placeholder for it automatically.
3. When you're ready to build it:
   - Define its payload/data types in `lib/types.ts` (follow the `TotalCallsPayload`/`TotalCallsData` pattern).
   - Add a validator (`isValidXPayload`) and wire it into `isValidReportPayloadFor` in `lib/reports.ts`, and add the slug to `ReportTypeSlug`.
   - Add mock data in a new `lib/<name>MockData.ts` file.
   - Build the dashboard route at `app/reports/<slug>/page.tsx` (copy `app/reports/total-calls/page.tsx` as a starting point — it fetches `/api/reports?type=<slug>` and reuses `ReportHeader`/`ConclusionCard`).
   - Add its slug to `VALID_TYPES` in `app/api/reports/route.ts`.
   - Flip its `status` to `"live"` in `lib/reportTypes.ts` — it then also appears in the `/admin` report-type dropdown automatically.
   - Write a `docs/CLAUDE_<NAME>_PROMPT.md` prompt template so the Claude chat that generates that report can output matching JSON.

## Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Used by | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_DEMO_MODE` | client + server | `true` = mock data / portfolio preview, `false` = live Supabase data |
| `NEXT_PUBLIC_SUPABASE_URL` | server | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Service role key — used only inside API routes, never sent to the browser |
| `ADMIN_PASSWORD` | server only | Password for the internal `/admin` publish page |
| `WEBHOOK_API_KEY` | server | Shared secret for the optional `/api/reports/webhook` endpoint (future automation) |

## Supabase setup

Create the `reports` table (SQL editor in the Supabase dashboard). One table holds every report type — `report_type` tells them apart:

```sql
create table reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  report_type text not null default 'ics',
  cadence text not null,
  period_label text not null,
  data jsonb not null
);

create index reports_created_at_idx on reports (created_at desc);
create index reports_report_type_idx on reports (report_type);
```

**If you already created this table before `report_type` existed** (i.e. before the Total Calls report was added), run this migration instead — it's additive and safe, existing ICS rows automatically get `report_type = 'ics'` via the default:

```sql
alter table reports add column if not exists report_type text not null default 'ics';
create index if not exists reports_report_type_idx on reports (report_type);
```

All reads/writes go through the service role key inside API routes, so Row Level Security can stay enabled with no public policies.

## Publishing a report (day-to-day workflow)

1. Export the data from Power BI as you already do.
2. Run it through your Claude report chat, using the matching prompt — [`docs/CLAUDE_ICS_REPORT_PROMPT.md`](docs/CLAUDE_ICS_REPORT_PROMPT.md) for ICS, [`docs/CLAUDE_SF_WEEKLY_PROMPT.md`](docs/CLAUDE_SF_WEEKLY_PROMPT.md) for SF Weekly, [`docs/CLAUDE_TOTAL_CALLS_PROMPT.md`](docs/CLAUDE_TOTAL_CALLS_PROMPT.md) for Total Calls, [`docs/CLAUDE_WEEKEND_REPORT_PROMPT.md`](docs/CLAUDE_WEEKEND_REPORT_PROMPT.md) for Weekend, [`docs/CLAUDE_CL_CASE_REVIEW_PROMPT.md`](docs/CLAUDE_CL_CASE_REVIEW_PROMPT.md) for CL Case Review (paste the CSV export instead of a narrative report) — so it outputs the JSON block.
3. Go to `/admin`, log in with `ADMIN_PASSWORD`.
4. Pick the matching report type from the **Tipo de reporte** dropdown.
5. Paste the JSON block, click **Publicar reporte**.
6. It appears immediately at `/reports/ics`, `/reports/sf-weekly`, `/reports/total-calls`, `/reports/weekend-report`, or `/reports/cl-case-review`.

## Local development

```bash
npm install
cp .env.example .env.local   # keep NEXT_PUBLIC_DEMO_MODE=true to run without Supabase
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test publishing locally against Supabase, set `NEXT_PUBLIC_DEMO_MODE=false` and your Supabase credentials in `.env.local`, then either use `/admin` in the browser, or hit the webhook directly:

```bash
curl -X POST http://localhost:3000/api/reports/webhook \
  -H "Content-Type: application/json" \
  -H "x-api-key: <WEBHOOK_API_KEY>" \
  -d @sample-report.json
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. In Project Settings → Environment Variables, add `NEXT_PUBLIC_DEMO_MODE`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, and `WEBHOOK_API_KEY`.
   - For the public portfolio deployment, set `NEXT_PUBLIC_DEMO_MODE=true` (Supabase vars aren't required in that case).
   - For Colombo&Hurd's real dashboard, use a separate Vercel project/environment with `NEXT_PUBLIC_DEMO_MODE=false` and real Supabase credentials.
4. Deploy, then publish your first report from `/admin`.

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons · Supabase (`@supabase/supabase-js`)
