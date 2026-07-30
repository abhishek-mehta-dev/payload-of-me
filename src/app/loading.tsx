export default function Loading() {
  const lines = [
    { prefix: "info", text: "booting portfolio runtime…" },
    { prefix: "ok", text: "theme tokens resolved" },
    { prefix: "ok", text: "lenis / gsap ready" },
    { prefix: "info", text: "hydrating sections…" },
    { prefix: "wait", text: "fetching route payload" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden blueprint-grid noise-overlay flex items-center justify-center bg-background">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[28rem] w-[50rem] rounded-full blur-3xl opacity-15"
        style={{ background: "var(--brand)" }}
      />

      <div className="relative z-10 w-full max-w-lg px-4">
        <p className="section-label mb-4 text-center sm:text-left">
          00 / loading
        </p>

        <div className="panel overflow-hidden shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]">
          {/* Title bar */}
          <div className="flex items-center gap-3 border-b border-line bg-surface/80 px-3.5 py-2.5">
            <div className="flex gap-1.5">
              <span className="term-dot bg-red-500/80" />
              <span className="term-dot bg-yellow-500/80" />
              <span className="term-dot bg-brand" />
            </div>
            <p className="font-mono text-xs text-muted-foreground truncate">
              abhishek@portfolio:~$ boot
            </p>
          </div>

          {/* Boot log */}
          <div className="space-y-2.5 bg-background/40 px-4 py-5 font-mono text-xs sm:text-sm">
            {lines.map((line, i) => (
              <div
                key={line.text}
                className="loader-line flex gap-2 text-muted-foreground"
                style={{ animationDelay: `${0.15 + i * 0.22}s` }}
              >
                <span
                  className={
                    line.prefix === "ok"
                      ? "text-brand shrink-0"
                      : line.prefix === "wait"
                        ? "text-amber-500 shrink-0"
                        : "text-muted-foreground/70 shrink-0"
                  }
                >
                  [{line.prefix}]
                </span>
                <span className="text-foreground/90">{line.text}</span>
              </div>
            ))}

            <div
              className="loader-line flex items-center gap-2 pt-1"
              style={{ animationDelay: "1.25s" }}
            >
              <span className="text-brand">$</span>
              <span className="text-foreground">open --route</span>
              <span className="caret-blink inline-block h-3.5 w-1.5 bg-brand align-middle" />
            </div>
          </div>

          {/* Progress */}
          <div className="border-t border-line bg-surface/50 px-4 py-3">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>compiling</span>
              <span className="text-brand">please wait</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-line/80">
              <div className="loader-bar h-full rounded-full bg-brand" />
            </div>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[10px] tracking-wider text-muted-foreground/70">
          {"// abhishek.mehta — portfolio runtime"}
        </p>
      </div>
    </div>
  );
}
