#!/usr/bin/env node
/**
 * Samyoj SEO Audit Script (POC tooling for SEO-GEO-MASTER-PLAN.md §9)
 * -------------------------------------------------------------------
 * Static analysis of all site HTML files — no server needed.
 * Usage:  node scripts/seo-audit.mjs
 * Exit code 1 when CRITICAL issues exist (CI-friendly).
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("../samyoj-homepage", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SITE = "https://samyoj.com";
const issues = [];
const ok = [];
const pages = [];
const SKIP_DIRS = ["images", "New images", "doc", "node_modules", "legal"];
const SKIP_FILES = ["nav-component.html", "new_nav.html", "samyoj-hero.html", "blog-template.html"];

function collect(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      if (!SKIP_DIRS.includes(f)) collect(p);
    } else if (f.endsWith(".html") && !SKIP_FILES.includes(f)) {
      pages.push(p);
    }
  }
}
collect(ROOT);

function metaTag(html, needle) {
  const re = new RegExp(`<meta[^>]*${needle}[^>]*>`, "i");
  return html.match(re)?.[0] ?? null;
}
function metaContent(html, name, prop = false) {
  const tag = metaTag(html, prop ? `property="${name}"` : `name="${name}"`);
  if (!tag) return null;
  return tag.match(/content="([^"]*)"/i)?.[1] ?? null;
}
const isBlogPost = (rel) => /^blog[\\/]/.test(rel) && rel !== "blog.html";

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  const urlPath = rel === "index.html" ? "/" : "/" + rel.replace(/\.html$/, "");
  const P = [];

  // ---------- robots meta / noindex handling (must precede tag checks) ----------
  const robots = metaContent(html, "robots");
  const isNoindex = Boolean(robots && /noindex/i.test(robots));
  const skipSEOTags = isNoindex;

  // ---------- title ----------
  const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "");
  if (!title) P.push("missing <title>");
  else if (!skipSEOTags && title.length > 65) P.push(`title ${title.length} chars (>65, truncates in SERP)`);
  else if (!skipSEOTags && title.length < 30) P.push(`title only ${title.length} chars (<30)`);

  // ---------- meta description ----------
  if (!skipSEOTags) {
    const desc = decode(metaContent(html, "description") ?? "");
    if (!desc) P.push("missing meta description");
    else if (desc.length > 165) P.push(`description ${desc.length} chars (>165)`);
    else if (desc.length < 100) P.push(`description only ${desc.length} chars (<100)`);
  }

  // ---------- canonical ----------
  if (!skipSEOTags) {
    const canon = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
    if (!canon) P.push("missing canonical");
    else {
      if (!canon.startsWith("https://samyoj.com")) P.push(`canonical not samyoj.com domain: ${canon}`);
      if (canon.endsWith(".html")) P.push(`canonical ends in .html: ${canon}`);
    }
  }

  if (isNoindex) {
    // Utility pages (404 etc.): only verify they stay out of the index
  } else {
    if (!robots) P.push("missing robots meta");
    else if (!robots.includes("max-image-preview:large")) P.push("robots missing max-image-preview:large");
  }

  // ---------- og / twitter ----------
  const ogTitle = metaContent(html, "og:title", true);
  const ogImage = metaContent(html, "og:image", true);
  const ogType = metaContent(html, "og:type", true);
  const twCard = metaContent(html, "twitter:card");
  if (!isNoindex) {
    if (!ogTitle) P.push("missing og:title");
    if (!ogImage) P.push("missing og:image");
    else {
      const ogPath = ogImage.replace(SITE + "/", "");
      if (ogPath.includes("{{")) P.push("og:image contains TEMPLATE PLACEHOLDER");
      else if (!existsSync(join(ROOT, decodeURIComponent(ogPath)))) P.push(`og:image NOT ON DISK: ${ogPath}`);
      else {
        const sz = statSync(join(ROOT, decodeURIComponent(ogPath))).size;
        if (sz > 150 * 1024) P.push(`og:image ${(sz / 1024).toFixed(0)} KB (>150 KB target)`);
      }
    }
    if (ogImage && !metaContent(html, "og:image:width", true)) P.push("missing og:image:width");
    if (ogImage && !metaContent(html, "og:image:alt", true)) P.push("missing og:image:alt");
    if (!twCard) P.push("missing twitter:card");
    else if (twCard !== "summary_large_image") P.push(`twitter:card=${twCard} (want summary_large_image)`);
    if (isBlogPost(rel) && ogType !== "article") P.push(`og:type=${ogType} (want article on blog posts)`);
  }

  // ---------- hreflang ----------
  if (!isNoindex) {
    const hreflangs = [...html.matchAll(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*>/gi)].map(m => m[1]);
    if (!hreflangs.includes("en")) P.push("hreflang: missing en alternate");
    if (!hreflangs.includes("x-default")) P.push("hreflang: missing x-default");
  }

  // ---------- lang + h1 ----------
  if (!/<html[^>]*lang="en-IN"/i.test(html)) P.push('html tag missing lang="en-IN"');
  const h1s = [...html.matchAll(/<h1[\s>]/gi)].length;
  if (h1s === 0) P.push("no <h1> found");
  if (h1s > 1) P.push(`${h1s} <h1> tags (want exactly 1)`);

  // ---------- images ----------
  const imgs = [...html.matchAll(/<img[^>]*>/gi)];
  const noAltAttr = imgs.filter(t => !/alt="/i.test(t[0]));
  if (noAltAttr.length) P.push(`${noAltAttr.length}/${imgs.length} <img> missing alt attribute entirely (decorative images should have alt="")`);
  const noDims = imgs.filter(t => !/width="/i.test(t[0]) || !/height="/i.test(t[0]));
  if (noDims.length) P.push(`${noDims.length}/${imgs.length} <img> missing width/height (CLS risk)`);

  // ---------- dead links / legacy junk ----------
  const dead = [...html.matchAll(/<a[^>]*href="#"/gi)].length;
  if (dead) P.push(`${dead} placeholder a[href="#"] link(s)`);
  // template placeholder check: head region only ({{…}} in body copy = WhatsApp variable examples, fine)
  const headHtml = html.substring(0, html.indexOf("</head>"));
  if (headHtml.includes("{{")) P.push("template placeholder {{…}} leaked into <head>");
  if (/name="keywords"/i.test(html)) P.push("dead meta name=keywords present (remove)");

  // ---------- schema ----------
  const types = [];
  for (const b of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const d = JSON.parse(b[1]);
      (Array.isArray(d) ? d : [d]).forEach(x => {
        if (x && x["@graph"]) x["@graph"].forEach(g => g["@type"] && types.push(g["@type"]));
        else if (x && x["@type"]) types.push(x["@type"]);
      });
    } catch (e) {
      P.push("JSON-LD PARSE ERROR: " + String(e.message).slice(0, 80));
    }
  }
  if (isBlogPost(rel)) {
    if (!types.includes("Article") && !types.includes("BlogPosting")) P.push("blog post missing Article/BlogPosting schema");
    if (!types.includes("BreadcrumbList")) P.push("blog post missing BreadcrumbList schema");
  }
  if (!isNoindex) {
    if (rel === "blog.html" && types.length === 0) P.push("blog hub has ZERO schema (want CollectionPage+ItemList)");
    if (rel === "contact.html" && !types.includes("ContactPage")) P.push("contact missing ContactPage schema");
    if (rel === "index.html" && !types.includes("FAQPage")) P.push("home missing FAQPage schema");
    if (!types.includes("Organization") && !isBlogPost(rel)) P.push("missing Organization schema");
  }

  // ---------- inline CSS bloat ----------
  let styleBytes = 0;
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) styleBytes += m[1].length;
  const total = Buffer.byteLength(html);
  const pct = Math.round((styleBytes / total) * 100);
  if (styleBytes > 40 * 1024) P.push(`inline <style> ${(styleBytes / 1024).toFixed(0)} KB = ${pct}% of page (externalize)`);

  // ---------- record ----------
  if (P.length) issues.push({ page: rel, problems: P });
  else ok.push(rel);
}

// ---------------- report ----------------
const CRITICAL = /(NOT ON DISK|PLACEHOLDER|has ZERO schema|PARSE ERROR|missing <title>|missing canonical|no <h1>)/;
console.log(`\n SAMYOJ SEO AUDIT — ${new Date().toISOString().slice(0, 10)}`);
console.log(` Pages scanned: ${pages.length}  |  clean: ${ok.length}  |  with issues: ${issues.length}\n`);

issues.sort((a, b) => a.page.localeCompare(b.page));
for (const { page, problems } of issues) {
  console.log(` - ${page}`);
  problems.forEach(p => console.log(`     * ${p}`));
}
if (!issues.length) console.log(" All pages clean.");

console.log("\n Clean pages:");
ok.forEach(p => console.log(`   OK ${p}`));

const criticalHit = issues.some(i => i.problems.some(p => CRITICAL.test(p)));
console.log(`\n Result: ${criticalHit ? "CRITICAL issues present (exit 1)" : "No critical issues (exit 0)"}\n`);
process.exit(criticalHit ? 1 : 0);
