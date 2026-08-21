"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListOrdered, ChevronDown } from "lucide-react";
import { CSSRanking } from "@/lib/types";

interface CSSRankingCardProps {
  ranking: CSSRanking;
}

const VISIBLE_COUNT = 5;

export default function CSSRankingCard({ ranking }: CSSRankingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleRows = expanded ? ranking.rows : ranking.rows.slice(0, VISIBLE_COUNT);

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
            <h2 className="text-sm font-semibold text-foreground">CDR&apos;s Rank</h2>
            <p className="text-xs text-muted">{ranking.rows.length} contributors with complaints logged</p>
          </div>
        </div>
        {ranking.rows.length > VISIBLE_COUNT && (
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
              <th className="px-5 py-3 font-medium">#</th>
              <th className="px-5 py-3 font-medium">CDR</th>
              <th className="px-5 py-3 font-medium text-right">Total</th>
              <th className="px-5 py-3 font-medium">Types of Complaints</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr
                key={row.cdr}
                className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/60"
              >
                <td className="px-5 py-2.5 text-muted">{row.rank}º</td>
                <td className="px-5 py-2.5 font-medium text-foreground">{row.cdr}</td>
                <td className="px-5 py-2.5 text-right font-medium text-foreground">
                  {row.totalComplaints}
                </td>
                <td className="px-5 py-2.5 text-xs text-muted">{row.types}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border-subtle"
          >
            <p className="px-5 py-4 text-xs leading-relaxed text-muted">{ranking.note}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
