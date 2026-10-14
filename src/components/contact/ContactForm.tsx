"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { siteConfig } from "../../../data/site-config";
import { submitEnquiry } from "@/app/contact/actions";
import {
  budgetLabel,
  enquiryServices,
  readContactFields,
  serviceTitle,
  validateContact,
  type ContactFields,
  type ContactResult,
} from "@/lib/contact";
import { enquiryWhatsappMessage, whatsappHref } from "@/lib/utils";

const initial: ContactResult = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initial);
  const [clientErrors, setClientErrors] = useState<Partial<Record<keyof ContactFields, string>>>({});
  const [draft, setDraft] = useState<ContactFields | null>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const field = serviceRef.current;
    if (!field) return;
    const preset = new URLSearchParams(window.location.search).get("service") ?? "";
    if (enquiryServices.some((item) => item.slug === preset)) field.value = preset;
  }, []);
  const errors = state.status === "invalid" ? state.errors : clientErrors;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const fields = readContactFields(new FormData(event.currentTarget));
    const nextErrors = validateContact(fields);
    setClientErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      return;
    }
    setDraft(fields);
  }

  return (
    <form action={formAction} onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field label="Name" name="name" error={errors.name}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={80}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="field"
        />
      </Field>
      <Field label="Email" name="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={120}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="field"
        />
      </Field>
      <Field label="Service" name="service" error={errors.service}>
        <select
          id="service"
          name="service"
          ref={serviceRef}
          defaultValue=""
          required
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "service-error" : undefined}
          className="field"
        >
          <option value="">Select a service</option>
          {enquiryServices.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Budget range" name="budget" error={errors.budget}>
        <select
          id="budget"
          name="budget"
          defaultValue=""
          required
          aria-invalid={Boolean(errors.budget)}
          aria-describedby={errors.budget ? "budget-error" : undefined}
          className="field"
        >
          <option value="">Select a range</option>
          {siteConfig.budgetRanges.map((range) => (
            <option key={range.id} value={range.id}>
              {range.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Project description" name="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={2000}
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="field min-h-36 resize-y"
        />
      </Field>

      <p className="text-xs leading-relaxed text-muted">
        Your note is used only to reply. It is not stored on this website. Budget ranges are enquiry
        brackets, not a published rate card.
      </p>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-ivory hover:bg-wine disabled:opacity-60"
      >
        {pending ? "Checking…" : "Send enquiry"}
      </button>

      <Status state={state} draft={draft} />
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="mt-2 text-sm text-wine">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Status({ state, draft }: { state: ContactResult; draft: ContactFields | null }) {
  if (state.status === "idle") return null;

  if (state.status === "sent") {
    return (
      <p role="status" className="text-sm text-ink">
        Your enquiry was sent. A thank-you email is on its way, and the studio has your note.
      </p>
    );
  }

  if (state.status === "unconfigured" && draft) {
    const message = enquiryWhatsappMessage({
      ...draft,
      service: serviceTitle(draft.service),
      budget: budgetLabel(draft.budget),
    });
    return (
      <div role="status" className="border-t border-line pt-4 text-sm leading-relaxed">
        <p>
          Email delivery is not connected, so this form did not send your message. WhatsApp and phone
          both work now.
        </p>
        <a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex text-wine underline-offset-4 hover:underline"
        >
          Send this enquiry on WhatsApp
        </a>
      </div>
    );
  }

  if (state.status === "error" || state.status === "rejected") {
    return (
      <p role="alert" className="text-sm text-wine">
        The message could not be sent. Please call or use WhatsApp.
      </p>
    );
  }

  return null;
}
