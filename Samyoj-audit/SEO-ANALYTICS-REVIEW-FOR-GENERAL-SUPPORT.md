# Samyoj.com — SEO / GEO / Analytics Review (for General Support)

**Prepared:** 12 November 2026  
**Site:** https://samyoj.com (Samyog / Samyoj Platform marketing site)  
**Repository workspace:** `samyoj-homepage/` + `Samyoj-audit/` + `docs/`  
**Audience:** Internal review (general support, marketing, founders)

---

## 1. Executive summary

| Item | Status |
|------|--------|
| On-site SEO / GEO baseline | **Strong** (~79/100 heuristic per Oct 2026 full audit; not a Google ranking guarantee) |
| Live GA4 measurement | **Active** — Measurement ID `G-T8L8R0JP32` via `/analytics.js` |
| Google Search Console (GSC) | **Not wired in code** — no `google-site-verification` meta in repo; **no API/MCP connected to Cursor yet** |
| Production vs local repo | **Out of sync** — 10 new blog articles exist locally but return **404 on live** until deploy |
| Work done in this review (12 Nov 2026) | SEO deep audit re-run; live HTTP checks; **GA4 snippet added to 10 local blog pages** that were missing it |

**Top priority for ranking data:** verify GSC + connect GA4/GSC to the AI workflow (see Section 6).

---

## 2. What was reviewed (method)

1. Existing artifacts: `Samyoj-audit/FULL-AUDIT-REPORT.md`, `ACTION-PLAN.md`, `docs/SEO-GEO-MASTER-PLAN.md`
2. Local automated check: `node scripts/seo-deep-audit.mjs` → **39 HTML pages, 0 hard failures**, 10 warnings (missing `BreadcrumbList` on newer posts)
3. Live checks (HTTP): samyoj.com blog URLs, sitemap, robots.txt, analytics.js
4. Repo vs production comparison for blog hub and sitemap

---

## 3. What is already in good shape

| Area | Evidence |
|------|----------|
| Crawl / GEO | Live `robots.txt` allows Googlebot, Bing, GPTBot, Perplexity, **OAI-SearchBot**, **Claude-SearchBot**, etc. |
| AI summary file | `llms.txt` deployed at https://samyoj.com/llms.txt |
| GA4 tag | https://samyoj.com/analytics.js uses `G-T8L8R0JP32` |
| Audit fixes (many landed) | `blog-template.html` → `noindex`; invalid hreflang removed from home; conflicting `AggregateRating` removed |
| Partials / dev files | `nav-component.html` has `noindex` |
| Organization trust signals (local) | `sameAs` → LinkedIn, Instagram, YouTube on core pages |
| Blog hub schema (local) | `CollectionPage` + `ItemList` with 27 articles |
| Security headers (live) | CSP (report-only), Referrer-Policy, X-Frame-Options, etc. |

---

## 4. Gaps and risks (factual)

### 4.1 Critical — deploy drift (production ≠ this workspace)

| URL (example) | Live HTTP |
|---------------|-----------|
| `https://samyoj.com/blog/what-is-whatsapp-crm` | 200 |
| `https://samyoj.com/blog/missed-leads-across-social-inboxes` | **404** (exists in local repo only) |

- **Live blog hub** (Nov 2026): still lists older set including four posts dated Oct 29, 2026 (`instagram-comment-to-dm`, `whatsapp-crm-pipeline`, etc.) — those URLs **work (200)**.
- **Local `blog.html`**: different editorial set — ten “customer operations” posts (Oct 30) + updated `ItemList` (27 items). **Not deployed.**
- **Local `sitemap.xml`** lists URLs that are **404 on live** if submitted to GSC without deploy → indexing errors.

**Action:** Decide merge strategy (keep live four posts + add ten new vs replace hub), then **deploy** `samyoj-homepage` to Vercel and re-submit sitemap in GSC.

### 4.2 Measurement — GSC not connected

