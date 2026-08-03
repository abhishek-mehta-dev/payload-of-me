"use client";

import { useRef } from "react";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  ArrowUpRight,
  Server,
  Database,
  Terminal,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import { scrollToSection } from "@/lib/lenis-store";

const experiences = [
  {
    id: "01",
    title: "MERN Stack Developer",
    company: "Current Position",
    period: "2024 — Present",
    description:
      "Building and shipping full-stack products with a backend-first mindset — APIs, data layers, and production servers that stay fast under real traffic.",
    highlights: [
      "Designed REST APIs and service layers for scalable apps",
      "Tuned MongoDB / Postgres queries and Redis caching",
      "Ran production stacks with Nginx, PM2, and SSH hardening",
    ],
    technologies: [
      "Node.js",
      "NestJS",
      "Express",
      "React",
      "Next.js",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    type: "work" as const,
    icon: Briefcase,
    status: "current" as const,
  },
  {
    id: "02",
    title: "Master's in Computer Applications",
    company: "Chandigarh University",
    period: "2022 — 2024",
    description:
      "Graduate program focused on software engineering, algorithms, and system design — the foundation behind how I structure backends and ship clean code.",
    highlights: [
      "Deep dive into DSA, databases, and software architecture",
      "Built academic projects spanning full-stack and ML basics",
      "Graduated ready to ship production-grade applications",
    ],
    technologies: [
      "Python",
      "Data Structures",
      "Algorithms",
      "Software Engineering",
      "Database Systems",
      "Machine Learning",
    ],
    type: "education" as const,
    icon: GraduationCap,
    status: "completed" as const,
  },
];

const milestones = [
  {
    icon: Terminal,
    label: "Backend APIs",
    detail: "Node · NestJS · Express · Django, FastAPI",
  },
  {
    icon: Database,
    label: "Data layer",
    detail: "Mongo · Postgres · Redis · MySQL",
  },
  { icon: Server, label: "Prod ops", detail: "Nginx · PM2 · SSH · Docker" },
];

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const line = rootRef.current?.querySelector(".exp-line");
      const timeline = rootRef.current?.querySelector(".exp-timeline");
      if (line && timeline) {
        gsap.from(line, {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 70%",
            end: "bottom 55%",
            scrub: reduced ? false : 0.5,
          },
        });
      }

      const milestonesRoot = rootRef.current?.querySelector(".exp-milestones");
      const milestoneCards = gsap.utils.toArray<HTMLElement>(".exp-milestone");
      if (milestonesRoot && milestoneCards.length) {
        gsap.from(milestoneCards, {
          opacity: 0,
          y: 28,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: milestonesRoot,
            start: "top 88%",
            once: true,
          },
        });
      }
      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((item, i) => {
        const node = item.querySelector(".exp-node");
        const card = item.querySelector(".exp-card");
        const highlights = item.querySelectorAll(".exp-highlight");
        const tags = item.querySelectorAll(".exp-tag");

        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 82%", once: true },
        });

        if (node) {
          tl.from(node, {
            scale: 0,
            duration: 0.45,
            ease: "back.out(2.4)",
          });
        }
        if (card) {
          tl.from(
            card,
            {
              opacity: 0,
              y: 40,
              x: i % 2 === 0 ? -24 : 24,
              duration: 0.75,
              ease: "power3.out",
            },
            "-=0.2",
          );
        }
        if (highlights.length) {
          tl.from(
            highlights,
            {
              opacity: 0,
              x: -12,
              stagger: 0.06,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.35",
          );
        }
        if (tags.length) {
          tl.from(
            tags,
            {
              opacity: 0,
              y: 10,
              stagger: 0.03,
              duration: 0.28,
              ease: "power2.out",
            },
            "-=0.25",
          );
        }
      });

      const cta = rootRef.current?.querySelector(".exp-cta");
      if (cta) {
        gsap.from(cta, {
          opacity: 0,
          y: 28,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: cta, start: "top 92%", once: true },
        });
      }    },
    { scope: rootRef },
  );

  return (
    <section
      id="experience"
      ref={rootRef}
      className="section-responsive relative overflow-hidden"
    >
      {/* Soft background accent */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 sm:h-80 sm:w-80 translate-x-1/3 rounded-full blur-3xl opacity-[0.07]"
        style={{ background: "var(--brand)" }}
      />

      <div className="container-responsive">
        <SectionHeading
          index="03"
          label="Journey"
          title="Experience &"
          accent="Education"
          subtitle="From campus to production — the roles, systems, and skills that shaped how I build."
        />

        {/* Quick milestone strip */}
        <div className="exp-milestones grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {milestones.map(({ icon: Icon, label, detail }) => (
            <div
              key={label}
              className="exp-milestone flex items-center gap-4 rounded-lg border border-line bg-card/50 px-4 py-3.5"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-background/70 text-brand">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="font-display font-semibold text-sm">{label}</p>
                <p className="font-mono text-xs text-muted-foreground leading-snug">
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="exp-timeline relative max-w-4xl mx-auto">
          {/* Timeline rail */}
          <div className="exp-line absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-brand via-brand/50 to-transparent" />

          <div className="space-y-10 sm:space-y-12">
            {experiences.map((exp) => (
              <article
                key={exp.id}
                className="exp-item relative pl-12 sm:pl-16"
              >
                {/* Node */}
                <div className="exp-node absolute left-0 sm:left-1 top-6 z-[1] flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand bg-background shadow-[0_0_0_4px_color-mix(in_oklch,var(--brand)_12%,transparent)]">
                  <exp.icon className="h-3.5 w-3.5 text-brand" />
                </div>

                {/* Card */}
                <div className="exp-card group relative overflow-hidden rounded-lg border border-line bg-card/60 p-6 sm:p-8 transition-colors duration-300 hover:border-brand/45">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(90% 70% at 0% 0%, color-mix(in oklch, var(--brand) 10%, transparent), transparent 60%)",
                    }}
                  />

                  <div className="relative">
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                      <span className="font-mono text-[11px] text-muted-foreground/70">
                        commit/{exp.id}
                      </span>
                      <span className="text-line">·</span>
                      <span
                        className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded border ${
                          exp.type === "work"
                            ? "border-brand/30 bg-brand/10 text-brand"
                            : "border-line bg-surface text-muted-foreground"
                        }`}
                      >
                        {exp.type === "work" ? "work" : "education"}
                      </span>
                      {exp.status === "current" && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-brand ml-auto sm:ml-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                          live
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                          {exp.title}
                        </h3>
                        <p className="mt-1 text-muted-foreground font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 self-start whitespace-nowrap rounded-md border border-brand/25 bg-brand/5 px-3 py-1.5 font-mono text-xs sm:text-sm text-brand">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-5 max-w-2xl">
                      {exp.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {exp.highlights.map((item) => (
                        <li
                          key={item}
                          className="exp-highlight flex gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="exp-tag rounded-md border border-line bg-surface/80 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="exp-cta mt-14 sm:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-lg border border-line bg-card/50 p-5 sm:p-6 max-w-4xl mx-auto">
          <div>
            <p className="font-display font-semibold text-base sm:text-lg">
              Next chapter open
            </p>
            <p className="mt-1 text-sm text-muted-foreground font-mono">
              Looking for roles where backend, servers, and shipping matter.
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection("#contact")}
            className="btn-brand shrink-0"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
