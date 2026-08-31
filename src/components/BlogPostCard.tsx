import Link from "next/link";
import { ArrowRight, Bug, CalendarDays, Clock } from "lucide-react";
import clsx from "clsx";
import {
  blogReadingLabel,
  cardAccent,
  excerptHook,
  inferBlogTags,
} from "@/lib/blog-utils";
import { BUILD_STORIES } from "@/content/build-stories";

export type BlogCardData = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
};

export default function BlogPostCard({
  blog,
  index,
  featured = false,
  className,
}: {
  blog: BlogCardData;
  index: number;
  featured?: boolean;
  className?: string;
}) {
  const tags = inferBlogTags(blog.title, blog.slug);
  const hook = excerptHook(blog.excerpt);
  const accent = cardAccent(index);

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: featured ? "long" : "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={clsx(
        "blog-card panel panel-hover group relative flex flex-col overflow-hidden min-w-0 h-full",
        "transition-all duration-300 hover:shadow-[0_20px_50px_-28px_color-mix(in_oklch,var(--brand)_45%,transparent)]",
        featured && "md:flex-row md:items-stretch",
        className,
      )}
    >
      {/* Hover gradient wash */}
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          accent,
        )}
        aria-hidden
      />

      {/* Index watermark */}
      <span
        className="pointer-events-none absolute -right-1 -top-2 font-display text-7xl sm:text-8xl font-bold text-brand/[0.06] group-hover:text-brand/[0.1] transition-colors select-none"
        aria-hidden
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={clsx(
          "relative flex items-center gap-2 px-4 py-2.5 border-b border-line bg-surface/70 shrink-0",
          featured && "md:w-56 md:border-b-0 md:border-r md:flex-col md:items-start md:justify-between md:py-5 md:px-4",
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="term-dot bg-red-500/80 shrink-0" />
          <span className="term-dot bg-yellow-500/80 shrink-0" />
          <span className="term-dot bg-brand shrink-0" />
          <span className="ml-2 font-mono text-[10px] sm:text-xs text-muted-foreground">
            {BUILD_STORIES.cardLogFile}
          </span>
        </div>
        <span className="font-mono text-[10px] text-brand/90 shrink-0">
          #{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div
        className={clsx(
          "relative flex flex-col flex-1 p-4 sm:p-5 min-w-0",
          featured && "md:p-6 lg:p-8",
        )}
      >
        {featured && (
          <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-brand mb-3 w-fit px-2.5 py-1 rounded-full border border-brand/25 bg-brand/10">
            <Bug className="h-3 w-3" />
            {BUILD_STORIES.featuredBadge}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md border border-line bg-background/60 font-mono text-[10px] text-muted-foreground group-hover:border-brand/30 group-hover:text-brand transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 font-mono text-[10px] sm:text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-brand shrink-0" />
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-brand shrink-0" />
            {blogReadingLabel(blog.excerpt)}
          </span>
        </div>

        <h3
          className={clsx(
            "font-display font-bold leading-snug text-foreground group-hover:text-brand transition-colors duration-300",
            featured
              ? "text-xl sm:text-2xl lg:text-[1.75rem] mb-3 line-clamp-3"
              : "text-lg sm:text-xl mb-2 line-clamp-2",
          )}
        >
          {blog.title}
        </h3>

        <p
          className={clsx(
            "text-sm leading-relaxed flex-1",
            featured
              ? "text-muted-foreground line-clamp-3 sm:line-clamp-4 max-w-3xl mb-4"
              : "text-muted-foreground/90 line-clamp-2 mb-3",
          )}
        >
          {blog.excerpt}
        </p>

        {!featured && hook !== blog.excerpt && (
          <p className="text-xs font-mono text-brand/80 mb-4 line-clamp-1 border-l-2 border-brand/40 pl-2.5">
            {hook}
          </p>
        )}

        <div
          className={clsx(
            "mt-auto flex items-center justify-between gap-3 pt-3 border-t border-line",
            featured && "md:mt-6",
          )}
        >
          <span className="font-mono text-xs text-muted-foreground group-hover:text-brand transition-colors">
            {BUILD_STORIES.cardCta}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line bg-background text-xs font-mono text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-300">
            {BUILD_STORIES.cardOpen}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
