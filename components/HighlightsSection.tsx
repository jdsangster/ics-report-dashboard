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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-xl border border-border-subtle bg-surface p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp size={15} className="text-success" />
            <h3 className="text-sm font-semibold text-foreground">Most Improved</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted">
            {highlights.mostImproved.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="rounded-xl border border-border-subtle bg-surface p-5"
        >
          <div className="mb-3 flex items-center gap-2">
            <TrendingDown size={15} className="text-danger" />
            <h3 className="text-sm font-semibold text-foreground">Biggest Declines</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted">
            {highlights.biggestDeclines.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-danger" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.12 }}
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
