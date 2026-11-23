"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { AttendanceData } from "@/lib/types";
import { ATTENDANCE_THRESHOLD, meetingsOldestFirst, shortDate, weekdayOf } from "@/lib/attendanceUtils";
import BrandLogo from "@/components/BrandLogo";
import AttendanceSummaryCard from "@/components/AttendanceSummaryCard";
import AttendanceTeamCard from "@/components/AttendanceTeamCard";
import AttendanceCdrTable from "@/components/AttendanceCdrTable";
import AttendanceExcusedCard from "@/components/AttendanceExcusedCard";
import AttendanceMethodCard from "@/components/AttendanceMethodCard";

export default function CdrAttendancePage() {
  const [reports, setReports] = useState<AttendanceData[]>([]);
  const [source, setSource] = useState<"mock" | "live" | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reports?type=cdr-attendance")
      .then((res) => res.json())
      .then((data: { source: "mock" | "live"; reports: AttendanceData[] }) => {
        if (cancelled) return;
        setReports(data.reports);
        setSource(data.source);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const allMeetings = useMemo(() => meetingsOldestFirst(reports), [reports]);
  // One meeting picked from the dropdown, or every meeting stacked together.
  const meetings = useMemo(() => {
    const one = allMeetings.filter((m) => m.meeting.date === selected);
    return one.length > 0 ? one : allMeetings;
  }, [allMeetings, selected]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted">
        Loading report data…
      </div>
    );
  }

  if (allMeetings.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-sm text-muted">
        <p>No reports available yet.</p>
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/50"
        >
          <ArrowLeft size={13} />
          Volver a Reports Hub
        </Link>
      </div>
    );
  }

  const latest = meetings[meetings.length - 1];

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border-subtle bg-logo-bg">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo />
            <div className="h-8 w-px bg-border-subtle" />
            <div>
              <Link
                href="/"
                className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft size={12} />
                Reports Hub
              </Link>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">CDR Attendance</h1>
              <p className="text-xs text-muted">Tuesday &amp; Friday CDR meetings</p>
            </div>
          </div>
          <div className="relative">
            <select
              value={meetings.length === 1 ? meetings[0].meeting.date : "all"}
              onChange={(e) => setSelected(e.target.value)}
              aria-label="Meeting"
              className="appearance-none rounded-lg border border-border-subtle bg-surface px-3 py-2 pr-8 text-xs font-medium text-foreground outline-none focus:border-accent"
            >
              <option value="all">All meetings ({allMeetings.length})</option>
              {[...allMeetings].reverse().map((m) => (
                <option key={m.meeting.date} value={m.meeting.date}>
                  {weekdayOf(m.meeting.date)} {shortDate(m.meeting.date)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-6 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground">CDR Meeting Attendance</h2>
              <p className="text-xs text-muted">
                Which team attends the CDR meetings the least. A CDR counts as present when they were in for at least{" "}
                {Math.round(ATTENDANCE_THRESHOLD * 100)}% of the meeting.
              </p>
            </div>
            {source === "mock" && (
              <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                Demo Mode / Portfolio Preview
              </span>
            )}
          </div>

          <AttendanceSummaryCard meetings={meetings} />
          <AttendanceTeamCard meetings={meetings} />
          <AttendanceCdrTable meetings={meetings} />
          <AttendanceExcusedCard meetings={meetings} />
          <AttendanceMethodCard meetings={meetings} />
        </motion.div>
      </main>

      <footer className="border-t border-border-subtle px-6 py-4 text-center text-xs text-muted">
        Colombo&amp;Hurd · Zoom participants export → Claude → Reports Center
      </footer>
    </div>
  );
}
