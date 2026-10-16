#!/usr/bin/env node
/**
 * Phase 4b — full inline CSS externalizer for remaining pages.
 * Extracts every remaining inline <style> block into <page>.css, preserving
 * cascade order by concatenating blocks sequentially. <link> is placed where
 * the FIRST block was, so order relative to other <link> tags is unchanged.
 * Idempotent. Usage: node scripts/externalize-css.mjs <page.html>...
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage");
const pages = process.argv.slice(2);
if (!pages.length) { console.error("Usage: node scripts/externalize-css.mjs <page.html>..."); process.exit(1); }

for (const page of pages) {
  const p = join(ROOT, page);
  let html = readFileSync(p, "utf8");
  const outCss = `samyoj-${basename(page, extname(page))}.css`;

  if (html.includes(`href="${outCss}"`)) { console.log(`= ${page} already externalized`); continue; }

  const blocks = [...html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi)];
  if (!blocks.length) { console.log(`= ${page}: no inline styles`); continue; }

  // Concatenate in document order, tagging provenance
  let css = `/* ${page} — page-specific styles extracted from inline <style> blocks.\n   See doc/SEO-GEO-MASTER-PLAN.md §4.4. Blocks concatenated in original order. */\n`;
  for (const [i, m] of blocks.entries()) {
    css += `\n/* ===== original inline block #${i + 1} (${(m[0].length / 1024).toFixed(1)} KB) ===== */\n` + m[0].replace(/^<style[^>]*>/i, "").replace(/<\/style>$/i, "").trim() + "\n";
  }

  // Replace first block with the link, remove the rest
  let first = true;
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, () => {
    if (first) { first = false; return `<link rel="stylesheet" href="${outCss}">`; }
    return "";
  });
  if (first) { console.error(`✗ ${page}: replacement failed`); continue; }

  writeFileSync(join(ROOT, outCss), css, "utf8");
  writeFileSync(p, html, "utf8");
  console.log(`✓ ${page}: ${blocks.length} blocks → ${outCss} (${(css.length / 1024).toFixed(0)} KB)`);
}
