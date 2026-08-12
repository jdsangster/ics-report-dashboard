"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { OutstandingPerformer } from "@/lib/types";

interface OutstandingSectionProps {
  performers: OutstandingPerformer[];
}

export default function OutstandingSection({ performers }: OutstandingSectionProps) {
  if (performers.length === 0) {
    return (
      <div className="rounded-xl border border-border-subtle bg-surface px-5 py-6 text-center text-sm text-muted">
        No contributors hit the Outstanding threshold this period.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Star size={16} className="text-gold" fill="currentColor" />
        <h2 className="text-sm font-semibold text-foreground">Outstanding Performers</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {performers.map((p, i) => (
          <motion.div
            key={`${p.cdr}-${i}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="relative overflow-hidden rounded-xl border border-gold/30 bg-gradient-to-br from-gold/10 via-surface to-surface p-5 shadow-[0_0_24px_-8px_rgba(242,184,75,0.35)]"
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/15 blur-2xl" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{p.cdr}</p>
                <p className="text-xs text-muted">{p.team}</p>
              </div>
              <Star size={16} className="text-gold" fill="currentColor" />
            </div>
            <div className="relative mt-4 flex items-end justify-between">
              <div>
                <p className="text-2xl font-semibold text-gold">{p.avgDay.toFixed(1)}</p>
                <p className="text-xs text-muted">avg IC / day</p>
              </div>
              <div className="text-right text-xs text-muted">
                <p className="font-medium text-foreground">{p.totalIC} IC total</p>
                <p>{p.workedDays} days worked</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
