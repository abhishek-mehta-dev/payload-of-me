'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, Edit3 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { updateBlog } from '../../actions';

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
};

export default function EditBlogEditor({ blog }: { blog: Blog }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [formData, setFormData] = useState({
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    published: blog.published,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, published: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    try {
      const result = await updateBlog(blog.id, formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">Slug</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-400 mb-2">Excerpt</label>
        <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required rows={2}
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
            <button type="button" onClick={() => setTab('write')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition ${tab === 'write' ? 'bg-neutral-700 text-neutral-100' : 'text-neutral-500 hover:text-neutral-300'}`}>
              <Edit3 size={14} /> Write
            </button>
            <button type="button" onClick={() => setTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition ${tab === 'preview' ? 'bg-neutral-700 text-neutral-100' : 'text-neutral-500 hover:text-neutral-300'}`}>
              <Eye size={14} /> Preview
            </button>
          </div>
        </div>

        {tab === 'write' ? (
          <textarea name="content" value={formData.content} onChange={handleChange} required rows={20}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100 font-mono text-sm leading-relaxed" />
        ) : (
          <div className="min-h-[480px] px-6 py-5 bg-neutral-900 border border-neutral-800 rounded-lg overflow-auto">
            <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-bold prose-p:text-neutral-300 prose-code:text-blue-300 prose-code:bg-neutral-800 prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-neutral-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{formData.content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 bg-neutral-900/50 p-4 border border-neutral-800 rounded-lg">
        <input type="checkbox" id="published" name="published" checked={formData.published} onChange={handleCheckboxChange}
          className="w-5 h-5 rounded border-neutral-700 bg-neutral-900 text-blue-500 cursor-pointer" />
        <label htmlFor="published" className="text-sm font-medium text-neutral-300 cursor-pointer select-none">
          Published
        </label>
      </div>

      {error && <div className="text-red-400 text-sm p-3 bg-red-400/10 rounded-lg border border-red-400/20">{error}</div>}

      <div className="flex justify-end gap-4 mt-4">
        <button type="button" onClick={() => router.back()}
          className="px-6 py-2 rounded-lg font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition">
          Cancel
        </button>
        <button type="submit" disabled={isPending}
          className="flex justify-center items-center px-6 py-2 bg-neutral-100 text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 transition disabled:opacity-50 min-w-[120px]">
          {isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
          {isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
