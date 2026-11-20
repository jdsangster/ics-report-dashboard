"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { AttendanceData } from "@/lib/types";
import { attended, isExcused, leadAttendance, shortDate, teamLabel, weekdayOf } from "@/lib/attendanceUtils";

interface AttendanceSummaryCardProps {
  /** Meetings, oldest first. */
  meetings: AttendanceData[];
}

export default function AttendanceSummaryCard({ meetings }: AttendanceSummaryCardProps) {
  const { latest, latestPct, overallPct, excused, lowest, unique } = useMemo(() => {
    const latest = meetings[meetings.length - 1];
    const eligible = latest.records.filter((r) => !isExcused(r, latest.meeting.durationMinutes));
    const present = eligible.filter((r) => attended(r, latest.meeting.durationMinutes)).length;
    const leads = leadAttendance(meetings);
    const seats = leads.reduce((s, l) => s + l.seats, 0);
    const overallPresent = leads.reduce((s, l) => s + l.present, 0);
    const lowest = leads[leads.length - 1];
    return {
      latest,
      latestPct: eligible.length ? (present / eligible.length) * 100 : 0,
      overallPct: seats ? (overallPresent / seats) * 100 : 0,
      excused: leads.reduce((s, l) => s + l.excused, 0),
      lowest,
      unique: leads.length > 1 && lowest.pct < leads[leads.length - 2].pct,
    };
  }, [meetings]);

  const items = [
    { label: "Meetings tracked", value: meetings.length, tone: "text-foreground" },
    {
      label: `${meetings.length > 1 ? "Latest meeting" : "Meeting"} · ${weekdayOf(latest.meeting.date)} ${shortDate(latest.meeting.date)}`,
      value: `${Math.round(latestPct)}%`,
      tone: "text-accent",
    },
    meetings.length > 1
      ? { label: "Overall attendance", value: `${Math.round(overallPct)}%`, tone: "text-foreground" }
      : { label: "Excused by schedule", value: excused, tone: "text-muted" },
    {
      label: unique ? "Lowest attendance" : "Lowest attendance (tied)",
      value: `${teamLabel(lowest.lead)} · ${Math.round(lowest.pct)}%`,
      tone: "text-danger",
      small: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
          className="rounded-xl border border-border-subtle bg-surface p-5"
        >
          <p className={`${item.small ? "text-xl leading-9" : "text-3xl"} font-semibold ${item.tone}`}>{item.value}</p>
          <p className="mt-1 text-xs text-muted">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
