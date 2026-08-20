"use client";

import { motion } from "framer-motion";
import { CalendarDays, Target, Trophy, Users } from "lucide-react";
import { WeekendData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface WeekendSummaryCardProps {
  report: WeekendData;
}

export default function WeekendSummaryCard({ report }: WeekendSummaryCardProps) {
  const { summary, teams } = report;

  const cards = [
    {
      label: "Total ICs",
      value: formatNumber(summary.totalICs),
      sub: "Weekend total",
      icon: CalendarDays,
      accent: "text-foreground",
    },
    {
      label: "Benchmark",
      value: `${summary.benchmarkPerDay}`,
      sub: "ICs per worked day",
      icon: Target,
      accent: "text-accent",
    },
    {
      label: "Leading Team",
      value: summary.leadingTeam.replace("Team ", ""),
      sub: "Highest IC production",
      icon: Trophy,
      accent: "text-gold",
    },
    {
      label: "Teams Reporting",
      value: String(teams.length),
      sub: `${formatNumber(summary.totalICs)} ICs total`,
      icon: Users,
      accent: "text-success",
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
