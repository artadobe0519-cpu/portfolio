import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const styles = {
  primary: "bg-ink text-ivory hover:bg-wine",
  secondary: "bg-transparent text-ink ring-1 ring-inset ring-ink/20 hover:bg-ink hover:text-ivory",
  light: "bg-ivory text-ink hover:bg-white",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-colors",
    styles[variant],
    className,
  );
  const external = href.startsWith("http");

  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
