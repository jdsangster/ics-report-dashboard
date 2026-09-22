"use client";

import { motion } from "framer-motion";
import { Trophy, CheckCircle2, XCircle, Users } from "lucide-react";
import { ConversionTrackerSummary } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface ConversionSummaryCardProps {
  summary: ConversionTrackerSummary;
  sfThreshold: number;
  campThreshold: number;
}

export default function ConversionSummaryCard({
  summary,
  sfThreshold,
  campThreshold,
}: ConversionSummaryCardProps) {
  const cards = [
    {
      label: "CDRs Evaluated",
      value: formatNumber(summary.totalEvaluated),
      sub: `Min. ${sfThreshold} SF / ${campThreshold} Camp. Qualified PCs`,
      icon: Users,
      accent: "text-foreground",
    },
    {
      label: "The 70% Club",
      value: formatNumber(summary.clubCount),
      sub: "≥70% overall, both funnels qualified",
      icon: Trophy,
      accent: "text-gold",
    },
    {
      label: "Eligible",
      value: formatNumber(summary.eligibleCount),
      sub: "Qualified on volume, under 70%",
      icon: CheckCircle2,
      accent: "text-accent",
    },
    {
      label: "Below Threshold",
      value: formatNumber(summary.belowThresholdCount),
      sub: "Didn't clear volume in both funnels",
      icon: XCircle,
      accent: "text-muted",
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
