export type StorySections = {
  challenge: string;
  debug: string;
  fix: string;
  code: string;
  lesson: string;
  tags: string;
};

export const EMPTY_STORY_SECTIONS: StorySections = {
  challenge: "",
  debug: "",
  fix: "",
  code: "",
  lesson: "",
  tags: "",
};

const SECTION_PATTERNS: { key: keyof StorySections; patterns: RegExp[] }[] = [
  {
    key: "challenge",
    patterns: [/^##\s*the challenge/im, /^##\s*challenge/im, /^#\s*the challenge/im],
  },
  {
    key: "debug",
    patterns: [
      /^##\s*what i tried/im,
      /^##\s*debug/im,
      /^##\s*what i tried \(debug\)/im,
    ],
  },
  {
    key: "fix",
    patterns: [/^##\s*the fix/im, /^##\s*fix/im],
  },
  {
    key: "lesson",
    patterns: [/^##\s*what i learned/im, /^##\s*lesson/im, /^##\s*lessons/im],
  },
];

function extractCodeBlock(text: string): { body: string; code: string } {
  const match = text.match(/```[\w]*\n([\s\S]*?)```/);
  if (!match) return { body: text.trim(), code: "" };
  return {
    body: text.replace(match[0], "").trim(),
    code: match[1].trim(),
  };
}

function extractTags(text: string): { body: string; tags: string } {
  const hrSplit = text.split(/\n---\n/);
  const body = hrSplit[0].trim();
  const footer = hrSplit.slice(1).join("\n---\n");
  const tagMatches = footer.match(/#[\w-]+/g);
  if (!tagMatches?.length) return { body, tags: "" };
  return {
    body,
    tags: tagMatches.map((t) => t.replace(/^#/, "")).join(", "),
  };
}

export function parseStoryMarkdown(content: string): StorySections {
  if (!content.trim()) return { ...EMPTY_STORY_SECTIONS };

  const lines = content.split("\n");
  const headings: { index: number; key: keyof StorySections | null }[] = [];

  lines.forEach((line, index) => {
    for (const section of SECTION_PATTERNS) {
      if (section.patterns.some((p) => p.test(line.trim()))) {
        headings.push({ index, key: section.key });
        return;
      }
    }
  });

  if (!headings.length) {
    return {
      ...EMPTY_STORY_SECTIONS,
      challenge: content.trim(),
    };
  }

  const sections: StorySections = { ...EMPTY_STORY_SECTIONS };

  headings.forEach((heading, i) => {
    if (!heading.key) return;
    const start = heading.index + 1;
    const end = headings[i + 1]?.index ?? lines.length;
    const chunk = lines
      .slice(start, end)
      .join("\n")
      .replace(/<!--[\s\S]*?-->/g, "")
      .trim();

    if (heading.key === "fix") {
      const { body, code } = extractCodeBlock(chunk);
      sections.fix = body;
      sections.code = code;
      return;
    }

    if (heading.key === "lesson") {
      const { body, tags } = extractTags(chunk);
      sections.lesson = body;
      if (tags) sections.tags = tags;
      return;
    }

    sections[heading.key] = chunk;
  });

  return sections;
}

export function compileStoryMarkdown(sections: StorySections): string {
  const parts: string[] = [];

  if (sections.challenge.trim()) {
    parts.push(`## The challenge\n\n${sections.challenge.trim()}`);
  }
  if (sections.debug.trim()) {
    parts.push(`## What I tried (debug)\n\n${sections.debug.trim()}`);
  }
  if (sections.fix.trim() || sections.code.trim()) {
    let fix = `## The fix\n\n${sections.fix.trim()}`;
    if (sections.code.trim()) {
      fix += `\n\n\`\`\`bash\n${sections.code.trim()}\n\`\`\``;
    }
    parts.push(fix);
  }
  if (sections.lesson.trim()) {
    parts.push(`## What I learned\n\n${sections.lesson.trim()}`);
  }

  const tags = sections.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (tags.length) {
    parts.push(`---\n\n*${tags.map((t) => `#${t.replace(/^#/, "")}`).join(" ")}*`);
  }

  return parts.join("\n\n").trim();
}

export function storyProgress(sections: StorySections): number {
  const filled = [
    sections.challenge,
    sections.debug,
    sections.fix,
    sections.lesson,
  ].filter((s) => s.trim().length > 20).length;
  return Math.round((filled / 4) * 100);
}
