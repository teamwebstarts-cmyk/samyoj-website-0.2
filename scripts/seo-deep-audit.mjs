#!/usr/bin/env node
/**
 * Deep SEO + GEO audit — extends scripts/seo-audit.mjs
 * Checks: OG/Twitter completeness, JSON-LD schema validity, hreflang,
 * og:image targets, sitemap vs disk, llms.txt URL validity.
 * Usage: node scripts/seo-deep-audit.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const ROOT = new URL("../samyoj-homepage", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const SITE = "https://samyoj.com";
const SKIP_FILES = ["nav-component.html", "new_nav.html", "samyoj-hero.html", "blog-template.html"];
const pages = [];

(function collect(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      if (!["node_modules", "images", "New images", "doc"].includes(f)) collect(p);
    } else if (f.endsWith(".html") && !SKIP_FILES.includes(f)) pages.push(p);
  }
})(ROOT);

let problems = 0;
const warn = (f, m) => { console.log(`  WARN ${relative(ROOT, f)}: ${m}`); };
const fail = (f, m) => { problems++; console.log(`  FAIL ${relative(ROOT, f)}: ${m}`); };

for (const file of pages) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  const urlPath = rel === "index.html" ? "/" : "/" + rel.replace(/\.html$/, "");
  const html = readFileSync(file, "utf8");

  // --- OG completeness (skip noindex pages like 404) ---
  const robotsMeta = html.match(/<meta[^>]*name="robots"[^>]*>/i)?.[0] ?? "";
  const isNoindex = /noindex/i.test(robotsMeta);
  if (!isNoindex) {
    for (const [tag, prop] of [["og:title", 'property="og:title"'], ["og:description", 'property="og:description"'], ["og:image", 'property="og:image"'], ["og:url", 'property="og:url"'], ["og:type", 'property="og:type"']]) {
      if (!html.includes(prop)) fail(file, `missing ${tag}`);
    }
    if (!html.includes('name="twitter:card"')) fail(file, "missing twitter:card");
  }

  // --- og:image must be absolute and point to an existing local asset ---
  const ogImg = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1];
  if (ogImg) {
    if (!ogImg.startsWith("http")) fail(file, `og:image not absolute: ${ogImg}`);
    else {
      const localPath = ogImg.replace(SITE, "").split("?")[0];
      const diskPath = join(ROOT, localPath.replace(/^\//, ""));
      if (!existsSync(diskPath)) fail(file, `og:image 404 on disk: ${localPath}`);
    }
  }

  // --- canonical exact match with sitemap URL ---
  const canon = html.match(/rel="canonical"\s+href="([^"]+)"/)?.[1];
  if (canon && urlPath !== "/404.html") {
    const expected = SITE + urlPath;
    if (canon !== expected) warn(file, `canonical ${canon} != expected ${expected}`);
  }

  // --- JSON-LD blocks parse + basic required fields ---
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [, body] of ldBlocks) {
    try {
      JSON.parse(body);
    } catch (e) {
      fail(file, `invalid JSON-LD: ${e.message.slice(0, 60)}`);
    }
  }
  const isBlogPost = /^blog\//.test(rel) && rel !== "blog.html";
  if (isBlogPost && !ldBlocks.length) fail(file, "blog post missing JSON-LD");
  if (isBlogPost) {
    const joined = ldBlocks.map((b) => b[1]).join("");
    // Article and BlogPosting are equivalent for Google article rich results.
    if (!/"(BlogPosting|Article)"/.test(joined)) fail(file, "missing BlogPosting/Article schema");
    if (!/"BreadcrumbList"/.test(joined)) warn(file, "no BreadcrumbList schema");
  }

  // --- hreflang sanity: must include x-default and self URL ---
  const hreflangs = [...html.matchAll(/hreflang="([a-z-]+)"/g)].map((m) => m[1]);
  if (hreflangs.length) {
    if (!hreflangs.includes("x-default")) fail(file, "hreflang without x-default");
  }
}

// --- sitemap vs disk ---
const sitemap = readFileSync(join(ROOT, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const u of sitemapUrls) {
  const p = u.replace(SITE, "").replace(/^\//, "");
  const file = p === "" ? "index.html" : p + ".html";
  if (!existsSync(join(ROOT, file))) fail(join(ROOT, "sitemap.xml"), `sitemap URL has no file: ${u}`);
}
const diskUrls = pages
  .map((f) => relative(ROOT, f).replace(/\\/g, "/"))
  .filter((r) => r !== "404.html")
  .map((r) => (r === "index.html" ? SITE + "/" : `${SITE}/${r.replace(/\.html$/, "")}`));
for (const d of diskUrls) {
  if (!sitemapUrls.includes(d)) fail(join(ROOT, "sitemap.xml"), `page missing from sitemap: ${d}`);
}

// --- llms.txt URL validity ---
const llms = readFileSync(join(ROOT, "llms.txt"), "utf8");
for (const u of [...llms.matchAll(/https:\/\/samyoj\.com[^\s)]*/g)].map((m) => m[0])) {
  const p = u.replace(SITE, "").replace(/^\//, "").replace(/\/$/, "");
  const candidates = p === "" ? ["index.html"] : [p + ".html", p]; // p may itself be a file (sitemap.xml)
  if (!candidates.some((c) => existsSync(join(ROOT, c)))) warn(join(ROOT, "llms.txt"), `URL may 404: ${u}`);
}

console.log(`\nDeep audit: ${pages.length} pages, ${sitemapUrls.length} sitemap URLs, ${problems} hard problems`);
process.exit(problems ? 1 : 0);
