"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SFCdrStat } from "@/lib/types";

interface SFMeetingTargetCardProps {
  cdrs: SFCdrStat[];
}

export default function SFMeetingTargetCard({ cdrs }: SFMeetingTargetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-success/30 bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-success" />
          <h2 className="text-sm font-semibold text-foreground">
            Meeting Short Funnel Coverage Target
          </h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">CDR</th>
              <th className="px-5 py-3 font-medium">Team</th>
              <th className="px-5 py-3 font-medium text-right">Days Evaluated</th>
              <th className="px-5 py-3 font-medium text-right">Avg SF/Day</th>
              <th className="px-5 py-3 font-medium text-right">Days Below Target</th>
            </tr>
          </thead>
          <tbody>
            {cdrs.map((c) => (
              <tr
                key={c.cdr}
                className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/60"
              >
                <td className="px-5 py-2.5 font-medium text-foreground">{c.cdr}</td>
                <td className="px-5 py-2.5 text-muted">{c.team}</td>
                <td className="px-5 py-2.5 text-right text-muted">{c.daysEvaluated ?? "—"}</td>
                <td className="px-5 py-2.5 text-right font-medium text-success">
                  {c.avgSfPerDay.toFixed(1)}
                </td>
                <td className="px-5 py-2.5 text-right text-muted">{c.daysBelowTarget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
