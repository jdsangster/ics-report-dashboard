"use client";

import { motion } from "framer-motion";
import { PhoneCall, PhoneOutgoing, Target, Users } from "lucide-react";
import { TotalCallsData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface TotalCallsSummaryCardProps {
  report: TotalCallsData;
}

export default function TotalCallsSummaryCard({ report }: TotalCallsSummaryCardProps) {
  const { summary, teams } = report;

  const cards = [
    {
      label: "Total Calls",
      value: formatNumber(summary.totalCalls),
      sub: "Before exclusions",
      icon: PhoneCall,
      accent: "text-foreground",
    },
    {
      label: "Adjusted Active Calls",
      value: formatNumber(summary.adjustedActiveCalls),
      sub: `-${formatNumber(summary.excludedCalls)} from ${summary.excludedContributors.length} transitions`,
      icon: PhoneOutgoing,
      accent: "text-accent",
    },
    {
      label: "Total ICs",
      value: formatNumber(summary.totalICs),
      sub: "Interested calls",
      icon: Target,
      accent: "text-success",
    },
    {
      label: "Teams Reporting",
      value: String(teams.length),
      sub: `${formatNumber(summary.totalCalls)} calls total`,
      icon: Users,
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
