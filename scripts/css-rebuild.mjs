#!/usr/bin/env node
/**
 * Phase 4 corrective — CASCADE-ORDER-SAFE CSS rebuild (supersedes externalize-shared.mjs)
 *
 * Problems fixed:
 *  1. externalize-shared.mjs wrote ONE shared file from index's chrome block, but
 *     pricing (58.9 KB) / contact (36.3 KB) / blog (31.3 KB) chrome blocks differ
 *     → those pages silently LOST styles.
 *  2. externalize-css.mjs placed the page CSS link where the FIRST style block was
 *     (before the chrome link) → page-specific rules now LOSE cascade ties to chrome,
 *     inverting the original order (chrome originally came after block #1 but before
 *     section styles — order preserved exactly now via -early / chrome / -main).
 *
 * What it does (idempotent):
 *  - Reads ORIGINAL block layout from git ref 67f1b15 (pre-externalization).
 *  - Per page: splits blocks into preChrome / chromeBlock / postChrome.
 *  - Writes samyoj-<page>-early.css (pre-chrome) and samyoj-<page>-main.css (post-chrome)
 *    for pages in FULL_EXTERNALIZE. Other pages keep their post blocks inline (safe).
 *  - If a page's chrome block is byte-identical (normalized) to samyoj-shared-chrome.css
 *    it reuses shared; otherwise writes samyoj-<page>-chrome.css with the page's own
 *    chrome bytes so nothing is lost.
 *  - Rewrites the <link> tags in the CURRENT html (preserving all other edits) so the
 *    final link order equals the original style-block order.
 */
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const WS = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = join(WS, "samyoj-homepage");
const REF = "67f1b15";
const PAGES = ["index.html", "features.html", "pricing.html", "industries.html", "contact.html", "blog.html"];
// pages whose post-chrome blocks stay externalized (previously done + verified visually);
// others keep post blocks inline — exact original cascade guaranteed either way
const FULL_EXTERNALIZE = new Set(["index.html", "features.html", "contact.html"]);

const norm = (s) => s.replace(/\r\n/g, "\n").trim();
const stripCssHeader = (css) => css.replace(/^\/\*[\s\S]*?\*\/\s*/, "");
const inner = (block) => block.replace(/^<style[^>]*>/i, "").replace(/<\/style>$/i, "").trim();

for (const page of PAGES) {
  const base = page.replace(/\.html$/, "");
  const out = [];

  // ---------- original block geometry ----------
  const orig = execFileSync("git", ["show", `${REF}:samyoj-homepage/${page}`], { cwd: WS, encoding: "utf8" });
  const blocks = [...orig.matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi)]
    .map((m) => ({ start: m.index, end: m.index + m[0].length, raw: m[0] }));
  const chrome = blocks.find((b) => b.raw.length > 30 * 1024 && /body\s*\{[^}]*margin:\s*0/.test(b.raw));
  if (!chrome) { console.error(`✗ ${page}: chrome block not found in ${REF}`); continue; }
  const pre = blocks.filter((b) => b.end <= chrome.start);
  const post = blocks.filter((b) => b.start >= chrome.end);

  // ---------- shared vs per-page chrome ----------
  const sharedPath = join(ROOT, "samyoj-shared-chrome.css");
  const sharedInner = norm(stripCssHeader(readFileSync(sharedPath, "utf8")));
  const chromeInner = inner(chrome.raw);
  const useShared = chromeInner === sharedInner;
  const chromeHref = useShared ? "samyoj-shared-chrome.css" : `samyoj-${base}-chrome.css`;
  if (!useShared) {
    writeFileSync(join(ROOT, `samyoj-${base}-chrome.css`), chromeInner + "\n", "utf8");
    out.push(`chrome: own variant (${(chrome.raw.length / 1024).toFixed(1)} KB) — differs from shared`);
  } else {
    out.push(`chrome: reuses samyoj-shared-chrome.css`);
  }

  // ---------- early / main css (only for FULL_EXTERNALIZE pages) ----------
  const earlyLink = `<link rel="stylesheet" href="samyoj-${base}-early.css">`;
  const mainLink = `<link rel="stylesheet" href="samyoj-${base}-main.css">`;
  if (FULL_EXTERNALIZE.has(page)) {
    if (pre.length) {
      writeFileSync(join(ROOT, `samyoj-${base}-early.css`),
        `/* ${page} — styles that originally preceded the shared chrome block (order-critical). */\n`
        + pre.map((b, i) => `/* original block #${blocks.indexOf(b) + 1} */\n` + inner(b.raw)).join("\n\n") + "\n");
    } else if (existsSync(join(ROOT, `samyoj-${base}-early.css`))) unlinkSync(join(ROOT, `samyoj-${base}-early.css`));

    if (post.length) {
      writeFileSync(join(ROOT, `samyoj-${base}-main.css`),
        `/* ${page} — page styles that originally came AFTER the shared chrome block (order-critical). */\n`
        + post.map((b) => `/* original block #${blocks.indexOf(b) + 1} (${(b.raw.length / 1024).toFixed(1)} KB) */\n` + inner(b.raw)).join("\n\n") + "\n");
    } else if (existsSync(join(ROOT, `samyoj-${base}-main.css`))) unlinkSync(join(ROOT, `samyoj-${base}-main.css`));

    // remove superseded single-file css
    for (const stale of [`samyoj-${base}.css`]) {
      const p = join(ROOT, stale);
      if (existsSync(p)) { unlinkSync(p); out.push(`removed stale ${stale}`); }
    }
  }

  // ---------- html link surgery (on CURRENT file) ----------
  const p = join(ROOT, page);
  let html = readFileSync(p, "utf8");
  const oldPageLink = `<link rel="stylesheet" href="samyoj-${base}.css">`;
  const oldChromeLink = `<link rel="stylesheet" href="samyoj-shared-chrome.css">`;

  if (FULL_EXTERNALIZE.has(page)) {
    if (html.includes(oldPageLink)) {
      html = html.split(oldPageLink).join(pre.length ? earlyLink : "");
    } else if (pre.length && !html.includes(earlyLink)) {
      console.error(`✗ ${page}: expected old page css link not found — manual check needed`); continue;
    }
    if (html.includes(oldChromeLink)) {
      html = html.split(oldChromeLink).join(`<link rel="stylesheet" href="${chromeHref}">`
        + (post.length ? "\n    " + mainLink : ""));
    } else if (!html.includes(chromeHref)) {
      console.error(`✗ ${page}: chrome link not found — manual check needed`); continue;
    }
  } else {
    // chrome-only pages: just swap link if variant needed
    if (html.includes(oldChromeLink) && !useShared) {
      html = html.split(oldChromeLink).join(`<link rel="stylesheet" href="${chromeHref}">`);
    }
  }
  writeFileSync(p, html, "utf8");

  // ---------- report final link order ----------
  const links = [...html.matchAll(/<link[^>]*href="(samyoj[^"]*\.css)"/g)].map((m) => m[1]);
  out.push(`link order: ${links.join("  →  ") || "(none)"}`);
  console.log(`✓ ${page}\n    ${out.join("\n    ")}`);
}
console.log("\nDone. Next: verify with npm run seo:audit + browser layout diff vs " + REF);
