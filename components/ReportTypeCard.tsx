"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { ReportTypeMeta } from "@/lib/reportTypes";

interface ReportTypeCardProps {
  report: ReportTypeMeta;
  index: number;
}

export default function ReportTypeCard({ report, index }: ReportTypeCardProps) {
  const isLive = report.status === "live";
  const Icon = report.icon;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={isLive ? { y: -3 } : undefined}
      className={`group relative flex h-full flex-col rounded-xl border p-5 transition-colors ${
        isLive
          ? "border-border-subtle bg-surface hover:border-accent/50"
          : "border-border-subtle/60 bg-surface/50"
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            isLive ? "bg-accent/15 text-accent" : "bg-surface-elevated text-muted"
          }`}
        >
          <Icon size={20} />
        </div>
        {isLive ? (
          <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-success">
            Live
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full border border-border-subtle bg-surface-elevated px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
            <Lock size={10} />
            Coming Soon
          </span>
        )}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-foreground">{report.name}</h3>
      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">{report.description}</p>

      {isLive && (
        <div className="mt-4 flex items-center gap-1 text-xs font-medium text-accent">
          Open report
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      )}
    </motion.div>
  );

  if (!isLive) {
    return <div className="cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={`/reports/${report.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
