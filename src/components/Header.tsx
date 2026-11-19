import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, type Variants } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/resume", label: "Resume" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

// Mobile menu: the links slide in one after another once the panel has opened.
const menuList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};
const menuItem: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const barSpring = { type: "spring", stiffness: 420, damping: 30 } as const;

// The nav pill's glide between links (and back to the current page). A softer spring than before, so the
// movement takes a little longer and eases in and out more gently.
const pillSpring = { type: "spring", stiffness: 150, damping: 22 } as const;
// When the cursor leaves the nav and the pill drifts back to the current page, it takes its time: a much
// softer, slower spring than the glide between links.
const pillReturn = { type: "spring", stiffness: 55, damping: 15 } as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  // Which link the cursor (or keyboard focus) is on. The highlight pill glides to it, and returns to the
  // current page when nothing is hovered.
  const [hovered, setHovered] = useState<string | null>(null);

  // Smart header: hides while you scroll down to read, returns when you scroll up, and picks up a frosted
  // look, a soft shadow and a slightly smaller height once you're away from the top.
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const anchor = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    if (y < 80) {
      setHidden(false);
      anchor.current = y;
      return;
    }
    const dy = y - anchor.current;
    if (Math.abs(dy) > 6) {
      setHidden(dy > 0); // down hides, up shows; tiny moves are ignored so it doesn't flicker
      anchor.current = y;
    }
  });

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Never hide while the mobile menu is open, or for visitors who prefer reduced motion.
  const shouldHide = open || reduce ? false : hidden;

  return (
    <motion.header
      animate={{ y: shouldHide ? "-100%" : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onFocusCapture={() => setHidden(false)} // keyboard users always see where focus is
      className={`sticky top-0 z-50 border-b border-line transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-bg/90 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.55)] backdrop-blur-md" : "bg-bg/80 backdrop-blur"
      }`}
    >
      <div
        className={`container-page flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Link to="/" className="text-lg font-bold tracking-tight">
          Jacob Ota
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              onMouseEnter={() => setHovered(l.to)}
              onFocus={() => setHovered(l.to)}
              onBlur={() => setHovered(null)}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  (hovered ? hovered === l.to : isActive) ? "text-fg" : "text-muted"
                }`
              }
            >
              {({ isActive }) => {
                // One shared pill: it sits under the hovered link, or under the current page when nothing is hovered.
                const lit = hovered ? hovered === l.to : isActive;
                return (
                  <>
                    {l.label}
                    {lit && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-surface ring-1 ring-line"
                        transition={hovered ? pillSpring : pillReturn}
                      />
                    )}
                  </>
                );
              }}
            </NavLink>
          ))}
          <span onMouseEnter={() => setHovered(null)}>
            <ThemeToggle />
          </span>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface"
          >
            {/* three bars that morph into an X */}
            <span aria-hidden className="relative block h-[14px] w-[22px]">
              <motion.span
                className="absolute left-0 top-[6px] block h-0.5 w-full rounded-full bg-current"
                animate={open ? { y: 0, rotate: 45 } : { y: -6, rotate: 0 }}
                transition={barSpring}
              />
              <motion.span
                className="absolute left-0 top-[6px] block h-0.5 w-full rounded-full bg-current"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 top-[6px] block h-0.5 w-full rounded-full bg-current"
                animate={open ? { y: 0, rotate: -45 } : { y: 6, rotate: 0 }}
                transition={barSpring}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-bg md:hidden"
          >
            <motion.ul className="container-page py-2" variants={menuList} initial="hidden" animate="show">
              {links.map((l) => (
                <motion.li key={l.to} variants={menuItem}>
                  <NavLink
                    to={l.to}
                    end
                    className={({ isActive }) =>
                      `flex min-h-[48px] items-center border-b border-line/60 text-base font-medium last:border-0 ${
                        isActive ? "text-accent" : "text-fg"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
