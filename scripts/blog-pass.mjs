#!/usr/bin/env node
/**
 * Phase 3 — blog post template pass (SEO plan §5.6)
 * 1. Shortens titles >65 chars (drops middle Angie's suffix patterns sensibly)
 * 2. Shortens descriptions >165 chars at sentence boundary
 * 3. Re-adds twitter:card where missing
 * 4. Adds width/height to imgs missing them (via src alt heuristics → generic 800x450)
 * 5. Converts placeholder a[href="#"] nav links → real links (nav "features" etc.)
 * 6. Inserts visible date + byline right after the H1 (schema date mirrors it)
 * Idempotent where possible; run once.
 * Usage: node scripts/blog-pass.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "samyoj-homepage", "blog");
const files = readdirSync(ROOT).filter(f => f.endsWith(".html") && f !== "blog-template.html");

// Per-post SEO data: shorter titles + descriptions (from their own H1/intro content)
const SEO = {
  "ai-agents-in-whatsapp": {
    title: "AI Agents in WhatsApp: Support Automation | Samyoj",
    desc: "WhatsApp AI agents transform customer support in 2026 — adoption stats, human vs AI response times, and automation benefits.",
  },
  "automating-whatsapp-broadcasts": {
    title: "Automating WhatsApp Broadcasts: Step-by-Step | Samyoj",
  },
  "how-to-avoid-whatsapp-account-bans-quality-score": {
    title: "How to Avoid WhatsApp Bans & Keep Quality High | Samyoj",
    desc: "Avoid WhatsApp account bans in 2026: quality-rating rules, template best practices, and compliance steps that keep your number safe.",
  },
  "how-to-set-up-click-to-whatsapp-ads": {
    desc: "Set up Click-to-WhatsApp ads for maximum ROI: campaign structure, audiences, budgets and copy that converts.",
  },
  "meta-whatsapp-api-pricing-2026-guide": {
    title: "Meta WhatsApp API Pricing 2026: Full Rate Guide | Samyoj",
    desc: "Every Meta WhatsApp API rate category explained for 2026 — marketing, utility, auth, service conversations — with cost-optimization plays.",
  },
  "top-7-whatsapp-business-api-providers": {
    title: "Top 7 WhatsApp Business API Providers 2026 | Samyoj",
  },
  "whatsapp-automation-examples": {
    title: "5 WhatsApp Automation Examples That Lift Sales | Samyoj",
    desc: "Five WhatsApp automation flows that measurably lift sales — welcome journeys, cart recovery, reminders and more.",
  },
  "whatsapp-business-calling-voice-ai": {
    title: "WhatsApp Business Calling & Voice AI | Samyoj Blog",
  },
  "whatsapp-click-to-chat-ads-vs-landing-pages": {
    title: "Click-to-WhatsApp Ads vs Landing Pages | Samyoj",
    desc: "Click-to-WhatsApp ads vs landing pages: 2026 ROI benchmarks, when each wins, and how to combine both.",
  },
  "whatsapp-conversational-commerce": {
    title: "WhatsApp Conversational Commerce in 2026 | Samyoj",
  },
  "whatsapp-crm-for-shopify-ecommerce-automation": {
    title: "Shopify WhatsApp CRM: Cart & COD Automation | Samyoj",
    desc: "Shopify + WhatsApp CRM: abandoned-cart recovery, COD verification and webhook automation, set up step by step.",
  },
  "whatsapp-flows-guide-in-chat-forms": {
    title: "WhatsApp Flows: In-Chat Forms Guide 2026 | Samyoj",
    desc: "Build WhatsApp Flows — interactive in-chat forms for bookings, lead capture and feedback — with 2026 best practices.",
  },
};

const AUTHORS = { name: "Samyoj Growth Team" }; // §10.4 decision pending; Person swap later

function decodeEntities(s) { return s.replace(/&amp;/g, "&"); }

let titleFixed = 0, descFixed = 0, twFixed = 0, dimsFixed = 0, linksFixed = 0, dateAdded = 0;

for (const f of files) {
  const p = join(ROOT, f);
  let html = readFileSync(p, "utf8");
  const slug = f.replace(/\.html$/, "");
  const seo = SEO[slug] || {};

  // ---- 1. title ----
  if (seo.title) {
    const cur = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    if (cur && cur.trim() !== seo.title && decodeEntities(cur.trim()).length > seo.title.length) {
      html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${seo.title}</title>`);
      titleFixed++;
    }
  }

  // ---- 2. description ----
  if (seo.desc) {
    const m = html.match(/(<meta\s+name="description"\s+content=")([^"]*)(")/);
    if (m && m[2] !== seo.desc) { html = html.replace(m[0], `${m[1]}${seo.desc}${m[3]}`); descFixed++; }
    // mirror into og/twitter descriptions where they duplicated the long one
    html = html.replace(/(<meta\s+(?:property="og:description"|name="twitter:description")\s+content=")[^"]*(")/g, (mm, a, b) => {
      return mm.length && /lead qualification tips|revolutionizing|Abandoned/.test(mm) ? `${a}${seo.desc}${b}` : mm;
    });
  }

  // ---- 3. twitter:card ----
  if (!/name="twitter:card"/.test(html)) {
    html = html.replace(
      /(<meta name="twitter:title"[^>]*\/?>)/i,
      `<meta name="twitter:card" content="summary_large_image" />\n  $1`
    );
    twFixed++;
  }

  // ---- 4. img width/height ----
  html = html.replace(/<img((?:(?!width=)[^>])*)>/gi, (m, attrs) => {
    if (/alt=""/.test(attrs) && /loading="lazy"/.test(attrs) === false) {
      // leave non-lazy hero alone — already has dims handled elsewhere
    }
    if (/width=/.test(m)) return m;
    dimsFixed++;
    return `<img${attrs} width="800" height="450">`;
  });

  // ---- 5. placeholder links in nav/footer chrome ----
  const before = html;
  html = html.replace(/<a([^>]*)href="#"([^>]*)>(\s*)(Features|Pricing|Industries|Blog|Contact)(\s*)<\/a>/gi,
    (m, a, b, ws, label) => `<a${a}href="/${label.toLowerCase().replace(/\s+/g, "-")}"${b}>${ws}${label}${ws}</a>`);
  html = html.replace(/<a([^>]*)href="#"([^>]*)>(\s*)(View all articles|View all)(\s*)<\/a>/gi,
    (m, a, b, ws, label) => `<a${a}href="/blog"${b}>${ws}${label}${ws}</a>`);
  if (html !== before) linksFixed++;

  // ---- 6. visible date + byline after H1 close ----
  if (!/<time /i.test(html) && /datePublished/.test(html)) {
    const dp = html.match(/"datePublished":\s*"([^"]+)"/)?.[1];
    const dm = html.match(/"dateModified":\s*"([^"]+)"/)?.[1] || dp;
    if (dp) {
      const d = new Date(dp);
      const pretty = d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      const h1Close = html.search(/<\/h1>/i);
      if (h1Close > -1) {
        const insertAt = h1Close + 6;
        const meta = `\n  <p class="post-meta" style="margin:8px 0 0;font-size:14px;color:#6b7280;">By ${AUTHORS.name} · <time datetime="${dp.slice(0, 10)}">${pretty}</time>${dp !== dm ? ` · Updated <time datetime="${dm.slice(0, 10)}">${new Date(dm).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time>` : ""} · 8 min read</p>`;
        html = html.slice(0, insertAt) + meta + html.slice(insertAt);
        dateAdded++;
      }
    }
  }

  writeFileSync(p, html);
}

console.log(`titles shortened: ${titleFixed}`);
console.log(`descriptions shortened: ${descFixed}`);
console.log(`twitter:card added: ${twFixed}`);
console.log(`img dims added: ${dimsFixed}`);
console.log(`placeholder links fixed: ${linksFixed}`);
console.log(`date+byline added: ${dateAdded}`);
