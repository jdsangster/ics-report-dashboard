"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import { ConversionTrackerMethodology } from "@/lib/types";

interface ConversionMethodologyCardProps {
  methodology: ConversionTrackerMethodology;
}

export default function ConversionMethodologyCard({ methodology }: ConversionMethodologyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface-elevated p-5"
    >
      <div className="mb-3 flex items-center gap-2">
        <FlaskConical size={15} className="text-muted" />
        <h3 className="text-sm font-semibold text-foreground">Methodology</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border-subtle bg-surface p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-muted">
            Short Funnel threshold
          </div>
          <div className="mt-1 text-xl font-semibold text-foreground">
            {methodology.sfThreshold} Qualified PCs
          </div>
          <p className="mt-1 text-xs text-muted">{methodology.sfThresholdBasis}</p>
        </div>
        <div className="rounded-lg border border-border-subtle bg-surface p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-muted">
            Campaigns threshold
          </div>
          <div className="mt-1 text-xl font-semibold text-foreground">
            {methodology.campThreshold} Qualified PCs
          </div>
          <p className="mt-1 text-xs text-muted">{methodology.campThresholdBasis}</p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">{methodology.note}</p>
    </motion.div>
  );
}
