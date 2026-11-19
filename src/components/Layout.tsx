import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import RouteProgress from "./RouteProgress";
import { contact } from "../data/contact";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <RouteProgress />
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-accent px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Jacob Ota</p>
          <div className="flex gap-5">
            <Link to="/projects" className="hover:text-fg">Projects</Link>
            <a href={contact.github} className="hover:text-fg" target="_blank" rel="noreferrer">GitHub</a>
            <a href={contact.linkedin} className="hover:text-fg" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
