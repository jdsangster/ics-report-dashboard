# ICS Operations Dashboard

Executive dashboard that visualizes Daily, Weekend, and Weekly performance reports (ICS) automatically extracted from `.docx` / `.pdf` files uploaded to SharePoint. Built with Next.js (App Router), Tailwind CSS, and Supabase, with a zero-IT-dependency ingestion path via Power Automate.

Runs in two modes from a single codebase:

- **Company mode** (`NEXT_PUBLIC_DEMO_MODE=false`) — reads real reports from Supabase.
- **Portfolio / demo mode** (`NEXT_PUBLIC_DEMO_MODE=true`) — serves interactive mock data (`lib/mockData.ts`) and shows a "Demo Mode / Portfolio Preview" badge, so anyone visiting the deployed Vercel link can try the UI without any backend setup.

## Architecture

```
SharePoint (.docx / .pdf upload)
        │
        ▼
Power Automate flow
  1. Trigger: "When a file is created" on the target SharePoint library
  2. Parse the document (Word/PDF connector or AI Builder) into the JSON shape below
  3. HTTP POST → https://<your-app>.vercel.app/api/reports/webhook
     Headers: x-api-key: <WEBHOOK_API_KEY>
        │
        ▼
Next.js API Route — app/api/reports/webhook/route.ts
  - Validates the x-api-key header
  - Validates the payload shape
  - Inserts a row into Supabase `reports` (cadence, period_label, data JSONB)
        │
        ▼
Supabase Postgres — `reports` table
        │
        ▼
Next.js API Route — app/api/reports/route.ts
  - NEXT_PUBLIC_DEMO_MODE=true  → returns lib/mockData.ts
  - NEXT_PUBLIC_DEMO_MODE=false → queries Supabase, newest first
        │
        ▼
app/page.tsx (Client Component)
  - Fetches /api/reports, filters by cadence + period, renders the dashboard
```

## Project structure

```
app/
  page.tsx                       Dashboard shell: fetch, filter, compose sections
  api/
    reports/route.ts             GET — list reports (mock or Supabase)
    reports/webhook/route.ts     POST — receive a report from Power Automate
components/
  ReportHeader.tsx                Cadence filter + period selector
  KpiCard.tsx                     Dynamically titled KPI tiles (Weekly/Daily/Weekend Total, etc.)
  OutstandingSection.tsx          Gold-accented cards for performers hitting the threshold
  PerformanceTable.tsx            Week-over-week comparison table + team totals bars
  ObservationsCard.tsx            Most improved / biggest declines / observations / conclusion
lib/
  types.ts                        Shared TypeScript types for the report schema
  mockData.ts                     Simulated multi-period reports for demo mode
  supabaseClient.ts                Server-only Supabase client (service role key)
  utils.ts                        Formatting + badge/status style helpers
```

## Report JSON schema

This is both the Power Automate webhook payload and the shape stored in Supabase's `reports.data` JSONB column:

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
  "conclusion": "The operation closed Week 5 with 1,285 IC..."
}
```

`cadence` is `"Daily" | "Weekend" | "Weekly"` and drives the dynamic KPI title (`summary.totalLabel`). `badge` is one of `🔺` (green, improved), `🔻` (red, declined), `➖` (neutral, unchanged), or `New` (blue, first-time contributor).

## Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Used by | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_DEMO_MODE` | client + server | `true` = mock data / portfolio preview, `false` = live Supabase data |
| `NEXT_PUBLIC_SUPABASE_URL` | server | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Service role key — used only inside API routes, never sent to the browser |
| `WEBHOOK_API_KEY` | server | Shared secret Power Automate sends as the `x-api-key` header |

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

The webhook route uses the service role key, so Row Level Security can stay enabled with no public policies — only server-side requests using the service role key can read/write.

## Power Automate flow setup

1. **Trigger**: "When a file is created (properties only)" on the SharePoint document library that receives the Weekly/Daily/Weekend report.
2. **Extract content**: use the Word/PDF connector (or AI Builder / a parsing step) to pull the metrics into the JSON shape above. Map cadence from the filename or a SharePoint column, and compute `diffText`, `badge`, and `status` in a Compose/Select step.
3. **HTTP action**:
   - Method: `POST`
   - URI: `https://<your-app>.vercel.app/api/reports/webhook`
   - Headers: `x-api-key: <WEBHOOK_API_KEY>`, `Content-Type: application/json`
   - Body: the JSON payload from step 2
4. Optional: add a "Condition" + "Send an email" step on non-2xx responses to alert you if a report fails to ingest.

## Local development

```bash
npm install
cp .env.example .env.local   # keep NEXT_PUBLIC_DEMO_MODE=true to run without Supabase
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test the webhook locally against Supabase, set `NEXT_PUBLIC_DEMO_MODE=false` and your Supabase credentials in `.env.local`, then:

```bash
curl -X POST http://localhost:3000/api/reports/webhook \
  -H "Content-Type: application/json" \
  -H "x-api-key: <WEBHOOK_API_KEY>" \
  -d @sample-report.json
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. In Project Settings → Environment Variables, add `NEXT_PUBLIC_DEMO_MODE`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `WEBHOOK_API_KEY`.
   - For the public portfolio deployment, set `NEXT_PUBLIC_DEMO_MODE=true` (Supabase vars aren't required in that case).
   - For your company's real dashboard, use a separate Vercel project/environment with `NEXT_PUBLIC_DEMO_MODE=false` and real Supabase credentials.
4. Deploy. Point the Power Automate HTTP action at the resulting `https://<project>.vercel.app/api/reports/webhook` URL.

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons · Supabase (`@supabase/supabase-js`)
