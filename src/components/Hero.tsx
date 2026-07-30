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
} from "react-icons/si";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { scrollToSection } from "@/lib/lenis-store";

const techStack = [
  { name: "Node.js", icon: SiNodedotjs },
  { name: "NestJS", icon: SiNestjs },
  { name: "Express", icon: SiExpress },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
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
    title: "Full-Stack Development",
    icon: Globe,
    description: "End-to-End System Engineering",
  },
  {
    title: "Backend APIs",
    icon: Server,
    description: "Scalable server solutions",
  },
  {
    title: "Database Design",
    icon: Database,
    description: "Optimized data architecture",
  },
  {
    title: "Server Architecture",
    icon: Cpu,
    description: "Robust server infrastructure",
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
      const split = new SplitText(".hero-name", {
        type: "chars",
        mask: "chars",
        charsClass: "hero-char",
      });

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
        .from(".hero-rotator-wrap", { opacity: 0, y: 24, duration: 0.6 }, "-=0.45")
        .from(".hero-terminal", { opacity: 0, y: 30, duration: 0.7 }, "-=0.35")
        .from(
          ".hero-cta > *",
          { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 },
          "-=0.4",
        )
        .from(
          ".hero-social",
          { opacity: 0, scale: 0.6, stagger: 0.07, duration: 0.4, ease: "back.out(2)" },
          "-=0.3",
        )
        .from(".hero-scroll-hint", { opacity: 0, duration: 0.8 }, "-=0.1");

      // --- Rotating job titles ---
      const rotatorItems = gsap.utils.toArray<HTMLElement>(".hero-rotator-item");
      if (rotatorItems.length > 1 && !reduced) {
        const rotator = gsap.timeline({ repeat: -1, delay: 3 });
        rotatorItems.forEach((item, i) => {
          const next = rotatorItems[(i + 1) % rotatorItems.length];
          rotator
            .to(item, { yPercent: -100, opacity: 0, duration: 0.55, ease: "power3.in" }, `+=2.6`)
            .fromTo(
              next,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
              "<0.1",
            );
        });
      }

      // --- Stats counters on scroll ---
      gsap.utils.toArray<HTMLElement>(".hero-stat").forEach((el, i) => {
        const numEl = el.querySelector<HTMLElement>(".hero-stat-num");
        const target = Number(numEl?.dataset.value ?? 0);
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".hero-stats", start: "top 85%", once: true },
        });
        if (numEl && !reduced) {
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.4,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: ".hero-stats", start: "top 85%", once: true },
            onUpdate: () => {
              numEl.textContent = String(Math.round(counter.v));
            },
          });
        }
      });

      // --- Services reveal ---
      gsap.from(".hero-service", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".hero-services", start: "top 85%", once: true },
      });

      // --- Marquee reveal ---
      gsap.from(".hero-marquee", {
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: ".hero-marquee", start: "top 95%", once: true },
      });

      // --- Magnetic social buttons (desktop) ---
      if (window.matchMedia("(pointer: fine)").matches && !reduced) {
        gsap.utils.toArray<HTMLElement>(".hero-social").forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
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
      className="relative overflow-hidden blueprint-grid noise-overlay"
    >
      {/* Ambient brand glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[70rem] h-[36rem] rounded-full blur-3xl opacity-15"
        style={{ background: "var(--brand)" }}
      />

      <div className="container-responsive min-h-screen flex flex-col justify-center pt-32 pb-16">
        {/* Eyebrow */}
        <p className="hero-eyebrow font-mono text-sm sm:text-base text-brand mb-6">
          <span className="text-muted-foreground">$ whoami</span>
          <span className="mx-3 text-line">|</span>
          ~/👋 Hello, I&apos;m
        </p>

        {/* Massive name */}
        <h1 className="hero-name font-display font-bold tracking-tight leading-[0.95] text-[13vw] sm:text-7xl lg:text-8xl xl:text-9xl mb-6">
          Abhishek Mehta<span className="text-brand">.</span>
        </h1>

        {/* Rotating titles */}
        <div className="hero-rotator-wrap flex items-center gap-3 mb-10 h-10 sm:h-12">
          <span className="font-mono text-brand text-xl">→</span>
          <div className="relative h-full flex-1 overflow-hidden">
            {titles.map((title, i) => (
              <span
                key={title}
                className="hero-rotator-item absolute inset-0 flex items-center font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {title}
              </span>
            ))}
          </div>
        </div>

        {/* Terminal panel */}
        <div className="hero-terminal panel max-w-3xl overflow-hidden mb-10">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-line bg-surface">
            <span className="font-mono text-xs text-muted-foreground">
              terminal — zsh
            </span>
            <div className="flex gap-1.5">
              <span className="term-dot bg-red-500/80" />
              <span className="term-dot bg-yellow-500/80" />
              <span className="term-dot bg-brand" />
            </div>
          </div>
          <div className="p-5 sm:p-6 font-mono text-sm sm:text-base space-y-3">
            <div className="whitespace-nowrap overflow-hidden text-foreground">
              <span className="text-brand">$ </span>
              {typed}
              <span className="caret-blink inline-block w-2 h-4 sm:h-5 bg-brand align-middle ml-0.5" />
            </div>
            <div className="text-muted-foreground">
              <span className="text-line"># </span>
              Building scalable applications with modern tech stacks
            </div>
            <div className="text-muted-foreground">
              <span className="text-line"># </span>
              Transforming ideas into elegant, performant solutions
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 mb-12">
          <button
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
        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hero-social group p-3.5 rounded-full border border-line bg-card hover:border-brand transition-colors duration-300"
            >
              <Icon className="h-5 w-5 text-muted-foreground group-hover:text-brand transition-colors duration-300" />
            </a>
          ))}
          <button
            onClick={() => scrollToSection("#about")}
            aria-label="Scroll to next section"
            className="hero-scroll-hint ml-auto hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-brand transition-colors"
          >
            scroll
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="container-responsive pb-16">
        <div className="hero-stats grid grid-cols-2 lg:grid-cols-4 border border-line rounded-lg overflow-hidden">
          {stats.map(({ value, suffix, label, icon: Icon }) => (
            <div
              key={label}
              className="hero-stat p-6 sm:p-8 border-line [&:not(:last-child)]:border-b lg:[&:not(:last-child)]:border-b-0 odd:border-r lg:[&:not(:last-child)]:border-r bg-card/50"
            >
              <Icon className="h-5 w-5 text-brand mb-4" />
              <div className="font-display text-4xl sm:text-5xl font-bold">
                <span className="hero-stat-num" data-value={value}>
                  {value}
                </span>
                <span className="text-brand">{suffix}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground font-mono">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="container-responsive pb-16">
        <div className="hero-services grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(({ title, icon: Icon, description }) => (
            <div key={title} className="hero-service panel panel-hover p-6">
              <Icon className="h-7 w-7 text-brand mb-4" />
              <h4 className="font-display font-semibold text-base mb-1">
                {title}
              </h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack marquee */}
      <div className="hero-marquee border-y border-line py-5 overflow-hidden">
        <div className="marquee-track gap-10 px-5">
          {[...techStack, ...techStack].map(({ name, icon: Icon }, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center gap-3 font-mono text-sm sm:text-base text-muted-foreground whitespace-nowrap"
            >
              <Icon className="text-xl text-brand" />
              {name}
              <span className="ml-6 text-line select-none">{"//"}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
