// Dev-time script: renders scripts/og-image.html (1200x630) with local Chrome into public/og-image.png,
// the preview image used when the site is shared. Needs network once for the Google Fonts.
//
// Usage: npm run og:image        (set CHROME_PATH if Chrome is not in the default location)
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import sharp from "sharp";

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

const out = resolve("public/og-image.png");
const raw = join(tmpdir(), "og-image-raw.png");

// Headless Chrome's viewport is a bit smaller than --window-size, so render in a larger window
// and crop to exactly 1200x630.
execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1400,900",
    "--virtual-time-budget=8000",
    `--screenshot=${raw}`,
    pathToFileURL(resolve("scripts/og-image.html")).href,
  ],
  { stdio: "ignore" },
);
await sharp(raw).extract({ left: 0, top: 0, width: 1200, height: 630 }).png({ compressionLevel: 9 }).toFile(out);
console.log("wrote", out);
