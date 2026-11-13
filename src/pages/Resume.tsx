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

function Entries({ entries }: { entries: ResumeEntry[] }) {
  return (
    <div className="space-y-5">
      {entries.map((e) => (
        <div key={e.title + (e.org ?? "")} className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
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
      ))}
    </div>
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
          <Entries entries={experience} />
        </Reveal>

        <Reveal className="mb-12">
          <SectionHeading title="Projects" />
          <Entries entries={projects} />
          <Link to="/projects" className="btn btn-ghost mt-5">See all projects</Link>
        </Reveal>

        <Reveal className="mb-12">
          <SectionHeading title="Education" />
          <Entries entries={education} />
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
          <Entries entries={leadership} />
        </Reveal>
      </div>
    </Page>
  );
}
