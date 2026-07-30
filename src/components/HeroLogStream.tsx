"use client";

import { useEffect, useRef, useState } from "react";

type LogTone = "cmd" | "dim" | "ok" | "info" | "warn" | "accent";

type LogLine = {
  text: string;
  tone?: LogTone;
  delay?: number;
};

const SESSION: LogLine[] = [
  { text: "$ ssh abhishek@prod-01", tone: "cmd", delay: 120 },
  { text: "Authenticating with public key \"id_ed25519\"", tone: "dim", delay: 280 },
  { text: "Welcome to Ubuntu 22.04.5 LTS (GNU/Linux 5.15.0-x86_64)", tone: "info", delay: 320 },
  { text: "Last login: Thu Jul 30 10:14:02 2026 from 103.xx.xx.41", tone: "dim", delay: 300 },
  { text: "", tone: "dim", delay: 500 },
  { text: "$ pm2 status", tone: "cmd", delay: 120 },
  { text: "┌────┬──────────────┬─────────┬─────────┬──────────┐", tone: "dim", delay: 220 },
  { text: "│ id │ name         │ mode    │ status  │ cpu / mem│", tone: "dim", delay: 220 },
  { text: "├────┼──────────────┼─────────┼─────────┼──────────┤", tone: "dim", delay: 220 },
  { text: "│ 0  │ api          │ cluster │ online  │ 2% · 98mb│", tone: "ok", delay: 260 },
  { text: "│ 1  │ worker       │ fork    │ online  │ 1% · 64mb│", tone: "ok", delay: 260 },
  { text: "│ 2  │ portfolio    │ cluster │ online  │ 1% · 72mb│", tone: "accent", delay: 280 },
  { text: "└────┴──────────────┴─────────┴─────────┴──────────┘", tone: "dim", delay: 300 },
  { text: "", tone: "dim", delay: 550 },
  { text: "$ pm2 logs api --lines 6 --nostream", tone: "cmd", delay: 120 },
  { text: "0|api  | GET /health 200 4ms", tone: "ok", delay: 300 },
  { text: "0|api  | POST /auth/login 200 38ms", tone: "info", delay: 300 },
  { text: "0|api  | GET /projects 200 12ms", tone: "ok", delay: 300 },
  { text: "0|api  | redis cache hit  projects:list", tone: "dim", delay: 280 },
  { text: "0|api  | GET /blogs 200 9ms", tone: "ok", delay: 300 },
  { text: "", tone: "dim", delay: 550 },
  { text: "$ sudo nginx -t && sudo systemctl reload nginx", tone: "cmd", delay: 120 },
  { text: "nginx: the configuration file /etc/nginx/nginx.conf syntax is ok", tone: "ok", delay: 340 },
  { text: "nginx: configuration file /etc/nginx/nginx.conf test is successful", tone: "ok", delay: 340 },
  { text: "Reloaded nginx.service — OK", tone: "accent", delay: 360 },
  { text: "", tone: "dim", delay: 550 },
  { text: "$ sudo tail -n 8 /var/log/nginx/access.log", tone: "cmd", delay: 120 },
  { text: "10.0.1.14 - - \"GET / HTTP/2.0\" 200 1842", tone: "dim", delay: 280 },
  { text: "10.0.1.14 - - \"GET /api/health HTTP/2.0\" 200 42", tone: "ok", delay: 280 },
  { text: "10.0.2.33 - - \"GET /blogs HTTP/2.0\" 200 9201", tone: "info", delay: 280 },
  { text: "10.0.2.33 - - \"POST /api/contact HTTP/2.0\" 201 68", tone: "accent", delay: 300 },
  { text: "10.0.4.8  - - \"GET /favicon.ico HTTP/2.0\" 304 0", tone: "dim", delay: 280 },
  { text: "", tone: "dim", delay: 550 },
  { text: "$ sudo journalctl -u nginx -u pm2-abhishek -n 5 --no-pager", tone: "cmd", delay: 120 },
  { text: "nginx[1124]: worker process started", tone: "ok", delay: 320 },
  { text: "nginx[1124]: SSL handshake success — TLS1.3", tone: "info", delay: 320 },
  { text: "pm2: app=api restarted (0 downtime)", tone: "accent", delay: 320 },
  { text: "pm2: app=portfolio online (cluster x2)", tone: "ok", delay: 320 },
  { text: "systemd: nginx.service: reload completed", tone: "ok", delay: 340 },
  { text: "", tone: "dim", delay: 550 },
  { text: "$ uptime && df -h / && free -h | head -2", tone: "cmd", delay: 120 },
  { text: " 14:22:01 up 128 days,  3:41,  1 user,  load 0.18, 0.22, 0.19", tone: "dim", delay: 320 },
  { text: "Filesystem  Size  Used  Avail  Use%  Mounted on", tone: "dim", delay: 280 },
  { text: "/dev/vda1    80G   24G    53G   32%  /", tone: "ok", delay: 300 },
  { text: "Mem:  7.8Gi  2.1Gi  4.9Gi  buff/cache 1.8Gi", tone: "info", delay: 320 },
  { text: "", tone: "dim", delay: 550 },
  { text: "$ sudo ufw status numbered", tone: "cmd", delay: 120 },
  { text: "Status: active", tone: "ok", delay: 300 },
  { text: "[ 1] 22/tcp    ALLOW IN    Anywhere   (OpenSSH)", tone: "dim", delay: 300 },
  { text: "[ 2] 80/tcp    ALLOW IN    Anywhere   (Nginx HTTP)", tone: "info", delay: 300 },
  { text: "[ 3] 443/tcp   ALLOW IN    Anywhere   (Nginx HTTPS)", tone: "accent", delay: 320 },
  { text: "● prod-01 healthy — ssh · pm2 · nginx all green", tone: "ok", delay: 2200 },
];

