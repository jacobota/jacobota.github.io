import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

// The View Transitions API isn't in every browser's typings/engine yet, so describe just what we use.
type ViewTransitionDoc = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  // Follow the OS preference until the user picks a theme manually.
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        /* ignore */
      }
      apply(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function apply(t: Theme) {
    document.documentElement.dataset.theme = t;
    setTheme(t);
  }

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }

    const doc = document as ViewTransitionDoc;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) {
      apply(next);
      return;
    }

    // Sunrise / sunset: switching to light, the light theme rises from the bottom of the screen to the top;
    // switching to dark, the dark theme settles down from the top to the bottom. The browser snapshots the
    // old and new page and we wipe the new one in over the old (the default cross-fade is off in index.css).
    const transition = doc.startViewTransition(() => {
      flushSync(() => apply(next)); // update the DOM synchronously so it lands inside the snapshot
    });
    transition.ready.then(() => {
      const rise = next === "light";
      document.documentElement.animate(
        {
          clipPath: rise
            ? ["inset(100% 0 0 0)", "inset(0 0 0 0)"] // revealed from the bottom edge upward
            : ["inset(0 0 100% 0)", "inset(0 0 0 0)"], // revealed from the top edge downward
        },
        { duration: 900, easing: "cubic-bezier(0.45, 0, 0.25, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:bg-surface hover:text-fg"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  );
}
