"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { LogOut, UserX, TrendingUp } from "lucide-react";
import { TurnoverEvent } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface TurnoverSummaryCardProps {
  events: TurnoverEvent[];
}

function monthLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function TurnoverSummaryCard({ events }: TurnoverSummaryCardProps) {
  const { currentMonthLabel, offboarded, quit, promoted, total } = useMemo(() => {
    if (events.length === 0) {
      return { currentMonthLabel: "", offboarded: 0, quit: 0, promoted: 0, total: 0 };
    }
    const sorted = [...events].sort((a, b) => (a.date < b.date ? 1 : -1));
    const latestMonth = sorted[0].date.slice(0, 7); // "YYYY-MM"
    const monthEvents = events.filter((e) => e.date.slice(0, 7) === latestMonth);
    return {
      currentMonthLabel: monthLabel(sorted[0].date),
      offboarded: monthEvents.filter((e) => e.outcome === "Offboarded").length,
      quit: monthEvents.filter((e) => e.outcome === "Quit").length,
      promoted: monthEvents.filter((e) => e.outcome === "Promoted to CL").length,
      total: monthEvents.length,
    };
  }, [events]);

  const cards = [
    {
      label: "This Month",
      value: currentMonthLabel,
      sub: `${formatNumber(total)} tracked changes`,
      icon: TrendingUp,
      accent: "text-foreground",
    },
    {
      label: "Offboarded",
      value: formatNumber(offboarded),
      sub: "This month",
      icon: UserX,
      accent: "text-danger",
    },
    {
      label: "Quit",
      value: formatNumber(quit),
      sub: "This month",
      icon: LogOut,
      accent: "text-gold",
    },
    {
      label: "Promoted to CL",
      value: formatNumber(promoted),
      sub: "This month",
      icon: TrendingUp,
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
