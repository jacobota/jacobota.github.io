import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import ResumePrint from "./pages/ResumePrint";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

const titles: Record<string, string> = {
  "/": "Jacob Ota | Software Engineer",
  "/resume": "Resume | Jacob Ota",
  "/projects": "Projects | Jacob Ota",
  "/contact": "Contact | Jacob Ota",
};

// Instant, so the site's CSS `scroll-behavior: smooth` can't turn this into an animation that
// gets interrupted when the new (shorter or taller) page mounts.
const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

export default function App() {
  const location = useLocation();
  const isPrint = location.pathname === "/resume/print";

  // Stop the browser from restoring an old scroll position on its own; we control it.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (!isPrint) document.title = titles[location.pathname] ?? titles["/"];
  }, [location.pathname, isPrint]);

  // Every tab change starts at the top. The main trigger is AnimatePresence's onExitComplete below
  // (the old page is gone, the new one is about to enter); this timer is a safety net that also
  // covers the case where there is no exit animation.
  useEffect(() => {
    const t = window.setTimeout(scrollToTop, 450);
    return () => window.clearTimeout(t);
  }, [location.pathname]);

  // The print view is the standalone one-page resume used to generate the PDF: no site chrome.
  if (isPrint) return <ResumePrint />;

  return (
    // reducedMotion="user" disables transform animations for users who ask for it
    <MotionConfig reducedMotion="user">
      <Layout>
        <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </MotionConfig>
  );
}
