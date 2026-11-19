import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ----------------------------------------------------------------------------------------------
   The hero headline, as a little terminal session:

     /jacobota.github.io $ claude          (typed, with a cursor)
     What would you like to work on today? (printed, no cursor)
     > Give me an intro                    (typed)
     Alright, here you go                  (printed)
     Hi, I'm Jacob Ota.                    (typed; the cursor blinks, then disappears)

   The screen "clears" between steps. It plays once per visit (a module-level flag, so switching between
   the site's pages doesn't replay it; a reload does). With reduced motion on, or once it has played, the
   final headline is shown right away. A skip button jumps to the end.
---------------------------------------------------------------------------------------------- */

const FINAL_TEXT = "Hi, I’m Jacob Ota.";

/**
 * True once the intro has started during this visit. It is set as soon as it begins (not when it ends), so
 * leaving the page partway through and coming back doesn't restart it. Lives in memory: a reload or a new
 * session resets it.
 */
let played = false;

/** Whether the intro has already run this visit (the rest of the hero uses this to skip its entrance too). */
export const introHasPlayed = () => played;

type Step =
  | { kind: "type"; prompt?: "shell" | "claude"; text: string; speed: number; lead: number; hold: number; final?: boolean }
  | { kind: "print"; text: string; hold: number };

const STEPS: Step[] = [
  { kind: "type", prompt: "shell", text: "claude", speed: 95, lead: 700, hold: 550 },
  { kind: "print", text: "What would you like to work on today?", hold: 1300 },
  { kind: "type", prompt: "claude", text: "Give me an intro", speed: 62, lead: 500, hold: 500 },
  { kind: "print", text: "Alright, here you go", hold: 1000 },
  { kind: "type", text: FINAL_TEXT, speed: 78, lead: 350, hold: 0, final: true },
];

interface View {
  step: number;
  chars: number;
  blank: boolean; // the "clear" between steps
  cursor: "solid" | "blink" | "none";
}

const FINAL_VIEW: View = { step: STEPS.length - 1, chars: FINAL_TEXT.length, blank: false, cursor: "none" };

export default function TerminalIntro({ onDone }: { onDone?: () => void }) {
  const reduce = useReducedMotion();
  // Decided once, when the component first appears. (It must not be re-read on later renders: the flag
  // flips to true as soon as the intro starts, which would make a running intro cancel itself.)
  const [instant] = useState(() => !!reduce || played);
  const [view, setView] = useState<View>(instant ? FINAL_VIEW : { step: 0, chars: 0, blank: true, cursor: "none" });
  const [done, setDone] = useState(instant);
  const stop = useRef<(() => void) | null>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const finish = useCallback(() => {
    played = true;
    setView(FINAL_VIEW);
    setDone(true);
    onDoneRef.current?.();
  }, []);

  useEffect(() => {
    if (instant) {
      onDoneRef.current?.();
      return;
    }
    played = true; // from here on, coming back to this page shows the finished headline
    let cancelled = false;
    const timers = new Set<number>();
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });
    stop.current = () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };

    (async () => {
      await sleep(500);
      for (let i = 0; i < STEPS.length; i++) {
        const s = STEPS[i];
        if (cancelled) return;
        if (s.kind === "type") {
          setView({ step: i, chars: 0, blank: false, cursor: "blink" });
          await sleep(s.lead);
          for (let c = 1; c <= s.text.length; c++) {
            if (cancelled) return;
            setView({ step: i, chars: c, blank: false, cursor: "solid" });
            await sleep(s.speed + Math.random() * 35);
          }
          if (cancelled) return;
          setView({ step: i, chars: s.text.length, blank: false, cursor: "blink" });
          await sleep(s.final ? 1500 : s.hold);
          if (s.final) break; // the last line stays; its cursor disappears below
        } else {
          setView({ step: i, chars: s.text.length, blank: false, cursor: "none" });
          await sleep(s.hold);
        }
        if (cancelled) return;
        setView({ step: i, chars: 0, blank: true, cursor: "none" }); // "clear"
        await sleep(260);
      }
      if (cancelled) return;
      finish();
    })();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [instant, finish]);

  const skip = useCallback(() => {
    stop.current?.();
    finish();
  }, [finish]);

  // Escape also skips while it is playing.
  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, skip]);

  const step = STEPS[view.step];
  const isFinal = step.kind === "type" && !!step.final;

  return (
    <div className="relative">
      {/* The heading always reads as the final line to assistive tech; the typing is visual only. */}
      <h1
        aria-label={FINAL_TEXT}
        className="flex h-[3rem] items-center whitespace-nowrap font-terminal font-medium sm:h-[3.5rem] lg:h-[4rem]"
      >
        {/* Sizes are tuned so the longest line of each kind fits its column on one line (this font is ~0.6em
            wide per character): the final headline is 18 characters, "What would you like..." is 37. */}
        <span
          aria-hidden
          className={
            isFinal
              ? "text-[1.7rem] font-semibold leading-none sm:text-4xl md:text-3xl lg:text-[2.75rem]"
              : "text-[0.8rem] leading-none sm:text-base md:text-[0.9rem] lg:text-lg"
          }
        >
          {!view.blank && (
            <>
              {step.kind === "type" && step.prompt === "shell" && (
                <>
                  <span className="text-sky-600 dark:text-sky-400">/jacobota.github.io</span>
                  <span className="text-muted"> $ </span>
                </>
              )}
              {step.kind === "type" && step.prompt === "claude" && <span className="text-accent">&gt; </span>}
              <span className={step.kind === "print" ? "text-muted" : "text-fg"}>{step.text.slice(0, view.chars)}</span>
              {view.cursor !== "none" && (
                <span className={`term-cursor text-fg ${view.cursor === "blink" ? "term-cursor-blink" : ""}`} />
              )}
            </>
          )}
        </span>
      </h1>

      {!done && (
        <button
          type="button"
          onClick={skip}
          aria-label="Skip the intro animation"
          className="absolute left-0 top-full mt-3 font-terminal text-xs leading-none text-muted transition-colors hover:text-fg sm:text-sm"
        >
          skip ↵
        </button>
      )}
    </div>
  );
}
