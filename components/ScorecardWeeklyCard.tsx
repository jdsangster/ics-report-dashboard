"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { ScorecardWeek } from "@/lib/types";

interface ScorecardWeeklyCardProps {
  weeks: ScorecardWeek[];
}

export default function ScorecardWeeklyCard({ weeks }: ScorecardWeeklyCardProps) {
  const { leads, rows } = useMemo(() => {
    const leads = Array.from(new Set(weeks.flatMap((w) => w.byLead.map((b) => b.teamLead))));
    const rows = weeks
      .map((w, i) => ({
        label: w.label,
        partial: i === weeks.length - 1,
        calls: leads.map((l) => w.byLead.find((b) => b.teamLead === l)?.calls ?? 0),
      }))
      .reverse();
    return { leads, rows };
  }, [weeks]);

  if (weeks.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="text-accent" />
          <h2 className="text-sm font-semibold text-foreground">Call Reviews per Week</h2>
        </div>
        <p className="text-xs text-muted">Calls reviewed each week, by team lead. The current week is still in progress.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Week</th>
              {leads.map((l) => (
                <th key={l} className="px-5 py-3 text-right font-medium">{l}</th>
              ))}
              <th className="px-5 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-border-subtle/60 last:border-0">
                <td className="whitespace-nowrap px-5 py-2.5 text-muted">
                  {r.label}
                  {r.partial && <span className="ml-2 text-[10px] uppercase text-accent">in progress</span>}
                </td>
                {r.calls.map((n, i) => (
                  <td key={leads[i]} className={`px-5 py-2.5 text-right ${n === 0 ? "text-muted" : "text-foreground"}`}>
                    {n}
                  </td>
                ))}
                <td className="px-5 py-2.5 text-right font-medium text-foreground">
                  {r.calls.reduce((a, b) => a + b, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
