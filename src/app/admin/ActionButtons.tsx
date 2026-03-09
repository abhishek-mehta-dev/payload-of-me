'use client';

import { toast } from 'react-hot-toast';
import { deleteBlog, togglePublishBlog } from './actions';
import { TrashIcon, GlobeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

export function ActionButtons({ blog }: { blog: any }) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTogglePublish = async () => {
    const action = blog.published ? 'unpublish' : 'publish';
    
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">Are you sure you want to {action} this post?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-md transition"
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
                toast.success(`Post ${action}ed successfully`);
              } catch (err: any) {
                toast.error(`Failed to ${action}: ${err.message}`);
              } finally {
                setIsPublishing(false);
              }
            }}
            className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 rounded-md transition"
          >
            Confirm
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  const handleDelete = async () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-red-400">Warning: Are you sure you want to delete this post?</p>
        <p className="text-sm text-neutral-400">This action cannot be undone.</p>
        <div className="flex gap-2 justify-end mt-1">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-md transition"
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
                toast.success('Post deleted successfully');
              } catch (err: any) {
                toast.error(`Failed to delete: ${err.message}`);
              } finally {
                setIsDeleting(false);
              }
            }}
            className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-500 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </div>
    ), { duration: 6000 });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleTogglePublish}
        disabled={isPublishing || isDeleting}
        className="p-2 text-neutral-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition disabled:opacity-50"
        title={blog.published ? "Unpublish post" : "Publish post"}
      >
        {blog.published ? <EyeOffIcon size={18} /> : <GlobeIcon size={18} />}
      </button>

      <button
        onClick={handleDelete}
        disabled={isPublishing || isDeleting}
        className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition disabled:opacity-50"
        title="Delete post"
      >
        <TrashIcon size={18} />
      </button>
    </div>
  );
}
