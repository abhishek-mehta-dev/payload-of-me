"use client";

import { useEffect, useState } from "react";

export default function BlogReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-[72px] left-0 right-0 z-40 h-0.5 bg-line/50"
      aria-hidden
    >
      <div
        className="h-full bg-brand transition-[width] duration-150 ease-out shadow-[0_0_12px_color-mix(in_oklch,var(--brand)_60%,transparent)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
