"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { ReportData } from "@/lib/types";
import { formatNumber, parsePeriodStart } from "@/lib/utils";

interface WeeklyTrendChartProps {
  reports: ReportData[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

const VIEW_W = 700;
const VIEW_H = 220;
const PAD_LEFT = 48;
const PAD_RIGHT = 24;
const PAD_TOP = 24;
const PAD_BOTTOM = 32;
const PLOT_W = VIEW_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = VIEW_H - PAD_TOP - PAD_BOTTOM;
const TICK_COUNT = 4;
const MAX_POINTS = 3;

function niceBounds(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = Math.max((max - min) * 0.25, 50);
  const niceMin = Math.max(Math.floor((min - pad) / 100) * 100, 0);
  const niceMax = Math.ceil((max + pad) / 100) * 100;
  return { niceMin, niceMax: niceMax > niceMin ? niceMax : niceMin + 100 };
}

export default function WeeklyTrendChart({ reports, activeId, onSelect }: WeeklyTrendChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const weekly = useMemo(
    () =>
      reports
        .filter((r) => r.metadata.cadence === "Weekly")
        .slice()
        .sort(
          (a, b) =>
            parsePeriodStart(a.metadata.periodLabel) - parsePeriodStart(b.metadata.periodLabel)
        )
        .slice(-MAX_POINTS),
    [reports]
  );

  const { niceMin, niceMax } = useMemo(
    () => niceBounds(weekly.map((r) => r.summary.currentValue)),
    [weekly]
  );

  const points = useMemo(
    () =>
      weekly.map((r, i) => {
        const x =
          weekly.length === 1
            ? PAD_LEFT + PLOT_W / 2
            : PAD_LEFT + (i / (weekly.length - 1)) * PLOT_W;
        const ratio = (r.summary.currentValue - niceMin) / (niceMax - niceMin || 1);
        const y = PAD_TOP + PLOT_H - ratio * PLOT_H;
        return { x, y, value: r.summary.currentValue, label: r.metadata.periodLabel, id: r.id };
      }),
    [weekly, niceMin, niceMax]
  );

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const ticks = Array.from({ length: TICK_COUNT + 1 }, (_, i) => {
    const value = niceMin + ((niceMax - niceMin) * i) / TICK_COUNT;
    const y = PAD_TOP + PLOT_H - (i / TICK_COUNT) * PLOT_H;
    return { value: Math.round(value), y };
  });

  const getIndexFromEvent = (e: React.PointerEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
    const svg = svgRef.current;
    if (!svg || points.length === 0) return null;
    const rect = svg.getBoundingClientRect();
    const scaleX = VIEW_W / rect.width;
    const xInView = (e.clientX - rect.left) * scaleX;
    const fraction = points.length > 1 ? (xInView - PAD_LEFT) / PLOT_W : 0;
    return Math.min(points.length - 1, Math.max(0, Math.round(fraction * (points.length - 1))));
  };

  const handlePointerMove = (e: React.PointerEvent<SVGRectElement>) => {
    const index = getIndexFromEvent(e);
    if (index !== null) setHoverIndex(index);
  };

  const handleClick = (e: React.MouseEvent<SVGRectElement>) => {
    if (!onSelect) return;
    const index = getIndexFromEvent(e);
    if (index !== null) onSelect(points[index].id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-border-subtle bg-surface p-5"
    >
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp size={15} className="text-accent" />
        <div>
          <h2 className="text-sm font-semibold text-foreground">Weekly Total — Company-wide Trend</h2>
          <p className="text-xs text-muted">
            Total IC across all teams — last 3 weeks{onSelect ? ". Click a point to view that week." : ""}
          </p>
        </div>
      </div>

      {weekly.length < 2 ? (
        <p className="py-8 text-center text-sm text-muted">
          Not enough weekly reports yet to show a trend — publish at least two Weekly
          reports to see it here.
        </p>
      ) : (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="Line chart of weekly company-wide total IC over time"
        >
          {ticks.map((tick) => (
            <g key={tick.value}>
              <line
                x1={PAD_LEFT}
                x2={VIEW_W - PAD_RIGHT}
                y1={tick.y}
                y2={tick.y}
                stroke="var(--border-subtle)"
                strokeWidth={1}
              />
              <text
                x={PAD_LEFT - 10}
                y={tick.y}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted"
                fontSize={11}
              >
                {formatNumber(tick.value)}
              </text>
            </g>
          ))}

          {points.map((p, i) => {
            const isFirst = i === 0;
            const isLast = i === points.length - 1;
            const textAnchor = isFirst ? "start" : isLast ? "end" : "middle";
            return (
              <text
                key={`x-${i}`}
                x={p.x}
                y={VIEW_H - 8}
                textAnchor={textAnchor}
                className="fill-muted"
                fontSize={11}
              >
                {p.label}
              </text>
            );
          })}

          <path
            d={linePath}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {points.map((p, i) => {
            const isLast = i === points.length - 1;
            const isHovered = hoverIndex === i;
            const isActive = activeId !== undefined && p.id === activeId;
            const dotColor = isActive ? "var(--gold)" : "var(--accent)";
            return (
              <g key={i}>
                {(isLast || isHovered || isActive) && (
                  <circle cx={p.x} cy={p.y} r={7} fill="var(--surface)" />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isLast || isHovered || isActive ? 4 : 3}
                  fill={dotColor}
                />
                {(isLast || isActive) && (
                  <text
                    x={p.x}
                    y={p.y - 14}
                    textAnchor="middle"
                    className="fill-foreground font-semibold"
                    fontSize={13}
                  >
                    {formatNumber(p.value)}
                  </text>
                )}
              </g>
            );
          })}

          {hoverIndex !== null && (
            <g>
              <line
                x1={points[hoverIndex].x}
                x2={points[hoverIndex].x}
                y1={PAD_TOP}
                y2={PAD_TOP + PLOT_H}
                stroke="var(--border-subtle)"
                strokeWidth={1}
              />
              {(() => {
                const p = points[hoverIndex];
                const boxW = 96;
                const boxH = 40;
                const boxX = Math.min(Math.max(p.x - boxW / 2, PAD_LEFT), VIEW_W - PAD_RIGHT - boxW);
                const boxY = Math.max(p.y - boxH - 14, 4);
                return (
                  <g>
                    <rect
                      x={boxX}
                      y={boxY}
                      width={boxW}
                      height={boxH}
                      rx={8}
                      fill="var(--surface-elevated)"
                      stroke="var(--border-subtle)"
                      strokeWidth={1}
                    />
                    <text
                      x={boxX + boxW / 2}
                      y={boxY + 16}
                      textAnchor="middle"
                      className="fill-foreground font-semibold"
                      fontSize={13}
                    >
                      {formatNumber(p.value)}
                    </text>
                    <text
                      x={boxX + boxW / 2}
                      y={boxY + 30}
                      textAnchor="middle"
                      className="fill-muted"
                      fontSize={10}
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })()}
            </g>
          )}

          <rect
            x={PAD_LEFT}
            y={PAD_TOP}
            width={PLOT_W}
            height={PLOT_H}
            fill="transparent"
            className={onSelect ? "cursor-pointer" : undefined}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setHoverIndex(null)}
            onClick={handleClick}
          />
        </svg>
      )}
    </motion.div>
  );
}
