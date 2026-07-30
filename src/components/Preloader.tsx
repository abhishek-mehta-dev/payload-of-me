"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Full-screen boot loader shown on the homepage.
 * Counts to 100 in mono type, then wipes upward and unmounts.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDone(true);
        return;
      }

      const counter = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      tl.fromTo(
        ".preloader-name",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, ease: "power3.out" },
      )
        .to(
          counter,
          {
            value: 100,
            duration: 1.3,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(counter.value),
                ).padStart(3, "0");
              }
            },
          },
          "<",
        )
        .to(".preloader-bar-fill", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, "<")
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          delay: 0.15,
        });
    },
    { scope: rootRef },
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-6"
      aria-hidden
    >
      <div className="overflow-hidden">
        <div className="preloader-name font-display text-2xl sm:text-4xl font-bold tracking-tight">
          Abhishek<span className="text-brand">.</span>Mehta
        </div>
      </div>

      <div className="w-56 sm:w-72">
        <div className="h-px bg-line relative overflow-hidden">
          <div className="preloader-bar-fill absolute inset-0 bg-brand origin-left scale-x-0" />
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>$ npm run portfolio</span>
          <span>
            <span ref={counterRef}>000</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
