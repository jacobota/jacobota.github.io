import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Page, Reveal, SectionHeading } from "../components/Motion";
import Gallery from "../components/Gallery";
import { projects } from "../data/projects";

// Shown in the "On The Side" section, in the same order as the Projects data.
const sideProjects = projects.filter((p) => p.title === "Park Factor" || p.title === "Trucha Fly Fishing");

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const skills = [
  "Drupal",
  "React",
  "React Native",
  "TypeScript",
  "JavaScript",
  "Java",
  "C#",
  "Python",
  "SQL",
  "Tailwind CSS",
  "AWS",
  "Git/GitHub",
  "Claude Code",
];

const education = [
  {
    degree: "M.S. Software Engineering",
    school: "Arizona State University",
    date: "July 2025",
    note: "Capstone: a demo mobile app of Park Factor, a baseball analytics app.",
  },
  {
    degree: "B.S. Computer Science",
    school: "University of Puget Sound",
    date: "May 2022",
    note: "Dean’s List (Fall 2020, Fall 2021, Spring 2022).",
  },
];

export default function Home() {
  return (
    <Page>
      <section className="container-page grid items-center gap-10 py-12 sm:py-20 md:grid-cols-[1.3fr_1fr] md:gap-14">
        <motion.div variants={stagger} initial="hidden" animate="show" className="order-2 md:order-1">
          <motion.p variants={item} className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            Software Engineer, MS
          </motion.p>
          <motion.h1 variants={item} className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Hi, I’m Jacob Ota.
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Software engineer at College Board, working in Drupal and an atomic UI design system. On the side, I
            do contract work building sites for small businesses, and with a team of three I’m designing Park
            Factor, a mobile app that turns baseball’s data into something anyone can explore.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="btn btn-ghost">View projects</Link>
            <Link to="/resume" className="btn btn-ghost">Resume</Link>
            <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="order-1 mx-auto w-full max-w-[16rem] md:order-2 md:max-w-none"
        >
          <img
            src="/images/home_image.webp"
            alt="Portrait of Jacob Ota in a graduation gown"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl shadow-black/10 ring-1 ring-line"
            style={{ objectPosition: "50% 30%" }}
          />
        </motion.div>
      </section>

      <section className="container-page border-t border-line py-14 sm:py-20">
        <Reveal>
          <SectionHeading eyebrow="About" title="My background" />
        </Reveal>
        <div className="max-w-3xl space-y-5 text-base leading-relaxed sm:text-lg">
          <Reveal>
            <p>
              I’m a software engineer with a B.S. in Computer Science from the University of Puget Sound and an
              M.S. in Software Engineering from Arizona State University, which I completed in July 2025. Since
              May 2024 I’ve been at College Board, where I work in Drupal and our atomic UI design system. I love
              work that sits where careful engineering meets real people: building modules and interfaces that
              students and educators actually use, and making sure they hold up through thorough QA.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Outside of work I build for the clients and ideas I care about. I’ve built Drupal sites that let
              business owners manage their own content and take bookings from visitors, and I’m the software
              engineer on a team of three building Park Factor, a baseball analytics app that grew out of a
              master’s capstone. Our goal is to bridge the gap between people and data, because the way data is
              delivered matters.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Before engineering full time I was a collegiate baseball player and a resident assistant at Puget
              Sound. Balancing a student-athlete schedule with responsibilities to the residents on my floor taught
              me time management, teamwork, and how to lead and stay steady under pressure. Those experiences are a
              big part of what sets me apart, and I bring that same resilience and care for the people around me to
              every team I work on.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page border-t border-line py-14 sm:py-20">
        <Reveal>
          <SectionHeading eyebrow="Currently" title="Engineer 1 at College Board" />
        </Reveal>
        <Reveal>
          <div className="max-w-3xl rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Current role
              </span>
              <span className="text-sm text-muted">May 2024 – Present</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              I came to College Board through Revature, starting in January 2024 with an intensive training program
              in AWS services, React, and JavaScript, the tools College Board uses. Along the way I worked on a team
              to build Cookbooked, a full-stack recipe app on AWS. I was contracted to College Board in May 2024 for
              real-world experience, and was hired directly when the contract ended.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
              <li>
                Develop custom Drupal modules, for example a widget that lets users connect with an AI assistant or
                a live agent
              </li>
              <li>
                Help develop and QA our atomic UI design system, working to improve the College Board design system
                for the teams that build on it
              </li>
              <li>
                Built the frontend of the student login page that connects students to their school account,
                integrated with a service built by another team
              </li>
              <li>
                Work with AWS services such as EC2 instances and Canaries to host applications and monitor their
                health
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="container-page border-t border-line py-14 sm:py-20">
        <Reveal>
          <SectionHeading eyebrow="On The Side" title="Side projects" />
        </Reveal>
        <div className="max-w-3xl space-y-5">
          {sideProjects.map((p) => (
            <Reveal key={p.title}>
              <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      p.statusTone === "live"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className="text-sm text-muted">
                    {p.kind}
                    {p.date ? ` · ${p.date}` : ""}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{p.summary}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
                  {p.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                {p.links.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {p.links.map((l, i) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`btn ${i === 0 ? "btn-primary" : "btn-ghost"}`}
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
          <Reveal>
            <Link to="/projects" className="btn btn-ghost">See all projects</Link>
          </Reveal>
        </div>
      </section>

      <section className="container-page border-t border-line py-14 sm:py-20">
        <Reveal>
          <SectionHeading eyebrow="Skills" title="Tools I work with" />
        </Reveal>
        <Reveal>
          <ul className="flex max-w-3xl flex-wrap gap-2">
            {skills.map((s) => (
              <li key={s} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium">
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="container-page border-t border-line py-14 sm:py-20">
        <Reveal>
          <SectionHeading eyebrow="Education" title="Where I studied" />
        </Reveal>
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <h3 className="text-lg font-semibold leading-snug">{e.degree}</h3>
                <p className="mt-1 text-sm text-muted">
                  {e.school} · {e.date}
                </p>
                <p className="mt-3 text-sm leading-relaxed sm:text-base">{e.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page overflow-hidden border-t border-line py-14 sm:py-20">
        <Reveal>
          <SectionHeading eyebrow="Beyond code" title="A little more about me" />
        </Reveal>
        <Reveal>
          <Gallery />
        </Reveal>
      </section>
    </Page>
  );
}
