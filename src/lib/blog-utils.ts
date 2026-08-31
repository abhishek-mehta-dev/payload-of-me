/** Infer topic tags from title/slug for blog cards */
export function inferBlogTags(title: string, slug: string): string[] {
  const text = `${title} ${slug}`.toLowerCase();
  const rules: { pattern: RegExp; tag: string }[] = [
    { pattern: /websocket|socket\.io/, tag: "WebSockets" },
    { pattern: /tls|ssl|https|security/, tag: "Security" },
    { pattern: /nginx|devops|deploy|production|ci\/cd/, tag: "DevOps" },
    { pattern: /react|next|frontend|ui/, tag: "Frontend" },
    { pattern: /node|backend|api|nestjs|express/, tag: "Backend" },
    { pattern: /database|mongo|postgres|sql/, tag: "Database" },
    { pattern: /git|github|revert|merge/, tag: "Git" },
    { pattern: /ai|ml|llm|openai/, tag: "AI" },
  ];

  const tags = rules.filter((r) => r.pattern.test(text)).map((r) => r.tag);
  return tags.length > 0 ? tags.slice(0, 3) : ["Engineering"];
}

export function blogReadingMinutes(text: string): number {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

export function blogReadingLabel(text: string): string {
  return `${blogReadingMinutes(text)} min read`;
}

/** Pull hashtag tags from markdown footer lines */
export function extractHashtags(content: string): string[] {
  const tags: string[] = [];
  const lines = content.split("\n").slice(-8);
  for (const line of lines) {
    const matches = line.match(/#[\w-]+/g);
    if (matches) tags.push(...matches.map((t) => t.replace(/^#/, "")));
  }
  return [...new Set(tags)].slice(0, 8);
}

/** First compelling sentence from excerpt for card hook */
export function excerptHook(excerpt: string): string {
  const sentence = excerpt.split(/(?<=[.!?])\s+/)[0]?.trim();
  return sentence || excerpt;
}

/** Accent palette cycling for cards */
export const CARD_ACCENTS = [
  "from-brand/20 via-brand/5 to-transparent",
  "from-cyan-500/15 via-transparent to-blue-500/10",
  "from-violet-500/15 via-transparent to-brand/10",
] as const;

export function cardAccent(index: number): string {
  return CARD_ACCENTS[index % CARD_ACCENTS.length];
}
