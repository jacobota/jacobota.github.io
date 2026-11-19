import { Page, Reveal, Stagger, StaggerItem } from "../components/Motion";
import ProjectCard from "../components/ProjectCard";
import { groups, projects } from "../data/projects";
import { contact } from "../data/contact";

export default function Projects() {
  return (
    <Page>
      <div className="container-page py-12 sm:py-16">
        <Stagger className="mb-12 max-w-2xl">
          <StaggerItem>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Projects</h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-3 text-lg text-muted">
              A mix of client work, personal builds, and school and training projects. Tap a card for details.
            </p>
          </StaggerItem>
        </Stagger>

        <div className="space-y-14">
          {groups.map((g) => {
            const items = projects.filter((p) => p.group === g.id);
            if (items.length === 0) return null;
            return (
              <Stagger as="section" key={g.id} step={0.12}>
                <StaggerItem>
                  <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 id={`group-${g.id}`} className="text-2xl font-bold tracking-tight">
                      {g.title}
                    </h2>
                    <span className="text-sm text-muted">{g.blurb}</span>
                  </div>
                </StaggerItem>
                <div className="grid items-start gap-5 md:grid-cols-2">
                  {items.map((p) => (
                    <StaggerItem key={p.title}>
                      <ProjectCard project={p} />
                    </StaggerItem>
                  ))}
                </div>
              </Stagger>
            );
          })}
        </div>

        <Reveal className="mt-14">
          <a href={contact.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
            More on GitHub
          </a>
        </Reveal>
      </div>
    </Page>
  );
}
