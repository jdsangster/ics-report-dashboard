"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ListOrdered,
  ChevronDown,
  UserX,
  LogOut,
  TrendingUp,
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  X,
} from "lucide-react";
import { TurnoverEvent, TurnoverOutcome } from "@/lib/types";

interface TurnoverLogTableProps {
  events: TurnoverEvent[];
}

type SortKey = "date" | "cdr" | "team" | "outcome" | "note";
type SortDir = "asc" | "desc";

const VISIBLE_COUNT = 10;
const ALL = "all";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "cdr", label: "CDR" },
  { key: "team", label: "Team" },
  { key: "outcome", label: "Outcome" },
  { key: "note", label: "Reason" },
];

function outcomeStyle(outcome: TurnoverOutcome): { className: string; icon: typeof UserX } {
  if (outcome === "Offboarded") {
    return { className: "border-danger/30 bg-danger/10 text-danger", icon: UserX };
  }
  if (outcome === "Quit") {
    return { className: "border-gold/30 bg-gold/10 text-gold", icon: LogOut };
  }
  return { className: "border-success/30 bg-success/10 text-success", icon: TrendingUp };
}

function monthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function sortValue(e: TurnoverEvent, key: SortKey): string {
  if (key === "note") return e.note ?? "";
  return e[key];
}

function SelectField({
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`appearance-none rounded-lg border border-border-subtle bg-surface-elevated py-2 pl-3 pr-9 text-xs font-medium text-foreground outline-none focus:border-accent ${className}`}
      >
        {children}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
      />
    </div>
  );
}

export default function TurnoverLogTable({ events }: TurnoverLogTableProps) {
  const [expanded, setExpanded] = useState(false);
  const [month, setMonth] = useState(ALL);
  const [outcome, setOutcome] = useState(ALL);
  const [reason, setReason] = useState(ALL);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const months = useMemo(
    () => Array.from(new Set(events.map((e) => e.date.slice(0, 7)))).sort().reverse(),
    [events]
  );
  const outcomes = useMemo(
    () => Array.from(new Set(events.map((e) => e.outcome))).sort(),
    [events]
  );
  const reasons = useMemo(
    () =>
      Array.from(
        new Set(events.map((e) => e.note).filter((n): n is string => Boolean(n)))
      ).sort(),
    [events]
  );

  const filtersActive =
    month !== ALL || outcome !== ALL || reason !== ALL || query.trim() !== "";

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = events.filter(
      (e) =>
        (month === ALL || e.date.slice(0, 7) === month) &&
        (outcome === ALL || e.outcome === outcome) &&
        (reason === ALL || e.note === reason) &&
        (q === "" || e.cdr.toLowerCase().includes(q))
    );
    const dir = sortDir === "asc" ? 1 : -1;
    return filtered.sort((a, b) => {
      const av = sortValue(a, sortKey);
      const bv = sortValue(b, sortKey);
      if (sortKey === "note" && (av === "") !== (bv === "")) return av === "" ? 1 : -1;
      const cmp = av.localeCompare(bv, "en", { sensitivity: "base" });
      if (cmp !== 0) return cmp * dir;
      return a.date === b.date ? a.cdr.localeCompare(b.cdr) : b.date.localeCompare(a.date);
    });
  }, [events, month, outcome, reason, query, sortKey, sortDir]);

  const visibleRows = expanded || filtersActive ? rows : rows.slice(0, VISIBLE_COUNT);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "date" ? "desc" : "asc");
    }
  };

  const clearFilters = () => {
    setMonth(ALL);
    setOutcome(ALL);
    setReason(ALL);
    setQuery("");
  };

  const sortHint =
    sortKey === "date"
      ? sortDir === "desc"
        ? "most recent first"
        : "oldest first"
      : `sorted by ${COLUMNS.find((c) => c.key === sortKey)?.label.toLowerCase()} (${
          sortDir === "asc" ? "A–Z" : "Z–A"
        })`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <ListOrdered size={15} className="text-accent" />
          <div>
            <h2 className="text-sm font-semibold text-foreground">Event Log</h2>
            <p className="text-xs text-muted">
              {filtersActive
                ? `${rows.length} of ${events.length} tracked changes`
                : `${events.length} tracked changes`}
              , {sortHint}
            </p>
          </div>
        </div>
        {!filtersActive && rows.length > VISIBLE_COUNT && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-accent/40 bg-accent/15 px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/25"
          >
            {expanded ? "Hide" : "Show all"}
            <ChevronDown size={18} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border-subtle px-5 py-3">
        <div className="relative">
          <Search
            size={13}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name…"
            aria-label="Search by name"
            className="w-48 rounded-lg border border-border-subtle bg-surface-elevated py-2 pl-8 pr-3 text-xs text-foreground outline-none placeholder:text-muted focus:border-accent"
          />
        </div>
        <SelectField
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          aria-label="Filter by month"
        >
          <option value={ALL}>All months</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {monthLabel(m)}
            </option>
          ))}
        </SelectField>
        <SelectField
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          aria-label="Filter by outcome"
        >
          <option value={ALL}>All outcomes</option>
          {outcomes.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </SelectField>
        {reasons.length > 0 && (
          <SelectField
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            aria-label="Filter by reason"
            className="max-w-[16rem] truncate"
          >
            <option value={ALL}>All reasons</option>
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r.length > 60 ? `${r.slice(0, 57)}…` : r}
              </option>
            ))}
          </SelectField>
        )}
        {filtersActive && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground"
          >
            <X size={13} />
            Clear filters
          </button>
        )}
      </div>

      <div className="overflow-x-auto border-t border-border-subtle">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
              {COLUMNS.map((col) => {
                const active = col.key === sortKey;
                const Icon = !active ? ArrowUpDown : sortDir === "asc" ? ArrowUp : ArrowDown;
                return (
                  <th
                    key={col.key}
                    className="px-5 py-3 font-medium"
                    aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button
                      onClick={() => toggleSort(col.key)}
                      className={`inline-flex items-center gap-1.5 uppercase tracking-wide transition-colors hover:text-foreground ${
                        active ? "text-foreground" : ""
                      }`}
                    >
                      {col.label}
                      <Icon size={12} className={active ? "text-accent" : "opacity-50"} />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="px-5 py-8 text-center text-xs text-muted">
                  No tracked changes match these filters.
                </td>
              </tr>
            )}
            {visibleRows.map((row, i) => {
              const style = outcomeStyle(row.outcome);
              return (
                <tr
                  key={`${row.cdr}-${row.date}-${i}`}
                  className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/60"
                >
                  <td className="whitespace-nowrap px-5 py-2.5 text-muted">{row.date}</td>
                  <td className="px-5 py-2.5 font-medium text-foreground">{row.cdr}</td>
                  <td className="px-5 py-2.5 text-muted">{row.team}</td>
                  <td className="px-5 py-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style.className}`}
                    >
                      <style.icon size={11} />
                      {row.outcome}
                    </span>
                  </td>
                  <td className="min-w-[18rem] max-w-md px-5 py-2.5 text-xs text-muted">
                    {row.note ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
