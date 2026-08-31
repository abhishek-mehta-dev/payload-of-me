"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, ChevronDown, ChevronUp, Code2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import clsx from "clsx";
import { adminInputClass, adminPanelClass, adminTextareaClass } from "./admin-ui";
import { BUILD_STORIES } from "@/content/build-stories";
import { STORY_STEPS } from "./story-sections";
import {
  compileStoryMarkdown,
  parseStoryMarkdown,
  storyProgress,
  type StorySections,
  EMPTY_STORY_SECTIONS,
} from "@/lib/story-form";

export type StoryFormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
};

type StoryFormProps = {
  initial: StoryFormData;
  onSubmit: (data: StoryFormData) => Promise<{ error?: string } | void>;
  submitLabel: string;
};

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function StoryForm({ initial, onSubmit, submitLabel }: StoryFormProps) {
  const router = useRouter();
  const { admin } = BUILD_STORIES;

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [openStep, setOpenStep] = useState<string>("challenge");

  const [meta, setMeta] = useState({
    title: initial.title,
    slug: initial.slug,
    excerpt: initial.excerpt,
    published: initial.published,
  });

  const [sections, setSections] = useState<StorySections>(() =>
    parseStoryMarkdown(initial.content),
  );

  const [rawMarkdown, setRawMarkdown] = useState(initial.content);

  const compiled = useMemo(() => compileStoryMarkdown(sections), [sections]);
  const progress = useMemo(() => storyProgress(sections), [sections]);

  const updateSection = (key: keyof StorySections, value: string) => {
    setSections((prev) => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (title: string) => {
    setMeta((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const content = showAdvanced && rawMarkdown.trim() ? rawMarkdown : compiled;

    if (!content.trim()) {
      setError("Please fill in at least the challenge section before saving.");
      setIsPending(false);
      return;
    }

    try {
      const result = await onSubmit({
        ...meta,
        content,
      });
      if (result?.error) setError(result.error);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 min-w-0">
      {/* Progress */}
      <div className={`p-4 sm:p-5 ${adminPanelClass}`}>
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-sm font-medium">Story progress</p>
          <span className="font-mono text-xs text-brand">{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-surface overflow-hidden mb-4">
          <div
            className="h-full bg-brand transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STORY_STEPS.map((step) => {
            const filled = sections[step.key].trim().length > 10;
            return (
              <button
                key={step.key}
                type="button"
                onClick={() => setOpenStep(step.key)}
                className={clsx(
                  "rounded-lg border px-3 py-2 text-left transition-colors",
                  openStep === step.key
                    ? "border-brand/50 bg-brand/10"
                    : "border-line bg-surface/40 hover:border-brand/30",
                )}
              >
                <p className="font-mono text-[10px] text-brand">{step.step}</p>
                <p className="text-xs font-medium mt-0.5 truncate">{step.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {filled ? "Done" : "Empty"}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Basics */}
      <div className={`p-4 sm:p-5 space-y-4 ${adminPanelClass}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          basics
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Story title</label>
            <input
              type="text"
              value={meta.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className={adminInputClass}
              placeholder="My WebSocket worked locally… then production broke"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">URL slug</label>
            <input
              type="text"
              value={meta.slug}
              onChange={(e) => setMeta((p) => ({ ...p, slug: e.target.value }))}
              required
              className={adminInputClass}
              placeholder="my-websocket-production-bug"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Short hook</label>
          <p className="text-xs text-muted-foreground mb-2">
            One or two sentences shown on story cards — make someone want to click.
          </p>
          <textarea
            value={meta.excerpt}
            onChange={(e) => setMeta((p) => ({ ...p, excerpt: e.target.value }))}
            required
            rows={2}
            className={adminTextareaClass}
            placeholder={admin.fields.hookPlaceholder}
          />
        </div>
      </div>

      {/* Story steps — one open at a time for focus */}
      <div className="space-y-3">
        {STORY_STEPS.map((step) => {
          const isOpen = openStep === step.key;
          const filled = sections[step.key].trim().length > 10;

          return (
            <div key={step.key} className={adminPanelClass}>
              <button
                type="button"
                onClick={() => setOpenStep(isOpen ? "" : step.key)}
                className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[10px] text-brand mb-1">{step.step}</p>
                  <p className="font-display font-semibold">{step.title}</p>
                  {!isOpen && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {filled ? sections[step.key].slice(0, 80) : step.description}
                    </p>
                  )}
                </div>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-line pt-4 space-y-3">
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <textarea
                    value={sections[step.key]}
                    onChange={(e) => updateSection(step.key, e.target.value)}
                    rows={step.rows}
                    className={`${adminTextareaClass} text-sm leading-relaxed`}
                    placeholder={step.placeholder}
                  />
                  {step.key === "fix" && (
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Code2 className="h-4 w-4 text-brand" />
                        Code or config snippet (optional)
                      </label>
                      <textarea
                        value={sections.code}
                        onChange={(e) => updateSection("code", e.target.value)}
                        rows={4}
                        className={`${adminTextareaClass} font-mono text-xs`}
                        placeholder={"location /socket.io/ {\n  proxy_pass http://backend;\n  proxy_http_version 1.1;\n}"}
                      />
                    </div>
                  )}
                  {step.key === "lesson" && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={sections.tags}
                        onChange={(e) => updateSection("tags", e.target.value)}
                        className={adminInputClass}
                        placeholder="ProductionBug, WebSockets, DevOps"
                      />
                    </div>
                  )}
                  <div className="flex justify-end gap-2 pt-1">
                    {STORY_STEPS.findIndex((s) => s.key === step.key) > 0 && (
                      <button
                        type="button"
                        className="btn-ghost-brand !py-2 text-xs"
                        onClick={() => {
                          const idx = STORY_STEPS.findIndex((s) => s.key === step.key);
                          if (idx > 0) setOpenStep(STORY_STEPS[idx - 1].key);
                        }}
                      >
                        Previous
                      </button>
                    )}
                    {STORY_STEPS.findIndex((s) => s.key === step.key) <
                      STORY_STEPS.length - 1 && (
                      <button
                        type="button"
                        className="btn-brand !py-2 text-xs"
                        onClick={() => {
                          const idx = STORY_STEPS.findIndex((s) => s.key === step.key);
                          if (idx < STORY_STEPS.length - 1)
                            setOpenStep(STORY_STEPS[idx + 1].key);
                        }}
                      >
                        Next step
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Preview toggle */}
      <div className={adminPanelClass}>
        <button
          type="button"
          onClick={() => setShowPreview((v) => !v)}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-sm font-medium"
        >
          <span className="inline-flex items-center gap-2">
            <Eye className="h-4 w-4 text-brand" />
            Preview how it will look
          </span>
          {showPreview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showPreview && (
          <div className="px-4 sm:px-5 pb-5 border-t border-line pt-4">
            <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-display prose-h2:text-lg prose-p:text-muted-foreground prose-p:text-sm prose-li:text-muted-foreground prose-code:text-brand prose-pre:bg-surface prose-pre:border prose-pre:border-line">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {compiled || "*Start filling in the sections above to see a preview.*"}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Advanced markdown (collapsed) */}
      <div className={adminPanelClass}>
        <button
          type="button"
          onClick={() => {
            setShowAdvanced((v) => {
              if (!v) setRawMarkdown(compiled);
              return !v;
            });
          }}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-sm text-muted-foreground hover:text-foreground"
        >
          Advanced: edit raw markdown
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showAdvanced && (
          <div className="px-4 sm:px-5 pb-5 border-t border-line pt-4">
            <textarea
              value={rawMarkdown}
              onChange={(e) => setRawMarkdown(e.target.value)}
              rows={12}
              className={`${adminTextareaClass} font-mono text-xs`}
            />
          </div>
        )}
      </div>

      {/* Publish */}
      <label
        className={`flex items-start gap-3 p-4 sm:p-5 cursor-pointer ${adminPanelClass}`}
      >
        <input
          type="checkbox"
          checked={meta.published}
          onChange={(e) => setMeta((p) => ({ ...p, published: e.target.checked }))}
          className="mt-0.5 w-5 h-5 rounded border-line bg-background text-brand cursor-pointer shrink-0"
        />
        <span>
          <span className="block text-sm font-medium">{admin.publishNow}</span>
          <span className="block text-xs text-muted-foreground mt-1">
            Story will appear on your portfolio homepage and /blogs page.
          </span>
        </span>
      </label>

      {error && (
        <div className="text-red-400 text-sm p-3 bg-red-400/10 rounded-lg border border-red-400/20">
          {error}
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pb-[max(0px,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-ghost-brand justify-center !py-2.5 w-full sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="btn-brand justify-center !py-2.5 w-full sm:w-auto sm:min-w-[160px] disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              {admin.saving}
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}

export function emptyStoryForm(): StoryFormData {
  return {
    title: "",
    slug: "",
    excerpt: "",
    content: compileStoryMarkdown(EMPTY_STORY_SECTIONS),
    published: false,
  };
}
