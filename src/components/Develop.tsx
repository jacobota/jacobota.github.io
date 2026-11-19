import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useInView, useReducedMotion, type Variants } from "framer-motion";

/* ----------------------------------------------------------------------------------------------
   "Developing" polaroids.

   A print's photo area starts black. When the print is scrolled to (or, for the hero, shortly after
   load) the frame gives a little shake and the photo develops out of the dark: it fades in while the
   blur clears and the color comes up, ending in a warm film tint.

   Which prints have been developed is remembered for the visit (a module-level set): switching between
   the site's pages keeps them shown. Reloading or closing the page starts them black again.
---------------------------------------------------------------------------------------------- */

/** Prints already developed during this visit. Lives in memory, so a reload or closing the tab resets it. */
const seen = new Set<string>();

// Both filters list the same functions in the same order so the browser can interpolate between them.
const BLACK_FILTER = "sepia(0.8) saturate(0.15) contrast(1.7) brightness(0.45) hue-rotate(0deg) blur(10px)";
// The finished look: a warm film tint. The vignette and warm cast come from the CSS layer in index.css.
const FILM_FILTER = "sepia(0.34) saturate(1.22) contrast(0.9) brightness(1.04) hue-rotate(-8deg) blur(0px)";

const DEVELOP_SECONDS = 2.8;
const SHAKE_LEAD = 0.3; // the photo starts to clear this long after the shake begins

const imageVariants: Variants = {
  black: { opacity: 0, filter: BLACK_FILTER },
  developed: {
    opacity: 1,
    filter: FILM_FILTER,
    transition: { duration: DEVELOP_SECONDS, ease: [0.4, 0, 0.2, 1], delay: SHAKE_LEAD },
  },
};

interface Options {
  /** Develop on load instead of when scrolled into view (used by the hero). */
  auto?: boolean;
  /** Seconds to wait after the trigger before shaking (lets a row of prints cascade). */
  delay?: number;
  /** Hold off until this is true (e.g. the hero waits for the terminal intro to finish). Default: true. */
  enabled?: boolean;
}

export function useDevelop<T extends HTMLElement>(
  id: string,
  { auto = false, delay = 0, enabled = true }: Options = {},
) {
  const reduce = useReducedMotion();
  const frameRef = useRef<T>(null);
  const shake = useAnimationControls();
  // Seen before this mount, or the visitor prefers reduced motion: show it developed with no animation.
  const [alreadySeen] = useState(() => seen.has(id) || !!reduce);
  const [developed, setDeveloped] = useState(alreadySeen);
  const [imageReady, setImageReady] = useState(false);
  const inView = useInView(frameRef, { once: true, amount: 0.4 });

  const triggered = enabled && (auto || inView);

  useEffect(() => {
    if (developed || !imageReady || !triggered || reduce) return;
    const timer = window.setTimeout(() => {
      seen.add(id);
      setDeveloped(true);
      // A quick wobble: a few degrees of rotation and a little sideways jiggle, settling back to rest.
      // (Relative to the frame's own resting position, so the print's tilt is unaffected.)
      shake.start({
        rotate: [0, -3, 3, -2.2, 2.2, -1, 0],
        x: [0, -4, 4, -3, 3, -1, 0],
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    }, delay * 1000);
    return () => window.clearTimeout(timer);
  }, [developed, imageReady, triggered, reduce, id, delay, shake]);

  const onImageReady = useCallback(() => setImageReady(true), []);

  return { frameRef, shake, developed, alreadySeen, onImageReady };
}

/** The photo itself: black until `developed`, then it develops. Wrap it in your own frame. */
export function DevelopingPhoto({
  src,
  alt = "",
  pos,
  className = "",
  developed,
  alreadySeen,
  onReady,
  eager = false,
}: {
  src: string;
  alt?: string;
  pos: string;
  className?: string;
  developed: boolean;
  alreadySeen: boolean;
  onReady: () => void;
  eager?: boolean;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached images can finish loading before React attaches onLoad.
  useEffect(() => {
    if (imgRef.current?.complete) onReady();
  }, [onReady]);

  return (
    <span className="polaroid-photo">
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        draggable={false}
        onLoad={onReady}
        variants={imageVariants}
        initial={alreadySeen ? false : "black"}
        animate={developed ? "developed" : "black"}
        style={{ objectPosition: pos }}
        className={`polaroid-img w-full object-cover ${className}`}
      />
    </span>
  );
}
