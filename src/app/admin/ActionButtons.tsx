'use client';

import { toast } from 'react-hot-toast';
import { deleteBlog, togglePublishBlog } from './actions';
import { TrashIcon, GlobeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

type BlogType = {
  id: number;
  title: string;
  published: boolean;
  created_at: string;
};

export function ActionButtons({
  blog,
  layout = 'icons',
}: {
  blog: BlogType;
  layout?: 'icons' | 'row';
}) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTogglePublish = async () => {
    const action = blog.published ? 'unpublish' : 'publish';

    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium text-sm">Are you sure you want to {action} this story?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-sm border border-line rounded-md hover:bg-surface transition"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setIsPublishing(true);
                try {
                  const res = await togglePublishBlog(blog.id, blog.published);
                  if (res.error) throw new Error(res.error);
                  toast.success(`Story ${action}ed successfully`);
                } catch (err) {
                  toast.error(
                    `Failed to ${action}: ${err instanceof Error ? err.message : String(err)}`,
                  );
                } finally {
                  setIsPublishing(false);
                }
              }}
              className="px-3 py-1.5 text-sm bg-brand text-brand-foreground rounded-md transition"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { duration: 5000 },
    );
  };

  const handleDelete = async () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
        <p className="font-medium text-sm text-red-400">
          Delete this build story permanently?
        </p>
          <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
          <div className="flex gap-2 justify-end mt-1">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-sm border border-line rounded-md hover:bg-surface transition"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                setIsDeleting(true);
                try {
                  const res = await deleteBlog(blog.id);
                  if (res.error) throw new Error(res.error);
                  toast.success('Story deleted successfully');
                } catch (err) {
                  toast.error(
                    `Failed to delete: ${err instanceof Error ? err.message : String(err)}`,
                  );
                } finally {
                  setIsDeleting(false);
                }
              }}
              className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-500 text-white rounded-md transition"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 6000 },
    );
  };

  const iconBtn =
    'p-2 text-muted-foreground rounded-md transition disabled:opacity-50 min-h-10 min-w-10 flex items-center justify-center';
  const rowBtn =
    'btn-ghost-brand flex-1 justify-center !py-2 text-xs disabled:opacity-50';

  return (
    <div
      className={clsx(
        'flex items-center',
        layout === 'row' ? 'gap-2 flex-1' : 'gap-1',
      )}
    >
      <button
        onClick={handleTogglePublish}
        disabled={isPublishing || isDeleting}
        className={clsx(
          layout === 'row' ? rowBtn : iconBtn,
          layout === 'icons' && 'hover:text-brand hover:bg-brand/10',
        )}
        title={blog.published ? 'Unpublish story' : 'Publish story'}
      >
        {blog.published ? <EyeOffIcon size={layout === 'row' ? 14 : 18} /> : <GlobeIcon size={layout === 'row' ? 14 : 18} />}
        {layout === 'row' && (blog.published ? 'Unpublish' : 'Publish')}
      </button>

      <button
        onClick={handleDelete}
        disabled={isPublishing || isDeleting}
        className={clsx(
          layout === 'row' ? rowBtn : iconBtn,
          layout === 'icons' && 'hover:text-red-400 hover:bg-red-400/10',
        )}
        title="Delete story"
      >
        <TrashIcon size={layout === 'row' ? 14 : 18} />
        {layout === 'row' && 'Delete'}
      </button>
    </div>
  );
}