- No `google-site-verification` meta tag in repository HTML.
- Without GSC property access or API, **queries, average position, CTR, and index coverage** cannot drive prioritization from real Google data.

### 4.3 SEO hygiene (medium)

| Issue | Scope |
|-------|--------|
| `analytics.js` was missing | **Fixed locally** on 10 new blog posts via `node scripts/add-analytics.mjs` (12 Nov 2026) |
| Missing `BreadcrumbList` JSON-LD | 10 newer blog posts (WARN from deep audit) |
| Legal pages meta descriptions | Still short (~22–38 chars); audit target 120–160 |
| Short blog word count | Several posts under 1,500-word coverage floor (heuristic only) |
| Listings | No clear G2/Capterra profile found for “Samyoj WhatsApp CRM” in web search |
| Product Hunt | No confirmed launch listing (site blocked automated check) |

### 4.4 What Cursor **cannot** do today without your setup

| Capability | Limitation |
|------------|------------|
| Pull live GA4 reports | No GA MCP configured in this project yet |
| Pull GSC queries / coverage | No GSC MCP or OAuth credentials |
| Vercel deploy metrics | `plugin-vercel-vercel` MCP needs authentication |
| Guarantee rankings | Only Google’s UI + APIs provide ground truth |

---

## 5. Changes made in repository (12 Nov 2026)

| Change | Detail |
|--------|--------|
| `scripts/add-analytics.mjs` executed | **10 pages** gained `<script defer src="/analytics.js"></script>` |
| **28 pages** | Already had analytics |
| This document | Created for internal review |

**Not committed automatically** — commit/deploy when your team approves.

**Affected posts (analytics added):**

- `blog/customer-messaging-consent-india-multichannel.html`
- `blog/deduplicate-customer-records-multiple-channels.html`
- `blog/gmail-crm-integration-send-only.html`
- `blog/instagram-comment-to-dm-automation-limits.html`
- `blog/measure-lead-response-time-crm.html`
- `blog/meta-lead-forms-not-syncing-crm.html`
- `blog/meta-messaging-window-response-workflow.html`
- `blog/missed-leads-across-social-inboxes.html`
- `blog/multichannel-customer-support-routing.html`
- `blog/track-multichannel-campaign-attribution.html`

---

## 6. Best tools to connect Google Analytics & Search Console to Cursor / AI

Google’s own docs (Nov 2026) plus common production patterns. **Recommendation for Samyoj: Option A (below).**

### 6.1 Comparison — how to give the AI access

