import type { ReactNode } from "react";
import { Page, Reveal } from "../components/Motion";
import { contact } from "../data/contact";

function Card({ href, label, value, icon, external }: { href: string; label: string; value: string; icon: ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:border-accent hover:shadow-lg hover:shadow-black/5"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="block truncate text-sm text-muted">{value}</span>
      </span>
    </a>
  );
}

const svg = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export default function Contact() {
  return (
    <Page>
      <div className="container-page max-w-2xl py-12 sm:py-16">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Contact</h1>
        <p className="mt-3 text-lg text-muted">
          I’m happy in my remote role at College Board, but I also take on contract work as a web developer, building and
          reworking sites for small businesses. If you have a project in mind, email me and tell me about it.
        </p>

        <div className="mt-10 space-y-4">
          <Reveal>
            <Card
              href={`mailto:${contact.email}`}
              label="Email"
              value={contact.email}
              icon={<svg {...svg}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Card
              href={contact.linkedin}
              label="LinkedIn"
              value="linkedin.com/in/jacob-ota"
              external
              icon={<svg {...svg}><path d="M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM11 9h4v2c.7-1.3 2-2.2 3.8-2.2C21 8.8 22 10.2 22 13v7h-4v-6c0-1.3-.5-2-1.6-2-1.2 0-1.9.9-1.9 2.2V20h-4z" /></svg>}
            />
          </Reveal>
          <Reveal delay={0.16}>
            <Card
              href={contact.github}
              label="GitHub"
              value="github.com/jacobota"
              external
              icon={<svg {...svg}><path d="M9 19c-4.300 1.400-4.300-2.500-6-3m12 5v-3.500c0-1 .1-1.400-.5-2 2.800-.3 5.500-1.400 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.200 4.200 0 0 0-.1-3.200s-1.100-.3-3.500 1.300a12.300 12.300 0 0 0-6.200 0C6.500 2.800 5.400 3.100 5.400 3.100a4.200 4.200 0 0 0-.1 3.200A4.600 4.600 0 0 0 4 9.500c0 4.600 2.700 5.700 5.500 6-.6.600-.6 1.200-.5 2V21" /></svg>}
            />
          </Reveal>
        </div>
      </div>
    </Page>
  );
}
