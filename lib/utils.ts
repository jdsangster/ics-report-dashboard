import { clsx, type ClassValue } from "clsx";
import { Badge, SummaryStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function statusTextColor(status: SummaryStatus): string {
  if (status === "growth") return "text-success";
  if (status === "decline") return "text-danger";
  return "text-muted";
}

export function badgeStyles(badge: Badge): string {
  switch (badge) {
    case "🔺":
      return "bg-success/10 text-success border-success/30";
    case "🔻":
      return "bg-danger/10 text-danger border-danger/30";
    case "New":
      return "bg-accent/10 text-accent border-accent/30";
    default:
      return "bg-neutral-badge/10 text-muted border-neutral-badge/30";
  }
}
