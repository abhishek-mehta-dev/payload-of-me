import { checkAuth, getBlogs, logoutAction } from './actions';
import LoginForm from './LoginForm';
import Link from 'next/link';
import { PlusIcon, LogOutIcon, FileText, Globe, FileEdit, Eye } from 'lucide-react';
import { ActionButtons } from './ActionButtons';

export default async function AdminPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-neutral-100 mb-1">Admin Login</h2>
          <p className="text-neutral-500 text-sm">Enter your password to manage your blog</p>
        </div>
        <LoginForm />
      </div>
    );
  }

  const blogs = await getBlogs();
  const published = blogs.filter((b: { published: boolean }) => b.published).length;
  const drafts = blogs.length - published;

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-100">Blog Posts</h2>
          <p className="text-neutral-500 text-sm mt-0.5">{blogs.length} total posts</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/new"
            className="flex items-center gap-2 bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg font-medium hover:bg-neutral-200 transition text-sm"
          >
            <PlusIcon size={16} />
            New Post
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-400 px-4 py-2 rounded-lg font-medium hover:text-neutral-100 hover:bg-neutral-800 transition text-sm"
            >
              <LogOutIcon size={16} />
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Posts', value: blogs.length, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Published', value: published, icon: Globe, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Drafts', value: drafts, icon: FileEdit, color: 'text-amber-400', bg: 'bg-amber-400/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="flex items-center gap-4 p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
            <div className={`p-2.5 rounded-lg ${bg}`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-100">{value}</p>
              <p className="text-xs text-neutral-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Blog list */}
      {blogs.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-neutral-800 rounded-xl text-neutral-500">
          <FileText size={32} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium mb-1">No blog posts yet</p>
          <p className="text-sm">Create your first post to get started.</p>
        </div>
      ) : (
        <div className="border border-neutral-800 rounded-xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bg-neutral-900 border-b border-neutral-800 text-xs font-medium text-neutral-500 uppercase tracking-wider">
            <span>Title</span>
            <span>Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          {blogs.map((blog: { id: number; title: string; slug: string; created_at: string; published: boolean }, idx: number) => (
            <div
              key={blog.id}
              className={`grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-4 ${
                idx !== blogs.length - 1 ? 'border-b border-neutral-800/60' : ''
              } hover:bg-neutral-900/40 transition-colors`}
            >
              {/* Title + preview link */}
              <div className="min-w-0">
                <p className="font-medium text-neutral-100 truncate">{blog.title}</p>
                {blog.published && (
                  <Link
                    href={`/blogs/${blog.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-blue-400 transition-colors mt-0.5"
                  >
                    <Eye size={11} />
                    View live
                  </Link>
                )}
              </div>

              {/* Date */}
              <span className="text-sm text-neutral-500 whitespace-nowrap font-mono">
                {new Date(blog.created_at).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric',
                })}
              </span>

              {/* Status badge */}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                blog.published
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${blog.published ? 'bg-green-400' : 'bg-amber-400'}`} />
                {blog.published ? 'Published' : 'Draft'}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/edit/${blog.id}`}
                  className="p-2 text-neutral-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition"
                  title="Edit post"
                >
                  <FileEdit size={16} />
                </Link>
                <ActionButtons blog={blog} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
