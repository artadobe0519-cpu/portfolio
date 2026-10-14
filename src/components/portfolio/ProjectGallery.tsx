"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/types/portfolio";
import { ArtworkFrame } from "./ArtworkFrame";

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((current) => (current === null ? current : (current + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        setActive((current) =>
          current === null ? current : (current - 1 + images.length) % images.length,
        );
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active, images.length]);

  const current = active === null ? null : images[active];

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {images.map((image, index) => (
          <figure key={`${image.src}-${index}`} className={index === 0 ? "md:col-span-2" : undefined}>
            <button
              type="button"
              onClick={() => setActive(index)}
              className="block w-full text-left"
              aria-label={`Open ${image.alt}`}
            >
              <ArtworkFrame
                image={image}
                priority={index === 0}
                sizes={index === 0 ? "(min-width: 1024px) 80vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
              />
            </button>
            {image.caption ? (
              <figcaption className="mt-3 text-sm text-muted">{image.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {current && active !== null ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 text-ivory"
          role="dialog"
          aria-modal="true"
          aria-label="Artwork preview"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm text-ivory/70">
              {active + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={() => setActive(null)}
              autoFocus
              className="inline-flex min-h-11 min-w-11 items-center justify-center"
              aria-label="Close preview"
            >
              <X aria-hidden="true" size={20} />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4">
            <button
              type="button"
              onClick={() => setActive((active - 1 + images.length) % images.length)}
              className="absolute left-3 inline-flex min-h-11 min-w-11 items-center justify-center"
              aria-label="Previous artwork"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <div className="relative h-[70vh] w-full max-w-5xl">
              <ArtworkFrame image={current} sizes="90vw" unconstrained />
            </div>
            <button
              type="button"
              onClick={() => setActive((active + 1) % images.length)}
              className="absolute right-3 inline-flex min-h-11 min-w-11 items-center justify-center"
              aria-label="Next artwork"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          {current.caption ? <p className="px-6 py-4 text-center text-sm text-ivory/80">{current.caption}</p> : null}
        </div>
      ) : null}
    </>
  );
}
