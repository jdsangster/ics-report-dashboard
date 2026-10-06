"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarRange } from "lucide-react";
import { TurnoverEvent, isPromotion } from "@/lib/types";
import {
  MONTHLY_GOALS,
  currentMonthKey,
  goalMonthsInQuarter,
  monthName,
  quarterKey,
  quarterLabel,
  quarterRange,
  reasonOf,
} from "@/lib/turnoverUtils";

interface TurnoverQuarterlySummaryProps {
  events: TurnoverEvent[];
}

const NO_REASON = "No reason recorded";

function tally(items: string[]): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const i of items) counts.set(i, (counts.get(i) ?? 0) + 1);
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function BarList({
  rows,
  total,
  barClass,
  empty,
}: {
  rows: { label: string; count: number }[];
  total: number;
  barClass: string;
  empty: string;
}) {
  if (rows.length === 0) return <p className="text-xs text-muted">{empty}</p>;
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="text-foreground">{r.label}</span>
            <span className="shrink-0 font-medium text-foreground">
              {r.count}
              <span className="ml-1 font-normal text-muted">
                ({Math.round((r.count / total) * 100)}%)
              </span>
            </span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-surface-elevated">
            <div
              className={`h-1.5 rounded-full ${barClass}`}
              style={{ width: `${(r.count / total) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function TurnoverQuarterlySummary({ events }: TurnoverQuarterlySummaryProps) {
  const quarters = useMemo(
    () => Array.from(new Set(events.map((e) => quarterKey(e.date)))).sort().reverse(),
    [events]
  );
  const [selected, setSelected] = useState<string | null>(null);
  const active = selected && quarters.includes(selected) ? selected : quarters[0];

  const data = useMemo(() => {
    const qEvents = events.filter((e) => quarterKey(e.date) === active);
    const exits = qEvents.filter((e) => e.outcome === "Offboarded" || e.outcome === "Quit");
    const promotions = qEvents.filter((e) => isPromotion(e.outcome));

    const teams = Array.from(new Set(qEvents.map((e) => e.team))).sort();
    const byTeam = teams
      .map((team) => {
        const t = qEvents.filter((e) => e.team === team);
        return {
          team,
          offboarded: t.filter((e) => e.outcome === "Offboarded").length,
          quit: t.filter((e) => e.outcome === "Quit").length,
          promoted: t.filter((e) => isPromotion(e.outcome)).length,
          total: t.length,
        };
      })
      .sort((a, b) => b.total - a.total || a.team.localeCompare(b.team));

    return {
      total: qEvents.length,
      offboarded: qEvents.filter((e) => e.outcome === "Offboarded").length,
      quit: qEvents.filter((e) => e.outcome === "Quit").length,
      promoted: promotions.length,
      byTeam,
      exits: exits.length,
      reasons: tally(exits.map((e) => reasonOf(e) ?? NO_REASON)),
      destinations: tally(promotions.map((e) => e.outcome.replace("Promoted to ", ""))),
      goalMonths: goalMonthsInQuarter(active, currentMonthKey()),
    };
  }, [events, active]);

  if (quarters.length === 0) return null;

  const stats = [
    { label: "Total changes", value: data.total, accent: "text-foreground" },
    { label: "Offboarded", value: data.offboarded, accent: "text-danger" },
    { label: "Quit", value: data.quit, accent: "text-gold" },
    { label: "Promoted", value: data.promoted, accent: "text-success" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="flex flex-col gap-3 border-b border-border-subtle px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <CalendarRange size={15} className="text-accent" />
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Quarterly Summary · {quarterLabel(active)}
            </h2>
            <p className="text-xs text-muted">
              {quarterRange(active)} · calendar quarters, what happened and why
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 rounded-lg border border-border-subtle bg-surface p-1">
          {quarters.map((q) => (
            <button
              key={q}
              onClick={() => setSelected(q)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                q === active
                  ? "bg-accent text-white shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {quarterLabel(q)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-5 py-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border-subtle bg-surface-elevated/40 p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-muted">{s.label}</div>
            <div className={`mt-2 text-2xl font-semibold tracking-tight ${s.accent}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {data.goalMonths.length > 0 && (
        <p className="border-t border-border-subtle px-5 py-3 text-xs text-muted">
          <span className="font-medium text-foreground">Vs. monthly goals</span> (
          {data.goalMonths.map((m) => monthName(m).split(" ")[0]).join(", ")}):{" "}
          {data.promoted} of {MONTHLY_GOALS.promotions * data.goalMonths.length} promotions ·{" "}
          {data.offboarded + data.quit} of {MONTHLY_GOALS.exits * data.goalMonths.length} exits
        </p>
      )}

      <div className="grid gap-6 border-t border-border-subtle px-5 py-5 lg:grid-cols-3">
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">By team</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-muted">
                <th className="pb-2 font-medium">Team</th>
                <th className="pb-2 text-right font-medium">Off.</th>
                <th className="pb-2 text-right font-medium">Quit</th>
                <th className="pb-2 text-right font-medium">Prom.</th>
                <th className="pb-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.byTeam.map((t) => (
                <tr key={t.team} className="border-t border-border-subtle/60">
                  <td className="py-2 pr-2 text-foreground">{t.team}</td>
                  <td className="py-2 text-right text-danger">{t.offboarded}</td>
                  <td className="py-2 text-right text-gold">{t.quit}</td>
                  <td className="py-2 text-right text-success">{t.promoted}</td>
                  <td className="py-2 text-right font-medium text-foreground">{t.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Exit reasons ({data.exits})
          </h3>
          <BarList
            rows={data.reasons}
            total={data.exits}
            barClass="bg-gold"
            empty="No exits this quarter."
          />
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Promotions by role ({data.promoted})
          </h3>
          <BarList
            rows={data.destinations}
            total={data.promoted}
            barClass="bg-success"
            empty="No promotions this quarter."
          />
        </div>
      </div>
    </motion.div>
  );
}
