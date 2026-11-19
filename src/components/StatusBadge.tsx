const tone = {
  live: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  progress: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  done: "bg-zinc-500/10 text-muted",
} as const;

const dot = {
  live: "bg-emerald-500",
  progress: "bg-amber-500",
  done: "bg-zinc-400",
} as const;

export type StatusTone = keyof typeof tone;

/**
 * A project's status pill. Anything that is live right now ("Live", "Live, rebuilding") gets a softly
 * pulsing dot in the pill's color, like the "Current role" badge; the pulse is off for reduced motion.
 */
export default function StatusBadge({ tone: t, status }: { tone: StatusTone; status: string }) {
  const pulsing = status.startsWith("Live");
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone[t]}`}>
      {pulsing && (
        <span className="relative flex h-2 w-2" aria-hidden>
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none ${dot[t]}`}
          />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${dot[t]}`} />
        </span>
      )}
      {status}
    </span>
  );
}
