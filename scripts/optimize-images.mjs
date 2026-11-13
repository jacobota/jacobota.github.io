// Usage: node scripts/optimize-images.mjs <srcDir>
// Resizes photos to max 1400px wide and writes WebP into public/images.
import sharp from "sharp";
import { readdirSync } from "node:fs";
import { join, parse } from "node:path";

const src = process.argv[2];
for (const f of readdirSync(src)) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const out = join("public/images", parse(f).name.toLowerCase() + ".webp");
  await sharp(join(src, f)).rotate().resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
  console.log(out);
}
