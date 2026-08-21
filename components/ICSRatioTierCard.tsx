"use client";

import { motion } from "framer-motion";
import { Award, TrendingUp, ShieldCheck, TriangleAlert, OctagonAlert } from "lucide-react";
import { ICSRatioTier } from "@/lib/types";

interface ICSRatioTierCardProps {
  tier: ICSRatioTier;
}

const TIER_STYLES: Record<
  ICSRatioTier["key"],
  { icon: typeof Award; border: string; chip: string; ring: string }
> = {
  elite: {
    icon: Award,
    border: "border-gold/30",
    chip: "border-gold/30 bg-gold/10 text-gold",
    ring: "text-gold",
  },
  high: {
    icon: TrendingUp,
    border: "border-success/30",
    chip: "border-success/30 bg-success/10 text-success",
    ring: "text-success",
  },
  solid: {
    icon: ShieldCheck,
    border: "border-accent/30",
    chip: "border-accent/30 bg-accent/10 text-accent",
    ring: "text-accent",
  },
  opportunity: {
    icon: TriangleAlert,
    border: "border-gold/30",
    chip: "border-gold/30 bg-gold/10 text-gold",
    ring: "text-gold",
  },
  critical: {
    icon: OctagonAlert,
    border: "border-danger/30",
    chip: "border-danger/30 bg-danger/10 text-danger",
    ring: "text-danger",
  },
};

export default function ICSRatioTierCard({ tier }: ICSRatioTierCardProps) {
  const style = TIER_STYLES[tier.key];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-xl border bg-surface ${style.border}`}
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <style.icon size={15} className={style.ring} />
          <h2 className="text-sm font-semibold text-foreground">{tier.label}</h2>
          <span className="text-xs text-muted">· {tier.rangeLabel}</span>
          <span className="ml-auto text-xs font-medium text-muted">
            {tier.cdrs.length} {tier.cdrs.length === 1 ? "CDR" : "CDRs"}
          </span>
        </div>
      </div>
      <div className="space-y-4 px-5 py-4">
        <div className="flex flex-wrap gap-2">
          {tier.cdrs.map((c) => (
            <span
              key={c.cdr}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${style.chip}`}
            >
              {c.cdr}
              <span className="font-semibold">{c.ratio.toFixed(2)}%</span>
            </span>
          ))}
        </div>
        <p className="text-xs leading-relaxed text-muted">{tier.note}</p>
      </div>
    </motion.div>
  );
}
