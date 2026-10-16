#!/usr/bin/env node
// Align tel: hrefs with visible Sales/Support labels in blog footers.
// node scripts/fix-blog-tel.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage", "blog");

for (const f of readdirSync(ROOT)) {
  if (!f.endsWith(".html") || f === "blog-template.html") continue;
  const p = join(ROOT, f);
  let html = readFileSync(p, "utf8");
  const orig = html;
  // Sales display label carries tel:+918839888531 -> align href to sales number 8305369467
  html = html.split('href="tel:+918839888531">Sales: +91 8305369467').join('href="tel:+918305369467">Sales: +91 8305369467');
  if (html !== orig) {
    writeFileSync(p, html);
    console.log("✓ " + f);
  }
}
console.log("done");
