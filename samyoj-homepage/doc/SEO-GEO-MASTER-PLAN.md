# SAMYOJ SEO + GEO — MASTER IMPLEMENTATION PLAN

**Status:** 🟡 PREPARATION COMPLETE — awaiting go-ahead to execute
**Audit date:** Oct 16, 2026
**Method:** Live DOM inspection (Chrome DevTools) of `localhost:3000` for all 6 core pages + 4 blog posts, source-file analysis of all 27 HTML files, `og:` asset verification on disk, and October 2026 standards research (Google Search Central, web.dev, Ahrefs, Search Engine Land).

> This document **supersedes conflicting findings** in `AGGREGATE-SEO-GEO-AUDIT-REPORT.md` (Oct 13) where the live site has changed. Section 2 lists what is already fixed — do not re-fix it.

---

## Table of Contents
1. [Scorecard — verified live state](#1-scorecard)
2. [Already good — do NOT touch](#2-already-good)
3. [Verified issues (P0 / P1 / P2) with evidence](#3-verified-issues)
4. [Global playbooks + POC code](#4-global-playbooks)
5. [Page-by-page playbooks (the work queue)](#5-page-by-page-playbooks)
6. [Research annex — 2026 SEO/GEO standards (cited)](#6-research-annex)
7. [Anti-checklist — what NOT to do](#7-anti-checklist)
8. [Execution order & effort estimates](#8-execution-order)
9. [Verification protocol](#9-verification-protocol)
10. [Decisions needed from owner](#10-decisions-needed)

---

## 1. Scorecard

Verified live via CDP at `localhost:3000` (Vercel-clean URLs). Bytes measured from disk.

| Page | Title (len) | Meta desc (len) | Canonical | Schema present | Alt-text gaps | HTML weight | Inline CSS share | Grade |
|---|---|---|---|---|---|---|---|---|
| **Home** `/` | 91 ⚠️ too long | 147 ✅ | ✅ | Organization, Product+SoftwareApplication, FAQPage ✅ | 1 img | **304 KB** 🔴 | **51%** 🔴 | B− |
| **Features** `/features` | 71 ⚠️ | 186 ✅ | ✅ | WebPage, BreadcrumbList, Product+SWA, FAQPage ✅ | 0 ✅ | **241 KB** 🔴 | 42% 🔴 | B |
| **Pricing** `/pricing` | 68 | 175 ✅ | ✅ | WebPage, BreadcrumbList, Product+SWA, FAQPage ✅ | **13/18 imgs** 🔴 | 192 KB 🟠 | 51% 🔴 | B− |
| **Industries** `/industries` | 63 ✅ | 177 ✅ | ✅ | Organization, FAQPage, WebPage ✅ | 0 ✅ | 150 KB 🟠 | 49% 🔴 | B |
| **Contact** `/contact` | 63 ✅ | 153 ✅ | ✅ | Organization only ⚠️ | **8 imgs** 🔴 | 150 KB 🟠 | 51% 🔴 | C+ |
| **Blog hub** `/blog` | 66 ✅ | 133 ✅ | ✅ | **NONE** 🔴 | 0 ✅ | 90 KB | 37% | **D** |
| **Blog post** (×17, sampled 4) | 58–90 | 145–254 | ✅ | Article+Breadcrumb+Org (@graph) ✅ | 0 ✅ | 68–107 KB | ~40% | B− |

**Infrastructure**

| Item | State | Note |
|---|---|---|
| robots.txt | ✅ Good | All AI crawlers explicitly allowed + sitemap declared |
| sitemap.xml | 🟠 | 25 URLs, matches disk exactly; **no `<lastmod>`**, no image extension |
| llms.txt | 🟠 | Good structure but **facts drifted** (phone numbers differ from live footer) |
| vercel.json | 🟠 | Asset caching ✅; no security headers, no `cleanUrls` |
| 404 page | 🔴 Missing | Default host 404 = dead end |
| Analytics / GSC tag | 🔴 Missing | No GA4/GTM/gtag/search-console verification anywhere |
| Hreflang | 🟠 Inconsistent | Home: `en` only · F/P/I: `en`+`x-default` · Contact/Blog: none |
| Favicon set | ✅ | 32/48/192 + apple-touch present |
| Hero LCP image | ✅ | `fetchpriority="high"`, explicit `width/height`, 52 KB webp |

---

## 2. Already good — do NOT touch

Prior audits flagged these; **verified fixed as of Oct 16** — zero work needed:

- ✅ `lang="en-IN"` consistent on **all** pages (old audit claimed mixed `en`/`en-IN`)
- ✅ One `<h1>` per page everywhere, keyword-bearing
- ✅ Meta descriptions 133–186 chars on all core pages (source-controlled, not defaults)
- ✅ Canonicals present and self-referencing on every page — **statically in HTML**, not JS-dependent
- ✅ Image `width`/`height` attributes: 0 missing on home (CLS-protected)
- ✅ zero `a[href="#"]` placeholder CTAs on home/features/pricing/industries/contact
- ✅ FAQPage schema live on Home, Features, Pricing (+ some blog posts)
- ✅ Blog content depth: sampled posts run 1,386–1,729 words — the *content* work the user mentioned is genuinely done; what lags is **metadata, schema depth, and infrastructure**
- ✅ robots.txt already opens the door to GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.
- ✅ Sitemap coverage: 28 URLs — all 17 posts + 6 core pages + 5 legal pages, matches disk exactly, no stray/blocked URLs
- ✅ Blog post schema is genuinely well-built: `@graph` with `Article` + `BreadcrumbList` + `Organization` (the "null @type" in earlier DOM snapshots is just the `@graph` wrapper — not an error)

---

## 3. Verified issues

### P0 — Critical (blocks measurement & social/AI visibility)

**3.1 — No measurement stack.** Zero analytics tags and zero Search Console verification in any file. Every SEO win will be invisible without this. *(Owner decision needed — see §10.)*

**3.2 — og:image assets are broken-quality.**
| Referenced as og:image | Actual size | Actual bytes | Declared |
|---|---|---|---|
| `samyoj-logo-new.png` (pricing, contact, blog) | 2170×725 | 545 KB | width=1200 ❌ |
| `feat-illu-01.png` (features) | 1343×1171 | **1,530 KB** | width=1200 ❌ |
| `ind-illu-01.png` (industries) | 1372×1146 | 1,370 KB | width=1200 ❌ |
| `blog_*.jpg` (18 posts) | ~1376×768 | 367–809 KB | n/a |

Wrong aspect ratio (links unfurl with cropped/stretched previews) and 0.4–1.5 MB downloads for a 1200×630 slot. **Fix: one branded 1200×630 template, per-page derivative, ≤150 KB.** POC in §4.2. 17 blog cards can be batch-generated from existing artwork.

**3.3 — Blog hub has NO schema and 4 dead links.**
- Zero JSON-LD (no `CollectionPage`, no `ItemList`, nothing)
- `blog.html:1516` and `:1587` — "view all" links `href="#"`; `:1863-1864` — "About Us" / "Careers" `href="#"`**3.4 — Duplicated inline CSS is the single biggest performance debt.**
Measured per file: 51% / 42% / 51% / 49% / 51% / 37% of total bytes are `<style>` blocks (index = 159 KB of CSS inside a 304 KB file). External plans (`samyoj-nav.css` etc.) exist **and are still duplicated inline**. Cost: bigger parse cost on mobile LCP/INP, and **zero cache reuse across page navigations**. Fix plan + verification method in §4.4.

### P1 — High (fix within first working session)

**3.5 — Dead JS canonical injector in `index.html:3648-3696`.** Legacy pricing-USD logic runs on every home load. If `/pricing` path triggers it, it injects `canonical → contact.html` (wrong!) and alternates pointing to `pricing/usd.html` **which does not exist on disk**. Harmless today only because of an early-return; it is a live bullet. Remove entirely.

**3.6 — Title length over budget.** Home title = 91 chars → Google truncates ~60 chars / 580 px; primary keyword must lead. List per page in §5.

**3.7 — Contact page under-optimized:** only `Organization` schema (no `ContactPage`/`BreadcrumbList`/`FAQPage`), `twitter:card=summary` (small card while others use `summary_large_image`), 8 images without alt, og:image = the 545 KB logo.

**3.8 — Blog posts E-E-A-T thin:** no `<time>` elements, no visible publish dates (verified 4 posts), `author` is `Organization` ("Samyoj Growth Team") in schema — Google's Aug-2026 help docs emphasize named authorship for YMYL-adjacent advice. One post (`meta-whatsapp-api-pricing-2026-guide`) has a 254-char meta description (will be truncated mid-sentence).

**3.9 — Hreflang inconsistency** (see scorecard). Single-language site needs exactly one pattern: `en` + `x-default` on every indexable page. Also `meta name="keywords"` is present on home — dead weight since 2009, remove.

**3.10 — Missing 404.html** and security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) — trust signals + crawl hygiene.

**3.11 — llms.txt facts drifted:** file says Sales `+91 8839888531` / Support `+91 8305369467`; live footer says Sales `+91 8305369467` / Support `+91 9009785315`. AI models quoting stale phone numbers is a direct GEO failure. (June–Oct 2026 research context: Google ignores llms.txt entirely; its only value is agentic retrieval — but if we publish facts, they **must be true**. See §6.)

### P2 — Medium (growth layer)

3.12 No internal-linking system on blog posts (no related-posts blocks; only nav/footer). Biggest *free* ranking lever for an 18-post blog.
3.13 Money-page gaps vs competitors (Interakt/WATI/AiSensy comparison pages, `/case-studies`, `/integrations/shopify`) — Phase 5 roadmap, do not build before phase 1-4 ship.
3.14 Sitemap: add `<lastmod>` per URL (use git mtime); optional image sitemap for the 21 blog graphics.
3.15 `site.webmanifest` + `theme-color` meta absent.
3.16 Organization schema enrichment: no `address` (Indore), no `contactPoint` (sales/support phones) — hurts local/entity understanding.
3.17 Legacy cleanup: umso-analytics remnants (`index.html:9466`), duplicate Google Fonts `<link>` blocks (`index.html:3634` & `3698` load Manrope twice), duplicated preconnects.
3.18 Pricing H1 renders as "…Smart Communication **&Automation**" — missing space/ampersand entity bug in markup.

---

## 4. Global playbooks (with POC code)

### 4.1 — The canonical head contract (every indexable page)

```html
<!-- POC 4.1 — standard SEO head block -->
<title>Primary Keyword First | Samyoj</title>                <!-- ≤60 chars -->
<meta name="description" content="150–160 chars ending with a CTA verb.">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<link rel="canonical" href="https://samyoj.com/PATH">
<link rel="alternate" hreflang="en" href="https://samyoj.com/PATH">
<link rel="alternate" hreflang="x-default" href="https://samyoj.com/PATH">

<meta property="og:type" content="website">                  <!-- "article" on blog posts -->
<meta property="og:site_name" content="Samyoj">
<meta property="og:locale" content="en_IN">
<meta property="og:url" content="https://samyoj.com/PATH">
<meta property="og:title" content="Social title — punchier, ≤55 chars">
<meta property="og:description" content="≤110 chars for unfurl cards.">
<meta property="og:image" content="https://samyoj.com/images/og/PATH-og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Descriptive alt of the social card">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="≤70 chars">
<meta name="twitter:description" content="≤160 chars">
<meta name="twitter:image" content="https://samyoj.com/images/og/PATH-og.png">
<meta name="twitter:image:alt" content="Descriptive alt">

<meta name="theme-color" content="#4B2EEB">
```

Rules: `og:title` ≠ `<title>` (social copy can be punchier); every og:image gets an explicit `og:image:alt`; `twitter:card=summary_large_image` everywhere (contact currently downgrades to `summary`).

### 4.2 — OG image pipeline

**Spec:** 1200×630 (1.91:1), safe-zone 1200×560, brand indigo `#4B2EEB` background, Samyoj logo top-left, page headline wrapped to ≤3 lines, file ≤150 KB PNG-8 or WebP.

```js
// POC 4.2 — scripts/og-images.mjs  (dev-time only, npm i sharp; NOT site runtime)
import sharp from "sharp";

// Option A — composite existing artwork onto a brand card:
await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#4B2EEB" } })
  .composite([
    { input: "samyoj-homepage/images/og/_logo-white.png", top: 48, left: 48 },   // pre-exported white logo
    { input: "samyoj-homepage/images/og/_headline-features.png", top: 260, left: 48 } // headline PNG per page
  ])
  .png({ compressionLevel: 9, palette: true })
  .toFile("samyoj-homepage/images/og/features-og.png");

// Option B — straight recrop for blog art (already ~16:9):
await sharp("samyoj-homepage/images/blog_what_is_whatsapp_crm.jpg")
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .webp({ quality: 82 })
  .toFile("samyoj-homepage/images/og/what-is-whatsapp-crm-og.webp");
```

18 blog cards can be batch-generated (Option B) in one run; the 6 core pages get designed cards (Option A or a designed HTML template screenshotted at 1200×630). **Blocked only on §10.3 design approval.**

### 4.3 — Image markup standard (blog bodies especially)

```html
<!-- POC 4.3 — responsive webp with fallback, CLS-safe, lazy off-screen -->
<picture>
  <source type="image/webp"
          srcset="images/blog_what_is_whatsapp_crm-1200w.webp 1200w,
                  images/blog_what_is_whatsapp_crm-768w.webp 768w"
          sizes="(max-width: 768px) 100vw, 760px">
  <img src="images/blog_what_is_whatsapp_crm.jpg"
       alt="Diagram: WhatsApp chats syncing into a CRM sales pipeline"
       width="1376" height="768" loading="lazy" decoding="async">
</picture>
```

Batch conversion script mirrors POC 4.2 Option B (`resize width 1200, webp q80`) → typical 700 KB JPG lands at 60–90 KB. All 21 blog images + the `New images/` heroes are in scope. Hero/LCP images keep `loading` off and `fetchpriority="high"` (already correct on home).

### 4.4 — Inline CSS externalization (the big one)

Current state: `_redirects` and `vercel.json` are Vercel-ready; pages link external plans but **also** carry huge duplicated `<style>` payloads.

**Execution plan (per page, one page per commit):**
1. List every inline `<style>` block; group selectors into `shared/base.css` (nav, drawer, footer, buttons, tokens — much of this already exists in `samyoj-nav.css` / `samyoj-footer.css` / `samyoj-mobile-drawer.css`), and `pages/<page>.css` (page-specific).
2. Diff-check against the existing external files — if identical, the inline copy is a leftover duplicate: delete it, keep the `<link>`.
3. Load order matters: `base.css` → page css → theme; keep the same cascade order as today to avoid specificity flips.
4. **Verification gate (per page, before commit):** pixel-diff screenshot of logged viewport at 390 px and 1440 px before vs after; visual diff must be 0. Then `git mv` not needed — but commit must remain revertible (one page per commit).

Expected result: `index.html` 304 KB → ~90–110 KB raw (≈15 KB gzip-able HTML + cached CSS reused by all 6 pages). This is the single largest LCP/INP lever available without a framework migration.

### 4.5 — Schema strategy per template (POC JSON-LD)

**Blog hub (`/blog`) — currently has nothing:**

```json
{ "@context": "https://schema.org", "@graph": [
  { "@type": "CollectionPage", "@id": "https://samyoj.com/blog#webpage",
    "url": "https://samyoj.com/blog", "name": "Samyoj Blog",
    "isPartOf": { "@id": "https://samyoj.com/#website" } },
  { "@type": "ItemList", "name": "All articles",
    "itemListElement": [
      { "@type": "ListItem", "position": 1,
        "url": "https://samyoj.com/blog/what-is-whatsapp-crm",
        "name": "What is a WhatsApp CRM? The Ultimate Guide for 2026" }
      /* … all 18 posts, position 2–18 … */
    ] }
] }
```

**Blog posts (upgrade the existing @graph — 3 edits per post):**

```json
{ "@type": "BlogPosting",
  "headline": "…unchanged…",
  "datePublished": "2026-07-27T08:00:00+05:30",
  "dateModified": "2026-10-16T00:00:00+05:30",
  "author": { "@type": "Person", "name": "[Real byline — §10.4]", "jobTitle": "…", "url": "https://samyoj.com/about#author" },
  "publisher": { "@id": "https://samyoj.com/#organization" },
  "image": "https://samyoj.com/images/og/…-og.webp" }
```

…plus matching visible changes: `<time datetime="2026-07-27">27 July 2026</time> · 8 min read` under the H1, and byline text that matches the schema name (schema must match visible text — Google's stated AI-features guidance).

**Contact page:**

```json
{ "@type": "ContactPage", "@id": "https://samyoj.com/contact#webpage", "url": "https://samyoj.com/contact", "name": "Contact Samyoj", "about": { "@id": "https://samyoj.com/#organization" } }
```

**Organization enrichment (one shared definition, referenced by `@id` from every page):**

```json
{ "@type": "Organization", "@id": "https://samyoj.com/#organization",
  "name": "Samyoj",
  "url": "https://samyoj.com/",
  "logo": "https://samyoj.com/images/og/samyoj-og.png",
  "address": { "@type": "PostalAddress", "addressLocality": "Indore", "addressRegion": "Madhya Pradesh", "addressCountry": "IN" },
  "contactPoint": [
    { "@type": "ContactPoint", "contactType": "sales", "telephone": "+91-83053-69467", "availableLanguage": ["en", "hi"] },
    { "@type": "ContactPoint", "contactType": "customer support", "telephone": "+91-90097-85315", "availableLanguage": ["en", "hi"] }
  ],
  "sameAs": [ "…existing social URLs…" ] }
```

*(Existing per-page Organization/FAQ blocks switch to `"publisher": {"@id": …}` references instead of restating.)*

### 4.6 — Internal linking system (free ranking lever)

- Every blog post gets a **"Related guides"** 3-card block before the footer (same cluster) + one contextual in-body link.
- Every post links **up** to one money page with keyword anchor text: pricing-analysis posts → `/pricing`; ads/lead-gen posts → `/features`; payment posts → `/features` (payments section).
- Blog hub cards link out with descriptive anchors (already OK) — gain is post→hub and post→money flow.
- Footer "About Us"/"Careers" dead `#` links on blog hub: point About to `/#story` (exists) or drop the items.

### 4.7 — vercel.json upgrade (full POC, drop-in)

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/features", "destination": "/features.html" },
    { "source": "/pricing", "destination": "/pricing.html" },
    { "source": "/industries", "destination": "/industries.html" },
    { "source": "/contact", "destination": "/contact.html" },
    { "source": "/blog", "destination": "/blog.html" }
  ],
  "headers": [
    { "source": "/(.*)\\.(css|js|png|jpg|jpeg|webp|svg|woff2|ico)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" }
      ] }
  ]
}
```

`cleanUrls: true` makes `/blog/what-is-whatsapp-crm.html` canonical at `…/what-is-whatsapp-crm` automatically (PHP-style clean URLs for all 18 posts with **zero redirect files**). Existing `_redirects` stays for GitHub Pages parity. ⚠️ Test the 5 rewrites + `/legal/*` paths after deploy — `cleanUrls` + explicit rewrites interact; if any 404s, revert to rewrites-only and add explicit clean-URL rewrites for `/blog/*`.

### 4.8 — robots.txt (keep) + llms.txt v2 (rewrite)

robots.txt stays as-is (already correct). llms.txt gets: v2 spec format, corrected phone numbers/pricing (sync from live pages), `x-default` links, and — per the Ahrefs/llmstxt guidance — **must be linked from the site** (footer link) because agents fetch it only when directed. Full rewrite is a 20-minute task in the P1 batch; content drafted from verified sections 1–5 of this doc at execution time.

### 4.9 — 404 page

Static `404.html` (nav + footer + search magic-bar + 6 popular links + WhatsApp CTA), wired via Vercel config `"routes"/404` or `public/404.html` convention — included in the P1 batch; ~30 min using existing components.

---

## 5. Page-by-page playbooks (the actual work queue)

### 5.1 HOME `/` — `samyoj-homepage/index.html`
| # | Action | Ref |
|---|---|---|
| 1 | Rewrite title ≤60 chars, keyword-first. Draft: `WhatsApp CRM & AI Automation Platform | Samyoj` (49) | §3.6 |
| 2 | Delete dead pricing-USD canonical injector + umso analytics remnant | `:3648-3696`, `:9466` |
| 3 | Fix duplicate font loads (two Manrope `<link>` sets → one) | `:3634`, `:3698` |
| 4 | Remove `meta name="keywords"` | `:12` |
| 5 | New og:image card (1200×630, ≤150 KB) + `og:image:alt` | §4.2 |
| 6 | Hreflang: add `x-default` next to existing `en` | §4.1 |
| 7 | Fix 1 image missing alt (verify which via audit script) | §3.4 table |
| 8 | CSS externalization pass (biggest win) | §4.4 |
| 9 | Organization schema → switch to shared `@id` w/ address + contactPoint | §4.5 |
| 10 | Keep FAQPage + Product/SWA as-is (healthy) | — |

**Acceptance:** title ≤60 · og:image <150 KB · 0 inline dup-CSS vs external · pixel-diff clean · schema validates.

### 5.2 FEATURES `/features`
| # | Action |
|---|---|
| 1 | Title 71→≤60: `Features — WhatsApp, IG & FB AI Automation | Samyoj` (52) |
| 2 | og:image: replace 1.5 MB `feat-illu-01.png` with designed card; add alt |
| 3 | Keep WebPage/Breadcrumb/FAQ (healthy); add `Product`+`SoftwareApplication` consistency check vs home (same `@id` graph) |
| 4 | CSS externalization pass |
| 5 | Audit the 12 feature-card areas for anchor quality (they're JS-filtered — ensure descriptions are real text, not JS-injected) |

### 5.3 PRICING `/pricing`
| # | Action |
|---|---|
| 1 | **13/18 images missing alt** — add descriptive alt to every pricing/rate/growth image |
| 2 | og:image: replace 545 KB logo (2170×725) with dedicated pricing card |
| 3 | H1 markup bug: "Communication **&Automation**" — add space/`&amp;` |
| 4 | Title 68→≤60: `WhatsApp CRM Pricing — Free 14-Day Trial | Samyoj` (54) |
| 5 | FAQPage stays; ensure every visible FAQ answer is inside the JSON-LD text exactly (Google's "schema must match visible text") |
| 6 | CSS externalization pass |
| 7 | Add one internal link block: "See what's included" → `/features` with anchor `WhatsApp CRM features included in every plan` |

### 5.4 INDUSTRIES `/industries`
| # | Action |
|---|---|
| 1 | og:image: replace 1.37 MB `ind-illu-01.png` |
| 2 | Only 4 H2s across industry sections — each industry gets an H2 containing its keyword (`WhatsApp CRM for Real Estate`, `…for Education`, `…for Healthcare`, `…for E-commerce`) for the exact-intent queries |
| 3 | FAQPage text sync audit (schema vs visible) |
| 4 | CSS externalization pass |
| 5 | Add per-industry anchor cards deep-linking to matching blog posts ( internal links both ways) |

### 5.5 BLOG HUB `/blog` — lowest score today (D)
| # | Action |
|---|---|
| 1 | Add CollectionPage + ItemList schema (all 18 posts) — POC §4.5 |
| 2 | Kill 4 `#` links (`:1516`, `:1587`, `:1863-1864`) — real hrefs or remove |
| 3 | og:image designed card (currently 545 KB logo) |
| 4 | Add category filter structure with real anchors; each filter state must not break crawlability (links, not JS-only) |
| 5 | Meta description 133→155 chars with CTA |
| 6 | Subscribe/CTA block links to `/features` + `/pricing` |

### 5.6 BLOG POSTS ×18 (template pass + per-post edits)
| # | Action (template-level, one edit propagates) |
|---|---|
| 1 | Visible byline + `<time datetime>` + read-time under H1 |
| 2 | Schema: author→Person, add `dateModified`, swap image→og card | POC §4.5 |
| 3 | Related-guides block (3 cards, same cluster) — §4.6 |
| 4 | In-body contextual link to the matching money page |
| 5 | Per-post: regenerate og image ≤150 KB; fix the one 254-char description |
| 6 | Convert 21 body JPGs → webp ±srcset — §4.3 |
| 7 | Per-post title audit: keep ≤60 where over (2 posts currently 83/90) |
| 8 | Optional: FAQPage for the posts that answer questions (5–6 qualify) |

Execution note: posts share identical head/footer structure → a scripted pass (node script editing `<head>` blocks + inserting related-posts partial) plus manual per-post spot checks. Estimated 18 posts ≈ 2–3 hrs scripted + review.

### 5.7 CONTACT `/contact`
| # | Action |
|---|---|
| 1 | Add `ContactPage` + shared-Organization schema; add `BreadcrumbList` for pattern parity | §4.5 |
| 2 | `twitter:card` summary → `summary_large_image` |
| 3 | 8 images missing alt (form illustrations, channel icons) |
| 4 | og:image dedicated card |
| 5 | Hreflang block missing — add en + x-default |
| 6 | CSS externalization pass |

### 5.8 LEGAL ×5
Single template pass: legal pages currently lack og:locale/desc tuning; low priority (0.3 sitemap weight) but one shared fix is cheap — title/desc polish + noindex is **not** wanted (they should stay indexed).

### 5.9 Phase-5 NEW PAGES (only after phases 1–4 ship)
From DEEP-RESEARCH money-keyword plan, still unmet: `/compare/interakt-alternative`, `/compare/wati-vs-samyoj`, `/integrations/shopify`, `/case-studies`. Each page = one template using the §5.1 head contract + FAQ schema + comparison table (real text, crawlable). **Do not build thin doorway variants; one solid page per comparison.**

---

## 6. Research annex — 2026 standards (cited)

**Google's official AI-features guidance (May 2026 guide, still current Oct 2026):** No special tactics exist for AI Overviews/AI Mode. Same fundamentals win Google Search + its AI surfaces: crawlable, fast, mobile-friendly pages; real textual content; internal links; structured data that **matches visible text**; helpful, non-commodity content demonstrating expertise. → *developers.google.com/search/docs/appearance/ai-features*

**llms.txt reality check (2026):**
- Google Search explicitly does not use llms.txt; publishing it neither helps nor harms rankings → *searchengineland.com, Jun 15 2026*
- Ahrefs study of 137K sites: **97% of llms.txt files never received a single request** in May 2026; even among fetched files, AI retrieval bots were 1.1% of traffic → *ahrefs.com/blog/llmstxt-study*
- Value is agentic (coding agents, Lighthouse's agentic-browsing audit checks for it); files must be **linked from HTML** and kept factually accurate → *llmstxt.org v2*
- **Implication for Samyoj:** keep llms.txt (15-min upkeep, potential agent surface), spend zero additional effort on "GEO-only" tricks, pour everything into fundamentals + citation surfaces (G2/Capterra/Reddit per DEEP-RESEARCH Week-3 plan).

**Core Web Vitals (unchanged into 2026):** LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at p75 of real users; CWV is a page-experience tiebreaker, content relevance stays primary → *web.dev/articles/vitals*, *developers.google.com/…/core-web-vitals*. INP is the metric most sites fail — our JS is light but every page re-parses 100–160 KB inline CSS on mobile; externalization directly targets this.

**Static-site LCP best practice:** prerendered HTML (we have it), same-origin images, explicit dimensions, `fetchpriority="high"` on the LCP element (already present), defer everything non-critical → *web.dev/articles/optimize-lcp*.

**Structuring data for AI quoting:** verifiable numbers + named sources get cited; our existing quotable claims (3X conversions, 35%→90%, <10-min setup) are already in llms.txt and page copy — keep consistent everywhere (they are currently consistent on live pages ✅).

---

## 7. Anti-checklist — what NOT to do (2026 guidance)

- ❌ No "AI-specific schema" or GEO-special markup (Google mythbusted; none exists)
- ❌ No aggregateRating/Review schema on our own testimonials (self-serving reviews violate Google's structured-data policy — old DEEP-RESEARCH recommended it; **corrected here**: keep testimonials as plain quotable text)
- ❌ No AI-rewritten duplicate versions of pages ("content chunking" myth)
- ❌ No doorway pages per competitor keyword (one solid comparison page each, max)
- ❌ Don't remove llms.txt either (harmless, agentic upside)
- ❌ Don't chase `meta keywords` anywhere else
- ❌ Don't lazy-load the hero/LCP image
- ❌ Don't stuff hreflang for languages we don't actually have

---

## 8. Execution order & estimates

| Phase | Scope | Effort | Gate |
|---|---|---|---|
| **0** | GSC verification + GA4 hookup (owner accounts needed) | 30 min + owner | see §10.1 |
| **1** | P0 batch: og:image generation (19 images), blog-hub schema + dead links, vercel.json upgrade, 404 page, llms.txt v2 | 3–4 h | Rich Results Test + card validator on all 6 pages |
| **2** | Per-page head/schema pass: home, features, pricing, industries, contact (+ hreflang normalize, titles, alt text) | 3–4 h | audit-script green on all 6 |
| **3** | Blog template pass: bylines/dates, schema upgrade, related-posts, internal links, then ×18 spot edits + descriptions | 2–3 h | sample-diff 4 posts + spot check all |
| **4** | Performance: CSS externalization (6 pages, one commit each) + image webp conversion | 3–4 h | pixel-diff gate + PSI before/after |
| **5** | New money pages (compare/integrations/case-studies) | 6–10 h | keyword map review with owner first |

Total core work (0–4): **~12–15 focused hours**. Every phase independently shippable and revertible.

## 9. Verification protocol

**Automated static audit (guaranteed repeatable):**

```powershell
npm run seo:audit     # added to package.json — scans all 23 pages, exit 1 on critical
```

Tool: `scripts/seo-audit.mjs` (created as part of this plan). Checks: title/desc length, canonical, robots meta, og/twitter completeness, **og:image existence on disk + ≤150 KB**, hreflang, lang, h1, alt text, width/height, dead `#` links, keyword meta, placeholder leaks, JSON-LD validity + required types per page type, inline-CSS bloat %.

**Baseline run (Oct 16, 2026):** 23 pages scanned · 0 clean · exit 1 (blog hub zero-schema flagged critical). Full output retained in this § below; re-run after each phase and diff the counts.

| Issue class | Pages affected (baseline) |
|---|---|
| Title >65 chars | 17 |
| Description >165 chars | 10 |
| og:image >150 KB | 22 (all core + all posts) |
| og:image missing width/alt | 23 / 23 |
| hreflang missing (en or x-default) | 22 |
| Dead `a[href="#"]` links | blog hub (4), 1 blog post (15) |
| Images missing alt text | pricing (13/18), contact (8/14), index (1), 0 on posts |
| Images missing width/height | 1 img on 17 posts + 1 on index |
| `meta keywords` legacy | 22 pages |
| Zero schema on blog hub | 1 |
| ContactPage schema missing | contact |
| Organization schema missing | features, pricing, blog hub |
| FAQPage schema missing | contact (+posts w/o FAQ blocks) |
| Inline CSS >40 KB | index 156 KB/51% · features 100/42% · pricing 97/51% · contact 76/51% · industries 74/49% |

**Manual checks (per phase):**

- Rich Results Test + Schema.org validator on the 3 templates (home/pricing/blog-post) after phases 1–2
- PageSpeed Insights (mobile) before/after phase 4 — record LCP/INP/CLS/TBT deltas
- Facebook Sharing Debugger + Twitter card validator on all 6 og cards after phase 1
- GSC: submit sitemap, then monitor Coverage (valid pages 28→32 after phase 5), CWV report, and impressions for the `whatsapp crm` cluster
- Monthly manual GEO check (from DEEP-RESEARCH): 10 buyer prompts against ChatGPT/Perplexity — track mention/citation status

## 10. Decisions needed from owner

1. **Analytics + GSC:** provide Google account access (or say the word and we prep tag snippets + the verification file for you to paste).
2. **Phone numbers:** live footer = Sales `+91 8305369467` / Support `+91 9009785315`; llms.txt says different. Which pair is canonical? (Blocks llms.txt v2 + schema contactPoint.)
3. **OG card design:** Option A composite (logo + headline on brand indigo) vs designed Figma/HTML template? Blog cards can auto-crop regardless.
4. **Blog byline:** switch `author` from "Samyoj Growth Team" to a real named person (recommended for E-E-A-T) — who?
5. **Phase 5 green light** for comparison/integration pages (2-week content job) — after phases 1–4.

---

*Prepared Oct 16, 2026. Evidence: live CDP audit + disk measurement + cited 2026 sources. Ready to execute page-by-page on your signal.*
