import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '@/lib/supabase';
import { ArrowLeftIcon } from 'lucide-react';

export const revalidate = 60;

async function getBlog(slug: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.slug);

  if (!blog) {
    return { title: 'Not Found | Payload' };
  }

  return {
    title: `${blog.title} | Payload`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-neutral-950 text-neutral-50 px-6 py-24 md:py-32 font-sans selection:bg-neutral-800 selection:text-neutral-50">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-12"
        >
          <ArrowLeftIcon size={16} />
          <span>Back to writing</span>
        </Link>
        
        <header className="mb-12">
          <div className="text-sm text-neutral-500 mb-4 font-mono">
            {new Date(blog.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {blog.title}
          </h1>
        </header>

        <div className="prose prose-invert prose-neutral max-w-none prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-img:rounded-xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node: _node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 underline-offset-2" />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
