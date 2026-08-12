"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, FileText, Users } from "lucide-react";
import { ReportData } from "@/lib/types";
import { formatNumber, statusTextColor } from "@/lib/utils";

interface KpiCardProps {
  report: ReportData;
}

const STATUS_ICON = {
  growth: TrendingUp,
  decline: TrendingDown,
  flat: Minus,
};

export default function KpiCard({ report }: KpiCardProps) {
  const { summary, metadata, teamTotals, outstandingPerformers } = report;
  const StatusIcon = STATUS_ICON[summary.status];

  const cards = [
    {
      label: summary.totalLabel,
      value: formatNumber(summary.currentValue),
      sub: summary.diffText,
      icon: StatusIcon,
      accent: statusTextColor(summary.status),
    },
    {
      label: "Previous Period",
      value: formatNumber(summary.previousValue),
      sub: metadata.periodLabel,
      icon: FileText,
      accent: "text-muted",
    },
    {
      label: "Teams Reporting",
      value: String(teamTotals.length),
      sub: `${teamTotals.reduce((a, t) => a + t.total, 0)} IC total`,
      icon: Users,
      accent: "text-accent",
    },
    {
      label: "Outstanding Performers",
      value: String(outstandingPerformers.length),
      sub: outstandingPerformers[0]?.cdr ?? "—",
      icon: TrendingUp,
      accent: "text-gold",
    },
  ];

  return (
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
  );
}
