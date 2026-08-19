"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { TopPerformer } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface TopPerformersCardProps {
  performers: TopPerformer[];
}

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function TopPerformersCard({ performers }: TopPerformersCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <Trophy size={15} className="text-gold" />
          <h2 className="text-sm font-semibold text-foreground">Top Performers of the Week</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Rank</th>
              <th className="px-5 py-3 font-medium">Teammate</th>
              <th className="px-5 py-3 font-medium">Team</th>
              <th className="px-5 py-3 font-medium text-right">Calls</th>
            </tr>
          </thead>
          <tbody>
            {performers.map((p) => (
              <tr
                key={p.rank}
                className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/60"
              >
                <td className="px-5 py-2.5 text-muted">{MEDALS[p.rank] ?? p.rank}</td>
                <td className="px-5 py-2.5 font-medium text-foreground">{p.cdr}</td>
                <td className="px-5 py-2.5 text-muted">{p.team}</td>
                <td className="px-5 py-2.5 text-right font-medium text-foreground">
                  {formatNumber(p.calls)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