const toneClass: Record<LogTone, string> = {
  cmd: "text-foreground",
  dim: "text-muted-foreground/70",
  ok: "text-emerald-500/90 dark:text-emerald-400/90",
  info: "text-sky-600/90 dark:text-sky-300/85",
  warn: "text-amber-600/90 dark:text-amber-300/85",
  accent: "text-brand",
};

const MAX_VISIBLE = 22;

type HeroLogStreamProps = {
  className?: string;
};

export default function HeroLogStream({ className = "" }: HeroLogStreamProps) {
  const [lines, setLines] = useState<{ id: number; text: string; tone: LogTone }[]>([]);
  const idRef = useRef(0);
  const indexRef = useRef(0);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLines(
        SESSION.filter((l) => l.text).slice(-MAX_VISIBLE).map((l) => ({
          id: idRef.current++,
          text: l.text,
          tone: l.tone ?? "dim",
        })),
      );
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const pushLine = (entry: LogLine) => {
      setLines((prev) => {
        const next = [
          ...prev,
          {
            id: idRef.current++,
            text: entry.text.length ? entry.text : "\u00A0",
            tone: entry.tone ?? "dim",
          },
        ];
        return next.slice(-MAX_VISIBLE);
      });
    };

    const tick = () => {
      if (cancelled) return;

      if (indexRef.current >= SESSION.length) {
        timer = setTimeout(() => {
          if (cancelled) return;
          setLines([]);
          indexRef.current = 0;
          timer = setTimeout(tick, 900);
        }, 2800);
        return;
      }

      const entry = SESSION[indexRef.current];
      indexRef.current += 1;
      pushLine(entry);

      const base = entry.delay ?? 260 + Math.random() * 80;
      // Extra beat after a command so the prompt is readable
      const wait = entry.tone === "cmd" ? base + 480 : base;
      timer = setTimeout(tick, wait);
    };

    timer = setTimeout(tick, 700);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <div
      className={`relative h-full w-full flex items-center justify-center p-4 sm:p-5 lg:p-6 ${className}`}
    >
      <div
        className="relative w-full max-w-xl h-full min-h-[480px] max-h-[640px] flex flex-col overflow-hidden rounded-md border border-line bg-background/80 backdrop-blur-sm shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]"
        aria-hidden
      >
        <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 border-b border-line bg-surface/90 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex gap-1.5 shrink-0">
              <span className="term-dot bg-red-500/80" />
              <span className="term-dot bg-yellow-500/80" />
              <span className="term-dot bg-brand" />
            </div>
            <span className="font-mono text-[11px] sm:text-xs text-muted-foreground truncate">
              ssh prod-01 — pm2 · nginx · journalctl
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-brand/80 shrink-0">
            live
          </span>
        </div>

        <div
          ref={scrollerRef}
          className="relative flex-1 overflow-hidden px-4 py-3.5 font-mono text-[12px] sm:text-[13px] leading-relaxed"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 z-[1] bg-gradient-to-b from-background/85 to-transparent" />

          <div className="space-y-1 pt-2">
            {lines.map((line, i) => (
              <div
                key={line.id}
                className={`${toneClass[line.tone]} ${
                  i === lines.length - 1 ? "log-line-in" : ""
                } whitespace-pre-wrap break-all`}
              >
                {line.text}
              </div>
            ))}
            <div className="h-4">
              <span className="caret-blink inline-block w-2 h-3.5 bg-brand align-middle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
