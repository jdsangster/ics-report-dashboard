"use client";

import { Info } from "lucide-react";
import { AttendanceData } from "@/lib/types";
import { ATTENDANCE_THRESHOLD } from "@/lib/attendanceUtils";

interface AttendanceMethodCardProps {
  /** Meetings in view, oldest first; the latest one sets the example. */
  meetings: AttendanceData[];
}

export default function AttendanceMethodCard({ meetings }: AttendanceMethodCardProps) {
  const pct = Math.round(ATTENDANCE_THRESHOLD * 100);
  const duration = meetings[meetings.length - 1].meeting.durationMinutes;
  const needed = Math.ceil(ATTENDANCE_THRESHOLD * duration);

  return (
    <div className="rounded-xl border border-border-subtle bg-surface px-5 py-4">
      <div className="flex items-center gap-2">
        <Info size={15} className="text-accent" />
        <h2 className="text-sm font-semibold text-foreground">How attendance is counted</h2>
      </div>
      <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-muted">
        <li>
          <span className="font-medium text-foreground">Present:</span> the CDR was in the meeting for at least {pct}%
          of its duration (in a {duration}-minute meeting, {needed} minutes or more).
        </li>
        <li>
          <span className="font-medium text-foreground">Not present:</span> below {pct}% they don&apos;t qualify, even
          if they joined late or left early (shown as &ldquo;Left early / late&rdquo;).
        </li>
        <li>
          <span className="font-medium text-foreground">Not counted:</span> a CDR who didn&apos;t join and doesn&apos;t
          work that day is excused and left out of the %. If they join anyway, they count as present.
        </li>
        <li>
          Time in the waiting room and note-taker bots don&apos;t count as attendance.
        </li>
      </ul>
    </div>
  );
}
