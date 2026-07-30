"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Code2,
  User,
  CheckCircle,
  MoveHorizontal,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import { projects, type Project } from "@/data/projects";

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
    <article className="project-card panel overflow-hidden flex flex-col lg:w-[72vw] lg:max-w-[1000px] lg:shrink-0 lg:h-full">
      {/* Browser-chrome image */}
      <div className="relative border-b border-line bg-surface">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-line">
          <span className="term-dot bg-red-500/80" />
          <span className="term-dot bg-yellow-500/80" />
          <span className="term-dot bg-brand" />
          <span className="ml-3 font-mono text-xs text-muted-foreground truncate">
            {project.liveUrl.replace(/^https?:\/\//, "")}
          </span>
          <span
            className={`ml-auto font-mono text-xs px-2.5 py-0.5 rounded border ${statusClasses(project.status)}`}
          >
            {project.status}
          </span>
        </div>
        <div className="relative aspect-video lg:aspect-[21/9] overflow-hidden group">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-3 left-3 font-mono text-xs px-2.5 py-1 rounded bg-background/85 backdrop-blur border border-line text-muted-foreground">
            {project.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8 flex flex-col gap-5 flex-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight">
            {project.title}
          </h3>
          <span className="font-mono text-sm text-muted-foreground shrink-0">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base line-clamp-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 8).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md border border-line bg-surface text-xs sm:text-sm text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 8 && (
            <span className="px-2.5 py-1 rounded-md border border-brand/30 bg-brand/5 text-xs sm:text-sm font-mono text-brand">
              +{project.technologies.length - 8} more
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand flex-1 !px-4 !py-2.5 text-sm"
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

          <Dialog>
            <DialogTrigger asChild>
              <button className="btn-ghost-brand flex-1 !px-4 !py-2.5 text-sm">
                <User className="h-4 w-4" />
                Roles & Details
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-bold mb-2">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base">
                  Roles and responsibilities in this project
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8 mt-4">
                <div>
                  <h4 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                    <User className="h-5 w-5 text-brand" />
                    My Roles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1.5 rounded-md bg-brand text-brand-foreground text-sm font-medium"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand" />
                    Key Responsibilities
                  </h4>
                  <div className="space-y-2.5">
                    {project.responsibilities.map((item) => (
                      <div
                        key={item.slice(0, 40)}
                        className="flex items-start gap-3 p-3 rounded-md border border-line bg-surface/60"
                      >
                        <CheckCircle className="h-4 w-4 text-brand mt-1 shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-brand" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md border border-line bg-surface text-sm text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
          if (!track) return;
          const getAmount = () => track.scrollWidth - window.innerWidth;

          gsap.to(track, {
            x: () => -getAmount(),
            ease: "none",
            scrollTrigger: {
              trigger: pinRef.current,
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
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
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
      className="relative overflow-hidden bg-surface/40"
    >
      <div className="container-responsive pt-16 sm:pt-24 lg:pt-32">
        <SectionHeading
          index="04"
          label="Work"
          title="Featured"
          accent="Projects"
          subtitle="A showcase of my recent work and technical projects demonstrating Full-stack development skills"
        />
        <p className="hidden lg:flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground -mt-10 mb-4">
          <MoveHorizontal className="h-4 w-4 text-brand" />
          keep scrolling — the deck moves sideways
        </p>
      </div>

      {/* Pinned horizontal deck (desktop) / vertical stack (mobile) */}
      <div ref={pinRef} className="lg:h-screen lg:flex lg:flex-col lg:justify-center">
        <div
          ref={trackRef}
          className="flex flex-col gap-10 px-4 sm:px-6 pb-16 lg:pb-0 lg:flex-row lg:gap-10 lg:px-[6vw] lg:items-stretch lg:h-[78vh] lg:will-change-transform"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}

          {/* End card */}
          <div className="project-card hidden lg:flex flex-col items-start justify-center shrink-0 w-[40vw] max-w-[480px] p-10">
            <p className="section-label mb-4">{"// that's the deck"}</p>
            <h3 className="font-display text-4xl font-bold leading-tight mb-6">
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
        <div className="hidden lg:block mx-[6vw] mt-8 h-px bg-line relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-brand origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Mobile-only bottom CTA (desktop version lives in the deck) */}
      <div className="lg:hidden text-center pb-16">
        <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-line bg-card font-mono text-sm">
          <Code2 className="h-5 w-5 text-brand" />
          <span className="text-muted-foreground">More Projects Coming Soon</span>
          <Github className="h-5 w-5 text-brand" />
        </div>
      </div>
    </section>
  );
}
