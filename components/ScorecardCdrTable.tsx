"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ListChecks } from "lucide-react";
import { ScorecardCdr, ScorecardStatus } from "@/lib/types";

interface ScorecardCdrTableProps {
  cdrs: ScorecardCdr[];
}

const STATUS_STYLES: Record<ScorecardStatus, string> = {
  "Up to date": "border-success/30 bg-success/10 text-success",
  Outdated: "border-gold/30 bg-gold/10 text-gold",
  "Not reviewed": "border-danger/30 bg-danger/10 text-danger",
};

const STATUS_RANK: Record<ScorecardStatus, number> = { "Not reviewed": 0, Outdated: 1, "Up to date": 2 };
const VISIBLE_COUNT = 15;

function Select({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-border-subtle bg-background py-2 pl-3 pr-9 text-xs text-foreground focus:border-accent/50 focus:outline-none"
      >
        {children}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
    </div>
  );
}

export default function ScorecardCdrTable({ cdrs }: ScorecardCdrTableProps) {
  const [lead, setLead] = useState("all");
  const [status, setStatus] = useState("needs-review");
  const [expanded, setExpanded] = useState(false);

  const leads = useMemo(() => Array.from(new Set(cdrs.map((c) => c.teamLead))), [cdrs]);
  const rows = useMemo(
    () =>
      cdrs
        .filter((c) => lead === "all" || c.teamLead === lead)
        .filter((c) =>
          status === "all" ? true : status === "needs-review" ? c.status !== "Up to date" : c.status === status
        )
        .sort(
          (a, b) =>
            STATUS_RANK[a.status] - STATUS_RANK[b.status] ||
            (b.daysSinceReview ?? 0) - (a.daysSinceReview ?? 0) ||
            a.cdr.localeCompare(b.cdr)
        ),
    [cdrs, lead, status]
  );
  const visible = expanded ? rows : rows.slice(0, VISIBLE_COUNT);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="flex flex-col gap-3 border-b border-border-subtle px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ListChecks size={15} className="text-accent" />
            <h2 className="text-sm font-semibold text-foreground">CDR Review Status</h2>
          </div>
          <p className="text-xs text-muted">Never-reviewed CDRs first, then the longest without a review.</p>
        </div>
        <div className="flex gap-2">
          <Select value={lead} onChange={setLead}>
            <option value="all">All team leads</option>
            {leads.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </Select>
          <Select value={status} onChange={setStatus}>
            <option value="needs-review">Needs review</option>
            <option value="all">All statuses</option>
            <option value="Not reviewed">Not reviewed</option>
            <option value="Outdated">Outdated</option>
            <option value="Up to date">Up to date</option>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">CDR</th>
              <th className="px-5 py-3 font-medium">Team lead</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Reviews</th>
              <th className="px-5 py-3 text-right font-medium">Last review</th>
              <th className="px-5 py-3 text-right font-medium">Days since</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-xs text-muted">No CDRs match these filters.</td>
              </tr>
            ) : (
              visible.map((c) => (
                <tr key={c.cdr} className="border-b border-border-subtle/60 last:border-0">
                  <td className="px-5 py-2.5 font-medium text-foreground">{c.cdr}</td>
                  <td className="px-5 py-2.5 text-muted">{c.teamLead}</td>
                  <td className="px-5 py-2.5">
                    <span className={`rounded-full border px-2 py-0.5 text-xs ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="px-5 py-2.5 text-right text-foreground">{c.callsReviewed}</td>
                  <td className="whitespace-nowrap px-5 py-2.5 text-right text-muted">{c.lastReviewed ?? "—"}</td>
                  <td className="px-5 py-2.5 text-right text-muted">{c.daysSinceReview ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {rows.length > VISIBLE_COUNT && (
        <div className="border-t border-border-subtle px-5 py-3 text-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs font-medium text-accent transition-colors hover:text-foreground"
          >
            {expanded ? "Show fewer" : `Show all ${rows.length}`}
          </button>
        </div>
      )}
    </motion.div>
  );
}
