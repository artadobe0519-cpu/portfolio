"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "../../../data/site-config";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "./MobileNavigation";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-[90rem] items-center justify-between px-5 md:px-8 lg:px-12">
        <Link href="/" className="font-display text-xl tracking-[-0.03em] text-ink">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "text-sm tracking-wide",
                isActive(pathname, item.href) ? "text-wine" : "text-ink/80 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-full bg-ink px-4 text-sm text-ivory transition-colors hover:bg-wine sm:inline-flex"
          >
            Start a project
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Menu aria-hidden="true" size={22} />
          </button>
        </div>
      </div>
      <div id="mobile-navigation">
        <MobileNavigation open={open} pathname={pathname} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
}
