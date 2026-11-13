import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Page } from "../components/Motion";

/** A baseball standing in for the "0" in 404: bobs and slowly spins (still when reduced motion is on). */
function Ball() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="mx-1 h-[0.8em] w-[0.8em] sm:mx-2"
      animate={{ y: [0, -22, 0], rotate: [0, 360] }}
      transition={{
        y: { duration: 1.3, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 7, repeat: Infinity, ease: "linear" },
      }}
      aria-hidden
    >
      <circle cx="50" cy="50" r="46" fill="#fff" stroke="#d4d4d8" strokeWidth="3" />
      {/* the two seams, with stitches */}
      <path d="M28 12 C 44 32, 44 68, 28 88" fill="none" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M72 12 C 56 32, 56 68, 72 88" fill="none" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" />
      <path
        d="M28 12 C 44 32, 44 68, 28 88 M72 12 C 56 32, 56 68, 72 88"
        fill="none"
        stroke="#e11d48"
        strokeWidth="9"
        strokeDasharray="1.5 7"
        opacity="0.55"
      />
    </motion.svg>
  );
}

export default function NotFound() {
  return (
    <Page>
      <div className="container-page flex min-h-[62dvh] flex-col items-center justify-center py-16 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
          Error 404 · Foul ball
        </p>

        <div
          className="mt-4 flex items-center text-[6.5rem] font-extrabold leading-none tracking-tight sm:text-[9rem]"
          aria-label="404"
        >
          <span aria-hidden>4</span>
          <Ball />
          <span aria-hidden>4</span>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">That one went foul.</h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          The page you swung at isn’t here. It may have moved, or the link might be a little off. It’s not a
          strikeout, just a foul ball. Let’s get you back in play.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-ghost">Back to home</Link>
          <Link to="/projects" className="btn btn-ghost">See my projects</Link>
          <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
        </div>

        <p className="mt-12 font-hand text-2xl text-muted sm:text-3xl">Count: 0 balls, 2 strikes, 1 missing page.</p>
      </div>
    </Page>
  );
}
