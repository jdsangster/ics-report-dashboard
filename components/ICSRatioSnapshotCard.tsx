"use client";

import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

interface ICSRatioSnapshotCardProps {
  items: string[];
}

export default function ICSRatioSnapshotCard({ items }: ICSRatioSnapshotCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface-elevated p-5"
    >
      <div className="mb-3 flex items-center gap-2">
        <ClipboardList size={15} className="text-muted" />
        <h3 className="text-sm font-semibold text-foreground">Team Snapshot</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
