import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminPublishForm from "@/components/admin/AdminPublishForm";

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

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

      {authenticated ? <AdminPublishForm /> : <AdminLoginForm />}
    </div>
  );
}
