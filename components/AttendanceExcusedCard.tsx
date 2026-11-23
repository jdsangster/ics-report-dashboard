"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CalendarOff } from "lucide-react";
import { AttendanceData } from "@/lib/types";
import { isExcused, shortDate, teamLabel, weekdayOf } from "@/lib/attendanceUtils";

interface AttendanceExcusedCardProps {
  /** Meetings, oldest first. */
  meetings: AttendanceData[];
}

const LEAD_ORDER = ["Angelo", "Valentina", "Mairenis", "Martin"];

export default function AttendanceExcusedCard({ meetings }: AttendanceExcusedCardProps) {
  const blocks = useMemo(
    () =>
      [...meetings].reverse().map((m) => {
        const excused = m.records.filter((r) => isExcused(r, m.meeting.durationMinutes));
        const groups = LEAD_ORDER.map((lead) => ({
          lead,
          names: excused.filter((r) => r.teamLead === lead).map((r) => r.cdr).sort((a, b) => a.localeCompare(b)),
        })).filter((g) => g.names.length > 0);
        return { date: m.meeting.date, total: excused.length, groups };
      }),
    [meetings]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <CalendarOff size={15} className="text-muted" />
          <h2 className="text-sm font-semibold text-foreground">Not counted: day off</h2>
        </div>
        <p className="text-xs text-muted">
          CDRs who didn&apos;t join and don&apos;t work that day. They are left out of the attendance %, not counted as
          absent.
        </p>
      </div>
      <div className="divide-y divide-border-subtle/60">
        {blocks.map((b) => (
          <div key={b.date} className="px-5 py-4">
            <p className="text-xs font-semibold text-foreground">
              {weekdayOf(b.date)} {shortDate(b.date)}{" "}
              <span className="font-normal text-muted">· {b.total} not counted</span>
            </p>
            {b.total === 0 ? (
              <p className="mt-2 text-xs text-muted">Everyone on the roster was scheduled to work.</p>
            ) : (
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {b.groups.map((g) => (
                  <div key={g.lead}>
                    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                      {teamLabel(g.lead)} <span className="text-muted/70">({g.names.length})</span>
                    </p>
                    <ul className="space-y-0.5">
                      {g.names.map((n) => (
                        <li key={n} className="text-xs text-foreground">{n}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
