import {
  Activity,
  AlertTriangle,
  CalendarDays,
  Gavel,
  MessageSquareWarning,
  PhoneCall,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface ReportTypeMeta {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  status: "live" | "coming-soon";
  /** false for reports that aren't published via the /admin JSON flow (e.g. static embeds). Defaults to true. */
  publishable?: boolean;
}

export const reportTypes: ReportTypeMeta[] = [
  {
    slug: "ics",
    name: "ICS Performance Report",
    description: "Inbound call (IC) volume, agent averages, and team totals — Daily, Weekend, and Weekly cadences.",
    icon: Activity,
    status: "live",
  },
  {
    slug: "sf-weekly",
    name: "SF Weekly Report",
    description: "Short Funnel coverage vs. the daily target, by CDR — who's meeting it and who isn't.",
    icon: Users,
    status: "live",
  },
  {
    slug: "total-calls",
    name: "Total Calls Report",
    description: "Aggregate call volume across all lines, teams, and channels.",
    icon: PhoneCall,
    status: "live",
  },
  {
    slug: "ic-show-up-rate",
    name: "IC and Show Up Rate",
    description: "Post-qualification conversion ranking — CDRs grouped into performance tiers from Elite to Critical Opportunity Area.",
    icon: UserCheck,
    status: "live",
  },
  {
    slug: "ic-inconsistency",
    name: "IC Inconsistency",
    description: "Flags contributors with erratic day-to-day IC performance.",
    icon: AlertTriangle,
    status: "coming-soon",
  },
  {
    slug: "operational-complaints",
    name: "Operational Complaint Analysis (CSS)",
    description: "Customer service complaint trends and root-cause breakdown.",
    icon: MessageSquareWarning,
    status: "coming-soon",
  },
  {
    slug: "cl-case-review",
    name: "CL Case Review",
    description: "Case-level review outcomes and quality audit findings — CDR and Setter case log with filters, charts, and search.",
    icon: Gavel,
    status: "live",
  },
  {
    slug: "weekend-report",
    name: "Weekend Report",
    description: "Weekend IC production by team, top performers, and coverage gaps.",
    icon: CalendarDays,
    status: "live",
  },
];

export function getReportType(slug: string): ReportTypeMeta | undefined {
  return reportTypes.find((r) => r.slug === slug);
}
