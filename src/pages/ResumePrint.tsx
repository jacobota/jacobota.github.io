import { useEffect, type ReactNode } from "react";
import {
  education,
  experience,
  header,
  leadership,
  projects,
  skills,
  summary,
  type ResumeEntry,
} from "../data/resume";

// One-page, print-first layout. Plain white, selectable text. Rendered at /resume/print
// and turned into public/Jacob_Ota_Resume.pdf by `npm run resume:pdf`.

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginTop: "7pt" }}>
      <h2
        style={{
          fontSize: "10pt",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          borderBottom: "0.75pt solid #000",
          paddingBottom: "1.5pt",
          marginBottom: "4pt",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Entry({ e }: { e: ResumeEntry }) {
  return (
    <div style={{ marginBottom: "4pt", breakInside: "avoid" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "8pt" }}>
        <div>
          <strong>{e.title}</strong>
          {e.org ? <span>, {e.org}</span> : null}
          {e.meta ? <span style={{ fontStyle: "italic" }}> · {e.meta.join(" · ")}</span> : null}
        </div>
        {e.date && <div style={{ whiteSpace: "nowrap" }}>{e.date}</div>}
      </div>
      {e.bullets && (
        <ul style={{ margin: "1.5pt 0 0 12pt", padding: 0, listStyle: "disc" }}>
          {e.bullets.map((b) => (
            <li key={b} style={{ marginBottom: "0.5pt" }}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ResumePrint() {
  useEffect(() => {
    document.title = "Jacob Ota - Resume";
    document.documentElement.dataset.theme = "light"; // always print on white
  }, []);

  return (
    <div
      className="resume-print"
      style={{
        background: "#fff",
        color: "#000",
        fontSize: "9pt",
        lineHeight: 1.25,
        maxWidth: "8.5in",
        margin: "0 auto",
        padding: "0.45in 0.5in",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
      }}
    >
      <style>{`
        @page { size: Letter; margin: 0; }
        html, body { background: #fff !important; }
      `}</style>

      <header style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "20pt", fontWeight: 800, letterSpacing: "-0.01em" }}>{header.name}</h1>
        <p style={{ marginTop: "2pt" }}>
          {header.email} · {header.linkedinLabel} · {header.githubLabel}
        </p>
      </header>

      <Section title="Summary">
        <p>{summary.join(" ")}</p>
      </Section>

      <Section title="Experience">
        {experience.map((e) => <Entry key={e.title + e.org} e={e} />)}
      </Section>

      <Section title="Projects">
        {projects.map((e) => <Entry key={e.title} e={e} />)}
      </Section>

      <Section title="Education">
        {education.map((e) => <Entry key={e.title} e={e} />)}
      </Section>

      <Section title="Technical Skills">
        {skills.map((s) => (
          <p key={s.label}>
            <strong>{s.label}:</strong> {s.value}
          </p>
        ))}
      </Section>

      <Section title="Leadership & Athletics">
        {leadership.map((e) => <Entry key={e.title} e={e} />)}
      </Section>
    </div>
  );
}
