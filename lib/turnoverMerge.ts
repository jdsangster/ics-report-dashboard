import type { TurnoverEvent, TurnoverMetadata } from "./types";

export interface TurnoverRow {
  id: string;
  createdAt?: string;
  metadata: TurnoverMetadata;
  events: TurnoverEvent[];
}

function eventKey(e: Pick<TurnoverEvent, "cdr" | "outcome">): string {
  return `${e.cdr.trim().toLowerCase()}|${e.outcome}`;
}

function shortDate(iso: string): string {
  return iso.slice(5).replace("-", "/");
}

export function turnoverPeriodLabel(events: Pick<TurnoverEvent, "date">[]): string {
  const dates = events.map((e) => e.date).filter(Boolean).sort();
  if (dates.length === 0) return "—";
  return `${shortDate(dates[0])} – ${shortDate(dates[dates.length - 1])}`;
}

/**
 * Rebuilds the current turnover log from every published row, oldest first.
 * A "snapshot" row (legacy, full list) replaces the state; a "delta" row adds,
 * corrects (same cdr + outcome, latest wins) or removes events on top of it.
 */
export function mergeTurnoverRows(rowsOldestFirst: TurnoverRow[]): {
  events: TurnoverEvent[];
  periodLabel: string;
} {
  let state = new Map<string, TurnoverEvent>();
  for (const row of rowsOldestFirst) {
    if (row.metadata?.mode === "delta") {
      for (const ev of row.events) {
        if (ev.remove) {
          state.delete(eventKey(ev));
        } else {
          state.set(eventKey(ev), ev);
        }
      }
    } else {
      state = new Map();
      for (const ev of row.events) {
        if (!ev.remove) state.set(eventKey(ev), ev);
      }
    }
  }
  const events = Array.from(state.values())
    .map((e) => {
      const { remove: _remove, ...rest } = e;
      void _remove;
      return rest;
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.cdr.localeCompare(b.cdr)));
  return { events, periodLabel: turnoverPeriodLabel(events) };
}
