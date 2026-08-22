"use client";

import { useRef, useState } from "react";
import { VscAzure } from "react-icons/vsc";
import {
  Code,
  Database,
  Server,
  Brain,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import {
  SiPython,
  SiJavascript,
  SiGo,
  SiTypescript,
  SiGnubash,
  SiExpress,
  SiNodedotjs,
  SiDjango,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiLangchain,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiOpenapiinitiative,
  SiApollographql,
  SiLinux,
  SiNginx,
  SiDocker,
  SiGithubactions,
  SiAwsamplify,
  SiGooglecloud,
  SiKubernetes,
  SiTensorflow,
  SiOpenai,
  SiNestjs,
  SiRedis,
  SiOpenbsd,
} from "react-icons/si";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import SkillsConstellation from "@/components/SkillsConstellation";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    accent: "Languages",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Go", icon: SiGo, color: "#00ADD8" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Server,
    accent: "Frameworks",
    skills: [
      { name: "Express.js", icon: SiExpress, color: "#888888" },
      { name: "Nest.js", icon: SiNestjs, color: "#e73665" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Django", icon: SiDjango, color: "#44B78B" },
      { name: "Django Rest Framework", icon: SiDjango, color: "#A30000" },
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#888888" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "LangChain", icon: SiLangchain, color: "#0FA958" },
    ],
  },
  {
    title: "Database Management",
    icon: Database,
    accent: "Data",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    title: "API Development",
    icon: Wrench,
    accent: "APIs",
    skills: [
      { name: "RESTful Services", icon: SiOpenapiinitiative, color: "#6BA539" },
      {
        name: "Third-party API Integrations",
        icon: SiApollographql,
        color: "#7c62d1",
      },
    ],
  },
  {
    title: "Server & Infrastructure",
    icon: Server,
    accent: "Infra",
    skills: [
      { name: "Linux Fundamentals", icon: SiLinux, color: "#FFD41F" },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Github Actions", icon: SiGithubactions, color: "#2088FF" },
      { name: "SSH", icon: SiOpenbsd, color: "#000000" },
    ],
  },
  {
    title: "Emerging Technologies",
    icon: Brain,
    accent: "Emerging",
    skills: [
      { name: "Machine Learning Basics", icon: SiTensorflow, color: "#FF6F00" },
      { name: "DevOps Tools", icon: SiKubernetes, color: "#326CE5" },
      { name: "AI Agents", icon: SiOpenai, color: "#8f7bd8" },
      { name: "AWS", icon: SiAwsamplify, color: "#FF9900" },
      { name: "Azure", icon: VscAzure, color: "#0078D4" },
      { name: "GCP", icon: SiGooglecloud, color: "#4285F4" },
    ],
  },
];

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      // Zigzag rows: odd slide from left, even from right
      gsap.utils.toArray<HTMLElement>(".skill-lane").forEach((lane, i) => {
        const fromLeft = i % 2 === 0;
        const indexEl = lane.querySelector(".skill-lane-index");
        const chips = lane.querySelectorAll(".skill-chip");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: lane,
            start: "top 82%",
            end: "bottom top",
            once: true,
            onEnter: () => {
              setTimeout(() => setActive(i), 0);
            },
          },
        });

        tl.from(lane, {
          opacity: 0,
          x: fromLeft ? -80 : 80,
          y: 40,
          duration: 0.85,
          ease: "power3.out",
        });

        if (indexEl) {
          tl.from(
            indexEl,
            {
              scale: 0,
              duration: 0.45,
              ease: "back.out(2.2)",
            },
            "-=0.55",
          );
        }

        if (chips.length) {
          tl.from(
            chips,
            {
              opacity: 0,
              y: 18,
              scale: 0.88,
              stagger: 0.04,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.3",
          );
        }
      });

      const pill = rootRef.current?.querySelector(".skills-pill");
      if (pill) {
        gsap.from(pill, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pill,
            start: "top 92%",
            end: "bottom top",
            once: true,
          },
        });
      }

      // Magnetic chips on desktop
      if (window.matchMedia("(pointer: fine)").matches) {
        gsap.utils.toArray<HTMLElement>(".skill-chip").forEach((chip) => {
          const xTo = gsap.quickTo(chip, "x", {
            duration: 0.35,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(chip, "y", {
            duration: 0.35,
            ease: "power3.out",
          });
          chip.addEventListener("mousemove", (e) => {
            const rect = chip.getBoundingClientRect();
            xTo((e.clientX - rect.left - rect.width / 2) * 0.25);
            yTo((e.clientY - rect.top - rect.height / 2) * 0.25);
          });
          chip.addEventListener("mouseleave", () => {
            xTo(0);
            yTo(0);
          });
        });
      }
    },
    { scope: rootRef, dependencies: [] },
  );

  return (
    <section
      id="skills"
      ref={rootRef}
      className="section-responsive relative overflow-hidden bg-surface/40"
    >
      {/* Orbiting stack constellation — desktop */}
      <div className="pointer-events-none absolute top-24 right-0 w-[min(300px,28vw)] h-[min(300px,28vw)] opacity-25 hidden lg:block xl:w-[min(420px,38vw)] xl:h-[min(420px,38vw)] xl:opacity-55 2xl:opacity-80">
        <SkillsConstellation active={active} />
      </div>

      <div className="container-responsive relative z-10">
        <SectionHeading
          index="02"
          label="Skills"
          title="Technical"
          accent="Expertise"
          subtitle="A comprehensive overview of my technical skills and expertise across various domains"
        />

        {/* Sticky index rail + zigzag lanes — desktop format from lg */}
        <div className="grid grid-cols-1 lg:grid-cols-[132px_1fr] xl:grid-cols-[180px_1fr] gap-8 lg:gap-8 xl:gap-14">
          {/* Left rail — category jump list */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Index
              </p>
              {skillCategories.map((cat, i) => (
                <button
                  key={cat.title}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    document
                      .getElementById(`skill-lane-${i}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`w-full text-left flex items-center gap-2 xl:gap-3 px-2.5 xl:px-3 py-2 xl:py-2.5 rounded-md font-mono text-[11px] xl:text-xs transition-colors duration-300 ${
                    active === i
                      ? "bg-brand/10 text-brand border border-brand/30"
                      : "text-muted-foreground hover:text-foreground border border-transparent"
                  }`}
                >
                  <span className="tabular-nums opacity-70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate">{cat.accent}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Zigzag spine layout */}
          <div className="relative">
            <div
              className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--brand), transparent)",
                opacity: 0.35,
              }}
            />

            <div className="space-y-8 lg:space-y-12 xl:space-y-16">
              {skillCategories.map(
                ({ title, icon: Icon, accent, skills }, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <article
                      key={title}
                      id={`skill-lane-${index}`}
                      className={`skill-lane relative lg:w-[calc(50%-1rem)] xl:w-[calc(50%-1.5rem)] ${
                        isLeft
                          ? "lg:mr-auto lg:pr-3 xl:pr-4"
                          : "lg:ml-auto lg:pl-3 xl:pl-4"
                      }`}
                    >
                      <span
                        className={`skill-lane-index pointer-events-none hidden lg:flex absolute top-8 xl:top-10 w-8 h-8 xl:w-10 xl:h-10 rounded-full border-2 border-brand bg-background items-center justify-center font-mono text-[10px] xl:text-xs text-brand z-10 ${
                          isLeft
                            ? "right-0 translate-x-[calc(100%+0.75rem)] xl:translate-x-[calc(100%+1.5rem-1.25rem)]"
                            : "left-0 -translate-x-[calc(100%+0.75rem)] xl:-translate-x-[calc(100%+1.5rem-1.25rem)]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="panel panel-hover p-5 sm:p-6 lg:p-5 xl:p-8 overflow-hidden relative">
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -bottom-6 -right-2 font-display text-[5.5rem] xl:text-[7rem] font-bold leading-none text-stroke opacity-40 select-none"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="relative flex items-start justify-between gap-4 mb-5 xl:mb-6">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="p-2.5 rounded-md bg-brand/10 border border-brand/25 shrink-0">
                              <Icon className="h-5 w-5 text-brand" />
                            </span>
                            <div className="min-w-0">
                              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-brand mb-1">
                                {accent}
                              </p>
                              <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight">
                                {title}
                              </h3>
                            </div>
                          </div>
                          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-xs text-muted-foreground shrink-0">
                            {skills.length}
                            <ArrowUpRight className="h-3.5 w-3.5 text-brand" />
                          </span>
                        </div>

                        <div
                          className={`relative flex flex-wrap gap-2 lg:gap-2 xl:gap-2.5 ${
                            isLeft ? "" : "lg:justify-end"
                          }`}
                        >
                          {skills.map(
                            ({ name, icon: SkillIcon, color }, skillIdx) => (
                              <span
                                key={name}
                                className="skill-chip inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-md border border-line bg-surface/90 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:border-brand/60 hover:bg-brand/5 transition-colors duration-300 cursor-default will-change-transform"
                                style={{
                                  marginTop: skillIdx % 3 === 1 ? "0.35rem" : 0,
                                }}
                              >
                                <SkillIcon
                                  color={color}
                                  className="shrink-0 text-base"
                                />
                                {name}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="skills-pill inline-flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full border border-line bg-card font-mono text-xs sm:text-sm">
            <Brain className="h-5 w-5 text-brand" />
            <span className="text-muted-foreground">
              Always Learning New Technologies
            </span>
            <Code className="h-5 w-5 text-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
