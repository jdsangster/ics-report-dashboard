"use client";

import { motion } from "framer-motion";
import { ScorecardCdr } from "@/lib/types";

interface ScorecardSummaryCardProps {
  cdrs: ScorecardCdr[];
}

export default function ScorecardSummaryCard({ cdrs }: ScorecardSummaryCardProps) {
  const total = cdrs.length;
  const calls = cdrs.reduce((sum, c) => sum + c.callsReviewed, 0);
  const upToDate = cdrs.filter((c) => c.status === "Up to date").length;
  const notReviewed = cdrs.filter((c) => c.status === "Not reviewed").length;

  const items = [
    { label: "CDRs tracked", value: total, tone: "text-foreground" },
    { label: "Call reviews logged", value: calls, tone: "text-accent" },
    { label: "Up to date", value: `${upToDate} (${Math.round((upToDate / total) * 100)}%)`, tone: "text-success" },
    { label: "Never reviewed", value: notReviewed, tone: "text-danger" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
          className="rounded-xl border border-border-subtle bg-surface p-5"
        >
          <p className={`text-3xl font-semibold ${item.tone}`}>{item.value}</p>
          <p className="mt-1 text-xs text-muted">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
