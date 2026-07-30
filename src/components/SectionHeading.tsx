"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  accent?: string;
  subtitle?: string;
}

/**
 * Shared section heading: mono "01 / LABEL" eyebrow, big display title
 * (with optional accent-colored word), optional subtitle. Animates in
 * with a masked slide when scrolled into view.
 */
export default function SectionHeading({
  index,
  label,
  title,
  accent,
  subtitle,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          once: true,
        },
      });

      tl.from(".sh-label", {
        opacity: 0,
        x: -24,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(
          ".sh-title",
          { yPercent: 110, duration: 0.8, ease: "power4.out" },
          "-=0.25",
        )
        .from(
          ".sh-rule",
          { scaleX: 0, duration: 0.7, ease: "power3.inOut" },
          "-=0.5",
        );

      if (subtitle) {
        tl.from(
          ".sh-subtitle",
          { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" },
          "-=0.4",
        );
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mb-12 sm:mb-16 lg:mb-20">
      <p className="sh-label section-label mb-4">
        {index} / {label}
      </p>
      <div className="overflow-hidden">
        <h2 className="sh-title font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
          {title} {accent && <span className="text-brand">{accent}</span>}
        </h2>
      </div>
      <div className="sh-rule mt-6 h-px w-full bg-line origin-left" />
      {subtitle && (
        <p className="sh-subtitle mt-5 text-muted-foreground text-base sm:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
