import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, CalendarDays, Clock, Share2 } from "lucide-react";
import BlogReadingProgress from "@/components/BlogReadingProgress";
import BlogArticleBody from "@/components/BlogArticleBody";
import BuildStoryArc from "@/components/BuildStoryArc";
import { blogReadingMinutes, inferBlogTags } from "@/lib/blog-utils";
import { BUILD_STORIES } from "@/content/build-stories";

export const revalidate = 60;

async function getBlog(slug: string) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Not Found" };
  return {
    title: `${blog.title} | Abhishek Mehta`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const mins = blogReadingMinutes(blog.content);
  const tags = inferBlogTags(blog.title, blog.slug);

  return (
    <article className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <BlogReadingProgress />

      <div
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full blur-3xl opacity-10"
        style={{ background: "var(--brand)" }}
      />

      <div className="container-responsive relative z-10 max-w-3xl pt-24 sm:pt-28 md:pt-32 pb-24 sm:pb-32 fab-clearance">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-brand transition-colors mb-8 sm:mb-10 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to all build stories
        </Link>

        <header className="panel overflow-hidden mb-8 sm:mb-10">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-surface/70">
            <span className="term-dot bg-red-500/80" />
            <span className="term-dot bg-yellow-500/80" />
            <span className="term-dot bg-brand" />
            <span className="ml-2 font-mono text-[10px] sm:text-xs text-muted-foreground truncate">
              ~/incidents/{blog.slug}
            </span>
          </div>

          <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-b from-brand/[0.04] to-transparent">
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full border border-brand/25 bg-brand/10 font-mono text-[10px] text-brand"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-muted-foreground mb-5">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-brand" />
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-brand" />
                {mins} min read
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-[2.35rem] font-bold tracking-tight leading-[1.12] mb-5">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="text-base sm:text-lg text-foreground/85 leading-relaxed border-l-[3px] border-brand pl-4 sm:pl-5 font-medium">
                {blog.excerpt}
              </p>
            )}
          </div>
        </header>

        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Story arc
          </p>
          <BuildStoryArc />
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            {BUILD_STORIES.articleIntro}
          </p>
        </div>

        {/* Article body */}
        <div className="panel p-5 sm:p-7 md:p-8 mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-6 pb-4 border-b border-line">
            {BUILD_STORIES.articleBodyLabel}
          </p>
          <BlogArticleBody content={blog.content} />
        </div>

        {/* End CTA */}
        <div className="panel p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-display font-semibold text-foreground mb-1">
              {BUILD_STORIES.articleEndTitle}
            </p>
            <p className="text-sm text-muted-foreground">
              {BUILD_STORIES.articleEndSubtitle}
            </p>
          </div>
          <Link href="/blogs" className="btn-brand justify-center shrink-0">
            <Share2 className="h-4 w-4" />
            {BUILD_STORIES.articleEndCta}
          </Link>
        </div>
      </div>
    </article>
  );
}
