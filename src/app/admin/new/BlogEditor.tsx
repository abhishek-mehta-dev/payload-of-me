'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { saveBlog } from '../actions';

export default function BlogEditor() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      const result = await saveBlog(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100"
            placeholder="Blog Title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100"
            placeholder="blog-title-slug"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-400 mb-2">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          rows={2}
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100"
          placeholder="A short summary of the blog post..."
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-neutral-400">
            Content (Markdown)
          </label>
          <a
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline"
          >
            Markdown Guide
          </a>
        </div>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={15}
          className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100 font-mono text-sm"
          placeholder="# Hello World&#10;Write your content here..."
        />
      </div>

      <div className="flex items-center gap-3 bg-neutral-900/50 p-4 border border-neutral-800 rounded-lg">
        <input
          type="checkbox"
          id="published"
          name="published"
          checked={formData.published}
          onChange={handleCheckboxChange}
          className="w-5 h-5 rounded border-neutral-700 bg-neutral-900 text-blue-500 focus:ring-offset-neutral-950 focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />
        <label
          htmlFor="published"
          className="text-sm font-medium text-neutral-300 cursor-pointer select-none"
        >
          Publish immediately
        </label>
      </div>

      {error && <div className="text-red-400 text-sm p-3 bg-red-400/10 rounded-lg border border-red-400/20">{error}</div>}

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg font-medium text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex justify-center items-center px-6 py-2 bg-neutral-100 text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 transition disabled:opacity-50 min-w-[120px]"
        >
          {isPending ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
          {isPending ? 'Saving...' : 'Save Blog'}
        </button>
      </div>
    </form>
  );
}
