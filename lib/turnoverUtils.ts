import { TurnoverEvent } from "./types";

/** Calendar quarter key for an ISO date, e.g. "2026-08-14" -> "2026-Q3". */
export function quarterKey(date: string): string {
  const [year, month] = date.split("-").map(Number);
  return `${year}-Q${Math.floor((month - 1) / 3) + 1}`;
}

/** "2026-Q3" -> "Q3 2026". */
export function quarterLabel(key: string): string {
  const [year, q] = key.split("-");
  return `${q} ${year}`;
}

/** "2026-Q3" -> "Jul 1 – Sep 30". */
export function quarterRange(key: string): string {
  const [year, q] = key.split("-");
  const startMonth = (Number(q.slice(1)) - 1) * 3;
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(new Date(Number(year), startMonth, 1))} – ${fmt(new Date(Number(year), startMonth + 3, 0))}`;
}

/** Short grouping label for an exit reason: the explicit category, else the note. */
export function reasonOf(e: TurnoverEvent): string | undefined {
  return e.reasonCategory ?? e.note;
}
