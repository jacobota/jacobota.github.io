// Dev-time script: renders /resume/print with local Chrome into public/Jacob_Ota_Resume.pdf
// and fails if the result is not exactly one page. The PDF is committed, so CI needs no Chrome.
//
// Usage: npm run resume:pdf        (set CHROME_PATH if Chrome is not in the default location)
import { execFileSync, spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const PORT = 4180;
const OUT = "public/Jacob_Ota_Resume.pdf";
const chrome =
  process.env.CHROME_PATH ??
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].find(existsSync);

if (!chrome) {
  console.error("Chrome not found. Set CHROME_PATH to your chrome executable.");
  process.exit(1);
}

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
execFileSync(npx, ["vite", "build"], { stdio: "inherit", shell: process.platform === "win32" });

const server = spawn(npx, ["vite", "preview", "--port", String(PORT), "--strictPort"], {
  stdio: "ignore",
  shell: process.platform === "win32",
});

async function waitForServer() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/resume/print`);
      if (r.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("preview server did not start");
}

try {
  await waitForServer();
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=5000",
      `--print-to-pdf=${resolve(OUT)}`,
      `http://localhost:${PORT}/resume/print`,
    ],
    { stdio: "ignore" },
  );
} finally {
  if (process.platform === "win32") {
    try {
      execFileSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], { stdio: "ignore" });
    } catch {
      /* already gone */
    }
  } else {
    server.kill();
  }
}

const pages = (readFileSync(OUT, "latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(`${OUT}: ${pages} page(s)`);
if (pages !== 1) {
  console.error("Resume must fit on exactly one page. Trim content or tighten spacing in ResumePrint.tsx.");
  process.exit(1);
}
