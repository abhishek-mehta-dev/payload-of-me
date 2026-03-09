import { checkAuth, getBlogs, logoutAction } from './actions';
import LoginForm from './LoginForm';
import Link from 'next/link';
import { PlusIcon, LogOutIcon } from 'lucide-react';
import { ActionButtons } from './ActionButtons';

export default async function AdminPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-xl font-semibold mb-6">Admin Login</h2>
        <LoginForm />
      </div>
    );
  }

  const blogs = await getBlogs();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-neutral-100">Your Blogs</h2>
        <div className="flex gap-4">
          <Link
            href="/admin/new"
            className="flex items-center gap-2 bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg font-medium hover:bg-neutral-200 transition"
          >
            <PlusIcon size={18} />
            <span>New Post</span>
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-400 px-4 py-2 rounded-lg font-medium hover:text-neutral-100 hover:bg-neutral-800 transition"
            >
              <LogOutIcon size={18} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-neutral-800 rounded-xl text-neutral-500">
          No blog posts found. Create your first one!
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog: any) => (
            <div
              key={blog.id}
              className="flex items-center justify-between p-4 border border-neutral-800 rounded-xl bg-neutral-900/50"
            >
              <div>
                <h3 className="font-semibold text-neutral-100">{blog.title}</h3>
                <div className="text-sm text-neutral-500 mt-1 flex gap-3">
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  <span
                    className={
                      blog.published ? 'text-green-500' : 'text-amber-500'
                    }
                  >
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <ActionButtons blog={blog} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
