import { whatsappHref } from "@/lib/utils";

export function WhatsAppButton({
  message,
  children = "WhatsApp",
  className = "",
}: {
  message?: string;
  children?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center rounded-full bg-[#163d32] px-5 text-sm font-medium text-ivory transition-colors hover:bg-ink ${className}`}
    >
      {children}
    </a>
  );
}
