import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowRightIcon } from 'lucide-react';

async function getRecentBlogs() {
  const { data } = await supabase
    .from('blogs')
    .select('id, title, slug, excerpt, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  return data || [];
}

export default async function BlogsSection() {
  const blogs = await getRecentBlogs();

  if (blogs.length === 0) {
    return null; // Don't show the section if no blogs exist
  }

  return (
    <section id="blogs" className="py-20 md:py-32 bg-neutral-950 text-neutral-50 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Latest Writing</h2>
            <p className="text-neutral-400 text-lg md:text-xl">
              Thoughts, learnings, and technical articles.
            </p>
          </div>
          <Link
            href="/blogs"
            className="group flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            View all articles
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="group block p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-800/50 transition-colors"
            >
              <div className="text-xs text-neutral-500 mb-3 font-mono">
                {new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
              <h3 className="text-xl font-semibold text-neutral-200 mb-3 group-hover:text-neutral-50 transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                {blog.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
