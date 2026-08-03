"use client";

import Link from "next/link";
import { ArrowLeft, Home, type LucideIcon } from "lucide-react";

type StatusPageProps = {
  code: string;
  label: string;
  title: string;
  accent: string;
  description: string;
  detailTitle: string;
  detailBody: string;
  icon: LucideIcon;
  badgeIcon: LucideIcon;
};

export default function StatusPage({
  code,
  label,
  title,
  accent,
  description,
  detailTitle,
  detailBody,
  icon: Icon,
  badgeIcon: BadgeIcon,
}: StatusPageProps) {
  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = "/";
  };

  return (
    <section className="relative min-h-[calc(100dvh-4.5rem)] overflow-hidden blueprint-grid noise-overlay flex items-start sm:items-center py-16 sm:py-0">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[min(50rem,100vw)] h-[28rem] rounded-full blur-3xl opacity-15"
        style={{ background: "var(--brand)" }}
      />

      <div className="container-responsive relative z-10 py-12 sm:py-20 lg:py-28">
        <div className="max-w-3xl mx-auto">
          <p className="section-label mb-6">
            {code} / {label}
          </p>

          <div className="mb-8 sm:mb-10 flex items-start gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 items-center justify-center rounded-lg border border-brand/35 bg-brand/10">
                <Icon className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-brand" />
              </div>
              <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-md border border-line bg-card text-brand">
                <BadgeIcon className="h-4 w-4" />
              </span>
            </div>

            <div className="min-w-0 pt-1">
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
                {title}{" "}
                <span className="text-brand">{accent}</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>
          </div>

          <div className="panel p-5 sm:p-6 mb-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand mb-3">
              $ status --explain
            </p>
            <h2 className="font-display font-semibold text-lg mb-2">
              {detailTitle}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {detailBody}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={goBack} className="btn-brand">
              <ArrowLeft className="h-4 w-4" />
              $ cd ..
            </button>
            <Link href="/#projects" className="btn-ghost-brand">
              <Home className="h-4 w-4" />
              $ open --projects
            </Link>
          </div>

          <p className="mt-10 font-mono text-xs text-muted-foreground/70">
            {"// abhishek.mehta — portfolio runtime"}
          </p>
        </div>
      </div>
    </section>
  );
}
