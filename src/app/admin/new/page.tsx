import { checkAuth } from '../actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BlogEditor from './BlogEditor';
import { BUILD_STORIES } from '@/content/build-stories';

export default async function NewBlogPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect('/admin');
  }

  return (
    <div className="min-w-0 max-w-4xl">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-muted-foreground hover:text-brand transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        {BUILD_STORIES.admin.backToList}
      </Link>
      <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">
        {BUILD_STORIES.admin.createTitle}
      </h2>
      <p className="text-sm text-muted-foreground mb-6 sm:mb-8">
        Fill in each step below — no markdown required. We&apos;ll format it for you.
      </p>
      <BlogEditor />
    </div>
  );
}
