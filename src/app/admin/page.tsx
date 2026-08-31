import { checkAuth, getBlogs, logoutAction } from './actions';
import LoginForm from './LoginForm';
import Link from 'next/link';
import { PlusIcon, LogOutIcon, Bug, Globe, FileEdit, Eye } from 'lucide-react';
import { ActionButtons } from './ActionButtons';
import { BUILD_STORIES } from '@/content/build-stories';

const { admin } = BUILD_STORIES;

function statusBadge(published: boolean) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
        published
          ? 'bg-brand/10 text-brand border border-brand/25'
          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${published ? 'bg-brand' : 'bg-amber-400'}`}
      />
      {published ? 'Published' : 'Draft'}
    </span>
  );
}

export default async function AdminPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-10 sm:py-16">
        <div className="mb-6 sm:mb-8 text-center max-w-sm px-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand mb-2">
            auth required
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">Admin Login</h2>
          <p className="text-muted-foreground text-sm">
            {admin.loginSubtitle}
          </p>
        </div>
        <LoginForm />
      </div>
    );
  }

  const blogsResult = await getBlogs();
  const blogs = blogsResult.data;
  const dbError = blogsResult.error;
  const published = blogs.filter((b: { published: boolean }) => b.published).length;
  const drafts = blogs.length - published;

  return (
    <div className="min-w-0">
      {dbError && (
        <div className="mb-6 panel border-amber-500/30 bg-amber-500/10 p-4 sm:p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400 mb-2">
            database setup required
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed mb-3">{dbError}</p>
          <pre className="text-xs font-mono text-muted-foreground overflow-x-auto p-3 rounded-md border border-line bg-background/60">
{`# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_PASSWORD=your_admin_password`}
          </pre>
          <p className="text-xs text-muted-foreground mt-3">
            Create the <code className="text-brand">blogs</code> table in Supabase SQL Editor — see{" "}
            <code className="text-brand">markdown-files/BLOG_SETUP.md</code>. Restart{" "}
            <code className="text-brand">npm run dev</code> after updating env.
          </p>
        </div>
      )}

      {/* Header row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
        <div className="min-w-0">
          <h2 className="font-display text-xl sm:text-2xl font-bold">{admin.listTitle}</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {admin.listCount(blogs.length)}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Link href="/admin/new" className="btn-brand flex-1 sm:flex-none justify-center !py-2.5 text-sm">
            <PlusIcon size={16} />
            {admin.newStory}
          </Link>
          <form action={logoutAction} className="flex-1 sm:flex-none">
            <button
              type="submit"
              className="btn-ghost-brand w-full justify-center !py-2.5 text-sm"
            >
              <LogOutIcon size={16} />
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[
          { label: admin.stats.total, value: blogs.length, icon: Bug, color: 'text-brand', bg: 'bg-brand/10' },
          { label: admin.stats.published, value: published, icon: Globe, color: 'text-brand', bg: 'bg-brand/10' },
          { label: admin.stats.drafts, value: drafts, icon: FileEdit, color: 'text-amber-400', bg: 'bg-amber-400/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="panel flex items-center gap-3 sm:gap-4 p-4"
          >
            <div className={`p-2.5 rounded-lg border border-line shrink-0 ${bg}`}>
              <Icon size={18} className={color} />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold tabular-nums">{value}</p>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Blog list */}
      {blogs.length === 0 ? (
        <div className="panel p-10 sm:p-12 text-center text-muted-foreground border-dashed">
          <Bug size={32} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium text-foreground mb-1">{admin.emptyListTitle}</p>
          <p className="text-sm">{admin.emptyListSubtitle}</p>
        </div>
      ) : (
        <>
          {/* Mobile / tablet cards */}
          <div className="space-y-3 md:hidden">
            {blogs.map((blog: { id: number; title: string; slug: string; created_at: string; published: boolean }) => (
              <article key={blog.id} className="panel p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium leading-snug break-words">{blog.title}</h3>
                    <p className="font-mono text-xs text-muted-foreground mt-1">
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {statusBadge(blog.published)}
                </div>

                {blog.published && (
                  <Link
                    href={`/blogs/${blog.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-brand transition-colors"
                  >
                    <Eye size={12} />
                    View story
                  </Link>
                )}

                <div className="flex items-center gap-2 pt-2 border-t border-line">
                  <Link
                    href={`/admin/edit/${blog.id}`}
                    className="btn-ghost-brand flex-1 justify-center !py-2 text-xs"
                  >
                    <FileEdit size={14} />
                    Edit
                  </Link>
                  <ActionButtons blog={blog} layout="row" />
                </div>
              </article>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block panel overflow-hidden">
            <div className="grid grid-cols-[minmax(0,1fr)_7.5rem_6.5rem_auto] gap-4 px-5 py-3 border-b border-line text-xs font-mono uppercase tracking-wider text-muted-foreground bg-surface/50">
              <span>{admin.tableStory}</span>
              <span>Date</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </div>

            {blogs.map((blog: { id: number; title: string; slug: string; created_at: string; published: boolean }, idx: number) => (
              <div
                key={blog.id}
                className={`grid grid-cols-[minmax(0,1fr)_7.5rem_6.5rem_auto] gap-4 items-center px-5 py-4 ${
                  idx !== blogs.length - 1 ? 'border-b border-line/70' : ''
                } hover:bg-surface/40 transition-colors`}
              >
                <div className="min-w-0">
                  <p className="font-medium truncate">{blog.title}</p>
                  {blog.published && (
                    <Link
                      href={`/blogs/${blog.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-brand transition-colors mt-0.5"
                    >
                      <Eye size={11} />
                      View story
                    </Link>
                  )}
                </div>

                <span className="text-sm text-muted-foreground whitespace-nowrap font-mono">
                  {new Date(blog.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>

                {statusBadge(blog.published)}

                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/edit/${blog.id}`}
                    className="p-2 text-muted-foreground hover:text-brand hover:bg-brand/10 rounded-md transition"
                    title={admin.editStory}
                  >
                    <FileEdit size={16} />
                  </Link>
                  <ActionButtons blog={blog} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
