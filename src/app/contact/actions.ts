"use server";

import { readContactFields, validateContact, type ContactResult } from "@/lib/contact";
import { canSendMail, sendEnquiryEmails } from "@/lib/mail";

export async function submitEnquiry(
  _previous: ContactResult,
  formData: FormData,
): Promise<ContactResult> {
  const fields = readContactFields(formData);
  if (fields.companyWebsite) return { status: "rejected" };

  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  if (!canSendMail()) return { status: "unconfigured" };

  try {
    const sent = await sendEnquiryEmails(fields);
    if (!sent) return { status: "unconfigured" };
    return { status: "sent" };
  } catch (error) {
    console.error(
      "[contact] Email delivery failed.",
      error instanceof Error ? error.message : "Unknown error",
    );
    return { status: "error" };
  }
}
