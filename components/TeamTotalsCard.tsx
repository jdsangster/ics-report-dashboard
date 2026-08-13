"use client";

import { motion } from "framer-motion";
import { TeamTotal } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface TeamTotalsCardProps {
  teamTotals: TeamTotal[];
}

export default function TeamTotalsCard({ teamTotals }: TeamTotalsCardProps) {
  const maxTeamTotal = Math.max(...teamTotals.map((t) => t.total), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">Team Totals</h2>
        <p className="text-xs text-muted">Total IC by team this period</p>
      </div>
      <div className="space-y-4 px-5 py-5">
        {teamTotals
          .slice()
          .sort((a, b) => b.total - a.total)
          .map((team) => (
            <div key={team.team}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{team.team}</span>
                <span className="text-muted">{formatNumber(team.total)}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-elevated">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(team.total / maxTeamTotal) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
            </div>
          ))}
      </div>
    </motion.div>
  );
}
