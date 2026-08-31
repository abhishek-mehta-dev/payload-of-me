"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Bug, FileText, Terminal } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import BlogPostCard, { type BlogCardData } from "@/components/BlogPostCard";
import BuildStoryArc from "@/components/BuildStoryArc";
import { BUILD_STORIES } from "@/content/build-stories";

export default function BlogsPageView({ blogs }: { blogs: BlogCardData[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const [featured, ...rest] = blogs;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".blog-card");
      if (!cards.length) return;
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="section-responsive relative overflow-hidden bg-surface/30 min-h-[calc(100dvh-72px)]"
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full blur-3xl opacity-10"
        style={{ background: "var(--brand)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl opacity-[0.06]"
        style={{ background: "var(--brand)" }}
      />

      <div className="container-responsive relative z-10 pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 fab-clearance">
        <Link
          href={`/#${BUILD_STORIES.sectionId}`}
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-brand transition-colors mb-6 sm:mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <SectionHeading
          index={BUILD_STORIES.sectionIndex}
          label={BUILD_STORIES.sectionLabel}
          title={BUILD_STORIES.archiveTitle}
          accent={BUILD_STORIES.archiveAccent}
          subtitle={BUILD_STORIES.archiveSubtitle}
        />

        {blogs.length > 0 && (
          <div className="space-y-4 -mt-2 sm:-mt-4 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line bg-card font-mono text-xs text-muted-foreground">
                <Bug className="h-3.5 w-3.5 text-brand" />
                {BUILD_STORIES.archiveCount(blogs.length)}
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <Terminal className="h-3 w-3 text-brand" />
                {BUILD_STORIES.archivePrompt}
              </span>
            </div>
            <BuildStoryArc />
          </div>
        )}

        {blogs.length === 0 ? (
          <div className="panel border-dashed p-10 sm:p-14 text-center max-w-xl mx-auto">
            <FileText className="h-10 w-10 text-brand/50 mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">
              {BUILD_STORIES.emptyTitle}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {BUILD_STORIES.emptySubtitle}
            </p>
            <Link href="/" className="btn-ghost-brand justify-center">
              <ArrowLeft className="h-4 w-4" />
              Return home
            </Link>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {featured && (
              <BlogPostCard
                blog={featured}
                index={0}
                featured
                className="shadow-[0_0_0_1px_color-mix(in_oklch,var(--brand)_15%,transparent)]"
              />
            )}

            {rest.length > 0 && (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                {rest.map((blog, i) => (
                  <BlogPostCard key={blog.id} blog={blog} index={i + 1} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
