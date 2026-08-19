"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { TeamAttention } from "@/lib/types";

interface AttentionCardProps {
  attentionByTeam: TeamAttention[];
}

export default function AttentionCard({ attentionByTeam }: AttentionCardProps) {
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
        <div className="flex items-center gap-2">
          <AlertTriangle size={15} className="text-danger" />
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Contributors Requiring Attention
            </h2>
            <p className="text-xs text-muted">
              Benchmark: minimum of 100 calls per worked day (only days worked are shown)
            </p>
          </div>
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
            <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-2">
              {attentionByTeam.map((team) => (
                <div key={team.team}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    {team.team}
                  </h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {team.contributors.map((c) => (
                        <tr key={c.cdr} className="border-b border-border-subtle/60 last:border-0">
                          <td className="py-1.5 pr-3 align-top font-medium text-foreground">
                            {c.cdr}
                          </td>
                          <td className="py-1.5 text-right text-xs text-muted">
                            {c.belowTargetDays
                              .map((d) => `${d.date} (${d.calls})`)
                              .join(", ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
