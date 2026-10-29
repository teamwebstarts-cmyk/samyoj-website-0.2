# Samyoj.com Action Plan — SEO Audit 2026-10-29

Methodology: [claude-seo](https://github.com/AgriciDaniel/claude-seo) v2.5.0 (MIT, © 2026 agricidaniel), adapted to Cursor project skills in `.cursor/skills/`.
Scope: 25 publishable pages + `robots.txt`, `sitemap.xml`, `llms.txt`, `vercel.json`, `_redirects` + live HTTPS checks on samyoj.com (Vercel).
Health score: **79/100** (heuristic, weighted per methodology — not a Google-internal signal; no ranking outcomes promised).

| Phase | Focus | Items |
|---|---|---|
| 1 — this week | Deploy-surface hygiene | H1 noindex template/partials, H2 hreflang repair, H3 rating markup integrity |
| 2 — weeks 2–3 | Entity & AI-surface signals | H4 author entity + sameAs, M4 robots citability crawlers, M3 FAQ schema stance |
| 3 — month 2 | Content depth & media | M1 legal descriptions, M2 404 canonical, M5 preconnect/CSS, M6 image paths, L1–L3 image/content program + field CWV re-check |
| 4 — ongoing | Monitoring | Per-fix verification checklist, quarterly re-audit via `.cursor/skills/seo-audit/` |

---

## HIGH — fix within 1 week

### H1. Dev template and 3 partials are publicly indexable (robots/noindex)
- **Evidence** `blog/blog-template.html` → serves `HTTP 200` at `/blog/blog-template` (Vercel) with `<meta name="robots" content="index, follow, max-image-preview:large">`, placeholder `{{ARTICLE_EXCERPT}}` title. `nav-component.html`, `new_nav.html`, `samyoj-hero.html` deploy with no robots tag. Sitemap excludes template (good).
- **Fix** `<meta name="robots" content="noindex, nofollow">` on the 4 files.
- **Verify** `curl -s https://samyoj.com/blog/blog-template | grep -i 'name="robots"'` → noindex; Search Console URL-inspection shows "Excluded by noindex".

### H2. hreflang half-declared; invalid `hrefLang` casing; `en` line in body (index.html)
- **Evidence** index.html L81 `hrefLang="en"` (React casing, invalid in plain HTML) sits in `<body>`; features/industries likewise; 5 legal pages have none. Site is single-language.
- **Fix (A, recommended)** remove hreflang site-wide — valid for single-language sites. **Fix (B)** keep pair, lowercase, inside `<head>`.
- **Verify (A)** live head has zero hreflang and self-canonical intact; **(B)** both tags test clean in Rich Results Test.

### H3. Review markup: conflicting AggregateRating values, undocumented provenance
- **Evidence** `index.html:2002` AggregateRating `4.2` with `ratingCount: 1224`; `features.html:1659` AggregateRating `4.8` with the same `ratingCount: 1224` — conflicting values for the same product. The 3 named Review nodes (`index.html:2010–2026`, Rohit Sharma / Achina Mayya / Akash Jain) ARE displayed as visible testimonials on the page (good), but the 1,224 review count has no documented source in the repo.
- **Fix** reconcile both pages to one truthful `ratingValue` + `ratingCount` backed by a documented source (G2/Capterra/in-app review export); record provenance in the repo. Keep the visible-testimonial Review nodes.
- **Verify** both pages serve identical rating values; Rich Results Test on `/` and `/features` passes; every Review maps to a visible on-page testimonial.

### H4. Author entity absent (0/17 posts), Organization `sameAs` missing
- **Evidence** all 17 posts carry visible bylines + `datePublished`/`dateModified`, but 0 have `Person` JSON-LD, only 2 name an author string, no author bios; Organization node lacks `sameAs` social links.
- **Fix** one real `Person` (name, role, LinkedIn URL) + short author bio per post; `sameAs` (LinkedIn, X, YouTube if any, Crunchbase) on Organization. Do not fabricate authors.
- **Verify** Article→author→Person resolves in Rich Results Test; roles + sameAs URLs resolve.

---

## MEDIUM — fix within 1 month

| # | Finding | Evidence / source file | Fix + verify |
|---|---|---|---|
| M1 | Legal meta descriptions 22–37 chars (floor 120) | all 5 legal pages | Rewrite 120–160-char unique descriptions; verify via `curl -s URL \| grep -i name=description` |
| M2 | 404 canonical self-referencing, no meta description | `404.html` L13 | Point canonical at `https://samyoj.com/` (or drop); optional description; verify 404 ships to browsers/Crawlers as `404` status, not 200 |
| M3 | FAQPage schema retired for Google rich results (2026-05-07) | 6 pages (39 Q/A nodes) | Info-level only — keep (still useful elsewhere); don't add for Google SERP; don't remove existing |
| M4 | robots.txt omits `OAI-SearchBot` & `Claude-SearchBot` (citability crawlers) | `robots.txt` | Add explicit `Allow: /` blocks so citability intent is auditable; verify `curl -s https://samyoj.com/robots.txt` |
| M5 | 5× duplicate `fonts.googleapis.com` preconnects; 3 unminified CSS (~120 KB) | index.html head; page CSS files | Dedupe preconnect; minify page CSS bundles; re-test CWV post-deploy |
| M6 | Image URLs contain literal spaces (`%20`) | 8 directories, e.g. `New images/`, `images/pricing/why_samjoy/` | Rename to kebab-case, update references, keep `og:` images stable |

## LOW — backlog

| # | Finding | Fix |
|---|---|---|
| L1 | Hero images up to 2.2 MB PNG | WebP/AVIF + `srcset` on LCP images |
| L2 | 169 PNG vs 92 WebP assets | Convert decorative content images to WebP |
| L3 | 10 blog posts under the 1,500-word topical-coverage floor (heuristic) | Expand only where the topic warrants; add original data/quotes |
| L4 | No Content-Security-Policy header | Report-only CSP → monitor → enforce |
| L5 | Optional: IndexNow (Bing/Yandex fast indexing) | Skip for now (small site, already crawled) |

---

## Adapting claude-seo to Cursor — what changed

**Ported as project skills in `.cursor/skills/`** (MIT, © 2026 agricidaniel, attribution in headers). Invoke in Cursor chat by name — Cursor has no slash commands like `/seo audit`; ask e.g. *"run the seo-audit skill for samyoj.com"* or *"use the seo-technical skill to check the new page"*.

| claude-seo | This setup |
|---|---|
| 26 sub-skills | 5 project skills cover the relevant surface for a 30-page static site: `seo-audit`, `seo-technical`, `seo-schema`, `seo-geo`, `seo-onpage` |
| 19 specialist subagents | Not preconfigured — Cursor `Task` subagents exist but repo agent files weren't wired up; skills run inline (equivalent coverage, sequential) |
| `${CLAUDE_PLUGIN_ROOT}` Python launcher + 60 bundled tools | Not installed (PSI/GSC/CrUX/drift tooling; optional Google API creds). Methodology preserved in skill text; keyless PSI possible manually (quota-limited) |
| `/seo setup`, `/seo doctor`, `/seo google …` | Not applicable — no runtime shipped; add PagerSpeed/GSC credentials individually if/when needed (never commit keys) |
| PDF report via `google_report.py` | Markdown artifacts (this folder) + audit canvas instead |
| Marketplace extensions (Bing, SE Ranking, Profound, Firecrawl, Unlighthouse, Banana) | Not ported — extension/paid services outside core MIT skill set |

**Reproduction gap (cannot run in Cursor without extra setup)**: field-data reports tied to Google APIs (CrUX/GSC/GA4), Lighthouse Agentic Browsing fraction, drift/SQLite snapshots, PDF generation. workaround: run upstream claude-seo inside Claude Code alongside Cursor, or wire the capabilities individually later.

## Word-count snapshot (visible text, script/style stripped)

| Page | Words | Page | Words |
|---|---|---|---|
| index | 1,883 | whatsapp-marketing-2026-trends | 647 |
| features | 3,344 | what-is-whatsapp-crm | 992 |
| pricing | 1,277 | whatsapp-conversational-commerce | 882 |
| industries | 1,019 | ai-agents-in-whatsapp | 859 |
| contact | 559 | how-to-collect-payments | 911 |
| blog.html | 621 | automating-whatsapp-broadcasts | 948 |
| Voice AI calling | 450 | ultimate-strategy-2026 | 986 |
| avoid bans / QS | 2,481 | whatsapp-automation-examples | 1,007 |
| meta-api-pricing | 2,591 | how-to-set-up-ctwa-ads | 1,131 |
| ads vs landing | 3,299 | top-7 providers | 1,175 |
| flows-guide | 2,692 | shopify-crm | 2,406 |
| lead-gen | 1,075 | | |
