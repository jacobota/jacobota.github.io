// Single source of truth for the Resume page and the one-page PDF (/resume/print).
import { contact } from "./contact";

export interface ResumeEntry {
  title: string;
  org?: string;
  date?: string;
  meta?: string[];
  bullets?: string[];
}

export const header = {
  name: "Jacob Ota",
  email: contact.email,
  linkedin: contact.linkedin,
  github: contact.github,
  // Display-only versions (no protocol) for the printed resume.
  linkedinLabel: "linkedin.com/in/jacob-ota-902511224",
  githubLabel: "github.com/jacobota",
};

export const summary: string[] = [
  "Software Engineer (M.S.) at College Board building Drupal modules and contributing to an atomic UI design system through development and QA, with full-stack and AWS experience from Revature’s engineering program.",
  "On the side, designing Park Factor, a baseball analytics mobile app that makes the game’s data easier to explore.",
  "A collaborative engineer shaped by Agile teams, QA discipline, and collegiate athletics leadership.",
];

export const experience: ResumeEntry[] = [
  {
    title: "Engineer 1",
    org: "College Board",
    date: "May 2024 – Present",
    bullets: [
      "Develop custom Drupal modules, including a widget that lets users connect with an AI assistant or a live agent",
      "Helped in the development and QA of our atomic UI design system to improve the College Board design system",
      "Worked with AWS services such as EC2 instances and Canaries to host applications and monitor their health",
    ],
  },
  {
    title: "Contract Worker",
    org: "Revature",
    date: "Jan 2024 – May 2025",
    bullets: [
      "Completed intensive training in AWS services, React, and JavaScript, the tools used at College Board, before being contracted to College Board in May 2024 for real-world experience",
      "Worked on a team to build Cookbooked, a full-stack recipe app using AWS services",
    ],
  },
];

export const projects: ResumeEntry[] = [
  {
    title: "Park Factor",
    meta: ["Master’s capstone and side project, in design"],
    bullets: [
      "Baseball analytics mobile app (React Native) that makes the game’s data easier for everyone to explore",
      "Developing with a team of baseball analysts and fellow engineers to bring the game’s data to life",
    ],
  },
  {
    title: "DJB Golf",
    meta: ["Client project, live"],
    bullets: [
      "Built a Drupal site for a PGA golf professional using content types and fields, editor roles and permissions, and site theming so he can manage pages without code",
      "Implemented a booking form that emails him the requested service and time",
    ],
  },
  {
    title: "Trucha Fly Fishing",
    meta: ["Client project, live, rebuilding in Drupal"],
    bullets: [
      "Built the original site in HTML, CSS, and JavaScript, working directly with the owner on features and visuals",
      "Rebuilding in Drupal with content types and fields, editor roles and permissions, and appointment request forms for owner-managed content",
    ],
  },
  {
    title: "Cookbooked",
    meta: ["Revature team project"],
    bullets: [
      "Full-stack AWS recipe app with social features: users look up dishes, get recipes they can make, and like and share them",
    ],
  },
];

export const education: ResumeEntry[] = [
  {
    title: "M.S. Software Engineering",
    org: "Arizona State University, Tempe, AZ",
    date: "July 2025",
    meta: ["GPA 3.5, Cum Laude"],
    bullets: [
      "Capstone: demo mobile app of Park Factor",
      "Relevant coursework: Software Testing, Distributed Software Development and Integration, Project Management, Machine Learning",
    ],
  },
  {
    title: "B.S. Computer Science",
    org: "University of Puget Sound, Tacoma, WA",
    date: "May 2022",
    meta: ["GPA 3.51"],
    bullets: [
      "Capstone: Lost & Found social media app, built with a team of five",
      "Dean’s List (Fall 2020, Fall 2021, Spring 2022)",
    ],
  },
];

export const skills: { label: string; value: string }[] = [
  { label: "Languages", value: "JavaScript, TypeScript, Java, Python, SQL, HTML/CSS" },
  {
    label: "Tools & Frameworks",
    value: "Drupal, React, React Native, Node.js, Tailwind CSS, AWS, Git/GitHub, Claude Code",
  },
];

export const leadership: ResumeEntry[] = [
  {
    title: "Collegiate Baseball Player",
    org: "University of Puget Sound",
    date: "08/2018 – 05/2022",
    bullets: [
      "Led and mentored teammates, pushing them to a high standard on and off the field",
      "Awarded All-Northwest Conference Honorable Mention (2022)",
    ],
  },
  {
    title: "Resident Assistant",
    org: "University of Puget Sound",
    date: "01/2021 – 05/2022",
    bullets: ["Supported residents, responded to emergencies and maintenance reports, and led floor meetings"],
  },
];
