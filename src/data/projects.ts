export type ProjectGroup = "live" | "development" | "completed";

export interface Project {
  title: string;
  kind: string;
  group: ProjectGroup;
  status: string;
  statusTone: "live" | "progress" | "done";
  date?: string;
  summary: string;
  details: string[];
  tags: string[];
  links: { label: string; href: string }[];
  image?: string;
  /** "screenshot" fills the card width; "logo" shows a small centered mark. */
  imageKind?: "screenshot" | "logo";
}

export const groups: { id: ProjectGroup; title: string; blurb: string }[] = [
  { id: "live", title: "Live", blurb: "Shipped and in use today." },
  { id: "development", title: "In development", blurb: "Actively being designed or built." },
  { id: "completed", title: "Completed", blurb: "Finished projects from school and training." },
];

export const projects: Project[] = [
  // In development
  {
    title: "Park Factor",
    kind: "Team Side Project",
    group: "development",
    status: "In design",
    statusTone: "progress",
    summary:
      "A baseball analytics mobile app from a team of three, making the game’s data easier for everyone to explore and bringing it to life.",
    details: [
      "Built for coaches, players, decision makers, and anyone interested in visualizing the expansive data contained within baseball",
      "Our goal is to bridge the gap between people and data, because the way data is delivered matters",
      "A team of three working together to bring the game’s data to life, where I’m the software engineer for the group",
      "Grew out of a master’s capstone at ASU that delivered a demo mobile app; our team is now designing and building it out with React Native",
    ],
    tags: ["React Native", "Mobile", "Data Visualization", "Baseball"],
    links: [],
    image: "/images/park_factor.webp",
    imageKind: "logo",
  },
  {
    title: "Trucha Fly Fishing",
    kind: "Client Project",
    group: "development",
    status: "Live, rebuilding",
    statusTone: "progress",
    date: "Summer 2022",
    summary:
      "A website for a fly fishing company, being rebuilt in Drupal so the owner can manage content and take appointment requests.",
    details: [
      "Built the original site with HTML, CSS, and JavaScript, working closely with the owner on the features and visuals they wanted",
      "Rebuilding in Drupal with content types and fields so the owner controls their own pages and posts",
      "Setting up editor roles and permissions, and appointment request forms so visitors can book directly from the site",
    ],
    tags: ["Drupal", "Content Types", "Forms", "HTML", "CSS", "JavaScript"],
    links: [
      { label: "Visit site", href: "https://truchaflyfishing.com/" },
      { label: "GitHub", href: "https://github.com/jacobota/truchaflyfishing" },
    ],
    image: "/images/trucha_website.webp",
  },

  // Live
  {
    title: "DJB Golf",
    kind: "Client Project",
    group: "live",
    status: "Live",
    statusTone: "live",
    date: "Fall 2026",
    summary:
      "A performance website for PGA golf professional Darren Black, built in Drupal so he can run his own content and take bookings.",
    details: [
      "Built the site in Drupal using content types and fields, editor roles and permissions, and custom theming so the owner can edit his own pages without code",
      "Implemented a booking form that emails him the service a visitor wants and when they want it",
    ],
    tags: ["Drupal", "Content Types", "Theming", "Forms"],
    links: [{ label: "Visit djbgolf.com", href: "https://djbgolf.com" }],
    image: "/images/djb_golf.webp",
  },
  {
    title: "Portfolio Website",
    kind: "Personal Project",
    group: "live",
    status: "Live",
    statusTone: "live",
    date: "Fall 2026",
    summary:
      "This site: a mobile-first rewrite of my original portfolio using React and TypeScript, built with Claude Code.",
    details: [
      "Rebuilt from plain HTML, CSS, and JavaScript into React with TypeScript, Tailwind CSS, and Framer Motion",
      "Designed mobile-first with light and dark themes and motion that respects reduced-motion settings",
      "Resume page and one-page PDF both generated from a single data file, so they never drift apart",
      "Built with Claude Code and deployed to GitHub Pages with a GitHub Actions workflow",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Claude Code"],
    links: [{ label: "GitHub", href: "https://github.com/jacobota/jacobota.github.io" }],
  },

  // Completed
  {
    title: "Cookbooked",
    kind: "Revature Team Project",
    group: "completed",
    status: "Completed",
    statusTone: "done",
    date: "April 2024",
    summary:
      "A full-stack recipe app built with a team during Revature training, using AWS services.",
    details: [
      "Users look up dishes and get back the recipes they can make",
      "Social features let users like and share recipes",
      "Built full stack as part of a team during Revature’s intensive training, using AWS services",
    ],
    tags: ["Full-stack", "AWS", "Team Project"],
    links: [],
  },
  {
    title: "University of Puget Sound Lost & Found",
    kind: "Undergraduate Capstone Project",
    group: "completed",
    status: "Completed",
    statusTone: "done",
    date: "Spring 2022",
    summary:
      "A Lost & Found social media app built with a team of five to help students and campus security track lost items.",
    details: [
      "Worked with a team of five to build a web application to help students of the University with lost and found items",
      "Worked on the front end using HTML, CSS, and JavaScript and learned the Bootstrap framework over the course of this project",
      "Intended to assist students and help campus security keep track of lost and found items around the University",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Team of 5"],
    links: [],
  },
];
