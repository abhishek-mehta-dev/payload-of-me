import { BUILD_STORIES } from "@/content/build-stories";

export default function BuildStoryArc({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "flex flex-wrap gap-2"
          : "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
      }
    >
      {BUILD_STORIES.storyArc.map(({ step, label, hint }) => (
        <div
          key={step}
          className="rounded-lg border border-line bg-surface/50 px-3 py-2.5 sm:px-3.5 sm:py-3"
        >
          <p className="font-mono text-[10px] text-brand mb-0.5">{step}</p>
          <p className="font-display text-sm font-semibold text-foreground leading-tight">
            {label}
          </p>
          {!compact && (
            <p className="text-[10px] text-muted-foreground mt-0.5">{hint}</p>
          )}
        </div>
      ))}
    </div>
  );
}
