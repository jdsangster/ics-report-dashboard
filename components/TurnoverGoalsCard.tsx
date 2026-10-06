"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle2 } from "lucide-react";
import { TurnoverEvent } from "@/lib/types";
import { MONTHLY_GOALS, currentMonthKey, monthCounts, monthName } from "@/lib/turnoverUtils";

interface TurnoverGoalsCardProps {
  events: TurnoverEvent[];
}

function GoalRow({
  label,
  detail,
  value,
  goal,
  barClass,
}: {
  label: string;
  detail: string;
  value: number;
  goal: number;
  barClass: string;
}) {
  const reached = value >= goal;
  return (
    <div className="rounded-lg border border-border-subtle bg-surface-elevated/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-muted">{label}</div>
          <div className="mt-0.5 text-xs text-muted">{detail}</div>
        </div>
        {reached && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
            <CheckCircle2 size={12} />
            Goal reached
          </span>
        )}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
        {value}
        <span className="text-base font-normal text-muted"> of {goal}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-surface">
        <div
          className={`h-1.5 rounded-full ${barClass}`}
          style={{ width: `${Math.min(100, (value / goal) * 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function TurnoverGoalsCard({ events }: TurnoverGoalsCardProps) {
  const month = currentMonthKey();
  const counts = useMemo(() => monthCounts(events, month), [events, month]);

  if (month < MONTHLY_GOALS.effectiveFrom) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="flex items-center gap-2 border-b border-border-subtle px-5 py-4">
        <Target size={15} className="text-accent" />
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Monthly Goals · {monthName(month)}
          </h2>
          <p className="text-xs text-muted">
            Set by leadership from October 2026: {MONTHLY_GOALS.promotions} promotions and{" "}
            {MONTHLY_GOALS.exits} exits (offboarded + quit) per month.
          </p>
        </div>
      </div>
      <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
        <GoalRow
          label="Promotions"
          detail="Promoted to any role"
          value={counts.promotions}
          goal={MONTHLY_GOALS.promotions}
          barClass="bg-success"
        />
        <GoalRow
          label="Exits"
          detail="Offboarded + quit"
          value={counts.exits}
          goal={MONTHLY_GOALS.exits}
          barClass="bg-gold"
        />
      </div>
    </motion.div>
  );
}