| Approach | GA4 | GSC | Best for | Manage settings? |
|----------|-----|-----|----------|-------------------|
| **A. Official / community MCP in Cursor** | Official [**Google Analytics MCP**](https://developers.google.com/analytics/devguides/MCP) (`analytics-mcp` on PyPI) | Community [**mcp-gsc**](https://github.com/AminForou/mcp-gsc) (no official Google GSC MCP as of Nov 2026) | **Cursor agent asking questions in natural language** | Read-only (GA MCP); GSC MCP typically read-only |
| **B. Service account + repo scripts** | [GA4 Data API](https://developers.google.com/analytics/devguides/reporting/data/v1) (`@google-analytics/data` Node or Python) | [Search Console API](https://developers.google.com/webmaster-tools/v1) (`webmasters.readonly` scope) | Scheduled weekly Markdown/CSV reports in `Samyoj-audit/data/` | Scripts you control |
| **C. OAuth user login (ADC)** | `gcloud auth application-default login` + `analytics.readonly` | OAuth refresh token for GSC | Solo founder, no service account JSON | Read-only if scoped correctly |
| **D. Dashboard only (no agent)** | Looker Studio, GA4 UI | GSC UI | Humans only; export PDF/CSV manually to share with AI | Human in browser |
| **E. ETL SaaS** | Coupler.io, Fivetran, Windsor.ai → Google Sheets | Same | Non-technical team | Sheet link; agent reads exported files |

**Samyoj recommendation:** **Option A** for day-to-day AI help + **Option B** for repeatable weekly SEO scorecards in the repo (optional).

---

### 6.2 Option A — Connect GA4 to Cursor (official Google MCP)

**Technology stack**

- Python 3.10+
- `uvx` or `pipx` to run `analytics-mcp` / `google-analytics-mcp`
- Google Cloud project with APIs enabled:
  - `analyticsadmin.googleapis.com`
  - `analyticsdata.googleapis.com`
- Credentials: **Application Default Credentials** or **service account JSON** (never commit to git)

**GA4 property access**

- In GA4 Admin → Property access management → add your Google user **or** service account email as **Viewer**.
- Note: MCP uses **numeric Property ID** (Admin → Property settings), not the Measurement ID `G-T8L8R0JP32` (both are needed: tag on site = Measurement ID; API = Property ID).

**Cursor config** (project or global `.cursor/mcp.json`) — from [Google’s docs](https://developers.google.com/analytics/devguides/MCP):

```json
{
  "mcpServers": {
    "google-analytics-mcp": {
      "command": "uvx",
      "args": ["--from", "analytics-mcp", "google-analytics-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "C:\\ABS\\PATH\\TO\\adc-or-service-account.json",
        "GOOGLE_CLOUD_PROJECT": "your-gcp-project-id"
      }
    }
  }
}
```

On Windows, use **absolute paths**; avoid `~` in JSON.

**One-time auth (user account on your machine)**

```bash
gcloud auth application-default login --scopes="https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform"
```

**What the agent can do (read-only):** `run_report`, realtime report, list custom dimensions, property metadata — e.g. “top landing pages last 28 days”, “users from India”, “events on `/pricing`”.

**What it cannot do:** change GA4 admin settings, delete streams, edit conversions (by design).

**Optional:** `npx skills add google/skills/skills/analytics` — Google’s agent skills for report syntax help.

---

### 6.3 Option A — Connect GSC to Cursor (community MCP)

**Official Google:** Search Console uses [OAuth 2.0](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing); scope for reporting: `https://www.googleapis.com/auth/webmasters.readonly`.

**There is no first-party Google GSC MCP** (unlike GA4). Common choice in 2026: open-source **[mcp-gsc](https://github.com/AminForou/mcp-gsc)** for Claude Desktop / Cursor.

**Typical setup (summary)**

1. Google Cloud → enable **Search Console API**.
2. Create OAuth client (Desktop) **or** use service account.
3. **GSC → Settings → Users and permissions** → add the same Google account or service account email with **Full** or **Restricted** (must include performance data).
4. Add `mcp-gsc` server block to `.cursor/mcp.json` per that repo’s README (credentials path + site URL `https://samyoj.com/` or `sc-domain:samyoj.com`).

**What the agent can do:** search analytics (queries, pages, countries), inspect URL status, export performance — good for “which queries are position 8–20?” and “which sitemap URLs 404?”.

**Quotas:** URL Inspection API has strict daily limits; use for spot checks, not bulk.

---

### 6.4 Option B — Service account (both APIs, no MCP)

Best when you want **deterministic weekly reports** without depending on MCP UI.

| Step | GA4 | GSC |
|------|-----|-----|
| 1 | GCP → enable Data API (+ Admin API if needed) | Enable Search Console API |
| 2 | Create service account; download JSON key → store **outside repo** (e.g. `C:\Secrets\samyoj-gcp.json`) | Same key can be used if scopes allow |
| 3 | GA4 Admin → add service account email as **Viewer** | GSC → Users → add service account email |
| 4 | Env var `GOOGLE_APPLICATION_CREDENTIALS` points to JSON | Same |
| 5 | Run `scripts/ga4-weekly.mjs` / `scripts/gsc-weekly.mjs` (to be added) → output `Samyoj-audit/data/YYYY-MM-DD-*.json` | |

Add to `.gitignore`:

```
*.json
!package.json
!package-lock.json
!Samyoj-audit/person-schema-template.json
secrets/
.env
```

---

### 6.5 GSC site verification (still required for the web UI)

Even with MCP/API, you should verify the property in [Search Console](https://search.google.com/search-console):

| Method | Who does it |
|--------|-------------|
| DNS TXT record at domain registrar | Often best for `samyoj.com` apex + www |
| HTML meta tag in `index.html` | Fast if you paste the verification string to dev |
| HTML file upload | One-time file in site root |

After verification: submit `https://samyoj.com/sitemap.xml` **only after** deploy matches sitemap (avoid 404 URLs).

---

### 6.6 How the AI would “manage” vs “read”

| Task | Tool |
|------|------|
| Decide which keywords to optimize | GSC MCP or API → queries + position + CTR |
| Decide which pages get traffic but don’t convert | GA4 MCP → landing page + engagement + events |
| Fix indexing | GSC coverage + live deploy fixes (human/dev) |
| Change site titles/meta | **This repo** (`samyoj-homepage`) — AI edits HTML; you deploy |
| Change GA4 events / conversions | GA4 UI (human); AI can suggest, not replace Admin API write without extra scope |
| Product Hunt / launch sites | Manual listings; no Google replacement |

---

## 7. Suggested decision checklist (for support / founders)

- [ ] Confirm **blog merge + Vercel deploy** plan  
- [ ] Complete **GSC verification** and submit sitemap post-deploy  
- [ ] Share **GA4 Property ID** (numeric) with whoever sets up MCP  
- [ ] Choose **MCP (Option A)** vs **weekly scripts (Option B)** vs both  
- [ ] Create GCP project + credentials; **never commit keys**  
- [ ] Add `.cursor/mcp.json` entries for `google-analytics-mcp` and `mcp-gsc`  
- [ ] Grant AI/user **Viewer** on GA4 + user access on GSC  
- [ ] Optional: G2/Capterra profiles + Product Hunt launch (off-site, not a substitute for GSC)

---

## 8. References (official)

- GA4 Data API quickstart: https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries  
- Google Analytics MCP: https://developers.google.com/analytics/devguides/MCP  
- GitHub GA MCP: https://github.com/googleanalytics/google-analytics-mcp  
- GSC API authorization: https://developers.google.com/webmaster-tools/v1/how-tos/authorizing  
- Community GSC MCP: https://github.com/AminForou/mcp-gsc  
- In-repo beginner GSC guide: `docs/SEO-GUIDE-BEGINNER.md`  
- Full Oct 2026 audit: `Samyoj-audit/FULL-AUDIT-REPORT.md`

---

## 9. Owner inputs still needed

| Input | Used for |
|-------|----------|
| GSC verification token **or** DNS access | Property ownership |
| GA4 numeric **Property ID** | API/MCP reports |
| Blog deploy strategy (merge vs replace) | Stop sitemap 404s |
| Optional: founder name + LinkedIn | Named `Person` schema upgrade (`AUTHORSHIP-DECISION.md`) |
| Optional: GCP service account JSON path (local only) | Automated reporting |

---

---

## 10. MCP connection status (12 Nov 2026)

| MCP | Config location | Status |
|-----|-----------------|--------|
| **google-analytics-mcp** | `.cursor/mcp.json` | Wired — uses existing gcloud ADC on this PC; set `GOOGLE_CLOUD_PROJECT` in that file |
| **gsc-mcp** (`mcp-search-console`) | `.cursor/mcp.json` | **Waiting for** `.secrets/gsc-oauth-client.json` (see `.secrets/SETUP.md`) |
| **Vercel** (plugin) | Cursor plugin | Authenticated in this session |
| **Supermemory** (plugin) | Cursor plugin | Run login CLI (see below) |

**Reload:** Fully restart Cursor after placing credential files.

---

*Document version: 1.1 — 12 Nov 2026. Update after deploy and after MCP credentials are configured.*
