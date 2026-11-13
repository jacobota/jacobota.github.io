import { Page, Reveal } from "../components/Motion";
import ProjectCard from "../components/ProjectCard";
import { groups, projects } from "../data/projects";
import { contact } from "../data/contact";

export default function Projects() {
  return (
    <Page>
      <div className="container-page py-12 sm:py-16">
        <div className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Projects</h1>
          <p className="mt-3 text-lg text-muted">
            A mix of client work, personal builds, and school and training projects. Tap a card for details.
          </p>
        </div>

        <div className="space-y-14">
          {groups.map((g) => {
            const items = projects.filter((p) => p.group === g.id);
            if (items.length === 0) return null;
            return (
              <section key={g.id} aria-labelledby={`group-${g.id}`}>
                <Reveal>
                  <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 id={`group-${g.id}`} className="text-2xl font-bold tracking-tight">
                      {g.title}
                    </h2>
                    <span className="text-sm text-muted">{g.blurb}</span>
                  </div>
                </Reveal>
                <div className="grid items-start gap-5 md:grid-cols-2">
                  {items.map((p, i) => (
                    <Reveal key={p.title} delay={(i % 2) * 0.08}>
                      <ProjectCard project={p} />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-14">
          <a href={contact.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            More on GitHub
          </a>
        </div>
      </div>
    </Page>
  );
}
