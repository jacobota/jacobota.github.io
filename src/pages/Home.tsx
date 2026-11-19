import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Page, SectionHeading, Stagger, StaggerItem } from "../components/Motion";
import TerminalIntro from "../components/TerminalIntro";
import Gallery from "../components/Gallery";
import { DevelopingPhoto, useDevelop } from "../components/Develop";
import SkillChip from "../components/SkillChip";
import { projects } from "../data/projects";

// Shown in the "On The Side" section, in the same order as the Projects data.
const sideProjects = projects.filter((p) => p.title === "Park Factor" || p.title === "Trucha Fly Fishing");

// Hero text: the label shows right away; the paragraph and buttons fade up once the terminal intro above
// them has finished typing. Each piece has its own explicit start/end labels.
const item = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
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
  // The terminal intro in the hero plays first. When it has finished (or was skipped), the paragraph and
  // buttons fade in and the black portrait gives its shake and develops.
  const [introDone, setIntroDone] = useState(false);
  const hero = useDevelop<HTMLDivElement>("hero", { auto: true, enabled: introDone, delay: 0.3 });

  return (
    <Page>
      <section className="container-page relative isolate grid items-center gap-10 py-12 sm:py-20 md:grid-cols-[1.3fr_1fr] md:gap-14">
        {/* soft accent glow behind the hero only (decorative; absolutely positioned so it isn't a grid item) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-10 top-2 h-80 w-80 rounded-full bg-accent/40 blur-3xl md:h-[27rem] md:w-[27rem]" />
          <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="order-2 md:order-1">
          <motion.p
            variants={item}
            custom={0.1}
            initial="hidden"
            animate="show"
            className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent"
          >
            Software Engineer, MS
          </motion.p>
          <TerminalIntro onDone={() => setIntroDone(true)} />
          <motion.p
            variants={item}
            custom={0.1}
            initial="hidden"
            animate={introDone ? "show" : "hidden"}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            Remote software engineer at College Board, working in Drupal and an atomic UI design system. On the side, I
            do contract work building sites for small businesses, and with a team of three I’m designing Park
            Factor, a mobile app that turns baseball’s data into something anyone can explore.
          </motion.p>
          <motion.div
            variants={item}
            custom={0.3}
            initial="hidden"
            animate={introDone ? "show" : "hidden"}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/projects" className="btn btn-ghost">View projects</Link>
            <Link to="/resume" className="btn btn-ghost">Resume</Link>
            <Link to="/contact" className="btn btn-ghost">Get in touch</Link>
          </motion.div>
        </div>

        {/* Hero portrait as a straight polaroid. Decorative only: not a link, no hover effect, and not
            part of the gallery or its lightbox. It rises into place on load, then the black photo
            gets a little shake and develops (once per visit; see Develop.tsx). */}
        <div className="order-1 flex justify-center md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-[17rem] sm:max-w-[19rem] md:max-w-[22rem]"
          >
            <motion.div
              ref={hero.frameRef}
              animate={hero.shake}
              className="relative bg-polaroid p-3 shadow-xl shadow-black/30"
            >
              <DevelopingPhoto
                src="/images/home_image.webp"
                alt="Portrait of Jacob Ota smiling in a maroon polo"
                pos="50% 45%"
                className="aspect-[4/5]"
                developed={hero.developed}
                alreadySeen={hero.alreadySeen}
                onReady={hero.onImageReady}
                eager
              />
              {/* handwritten message on the print's bottom strip, same font as the gallery captions */}
              <span className="flex min-h-[3.75rem] items-center justify-center pb-1 pt-3 text-center font-hand text-3xl font-semibold leading-tight text-polaroid-ink md:min-h-[4.25rem] md:text-4xl">
                Welcome to my site
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Stagger as="section" className="container-page border-t border-line py-14 sm:py-20">
        <StaggerItem>
          <SectionHeading eyebrow="About" title="My background" />
        </StaggerItem>
        <div className="max-w-3xl space-y-5 text-base leading-relaxed sm:text-lg">
          <StaggerItem>
            <p>
              I’m a software engineer with a B.S. in Computer Science from the University of Puget Sound and an
              M.S. in Software Engineering from Arizona State University, which I completed in July 2025. Since
              May 2024 I’ve worked remotely at College Board in Drupal and our atomic UI design system. I love
              work that sits where careful engineering meets real people: building modules and interfaces that
              students and educators actually use, and making sure they hold up through thorough QA.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p>
              Outside of work I build for the clients and ideas I care about. I’ve built Drupal sites that let
              business owners manage their own content and take bookings from visitors, and I’m the software
              engineer on a team of three building Park Factor, a baseball analytics app that grew out of a
              master’s capstone. Our goal is to bridge the gap between people and data, because the way data is
              delivered matters.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p>
              Before engineering full time I was a collegiate baseball player and a resident assistant at Puget
              Sound. Balancing a student-athlete schedule with responsibilities to the residents on my floor taught
              me time management, teamwork, and how to lead and stay steady under pressure. Those experiences are a
              big part of what sets me apart, and I bring that same resilience and care for the people around me to
              every team I work on.
            </p>
          </StaggerItem>
        </div>
      </Stagger>

      <Stagger as="section" className="container-page border-t border-line py-14 sm:py-20">
        <StaggerItem>
          <SectionHeading eyebrow="Currently" title="Engineer 1 at College Board" />
        </StaggerItem>
        <StaggerItem>
          <div className="card-lift max-w-3xl rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {/* pulsing "live" dot; the pulse is off for reduced-motion users */}
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Current role
              </span>
              <span className="text-sm text-muted">May 2024 – Present · Remote</span>
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
        </StaggerItem>
      </Stagger>

      <Stagger as="section" className="container-page border-t border-line py-14 sm:py-20">
        <StaggerItem>
          <SectionHeading eyebrow="On The Side" title="Side projects" />
        </StaggerItem>
        <div className="max-w-3xl space-y-5">
          {sideProjects.map((p) => (
            <StaggerItem key={p.title}>
              <div className="card-lift rounded-2xl border border-line bg-surface p-5 sm:p-6">
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
              </div>
            </StaggerItem>
          ))}
          <StaggerItem>
            <Link to="/projects" className="btn btn-ghost">See all projects</Link>
          </StaggerItem>
        </div>
      </Stagger>

      <Stagger as="section" className="container-page border-t border-line py-14 sm:py-20" step={0.08}>
        <StaggerItem>
          <SectionHeading eyebrow="Skills" title="Tools I work with" />
        </StaggerItem>
        {/* the chips cascade one by one */}
        <ul className="flex max-w-3xl flex-wrap gap-2">
          {skills.map((s) => (
            <SkillChip key={s} name={s} />
          ))}
        </ul>
      </Stagger>

      <Stagger as="section" className="container-page border-t border-line py-14 sm:py-20">
        <StaggerItem>
          <SectionHeading eyebrow="Education" title="Where I studied" />
        </StaggerItem>
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          {education.map((e) => (
            <StaggerItem key={e.degree} className="h-full">
              <div className="card-lift h-full rounded-2xl border border-line bg-surface p-5 sm:p-6">
                <h3 className="text-lg font-semibold leading-snug">{e.degree}</h3>
                <p className="mt-1 text-sm text-muted">
                  {e.school} · {e.date}
                </p>
                <p className="mt-3 text-sm leading-relaxed sm:text-base">{e.note}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </Stagger>

      <Stagger as="section" className="container-page overflow-hidden border-t border-line py-14 sm:py-20">
        <StaggerItem>
          <SectionHeading eyebrow="Beyond code" title="A little more about me" />
        </StaggerItem>
        {/* No fade-in wrapper here: the prints show up black right away, then each one develops itself. */}
        <Gallery />
      </Stagger>
    </Page>
  );
}
