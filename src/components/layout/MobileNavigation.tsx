"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { siteConfig } from "../../../data/site-config";
import { cn, telHref } from "@/lib/utils";

export function MobileNavigation({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-ivory lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <p className="font-display text-xl">{siteConfig.name}</p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="inline-flex min-h-11 min-w-11 items-center justify-center"
          aria-label="Close menu"
        >
          <X aria-hidden="true" size={22} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Mobile">
        {siteConfig.nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={cn(
                "font-display text-5xl tracking-[-0.03em]",
                active ? "text-wine" : "text-ink",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line px-6 py-6">
        <a href={telHref()} className="text-sm tracking-wide">
          {siteConfig.phone.display}
        </a>
        <p className="mt-2 text-sm text-muted">{siteConfig.location.short}</p>
      </div>
    </div>
  );
}
