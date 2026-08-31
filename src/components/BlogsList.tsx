"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Bug, Terminal } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import BlogPostCard, { type BlogCardData } from "@/components/BlogPostCard";
import BuildStoryArc from "@/components/BuildStoryArc";
import { BUILD_STORIES } from "@/content/build-stories";

export default function BlogsList({ blogs }: { blogs: BlogCardData[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const [featured, ...rest] = blogs;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".blog-card");
      if (!cards.length) return;
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id={BUILD_STORIES.sectionId}
      ref={rootRef}
      className="section-responsive relative overflow-hidden bg-surface/30"
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl opacity-10"
        style={{ background: "var(--brand)" }}
      />
      <div
        className="pointer-events-none absolute bottom-10 left-0 h-48 w-48 rounded-full blur-3xl opacity-[0.06]"
        style={{ background: "var(--brand)" }}
      />

      <div className="container-responsive relative z-10">
        <SectionHeading
          index={BUILD_STORIES.sectionIndex}
          label={BUILD_STORIES.sectionLabel}
          title={BUILD_STORIES.homeTitle}
          accent={BUILD_STORIES.homeAccent}
          subtitle={BUILD_STORIES.homeSubtitle}
        />

        <div className="mb-8 sm:mb-10 -mt-2 sm:-mt-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-card font-mono text-xs text-muted-foreground">
              <Bug className="h-3.5 w-3.5 text-brand" />
              {BUILD_STORIES.archiveCount(blogs.length)}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              {BUILD_STORIES.homePrompt}
            </span>
          </div>
          <BuildStoryArc compact />
        </div>

        <div className="space-y-5 sm:space-y-6 mb-10 sm:mb-12">
          {featured && (
            <BlogPostCard
              blog={featured}
              index={0}
              featured
              className="shadow-[0_0_0_1px_color-mix(in_oklch,var(--brand)_15%,transparent)]"
            />
          )}

          {rest.length > 0 && (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {rest.map((blog, i) => (
                <BlogPostCard key={blog.id} blog={blog} index={i + 1} />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Link href="/blogs" className="btn-brand">
            <Terminal className="h-4 w-4" />
            {BUILD_STORIES.homeCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
