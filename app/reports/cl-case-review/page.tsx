import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function CLCaseReviewPage() {
  return (
    <div className="flex h-[100dvh] flex-col">
      <header className="border-b border-border-subtle bg-surface/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">
          <BrandLogo />
          <div className="h-8 w-px bg-border-subtle" />
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={12} />
            Reports Hub
          </Link>
        </div>
      </header>
      <iframe
        src="/reports/cl-case-review.html"
        title="CL Case Review"
        className="min-h-0 w-full flex-1 border-0"
      />
    </div>
  );
}
