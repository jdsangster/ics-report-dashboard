"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote, CheckCircle2, AlertTriangle } from "lucide-react";
import { CSSConclusion } from "@/lib/types";

interface CSSConclusionCardProps {
  conclusion: CSSConclusion;
}

export default function CSSConclusionCard({ conclusion }: CSSConclusionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 rounded-xl border border-border-subtle bg-surface-elevated p-5"
    >
      <div>
        <div className="mb-3 flex items-center gap-2">
          <MessageSquareQuote size={15} className="text-muted" />
          <h3 className="text-sm font-semibold text-foreground">Final Conclusion</h3>
        </div>
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-semibold text-foreground">Volume — </span>
            {conclusion.volume}
          </p>
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-semibold text-foreground">Structure — </span>
            {conclusion.structure}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-success" />
            <h4 className="text-xs font-semibold uppercase tracking-wide text-success">
              Positive Results
            </h4>
          </div>
          <ul className="space-y-2">
            {conclusion.positiveResults.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle size={14} className="text-danger" />
            <h4 className="text-xs font-semibold uppercase tracking-wide text-danger">
              Operational Risks
            </h4>
          </div>
          <ul className="space-y-2">
            {conclusion.operationalRisks.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-danger" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
