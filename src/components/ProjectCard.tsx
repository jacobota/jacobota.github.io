import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "../data/projects";

const tone = {
  live: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  progress: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  done: "bg-zinc-500/10 text-muted",
} as const;

export default function ProjectCard({ project: p }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className="rounded-2xl border border-line bg-surface transition-shadow hover:shadow-lg hover:shadow-black/5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full flex-col gap-3 rounded-2xl p-5 text-left sm:p-6"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone[p.statusTone]}`}>{p.status}</span>
          <span className="text-xs text-muted">
            {p.kind}
            {p.date ? ` · ${p.date}` : ""}
          </span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold leading-snug sm:text-xl">{p.title}</h3>
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="mt-1 shrink-0 text-muted"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </div>
        <p className="text-sm leading-relaxed text-muted sm:text-base">{p.summary}</p>
        <ul className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t} className="tag">{t}</li>
          ))}
        </ul>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              {p.image && (
                <img
                  src={p.image}
                  alt={p.imageKind === "logo" ? `${p.title} logo` : `${p.title} screenshot`}
                  loading="lazy"
                  className={
                    p.imageKind === "logo"
                      ? "mx-auto mb-4 block h-28 w-28 rounded-2xl border border-line"
                      : "mb-4 w-full rounded-xl border border-line"
                  }
                />
              )}
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
                {p.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {p.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {p.links.map((l, i) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`btn ${i === 0 ? "btn-primary" : "btn-ghost"}`}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
