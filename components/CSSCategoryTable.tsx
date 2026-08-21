"use client";

import { CSSCategoryRow } from "@/lib/types";

interface CSSCategoryTableProps {
  rows: CSSCategoryRow[];
}

function trendColor(trend: string): string {
  if (trend.startsWith("⬆")) return "text-danger";
  if (trend.startsWith("⬇")) return "text-success";
  return "text-muted";
}

export default function CSSCategoryTable({ rows }: CSSCategoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-5 py-3 font-medium">Category</th>
            <th className="px-5 py-3 font-medium text-right">Previous</th>
            <th className="px-5 py-3 font-medium text-right">Current</th>
            <th className="px-5 py-3 font-medium">Trend</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.category}
              className="border-b border-border-subtle/60 last:border-0 hover:bg-surface-elevated/60"
            >
              <td className="px-5 py-2.5 font-medium text-foreground">{row.category}</td>
              <td className="px-5 py-2.5 text-right text-muted">{row.previousShare}%</td>
              <td className="px-5 py-2.5 text-right font-medium text-foreground">
                {row.currentShare}%
              </td>
              <td className={`px-5 py-2.5 text-xs font-medium ${trendColor(row.trend)}`}>
                {row.trend}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
