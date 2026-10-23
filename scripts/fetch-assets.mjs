#!/usr/bin/env node
/**
 * Downloads every image / video the site uses from the live site into /public.
 *
 *   npm run fetch-assets
 *
 * It scans content/site.ts for local paths ("/images/...", "/cities/...", etc.)
 * and pulls each one from SOURCE. Already-downloaded files are skipped, so it is
 * safe to re-run. Run it once on your own computer before `npm run dev`.
 */
import { readFile, mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE = process.env.ASSET_SOURCE || "https://expo26.uandiedu.com";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");

const content = await readFile(path.join(root, "content/site.ts"), "utf8");
const found = [...content.matchAll(/"(\/[^"]+\.(?:png|jpe?g|JPG|JPEG|gif|webp|svg|mp4|webm|ico))"/g)].map((m) => m[1]);
const assets = [...new Set([...found, "/favicon.ico"])];

let ok = 0,
  skipped = 0,
  failed = [];

for (const rel of assets) {
  const dest = path.join(pub, rel);
  try {
    await access(dest);
    skipped++;
    continue;
  } catch {}
  const url = SOURCE + rel.split("/").map(encodeURIComponent).join("/");
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log("✓", rel);
  } catch (e) {
    failed.push(`${rel}  (${e.message})`);
    console.log("✗", rel, e.message);
  }
}

console.log(`\nDownloaded ${ok}, already present ${skipped}, failed ${failed.length}.`);
if (failed.length) {
  console.log("Failed files — save these manually from the live site into /public:\n  " + failed.join("\n  "));
  process.exitCode = 1;
}
