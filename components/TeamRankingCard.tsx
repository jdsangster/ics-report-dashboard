"use client";

import { motion } from "framer-motion";
import { ListOrdered } from "lucide-react";
import { TeamRanking } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface TeamRankingCardProps {
  ranking: TeamRanking[];
}

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉", 4: "4️⃣" };

export default function TeamRankingCard({ ranking }: TeamRankingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <ListOrdered size={15} className="text-muted" />
          <h2 className="text-sm font-semibold text-foreground">Team Ranking</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Rank</th>
              <th className="px-5 py-3 font-medium">Team</th>
              <th className="px-5 py-3 font-medium text-right">Calls</th>
              <th className="px-5 py-3 font-medium text-right">ICs</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((r) => (
              <tr key={r.rank} className="border-b border-border-subtle/60 last:border-0">
                <td className="px-5 py-2.5 text-muted">{MEDALS[r.rank] ?? r.rank}</td>
                <td className="px-5 py-2.5 font-medium text-foreground">{r.team}</td>
                <td className="px-5 py-2.5 text-right text-muted">{formatNumber(r.calls)}</td>
                <td className="px-5 py-2.5 text-right text-success">{formatNumber(r.ics)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
