"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { ICSInconsistencyContributor } from "@/lib/types";
import { badgeStyles } from "@/lib/utils";

interface ICSInconsistencyContributorCardProps {
  contributor: ICSInconsistencyContributor;
}

export default function ICSInconsistencyContributorCard({
  contributor,
}: ICSInconsistencyContributorCardProps) {
  const diff = contributor.biCount - contributor.excelCount;
  const badge = diff > 0 ? "🔺" : diff < 0 ? "🔻" : "➖";
  const diffText = diff === 0 ? "±0" : diff > 0 ? `+${diff}` : `${diff}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="flex flex-wrap items-center gap-3 border-b border-border-subtle px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">{contributor.cdr}</h2>
        <span className="text-xs text-muted">
          {contributor.biCount} in BI · {contributor.excelCount} in Excel
        </span>
        <span
          className={`ml-auto inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeStyles(
            badge
          )}`}
        >
          {badge} {diffText}
        </span>
      </div>
      <ul className="space-y-3 px-5 py-4">
        {contributor.issues.map((issue, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-danger" />
            {issue}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
