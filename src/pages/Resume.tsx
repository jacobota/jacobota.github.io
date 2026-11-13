import { Link } from "react-router-dom";
import { Page, Reveal, SectionHeading } from "../components/Motion";
import {
  education,
  experience,
  leadership,
  projects,
  skills,
  summary,
  type ResumeEntry,
} from "../data/resume";

function EntryCard({ e }: { e: ResumeEntry }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
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
  if (!timeline) {
    return (
      <div className="space-y-5">
        {entries.map((e) => (
          <EntryCard key={e.title + (e.org ?? "")} e={e} />
        ))}
      </div>
    );
  }
  return (
    <ol className="ml-2 space-y-5 border-l border-line pl-6 sm:ml-3 sm:pl-8">
      {entries.map((e) => (
        <li key={e.title + (e.org ?? "")} className="relative">
          {/* dot centered on the line */}
          <span
            aria-hidden
            className="absolute -left-[1.9rem] top-7 h-3 w-3 rounded-full bg-accent ring-4 ring-bg sm:-left-[2.4rem]"
          />
          <EntryCard e={e} />
        </li>
      ))}
    </ol>
  );
}

export default function Resume() {
  return (
    <Page>
      <div className="container-page max-w-3xl py-12 sm:py-16">
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Resume</h1>
          </div>
          <a href="/Jacob_Ota_Resume.pdf" download="Jacob_Ota_Resume.pdf" className="btn btn-primary self-start">
            Download PDF
          </a>
        </div>

        <Reveal className="mb-12">
          <SectionHeading title="Summary" />
          <p className="text-base leading-relaxed sm:text-lg">{summary.join(" ")}</p>
          <p className="mt-4 text-sm text-muted">
            More ways to reach me on the{" "}
            <Link to="/contact" className="text-accent underline-offset-4 hover:underline">contact page</Link>.
          </p>
        </Reveal>

        <Reveal className="mb-12">
          <SectionHeading title="Experience" />
          <Entries entries={experience} timeline />
        </Reveal>

        <Reveal className="mb-12">
          <SectionHeading title="Projects" />
          <Entries entries={projects} />
          <Link to="/projects" className="btn btn-ghost mt-5">See all projects</Link>
        </Reveal>

        <Reveal className="mb-12">
          <SectionHeading title="Education" />
          <Entries entries={education} timeline />
        </Reveal>

        <Reveal className="mb-12">
          <SectionHeading title="Skills" />
          <dl className="space-y-5 rounded-2xl border border-line bg-surface p-5 sm:p-6">
            {skills.map((s) => (
              <div key={s.label}>
                <dt className="text-sm font-semibold">{s.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted sm:text-base">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <SectionHeading title="Leadership & Athletics" />
          <Entries entries={leadership} timeline />
        </Reveal>
      </div>
    </Page>
  );
}
