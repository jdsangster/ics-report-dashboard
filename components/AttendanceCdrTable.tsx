"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ListChecks } from "lucide-react";
import { AttendanceData } from "@/lib/types";
import { cdrAttendance, shortDate, weekdayOf } from "@/lib/attendanceUtils";

interface AttendanceCdrTableProps {
  /** Meetings, oldest first. */
  meetings: AttendanceData[];
}

const VISIBLE_COUNT = 15;

const STATUS_STYLES = {
  present: "border-success/30 bg-success/10 text-success",
  partial: "border-gold/30 bg-gold/10 text-gold",
  absent: "border-danger/30 bg-danger/10 text-danger",
} as const;

const STATUS_LABEL = { present: "Present", partial: "Left early / late", absent: "Absent" } as const;

function Select({ value, onChange, children }: { value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-border-subtle bg-background py-2 pl-3 pr-9 text-xs text-foreground focus:border-accent/50 focus:outline-none"
      >
        {children}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
    </div>
  );
}

export default function AttendanceCdrTable({ meetings }: AttendanceCdrTableProps) {
  const [lead, setLead] = useState("all");
  const [status, setStatus] = useState("missed");
  const [expanded, setExpanded] = useState(false);

  const latest = meetings[meetings.length - 1];
  const all = useMemo(() => cdrAttendance(meetings), [meetings]);
  const leads = useMemo(() => Array.from(new Set(all.map((c) => c.teamLead))), [all]);
  const rows = useMemo(
    () =>
      all
        .filter((c) => lead === "all" || c.teamLead === lead)
        .filter((c) => (status === "all" ? true : status === "missed" ? c.latest !== "present" : c.latest === status)),
    [all, lead, status]
  );
  const visible = expanded ? rows : rows.slice(0, VISIBLE_COUNT);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="flex flex-col gap-3 border-b border-border-subtle px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ListChecks size={15} className="text-accent" />
            <h2 className="text-sm font-semibold text-foreground">CDR Attendance</h2>
          </div>
          <p className="text-xs text-muted">
            Status is for the latest meeting ({weekdayOf(latest.meeting.date)} {shortDate(latest.meeting.date)}); lowest
            overall attendance first.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={lead} onChange={(v) => { setLead(v); setExpanded(false); }}>
            <option value="all">All team leads</option>
            {leads.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </Select>
          <Select value={status} onChange={(v) => { setStatus(v); setExpanded(false); }}>
            <option value="missed">Missed the latest</option>
            <option value="all">All CDRs</option>
            <option value="present">Present</option>
            <option value="partial">Left early / late</option>
            <option value="absent">Absent</option>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">CDR</th>
              <th className="px-5 py-3 font-medium">Team lead</th>
              <th className="px-5 py-3 font-medium">Latest meeting</th>
              <th className="px-5 py-3 text-right font-medium">Minutes</th>
              <th className="px-5 py-3 text-right font-medium">Attended</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-xs text-muted">No CDRs match these filters.</td>
              </tr>
            )}
            {visible.map((c) => (
              <tr key={c.cdr} className="border-b border-border-subtle/60 last:border-0">
                <td className="px-5 py-2.5 font-medium text-foreground">{c.cdr}</td>
                <td className="px-5 py-2.5 text-muted">{c.teamLead}</td>
                <td className="px-5 py-2.5">
                  {c.latest ? (
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[c.latest]}`}>
                      {STATUS_LABEL[c.latest]}
                    </span>
                  ) : (
                    <span className="text-xs text-muted">Not on roster</span>
                  )}
                </td>
                <td className="px-5 py-2.5 text-right text-muted">
                  {c.latestMinutes === null ? "–" : `${c.latestMinutes} / ${latest.meeting.durationMinutes}`}
                </td>
                <td className="px-5 py-2.5 text-right text-foreground">
                  {c.present}/{c.meetings} <span className="text-muted">({Math.round(c.pct)}%)</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > VISIBLE_COUNT && (
        <div className="border-t border-border-subtle px-5 py-3 text-center">
          <button onClick={() => setExpanded((v) => !v)} className="text-xs font-medium text-accent hover:underline">
            {expanded ? "Show less" : `Show all ${rows.length}`}
          </button>
        </div>
      )}
    </motion.div>
  );
}
