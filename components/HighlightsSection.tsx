"use client";

import { motion } from "framer-motion";
import { ClipboardList, TrendingUp, TrendingDown } from "lucide-react";
import { ReportHighlights } from "@/lib/types";

interface HighlightsSectionProps {
  highlights: ReportHighlights;
}

export default function HighlightsSection({ highlights }: HighlightsSectionProps) {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-border-subtle bg-surface p-5"
      >
        <div className="mb-2 flex items-center gap-2">
          <TrendingUp size={14} className="text-success" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-success">
            Most Improved
          </h3>
        </div>
        <ul className="space-y-1.5 text-sm text-muted">
          {highlights.mostImproved.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success" />
              {item}
            </li>
          ))}
        </ul>

        <div className="my-4 border-t border-border-subtle" />

        <div className="mb-2 flex items-center gap-2">
          <TrendingDown size={14} className="text-danger" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-danger">
            Biggest Declines
          </h3>
        </div>
        <ul className="space-y-1.5 text-sm text-muted">
          {highlights.biggestDeclines.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-danger" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="rounded-xl border border-border-subtle bg-surface p-5"
      >
        <div className="mb-3 flex items-center gap-2">
          <ClipboardList size={15} className="text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Observations</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted">
          {highlights.observations.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
