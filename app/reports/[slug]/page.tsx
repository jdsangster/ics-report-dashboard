import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { getReportType } from "@/lib/reportTypes";

export default async function ComingSoonReportPage({
  params,
}: PageProps<"/reports/[slug]">) {
  const { slug } = await params;
  const report = getReportType(slug);

  if (!report) notFound();
  if (report.status === "live") notFound();

  const Icon = report.icon;

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border-subtle bg-surface/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={12} />
            Reports Hub
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-elevated text-muted">
          <Icon size={26} />
        </div>
        <h1 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
          {report.name}
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted">{report.description}</p>
        <span className="mt-5 flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-3 py-1.5 text-xs font-medium text-muted">
          <Lock size={12} />
          This report is coming soon
        </span>
        <Link
          href="/"
          className="mt-8 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
        >
          Back to Reports Hub
        </Link>
      </main>
    </div>
  );
}
