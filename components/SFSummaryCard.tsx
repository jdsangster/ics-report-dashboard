"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, Users, XCircle } from "lucide-react";
import { SFWeeklyData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface SFSummaryCardProps {
  report: SFWeeklyData;
}

export default function SFSummaryCard({ report }: SFSummaryCardProps) {
  const { summary, metadata } = report;

  const cards = [
    {
      label: "CDRs Evaluated",
      value: formatNumber(summary.cdrsEvaluated),
      sub: `Target: ${metadata.benchmarkPerDay}+ SF/day`,
      icon: Users,
      accent: "text-foreground",
    },
    {
      label: "Meeting Coverage Target",
      value: formatNumber(summary.meetingCoverageTarget),
      sub: "CDRs on pace",
      icon: CheckCircle2,
      accent: "text-success",
    },
    {
      label: "Below Coverage Target",
      value: formatNumber(summary.belowCoverageTarget),
      sub: "CDRs needing attention",
      icon: XCircle,
      accent: "text-danger",
    },
    {
      label: "Coverage Rate",
      value: summary.coverageRate,
      sub: "Of evaluated CDRs",
      icon: Target,
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
