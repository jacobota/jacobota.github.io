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

export default function App() {
  const location = useLocation();
  const isPrint = location.pathname === "/resume/print";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isPrint) document.title = titles[location.pathname] ?? titles["/"];
  }, [location.pathname, isPrint]);

  // The print view is the standalone one-page resume used to generate the PDF: no site chrome.
  if (isPrint) return <ResumePrint />;

  return (
    // reducedMotion="user" disables transform animations for users who ask for it
    <MotionConfig reducedMotion="user">
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
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
