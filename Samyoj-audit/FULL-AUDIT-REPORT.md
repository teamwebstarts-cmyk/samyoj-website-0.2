# Samyoj.com — Full SEO Audit Report

**Date:** 2026-10-29 · **Methodology:** [claude-seo](https://github.com/AgriciDaniel/claude-seo) v2.5.0 (MIT, © 2026 agricidaniel), adapted to Cursor project skills in `.cursor/skills/`
**Scope:** 25 publishable pages + `robots.txt`, `sitemap.xml`, `llms.txt`, `vercel.json`, `_redirects`, `favicon_io/` + live HTTPS checks on samyoj.com (Vercel, `server: Vercel`, HSTS 2y).

> Scores are heuristics from the methodology, **not** Google-internal signals. Nothing here guarantees search-ranking changes.

## SEO Health Score: **79 / 100**

| Category | Weight | Score (heuristic) | Basis |
|---|---|---|---|
| Technical SEO | 22% | 78 | canonicals/robots/sitemap/headers correct; hreflang defects; no CSP; CWV not field-measured |
| Content Quality | 23% | 80 | strong core pages; bylines+dates everywhere; 10 posts under blog coverage floor |
| On-Page SEO | 20% | 85 | unique metadata sitewide; short legal descs; 4 long titles; description 101–113 chars on 3 posts |
| Schema / Structured Data | 10% | 72 | rich JSON-LD sitewide; conflicting ratings; FAQPage retired; no Person authors |
| Performance (CWV) | 10% | 70 | lab FCP ~650 ms (best-case); 150 KB HTML, 120 KB CSS unminified; PSI quota-limited |
| AI Search Readiness | 10% | 74 | llms.txt + training crawlers allowed; OAI-SearchBot/Claude-SearchBot implicit; citable structure strong |
| Images | 5% | 100 | 100% alt coverage; all width/height set; formats/sizes are backlog items |

Weighted: 78×.22 + 80×.23 + 85×.20 + 72×.10 + 70×.10 + 74×.10 + 100×.05 ≈ **79.3**

---

## 1 · What is already right (verified — no action)

- **Metadata**: unique `<title>` + meta description on all 25 publishable pages; canonical + `og:url` agree everywhere; Twitter cards on all pages.
- **Crawl surface**: `robots.txt` present and permissive to Googlebot/Bingbot + AI crawlers; `sitemap.xml` covers exactly the 29 canonical URLs; `llms.txt` present.
- **Links**: zero broken internal links or image references (URL-decoded scan of all 34 HTML files); no generic "click here" anchors; internal link counts healthy (30–69 per page).
- **Rendering**: fully static, server-rendered HTML — every word of content and every JSON-LD block sits in the initial HTML. AI crawlers that don't execute JS see everything.
- **Page structure**: exactly one `<h1>` per page; viewport declared; `lang="en-IN"` declared.
- **Images**: 100% alt-text coverage; all images carry width/height; lazy-loading on below-fold images; per-page OG images exist on disk (23/23).
- **Production**: www→apex 307; `.html`→clean-URL 308 (Vercel cleanUrls); legacy legal paths 301; 39 non-page files return HTTP 404; security headers (nosniff, XFO, Referrer-Policy, Permissions-Policy, HSTS).
- **Blog schema**: all 17 posts have `datePublished` + `dateModified`; visible bylines; Article + ImageObject + Breadcrumb markup.

## 2 · HIGH-priority findings (fix within 1 week)

### H1 · Dev template + 3 partials are publicly indexable
| | |
|---|---|
| **Category** | Technical / Indexability (22%) |
| **Evidence** | `blog/blog-template.html:19` ships `robots: index, follow` and serves `HTTP 200` at `https://samyoj.com/blog/blog-template` with title `{{ARTICLE_EXCERPT}}`. `nav-component.html`, `new_nav.html`, `samyoj-hero.html` deploy with **no** robots tag, no canonical. Correctly excluded from `sitemap.xml`. |
| **Impact** | Placeholder text can enter the index as duplicate/doorstep pages; dilutes crawl quality and can surface in SERPs. |
| **Fix (approved approach)** | Add `<meta name="robots" content="noindex, nofollow">` to the 4 files. |
| **Verify** | After deploy: `curl -s https://samyoj.com/blog/blog-template \| grep -i 'name="robots"'` → noindex; Search Console URL Inspection → "Excluded by noindex". |

### H2 · hreflang invalid (`hrefLang` casing; `en` tag in `<body>`; missing on legal pages)
| | |
|---|---|
| **Category** | Technical / Indexability (22%) |
| **Evidence** | `index.html:81` — `hrefLang="en"` (React casing; invalid attribute in plain HTML) and it sits in `<body>`, outside `<head>` (parsers may ignore it). Same casing in `features.html:39`, `industries.html:37`. The 5 legal pages and 404 have none. Site is single-language (`en-IN`). |
| **Impact** | Google treats a single-language site's self-referencing hreflang as redundant; the broken variants risk parser confusion but not deindexing. Medium impact, trivial fix. |
| **Fix (approved approach = "1st option: remove sitewide")** | Delete all hreflang lines sitewide (valid for single-language sites: canonical alone fully specifies language/region). Keeps heads clean and removes the invalid casing problem entirely. |
| **Verify** | `curl -s https://samyoj.com \| grep -c hreflang` → 0; canonical intact; Rich Results Test → no hreflang errors. |

### H3 · Conflicting AggregateRating values between pages (unverifiable provenance)
| | |
|---|---|
| **Category** | Schema (10%) — structured-data integrity |
| **Evidence** | `index.html:2002` → `ratingValue 4.2, ratingCount 1224`; `features.html:1659` → `ratingValue 4.8, ratingCount 1224`. Same product, same count, different value. The 3 named Review nodes (`index.html:2010–2026` — Rohit Sharma, Achina Mayya, Akash Jain) **are** visible as on-page testimonials (good), but no source for "1,224 reviews" exists in the repo. |
| **Impact** | Google can treat mutually-inconsistent self-serving rating markup as unreliable; self-serving review snippets are not shown as rich results, so the conflicting markup buys risk without buying SERP decoration. |
| **Fix (approved approach = "1st option: real founder/real data")** | Reconcile both pages to one true `ratingValue` + `ratingCount` with documented provenance (G2/Capterra/in-app export) committed to the repo; keep the visible-testimonial Review nodes. If the 1,224 figure cannot be substantiated, remove rating markup and keep plain testimonials. **Need from you:** the authoritative number + where it came from. |
| **Verify** | Both pages serve identical values; Rich Results Test passes; every Review maps to a visible testimonial. |

### H4 · No author entity (E-E-A-T / AI-citation signals)
| | |
|---|---|
| **Category** | Content (23%) + AI Search (10%) |
| **Evidence** | 17/17 posts have visible bylines + `datePublished`/`dateModified`, but 0 posts carry `Person` JSON-LD for the author, only 2 use a real name string, no author bio exists, and the Organization node has no `sameAs`. |
| **Impact** | Weakens Who/How/Why (Google's helpful-content test) and entity clarity for AI Overviews/ChatGPT/Perplexity, which preferentially cite pages with resolvable author/brand entities. |
| **Fix (approved approach = "1st option: real founder")** | Pick one real founder/team author. Add: Person JSON-LD (name, jobTitle, URL, `sameAs` LinkedIn/X), a 2–3 sentence visible author bio, and `sameAs` on Organization. Do not invent people. **Need from you:** name + LinkedIn URL + one-line bio. |
| **Verify** | Rich Results Test → Article → author → Person; bio visible on post; sameAs URLs resolve. |

## 3 · MEDIUM-priority findings (fix within 1 month)

| # | Finding | Evidence | Fix / Verify |
|---|---|---|---|
| M1 | Legal meta descriptions 21–38 chars (floor 120) | `legal/privacy-policy.html:18` "Samyoj Privacy Policy." (22c) — same pattern on all 5 legal pages | Rewrite 120–160c unique descriptions per policy; verify via curl \| grep description |
| M2 | 404 page canonical points at itself; no description | `404.html:13` canonical = `/404.html` | Point canonical at `https://samyoj.com/` or drop it; page already `noindex, follow` (correct) |
| M3 | FAQPage schema retired for Google rich results | 6 pages, 39 Q/A nodes (e.g. `pricing.html:384`) | Info-level only: keep markup if useful off-Google; never claim SERP benefit; don't add new FAQPage for Google |
| M4 | AI citability crawlers not explicit in robots.txt | `robots.txt` lists GPTBot, ClaudeBot, PerplexityBot… but not `OAI-SearchBot` (gates ChatGPT Search citability) or `Claude-SearchBot` (gates Claude citability) | Add explicit `Allow: /` blocks; verify via curl |
| M5 | 5× duplicate font preconnects; 3 unminified CSS bundles (~120 KB) | `index.html` head: fonts.googleapis.com ×5, fonts.gstatic.com ×2; `samyoj-index-main.css` 119,873 B multi-line | Dedupe to 1× each; minify the 3 page CSS bundles; re-measure CWV after deploy |
| M6 | Image URLs contain literal spaces (`%20`) | `New images/`, `images/pricing/why_samjoy/`, `images/contact/ways to connect/` (8 dirs) | Rename kebab-case + update refs in one PR; keep `og:` image paths stable; verify zero 404s after |

## 4 · LOW / backlog

| # | Finding | Fix |
|---|---|---|
| L1 | Hero images up to 2.2 MB PNG (10 files > 1.8 MB) | WebP/AVIF + responsive `srcset`; LCP candidates first |
| L2 | 169 PNG vs 92 WebP in asset mix | Convert decorative content images where quality allows |
| L3 | 10 blog posts under the 1,500-word coverage floor (heuristic) | Expand only where the topic warrants depth; add original data/quotes; never pad |
| L4 | No Content-Security-Policy header | Ship report-only CSP → monitor → enforce |
| L5 | 4 titles at/above 60-char truncation point (63–65c) | Tighten titles (e.g. "How to Set Up Click-to-WhatsApp Ads for Maximum ROI \| Samyoj Blog" → "How to Set Up Click-to-WhatsApp Ads \| Samyoj") |
| L6 | 3 meta descriptions at 101–113 chars (floor 120) | Extend with a concrete benefit/CTA |
| L7 | Heading-skip detected on 6 pages (H2→H4 or H1→H3 patterns) | Flatten to sequential H2→H3 in a batch edit |
| L8 | Optional IndexNow for Bing/Yandex | Skip (site small + already crawled) |

## 5 · Not measurable in this pass

- **CrUX field CWV** (needs site traffic or a keyed PSI run — keyless PSI returned HTTP 429 daily-quota; `L-CWV`). Rerun `npx lighthouse https://samyoj.com --view` locally or add an optional API key.
- **Backlink profile** — requires Moz/Bing/DataForSEO credentials (none configured).
- **AI-citation share** (ChatGPT/Perplexity/AIO presence) — requires paid extensions; only readiness scored here.
- **Lighthouse Agentic Browsing fraction** — needs the agentic tooling from the repo's Python runtime (not installed).

## 6 · Word counts (visible text, script/style stripped)

<details><summary>Expand table</summary>

| Page | Words | | Page | Words |
|---|---|---|---|---|
| features | 3,344 | | whatsapp-click-to-chat-ads-vs-landing-pages | 3,299 |
| index | 1,883 | | whatsapp-flows-guide | 2,692 |
| how-to-avoid-bans | 2,481 | | meta-api-pricing | 2,591 |
| shopify-crm | 2,406 | | top-7-providers | 1,175 |
| how-to-set-up-ctwa-ads | 1,131 | | lead-gen-strategies | 1,075 |
| whatsapp-automation-examples | 1,007 | | what-is-whatsapp-crm | 992 |
| ultimate-strategy-2026 | 986 | | automating-broadcasts | 948 |
| collect-payments | 911 | | conversational-commerce | 882 |
| ai-agents-in-whatsapp | 859 | | pricing | 1,277 |
| industries | 1,019 | | marketing-2026-trends | 647 |
| blog hub | 621 | | contact | 559 |
| **blog floor** | **1,500** | | whatsapp-business-calling-voice-ai | 450 |

</details>

> The 1,500-word figure is the methodology's topical-coverage **floor**, not a ranking factor. Expand posts only where the topic genuinely needs depth.

## 7 · Cursor setup — how to use the ported skills

| Skill | Use when |
|---|---|
| `.cursor/skills/seo-audit/` | Full-site re-audits (e.g. after a redesign). Say: *"run the seo-audit skill on samyoj.com"* |
| `.cursor/skills/seo-technical/` | New pages, robots/sitemap/canonical changes, release checks |
| `.cursor/skills/seo-schema/` | Adding or editing JSON-LD on any page |
| `.cursor/skills/seo-geo/` | AI-search readiness, robots AI-crawler tokens, llms.txt changes |
| `.cursor/skills/seo-onpage/` | Writing/editing page copy, titles, descriptions, blog posts |

**What could NOT be reproduced outside Claude Code** ((no paid services; no credentials exposed): parallel 17-agent fan-out, the 60 bundled Python tools (PSI/GSC/CrUX/drift/rendering runtime), Google API–backed field reports, drift SQLite snapshots, PDF report generation, marketplace extensions (Bing, SE Ranking, Profound, Firecrawl, Unlighthouse, Banana). Workaround for any of these: run upstream claude-seo inside Claude Code alongside Cursor — the two share this repo.

## 8 · Files created for this setup (nothing else was modified)

```
.cursor/skills/seo-audit/SKILL.md
.cursor/skills/seo-technical/SKILL.md
.cursor/skills/seo-schema/SKILL.md
.cursor/skills/seo-geo/SKILL.md
.cursor/skills/seo-onpage/SKILL.md
Samyoj-audit/ACTION-PLAN.md
Samyoj-audit/FULL-AUDIT-REPORT.md   ← this document
```
