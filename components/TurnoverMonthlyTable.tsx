"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { TurnoverEvent } from "@/lib/types";

interface TurnoverMonthlyTableProps {
  events: TurnoverEvent[];
}

function monthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function TurnoverMonthlyTable({ events }: TurnoverMonthlyTableProps) {
  const rows = useMemo(() => {
    const byMonth = new Map<string, { offboarded: number; quit: number; promoted: number }>();
    for (const e of events) {
      const key = e.date.slice(0, 7);
      const entry = byMonth.get(key) ?? { offboarded: 0, quit: 0, promoted: 0 };
      if (e.outcome === "Offboarded") entry.offboarded += 1;
      else if (e.outcome === "Quit") entry.quit += 1;
      else entry.promoted += 1;
      byMonth.set(key, entry);
    }
    return Array.from(byMonth.entries())
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([key, counts]) => ({ key, label: monthLabel(key), ...counts }));
  }, [events]);

  if (rows.length === 0) return null;

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
          <h2 className="text-sm font-semibold text-foreground">Monthly Breakdown</h2>
        </div>
        <p className="text-xs text-muted">Tracked changes by month, for context on the pattern over time.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Month</th>
              <th className="px-5 py-3 font-medium text-right">Offboarded</th>
              <th className="px-5 py-3 font-medium text-right">Quit</th>
              <th className="px-5 py-3 font-medium text-right">Promoted to CL</th>
              <th className="px-5 py-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.key}
                className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/60"
              >
                <td className="px-5 py-2.5 font-medium text-foreground">{row.label}</td>
                <td className="px-5 py-2.5 text-right text-danger">{row.offboarded}</td>
                <td className="px-5 py-2.5 text-right text-gold">{row.quit}</td>
                <td className="px-5 py-2.5 text-right text-success">{row.promoted}</td>
                <td className="px-5 py-2.5 text-right font-medium text-foreground">
                  {row.offboarded + row.quit + row.promoted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
