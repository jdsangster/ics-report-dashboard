"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart } from "lucide-react";
import { CSSData } from "@/lib/types";

interface CSSTrendChartProps {
  reports: CSSData[];
  activeId: string;
  onSelect: (id: string) => void;
}

interface TrendPoint {
  id: string | null;
  label: string;
  sub: string;
  value: number;
  synthetic: boolean;
}

function parsePeriodStart(periodLabel: string): number {
  const firstPart = periodLabel.split(/[–-]/)[0].trim();
  const parsed = Date.parse(`${firstPart} ${new Date().getFullYear()}`);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function wrapLabel(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of text.split(" ")) {
    if (current && (current + " " + word).length > maxChars) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const LABEL_LINE_H = 13;

export default function CSSTrendChart({ reports, activeId, onSelect }: CSSTrendChartProps) {
  const points = useMemo<TrendPoint[]>(() => {
    const sorted = [...reports].sort(
      (a, b) => parsePeriodStart(a.metadata.periodLabel) - parsePeriodStart(b.metadata.periodLabel)
    );

    const realPoints: TrendPoint[] = sorted.map((r) => ({
      id: r.id,
      label: r.metadata.periodLabel,
      sub: `${r.volumeSummary.avgPerDay.toFixed(1)}/day`,
      value: r.volumeSummary.totalComplaints,
      synthetic: false,
    }));

    const earliest = sorted[0];
    if (!earliest) return realPoints;

    const previousPoint: TrendPoint = {
      id: null,
      label: "Previous Period",
      sub: `${earliest.volumeSummary.previousAvgPerDay.toFixed(1)}/day`,
      value: earliest.volumeSummary.previousTotal,
      synthetic: true,
    };

    return [previousPoint, ...realPoints];
  }, [reports]);

  if (points.length === 0) {
    return null;
  }

  const W = 640;
  const padL = 34;
  const padR = 24;
  const padT = 34;
  const innerH = 138;
  const innerW = W - padL - padR;
  const max = Math.max(...points.map((p) => p.value), 1);
  const stepX = points.length > 1 ? innerW / (points.length - 1) : innerW;
  // Wrap long period labels to the room between points (~7px per char at 11px).
  const maxChars = Math.max(10, Math.floor((stepX - 40) / 7));
  const wrapped = points.map((p) => wrapLabel(p.label, maxChars));
  const maxLines = Math.max(...wrapped.map((l) => l.length));
  const padB = 14 + maxLines * LABEL_LINE_H + 22;
  const H = padT + innerH + padB;
  const scaleY = (v: number) => padT + innerH - (v / max) * innerH;

  const coords = points.map((p, i) => ({
    ...p,
    lines: wrapped[i],
    x: padL + i * stepX,
    y: scaleY(p.value),
  }));

  const linePath = coords
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath =
    linePath +
    ` L ${coords[coords.length - 1].x.toFixed(1)},${(padT + innerH).toFixed(1)}` +
    ` L ${coords[0].x.toFixed(1)},${(padT + innerH).toFixed(1)} Z`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface"
    >
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-center gap-2">
          <LineChart size={15} className="text-accent" />
          <h2 className="text-sm font-semibold text-foreground">Total Complaints Trend</h2>
        </div>
        <p className="text-xs text-muted">
          Week-over-week comparison of total complaints. Click a point to view that week.
        </p>
      </div>

      <div className="px-5 py-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="cssTrendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className="text-accent" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="100%" className="text-accent" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 0.5, 1].map((f) => {
            const y = padT + innerH - f * innerH;
            return (
              <line
                key={f}
                x1={padL}
                y1={y}
                x2={W - padR}
                y2={y}
                className="text-border-subtle"
                stroke="currentColor"
                strokeWidth={1}
              />
            );
          })}

          <path d={areaPath} fill="url(#cssTrendGradient)" stroke="none" />
          <path
            d={linePath}
            fill="none"
            className="text-accent"
            stroke="currentColor"
            strokeWidth={2.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {coords.map((p, i) => {
            const isActive = !p.synthetic && p.id === activeId;
            const dotColorClass = p.synthetic
              ? "text-muted"
              : isActive
                ? "text-gold"
                : "text-accent";
            // Edge points anchor their labels inward so long text (e.g. full
            // period ranges) doesn't overflow past the SVG's left/right bounds.
            const anchor = i === 0 ? "start" : i === coords.length - 1 ? "end" : "middle";
            const labelX = anchor === "start" ? p.x - 6 : anchor === "end" ? p.x + 6 : p.x;

            return (
              <g
                key={p.label}
                onClick={() => p.id && onSelect(p.id)}
                className={p.synthetic ? "" : "cursor-pointer"}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isActive ? 7.5 : 5.5}
                  className={dotColorClass}
                  fill="currentColor"
                  stroke="var(--surface)"
                  strokeWidth={2.5}
                />
                <text
                  x={labelX}
                  y={p.y - 16}
                  textAnchor={anchor}
                  className="text-foreground"
                  fill="currentColor"
                  fontSize={13}
                  fontWeight={600}
                >
                  {p.value}
                </text>
                <text
                  x={labelX}
                  y={padT + innerH + 20}
                  textAnchor={anchor}
                  className="text-muted"
                  fill="currentColor"
                  fontSize={11}
                  fontWeight={600}
                >
                  <title>{p.label}</title>
                  {p.lines.map((line, li) => (
                    <tspan key={li} x={labelX} dy={li === 0 ? 0 : LABEL_LINE_H}>
                      {line}
                    </tspan>
                  ))}
                </text>
                <text
                  x={labelX}
                  y={padT + innerH + 20 + p.lines.length * LABEL_LINE_H + 1}
                  textAnchor={anchor}
                  className="text-muted"
                  fill="currentColor"
                  fontSize={10}
                >
                  {p.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
}
