import { checkAuth } from '../../actions';
import { redirect, notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import EditBlogEditor from './EditBlogEditor';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) redirect('/admin');

  const { id } = await params;
  const { data: blog } = await supabase.from('blogs').select('*').eq('id', id).single();
  if (!blog) notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Edit Blog</h2>
      <EditBlogEditor blog={blog} />
    </div>
  );
}
