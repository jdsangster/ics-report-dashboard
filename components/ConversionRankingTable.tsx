"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ListOrdered, ChevronDown, Trophy, ArrowUp, ArrowDown, Minus, Sparkles } from "lucide-react";
import { ConversionTrackerCdr, ConversionStatus } from "@/lib/types";

export interface ConversionTrend {
  /** null when there's no previous published report to compare against. */
  deltaPct: number | null;
  isNew: boolean;
}

interface ConversionRankingTableProps {
  cdrs: ConversionTrackerCdr[];
  trends: Record<string, ConversionTrend>;
}

const VISIBLE_COUNT = 15;

const STATUS_STYLES: Record<ConversionStatus, { label: string; className: string }> = {
  "70club": { label: "🏆 70% Club", className: "border-gold/30 bg-gold/10 text-gold" },
  eligible: { label: "Eligible", className: "border-accent/30 bg-accent/10 text-accent" },
  "below-threshold": { label: "Below threshold", className: "border-border-subtle bg-surface-elevated text-muted" },
};

function TrendBadge({ trend }: { trend: ConversionTrend | undefined }) {
  if (!trend || trend.isNew) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
        <Sparkles size={12} /> New
      </span>
    );
  }
  if (trend.deltaPct === null) {
    return <span className="text-xs text-muted">—</span>;
  }
  if (Math.abs(trend.deltaPct) < 0.05) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
        <Minus size={12} /> 0.0pp
      </span>
    );
  }
  const up = trend.deltaPct > 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${up ? "text-success" : "text-danger"}`}
    >
      {up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      {up ? "+" : ""}
      {trend.deltaPct.toFixed(1)}pp
    </span>
  );
}

export default function ConversionRankingTable({ cdrs, trends }: ConversionRankingTableProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleRows = expanded ? cdrs : cdrs.slice(0, VISIBLE_COUNT);

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
            <h2 className="text-sm font-semibold text-foreground">CDR Ranking</h2>
            <p className="text-xs text-muted">
              {cdrs.length} CDRs evaluated, sorted by overall conversion — every CDR is listed,
              not just those who qualify.
            </p>
          </div>
        </div>
        {cdrs.length > VISIBLE_COUNT && (
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
              <th className="px-5 py-3 font-medium">Team</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Overall %</th>
              <th className="px-5 py-3 font-medium text-right">SF %</th>
              <th className="px-5 py-3 font-medium text-right">Camp %</th>
              <th className="px-5 py-3 font-medium text-right">vs. Last Week</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, i) => {
              const status = STATUS_STYLES[row.status];
              return (
                <tr
                  key={row.cdr}
                  className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/60"
                >
                  <td className="px-5 py-2.5 text-muted">{i + 1}</td>
                  <td className="px-5 py-2.5 font-medium text-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      {row.status === "70club" && <Trophy size={13} className="text-gold" />}
                      {row.cdr}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-muted">{row.team}</td>
                  <td className="px-5 py-2.5">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <div className="font-semibold text-foreground">{row.overallPct.toFixed(1)}%</div>
                    <div className="text-xs text-muted">
                      {row.icsOverall}/{row.qualifiedPCsOverall}
                    </div>
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <div className="text-foreground">{row.sfPct.toFixed(1)}%</div>
                    <div className="text-xs text-muted">
                      {row.icsSF}/{row.qualifiedPCsSF}
                    </div>
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <div className="text-foreground">{row.campPct.toFixed(1)}%</div>
                    <div className="text-xs text-muted">
                      {row.icsCamp}/{row.qualifiedPCsCamp}
                    </div>
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <TrendBadge trend={trends[row.cdr]} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
