"use client";

import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowDown,
  Code,
  Database,
  Server,
  Cpu,
  Globe,
  Award,
  Layers,
  GitBranch,
} from "lucide-react";
import {
  SiDjango,
  SiExpress,
  SiTypescript,
  SiReact,
  SiMongodb,
  SiNodedotjs,
  SiNextdotjs,
  SiFastapi,
  SiLangchain,
  SiDocker,
  SiNestjs,
  SiPostgresql,
  SiRedis,
} from "react-icons/si";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { scrollToSection } from "@/lib/lenis-store";
import HeroLogStream from "@/components/HeroLogStream";
import SkillsConstellation from "@/components/SkillsConstellation";

const techStack = [
  { name: "Node.js", icon: SiNodedotjs },
  { name: "NestJS", icon: SiNestjs },
  { name: "Express", icon: SiExpress },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Redis", icon: SiRedis },
  { name: "Docker", icon: SiDocker },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Django", icon: SiDjango },
  { name: "FastAPI", icon: SiFastapi },
  { name: "LangChain", icon: SiLangchain },
];

const stats = [
  { value: 10, suffix: "+", label: "Fullstack Projects", icon: Code },
  { value: 1, suffix: "+", label: "Years Experience", icon: Award },
  { value: 6, suffix: "+", label: "Technologies Used", icon: Layers },
  { value: 15, suffix: "+", label: "Contributions / PRs", icon: GitBranch },
];

const services = [
  {
    code: "01",
    title: "Full-Stack Development",
    icon: Globe,
    description: "End-to-end apps from API to UI",
  },
  {
    code: "02",
    title: "Backend APIs",
    icon: Server,
    description: "REST & services built to scale",
  },
  {
    code: "03",
    title: "Database Design",
    icon: Database,
    description: "Schemas tuned for real traffic",
  },
  {
    code: "04",
    title: "Server Architecture",
    icon: Cpu,
    description: "Nginx, PM2, SSH & prod hardening",
  },
];

const titles = ["Full Stack Developer", "Backend Engineer", "Tech Enthusiast"];

const codeSnippets = [
  "import express from 'express';",
  "npm run build && npm run dev",
  "uvicorn main:app --reload",
  "python manage.py runserver",
  "git commit -m 'clean backend shipped'",
  "docker pull ubuntu:latest",
];

