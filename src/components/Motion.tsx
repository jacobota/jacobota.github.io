import {
  createContext,
  type CSSProperties,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/** Page-level enter/exit transition. */
export function Page({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ----------------------------------------------------------------------------------------------
   Scroll reveal: entrance AND exit, tracked per block.

   Each block is in one of three states, driven by an IntersectionObserver:
     "below"   - not reached yet (faded out, nudged down)
     "visible" - on screen (opacity 1, in place)
     "above"   - scrolled past the top (fades out, drifts up slightly)

   Blocks that come into view in the same moment (e.g. a heading and the first paragraph when a section
   arrives) cascade one after another: top to bottom when scrolling down, and bottom to top when scrolling
   back up. Blocks that arrive later, on their own, simply animate when they get there.
   Only opacity and transform are animated, so there is no layout shift.
---------------------------------------------------------------------------------------------- */

type RevealState = "below" | "visible" | "above";

const EASE = [0.22, 1, 0.36, 1] as const; // soft ease-out

// Tuning knobs --------------------------------------------------------------------------------
const SLIDE = 32; // px each block travels up as it appears
const DURATION = 0.9; // seconds for the entrance
const BASE_DELAY = 0.12; // pause before a block (or the first of a cascade) starts moving
const STEP = 0.16; // gap between blocks in a cascade
// Top edge = bottom of the sticky header; bottom edge sits ~16% up from the screen bottom so a block
// starts animating once it is clearly on screen, not while it is still a sliver at the edge.
const ROOT_MARGIN = "-72px 0px -16% 0px";
// ---------------------------------------------------------------------------------------------

/** Per-element variants. `custom` is the delay in seconds before the entrance starts. */
export const itemVariants: Variants = {
  below: { opacity: 0, y: SLIDE, transition: { duration: 0.3, ease: "easeIn" } },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE, delay } }),
  above: { opacity: 0, y: -16, transition: { duration: 0.3, ease: "easeIn" } },
};

type Tag = "div" | "section" | "ul" | "ol" | "li";
type Apply = (state: RevealState, delay: number) => void;
interface Item {
  apply: Apply;
  state: RevealState;
}
interface Group {
  register: (el: Element, apply: Apply) => () => void;
}

const GroupContext = createContext<Group | null>(null);

// Which way the page last scrolled. Near the very top we always read top to bottom (that is also what a
// freshly opened page does after jumping to the top), so "up" only counts further down the page.
let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
let lastDirection: 1 | -1 = 1;
if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y !== lastScrollY) {
        lastDirection = y > lastScrollY ? 1 : -1;
        lastScrollY = y;
      }
    },
    { passive: true },
  );
}
const isScrollingUp = () => lastDirection < 0 && window.scrollY > 40;

/** One shared observer per group; works out the cascade order for items that arrive together. */
function useGroup(step: number, delay: number): Group {
  const items = useRef(new Map<Element, Item>());
  const observer = useRef<IntersectionObserver | null>(null);
  const config = useRef({ step, delay });
  config.current = { step, delay };

  const group = useMemo<Group>(
    () => ({
      register(el, apply) {
        if (!observer.current) {
          observer.current = new IntersectionObserver(
            (entries) => {
              const { step: s, delay: d } = config.current;
              const rows = entries
                .map((e) => ({ e, item: items.current.get(e.target) }))
                .filter((r): r is { e: IntersectionObserverEntry; item: Item } => !!r.item);
              // Scrolling down: top block first. Scrolling back up: bottom block first (inverted).
              const scrollingUp = isScrollingUp();
              const entering = rows
                .filter((r) => r.e.isIntersecting)
                .sort((a, b) =>
                  scrollingUp
                    ? b.e.boundingClientRect.top - a.e.boundingClientRect.top
                    : a.e.boundingClientRect.top - b.e.boundingClientRect.top,
                );
              entering.forEach((r, i) => {
                r.item.state = "visible";
                r.item.apply("visible", d + i * s);
              });

              for (const r of rows.filter((r) => !r.e.isIntersecting)) {
                const next: RevealState = r.e.boundingClientRect.top < 0 ? "above" : "below";
                r.item.state = next;
                r.item.apply(next, 0);
              }
            },
            { rootMargin: ROOT_MARGIN },
          );
        }
        items.current.set(el, { apply, state: "below" });
        observer.current.observe(el);
        return () => {
          observer.current?.unobserve(el);
          items.current.delete(el);
        };
      },
    }),
    [],
  );

  useEffect(
    () => () => {
      observer.current?.disconnect();
      observer.current = null;
    },
    [],
  );

  return group;
}

/**
 * A group of blocks that reveal in a cascade as they scroll into view. Wrap the blocks in StaggerItem;
 * they don't need to be direct children.
 */
export function Stagger({
  children,
  className,
  as = "div",
  step = STEP,
  delay = BASE_DELAY,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  step?: number;
  delay?: number;
}) {
  const group = useGroup(step, delay);
  const Wrapper = as;
  return (
    <GroupContext.Provider value={group}>
      <Wrapper className={className}>{children}</Wrapper>
    </GroupContext.Provider>
  );
}

/** One block in a Stagger: fades and slides up when it enters, eases out when it leaves. Use `as="li"` in lists. */
export function StaggerItem({
  children,
  className,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  style?: CSSProperties;
}) {
  const group = useContext(GroupContext);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [view, setView] = useState<{ state: RevealState; delay: number }>({ state: "below", delay: 0 });
  const animated = !!group && !reduce; // no group or reduced motion: just show it

  useEffect(() => {
    const el = ref.current;
    if (!el || !group || reduce) return;
    return group.register(el, (state, delay) => setView({ state, delay }));
  }, [group, reduce]);

  const Item = motion[as] as typeof motion.div;
  return (
    <Item
      ref={ref as RefObject<HTMLDivElement>}
      className={className}
      style={style}
      variants={itemVariants}
      custom={view.delay}
      initial={animated ? "below" : false}
      animate={animated ? view.state : "visible"}
    >
      {children}
    </Item>
  );
}

/** A single block revealed on its own (not part of a cascade). */
export function Reveal({
  children,
  delay = BASE_DELAY,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Stagger delay={delay} className={className}>
      <StaggerItem>{children}</StaggerItem>
    </Stagger>
  );
}

// The accent bar under a section heading draws itself left to right when the heading is revealed. It
// follows the reveal state of the StaggerItem it sits in (variant propagation); outside one, it just shows.
const barVariants: Variants = {
  below: { scaleX: 0 },
  above: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE, delay: 0.45 } },
};

export function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>}
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <motion.span
        aria-hidden
        variants={barVariants}
        style={{ originX: 0 }}
        className="mt-3 block h-1 w-14 rounded-full bg-accent"
      />
    </div>
  );
}
