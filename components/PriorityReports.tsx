"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Star } from "lucide-react";

interface PriorityItem {
  question: string;
  /** Report that answers it; omitted while the report doesn't exist yet. */
  slug?: string;
  reportName?: string;
  /** Extra report that feeds the same question. */
  alsoSlug?: string;
  alsoName?: string;
  note?: string;
}

const PRIORITY_ITEMS: PriorityItem[] = [
  { question: "Which team lead has the most missed dispositions?" },
  {
    question: "Which team lead has the most and the fewest complaints?",
    slug: "operational-complaints",
    reportName: "Operational Complaint Analysis (CSS)",
    alsoSlug: "cl-case-review",
    alsoName: "CL Case Review",
    note: "Team-lead breakdown coming soon",
  },
  {
    question: "Which team lead manages their CDRs the most, and how many calls do they review per week?",
    slug: "cdr-scorecard",
    reportName: "CDR Scorecard",
  },
  {
    question: "Which team lead promotes the most CDRs, and which one loses the most to resignations?",
    slug: "cdr-turnover",
    reportName: "CDR Turnover Report",
  },
  { question: "Which team has the lowest attendance at the CDR meetings?" },
];

export default function PriorityReports() {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center gap-2">
        <Star size={16} className="text-gold" />
        <h2 className="text-lg font-semibold tracking-tight text-foreground">For María Antonia</h2>
        <span className="text-xs text-muted">The five questions to check every day</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRIORITY_ITEMS.map((item, i) => {
          const live = Boolean(item.slug);
          return (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileHover={live ? { y: -3 } : undefined}
              className={`group relative flex h-full flex-col rounded-xl border p-5 transition-colors ${
                live
                  ? "border-gold/40 bg-gold/5 hover:border-gold"
                  : "cursor-not-allowed border-border-subtle/60 bg-surface/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    live ? "bg-gold/20 text-gold" : "bg-surface-elevated text-muted"
                  }`}
                >
                  {i + 1}
                </span>
                {!live && (
                  <span className="flex items-center gap-1 rounded-full border border-border-subtle bg-surface-elevated px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                    <Lock size={10} />
                    Coming Soon
                  </span>
                )}
              </div>
              <h3 className="mt-3 flex-1 text-sm font-semibold leading-snug text-foreground">{item.question}</h3>
              {item.reportName && <p className="mt-2 text-xs text-muted">{item.reportName}</p>}
              {item.note && <p className="mt-1 text-[11px] text-gold">{item.note}</p>}
              {live && (
                <div className="mt-3 flex items-center justify-between gap-2">
                  <Link
                    href={`/reports/${item.slug}`}
                    className="flex items-center gap-1 text-xs font-medium text-gold after:absolute after:inset-0 after:content-['']"
                  >
                    Open report
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  {item.alsoSlug && (
                    <Link
                      href={`/reports/${item.alsoSlug}`}
                      className="relative z-10 text-xs text-muted transition-colors hover:text-gold"
                    >
                      Also: {item.alsoName}
                    </Link>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
