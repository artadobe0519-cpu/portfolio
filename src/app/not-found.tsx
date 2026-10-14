import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-5 py-24 md:px-8">
      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-wine">404</p>
      <h1 className="mt-4 font-display text-5xl tracking-[-0.03em] sm:text-7xl">This page is not in the archive.</h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
        The link may be mistyped, or the project may have moved. The portfolio and the home page are both intact.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          Browse the work
        </ButtonLink>
      </div>
    </div>
  );
}
