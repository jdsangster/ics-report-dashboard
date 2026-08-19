"use client";

import Link from "next/link";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { ReportListItem, Cadence } from "@/lib/types";
import BrandLogo from "@/components/BrandLogo";

interface ReportHeaderProps {
  reports: ReportListItem[];
  cadence: Cadence | "All";
  onCadenceChange: (cadence: Cadence | "All") => void;
  selectedId: string;
  onSelectedIdChange: (id: string) => void;
  title: string;
  subtitle: string;
}

const CADENCE_ORDER: Cadence[] = ["Weekly", "Daily", "Weekend"];

export default function ReportHeader({
  reports,
  cadence,
  onCadenceChange,
  selectedId,
  onSelectedIdChange,
  title,
  subtitle,
}: ReportHeaderProps) {
  const filteredReports =
    cadence === "All" ? reports : reports.filter((r) => r.metadata.cadence === cadence);

  const presentCadences = CADENCE_ORDER.filter((c) =>
    reports.some((r) => r.metadata.cadence === c)
  );
  const showCadenceToggle = presentCadences.length > 1;
  const cadenceOptions: (Cadence | "All")[] = ["All", ...presentCadences];

  return (
    <header className="border-b border-border-subtle bg-surface/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <BrandLogo />
          <div className="h-8 w-px bg-border-subtle" />
          <div>
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft size={12} />
                Reports Hub
              </Link>
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
            <p className="text-xs text-muted">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {showCadenceToggle && (
            <div className="flex rounded-lg border border-border-subtle bg-surface p-1">
              {cadenceOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => onCadenceChange(c)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    cadence === c
                      ? "bg-accent text-white shadow-sm"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {c === "All" ? "All Reports" : c}
                </button>
              ))}
            </div>
          )}

          <div className="relative">
            <select
              value={selectedId}
              onChange={(e) => onSelectedIdChange(e.target.value)}
              className="appearance-none rounded-lg border border-border-subtle bg-surface px-3 py-2 pr-8 text-xs font-medium text-foreground outline-none focus:border-accent"
            >
              {filteredReports.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.metadata.cadence} · {r.metadata.periodLabel}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
