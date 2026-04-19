'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, Edit3, Link2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { saveBlog } from '../actions';

// Converts a pasted LinkedIn post into clean Markdown
function linkedInToMarkdown(text: string): string {
  const lines = text.split('\n');
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip empty lines — we'll handle spacing ourselves
    if (!line) {
      result.push('');
      i++;
      continue;
    }

    // Detect Phase headings like "Phase 1 —" or "Phase 1 -"
    if (/^Phase\s+\d+\s*[—–-]/i.test(line)) {
      result.push(`## ${line}`);
      i++;
      continue;
    }

    // Detect section headings that end with a colon or are ALL CAPS short lines
    if (/^(The Core Realization|Real Engineering Takeaways|Key realization:|Key takeaway:)/i.test(line)) {
      result.push(`## ${line}`);
      i++;
      continue;
    }

    // Detect checkmark bullet lines (✔ or ✅ or - or •)
    if (/^[✔✅•]\s/.test(line)) {
      result.push(`- ${line.replace(/^[✔✅•]\s*/, '')}`);
      i++;
      continue;
    }

    // Detect hashtag lines (LinkedIn tags) — convert to italic footer
    if (/^#\w/.test(line)) {
      const tags = line.match(/#\w+/g) || [];
      result.push(`\n---\n\n*${tags.join(' ')}*`);
      i++;
      continue;
    }

    // Detect inline code-like lines (git commands)
    if (/^git\s+\w+/.test(line) || /^`/.test(line)) {
      result.push(`\`\`\`bash\n${line}\n\`\`\``);
      i++;
      // Absorb consecutive git command lines into one block
      while (i < lines.length && /^git\s+\w+/.test(lines[i].trim())) {
        result[result.length - 1] = result[result.length - 1].replace(
          /\n```$/,
          `\n${lines[i].trim()}\n\`\`\``
        );
        i++;
      }
      continue;
    }

    // First line of the post is usually the title (long, no punctuation at end)
    if (result.length === 0 && line.length > 40) {
      result.push(`# ${line}`);
      i++;
      continue;
    }

    // Default: plain paragraph line
    result.push(line);
    i++;
  }

  // Clean up excessive blank lines
  return result.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export default function BlogEditor() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const [showLinkedInHelper, setShowLinkedInHelper] = useState(false);
  const [linkedInRaw, setLinkedInRaw] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [importMode, setImportMode] = useState<'url' | 'paste'>('url');
  const [isFetching, setIsFetching] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false,
  });

  const generateSlug = (title: string) =>
    title.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({ ...prev, title, slug: generateSlug(title) }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, published: e.target.checked }));
  };

  const handleImportLinkedIn = () => {
    if (!linkedInRaw.trim()) return;
    const markdown = linkedInToMarkdown(linkedInRaw);
    setFormData((prev) => ({ ...prev, content: markdown }));
    setShowLinkedInHelper(false);
    setLinkedInRaw('');
    setTab('write');
  };

  const handleImportFromUrl = async () => {
    if (!linkedInUrl.trim()) return;
    setIsFetching(true);
    setImportError(null);
    try {
      const res = await fetch('/api/linkedin-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: linkedInUrl }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setImportError(data.error || 'Failed to import');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        content: data.markdown,
        title: data.title || prev.title,
        slug: data.slug || prev.slug,
        excerpt: data.excerpt || prev.excerpt,
      }));
      setShowLinkedInHelper(false);
      setLinkedInUrl('');
      setTab('preview');
    } catch {
      setImportError('Network error. Please try again.');
    } finally {
      setIsFetching(false);
    }
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
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Title + Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
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
          <label className="block text-sm font-medium text-neutral-400 mb-2">Slug</label>
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

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium text-neutral-400 mb-2">Excerpt</label>
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

      {/* Content editor with tabs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setTab('write')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                tab === 'write'
                  ? 'bg-neutral-700 text-neutral-100'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Edit3 size={14} /> Write
            </button>
            <button
              type="button"
              onClick={() => setTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                tab === 'preview'
                  ? 'bg-neutral-700 text-neutral-100'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Eye size={14} /> Preview
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowLinkedInHelper((v) => !v)}
              className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-400/50 px-3 py-1.5 rounded-lg transition"
            >
              <Link2 size={13} /> Import from LinkedIn
            </button>
            <a
              href="https://www.markdownguide.org/cheat-sheet/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-neutral-300 transition"
            >
              Markdown Guide ↗
            </a>
          </div>
        </div>

        {/* LinkedIn import helper */}
        {showLinkedInHelper && (
          <div className="mb-3 p-4 bg-blue-950/30 border border-blue-500/20 rounded-lg flex flex-col gap-3">
            {/* Mode toggle */}
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-1 w-fit">
              <button
                type="button"
                onClick={() => { setImportMode('url'); setImportError(null); }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${importMode === 'url' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-neutral-200'}`}
              >
                From URL
              </button>
              <button
                type="button"
                onClick={() => { setImportMode('paste'); setImportError(null); }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${importMode === 'paste' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-neutral-200'}`}
              >
                Paste Text
              </button>
            </div>

            {importMode === 'url' ? (
              <>
                <p className="text-xs text-blue-300">
                  Paste a LinkedIn Pulse article URL — title, slug, excerpt and content will be auto-filled.
                </p>
                <input
                  type="url"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                  placeholder="https://www.linkedin.com/pulse/..."
                />
              </>
            ) : (
              <>
                <p className="text-xs text-blue-300">
                  Paste your LinkedIn post text — it will be auto-converted to Markdown.
                </p>
                <textarea
                  value={linkedInRaw}
                  onChange={(e) => setLinkedInRaw(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-700"
                  placeholder="Paste your LinkedIn post here..."
                />
              </>
            )}

            {importError && (
              <p className="text-xs text-red-400">{importError}</p>
            )}

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => { setShowLinkedInHelper(false); setLinkedInRaw(''); setLinkedInUrl(''); setImportError(null); }}
                className="px-4 py-1.5 text-sm text-neutral-400 hover:text-neutral-200 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={importMode === 'url' ? handleImportFromUrl : handleImportLinkedIn}
                disabled={isFetching}
                className="flex items-center gap-2 px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg transition"
              >
                {isFetching && <Loader2 size={13} className="animate-spin" />}
                {isFetching ? 'Fetching...' : 'Convert & Import'}
              </button>
            </div>
          </div>
        )}

        {tab === 'write' ? (
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={20}
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100 font-mono text-sm leading-relaxed"
            placeholder={`# Your Blog Title\n\nWrite your content here using Markdown...\n\n## Section Heading\n\nParagraph text.\n\n- Bullet point\n- Another point\n\n\`\`\`bash\ngit revert HEAD\n\`\`\``}
          />
        ) : (
          <div className="min-h-[480px] px-6 py-5 bg-neutral-900 border border-neutral-800 rounded-lg overflow-auto">
            {formData.content ? (
              <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-neutral-100 prose-code:text-blue-300 prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-neutral-700 prose-hr:border-neutral-700">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {formData.content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-neutral-600 text-sm italic">Nothing to preview yet. Start writing in the Write tab.</p>
            )}
          </div>
        )}
      </div>

      {/* Publish toggle */}
      <div className="flex items-center gap-3 bg-neutral-900/50 p-4 border border-neutral-800 rounded-lg">
        <input
          type="checkbox"
          id="published"
          name="published"
          checked={formData.published}
          onChange={handleCheckboxChange}
          className="w-5 h-5 rounded border-neutral-700 bg-neutral-900 text-blue-500 focus:ring-offset-neutral-950 focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />
        <label htmlFor="published" className="text-sm font-medium text-neutral-300 cursor-pointer select-none">
          Publish immediately
        </label>
      </div>

      {error && (
        <div className="text-red-400 text-sm p-3 bg-red-400/10 rounded-lg border border-red-400/20">{error}</div>
      )}

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
