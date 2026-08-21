"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { SFCdrStat } from "@/lib/types";

interface SFBelowTargetCardProps {
  cdrs: SFCdrStat[];
}

export default function SFBelowTargetCard({ cdrs }: SFBelowTargetCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.06 }}
      className="rounded-xl border border-danger/30 bg-surface"
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle size={15} className="text-danger" />
          <h2 className="text-sm font-semibold text-foreground">
            Below Short Funnel Coverage Target
          </h2>
          <span className="rounded-full border border-danger/30 bg-danger/10 px-2 py-0.5 text-xs font-medium text-danger">
            {cdrs.length}
          </span>
        </div>
        <span className="flex shrink-0 items-center gap-2 rounded-lg border border-accent/40 bg-accent/15 px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/25">
          {expanded ? "Hide" : "Show"}
          <ChevronDown
            size={18}
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
                    <th className="px-5 py-3 font-medium text-right">Avg SF/Day</th>
                    <th className="px-5 py-3 font-medium text-right">Days Below Target</th>
                  </tr>
                </thead>
                <tbody>
                  {cdrs.map((c) => (
                    <tr
                      key={c.cdr}
                      className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/60"
                    >
                      <td className="px-5 py-2.5 font-medium text-foreground">{c.cdr}</td>
                      <td className="px-5 py-2.5 text-muted">{c.team}</td>
                      <td className="px-5 py-2.5 text-right font-medium text-danger">
                        {c.avgSfPerDay.toFixed(1)}
                      </td>
                      <td className="px-5 py-2.5 text-right text-muted">{c.daysBelowTarget}</td>
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
