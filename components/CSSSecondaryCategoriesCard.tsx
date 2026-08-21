"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { CSSSecondaryCategories } from "@/lib/types";
import CSSCategoryTable from "./CSSCategoryTable";

interface CSSSecondaryCategoriesCardProps {
  secondaryCategories: CSSSecondaryCategories;
}

export default function CSSSecondaryCategoriesCard({
  secondaryCategories,
}: CSSSecondaryCategoriesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <Layers size={15} className="text-gold" />
          <h2 className="text-sm font-semibold text-foreground">Secondary Categories Behavior</h2>
        </div>
      </div>
      <CSSCategoryTable rows={secondaryCategories.rows} />
      <div className="space-y-4 border-t border-border-subtle p-5">
        <div>
          <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">Insight</h3>
          <p className="text-sm leading-relaxed text-muted">{secondaryCategories.insight}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-success">
              Positive Findings
            </h3>
            <p className="text-sm leading-relaxed text-muted">{secondaryCategories.positiveFindings}</p>
          </div>
          <div>
            <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-danger">
              Operational Concerns
            </h3>
            <p className="text-sm leading-relaxed text-muted">{secondaryCategories.operationalConcerns}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
