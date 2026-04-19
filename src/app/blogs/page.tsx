import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Writing | Abhishek Mehta',
  description: 'Thoughts, learnings, and technical articles.',
};

export const revalidate = 60;

async function getPublishedBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, excerpt, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

function readingTime(excerpt: string) {
  return Math.max(1, Math.ceil(excerpt.split(' ').length / 40));
}

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            Writing
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl">
            Articles, thoughts, and technical explorations on things I find interesting.
          </p>
        </header>

        {blogs.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 py-12 border-t border-gray-200 dark:border-gray-800">
            No articles yet. Check back soon.
          </p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {blogs.map((blog) => (
              <article key={blog.id} className="group py-10 first:pt-0">
                <Link href={`/blogs/${blog.slug}`} className="block">
                  <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 font-mono mb-3">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={12} />
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {readingTime(blog.excerpt)} min read
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {blog.title}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 max-w-2xl">
                    {blog.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all">
                    Read article <ArrowRight size={14} />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
