#!/usr/bin/env node
/**
 * Repairs blog post heads: re-adds canonical, robots, hreflang tags stripped by the
 * over-greedy keywords regex, and swaps og:image to the new /og/ cards.
 * Idempotent: skips tags that already exist.
 * Usage: node scripts/repair-blog-heads.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage", "blog");
const SITE = "https://samyoj.com";

const files = readdirSync(ROOT).filter(f => f.endsWith(".html") && f !== "blog-template.html");
let touched = 0;

for (const f of files) {
  const p = join(ROOT, f);
  let html = readFileSync(p, "utf8");
  const slug = f.replace(/\.html$/, "");
  const cleanTitle = (html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? slug).trim();
  const orig = html;

  // swap blog JPG og images → new cards (both og + twitter)
  html = html.replace(/content="https:\/\/samyoj\.com\/images\/blog_[^"]+\.jpg"/g, `content="https://samyoj.com/images/og/${slug}-og.png"`);

  if (!/rel="canonical"/.test(html)) {
    html = html.replace(
      /(<meta charset="utf-8">)/i,
      `$1\n  <link rel="canonical" href="${SITE}/blog/${slug}" />`
    );
  }
  if (/rel="canonical"/.test(html) && !/name="robots"/.test(html)) {
    html = html.replace(
      /(<link rel="canonical"[^>]*\/>)/i,
      `$1\n  <meta name="robots" content="index, follow, max-image-preview:large" />`
    );
  }
  if (!/hreflang=/.test(html)) {
    html = html.replace(
      /(<link rel="canonical"[^>]*\/>)/i,
      `$1\n  <link rel="alternate" hreflang="en" href="${SITE}/blog/${slug}" />\n  <link rel="alternate" hreflang="x-default" href="${SITE}/blog/${slug}" />`
    );
  }
  if (!/og:image:width/.test(html) && /property="og:image"/.test(html)) {
    html = html.replace(
      /(<meta property="og:image" content="[^"]*" \/>)/i,
      `$1\n  <meta property="og:image:width" content="1200" />\n  <meta property="og:image:height" content="630" />\n  <meta property="og:image:alt" content="${cleanTitle.replace(/"/g, "&quot;")}" />`
    );
  }

  if (html !== orig) {
    writeFileSync(p, html);
    touched++;
    console.log("✓ repaired " + f);
  } else {
    console.log("  unchanged " + f);
  }
}
console.log(`\n${touched} blog post head(s) repaired.`);
