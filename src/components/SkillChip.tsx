import type { CSSProperties } from "react";
import { StaggerItem } from "./Motion";
import {
  siAmazonwebservices,
  siClaude,
  siDrupal,
  siGithub,
  siJavascript,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

type Icon =
  | { path: string; color?: string } // brand glyph (color omitted = follows text color)
  | { text: string; color: string } // small lettermark for tools without a brand glyph
  | { database: true; color: string }
  | { java: true }; // hand-drawn steaming coffee cup (the official Java mark isn't in the icon set)

// Colors are tuned to read on both the light and dark page.
const icons: Record<string, Icon> = {
  Drupal: { path: siDrupal.path, color: "#0678BE" },
  React: { path: siReact.path, color: "#2BAFD6" },
  "React Native": { path: siReact.path, color: "#2BAFD6" },
  TypeScript: { path: siTypescript.path, color: "#3178C6" },
  JavaScript: { path: siJavascript.path, color: "#E5C100" },
  Java: { java: true },
  "C#": { text: "C#", color: "#9B4F96" },
  Python: { path: siPython.path, color: "#3776AB" },
  SQL: { database: true, color: "#6B8AFD" },
  "Tailwind CSS": { path: siTailwindcss.path, color: "#06B6D4" },
  AWS: { path: siAmazonwebservices.path, color: "#FF9900" },
  "Git/GitHub": { path: siGithub.path },
  "Claude Code": { path: siClaude.path, color: "#D97757" },
};

function IconGlyph({ icon }: { icon: Icon }) {
  if ("path" in icon) {
    return (
      <svg viewBox="0 0 24 24" className="skill-icon h-4 w-4 shrink-0" fill="currentColor" style={{ color: icon.color }} aria-hidden>
        <path d={icon.path} />
      </svg>
    );
  }
  if ("text" in icon) {
    return (
      <span
        className="skill-icon flex h-4 w-4 shrink-0 items-center justify-center text-[11px] font-extrabold leading-none"
        style={{ color: icon.color }}
        aria-hidden
      >
        {icon.text}
      </span>
    );
  }
  if ("java" in icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="skill-icon h-4 w-4 shrink-0"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {/* steam */}
        <path d="M9.2 1.8c1.4 1.3-1.4 2.4 0 4" stroke="#F89820" strokeWidth="1.6" />
        <path d="M13 1c1.6 1.5-1.6 2.7 0 4.5" stroke="#F89820" strokeWidth="1.6" />
        {/* cup, handle, saucer */}
        <path d="M4.5 8.5h11.2v5.4a4.6 4.6 0 0 1-4.6 4.6H9.1a4.6 4.6 0 0 1-4.6-4.6V8.5z" fill="#5382A1" />
        <path d="M15.7 10h1.3a2.4 2.4 0 0 1 0 4.8h-1.5" stroke="#5382A1" strokeWidth="1.7" />
        <path d="M3 21h14.5" stroke="#F89820" strokeWidth="1.7" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="skill-icon h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: icon.color }}
      aria-hidden
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </svg>
  );
}

// The color a chip's border and glow take on hover: the tool's brand color (Java: its orange; chips
// without one fall back to the site accent).
function chipColor(name: string, icon?: Icon): string | undefined {
  if (name === "Java") return "#F89820";
  return icon && "color" in icon ? icon.color : undefined;
}

export default function SkillChip({ name }: { name: string }) {
  const icon = icons[name];
  const color = chipColor(name, icon);
  return (
    // Part of the Skills section's Stagger: chips cascade in one at a time.
    <StaggerItem
      as="li"
      style={color ? ({ "--chip": color } as CSSProperties) : undefined}
      className="skill-chip inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium"
    >
      {icon && <IconGlyph icon={icon} />}
      {name}
    </StaggerItem>
  );
}
