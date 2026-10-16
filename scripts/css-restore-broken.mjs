#!/usr/bin/env node
/**
 * RESTORE pricing/industries/blog CSS from git ref 67f1b15 (user's known-good state).
 * Rebuilds one ALL-in-one external css per page (original block order preserved),
 * replaces current inline styles + old samyoj links with a single link in place of
 * the FIRST original-position block. All non-style page edits stay untouched.
 * index/features/contact are NOT touched (already proven byte-identical).
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const WS = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = join(WS, "samyoj-homepage");
const REF = "67f1b15";
const PAGES = ["pricing.html", "industries.html", "blog.html"];

const gitHtml = (p) =>
  execFileSync("git", ["show", `${REF}:samyoj-homepage/${p}`], { cwd: WS, encoding: "utf8" });
const inner = (block) => block.replace(/^<style[^>]*>/i, "").replace(/<\/style>$/i, "").replace(/^\r?\n/, "").replace(/\s+$/, "");
const origBlocks = (p) => [...gitHtml(p).matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi)].map((m) => inner(m[0]));

for (const page of PAGES) {
  const base = page.replace(/\.html$/, "");
  const outCss = `samyoj-${base}-all.css`;
  const blocks = origBlocks(page);

  // ---- sanity: chrome block must exist among originals ----
  const chrome = blocks.find((c) => c.length > 25 * 1024 && (/^body\s*\{/.test(c.trim()) || /^\*:not\(header/.test(c.trim())));
  if (!chrome) { console.error(`✗ ${page}: chrome block not found in ${REF} — aborting`); continue; }

  // ---- write single ordered stylesheet ----
  let css = `/* ${page} — complete stylesheet reconstructed from git ${REF} (user-verified design).\n   All inline blocks in original document order. Do not reorder. */\n`;
  blocks.forEach((c, i) => { css += `\n/* ===== original block #${i + 1} (${(c.length / 1024).toFixed(1)} KB) ===== */\n` + c + "\n"; });
  writeFileSync(join(ROOT, outCss), css, "utf8");

  // ---- html surgery on CURRENT file ----
  const p = join(ROOT, page);
  let html = readFileSync(p, "utf8");

  // 1) remove old samyoj css links
  html = html.replace(/[ \t]*<link[^>]*href="samyoj[^"]*\.css"[^>]*>\r?\n?/gi, "");

  // 2) replace FIRST inline style block with the link, drop the rest
  let first = true;
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, () => {
    if (first) { first = false; return `<link rel="stylesheet" href="${outCss}">`; }
    return "";
  });
  if (first) { console.error(`✗ ${page}: no inline style block found to anchor link`); continue; }

  writeFileSync(p, html, "utf8");

  // 3) clean superseded per-page css files
  for (const stale of [`samyoj-${base}-chrome.css`, `samyoj-${base}-early.css`, `samyoj-${base}-main.css`, `samyoj-${base}.css`]) {
    const sp = join(ROOT, stale);
    if (existsSync(sp)) { unlinkSync(sp); }
  }

  const links = [...html.matchAll(/href="(samyoj[^"]+\.css)"/g)].map((m) => m[1]);
  console.log(`✓ ${page}: ${blocks.length} original blocks → ${outCss} (${(css.length / 1024).toFixed(0)} KB); links now: ${links.join(", ") || "(none)"}`);
}

// ---- delete now-unused shared chrome if only index uses it (it does — keep) ----
console.log("done. Run: node scripts/css-equivalence-check.mjs");
