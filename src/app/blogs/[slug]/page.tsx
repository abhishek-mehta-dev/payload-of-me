import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '@/lib/supabase';
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from 'lucide-react';

export const revalidate = 60;

async function getBlog(slug: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error || !data) return null;
  return data;
}

function readingTime(content: string): number {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Not Found' };
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

  const mins = readingTime(blog.content);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans">

      {/* Top gradient accent bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 z-50" />

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-32">

        {/* Back link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors mb-14 group"
        >
          <ArrowLeftIcon size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to writing
        </Link>

        {/* Header */}
        <header className="mb-14">
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 mb-6 font-mono">
            <span className="flex items-center gap-1.5">
              <CalendarIcon size={12} />
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
            <span className="flex items-center gap-1.5">
              <ClockIcon size={12} />
              {mins} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-gray-900 dark:text-white mb-6">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed border-l-2 border-blue-500/50 pl-4">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-10 h-px bg-gradient-to-r from-gray-200 dark:from-gray-800 via-gray-300 dark:via-gray-700 to-transparent" />
        </header>

        {/* Article body */}
        <article>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 tracking-tight leading-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white mt-14 mb-5">
                  <span className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-purple-500 shrink-0" />
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-[1.05rem] text-gray-600 dark:text-gray-300 leading-[1.85] mb-5">{children}</p>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-6 px-5 py-4 bg-blue-50 dark:bg-blue-950/25 border border-blue-200 dark:border-blue-500/20 rounded-xl text-blue-700 dark:text-blue-200 text-[0.97rem] leading-relaxed italic">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="my-5 space-y-2 pl-0 list-none">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="my-5 space-y-2 pl-5 list-decimal marker:text-blue-500 dark:marker:text-blue-400">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-[1rem] leading-relaxed">
                  <span className="mt-[0.45rem] w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span>{children}</span>
                </li>
              ),
              code: ({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode; className?: string }) =>
                inline ? (
                  <code
                    className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-300 font-mono text-[0.875em] border border-gray-200 dark:border-gray-700"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code className="font-mono text-sm text-gray-800 dark:text-gray-200" {...props}>
                    {children}
                  </code>
                ),
              pre: ({ children }) => (
                <div className="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <span className="w-3 h-3 rounded-full bg-green-400/80" />
                    <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 font-mono">bash</span>
                  </div>
                  <pre className="overflow-x-auto px-5 py-4 text-sm leading-relaxed text-gray-800 dark:text-gray-200">{children}</pre>
                </div>
              ),
              hr: () => (
                <div className="my-12 flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                  <div className="flex gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  </div>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                </div>
              ),
              a: ({ children, href, ...props }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 decoration-blue-400/40 transition-colors"
                  {...props}
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="not-italic text-gray-400 dark:text-gray-500 text-sm">{children}</em>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </article>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors group"
          >
            <ArrowLeftIcon size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to all articles
          </Link>
        </footer>
      </div>
    </div>
  );
}
