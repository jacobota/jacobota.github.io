import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Page, SectionHeading, Stagger, StaggerItem } from "../components/Motion";
import {
  education,
  experience,
  leadership,
  projects,
  skills,
  summary,
  type ResumeEntry,
} from "../data/resume";

// Timeline pieces follow the reveal state of the entry they belong to (variant propagation).
const dotVariants: Variants = {
  below: { scale: 0, opacity: 0 },
  above: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { delay: 0.2, type: "spring", stiffness: 420, damping: 16 } },
};
const lineVariants: Variants = {
  below: { scaleY: 0 },
  above: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function EntryCard({ e }: { e: ResumeEntry }) {
  return (
    <div className="card-lift rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-lg font-semibold leading-snug">
          {e.title}
          {e.org ? <span className="font-medium text-muted">, {e.org}</span> : null}
        </h3>
        {e.date && <p className="shrink-0 text-sm text-muted">{e.date}</p>}
      </div>
      {e.meta && <p className="mt-1 text-sm text-muted">{e.meta.join(" · ")}</p>}
      {e.bullets && (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          {e.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Plain stack of cards, or (timeline) the same cards hung off a vertical line with a dot per entry. */
function Entries({ entries, timeline = false }: { entries: ResumeEntry[]; timeline?: boolean }) {
  // Each entry is a step in the surrounding section's Stagger, so entries appear one after another.
  if (!timeline) {
    return (
      <div className="space-y-5">
        {entries.map((e) => (
          <StaggerItem key={e.title + (e.org ?? "")}>
            <EntryCard e={e} />
          </StaggerItem>
        ))}
      </div>
    );
  }
  return (
    <ol className="ml-2 space-y-5 pl-6 sm:ml-3 sm:pl-8">
      {entries.map((e, i) => (
        <StaggerItem as="li" key={e.title + (e.org ?? "")} className="relative">
          {/* The dot pops in as its card appears, and the line below it draws down to the next dot, so the
              timeline builds itself as you scroll. Both follow the card's reveal state. */}
          <motion.span
            aria-hidden
            variants={dotVariants}
            className="absolute -left-[1.9rem] top-7 z-10 h-3 w-3 rounded-full bg-accent ring-4 ring-bg sm:-left-[2.4rem]"
          />
          {i < entries.length - 1 && (
            <motion.span
              aria-hidden
              variants={lineVariants}
              style={{ originY: 0 }}
              className="absolute bottom-[calc(-3rem-6px)] left-[calc(-1.9rem+5.5px)] top-[calc(1.75rem+6px)] w-px bg-line sm:left-[calc(-2.4rem+5.5px)]"
            />
          )}
          <EntryCard e={e} />
        </StaggerItem>
      ))}
    </ol>
  );
}

export default function Resume() {
  return (
    <Page>
      <div className="container-page max-w-3xl py-12 sm:py-16">
        <Stagger className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <StaggerItem>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Resume</h1>
          </StaggerItem>
          <StaggerItem className="self-start">
            <a href="/Jacob_Ota_Resume.pdf" download="Jacob_Ota_Resume.pdf" className="btn btn-primary">
              Download PDF
            </a>
          </StaggerItem>
        </Stagger>

        <Stagger className="mb-12">
          <StaggerItem>
            <SectionHeading title="Summary" />
          </StaggerItem>
          <StaggerItem>
            <p className="text-base leading-relaxed sm:text-lg">{summary.join(" ")}</p>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-sm text-muted">
              More ways to reach me on the{" "}
              <Link to="/contact" className="text-accent underline-offset-4 hover:underline">contact page</Link>.
            </p>
          </StaggerItem>
        </Stagger>

        <Stagger className="mb-12">
          <StaggerItem>
            <SectionHeading title="Experience" />
          </StaggerItem>
          <Entries entries={experience} timeline />
        </Stagger>

        <Stagger className="mb-12" step={0.08}>
          <StaggerItem>
            <SectionHeading title="Projects" />
          </StaggerItem>
          <Entries entries={projects} />
          <StaggerItem>
            <Link to="/projects" className="btn btn-ghost mt-5">See all projects</Link>
          </StaggerItem>
        </Stagger>

        <Stagger className="mb-12">
          <StaggerItem>
            <SectionHeading title="Education" />
          </StaggerItem>
          <Entries entries={education} timeline />
        </Stagger>

        <Stagger className="mb-12">
          <StaggerItem>
            <SectionHeading title="Skills" />
          </StaggerItem>
          <StaggerItem>
            <dl className="space-y-5 rounded-2xl border border-line bg-surface p-5 sm:p-6">
              {skills.map((s) => (
                <div key={s.label}>
                  <dt className="text-sm font-semibold">{s.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{s.value}</dd>
                </div>
              ))}
            </dl>
          </StaggerItem>
        </Stagger>

        <Stagger>
          <StaggerItem>
            <SectionHeading title="Leadership & Athletics" />
          </StaggerItem>
          <Entries entries={leadership} />
        </Stagger>
      </div>
    </Page>
  );
}
