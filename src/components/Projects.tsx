"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Code2,
  CheckCircle,
  MoveHorizontal,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import ProjectDetailsDialog from "@/components/ProjectDetailsDialog";
import { projects, type Project } from "@/data/projects";
import { getTechMeta } from "@/lib/tech-icons";

function statusClasses(status: string) {
  switch (status) {
    case "Live":
      return "text-brand border-brand/40 bg-brand/10";
    case "Development":
    case "In Progress":
      return "text-yellow-500 border-yellow-500/40 bg-yellow-500/10";
    case "Completed":
      return "text-blue-400 border-blue-400/40 bg-blue-400/10";
    default:
      return "text-muted-foreground border-line bg-surface";
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card panel overflow-hidden flex flex-col lg:w-[min(560px,68vw)] xl:w-[min(720px,70vw)] lg:shrink-0 lg:h-full lg:max-h-[min(70vh,560px)] xl:max-h-[78vh]">
      {/* Browser-chrome image — capped so actions stay visible */}
      <div className="relative border-b border-line bg-surface shrink-0">
        <div className="flex flex-wrap items-center gap-1.5 px-3 sm:px-4 py-2.5 border-b border-line">
          <span className="term-dot bg-red-500/80" />
          <span className="term-dot bg-yellow-500/80" />
          <span className="term-dot bg-brand" />
          <span className="ml-2 sm:ml-3 font-mono text-[10px] sm:text-xs text-muted-foreground truncate max-w-[45%] sm:max-w-none min-w-0 flex-1">
            {project.liveUrl.replace(/^https?:\/\//, "")}
          </span>
          <span
            className={`ml-auto font-mono text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded border shrink-0 ${statusClasses(project.status)}`}
          >
            {project.status}
          </span>
        </div>
        <div className="relative aspect-[16/9] lg:aspect-[2.4/1] lg:max-h-[120px] xl:aspect-[2.2/1] xl:max-h-[220px] overflow-hidden group">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 68vw, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-3 left-3 font-mono text-xs px-2.5 py-1 rounded bg-background/85 backdrop-blur border border-line text-muted-foreground">
            {project.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 lg:p-4 xl:p-6 flex flex-col gap-3 lg:gap-3 xl:gap-4 flex-1 min-h-0 overflow-y-auto">
        <div className="flex items-start justify-between gap-4 shrink-0">
          <h3 className="font-display text-lg sm:text-xl lg:text-xl xl:text-2xl font-bold leading-tight">
            {project.title}
          </h3>
          <span className="font-mono text-sm text-muted-foreground shrink-0">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2 shrink-0">
          {project.description}
        </p>

        {/* Preview of technical work so it's obvious details exist */}
        <ul className="space-y-1.5 shrink-0 block lg:hidden xl:block">
          {project.responsibilities.slice(0, 2).map((item) => (
            <li
              key={item.slice(0, 40)}
              className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
            >
              <CheckCircle className="h-3.5 w-3.5 text-brand mt-0.5 shrink-0" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
          {project.responsibilities.length > 2 && (
            <li className="font-mono text-xs text-brand pl-5">
              +{project.responsibilities.length - 2} more technical points
            </li>
          )}
        </ul>

        <div className="flex flex-wrap gap-2 shrink-0">
          {project.technologies.slice(0, 6).map((tech) => {
            const { icon: Icon, color } = getTechMeta(tech);
            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-line bg-surface text-xs text-muted-foreground"
              >
                <Icon className="text-sm shrink-0" style={{ color }} />
                {tech}
              </span>
            );
          })}
          {project.technologies.length > 6 && (
            <span className="px-2.5 py-1 rounded-md border border-brand/30 bg-brand/5 text-xs font-mono text-brand">
              +{project.technologies.length - 6} more
            </span>
          )}
        </div>

        {/* Always-visible actions */}
        <div className="mt-auto shrink-0 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2.5 pt-3 border-t border-line">
          <ProjectDetailsDialog project={project} />
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-brand flex-1 !px-4 !py-2.5 text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
          <a
            href={project.githubUrl === "#" ? "/oops" : project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-brand flex-1 !px-4 !py-2.5 text-sm"
          >
            {project.githubUrl === "#" ? (
              <Code2 className="h-4 w-4" />
            ) : (
              <Github className="h-4 w-4" />
            )}
            Code
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub horizontally through the cards
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const pin = pinRef.current;
          if (!track || !pin) return;
          const getAmount = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          gsap.to(track, {
            x: () => -getAmount(),
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => "+=" + getAmount(),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressRef.current) {
                  gsap.set(progressRef.current, { scaleX: self.progress });
                }
              },
            },
          });
        },
      );

      // Mobile / reduced motion: simple vertical reveals
      mm.add(
        "(max-width: 1023px), (prefers-reduced-motion: reduce)",
        () => {
          gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
            gsap.from(card, {
              opacity: 0,
              y: 50,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", end: "bottom top", once: true },
            });
          });
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section
      id="projects"
      ref={rootRef}
      className="relative overflow-hidden max-w-full bg-surface/40"
    >
      <div className="container-responsive pt-16 sm:pt-24 lg:pt-32">
        <SectionHeading
          index="04"
          label="Work"
          title="Featured"
          accent="Projects"
          subtitle="A showcase of my recent work and technical projects demonstrating Full-stack development skills"
        />
        <p className="hidden lg:flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground -mt-6 lg:-mt-8 xl:-mt-10 mb-4">
          <MoveHorizontal className="h-4 w-4 text-brand" />
          keep scrolling — the deck moves sideways
        </p>
      </div>

      {/* Pinned horizontal deck (lg+) / vertical stack (below) */}
      <div ref={pinRef} className="lg:h-[100svh] lg:flex lg:flex-col lg:justify-center">
        <div
          ref={trackRef}
          className="flex flex-col gap-8 sm:gap-10 px-4 sm:px-6 pb-16 lg:pb-0 lg:flex-row lg:gap-8 xl:gap-10 lg:px-[4vw] xl:px-[6vw] lg:items-stretch lg:h-[min(70vh,560px)] xl:h-[78vh] lg:will-change-transform"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}

          {/* End card */}
          <div className="project-card hidden lg:flex flex-col items-start justify-center shrink-0 w-[36vw] xl:w-[40vw] max-w-[480px] p-8 xl:p-10">
            <p className="section-label mb-4">{"// that's the deck"}</p>
            <h3 className="font-display text-3xl xl:text-4xl font-bold leading-tight mb-6">
              More Projects
              <br />
              <span className="text-brand">Coming Soon</span>
            </h3>
            <a
              href="https://github.com/abhishek-mehta-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-brand"
            >
              <Github className="h-4 w-4" />
              github.com/abhishek-mehta-dev
            </a>
          </div>
        </div>

        {/* Progress bar (desktop) */}
        <div className="hidden lg:block mx-[4vw] xl:mx-[6vw] mt-6 xl:mt-8 h-px bg-line relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-brand origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Stack-mode bottom CTA */}
      <div className="lg:hidden text-center fab-clearance px-4">
        <div className="inline-flex max-w-[calc(100%-2rem)] flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full border border-line bg-card font-mono text-xs sm:text-sm">
          <Code2 className="h-5 w-5 text-brand" />
          <span className="text-muted-foreground">More Projects Coming Soon</span>
          <Github className="h-5 w-5 text-brand" />
        </div>
      </div>
    </section>
  );
}
