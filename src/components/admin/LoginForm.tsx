"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, { message: "" });

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-5 py-16">
      <form action={action} className="w-full border border-line bg-paper p-8">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">Admin</p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.03em]">Work library</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Sign in to edit projects, images, and what appears on the public site.
        </p>
        <label htmlFor="admin-password" className="mb-2 mt-8 block text-sm">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="field"
        />
        {state.message ? (
          <p role="alert" className="mt-3 text-sm text-wine">
            {state.message}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-ivory hover:bg-wine disabled:opacity-60"
        >
          {pending ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
