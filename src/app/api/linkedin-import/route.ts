import { NextRequest, NextResponse } from 'next/server';

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
}

// Noise lines injected by LinkedIn UI — strip these out
const NOISE_PATTERNS = [
  /^report this article$/i,
  /^recommended by linkedin$/i,
  /^follow$/i,
  /^\d+\s*(followers?|connections?)$/i,
  /^published\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d/i,
  /^like\s*\d*$/i,
  /^comment\s*\d*$/i,
  /^share$/i,
  /^\d+\s*(likes?|comments?|shares?)$/i,
  /^view\s+\d+\s+comment/i,
  /^sign in$/i,
  /^join now$/i,
];

function isNoiseLine(line: string): boolean {
  return NOISE_PATTERNS.some((p) => p.test(line.trim()));
}

function linkedInToMarkdown(raw: string): string {
  // Split into lines, trim each, remove empty duplicates
  const rawLines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l, i, arr) => {
      if (!l) return i > 0 && arr[i - 1] !== ''; // collapse multiple blanks
      return true;
    });

  const result: string[] = [];
  let titleSet = false;
  let i = 0;

  // Collect consecutive git/npm/shell command lines into one code block
  const collectCodeBlock = (firstLine: string): string => {
    const codeLines = [firstLine];
    while (i < rawLines.length) {
      const next = rawLines[i];
      if (isCodeLine(next)) {
        codeLines.push(next);
        i++;
      } else {
        break;
      }
    }
    return '```bash\n' + codeLines.join('\n') + '\n```';
  };

  const isCodeLine = (line: string) =>
    /^git\s+\w+/.test(line) ||
    /^npm\s+\w+/.test(line) ||
    /^yarn\s+\w+/.test(line) ||
    /^docker\s+\w+/.test(line);

  while (i < rawLines.length) {
    const line = rawLines[i];
    i++;

    // Skip noise
    if (isNoiseLine(line)) continue;
    if (!line) { result.push(''); continue; }

    // Phase headings
    if (/^Phase\s+\d+\s*[—–-]/i.test(line)) {
      result.push(`\n## ${line}`);
      continue;
    }

    // Known section headings
    if (/^(The Core Realization|Real Engineering Takeaways|Key realization|Key takeaway|The Takeaway|Conclusion)/i.test(line)) {
      result.push(`\n## ${line}`);
      continue;
    }

    // Checkmark takeaway lines — split on ✔ and emit as list items
    if (/✔/.test(line)) {
      const items = line.split('✔').map((s) => s.trim()).filter(Boolean);
      items.forEach((item) => result.push(`- ${item}`));
      continue;
    }

    // Other bullet symbols
    if (/^[✅•▸]\s/.test(line)) {
      result.push(`- ${line.replace(/^[✅•▸]\s*/, '').trim()}`);
      continue;
    }

    // Hashtag footer
    if (/^#\w/.test(line)) {
      const tags = line.match(/#\w+/g) || [];
      result.push(`\n---\n\n*${tags.join(' ')}*`);
      continue;
    }

    // Code lines
    if (isCodeLine(line)) {
      result.push(collectCodeBlock(line));
      continue;
    }

    // Inline terminal output like "nothing to commit, working tree clean" or "Already up to date"
    if (/^(nothing to commit|already up to date|fatal:|error:)/i.test(line)) {
      result.push(`\`${line}\``);
      continue;
    }

    // First substantial line = H1 title
    if (!titleSet && line.length > 30 && !/^\d/.test(line)) {
      result.push(`# ${line}`);
      titleSet = true;
      continue;
    }

    // Short impactful lines (< 80 chars, no period) after content started — treat as emphasis
    if (titleSet && line.length < 80 && !line.endsWith('.') && !line.endsWith(',') && result.length > 5) {
      // Only bold if it reads like a key insight (contains "doesn't", "is a", "stops", "never", etc.)
      if (/\b(never|always|don't|doesn't|is a|stops|critical|important|key|insight)\b/i.test(line)) {
        result.push(`> ${line}`);
        continue;
      }
    }

    result.push(line);
  }

  return result.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || !url.includes('linkedin.com')) {
      return NextResponse.json({ error: 'Invalid LinkedIn URL' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch: ${response.status}` }, { status: 502 });
    }

    const html = await response.text();

    // Extract <title>
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const rawTitle = titleMatch
      ? titleMatch[1].replace(/\s*\|\s*LinkedIn.*$/i, '').trim()
      : '';

    // Extract article body
    let bodyHtml = '';
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (articleMatch) {
      bodyHtml = articleMatch[1];
    } else {
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      bodyHtml = bodyMatch ? bodyMatch[1] : html;
    }

    const rawText = stripHtml(bodyHtml);
    const markdown = linkedInToMarkdown(rawText);

    const slug = rawTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // First real paragraph (not a heading, not a bullet) as excerpt
    const excerptLine = markdown
      .split('\n')
      .find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('-') && !l.startsWith('>') && !l.startsWith('`') && l.length > 40);
    const excerpt = excerptLine?.slice(0, 220) || '';

    return NextResponse.json({ markdown, title: rawTitle, slug, excerpt });
  } catch (err) {
    console.error('LinkedIn import error:', err);
    return NextResponse.json({ error: 'Failed to process the URL' }, { status: 500 });
  }
}
