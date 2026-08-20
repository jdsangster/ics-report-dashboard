"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { TotalCallsData, Cadence } from "@/lib/types";
import ReportHeader from "@/components/ReportHeader";
import TotalCallsSummaryCard from "@/components/TotalCallsSummaryCard";
import TeamCallsCard from "@/components/TeamCallsCard";
import TopPerformersCard from "@/components/TopPerformersCard";
import AttentionCard from "@/components/AttentionCard";
import TeamRankingCard from "@/components/TeamRankingCard";
import CallsTakeawaysSection from "@/components/CallsTakeawaysSection";
import ConclusionCard from "@/components/ConclusionCard";

export default function TotalCallsReportPage() {
  const [reports, setReports] = useState<TotalCallsData[]>([]);
  const [cadence, setCadence] = useState<Cadence | "All">("All");
  const [selectedId, setSelectedId] = useState<string>("");
  const [source, setSource] = useState<"mock" | "live" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reports?type=total-calls")
      .then((res) => res.json())
      .then((data: { source: "mock" | "live"; reports: TotalCallsData[] }) => {
        if (cancelled) return;
        setReports(data.reports);
        setSource(data.source);
        if (data.reports.length > 0) setSelectedId(data.reports[0].id);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredReports = useMemo(
    () => (cadence === "All" ? reports : reports.filter((r) => r.metadata.cadence === cadence)),
    [reports, cadence]
  );

  const activeReport = filteredReports.find((r) => r.id === selectedId) ?? filteredReports[0];

  const handleCadenceChange = (next: Cadence | "All") => {
    setCadence(next);
    const nextFiltered =
      next === "All" ? reports : reports.filter((r) => r.metadata.cadence === next);
    if (nextFiltered.length > 0 && !nextFiltered.some((r) => r.id === selectedId)) {
      setSelectedId(nextFiltered[0].id);
    }
  };

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

  return (
    <div className="flex flex-1 flex-col">
      <ReportHeader
        reports={reports}
        cadence={cadence}
        onCadenceChange={handleCadenceChange}
        selectedId={selectedId}
        onSelectedIdChange={setSelectedId}
        title="Total Calls Report"
        subtitle="Aggregate call volume · Executive Summary"
      />

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
                {activeReport.metadata.cadence} Calls Report · {activeReport.metadata.periodLabel}
              </h2>
              <p className="text-xs text-muted">{activeReport.metadata.reportType}</p>
            </div>
            {source === "mock" && (
              <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                Demo Mode / Portfolio Preview
              </span>
            )}
          </div>

          <TotalCallsSummaryCard report={activeReport} />
          <CallsTakeawaysSection takeaways={activeReport.keyTakeaways} />
          <TeamRankingCard ranking={activeReport.teamRanking} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {activeReport.teams.map((team, i) => (
              <TeamCallsCard key={team.team} team={team} index={i} />
            ))}
          </div>

          <TopPerformersCard performers={activeReport.topPerformers} />
          <AttentionCard attentionByTeam={activeReport.attentionByTeam} />
          <ConclusionCard conclusion={activeReport.executiveSummary} title="Executive Summary" />
        </motion.div>
      </main>

      <footer className="border-t border-border-subtle px-6 py-4 text-center text-xs text-muted">
        Colombo&amp;Hurd · Excel (Power BI) → Claude → Reports Center
      </footer>
    </div>
  );
}
