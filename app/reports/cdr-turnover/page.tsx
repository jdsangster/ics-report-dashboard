"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { TurnoverData } from "@/lib/types";
import BrandLogo from "@/components/BrandLogo";
import TurnoverSummaryCard from "@/components/TurnoverSummaryCard";
import TurnoverMonthlyTable from "@/components/TurnoverMonthlyTable";
import TurnoverLogTable from "@/components/TurnoverLogTable";

export default function CdrTurnoverPage() {
  const [reports, setReports] = useState<TurnoverData[]>([]);
  const [source, setSource] = useState<"mock" | "live" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reports?type=cdr-turnover")
      .then((res) => res.json())
      .then((data: { source: "mock" | "live"; reports: TurnoverData[] }) => {
        if (cancelled) return;
        setReports(data.reports);
        setSource(data.source);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // This report is a running log, not per-period snapshots — every publish is the full
  // current state, so only the most recent one (already sorted first by the API) is ever
  // shown. Older rows are superseded history, not alternate views to pick between.
  const activeReport = reports[0];

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted">
        Loading report data…
      </div>
    );
  }

  if (!activeReport) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-sm text-muted">
        <p>No reports available yet.</p>
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/50"
        >
          <ArrowLeft size={13} />
          Volver a Reports Hub
        </Link>
      </div>
    );
  }

  const lastUpdated = activeReport.createdAt
    ? new Date(activeReport.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border-subtle bg-surface/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo />
            <div className="h-8 w-px bg-border-subtle" />
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
                >
                  <ArrowLeft size={12} />
                  Reports Hub
                </Link>
              </div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                CDR Turnover Report
              </h1>
              <p className="text-xs text-muted">Offboardings · Resignations · Promotions to CL</p>
            </div>
          </div>
          {lastUpdated && (
            <span className="w-fit rounded-lg border border-border-subtle bg-surface px-3 py-2 text-xs font-medium text-muted">
              Last updated {lastUpdated}
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-6 py-8">
        <motion.div
          key={activeReport.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                CDR Turnover Log
              </h2>
              <p className="text-xs text-muted">
                Every tracked offboarding, resignation, and promotion to CL, logged as it happens.
              </p>
            </div>
            {source === "mock" && (
              <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                Demo Mode / Portfolio Preview
              </span>
            )}
          </div>

          <TurnoverSummaryCard events={activeReport.events} />
          <TurnoverMonthlyTable events={activeReport.events} />
          <TurnoverLogTable events={activeReport.events} />
        </motion.div>
      </main>

      <footer className="border-t border-border-subtle px-6 py-4 text-center text-xs text-muted">
        Colombo&amp;Hurd · Excel (Power BI) → Claude → Reports Center
      </footer>
    </div>
  );
}
