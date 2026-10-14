"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BackToTop } from "@/components/layout/BackToTop";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function SiteFrame({ children, jsonLd }: { children: ReactNode; jsonLd: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return (
      <main id="main" className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {jsonLd}
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
