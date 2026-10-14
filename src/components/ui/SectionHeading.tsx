import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  as = "h2",
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const Tag = as;

  return (
    <header className={cn("max-w-3xl", className)}>
      {index ? (
        <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-wine">
          {index}
        </p>
      ) : null}
      {eyebrow ? <p className="mb-3 text-sm text-muted">{eyebrow}</p> : null}
      <Tag className="font-display text-[2.5rem] leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl">
        {title}
      </Tag>
      {intro ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      ) : null}
    </header>
  );
}
