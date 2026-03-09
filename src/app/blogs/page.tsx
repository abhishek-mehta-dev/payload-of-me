import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Blog | Payload',
  description: 'Thoughts, learnings, and technical articles.',
};

export const revalidate = 60; // Revalidate every minute

async function getPublishedBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, excerpt, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  return data || [];
}

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 px-6 py-24 md:py-32 font-sans selection:bg-neutral-800 selection:text-neutral-50">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Writing
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl">
            Articles, thoughts, and technical explorations on things I find interesting.
          </p>
        </header>

        <main>
          {blogs.length === 0 ? (
            <div className="text-neutral-500 py-12 border-t border-neutral-900">
              No articles have been written yet. Check back later!
            </div>
          ) : (
            <div className="grid gap-10">
              {blogs.map((blog) => (
                <article key={blog.id} className="group relative pt-8 border-t border-neutral-900 first:border-t-0 first:pt-0">
                  <Link href={`/blogs/${blog.slug}`} className="block">
                    <div className="text-sm text-neutral-500 mb-3 font-mono">
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <h2 className="text-2xl font-semibold text-neutral-200 mb-3 group-hover:text-neutral-50 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-neutral-400 leading-relaxed max-w-3xl">
                      {blog.excerpt}
                    </p>
                    <div className="mt-4 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-1">
                      Read article <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
