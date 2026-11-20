"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { AttendanceData } from "@/lib/types";
import { ATTENDANCE_THRESHOLD, leadAttendance, shortDate } from "@/lib/attendanceUtils";

interface AttendanceTeamCardProps {
  /** Meetings, oldest first. */
  meetings: AttendanceData[];
}

function pctTone(pct: number): string {
  if (pct >= 85) return "text-success";
  if (pct >= 65) return "text-gold";
  return "text-danger";
}

export default function AttendanceTeamCard({ meetings }: AttendanceTeamCardProps) {
  const stats = useMemo(() => leadAttendance(meetings), [meetings]);
  if (stats.length === 0) return null;

  const hasBest = stats.length > 1 && stats[0].pct > stats[1].pct;
  const lowest = stats[stats.length - 1];
  const hasLowest = stats.length > 1 && lowest.pct < stats[stats.length - 2].pct;
  // Most recent meetings first, capped so the table stays readable.
  const columns = meetings.slice(-6).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <Users size={15} className="text-accent" />
          <h2 className="text-sm font-semibold text-foreground">Attendance by Team</h2>
        </div>
        <p className="text-xs text-muted">
          Share of each team&apos;s CDRs who were in the meeting for at least {Math.round(ATTENDANCE_THRESHOLD * 100)}% of
          it, across all meetings. Lowest at the bottom.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 font-medium">Team</th>
              <th className="px-5 py-3 font-medium">Attendance</th>
              <th className="px-5 py-3 text-right font-medium">CDRs</th>
              {columns.map((m) => (
                <th key={m.meeting.date} className="px-5 py-3 text-right font-medium">
                  {shortDate(m.meeting.date)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.map((s, i) => {
              const roster = s.perMeeting[s.perMeeting.length - 1]?.seats ?? 0;
              return (
                <tr key={s.lead} className="border-b border-border-subtle/60 last:border-0">
                  <td className="px-5 py-3">
                    <span className="font-medium text-foreground">{s.lead}</span>
                    {s.team && <span className="ml-2 text-xs text-muted">{s.team}</span>}
                    {i === 0 && hasBest && (
                      <span className="ml-2 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                        Best attendance
                      </span>
                    )}
                    {s.lead === lowest.lead && hasLowest && (
                      <span className="ml-2 rounded-full bg-danger/15 px-2 py-0.5 text-[10px] font-medium text-danger">
                        Lowest attendance
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-28 rounded-full bg-border-subtle">
                        <div className="h-1.5 rounded-full bg-gold" style={{ width: `${s.pct}%` }} />
                      </div>
                      <span className="text-xs text-foreground">
                        {Math.round(s.pct)}% <span className="text-muted">({s.present}/{s.seats})</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right text-muted">{roster}</td>
                  {columns.map((m) => {
                    const p = s.perMeeting.find((x) => x.date === m.meeting.date);
                    return (
                      <td key={m.meeting.date} className={`px-5 py-3 text-right ${p ? pctTone(p.pct) : "text-muted"}`}>
                        {p && p.seats ? `${Math.round(p.pct)}%` : "–"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
