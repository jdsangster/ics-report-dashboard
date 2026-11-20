import { AttendanceData, AttendanceRecord } from "./types";
import { teamOfLead } from "./scorecardUtils";

/** A CDR counts as present when they were in at least this share of the meeting. */
export const ATTENDANCE_THRESHOLD = 0.9;

export function attended(r: AttendanceRecord, durationMinutes: number): boolean {
  return durationMinutes > 0 && r.minutes >= ATTENDANCE_THRESHOLD * durationMinutes;
}

/** Excused by schedule and not there: leaves the denominator instead of counting as a miss. A CDR who attends anyway counts as present. */
export function isExcused(r: AttendanceRecord, durationMinutes: number): boolean {
  return Boolean(r.excused) && !attended(r, durationMinutes);
}

export function weekdayOf(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" });
}

export function shortDate(iso: string): string {
  return iso.slice(5).replace("-", "/");
}

/** Meetings oldest first (one published row per meeting; a re-published date replaces the earlier row). */
export function meetingsOldestFirst(reports: AttendanceData[]): AttendanceData[] {
  const byDate = new Map<string, AttendanceData>();
  for (const r of [...reports].sort((a, b) => (a.createdAt ?? "").localeCompare(b.createdAt ?? ""))) {
    byDate.set(r.meeting.date, r);
  }
  return Array.from(byDate.values()).sort((a, b) => a.meeting.date.localeCompare(b.meeting.date));
}

export interface LeadAttendance {
  lead: string;
  team: string | undefined;
  /** Seats = CDRs who could attend (roster minus the excused), summed over every meeting. */
  seats: number;
  /** Excused-by-schedule seats, summed over every meeting. */
  excused: number;
  present: number;
  pct: number;
  /** % per meeting, oldest first (aligned with the meetings passed in). */
  perMeeting: { date: string; present: number; seats: number; excused: number; pct: number }[];
}

/** Attendance by team lead across all meetings, highest first. */
export function leadAttendance(meetings: AttendanceData[]): LeadAttendance[] {
  const leads = Array.from(new Set(meetings.flatMap((m) => m.records.map((r) => r.teamLead))));
  const stats = leads.map((lead) => {
    const perMeeting = meetings.map((m) => {
      const all = m.records.filter((r) => r.teamLead === lead);
      const mine = all.filter((r) => !isExcused(r, m.meeting.durationMinutes));
      const present = mine.filter((r) => attended(r, m.meeting.durationMinutes)).length;
      return {
        date: m.meeting.date,
        present,
        seats: mine.length,
        excused: all.length - mine.length,
        pct: mine.length ? (present / mine.length) * 100 : 0,
      };
    });
    const seats = perMeeting.reduce((s, p) => s + p.seats, 0);
    const present = perMeeting.reduce((s, p) => s + p.present, 0);
    const excused = perMeeting.reduce((s, p) => s + p.excused, 0);
    return { lead, team: teamOfLead(lead), seats, excused, present, pct: seats ? (present / seats) * 100 : 0, perMeeting };
  });
  return stats.sort((a, b) => b.pct - a.pct || a.lead.localeCompare(b.lead));
}

export interface CdrAttendance {
  cdr: string;
  teamLead: string;
  meetings: number;
  present: number;
  pct: number;
  /** null when the CDR was not on the latest meeting's roster. */
  latest: "present" | "partial" | "absent" | "excused" | null;
  latestMinutes: number | null;
}

export function cdrAttendance(meetings: AttendanceData[]): CdrAttendance[] {
  const latest = meetings[meetings.length - 1];
  const names = new Map<string, string>();
  for (const m of meetings) for (const r of m.records) names.set(r.cdr, r.teamLead);
  const rows = Array.from(names.entries()).map(([cdr, teamLead]) => {
    let seats = 0;
    let present = 0;
    for (const m of meetings) {
      const rec = m.records.find((r) => r.cdr === cdr);
      if (!rec || isExcused(rec, m.meeting.durationMinutes)) continue;
      seats += 1;
      if (attended(rec, m.meeting.durationMinutes)) present += 1;
    }
    const last = latest?.records.find((r) => r.cdr === cdr);
    const lastStatus: CdrAttendance["latest"] = !last
      ? null
      : attended(last, latest.meeting.durationMinutes)
        ? "present"
        : isExcused(last, latest.meeting.durationMinutes)
          ? "excused"
          : last.minutes > 0
            ? "partial"
            : "absent";
    return {
      cdr,
      teamLead,
      meetings: seats,
      present,
      pct: seats ? (present / seats) * 100 : 0,
      latest: lastStatus,
      latestMinutes: last ? last.minutes : null,
    };
  });
  // CDRs with no eligible meeting yet (always excused) go last.
  return rows.sort((a, b) => (a.meetings === 0 ? 1 : 0) - (b.meetings === 0 ? 1 : 0) || a.pct - b.pct || a.cdr.localeCompare(b.cdr));
}

export function teamLabel(lead: string): string {
  const team = teamOfLead(lead);
  return team ? `${lead} · ${team}` : lead;
}

