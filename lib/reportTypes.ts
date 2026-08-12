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
    description: "Weekly Salesforce pipeline and activity summary by rep and team.",
    icon: Users,
    status: "coming-soon",
  },
  {
    slug: "total-calls",
    name: "Total Calls Report",
    description: "Aggregate call volume across all lines, teams, and channels.",
    icon: PhoneCall,
    status: "coming-soon",
  },
  {
    slug: "ic-show-up-rate",
    name: "IC and Show Up Rate",
    description: "Interested Call conversion and client show-up rate tracking.",
    icon: UserCheck,
    status: "coming-soon",
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
    description: "Case-level review outcomes and quality audit findings.",
    icon: Gavel,
    status: "coming-soon",
  },
  {
    slug: "weekend-report",
    name: "Weekend Report",
    description: "Weekend staffing coverage and operational summary.",
    icon: CalendarDays,
    status: "coming-soon",
  },
];

export function getReportType(slug: string): ReportTypeMeta | undefined {
  return reportTypes.find((r) => r.slug === slug);
}
