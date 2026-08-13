"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { reportTypes } from "@/lib/reportTypes";
import ReportTypeCard from "@/components/ReportTypeCard";
import BrandLogo from "@/components/BrandLogo";

export default function ReportsHub() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border-subtle bg-surface/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">
          <BrandLogo />
          <div className="h-8 w-px bg-border-subtle" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              Reports Center
            </h1>
            <p className="text-xs text-muted">Executive operations reporting</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Select a report
          </h2>
          <p className="mt-1 text-sm text-muted">
            Choose a report type to view its executive dashboard.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report, i) => (
            <ReportTypeCard key={report.slug} report={report} index={i} />
          ))}
        </div>
      </main>

      <footer className="flex items-center justify-center gap-3 border-t border-border-subtle px-6 py-4 text-center text-xs text-muted">
        <span>Colombo&amp;Hurd · Excel (Power BI) → Claude → Reports Center</span>
        <span className="text-border-subtle">·</span>
        <Link href="/admin" className="transition-colors hover:text-foreground">
          Admin
        </Link>
      </footer>
    </div>
  );
}
