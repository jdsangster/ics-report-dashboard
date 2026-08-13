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

/**
 * Splits long-form text into paragraphs for readability. Respects explicit
 * blank-line breaks (`\n\n`) if the source already has them; otherwise groups
 * sentences so a wall of text (e.g. a conclusion written as one block) still
 * reads as separate paragraphs.
 */
export function splitIntoParagraphs(text: string, sentencesPerParagraph = 2): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  if (/\n{2,}/.test(trimmed)) {
    return trimmed
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
  }

  const sentences = trimmed.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ])/);
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    paragraphs.push(sentences.slice(i, i + sentencesPerParagraph).join(" "));
  }
  return paragraphs;
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
