"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

/** SVG stand-in — AI agent on a server base. */
function HeroFallback() {
  return (
    <div className="relative h-full w-full flex items-center justify-center" aria-hidden>
      <div
        className="absolute inset-[12%] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--brand)" }}
      />
      <svg viewBox="0 0 200 200" className="relative w-[72%] max-w-[420px] aspect-square">
        {/* Orbit ring */}
        <ellipse
          cx="100"
          cy="105"
          rx="78"
          ry="28"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="0.6"
          opacity="0.25"
          className="origin-center animate-[spin_18s_linear_infinite]"
          style={{ transformOrigin: "100px 105px" }}
        />

        {/* Mini workers */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const a = ((deg - 90) * Math.PI) / 180;
          const x = 100 + Math.cos(a) * 78;
          const y = 105 + Math.sin(a) * 28;
          return (
            <rect
              key={i}
              x={x - 5}
              y={y - 4}
              width="10"
              height="8"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="0.8"
              opacity="0.55"
            />
          );
        })}

        {/* Server base */}
        <polygon
          points="55,168 145,168 155,182 45,182"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1"
          opacity="0.4"
        />
        {[62, 92, 122].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y="150"
              width="22"
              height="18"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="0.9"
              opacity="0.5"
            />
            <rect
              x={x + 14}
              y="154"
              width="3"
              height="3"
              fill="var(--brand)"
              opacity="0.8"
              className="animate-pulse"
            />
          </g>
        ))}

        {/* Torso */}
        <rect
          x="82"
          y="118"
          width="36"
          height="30"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.2"
          opacity="0.55"
        />
        <polygon
          points="100,125 108,132 100,139 92,132"
          fill="var(--brand)"
          opacity="0.7"
        />

        {/* Neck */}
        <rect
          x="94"
          y="108"
          width="12"
          height="12"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1"
          opacity="0.45"
        />

        {/* Head */}
        <rect
          x="68"
          y="48"
          width="64"
          height="58"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.5"
          opacity="0.75"
        />
        {/* Eyes */}
        <rect
          x="78"
          y="68"
          width="14"
          height="8"
          fill="var(--brand)"
          opacity="0.85"
          className="animate-pulse"
        />
        <rect
          x="108"
          y="68"
          width="14"
          height="8"
          fill="var(--brand)"
          opacity="0.85"
          className="animate-pulse"
        />
        {/* Scan line */}
        <rect x="74" y="82" width="52" height="2" fill="var(--brand)" opacity="0.4" />
        {/* Mouth */}
        <rect x="88" y="92" width="24" height="4" fill="var(--brand)" opacity="0.65" />

        {/* Antenna */}
        <line
          x1="100"
          y1="48"
          x2="100"
          y2="32"
          stroke="var(--brand)"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="100" cy="28" r="5" fill="var(--brand)" opacity="0.85" className="animate-pulse" />
      </svg>
    </div>
  );
}

/**
 * Mounts the Three.js hero scene when WebGL + motion are available;
 * otherwise shows an animated SVG so the hero never looks empty.
 */
export default function DynamicHeroCanvas() {
  const [mode, setMode] = useState<"loading" | "webgl" | "fallback">("loading");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setMode("fallback");
      return;
    }
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false });
      setMode(gl ? "webgl" : "fallback");
    } catch {
      setMode("fallback");
    }
  }, []);

  if (mode === "loading") return null;
  if (mode === "fallback") return <HeroFallback />;
  return <HeroCanvas />;
}
