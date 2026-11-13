import {
  siAmazonwebservices,
  siClaude,
  siDrupal,
  siGithub,
  siJavascript,
  siOpenjdk,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

type Icon =
  | { path: string; color?: string } // brand glyph (color omitted = follows text color)
  | { text: string; color: string } // small lettermark for tools without a brand glyph
  | { database: true; color: string };

// Colors are tuned to read on both the light and dark page.
const icons: Record<string, Icon> = {
  Drupal: { path: siDrupal.path, color: "#0678BE" },
  React: { path: siReact.path, color: "#2BAFD6" },
  "React Native": { path: siReact.path, color: "#2BAFD6" },
  TypeScript: { path: siTypescript.path, color: "#3178C6" },
  JavaScript: { path: siJavascript.path, color: "#E5C100" },
  Java: { path: siOpenjdk.path, color: "#ED8B00" },
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
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" style={{ color: icon.color }} aria-hidden>
        <path d={icon.path} />
      </svg>
    );
  }
  if ("text" in icon) {
    return (
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center text-[11px] font-extrabold leading-none"
        style={{ color: icon.color }}
        aria-hidden
      >
        {icon.text}
      </span>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
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

export default function SkillChip({ name }: { name: string }) {
  const icon = icons[name];
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium">
      {icon && <IconGlyph icon={icon} />}
      {name}
    </li>
  );
}
