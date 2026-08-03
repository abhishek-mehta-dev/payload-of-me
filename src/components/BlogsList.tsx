"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, CalendarDays } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

type BlogType = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
};

function readingTime(excerpt: string) {
  return Math.max(1, Math.ceil(excerpt.split(" ").length / 40)) + " min read";
}

export default function BlogsList({ blogs }: { blogs: BlogType[] }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".blog-card");
      if (!cards.length) return;
      gsap.from(cards, {
        opacity: 0,
        y: 36,
        stagger: 0.1,
        duration: 0.65,
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
      id="blogs"
      ref={rootRef}
      className="section-responsive relative overflow-hidden bg-surface/30"
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl opacity-10"
        style={{ background: "var(--brand)" }}
      />

      <div className="container-responsive relative z-10">
        <SectionHeading
          index="05"
          label="Writing"
          title="Latest"
          accent="Writing"
          subtitle="Thoughts, deep-dives, and technical articles on things I find worth writing about."
        />

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mb-10 sm:mb-12">
          {blogs.map((blog, i) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="blog-card panel panel-hover group flex flex-col h-full overflow-hidden min-w-0"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-surface/70">
                <span className="term-dot bg-red-500/80" />
                <span className="term-dot bg-yellow-500/80" />
                <span className="term-dot bg-brand" />
                <span className="ml-2 font-mono text-[10px] sm:text-xs text-muted-foreground truncate">
                  post/{String(i + 1).padStart(2, "0")} — {blog.slug}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-4 sm:p-5 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 font-mono text-[10px] sm:text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-brand shrink-0" />
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-brand shrink-0" />
                    {readingTime(blog.excerpt)}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold mb-2.5 leading-snug group-hover:text-brand transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-5">
                  {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-line">
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-brand transition-colors">
                    $ open --article
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-background text-brand group-hover:border-brand/50 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/blogs" className="btn-ghost-brand">
            <BookOpen className="h-4 w-4" />
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
