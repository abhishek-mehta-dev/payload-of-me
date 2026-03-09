import { checkAuth } from '../actions';
import { redirect } from 'next/navigation';
import BlogEditor from './BlogEditor';

export default async function NewBlogPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect('/admin');
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create New Blog</h2>
      <BlogEditor />
    </div>
  );
}
