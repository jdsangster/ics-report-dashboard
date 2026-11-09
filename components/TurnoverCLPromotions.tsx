"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { TurnoverEvent } from "@/lib/types";
import { teamLeadOn, isCLPromotion, monthName } from "@/lib/turnoverUtils";

interface TurnoverCLPromotionsProps {
  events: TurnoverEvent[];
}

export default function TurnoverCLPromotions({ events }: TurnoverCLPromotionsProps) {
  const data = useMemo(() => {
    const promos = events.filter(isCLPromotion);
    const byMonth = new Map<string, number>();
    const byYear = new Map<string, number>();
    const byTeam = new Map<string, number>();
    for (const e of promos) {
      const m = e.date.slice(0, 7);
      byMonth.set(m, (byMonth.get(m) ?? 0) + 1);
      byYear.set(m.slice(0, 4), (byYear.get(m.slice(0, 4)) ?? 0) + 1);
      const label = `${teamLeadOn(e.team, e.date) ?? "—"} · ${e.team}`;
      byTeam.set(label, (byTeam.get(label) ?? 0) + 1);
    }
    const months = Array.from(byMonth.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
    const years = Array.from(byYear.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
    const teams = Array.from(byTeam.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return { total: promos.length, months, years, teams };
  }, [events]);

  if (data.total === 0) return null;

  const maxMonth = Math.max(...data.months.map(([, n]) => n));
  const maxTeam = data.teams[0][1];
  const avgPerMonth = (data.total / data.months.length).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={15} className="text-accent" />
          <h2 className="text-sm font-semibold text-foreground">CDR → CL Promotions</h2>
        </div>
        <p className="text-xs text-muted">
          Promotions to CL by year and month, and which team lead has produced the most.
        </p>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {data.years.map(([year, n]) => (
              <div key={year} className="rounded-lg border border-border-subtle px-4 py-3">
                <p className="text-2xl font-semibold text-success">{n}</p>
                <p className="text-xs text-muted">in {year}</p>
              </div>
            ))}
            <div className="rounded-lg border border-border-subtle px-4 py-3">
              <p className="text-2xl font-semibold text-foreground">{avgPerMonth}</p>
              <p className="text-xs text-muted">avg per month</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">Per month</p>
          <ul className="space-y-2">
            {data.months.map(([key, n]) => (
              <li key={key} className="text-xs">
                <div className="mb-1 flex justify-between">
                  <span className="text-foreground">{monthName(key)}</span>
                  <span className="font-medium text-foreground">{n}</span>
                </div>
                <div className="h-1.5 rounded-full bg-border-subtle">
                  <div className="h-1.5 rounded-full bg-success" style={{ width: `${(n / maxMonth) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">By team lead</p>
          <ul className="space-y-2">
            {data.teams.map(([team, n], i) => (
              <li key={team} className="text-xs">
                <div className="mb-1 flex justify-between gap-2">
                  <span className="text-foreground">
                    {team}
                    {i === 0 && data.teams.length > 1 && data.teams[1][1] < n && (
                      <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-medium text-gold">
                        Most promotions
                      </span>
                    )}
                  </span>
                  <span className="font-medium text-foreground">
                    {n} <span className="text-muted">({Math.round((n / data.total) * 100)}%)</span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-border-subtle">
                  <div className="h-1.5 rounded-full bg-gold" style={{ width: `${(n / maxTeam) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
