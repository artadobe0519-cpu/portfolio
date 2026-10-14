"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryImage } from "@/types/portfolio";
import { aspectClass, cn } from "@/lib/utils";

export function ArtworkFrame({
  image,
  sizes,
  priority = false,
  className,
  unconstrained = false,
}: {
  image: GalleryImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  unconstrained?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const fit = image.fit ?? "contain";
  const dark = image.frame === "dark";

  function reportMissing() {
    console.warn(
      `[portfolio] Missing image ${image.src}. Add the file under public or run npm run sync:artwork.`,
    );
    setFailed(true);
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        unconstrained ? "h-full w-full" : aspectClass(image.aspect),
        dark ? "bg-ink" : "bg-[#f7f3ee]",
        className,
      )}
    >
      {failed ? (
        <div
          className="absolute inset-0 grid place-items-center px-6 text-center"
          role="img"
          aria-label={image.alt}
        >
          <p className={cn("max-w-xs text-sm", dark ? "text-ivory/80" : "text-muted")}>
            This artwork file is missing. Add {image.src} or run the artwork sync.
          </p>
        </div>
      ) : fit === "contain" ? (
        <div className="absolute inset-0 p-4 sm:p-6">
          <div className="relative h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-contain"
              onError={reportMissing}
            />
          </div>
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={reportMissing}
        />
      )}
    </div>
  );
}
