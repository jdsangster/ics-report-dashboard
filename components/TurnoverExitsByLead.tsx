"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { UserMinus } from "lucide-react";
import { TurnoverEvent } from "@/lib/types";
import { reasonOf, teamLeadOn } from "@/lib/turnoverUtils";

interface TurnoverExitsByLeadProps {
  events: TurnoverEvent[];
}

export default function TurnoverExitsByLead({ events }: TurnoverExitsByLeadProps) {
  const data = useMemo(() => {
    const exits = events.filter((e) => e.outcome === "Offboarded" || e.outcome === "Quit");
    const byLead = new Map<string, { total: number; offboarded: number; quit: number; reasons: Map<string, number> }>();
    for (const e of exits) {
      const label = `${teamLeadOn(e.team, e.date) ?? "—"} · ${e.team}`;
      const entry = byLead.get(label) ?? { total: 0, offboarded: 0, quit: 0, reasons: new Map() };
      entry.total += 1;
      if (e.outcome === "Offboarded") entry.offboarded += 1;
      else entry.quit += 1;
      const reason = reasonOf(e);
      if (reason) entry.reasons.set(reason, (entry.reasons.get(reason) ?? 0) + 1);
      byLead.set(label, entry);
    }
    const leads = Array.from(byLead.entries())
      .map(([label, v]) => ({
        label,
        ...v,
        topReasons: Array.from(v.reasons.entries())
          .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
          .slice(0, 3),
      }))
      .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label));
    return { total: exits.length, leads };
  }, [events]);

  if (data.total === 0) return null;

  const max = data.leads[0].total;
  const hasTopLead = data.leads.length > 1 && data.leads[1].total < data.leads[0].total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <UserMinus size={15} className="text-danger" />
          <h2 className="text-sm font-semibold text-foreground">Exits by Team Lead</h2>
        </div>
        <p className="text-xs text-muted">
          Offboarded and quit CDRs per team lead, with the most common reasons. {data.total} exits in total.
        </p>
      </div>
      <ul className="divide-y divide-border-subtle">
        {data.leads.map((lead, i) => (
          <li key={lead.label} className="px-5 py-3 text-xs">
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm text-foreground">
                {lead.label}
                {i === 0 && hasTopLead && (
                  <span className="ml-2 rounded-full bg-danger/15 px-2 py-0.5 text-[10px] font-medium text-danger">
                    Most exits
                  </span>
                )}
              </span>
              <span className="font-medium text-foreground">
                {lead.total} <span className="text-muted">({Math.round((lead.total / data.total) * 100)}%)</span>
                <span className="ml-2 text-muted">
                  {lead.offboarded} offboarded · {lead.quit} quit
                </span>
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-border-subtle">
              <div className="h-1.5 rounded-full bg-danger" style={{ width: `${(lead.total / max) * 100}%` }} />
            </div>
            {lead.topReasons.length > 0 && (
              <p className="mt-1.5 text-muted">
                Top reasons: {lead.topReasons.map(([r, n]) => `${r} (${n})`).join(" · ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
