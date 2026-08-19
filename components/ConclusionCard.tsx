"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import { splitIntoParagraphs } from "@/lib/utils";

interface ConclusionCardProps {
  conclusion: string;
  title?: string;
}

export default function ConclusionCard({ conclusion, title = "Executive Conclusion" }: ConclusionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface-elevated p-5"
    >
      <div className="mb-3 flex items-center gap-2">
        <MessageSquareQuote size={15} className="text-muted" />
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <div className="space-y-3">
        {splitIntoParagraphs(conclusion).map((paragraph, i) => (
          <p key={i} className="text-sm leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
