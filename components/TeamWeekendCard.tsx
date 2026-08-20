"use client";

import { motion } from "framer-motion";
import { WeekendTeamStat } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface TeamWeekendCardProps {
  team: WeekendTeamStat;
  index: number;
}

export default function TeamWeekendCard({ team, index }: TeamWeekendCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="flex h-full flex-col rounded-xl border border-border-subtle bg-surface p-5"
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-sm font-semibold text-foreground">{team.team}</h3>
        <div className="text-sm font-semibold text-success">{formatNumber(team.totalICs)} ICs</div>
      </div>

      <table className="w-full text-sm">
        <tbody>
          {team.highlights.map((h) => (
            <tr key={h.cdr} className="border-b border-border-subtle/60 last:border-0">
              <td className="py-1.5 pr-2 font-medium text-foreground">{h.cdr}</td>
              <td className="py-1.5 text-right text-success">{h.ics} ICs</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-3 text-xs leading-relaxed text-muted">{team.analysis}</p>
    </motion.div>
  );
}
