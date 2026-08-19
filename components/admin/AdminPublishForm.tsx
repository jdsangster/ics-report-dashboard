"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LogOut, Send, XCircle } from "lucide-react";
import { reportTypes } from "@/lib/reportTypes";

type Status = { type: "success"; id: string } | { type: "error"; message: string } | null;

const liveReportTypes = reportTypes.filter((r) => r.status === "live");

export default function AdminPublishForm() {
  const router = useRouter();
  const [reportType, setReportType] = useState(liveReportTypes[0]?.slug ?? "ics");
  const [jsonText, setJsonText] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [publishing, setPublishing] = useState(false);

  const handlePublish = async () => {
    setStatus(null);

    let payload: unknown;
    try {
      payload = JSON.parse(jsonText);
    } catch {
      setStatus({ type: "error", message: "El texto pegado no es JSON válido." });
      return;
    }

    setPublishing(true);
    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportType, payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({ type: "error", message: data.error ?? "No se pudo publicar el reporte." });
        return;
      }
      setStatus({ type: "success", id: data.id });
      setJsonText("");
    } finally {
      setPublishing(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Publicar nuevo reporte
          </h1>
          <p className="mt-1 text-sm text-muted">
            Elige el tipo de reporte y pega el JSON generado por tu chat de Claude.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg border border-border-subtle px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          <LogOut size={13} />
          Cerrar sesión
        </button>
      </div>

      <label htmlFor="report-type" className="mb-1.5 block text-xs font-medium text-muted">
        Tipo de reporte
      </label>
      <select
        id="report-type"
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
        className="mb-4 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
      >
        {liveReportTypes.map((r) => (
          <option key={r.slug} value={r.slug}>
            {r.name}
          </option>
        ))}
      </select>

      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        placeholder='{ "metadata": { "cadence": "Weekly", ... }, ... }'
        spellCheck={false}
        className="h-96 w-full resize-y rounded-xl border border-border-subtle bg-surface p-4 font-mono text-xs text-foreground outline-none focus:border-accent"
      />

      {status?.type === "error" && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
          <XCircle size={14} className="mt-0.5 shrink-0" />
          {status.message}
        </div>
      )}

      {status?.type === "success" && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-xs text-success">
          <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
          Reporte publicado correctamente (id: {status.id}).
        </div>
      )}

      <button
        onClick={handlePublish}
        disabled={publishing || jsonText.trim().length === 0}
        className="mt-4 flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send size={14} />
        {publishing ? "Publicando…" : "Publicar reporte"}
      </button>
    </div>
  );
}
