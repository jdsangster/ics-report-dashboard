"use client";

import { motion } from "framer-motion";
import { AlertOctagon, Flag, TrendingUp } from "lucide-react";
import { TotalCallsKeyTakeaways } from "@/lib/types";

interface CallsTakeawaysSectionProps {
  takeaways: TotalCallsKeyTakeaways;
}

export default function CallsTakeawaysSection({ takeaways }: CallsTakeawaysSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface p-5"
    >
      <div className="mb-2 flex items-center gap-2">
        <TrendingUp size={14} className="text-success" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-success">
          Positive Trends
        </h3>
      </div>
      <ul className="space-y-1.5 text-sm text-muted">
        {takeaways.positiveTrends.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success" />
            {item}
          </li>
        ))}
      </ul>

      <div className="my-4 border-t border-border-subtle" />

      <div className="mb-2 flex items-center gap-2">
        <Flag size={14} className="text-gold" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gold">Opportunities</h3>
      </div>
      <ul className="space-y-1.5 text-sm text-muted">
        {takeaways.opportunities.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
            {item}
          </li>
        ))}
      </ul>

      <div className="my-4 border-t border-border-subtle" />

      <div className="mb-2 flex items-center gap-2">
        <AlertOctagon size={14} className="text-danger" />
        <h3 className="text-xs font-semibold uppercase tracking-wide text-danger">
          Main Attention Points
        </h3>
      </div>
      <ul className="space-y-1.5 text-sm text-muted">
        {takeaways.mainAttentionPoints.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-danger" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
