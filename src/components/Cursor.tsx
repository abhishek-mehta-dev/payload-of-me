"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const SMOG_POOL = 40;
const SPAWN_DISTANCE = 12;

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const smogLayerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    return () => root.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const layer = smogLayerRef.current;
    if (!dot || !ring || !layer) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    const prevRing = { x: 0, y: 0 };
    let visible = false;
    let puffIndex = 0;
    let lastSpawnX = -9999;
    let lastSpawnY = -9999;
    let raf = 0;

    const puffs = Array.from(layer.querySelectorAll<HTMLElement>(".cursor-smog"));

    const spawnSmog = (x: number, y: number, vx: number, vy: number) => {
      const dx = x - lastSpawnX;
      const dy = y - lastSpawnY;
      if (dx * dx + dy * dy < SPAWN_DISTANCE * SPAWN_DISTANCE) return;

      lastSpawnX = x;
      lastSpawnY = y;

      const puff = puffs[puffIndex % puffs.length];
      puffIndex += 1;
      if (!puff) return;

      // Trail opposite to movement so smoke sits behind the cursor
      const speed = Math.hypot(vx, vy) || 1;
      const behindX = x - (vx / speed) * (10 + Math.random() * 16);
      const behindY = y - (vy / speed) * (10 + Math.random() * 16);
      const size = 28 + Math.random() * 44;

      gsap.killTweensOf(puff);
      gsap.set(puff, {
        x: behindX + (Math.random() - 0.5) * 8,
        y: behindY + (Math.random() - 0.5) * 8,
        xPercent: -50,
        yPercent: -50,
        width: size,
        height: size,
        opacity: 0.55 + Math.random() * 0.3,
        scale: 0.55 + Math.random() * 0.3,
        filter: `blur(${4 + Math.random() * 8}px)`,
      });

      gsap.to(puff, {
        x: `+=${-vx * 0.15 + (Math.random() - 0.5) * 24}`,
        y: `+=${-vy * 0.15 - 12 - Math.random() * 28}`,
        scale: 1.65 + Math.random() * 0.7,
        opacity: 0,
        duration: 0.75 + Math.random() * 0.4,
        ease: "power1.out",
      });
    };

    const tick = () => {
      // Ring lags — smog emits from this trailing body
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;

      const vx = ringPos.x - prevRing.x;
      const vy = ringPos.y - prevRing.y;

      gsap.set(dot, { x: mouse.x, y: mouse.y });
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });

      if (visible && (Math.abs(vx) > 0.2 || Math.abs(vy) > 0.2)) {
        spawnSmog(ringPos.x, ringPos.y, vx, vy);
      }

      prevRing.x = ringPos.x;
      prevRing.y = ringPos.y;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!visible) {
        ringPos.x = mouse.x;
        ringPos.y = mouse.y;
        prevRing.x = mouse.x;
        prevRing.y = mouse.y;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
        visible = true;
      }

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      );
      ring.classList.toggle("is-hovering", Boolean(interactive));
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      visible = false;
      lastSpawnX = -9999;
      lastSpawnY = -9999;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(puffs);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={smogLayerRef} className="cursor-smog-layer hidden md:block" aria-hidden>
        {Array.from({ length: SMOG_POOL }, (_, i) => (
          <div key={i} className="cursor-smog" />
        ))}
      </div>
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden />
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden />
    </>
  );
}
