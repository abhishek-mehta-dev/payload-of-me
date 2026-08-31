import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { extractHashtags } from "@/lib/blog-utils";

function TerminalPre({ children }: { children?: ReactNode }) {
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-line bg-surface/80 shadow-[0_12px_40px_-24px_color-mix(in_oklch,var(--brand)_35%,transparent)]">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-card/80">
        <span className="term-dot bg-red-500/80" />
        <span className="term-dot bg-yellow-500/80" />
        <span className="term-dot bg-brand" />
        <span className="ml-2 font-mono text-[10px] text-muted-foreground">snippet</span>
      </div>
      <pre className="overflow-x-auto px-4 sm:px-5 py-4 text-sm leading-relaxed font-mono text-foreground/90">
        {children}
      </pre>
    </div>
  );
}

const markdownComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-14 mb-5 leading-tight">
      {children}
    </h2>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="flex items-start gap-3 font-display text-xl sm:text-2xl font-bold text-foreground mt-14 mb-5 scroll-mt-28">
      <span className="mt-1.5 w-1 h-7 rounded-full bg-brand shrink-0" />
      <span>{children}</span>
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mt-10 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-base sm:text-[1.05rem] text-muted-foreground leading-[1.9] mb-5">
      {children}
    </p>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="italic text-foreground/80">{children}</em>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-8 px-5 py-4 rounded-lg border border-brand/25 bg-brand/5 text-foreground/90 leading-relaxed">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand mb-2">
        $ insight
      </p>
      <div className="text-sm sm:text-base">{children}</div>
    </blockquote>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-6 space-y-2.5 pl-0 list-none">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-6 space-y-2.5 pl-5 list-decimal marker:text-brand marker:font-mono">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="flex items-start gap-3 text-muted-foreground text-base leading-relaxed">
      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
      <span>{children}</span>
    </li>
  ),
  hr: () => (
    <div className="my-12 flex items-center gap-3" aria-hidden>
      <div className="flex-1 h-px bg-line" />
      <span className="font-mono text-[10px] text-muted-foreground">---</span>
      <div className="flex-1 h-px bg-line" />
    </div>
  ),
  a: ({
    children,
    href,
  }: {
    children?: ReactNode;
    href?: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand hover:underline underline-offset-4 decoration-brand/40 font-medium"
    >
      {children}
    </a>
  ),
  code: ({
    inline,
    children,
    className,
  }: {
    inline?: boolean;
    children?: ReactNode;
    className?: string;
  }) =>
    inline ? (
      <code className="px-1.5 py-0.5 rounded-md bg-surface border border-line text-brand font-mono text-[0.88em]">
        {children}
      </code>
    ) : (
      <code className={`font-mono text-sm ${className ?? ""}`}>{children}</code>
    ),
  pre: ({ children }: { children?: ReactNode }) => <TerminalPre>{children}</TerminalPre>,
};

export default function BlogArticleBody({ content }: { content: string }) {
  const hashtags = extractHashtags(content);

  return (
    <div className="blog-article-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>

      {hashtags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-line">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Tags from this build story
          </p>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full border border-line bg-surface/60 font-mono text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
