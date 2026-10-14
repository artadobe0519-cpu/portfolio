import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { WorkManager } from "@/components/admin/WorkManager";
import { isAdmin } from "@/lib/admin-auth";
import { getAdminCatalog } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work library",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-5 py-24">
          <p className="text-sm text-muted">Opening the work library…</p>
        </div>
      }
    >
      <AdminLibrary />
    </Suspense>
  );
}

async function AdminLibrary() {
  if (!process.env.ADMIN_PASSWORD?.trim()) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">Admin</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-0.03em]">Work library</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Add ADMIN_PASSWORD to the .env file and restart the server. The library stays closed until then.
        </p>
      </div>
    );
  }

  if (!(await isAdmin())) return <LoginForm />;

  const projects = await getAdminCatalog();
  return <WorkManager projects={projects} />;
}
