"use client";

import { motion } from "framer-motion";
import { MessageSquareWarning, TrendingUp, CalendarClock, History } from "lucide-react";
import { CSSVolumeSummary } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface CSSVolumeSummaryCardProps {
  summary: CSSVolumeSummary;
}

export default function CSSVolumeSummaryCard({ summary }: CSSVolumeSummaryCardProps) {
  const cards = [
    {
      label: "Total Complaints",
      value: formatNumber(summary.totalComplaints),
      sub: `Over ${summary.daysInPeriod} days`,
      icon: MessageSquareWarning,
      accent: "text-danger",
    },
    {
      label: "Avg / Day",
      value: summary.avgPerDay.toFixed(1),
      sub: `Prev: ${summary.previousAvgPerDay.toFixed(1)}/day`,
      icon: CalendarClock,
      accent: "text-gold",
    },
    {
      label: "Previous Week Total",
      value: formatNumber(summary.previousTotal),
      sub: "Prior period complaints",
      icon: History,
      accent: "text-muted",
    },
    {
      label: "Week-over-Week Change",
      value: `${summary.changePercent > 0 ? "+" : ""}${summary.changePercent.toFixed(1)}%`,
      sub: summary.changePercent > 0 ? "Volume increased" : "Volume decreased",
      icon: TrendingUp,
      accent: summary.changePercent > 0 ? "text-danger" : "text-success",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="rounded-xl border border-border-subtle bg-surface p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">
                {card.label}
              </span>
              <card.icon size={16} className={card.accent} />
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              {card.value}
            </div>
            <div className={`mt-1 text-xs font-medium ${card.accent}`}>{card.sub}</div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border-subtle bg-surface-elevated p-4">
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Insight</h3>
          <p className="text-sm leading-relaxed text-muted">{summary.insight}</p>
        </div>
        <div className="rounded-xl border border-border-subtle bg-surface-elevated p-4">
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Observation</h3>
          <p className="text-sm leading-relaxed text-muted">{summary.observation}</p>
        </div>
      </div>
    </div>
  );
}
