#!/usr/bin/env node
/**
 * Adds/updates <lastmod> in sitemap.xml from git last-commit dates. SEO plan §3.14
 * Usage: node scripts/sitemap-lastmod.mjs
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage");
const map = {
  "": "index.html",
  "features": "features.html",
  "pricing": "pricing.html",
  "industries": "industries.html",
  "contact": "contact.html",
  "blog": "blog.html",
  "legal/privacy-policy": "legal/privacy-policy.html",
  "legal/terms-and-conditions": "legal/terms-and-conditions.html",
  "legal/cookie-policy": "legal/cookie-policy.html",
  "legal/refund-cancellation-policy": "legal/refund-cancellation-policy.html",
  "legal/acceptable-use-policy": "legal/acceptable-use-policy.html",
};

// blog slugs auto-mapped from files
for (const f of execSync(`git ls-files samyoj-homepage/blog`, { cwd: join(ROOT, ".."), encoding: "utf8" }).trim().split("\n")) {
  const base = f.split("/").pop();
  if (base.endsWith(".html") && base !== "blog-template.html") {
    map["blog/" + base.replace(".html", "")] = f.replace("samyoj-homepage/", "");
  }
}

let xml = readFileSync(join(ROOT, "sitemap.xml"), "utf8");
let updated = 0;

for (const [urlPath, file] of Object.entries(map)) {
  const loc = `https://samyoj.com/${urlPath}`;
  const urlBlockRe = new RegExp(`(<url>\\s*<loc>${loc.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}</loc>)([\\s\\S]*?)(</url>)`);
  const m = xml.match(urlBlockRe);
  if (!m) { console.warn(`skip (not found): ${loc}`); continue; }
  let block = m[0];
  let iso;
  try {
    iso = execSync(`git log -1 --format=%cI -- "samyoj-homepage/${file}"`, { cwd: join(ROOT, ".."), encoding: "utf8" }).trim();
  } catch { iso = ""; }
  if (!iso) iso = new Date().toISOString();
  const dateOnly = iso.slice(0, 10);
  if (/<lastmod>/.test(block)) {
    block = block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${dateOnly}</lastmod>`);
  } else {
    block = block.replace("</url>", `<lastmod>${dateOnly}</lastmod></url>`);
  }
  xml = xml.replace(m[0], block);
  updated++;
}

writeFileSync(join(ROOT, "sitemap.xml"), xml);
console.log(`Updated lastmod on ${updated} URLs.`);
