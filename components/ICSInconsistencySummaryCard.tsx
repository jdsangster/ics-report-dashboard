"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ListChecks, Database, FileSpreadsheet } from "lucide-react";
import { ICSInconsistencyContributor } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface ICSInconsistencySummaryCardProps {
  contributors: ICSInconsistencyContributor[];
}

export default function ICSInconsistencySummaryCard({ contributors }: ICSInconsistencySummaryCardProps) {
  const totalDiscrepancies = contributors.reduce((sum, c) => sum + c.issues.length, 0);
  const totalBI = contributors.reduce((sum, c) => sum + c.biCount, 0);
  const totalExcel = contributors.reduce((sum, c) => sum + c.excelCount, 0);

  const cards = [
    {
      label: "Contributors Flagged",
      value: formatNumber(contributors.length),
      sub: "With BI vs. Excel mismatches",
      icon: AlertTriangle,
      accent: "text-danger",
    },
    {
      label: "Total Discrepancies",
      value: formatNumber(totalDiscrepancies),
      sub: "Individual case notes",
      icon: ListChecks,
      accent: "text-gold",
    },
    {
      label: "BI Total",
      value: formatNumber(totalBI),
      sub: "IC count per Power BI",
      icon: Database,
      accent: "text-accent",
    },
    {
      label: "Excel Total",
      value: formatNumber(totalExcel),
      sub: "IC count logged in Excel",
      icon: FileSpreadsheet,
      accent: "text-success",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          className="rounded-xl border border-border-subtle bg-surface p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {card.label}
            </span>
            <card.icon size={16} className={card.accent} />
          </div>
          <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            {card.value}
          </div>
          <div className={`mt-1 text-xs font-medium ${card.accent}`}>{card.sub}</div>
        </motion.div>
      ))}
    </div>
  );
}
