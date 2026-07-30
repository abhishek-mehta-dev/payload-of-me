"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SkillsOrb = dynamic(() => import("./SkillsOrb"), {
  ssr: false,
  loading: () => null,
});

function OrbFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center" aria-hidden>
      <div
        className="absolute inset-10 rounded-full opacity-25 blur-2xl"
        style={{ background: "var(--brand)" }}
      />
      <svg viewBox="0 0 120 120" className="w-[70%] animate-[spin_22s_linear_infinite]">
        <circle
          cx="60"
          cy="60"
          r="40"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <polygon
          points="60,22 92,40 92,80 60,98 28,80 28,40"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1"
          opacity="0.55"
        />
        <circle cx="60" cy="60" r="8" fill="var(--brand)" opacity="0.75" />
      </svg>
    </div>
  );
}

export default function DynamicSkillsOrb() {
  const [mode, setMode] = useState<"off" | "webgl" | "fallback">("off");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.innerWidth < 1024) {
      setMode("off");
      return;
    }
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setMode(gl ? "webgl" : "fallback");
    } catch {
      setMode("fallback");
    }
  }, []);

  if (mode === "off") return null;
  if (mode === "fallback") return <OrbFallback />;
  return <SkillsOrb />;
}
