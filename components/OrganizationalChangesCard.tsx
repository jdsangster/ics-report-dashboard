"use client";

import { motion } from "framer-motion";
import { UserCog } from "lucide-react";
import { OrganizationalChange } from "@/lib/types";

interface OrganizationalChangesCardProps {
  changes: OrganizationalChange[];
}

export default function OrganizationalChangesCard({ changes }: OrganizationalChangesCardProps) {
  if (changes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <UserCog size={15} className="text-muted" />
          <h2 className="text-sm font-semibold text-foreground">
            Organizational Changes &amp; Transition Report
          </h2>
        </div>
        <p className="mt-0.5 text-xs text-muted">
          Excluded from team totals for this period
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Contributor</th>
              <th className="px-5 py-3 font-medium text-right">IC Generated</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {changes.map((change, i) => (
              <tr
                key={`${change.contributor}-${i}`}
                className="border-b border-border-subtle/60 last:border-0"
              >
                <td className="px-5 py-3 font-medium text-foreground">{change.contributor}</td>
                <td className="px-5 py-3 text-right text-muted">{change.icGenerated}</td>
                <td className="px-5 py-3 text-muted">{change.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
