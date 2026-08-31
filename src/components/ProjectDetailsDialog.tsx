"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Code2,
  CheckCircle,
  ListTree,
  Layers,
  Sparkles,
  Copy,
  Check,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project } from "@/data/projects";
import { getTechMeta } from "@/lib/tech-icons";
import { lockPageScroll, unlockPageScroll } from "@/lib/lenis-store";
import clsx from "clsx";

type TabId = "overview" | "built" | "stack";

const tabs: { id: TabId; label: string; icon: typeof Sparkles }[] = [
  { id: "overview", label: "Overview", icon: Sparkles },
  { id: "built", label: "Deliverables", icon: CheckCircle },
  { id: "stack", label: "Tech stack", icon: Layers },
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
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setTab("overview");
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

  const previewDeliverables = project.responsibilities.slice(0, 4);
  const remainingDeliverables = project.responsibilities.length - previewDeliverables.length;

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
        showCloseButton={false}
        className="p-0 gap-0 overflow-hidden border-line bg-card w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] sm:max-w-2xl lg:max-w-3xl max-h-[min(92dvh,780px)] h-[min(92dvh,780px)] flex flex-col shadow-2xl shadow-black/40"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Header — title on solid surface, image as preview (not behind text) */}
        <div className="shrink-0 border-b border-line">
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-36 sm:h-auto sm:w-44 md:w-52 shrink-0 border-b sm:border-b-0 sm:border-r border-line bg-surface overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt=""
                fill
                sizes="(min-width: 640px) 208px, 100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-card/30" />
            </div>

            <div className="relative flex-1 min-w-0 p-4 sm:p-5 pr-12">
              <DialogClose
                className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-md border border-line bg-background/90 text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                aria-label="Close project details"
              >
                <X className="h-4 w-4" />
              </DialogClose>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${statusClasses(project.status)}`}
                >
                  {project.status}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-line bg-surface text-muted-foreground">
                  {project.category}
                </span>
              </div>

              <DialogTitle className="font-display text-lg sm:text-xl font-bold leading-snug text-foreground">
                {project.title}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-2">
                {project.description}
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Segmented tabs */}
        <div className="shrink-0 px-4 sm:px-5 py-3 border-b border-line bg-surface/30">
          <div
            role="tablist"
            aria-label="Project details sections"
            className="flex gap-1 p-1 rounded-lg border border-line bg-background/60"
          >
            {tabs.map(({ id, label, icon: Icon }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(id)}
                  className={clsx(
                    "flex flex-1 items-center justify-center gap-1.5 min-h-10 px-2 sm:px-3 rounded-md font-mono text-[11px] sm:text-xs transition-all duration-200",
                    active
                      ? "bg-brand text-brand-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface/80",
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable body */}
        <div
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 sm:py-5 scrollbar-thin"
          role="tabpanel"
        >
          {tab === "overview" && (
            <div className="space-y-5 log-line-in">
              {project.roles.length > 0 && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2.5">
                    My role
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-sm font-medium text-brand"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2.5">
                  Summary
                </p>
                <p className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Key deliverables
                  </p>
                  {remainingDeliverables > 0 && (
                    <button
                      type="button"
                      onClick={() => setTab("built")}
                      className="font-mono text-[11px] text-brand hover:underline shrink-0"
                    >
                      +{remainingDeliverables} more
                    </button>
                  )}
                </div>
                <ul className="space-y-2.5">
                  {previewDeliverables.map((item) => (
                    <li
                      key={item.slice(0, 48)}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                    >
                      <CheckCircle className="h-4 w-4 text-brand mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {project.responsibilities.length > previewDeliverables.length && (
                  <button
                    type="button"
                    onClick={() => setTab("built")}
                    className="mt-3 text-sm font-mono text-brand hover:underline"
                  >
                    View all {project.responsibilities.length} deliverables →
                  </button>
                )}
              </div>
            </div>
          )}

          {tab === "built" && (
            <div className="space-y-2 log-line-in">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {project.responsibilities.length} things I shipped on this project
              </p>
              <ul className="space-y-2">
                {project.responsibilities.map((item, i) => (
                  <li
                    key={item.slice(0, 48)}
                    className="flex items-start gap-3 p-3.5 rounded-lg border border-line bg-surface/40"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand/15 border border-brand/25 font-mono text-[10px] tabular-nums text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-foreground/90 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "stack" && (
            <div className="log-line-in">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Tap a technology to copy its name
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
                      className={clsx(
                        "group inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all duration-200 min-h-10",
                        isCopied
                          ? "border-brand bg-brand/15 text-brand"
                          : "border-line bg-surface/50 text-muted-foreground hover:border-brand/40 hover:text-foreground hover:bg-surface",
                      )}
                    >
                      <Icon
                        className="text-base shrink-0"
                        style={{ color: isCopied ? "var(--brand)" : color }}
                      />
                      <span>{tech}</span>
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      ) : (
                        <Copy className="h-3.5 w-3.5 shrink-0 opacity-40 group-hover:opacity-80 transition-opacity" aria-hidden />
                      )}
                      <span className="sr-only">
                        {isCopied ? "Copied" : "Copy technology name"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 flex flex-col-reverse sm:flex-row gap-2 p-4 sm:p-5 border-t border-line bg-card/95 backdrop-blur-sm">
          <a
            href={project.githubUrl === "#" ? "/oops" : project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-brand flex-1 !py-2.5 text-sm justify-center"
          >
            {project.githubUrl === "#" ? (
              <Code2 className="h-4 w-4" />
            ) : (
              <Github className="h-4 w-4" />
            )}
            {project.githubUrl === "#" ? "Private repo" : "View code"}
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand flex-1 !py-2.5 text-sm justify-center"
          >
            <ExternalLink className="h-4 w-4" />
            Open live site
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
