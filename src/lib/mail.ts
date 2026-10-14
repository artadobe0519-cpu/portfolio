import nodemailer from "nodemailer";
import { siteConfig } from "../../data/site-config";
import { budgetLabel, oneLine, serviceTitle, type ContactFields } from "@/lib/contact";

function mailer() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!user || !pass || !to) return null;

  return {
    to,
    from: `"${siteConfig.name}" <${user}>`,
    transport: nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    }),
  };
}

export function canSendMail() {
  return mailer() !== null;
}

export async function sendEnquiryEmails(fields: ContactFields) {
  const delivery = mailer();
  if (!delivery) return false;

  const service = serviceTitle(fields.service);
  const budget = budgetLabel(fields.budget);
  const name = oneLine(fields.name);
  const email = oneLine(fields.email);

  await delivery.transport.sendMail({
    from: delivery.from,
    to: delivery.to,
    replyTo: email,
    subject: `Portfolio enquiry from ${name}`,
    text: [
      "A new project enquiry arrived from the portfolio.",
      "",
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Service: ${service}`,
      `Budget: ${budget}`,
      "",
      fields.message,
    ].join("\n"),
  });

  await delivery.transport.sendMail({
    from: delivery.from,
    to: email,
    replyTo: delivery.to,
    subject: `Thank you for your enquiry, ${name}`,
    text: [
      `Hello ${fields.name},`,
      "",
      `Thank you for writing to ${siteConfig.name}. Your enquiry has arrived, and you will get a reply by email.`,
      "",
      `Service: ${service}`,
      `Budget: ${budget}`,
      "",
      "Your message:",
      fields.message,
      "",
      siteConfig.name,
      siteConfig.profession,
      siteConfig.location.display,
      siteConfig.phone.display,
    ].join("\n"),
  });

  return true;
}
