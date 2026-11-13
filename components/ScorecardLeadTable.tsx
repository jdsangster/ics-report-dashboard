"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { ScorecardCdr, ScorecardWeek } from "@/lib/types";
import { leadStats } from "@/lib/scorecardUtils";

interface ScorecardLeadTableProps {
  cdrs: ScorecardCdr[];
  weeks: ScorecardWeek[];
}

export default function ScorecardLeadTable({ cdrs, weeks }: ScorecardLeadTableProps) {
  const stats = useMemo(() => leadStats(cdrs, weeks), [cdrs, weeks]);
  if (stats.length === 0) return null;

  const hasTop = stats.length > 1 && stats[0].coveragePct > stats[1].coveragePct;
  const lowest = stats[stats.length - 1];
  const hasLowest = stats.length > 1 && lowest.coveragePct < stats[stats.length - 2].coveragePct;
  const fmt = (n: number | null) => (n === null ? "–" : Number.isInteger(n) ? String(n) : n.toFixed(1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <Crown size={15} className="text-gold" />
          <h2 className="text-sm font-semibold text-foreground">Team Lead Management</h2>
        </div>
        <p className="text-xs text-muted">
          Ranked by coverage: the share of each lead&apos;s CDRs that have at least one call review logged.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Team lead</th>
              <th className="px-5 py-3 font-medium">Coverage</th>
              <th className="px-5 py-3 text-right font-medium">CDRs</th>
              <th className="px-5 py-3 text-right font-medium">Up to date</th>
              <th className="px-5 py-3 text-right font-medium">Never reviewed</th>
              <th className="px-5 py-3 text-right font-medium">Reviews logged</th>
              <th className="px-5 py-3 text-right font-medium">Last full week</th>
              <th className="px-5 py-3 text-right font-medium">Avg / week</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((s, i) => (
              <tr key={s.lead} className="border-b border-border-subtle/60 last:border-0">
                <td className="px-5 py-3">
                  <span className="font-medium text-foreground">{s.lead}</span>
                  {s.team && <span className="ml-2 text-xs text-muted">{s.team}</span>}
                  {i === 0 && hasTop && (
                    <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-medium text-gold">
                      Most hands-on
                    </span>
                  )}
                  {s.lead === lowest.lead && hasLowest && (
                    <span className="ml-2 rounded-full bg-danger/15 px-2 py-0.5 text-[10px] font-medium text-danger">
                      Lowest coverage
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-28 rounded-full bg-border-subtle">
                      <div className="h-1.5 rounded-full bg-gold" style={{ width: `${s.coveragePct}%` }} />
                    </div>
                    <span className="text-xs text-foreground">
                      {Math.round(s.coveragePct)}% <span className="text-muted">({s.reviewed}/{s.cdrs})</span>
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-right text-muted">{s.cdrs}</td>
                <td className="px-5 py-3 text-right text-success">
                  {s.upToDate} <span className="text-muted">({Math.round(s.upToDatePct)}%)</span>
                </td>
                <td className="px-5 py-3 text-right text-danger">{s.notReviewed}</td>
                <td className="px-5 py-3 text-right text-foreground">{s.totalCalls}</td>
                <td className="px-5 py-3 text-right text-foreground">{fmt(s.lastFullWeekCalls)}</td>
                <td className="px-5 py-3 text-right text-foreground">{fmt(s.avgPerWeek)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
