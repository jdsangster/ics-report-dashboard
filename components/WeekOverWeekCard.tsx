"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ComparisonRow } from "@/lib/types";
import { badgeStyles } from "@/lib/utils";

interface WeekOverWeekCardProps {
  comparisonTable: ComparisonRow[];
}

export default function WeekOverWeekCard({ comparisonTable }: WeekOverWeekCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div>
          <h2 className="text-sm font-semibold text-foreground">Week-over-Week Comparison</h2>
          <p className="text-xs text-muted">Average IC per day by contributor</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-elevated px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground">
          {expanded ? "Hide" : "Show"}
          <ChevronDown
            size={14}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border-subtle"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
                    <th className="px-5 py-3 font-medium">CDR</th>
                    <th className="px-5 py-3 font-medium">Team</th>
                    <th className="px-5 py-3 font-medium text-right">Prev Avg</th>
                    <th className="px-5 py-3 font-medium text-right">Current Avg</th>
                    <th className="px-5 py-3 font-medium text-right">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, i) => (
                    <tr
                      key={`${row.cdr}-${i}`}
                      className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/60"
                    >
                      <td className="px-5 py-3 font-medium text-foreground">{row.cdr}</td>
                      <td className="px-5 py-3 text-muted">{row.team}</td>
                      <td className="px-5 py-3 text-right text-muted">{row.prevAvg.toFixed(1)}</td>
                      <td className="px-5 py-3 text-right font-medium text-foreground">
                        {row.currentAvg.toFixed(1)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${badgeStyles(
                            row.badge
                          )}`}
                        >
                          {row.badge !== "New" && row.badge} {row.diff}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