const socials = [
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
  {
    icon: SiDocker,
    href: "https://hub.docker.com/u/abhishekmehtadev/",
    label: "Docker Hub",
  },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typed, setTyped] = useState("");

  // Terminal typewriter loop
  useEffect(() => {
    const snippet = codeSnippets[snippetIndex];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(snippet.slice(0, i));
      if (i >= snippet.length) {
        clearInterval(interval);
        setTimeout(() => {
          setTyped("");
          setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
        }, 1400);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [snippetIndex]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // --- Intro timeline (delayed slightly so the preloader wipes first) ---
      const nameEl = rootRef.current?.querySelector(".hero-name");
      if (!nameEl) return;

      const split = new SplitText(nameEl, {
        type: "chars",
        mask: "chars",
        charsClass: "hero-char",
      });
      if (!split.chars?.length) return;
      const intro = gsap.timeline({
        delay: reduced ? 0 : 2.1,
        defaults: { ease: "power4.out" },
      });

      intro
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.6 })
        .from(
          split.chars,
          {
            yPercent: 115,
            rotate: 6,
            duration: 0.9,
            stagger: 0.028,
          },
          "-=0.3",
        )
        .from(
          ".hero-rotator-wrap",
          { opacity: 0, y: 24, duration: 0.6 },
          "-=0.45",
        )
        .from(".hero-terminal", { opacity: 0, y: 30, duration: 0.7 }, "-=0.35")
        .from(
          ".hero-cta > *",
          { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 },
          "-=0.4",
        )
        .from(
          ".hero-social",
          {
            opacity: 0,
            scale: 0.6,
            stagger: 0.07,
            duration: 0.4,
            ease: "back.out(2)",
          },
          "-=0.3",
        )
        .from(".hero-scroll-hint", { opacity: 0, duration: 0.8 }, "-=0.1");

      // --- Rotating job titles ---
      const rotatorItems =
        gsap.utils.toArray<HTMLElement>(".hero-rotator-item");
      if (rotatorItems.length > 1 && !reduced) {
        const rotator = gsap.timeline({ repeat: -1, delay: 3 });
        rotatorItems.forEach((item, i) => {
          const next = rotatorItems[(i + 1) % rotatorItems.length];
          rotator
            .to(
              item,
              { yPercent: -100, opacity: 0, duration: 0.55, ease: "power3.in" },
              `+=2.6`,
            )
            .fromTo(
              next,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
              "<0.1",
            );
        });
      }

      // --- Stats counters on scroll ---
      const statsRoot = rootRef.current?.querySelector(".hero-stats");
      const metricsBlock = rootRef.current?.querySelector(".hero-metrics-block");
      const serviceRoot = rootRef.current?.querySelector(".hero-services");
      const serviceCards = gsap.utils.toArray<HTMLElement>(".hero-service");
      const sectionLabels = gsap.utils.toArray<HTMLElement>(".hero-section-label");
      const marquee = rootRef.current?.querySelector(".hero-marquee");

      if (statsRoot) {
        const stats = gsap.utils.toArray<HTMLElement>(".hero-stat");
        if (stats.length) {
          gsap.from(stats, {
            opacity: 0,
            y: 36,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: statsRoot,
              start: "top 85%",
              once: true,
            },
          });
        }

        gsap.utils
          .toArray<HTMLElement>(".hero-stat-num")
          .forEach((numEl, i) => {
            const target = Number(numEl.dataset.value ?? 0);
            if (reduced) {
              numEl.textContent = String(target);
              return;
            }
            const counter = { v: 0 };
            gsap.to(counter, {
              v: target,
              duration: 1.5,
              delay: i * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: statsRoot,
                start: "top 85%",
                once: true,
              },
              onUpdate: () => {
                numEl.textContent = String(Math.round(counter.v));
              },
            });
          });
      }

      // --- Services reveal (same metrics block trigger — avoids stuck opacity:0) ---
      if (serviceCards.length && serviceRoot) {
        if (reduced) {
          gsap.set(serviceCards, { clearProps: "opacity,transform" });
        } else {
          gsap.fromTo(
            serviceCards,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: serviceRoot,
                start: "top 90%",
                once: true,
              },
            },
          );
        }
      }

      if (sectionLabels.length && metricsBlock) {
        gsap.from(sectionLabels, {
          opacity: 0,
          x: -16,
          duration: 0.55,
          stagger: 0.15,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: metricsBlock,
            start: "top 88%",
            once: true,
          },
        });
      }

      // --- Marquee reveal ---
      if (marquee) {
        gsap.from(marquee, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: marquee,
            start: "top 95%",
            once: true,
          },
        });
      }

      // --- Magnetic social buttons (desktop) ---
      if (window.matchMedia("(pointer: fine)").matches && !reduced) {
        gsap.utils.toArray<HTMLElement>(".hero-social").forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", {
            duration: 0.4,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(btn, "y", {
            duration: 0.4,
            ease: "power3.out",
          });
          btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            xTo((e.clientX - rect.left - rect.width / 2) * 0.4);
            yTo((e.clientY - rect.top - rect.height / 2) * 0.4);
          });
          btn.addEventListener("mouseleave", () => {
            xTo(0);
            yTo(0);
          });
        });
      }
    },
    { scope: rootRef },
  );

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative overflow-hidden max-w-full blueprint-grid noise-overlay"
    >
      {/* Ambient brand glow — clipped so it never widens the page */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[36rem] overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-full w-[min(70rem,140%)] -translate-x-1/2 rounded-full blur-3xl opacity-10"
          style={{ background: "var(--brand)" }}
        />
      </div>
      {/* Left accent — constellation (desktop from lg, scaled for 1024) */}
      <div
        className="pointer-events-none absolute top-[16%] left-0 z-[1] hidden lg:block w-[min(240px,22vw)] xl:w-[min(420px,34vw)] h-[min(240px,22vw)] xl:h-[min(420px,34vw)] opacity-20 xl:opacity-40"
        style={{
          maskImage: "linear-gradient(to right, black 35%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 35%, transparent 90%)",
        }}
      >
        <SkillsConstellation />
      </div>

      {/* Right — server logs (desktop from lg, faded so copy stays readable) */}
      <div
        className="pointer-events-none absolute top-[6%] right-0 z-[1] hidden lg:block h-[min(72vh,640px)] w-[min(280px,28vw)] xl:w-[min(560px,42vw)] opacity-35 xl:opacity-90"
        style={{
          maskImage: "linear-gradient(to left, black 45%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 45%, transparent 100%)",
        }}
      >
        <HeroLogStream />
      </div>

      <div className="container-responsive relative z-10 min-h-[100svh] lg:min-h-screen flex flex-col justify-center pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-14 lg:pb-16">
        <div className="relative z-10 w-full max-w-full sm:max-w-2xl lg:max-w-[52%] xl:max-w-3xl">
        {/* Eyebrow */}
        <p className="hero-eyebrow font-mono text-xs sm:text-sm md:text-base text-brand mb-4 sm:mb-5 lg:mb-6">
          <span className="text-muted-foreground">$ whoami</span>
          <span className="mx-2 sm:mx-3 text-line">|</span>
          <span className="inline">~/👋 Hello, I&apos;m</span>
        </p>

        {/* Massive name */}
        <h1 className="hero-name font-display font-bold tracking-tight leading-[0.95] text-[clamp(2.35rem,11vw,4.5rem)] sm:text-6xl md:text-7xl lg:text-[3.35rem] xl:text-8xl 2xl:text-9xl mb-4 sm:mb-5 lg:mb-6 break-words">
          Abhishek Mehta<span className="text-brand"></span>
        </h1>

        {/* Rotating titles */}
        <div className="hero-rotator-wrap flex items-center gap-2 sm:gap-3 mb-7 sm:mb-8 lg:mb-10 min-h-11 sm:h-12 lg:h-12 xl:h-14 w-full">
          <span className="font-mono text-brand text-lg sm:text-xl shrink-0">
            →
          </span>
          <div className="relative min-h-11 sm:h-full flex-1 overflow-hidden">
            {titles.map((title, i) => (
              <span
                key={title}
                className="hero-rotator-item absolute inset-0 flex items-center font-display text-lg sm:text-2xl md:text-3xl lg:text-[1.65rem] xl:text-4xl font-semibold text-muted-foreground leading-snug"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {title}
              </span>
            ))}
          </div>
        </div>

        {/* Terminal panel */}
        <div className="hero-terminal panel w-full max-w-3xl overflow-hidden mb-8 sm:mb-10">
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-line bg-surface">
            <span className="font-mono text-[10px] sm:text-xs text-muted-foreground truncate">
              terminal — bash
            </span>
            <div className="flex gap-1.5 shrink-0">
              <span className="term-dot bg-red-500/80" />
              <span className="term-dot bg-yellow-500/80" />
              <span className="term-dot bg-brand" />
            </div>
          </div>
          <div className="p-3.5 sm:p-5 md:p-6 font-mono text-xs sm:text-sm md:text-base space-y-2.5 sm:space-y-3">
            <div className="overflow-x-auto text-foreground">
              <span className="whitespace-nowrap">
                <span className="text-brand">$ </span>
                {typed}
                <span className="caret-blink inline-block w-2 h-4 sm:h-5 bg-brand align-middle ml-0.5" />
              </span>
            </div>
            <div className="text-muted-foreground leading-relaxed">
              <span className="text-line"># </span>
              Building scalable applications with modern tech stacks
            </div>
            <div className="text-muted-foreground leading-relaxed">
              <span className="text-line"># </span>
              Transforming ideas into elegant, performant solutions
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => scrollToSection("#contact")}
            className="btn-brand"
          >
            <Mail className="w-4 h-4" />$ contact --now
          </button>
          <a
            href="/assets/images/Abhishek_Mehta_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-brand"
          >
            <Download className="w-4 h-4" />$ download --resume
          </a>
        </div>

        {/* Socials */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hero-social group p-3 sm:p-3.5 rounded-full border border-line bg-card hover:border-brand transition-colors duration-300"
            >
              <Icon className="h-5 w-5 text-muted-foreground group-hover:text-brand transition-colors duration-300" />
            </a>
          ))}
          <button
            type="button"
            onClick={() => scrollToSection("#about")}
            aria-label="Scroll to next section"
            className="hero-scroll-hint ml-auto hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-brand transition-colors"
          >
            scroll
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
        </div>
      </div>

      {/* Metrics + capabilities */}
      <div className="hero-metrics-block relative border-t border-line">
        <div className="container-responsive py-10 sm:py-16 lg:py-14 xl:py-20 space-y-10 sm:space-y-12 lg:space-y-12 xl:space-y-16">
          {/* Stats */}
          <div>
            <p className="hero-section-label font-mono text-xs sm:text-sm text-brand mb-6 tracking-wide">
              <span className="text-muted-foreground">$</span> metrics --summary
            </p>
            <div className="hero-stats grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {stats.map(({ value, suffix, label, icon: Icon }, i) => (
                <div
                  key={label}
                  className="hero-stat group relative overflow-hidden rounded-lg border border-line bg-card/60 p-4 sm:p-5 lg:p-5 xl:p-7 transition-colors duration-300 hover:border-brand/50"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(120% 80% at 0% 0%, color-mix(in oklch, var(--brand) 12%, transparent), transparent 55%)",
                    }}
                  />
                  <div className="relative flex items-start justify-between gap-3 mb-5">
                    <Icon className="h-5 w-5 text-brand transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-mono text-[10px] sm:text-xs text-muted-foreground/70 tabular-nums">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="relative font-display text-4xl sm:text-5xl font-bold tracking-tight">
                    <span className="hero-stat-num" data-value={value}>
                      {value}
                    </span>
                    <span className="text-brand">{suffix}</span>
                  </div>
                  <p className="relative mt-2.5 text-xs sm:text-sm text-muted-foreground font-mono leading-snug">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="hero-section-label font-mono text-xs sm:text-sm text-brand mb-6 tracking-wide">
              <span className="text-muted-foreground">$</span> services --list
            </p>
            <div className="hero-services grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {services.map(({ code, title, icon: Icon, description }) => (
                <div
                  key={title}
                  className="hero-service group relative overflow-hidden rounded-lg border border-line bg-card/60 p-5 sm:p-6 lg:p-5 xl:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]"
                >
                  <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100" />
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-background/60 text-brand transition-colors duration-300 group-hover:border-brand/40 group-hover:bg-brand/10">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60 group-hover:text-brand transition-colors">
                      {code}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-base sm:text-[1.05rem] mb-1.5 leading-snug">
                    {title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tech stack marquee */}
      <div className="hero-marquee border-y border-line bg-card/30 overflow-hidden max-w-full">
        <div className="container-responsive pt-5 pb-2">
          <p className="hero-section-label font-mono text-xs text-muted-foreground">
            <span className="text-brand">$</span> stack --watch
          </p>
        </div>
        <div className="py-3 overflow-hidden max-w-full">
          <div className="marquee-track gap-10 px-5">
            {[...techStack, ...techStack].map(({ name, icon: Icon }, i) => (
              <span
                key={`a-${name}-${i}`}
                className="flex items-center gap-3 font-mono text-sm sm:text-base text-muted-foreground whitespace-nowrap"
              >
                <Icon className="text-xl text-brand" />
                {name}
                <span className="ml-6 text-line select-none">{"//"}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="pb-5 overflow-hidden max-w-full border-t border-line/60">
          <div className="marquee-track marquee-track-reverse gap-10 px-5 pt-3">
            {[...techStack]
              .reverse()
              .concat([...techStack].reverse())
              .map(({ name, icon: Icon }, i) => (
                <span
                  key={`b-${name}-${i}`}
                  className="flex items-center gap-3 font-mono text-sm sm:text-base text-muted-foreground/80 whitespace-nowrap"
                >
                  <Icon className="text-lg text-brand/80" />
                  {name}
                  <span className="ml-6 text-line select-none">{"//"}</span>
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
