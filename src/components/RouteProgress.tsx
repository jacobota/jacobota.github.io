import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

/**
 * A thin accent line that sweeps across the top of the screen whenever you change pages, like the loading
 * bars on modern apps. It doesn't play on the first load, and is skipped for reduced motion.
 */
export default function RouteProgress() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const first = useRef(true);
  const [runKey, setRunKey] = useState<string | null>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setRunKey(pathname); // a new key mounts a fresh bar, which plays once
  }, [pathname]);

  if (reduce || runKey === null) return null;

  return (
    <motion.div
      key={runKey}
      aria-hidden
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: [0, 0.65, 1], opacity: [1, 1, 0] }}
      transition={{ duration: 0.95, times: [0, 0.55, 1], ease: "easeOut" }}
      style={{ originX: 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[80] h-[3px] w-full bg-accent shadow-[0_0_10px_rgb(var(--accent)/0.8)]"
    />
  );
}
