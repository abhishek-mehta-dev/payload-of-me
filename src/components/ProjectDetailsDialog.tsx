"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Code2,
  User,
  CheckCircle,
  ListTree,
  Layers,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/data/projects";
import { getTechMeta } from "@/lib/tech-icons";
import { lockPageScroll, unlockPageScroll } from "@/lib/lenis-store";

type TabId = "overview" | "built" | "stack";

const tabs: { id: TabId; label: string; icon: typeof User }[] = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "built", label: "What I built", icon: CheckCircle },
  { id: "stack", label: "Stack", icon: Layers },
];

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

export default function ProjectDetailsDialog({
  project,
}: {
  project: Project;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("overview");
  const [activeItem, setActiveItem] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setTab("overview");
      setActiveItem(0);
      setCopied(null);
      return;
    }

    lockPageScroll();
    return () => unlockPageScroll();
  }, [open]);

  const copyTech = async (tech: string) => {
    try {
      await navigator.clipboard.writeText(tech);
      setCopied(tech);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      /* ignore */
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="btn-brand flex-1 !px-4 !py-2.5 text-sm"
        >
          <ListTree className="h-4 w-4" />
          Technical Details
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton
        className="p-0 gap-0 overflow-hidden border-line bg-card w-[calc(100%-1.5rem)] sm:max-w-3xl max-h-[min(90dvh,820px)] h-auto min-h-[min(70dvh,520px)] flex flex-col"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Media header */}
        <div className="relative shrink-0 border-b border-line">
          <div className="relative h-28 sm:h-36 md:h-44 overflow-hidden max-[500px]:h-24">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              sizes="(min-width: 640px) 48rem, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/55 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 pt-0">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${statusClasses(project.status)}`}
                >
                  {project.status}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-line bg-background/70 text-muted-foreground">
                  {project.category}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {project.responsibilities.length} deliverables ·{" "}
                  {project.technologies.length} technologies
                </span>
              </div>
              <DialogTitle className="font-display text-xl sm:text-2xl font-bold leading-tight pr-8">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Tabs */}
        <div className="shrink-0 flex gap-1 px-3 sm:px-5 pt-3 border-b border-line bg-surface/40 overflow-x-auto scrollbar-none">
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`relative flex shrink-0 items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2.5 min-h-11 font-mono text-[11px] sm:text-sm transition-colors ${
                  active
                    ? "text-brand"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">{label}</span>
                {active && (
                  <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5"
          key={tab}
        >
          {tab === "overview" && (
            <div className="space-y-6 log-line-in">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3 flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-brand" />
                  roles
                </p>
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

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  {
                    label: "Built",
                    value: String(project.responsibilities.length).padStart(
                      2,
                      "0",
                    ),
                  },
                  {
                    label: "Stack",
                    value: String(project.technologies.length).padStart(2, "0"),
                  },
                  {
                    label: "Roles",
                    value: String(project.roles.length).padStart(2, "0"),
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-line bg-surface/60 p-3 text-center"
                  >
                    <p className="font-display text-2xl font-bold text-brand tabular-nums">
                      {stat.value}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-line bg-surface/50 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  $ highlight --top
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {project.responsibilities[0]}
                </p>
                <button
                  type="button"
                  onClick={() => setTab("built")}
                  className="mt-3 font-mono text-xs text-brand hover:underline"
                >
                  view all deliverables →
                </button>
              </div>
            </div>
          )}

          {tab === "built" && (
            <div className="space-y-2.5 log-line-in">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
                click a row to focus
              </p>
              {project.responsibilities.map((item, i) => {
                const active = activeItem === i;
                return (
                  <button
                    key={item.slice(0, 48)}
                    type="button"
                    onClick={() => setActiveItem(i)}
                    className={`w-full text-left flex items-start gap-3 p-3.5 rounded-lg border transition-all duration-300 ${
                      active
                        ? "border-brand/50 bg-brand/10 shadow-[0_0_0_1px_color-mix(in_oklch,var(--brand)_20%,transparent)]"
                        : "border-line bg-surface/50 hover:border-brand/30 hover:bg-surface"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] tabular-nums ${
                        active
                          ? "bg-brand text-brand-foreground"
                          : "border border-line text-muted-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm leading-relaxed ${
                        active ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item}
                    </span>
                    {active && (
                      <CheckCircle className="h-4 w-4 text-brand mt-1 shrink-0 ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {tab === "stack" && (
            <div className="log-line-in">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3 flex items-center gap-2">
                <Code2 className="h-3.5 w-3.5 text-brand" />
                click a chip to copy
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => {
                  const isCopied = copied === tech;
                  const { icon: Icon, color } = getTechMeta(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => copyTech(tech)}
                      className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition-all duration-200 ${
                        isCopied
                          ? "border-brand bg-brand/15 text-brand"
                          : "border-line bg-surface text-muted-foreground hover:border-brand/40 hover:text-foreground"
                      }`}
                    >
                      <Icon
                        className="text-base shrink-0"
                        style={{ color: isCopied ? "var(--brand)" : color }}
                      />
                      {tech}
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="shrink-0 flex flex-col sm:flex-row gap-2.5 p-4 sm:p-5 border-t border-line bg-surface/30">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand flex-1 !py-2.5 text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            Open live site
          </a>
          <a
            href={project.githubUrl === "#" ? "/oops" : project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-brand flex-1 !py-2.5 text-sm"
          >
            {project.githubUrl === "#" ? (
              <Code2 className="h-4 w-4" />
            ) : (
              <Github className="h-4 w-4" />
            )}
            View code
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
