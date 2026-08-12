# Colombo&Hurd Reports Center

Executive reporting hub for Colombo&Hurd. A landing page lets you pick a report type; each one gets its own dashboard. The first live report is **ICS Performance** (Daily / Weekend / Weekly inbound call metrics) — more report types are added the same way as they're needed.

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
  - ALSO generates a JSON block matching the schema below
    (prompt template: docs/CLAUDE_REPORT_PROMPT.md)
        │
        ▼
/admin page (password protected)
  - Paste the JSON block, click "Publicar reporte"
  - app/api/admin/publish/route.ts validates the shape and inserts
    into Supabase `reports` (cadence, period_label, data JSONB)
        │
        ▼
Supabase Postgres — `reports` table
        │
        ▼
app/api/reports/route.ts (GET)
  - NEXT_PUBLIC_DEMO_MODE=true  → returns lib/mockData.ts
  - NEXT_PUBLIC_DEMO_MODE=false → queries Supabase, newest first
        │
        ▼
app/reports/ics/page.tsx — fetches, filters by cadence + period, renders the dashboard
```

An `app/api/reports/webhook/route.ts` endpoint (API-key protected) also exists and inserts through the same shared logic — it's there for later, if this ever gets automated with Power Automate, Zapier, or a script instead of the manual paste-and-publish step. It is **not** required for the current workflow.

## Project structure

```
app/
  page.tsx                          Reports Center landing page — pick a report type
  admin/page.tsx                    Password-gated report publishing page
  reports/
    ics/page.tsx                    ICS Performance dashboard (live)
    [slug]/page.tsx                 "Coming soon" placeholder for not-yet-built report types
  api/
    reports/route.ts                GET — list reports (mock or Supabase)
    reports/webhook/route.ts        POST — external automation ingestion (optional, future)
    admin/login/route.ts            POST — check password, set session cookie
    admin/logout/route.ts           POST — clear session cookie
    admin/publish/route.ts          POST — publish a report (session-cookie protected)
components/
  ReportTypeCard.tsx                 Landing page report card (live / coming soon)
  ReportHeader.tsx                   Cadence filter + period selector (ICS dashboard)
  KpiCard.tsx                        Dynamically titled KPI tiles (Weekly/Daily/Weekend Total, etc.)
  OutstandingSection.tsx             Gold-accented cards for performers hitting the threshold
  PerformanceTable.tsx               Week-over-week comparison table + team totals bars
  OrganizationalChangesCard.tsx      Promotions / resignations table (optional section)
  ObservationsCard.tsx               Most improved / biggest declines / observations / conclusion
  admin/AdminLoginForm.tsx           Password form
  admin/AdminPublishForm.tsx         JSON paste + publish form
lib/
  types.ts                           Shared TypeScript types for the report schema
  reportTypes.ts                     Registry of all report types shown on the landing page
  reports.ts                         Shared payload validation + Supabase insert (used by webhook and admin publish)
  mockData.ts                        Simulated multi-period ICS reports for demo mode
  supabaseClient.ts                  Server-only Supabase client (service role key)
  adminAuth.ts                       Password check + session cookie helpers
  utils.ts                           Formatting + badge/status style helpers
docs/
  CLAUDE_REPORT_PROMPT.md            Prompt template to paste into your Claude report-generation chat
```

## Report JSON schema (ICS)

This is both the `/admin` publish payload and the shape stored in Supabase's `reports.data` JSONB column. Full field-by-field reference and a real example: [`docs/CLAUDE_REPORT_PROMPT.md`](docs/CLAUDE_REPORT_PROMPT.md).

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

## Adding a new report type

1. Add an entry to `lib/reportTypes.ts` (slug, name, description, icon, `status: "coming-soon"`).
2. It immediately shows up on the landing page as a "Coming Soon" card, and `app/reports/[slug]/page.tsx` renders a placeholder for it automatically.
3. When you're ready to build it: define its schema in `lib/types.ts`, add mock data, build the dashboard route (copy `app/reports/ics/page.tsx` as a starting point), flip its `status` to `"live"`.

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

Create the `reports` table (SQL editor in the Supabase dashboard):

```sql
create table reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  cadence text not null,
  period_label text not null,
  data jsonb not null
);

create index reports_created_at_idx on reports (created_at desc);
```

All reads/writes go through the service role key inside API routes, so Row Level Security can stay enabled with no public policies.

## Publishing a report (day-to-day workflow)

1. Export the data from Power BI as you already do.
2. Run it through your Claude report chat, using the prompt in [`docs/CLAUDE_REPORT_PROMPT.md`](docs/CLAUDE_REPORT_PROMPT.md) so it outputs the JSON block alongside the usual Word report.
3. Go to `/admin`, log in with `ADMIN_PASSWORD`.
4. Paste the JSON block, click **Publicar reporte**.
5. It appears immediately at `/reports/ics`.

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
