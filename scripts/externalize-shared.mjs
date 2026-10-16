#!/usr/bin/env node
/**
 * Phase 4 — shared-chrome CSS externalizer (SEO plan §4.4, targeted)
 * Extracts ONLY the duplicated ~34.5KB site-chrome <style> block (body{margin:0}…)
 * present identically on all core pages into samyoj-shared-chrome.css.
 * All other inline styles remain (page-specific, no cross-page cost).
 * Idempotent: pages whose chrome block is already externalized are skipped.
 * Usage: node scripts/externalize-shared.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage");
const PAGES = ["index.html", "features.html", "pricing.html", "industries.html", "contact.html", "blog.html"];
const OUT = "samyoj-shared-chrome.css";
const hasChrome = (s) => /body\s*\{\s*margin:\s*0;/.test(s) && /--wr-max/.test(s);

// reference extraction from index.html
const idxHtml = readFileSync(join(ROOT, "index.html"), "utf8");
let reference = null;
for (const m of idxHtml.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
  if (hasChrome(m[1]) && m[1].length > 30 * 1024) { reference = m[1]; break; }
}
if (!reference) { console.error("Reference chrome block not found in index.html"); process.exit(1); }
const refSize = reference.length;

// write the shared stylesheet once
writeFileSync(join(ROOT, OUT), `/* Shared site-chrome styles (nav/drawer/footer/magic-bar base).\n   Extracted from duplicated inline blocks — see doc/SEO-GEO-MASTER-PLAN.md §4.4 */\n` + reference.trim() + "\n", "utf8");
console.log(`✓ wrote ${OUT} (${(refSize / 1024).toFixed(1)} KB)`);

const linkTag = `<link rel="stylesheet" href="${OUT}">`;
let done = 0, skipped = 0;

for (const page of PAGES) {
  const p = join(ROOT, page);
  let html = readFileSync(p, "utf8");
  if (html.includes(`href="${OUT}"`)) { skipped++; console.log(`  = ${page} already external`); continue; }

  // find THE matching block (largest style block containing the marker)
  const blocks = [...html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi)];
  const target = blocks
    .filter(m => hasChrome(m[0]) && m[0].length > 30 * 1024)
    .sort((a, b) => b[0].length - a[0].length)[0];
  if (!target) { console.log(`  ✗ ${page}: chrome block not found (skip)`); continue; }

  html = html.replace(target[0], linkTag);
  // insert link before the first existing <link rel="stylesheet" so cascade order is preserved:
  // (replace-in-place is already where the block was — order kept)
  writeFileSync(p, html, "utf8");
  done++;
  const kb = (target[0].length / 1024).toFixed(1);
  console.log(`  ✓ ${page}: removed ${kb} KB inline (link in place)`);
}

console.log(`\nExternalized on ${done} pages, ${skipped} already done.`);
// byte savings across pages:
console.log(`Estimated savings: ~${((done * refSize) / 1024).toFixed(0)} KB total page weight, first-visit parity via cache afterwards.`);
