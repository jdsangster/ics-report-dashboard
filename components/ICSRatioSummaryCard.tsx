"use client";

import { motion } from "framer-motion";
import { Award, TrendingUp, ShieldCheck, TriangleAlert, OctagonAlert } from "lucide-react";
import { ICSRatioTier } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface ICSRatioSummaryCardProps {
  tiers: ICSRatioTier[];
  description: string;
}

const TIER_META: Record<
  ICSRatioTier["key"],
  { icon: typeof Award; accent: string }
> = {
  elite: { icon: Award, accent: "text-gold" },
  high: { icon: TrendingUp, accent: "text-success" },
  solid: { icon: ShieldCheck, accent: "text-accent" },
  opportunity: { icon: TriangleAlert, accent: "text-gold" },
  critical: { icon: OctagonAlert, accent: "text-danger" },
};

export default function ICSRatioSummaryCard({ tiers, description }: ICSRatioSummaryCardProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted">{description}</p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {tiers.map((tier, i) => {
          const meta = TIER_META[tier.key];
          return (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="rounded-xl border border-border-subtle bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">
                  {tier.label}
                </span>
                <meta.icon size={16} className={meta.accent} />
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                {formatNumber(tier.cdrs.length)}
              </div>
              <div className={`mt-1 text-xs font-medium ${meta.accent}`}>{tier.rangeLabel}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
