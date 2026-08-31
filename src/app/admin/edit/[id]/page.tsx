import { checkAuth } from '../../actions';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import EditBlogEditor from './EditBlogEditor';
import { BUILD_STORIES } from '@/content/build-stories';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) redirect('/admin');

  const { id } = await params;

  if (!isSupabaseConfigured()) {
    redirect('/admin');
  }

  const { data: blog } = await getSupabaseAdmin()
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();
  if (!blog) notFound();

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
        {BUILD_STORIES.admin.editTitle}
      </h2>
      <p className="text-sm text-muted-foreground mb-6 sm:mb-8">
        Update each section below. Your changes are saved as a formatted build story.
      </p>
      <EditBlogEditor blog={blog} />
    </div>
  );
}
