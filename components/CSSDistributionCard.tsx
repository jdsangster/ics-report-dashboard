"use client";

import { motion } from "framer-motion";
import { PieChart } from "lucide-react";
import { CSSDistribution } from "@/lib/types";
import CSSCategoryTable from "./CSSCategoryTable";

interface CSSDistributionCardProps {
  distribution: CSSDistribution;
}

export default function CSSDistributionCard({ distribution }: CSSDistributionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <PieChart size={15} className="text-accent" />
          <h2 className="text-sm font-semibold text-foreground">Complaint Distribution</h2>
        </div>
        <p className="text-xs text-muted">Share of total complaints by category, week over week</p>
      </div>
      <CSSCategoryTable rows={distribution.rows} />
      <div className="grid grid-cols-1 gap-4 border-t border-border-subtle p-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Insight</h3>
          <p className="text-sm leading-relaxed text-muted">{distribution.insight}</p>
        </div>
        <div>
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Observation</h3>
          <p className="text-sm leading-relaxed text-muted">{distribution.observation}</p>
        </div>
      </div>
    </motion.div>
  );
}
