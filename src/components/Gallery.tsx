import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Photo {
  src: string;
  alt: string;
  /** CSS object-position, so the print crop keeps faces in frame. */
  pos: string;
  /** Resting tilt of the print, in degrees. */
  tilt: number;
  /** Tailwind aspect class for the print: portrait photos get 4/5, landscape 4/3. */
  ratio: string;
  /** Handwritten message under the photo. "♥" is drawn in red. */
  caption: string;
}

/** Renders a caption, coloring any heart red. */
function Caption({ text }: { text: string }) {
  return (
    <>
      {text.split("♥").map((part, i, arr) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && <span className="text-rose-500">♥</span>}
        </span>
      ))}
    </>
  );
}

const plain = (caption: string) => caption.replace(/♥/g, "heart");

const P = "aspect-[4/5]";
const L = "aspect-[4/3]";

// photos[0] is the featured print shown alone, larger, above the rest. The next four are row 1, the last four row 2.
const photos: Photo[] = [
  { src: "/images/proposal.webp", alt: "Jacob proposing on one knee at a mountain overlook", pos: "50% 62%", tilt: -1.5, ratio: P, caption: "A day to remember 8/2/2026" },
  // Row 1
  { src: "/images/dog_kiss.webp", alt: "Kissing a small dog held between them in front of a turquoise lake", pos: "50% 40%", tilt: 2.5, ratio: P, caption: "Our little Millie" },
  { src: "/images/family.webp", alt: "Posing with family in formal wear at sunset", pos: "50% 35%", tilt: -2.5, ratio: P, caption: "Family ♥" },
  { src: "/images/table_group.webp", alt: "Seven friends in formal wear posing around a dinner table", pos: "50% 35%", tilt: 1.5, ratio: P, caption: "Getting the gang back together" },
  { src: "/images/me_and_jax.webp", alt: "Two baseball players embracing in the outfield", pos: "58% 50%", tilt: -3, ratio: P, caption: "Loggers for Life" },
  // Row 2
  { src: "/images/nationals_game.webp", alt: "Posing together in the stands at a baseball game at night", pos: "50% 58%", tilt: -3, ratio: P, caption: "Baseball stadium touring" },
  { src: "/images/street_trio.webp", alt: "Three friends posing together on a city sidewalk", pos: "50% 45%", tilt: 2, ratio: P, caption: "Meetup with Troy Melton" },
  { src: "/images/golf_selfie.webp", alt: "Four friends in a selfie on a golf course by the water", pos: "45% 45%", tilt: -1.5, ratio: L, caption: "Golf with Friends" },
  { src: "/images/hike_group.webp", alt: "Seven friends in a group selfie on a mountain hike", pos: "50% 50%", tilt: 3, ratio: L, caption: "Hike with Marmots" },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const lastTile = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastTile.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), []);

  return (
    <>
      {/* Polaroid-style prints: white border, slight tilt, straighten and lift on hover/focus. */}
      <div className="px-1 py-4">
        {/* Featured print: alone on its own row and larger than the rest. */}
        <div className="mb-10 flex justify-center md:mb-12">
          <Print
            photo={photos[0]}
            index={0}
            featured
            onOpen={(el) => {
              lastTile.current = el;
              setOpen(0);
            }}
            className="w-full max-w-[15rem] sm:max-w-[18rem] md:max-w-[21rem]"
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-x-4 gap-y-7 sm:gap-x-6 md:grid-cols-4 md:gap-y-10">
          {photos.slice(1).map((p, j) => (
            <Print
              key={p.src}
              photo={p}
              index={j + 1}
              onOpen={(el) => {
                lastTile.current = el;
                setOpen(j + 1);
              }}
              className={j % 2 === 1 ? "mt-3 md:mt-8" : ""}
            />
          ))}
        </div>
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onStep={step} />}
    </>
  );
}

function Print({
  photo: p,
  index,
  featured = false,
  onOpen,
  className = "",
}: {
  photo: Photo;
  index: number;
  featured?: boolean;
  onOpen: (el: HTMLButtonElement) => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      aria-label={`Open photo: ${plain(p.caption)}. ${p.alt}`}
      onClick={(e) => onOpen(e.currentTarget)}
      initial={{ opacity: 0, y: 28, rotate: p.tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: p.tilt }}
      whileHover={{ rotate: 0, scale: featured ? 1.03 : 1.05, zIndex: 10 }}
      whileFocus={{ rotate: 0, scale: featured ? 1.03 : 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: featured ? 0 : ((index - 1) % 4) * 0.07 }}
      className={`relative bg-white p-2 shadow-lg shadow-black/25 sm:p-2.5 ${featured ? "md:p-3" : ""} ${className}`}
    >
      <span className="polaroid-photo">
        <img
          src={p.src}
          alt=""
          loading={featured ? "eager" : "lazy"}
          draggable={false}
          style={{ objectPosition: p.pos }}
          className={`polaroid-img ${p.ratio} w-full object-cover`}
        />
      </span>
      {/* Handwritten message on the print's bottom strip. */}
      <span
        className={`flex items-center justify-center text-balance px-1 text-center font-hand font-semibold leading-tight text-zinc-800 ${
          featured
            ? "min-h-[3.5rem] pb-2 pt-3 text-2xl sm:text-3xl md:min-h-[4.5rem] md:text-4xl"
            : "min-h-[2.75rem] pb-1 pt-2 text-lg sm:min-h-[3.25rem] sm:text-xl md:text-2xl"
        }`}
      >
        <Caption text={p.caption} />
      </span>
    </motion.button>
  );
}

function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[index];

  // Fade out ourselves, then unmount. (An AnimatePresence exit animation here could fail to finish,
  // leaving an invisible full-screen overlay and a locked page.)
  const [closing, setClosing] = useState(false);
  const closingRef = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    timer.current = window.setTimeout(onClose, 180);
  }, [onClose]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [requestClose, onStep]);

  const navBtn =
    "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 sm:flex";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: closing ? 0 : 1 }}
      transition={{ duration: 0.18 }}
      onClick={requestClose}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close photo viewer"
        onClick={requestClose}
        className="absolute right-3 top-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          onStep(-1);
        }}
        className={`${navBtn} left-3`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          onStep(1);
        }}
        className={`${navBtn} right-3`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Drag/swipe left or right to change photos on touch devices. */}
      <motion.img
        key={photo.src}
        src={photo.src}
        alt={photo.alt}
        draggable={false}
        onClick={(e) => e.stopPropagation()}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) onStep(1);
          else if (info.offset.x > 60) onStep(-1);
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="max-h-[76dvh] max-w-full touch-pan-y select-none rounded-xl object-contain"
      />

      <p
        className="pointer-events-none absolute bottom-11 left-0 right-0 px-4 text-center font-hand text-2xl font-semibold text-white sm:text-3xl"
        aria-live="polite"
      >
        <Caption text={photo.caption} />
      </p>
      <p className="absolute bottom-3 left-0 right-0 text-center text-sm text-white/70">
        {index + 1} / {photos.length}
      </p>
    </motion.div>
  );
}
