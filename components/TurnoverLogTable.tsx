"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ListOrdered, ChevronDown, UserX, LogOut, TrendingUp } from "lucide-react";
import { TurnoverEvent, TurnoverOutcome } from "@/lib/types";

interface TurnoverLogTableProps {
  events: TurnoverEvent[];
}

const VISIBLE_COUNT = 10;

const OUTCOME_STYLES: Record<TurnoverOutcome, { className: string; icon: typeof UserX }> = {
  Offboarded: { className: "border-danger/30 bg-danger/10 text-danger", icon: UserX },
  Quit: { className: "border-gold/30 bg-gold/10 text-gold", icon: LogOut },
  "Promoted to CL": { className: "border-success/30 bg-success/10 text-success", icon: TrendingUp },
};

export default function TurnoverLogTable({ events }: TurnoverLogTableProps) {
  const [expanded, setExpanded] = useState(false);

  const sorted = useMemo(
    () => [...events].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [events]
  );
  const visibleRows = expanded ? sorted : sorted.slice(0, VISIBLE_COUNT);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <ListOrdered size={15} className="text-accent" />
          <div>
            <h2 className="text-sm font-semibold text-foreground">Event Log</h2>
            <p className="text-xs text-muted">{sorted.length} tracked changes, most recent first</p>
          </div>
        </div>
        {sorted.length > VISIBLE_COUNT && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-accent/40 bg-accent/15 px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/25"
          >
            {expanded ? "Hide" : "Show all"}
            <ChevronDown size={18} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <div className="overflow-x-auto border-t border-border-subtle">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">CDR</th>
              <th className="px-5 py-3 font-medium">Team</th>
              <th className="px-5 py-3 font-medium">Outcome</th>
              <th className="px-5 py-3 font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, i) => {
              const style = OUTCOME_STYLES[row.outcome];
              return (
                <tr
                  key={`${row.cdr}-${row.date}-${i}`}
                  className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/60"
                >
                  <td className="px-5 py-2.5 text-muted">{row.date}</td>
                  <td className="px-5 py-2.5 font-medium text-foreground">{row.cdr}</td>
                  <td className="px-5 py-2.5 text-muted">{row.team}</td>
                  <td className="px-5 py-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.className}`}
                    >
                      <style.icon size={11} />
                      {row.outcome}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-xs text-muted">{row.note ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
