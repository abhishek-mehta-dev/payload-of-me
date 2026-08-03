"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, RefObject } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Code,
  Coffee,
  Star,
  Send,
  MapPin,
  Phone,
  Globe,
  Sparkles,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { scrollToSection } from "@/lib/lenis-store";
import { profile } from "@/config";

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/abhishek-mehta-dev",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abhishek-mehta-0724ab256/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:mehtaabhishek.dev@gmail.com", label: "Email" },
];

const WATERMARK = "ABHISHEK MEHTA";

function useFitWatermark(
  zoneRef: RefObject<HTMLDivElement | null>,
  text: string,
) {
  const [fontSize, setFontSize] = useState<number | null>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const measure = document.createElement("span");
    measure.className =
      "font-display font-bold tracking-tight whitespace-nowrap absolute opacity-0 pointer-events-none";
    measure.style.fontSize = "100px";
    measure.textContent = text;
    document.body.appendChild(measure);

    const fit = () => {
      const pad = Math.max(24, zone.clientWidth * 0.04);
      const available = zone.clientWidth - pad * 2;
      const at100 = measure.getBoundingClientRect().width;
      if (at100 <= 0) return;
      // Slightly underfill so stroke edges aren't clipped
      setFontSize((available / at100) * 100 * 0.98);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(zone);
    window.addEventListener("resize", fit);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      measure.remove();
    };
  }, [zoneRef, text]);

  return fontSize;
}

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const torchZoneRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0.5, y: 0.45 });
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const fontSize = useFitWatermark(torchZoneRef, WATERMARK);

  const contactInfo = [
    {
      icon: Mail,
      text: profile.email.address,
      href: `mailto:${profile.email.address}`,
    },
    {
      icon: Phone,
      text: profile.phone.number,
      href: `tel:${profile.phone.number}`,
    },
    {
      icon: MapPin,
      text: profile.location.name,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        profile.location.name,
      )}`,
    },
  ];

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const onMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const el = torchZoneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  useGSAP(
    () => {
      gsap.from(".footer-col", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-grid",
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".footer-torch-zone", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-torch-zone",
          start: "top 95%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  const spotlight = `radial-gradient(circle 9rem at ${pos.x * 100}% ${pos.y * 100}%, #000 0%, #000 28%, transparent 70%)`;
  const torchOn = active && finePointer && !reduced;

  return (
    <footer
      ref={rootRef}
      className="relative overflow-hidden border-t border-line bg-surface/40 noise-overlay"
    >
      <div className="container-responsive relative pt-12 pb-8 sm:pt-16 fab-clearance">
        {/* Main columns — shared top alignment */}
        <div className="footer-grid grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10">
          <div className="footer-col md:col-span-5 flex flex-col">
            <h3 className="font-display text-2xl font-bold mb-3 leading-none">
              Abhishek<span className="text-brand"> </span>Mehta
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mb-4">
              Passionate Full Stack Developer crafting digital experiences with
              modern technologies and creative solutions.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-5 font-mono">
              <Code className="h-3.5 w-3.5" />
              <span>Built with</span>
              <Heart className="h-3.5 w-3.5 text-brand" />
              <span>and</span>
              <Coffee className="h-3.5 w-3.5" />
            </div>
            <div className="mt-auto space-y-2">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-brand transition-colors duration-300"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{text}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col md:col-span-3 md:pl-2">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4 h-5 flex items-center">
              {"// Quick Links"}
            </h4>
            <nav className="flex flex-col gap-2.5">
              {quickLinks.map(({ name, href }, i) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => scrollToSection(href)}
                  className="group flex min-h-11 items-center gap-3 text-sm text-muted-foreground hover:text-brand transition-colors duration-300 text-left"
                >
                  <span className="font-mono text-xs text-brand/70 w-5 tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="relative">
                    {name}
                    <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="footer-col md:col-span-4 md:text-right flex flex-col md:items-end">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4 h-5 flex items-center gap-2">
              Let&apos;s Connect <Globe className="h-3.5 w-3.5 text-brand" />
            </h4>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5 max-w-xs md:ml-auto">
              Ready to bring your ideas to life? Let&apos;s build something
              amazing together.
            </p>
            <a
              href="mailto:mehtaabhishek.dev@gmail.com"
              className="btn-brand !text-sm mt-auto"
            >
              <Send className="h-4 w-4" />
              Get In Touch
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-line flex flex-col gap-5 lg:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Abhishek Mehta. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-0.5 font-mono">
              Full Stack Developer | Backend Specialist
            </p>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-card font-mono text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 text-brand shrink-0" />
              Thank you for visiting!
              <Sparkles className="h-3.5 w-3.5 text-brand shrink-0" />
            </div>
          </div>

          <div className="order-3 flex items-center justify-center lg:justify-end gap-2.5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group p-2.5 rounded-full border border-line bg-card hover:border-brand transition-colors duration-300"
              >
                <Icon className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors duration-300" />
              </a>
            ))}
            <button
              onClick={() => scrollToSection(0)}
              aria-label="Scroll to top"
              className="group p-2.5 rounded-full border border-brand/40 bg-brand/10 hover:bg-brand hover:text-brand-foreground transition-colors duration-300"
            >
              <ArrowUp className="h-4 w-4 text-brand group-hover:text-brand-foreground transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed torch watermark */}
      <div
        ref={torchZoneRef}
        className={`footer-torch-zone relative w-full overflow-hidden border-t border-line/50 px-[4vw] ${
          finePointer && !reduced ? "cursor-none" : ""
        }`}
        style={{
          height: fontSize
            ? `clamp(120px, ${fontSize * 0.95}px, 280px)`
            : "min(22vw, 240px)",
        }}
        onMouseMove={onMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        aria-hidden
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="footer-watermark select-none font-display font-bold leading-none tracking-tight whitespace-nowrap text-stroke opacity-45"
            style={{ fontSize: fontSize ? `${fontSize}px` : "11vw" }}
          >
            {WATERMARK}
          </p>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{
            opacity: torchOn ? 1 : 0,
            WebkitMaskImage: spotlight,
            maskImage: spotlight,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          <p
            className="select-none font-display font-bold leading-none tracking-tight whitespace-nowrap text-foreground"
            style={{ fontSize: fontSize ? `${fontSize}px` : "11vw" }}
          >
            {WATERMARK}
          </p>
        </div>

        {torchOn && (
          <div
            className="pointer-events-none absolute h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-30"
            style={{
              left: `${pos.x * 100}%`,
              top: `${pos.y * 100}%`,
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--brand) 55%, white), transparent 70%)",
            }}
          />
        )}

        {torchOn && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 text-3xl sm:text-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] rotate-[-25deg] will-change-transform"
            style={{
              left: `${pos.x * 100}%`,
              top: `${pos.y * 100}%`,
            }}
          >
            🔦
          </div>
        )}

        {finePointer && !reduced && !active && (
          <p className="pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground/55 tracking-wider">
            move to light up
          </p>
        )}
      </div>
    </footer>
  );
}
