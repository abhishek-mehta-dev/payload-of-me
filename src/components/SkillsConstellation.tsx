"use client";

import { useEffect, useState } from "react";
import {
  SiNodedotjs,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiNginx,
  SiPython,
  SiNestjs,
  SiFastapi,
} from "react-icons/si";

const INNER = [
  { Icon: SiNodedotjs, color: "#339933", label: "Node" },
  { Icon: SiTypescript, color: "#3178C6", label: "TS" },
  { Icon: SiReact, color: "#61DAFB", label: "React" },
  { Icon: SiNestjs, color: "#E0234E", label: "Nest" },
];

const OUTER = [
  { Icon: SiNextdotjs, color: "currentColor", label: "Next" },
  { Icon: SiMongodb, color: "#47A248", label: "Mongo" },
  { Icon: SiPostgresql, color: "#336791", label: "PG" },
  { Icon: SiRedis, color: "#DC382D", label: "Redis" },
  { Icon: SiDocker, color: "#2496ED", label: "Docker" },
  { Icon: SiNginx, color: "#009639", label: "Nginx" },
  { Icon: SiPython, color: "#3776AB", label: "Python" },
  { Icon: SiFastapi, color: "#009688", label: "FastAPI" },
];

type Props = {
  active?: number;
};

/** Orbiting tech icons around a live stack core — replaces the empty hexagon orb. */
export default function SkillsConstellation({ active = 0 }: Props) {
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="relative h-full w-full" aria-hidden>
      <div
        className="absolute inset-[18%] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--brand)" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[42%] w-[42%] rounded-full border border-brand/20" />
        <div className="absolute h-[68%] w-[68%] rounded-full border border-dashed border-brand/25" />
        <div className="absolute h-[92%] w-[92%] rounded-full border border-brand/15" />
      </div>

      <div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
      <div className="absolute top-[8%] bottom-[8%] left-1/2 w-px bg-gradient-to-b from-transparent via-brand/25 to-transparent" />

      {/* Inner orbit */}
      <div className={`absolute inset-0 ${motion ? "orbit-spin" : ""}`}>
        {INNER.map(({ Icon, color, label }, i) => {
          const a = (i / INNER.length) * Math.PI * 2 - Math.PI / 2;
          const r = 21;
          const x = 50 + Math.cos(a) * r;
          const y = 50 + Math.sin(a) * r;
          return (
            <div
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-card/90 shadow-sm backdrop-blur-sm ${
                  motion ? "orbit-counter" : ""
                }`}
                title={label}
              >
                <Icon
                  className="text-lg"
                  style={{
                    color: color === "currentColor" ? "var(--foreground)" : color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Outer orbit */}
      <div className={`absolute inset-0 ${motion ? "orbit-spin-slow" : ""}`}>
        {OUTER.map(({ Icon, color, label }, i) => {
          const a = (i / OUTER.length) * Math.PI * 2 - Math.PI / 2;
          const r = 42;
          const x = 50 + Math.cos(a) * r;
          const y = 50 + Math.sin(a) * r;
          const highlight = i % 6 === active % 6;
          return (
            <div
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-md border bg-card/85 backdrop-blur-sm transition-all duration-500 ${
                  highlight
                    ? "border-brand/60 scale-110"
                    : "border-line/80"
                } ${motion ? "orbit-counter-slow" : ""}`}
                title={label}
              >
                <Icon
                  className="text-base"
                  style={{
                    color: color === "currentColor" ? "var(--foreground)" : color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-20 w-20 flex-col items-center justify-center rounded-full border border-brand/40 bg-background/80 backdrop-blur-md">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand">
            stack
          </span>
          <span className="font-display text-lg font-bold leading-none mt-0.5 tabular-nums">
            {String(active + 1).padStart(2, "0")}
          </span>
          {motion && (
            <span className="absolute inset-0 rounded-full border border-brand/30 animate-ping opacity-20" />
          )}
        </div>
      </div>
    </div>
  );
}
