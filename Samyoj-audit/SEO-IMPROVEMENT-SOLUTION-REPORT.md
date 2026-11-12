# Samyoj — SEO improvement solution report (for review)

**Status:** Review only. No site changes have been made from this document.  
**Date:** 12 November 2026  
**Evidence:** Composio live pulls — GA4 property `560711036`, GSC property `sc-domain:samyoj.com`  
**Companion data file:** `COMPOSIO-SEO-PERFORMANCE-REPORT.md` (28-day snapshot). This file adds the longer window and the action plan.

---

## 1. What the data actually says

Google is not failing to “see” Samyoj. From **1 August 2026 to 9 November 2026** Search Console recorded:

| Window | Clicks | Impressions | CTR | Avg position |
|--------|--------|-------------|-----|--------------|
| August 2026 | 39 | 216 | 18.1% | 7.7 |
| September 2026 | 10 | 224 | 4.5% | 6.8 |
| October 2026 | 15 | 1,049 | 1.4% | 52.0 |
| 1–9 November 2026 | 6 | 1,003 | 0.6% | 64.0 |
| **Full window** | **70** | **2,492** | **2.8%** | **48.9** |

August and September were a **small branded site**: few impressions, good positions, healthy CTR. October is when the comparison article started appearing for high-volume “WhatsApp API provider” queries around **position 70–90**. Those impressions are real, but a result on page 7 is not expected to earn clicks. Industry click curves (Advanced Web Ranking, 2024–2025 organic CTR studies) put position 1 near 25–30% CTR, position 5 near 4–6%, and positions past 20 near zero. **Zero clicks at position 74 is the normal outcome, not a broken title.**

Of the **70 clicks** in this window, **58 are the query `samyoj`** (125 impressions, average position **1.1**). The homepage URL `https://samyoj.com/` has **61 clicks / 227 impressions / position 3.2**. Almost all current Google demand is people who already know the name.

GA4 for the last 28 days (the property does not show a longer independent history in this pull; the 90-day channel report returned the same totals):

| Channel | Sessions | New users | Engagement | Bounce | Avg session |
|---------|----------|-----------|------------|--------|-------------|
| Direct | 90 | 58 | 43% | 57% | 458 sec |
| Organic Search | 6 | 5 | 67% | 33% | 81 sec |
| Organic Social | 2 | 2 | 0% | 100% | 0 |
| Referral | 1 | 1 | 0% | 100% | 0 |

Events in that window: `page_view` 731, `session_start` 105, `first_visit` 66, `scroll` 121, generic `click` **7**. There is **no** `sign_up`, `generate_lead`, `book_demo`, or pricing-CTA event. We cannot yet tell which organic visit became a customer.

Devices in GA4: desktop **93 sessions**, mobile **6 sessions** with a 6.7 second average duration. Search Console’s mobile slice is small (102 impressions in the recent 28 days) but ranks better (position ~8) than desktop (position ~63), because the huge provider-query volume is desktop.

---

## 2. Full Search Console inventory we can act on

### 2.1 Queries, 1 Aug–9 Nov 2026 (top by impressions)

| Query | Clicks | Impr. | Pos. | What it means |
|-------|--------|-------|------|----------------|
| best whatsapp api provider | 0 | 506 | 74.1 | Head term. Lives on the Top 7 article. Not winnable by a title edit. |
| whatsapp business api provider | 0 | 307 | 76.1 | Same page, same problem. |
| whatsapp api provider | 0 | 274 | 80.8 | Same. |
| best whatsapp bsp | 0 | 165 | 88.7 | Same. |
| **samyoj** | **58** | **125** | **1.1** | Brand. Protect this. Do not dilute the homepage title. |
| best whatsapp business solution provider | 0 | 81 | 92.6 | Same Top 7 page. |
| whatsapp business trends for customer engagement | 0 | 65 | **6.3** | Already page 1. Snippet can earn clicks now. |
| samij / samy / samip / samyo / sammi | 0 | 37+28+26+5+5 | 4–10 | Misspellings. Brand sits nearby; low priority. |
| which providers are easy to set up without a developer | 0 | 14 | **5.1** | Page 1 long-tail. The page does not answer this in the title. |
| reliable message delivery and uptime | 0 | 10 | **7.8** | Page 1. Needs a visible uptime/reliability block. |
| platforms for small and mid-size marketing teams | 0 | 8 | **8.2** | Page 1. Needs an SMB “best for” block. |
| whatsapp conversational commerce | 0 | 7 | **8.9** | Existing article, position 9. Title/H1 alignment. |
| whatsapp marketing trends / whatsapp trends | 0 | 5+5 | **4–5** | Trends article. One click in the shorter window despite ~180 impressions. |
| best whatsapp api mena | 0 | 4 | **8.5** | Small, but page 1. Do not build a MENA site; one sentence is enough. |
| whatsapp free trial | 0 | 6 | 232 | Ignore. Not a real ranking. |

Query+page pairing confirms the head terms are **not** split across the homepage. They all attach to:

`https://samyoj.com/blog/top-7-whatsapp-business-api-providers.html`

That one URL is **1,624 impressions, 0 clicks, position 70.4** over the long window. It is ~65% of all impressions and 0% of clicks.

### 2.2 Pages, same window

| URL | Clicks | Impr. | Pos. | Note |
|-----|--------|-------|------|------|
| Top 7 providers `.html` | 0 | 1,624 | 70.4 | The only scale problem. |
| `https://samyoj.com/` | 61 | 227 | 3.2 | Brand homepage. Working. |
| `https://www.samyoj.com/` | **0** | **187** | 6.4 | Duplicate host. Impressions with no clicks. |
| Trends article `.html` | 1 | 180 | 5.6 | Page 1, almost no clicks. |
| `pricing.html` | 1 | 167 | 10.8 | Borderline page 1. |
| `/contact` | 0 | 162 | 2.7 | Brand SERP sibling; users click home instead. |
| API pricing guide | 0 | 142 | 6.4 | Page 1, 0 clicks. |
| `/industries` | 0 | 120 | 2.6 | Same brand-sibling pattern. |
| `/blog.html` | 0 | 114 | 2.5 | Same. |
| `/features` and `/features.html` | 1 | 106+66 | ~2.2 | Two URLs for one page. |
| Signup URL on `app.samyoj.com` | 3 | 61 | 5.5 | App is in the Google index via a UTM URL. |
| Conversational commerce | 0 | 37 | 7.5 | |
| Flows guide (clean **and** `.html`) | 1 | 25+21 | ~8.4 | Duplicate URLs sharing one topic. |
| Collect payments | 0 | 24 | **30.3** | Closest “almost” commercial page after the Top 7. |
| Click-to-WhatsApp ads | 0 | 21 | 6.1 | Page 1, no clicks. |
| Avoid bans | 0 | 19 | 16.8 | Just off page 1. |

### 2.3 Sitemap and index

GSC lists `https://samyoj.com/sitemap.xml`: **32 URLs submitted, 0 reported indexed, 0 errors**, last downloaded 11 Nov 2026. Treat “0 indexed” cautiously — the API field often lags, and we know many URLs have impressions, so they are indexed. Do not resubmit the sitemap until the local 10 new posts are actually deployed (those URLs 404 on production today).

### 2.4 GA4 geography (28 days)

India 50 sessions, United States 23, Germany 16, Singapore 4. Search clicks are concentrated in India (6 of 8 clicks in the recent 28-day slice). UAE has impressions (205) at position ~77 and zero clicks — that is the same provider-query spill, not a UAE landing-page opportunity yet.

---

## 3. How to use this data (the operating rule)

Do not “add keywords everywhere.” Google’s title-link guidance and helpful-content guidance both punish pages that promise a query they do not answer. Use three buckets:

| Bucket | Position | Action | Expected effect |
|--------|----------|--------|-----------------|
| A. Already page 1, 0 clicks | 4–10 | Rewrite the title and the first answer block so the query’s words appear as the answer, not as a slogan. | Clicks within weeks. Impressions stay flat. |
| B. Brand | 1–3 | Leave the homepage title brand-led. Fix `www` so those 187 impressions are not a second, weaker URL. | Recover wasted brand impressions. |
| C. Head commercial terms | 70–90 | Rebuild the Top 7 article into a real comparison, then earn links. A title change will not move position 74 into the click zone. | Impressions may dip short-term if we drop irrelevant queries; clicks only rise after position enters ~15. |

GA4’s job is not ranking. Its job is to show whether the new clicks become trials. Until signup and demo are events, “more users” cannot be proven.

---

## 4. Research the plan is built on

- **Google Search Central, title links:** the title should describe the page. Google rewrites titles that are stuffed or that don’t match the visible H1. Changing “Top 7 WhatsApp Business API Providers 2026” into a longer keyword list will likely be rewritten and will not move position 74.
- **Google helpful content / people-first:** comparison pages that rank name the decision criteria, show a table, date the rates, and say who each option is for. The current meta description already names Wati, Interakt, and Twilio, which is the right intent. The page still sits at 70 because competitors have more links and a tighter “provider” entity, not because the title lacks the word “best.”
- **CTR by position:** at position 70, expected CTR is ~0. The 1,624 impressions are a content and authority gap. At position 5–8, expected CTR is roughly 3–6%. The trends article (180 impressions, position 5.6, 1 click, ~0.6% CTR) is **below** that curve, so the snippet is the lever.
- **Ahrefs domain rating 0** and SEOptimer links grade **F** (1 backlink, 0 dofollow) mean head-term movement without any new referring domains is unlikely. Mobile lab score **52** and LCP **10.6s** (SEOptimer, 12 Nov 2026) matter for the users who do land, especially the 6 mobile sessions that leave in under 7 seconds. Desktop lab score is **94**; do not spend the sprint rebuilding desktop.
- **Canonical host:** Google documents that `www` and apex are different URLs. `www.samyoj.com/` still has 187 impressions and 0 clicks while apex home has the clicks. One host should 301 the other on every path, not only `/`.

---

## 5. Solutions, in the order they change clicks

### 5.1 Fix the host split (small, real)

**Problem:** `www` holds 187 impressions at position 6.4 with 0 clicks, beside a homepage that already ranks at 3.2 and gets the clicks.  
**Change:** confirm every `www` URL 301s to `https://samyoj.com/...`, including blog `.html` paths. In Search Console, keep the domain property (`sc-domain:`) so both hosts stay visible while the redirect settles.  
**Do not** add `www` links in the sitemap.  
**Check:** two weeks later, `www` impressions should fall and apex impressions should rise by roughly that amount. Clicks should not drop.

### 5.2 Snippet fixes on pages that are already on page 1

These are the only title edits that can produce clicks before any new links exist. Keep titles under ~60 characters. Put the query language in the title only when the page actually answers it.

| Page | Current title | Proposed title | Why |
|------|----------------|----------------|-----|
| Trends | WhatsApp Marketing in 2026: Trends & Growth \| Samyoj | WhatsApp Marketing Trends 2026 \| Samyoj | Matches “whatsapp marketing trends” (pos 4) and “whatsapp trends” (pos 5). 180 impressions, 1 click. |
| Trends meta | “Discover the top WhatsApp marketing trends…” | “Seven WhatsApp marketing trends for 2026: AI agents, Flows, Click-to-WhatsApp ads, and what to do with each.” | Specific, citable, matches the on-page topics. |
| API pricing guide | (ranks pos 6.4, 142 impr, 0 clicks) | Meta WhatsApp API Pricing 2026 (India rates) \| Samyoj | India is where the clicks are. Say “rates” because that is the query intent. |
| Conversational commerce | existing commerce title | WhatsApp Conversational Commerce: In-Chat Checkout \| Samyoj | Query is exactly “whatsapp conversational commerce,” position 8.9. |
| Click-to-WhatsApp ads | existing setup title | Click-to-WhatsApp Ads Setup \| Samyoj | Already position 6.1. Shorter title, query at the front. |
| Homepage | WhatsApp CRM & AI Automation Platform \| Samyoj | **Leave it.** | Brand query is position 1.1. Do not turn the home title into “best WhatsApp API provider.” That would compete with the article and can cost brand clicks. |

**Proof this worked:** in GSC, filter the page, compare CTR for the 28 days after indexation of the new title vs the 28 days before. Success is CTR moving toward 3%+ on the trends and pricing URLs, not a change in average site position.

### 5.3 Rebuild the Top 7 article — the only page that can change impressions quality

Current title `Top 7 WhatsApp Business API Providers 2026 | Samyoj` and description are already aligned with the queries. They are not the bottleneck.

The article is collecting “best provider / BSP / API provider” demand from one URL and losing all of it at position 70–90. A second, thinner page on the same keywords would split the 1,624 impressions. **Do not create a new “best WhatsApp API provider” URL.** Improve this one.

**Proposed title (only after the body matches it):**  
`Best WhatsApp API Providers 2026: 7 Compared | Samyoj`  
Description stays a comparison (pricing, AI, India rates). Do not add “BSP,” “official,” and “Hong Kong” into the same title.

**Blocks to add on this page only** — each one exists because a live query already ranks between positions 5 and 15:

1. **Comparison table above the fold.** Columns: provider, official Meta BSP or not, India pricing posture, no-code setup, shared inbox, AI qualification, payments, best for. Rows: Samyoj plus the providers already named in the description (Wati, Interakt, Twilio, and the rest of the seven). Queries “best whatsapp api provider” and “whatsapp business api providers” are comparison queries; a table is what those SERPs show.
2. **“Set up without a developer” block.** Query: “which whatsapp business platform providers are easy to set up without a developer?” — 14 impressions, position **5.1**. Three or four sentences plus a yes/no column in the table. This block can earn a click without moving the head term.
3. **“Delivery and uptime” block.** Query at position 7.8. State what Samyoj does and does not control (Meta’s uptime vs the inbox). Do not invent an SLA number.
4. **“Small and mid-size marketing teams” block.** Query at position 8.2. Point at the **WhatsApp ₹899/mo** and **Multi-channel ₹1,499/mo** plans on `/pricing` (plus 14-day Launch trial) — not legacy Starter/Growth/Pro names.
5. **One India-rate callout** linking to the pricing guide (142 impressions, position 6.4). Passes authority to a page that is closer to page 1 instead of repeating the rate card.
6. **Visible “updated” date** and a one-line method: “Compared on official Meta pricing posture, no-code setup, AI qualification, and India billing. Rates change; check each vendor.” That is the E-E-A-T signal comparison pages need. It is not a new author persona.

**What not to add:** a Hong Kong section (7 impressions), a MENA section (4 impressions), a “free trial of WhatsApp” section (position 232). Those queries are noise.

**Links (required for bucket C, not optional):** the page will stay near position 70 until other sites mention it. Practical sources that match a B2B WhatsApp product: a G2 or Capterra profile, one comparison mention from an Indian SaaS roundup, and the existing LinkedIn/YouTube URLs already in Organization `sameAs`. DR is 0 today. No on-page edit replaces that.

**How we will know:** GSC page filter on the Top 7 URL. Leading indicator is average position on the five head queries moving from the 70s toward the 30s, which still will not produce many clicks. Click indicator is the three long-tail queries in blocks 2–4 picking up any clicks at all. If position does not move in 8 weeks, stop rewriting and put the effort into the link.

### 5.4 One expansion, not a new blog farm

`how-to-collect-payments-on-whatsapp` has 24 impressions at position **30**. That is the only commercial URL close enough to push with content rather than links. Add a short “tools that collect payment inside WhatsApp” answer (UPI / payment link / what Samyoj does) and link it from the Top 7 payments column. Do not publish a second payments article.

Pages at position 16–17 (account bans) get a tighter H2 that uses “quality score” and “ban,” which the URL already targets. No new article.

### 5.5 Duplicate URLs that split the same topic

GSC shows both:

- `/features` (106 impr) and `/features.html` (66 impr)
- `/blog/whatsapp-flows-guide-in-chat-forms` and the `.html` twin
- `/pricing.html` still appears as its own row (167 impr) beside the clean pricing URL in other reports
- `/blog.html` (114 impr) beside `/blog`

Pick the clean URL as canonical, 301 the `.html` variant, and list only the clean URL in the sitemap. This does not create new rankings. It stops two URLs sharing one position.

### 5.6 Measurement so the next report is about customers

GA4 currently cannot see a signup. Add four events, nothing else:

| Event | Fires when |
|-------|------------|
| `cta_start_trial` | “Start for FREE” to `app.samyoj.com` |
| `cta_book_demo` | Calendly click |
| `cta_pricing` | Click to `/pricing` |
| `cta_contact` | Click to `/contact` |

Mark `cta_start_trial` and `cta_book_demo` as key events. Then the weekly question becomes: organic landing page → which CTA. Today the only click event count is 7, so this is blind.

Also stop the app from being the organic landing URL. `app.samyoj.com/?utm_source=organic&utm_term=homepagesignupbutton` already has 61 impressions and 3 clicks. UTM links should not be indexed. `noindex` the app signup URLs, or at least do not internally link a URL that contains `utm_source=organic`.

### 5.7 Mobile, only because the six mobile sessions leave immediately

SEOptimer mobile lab: score 52, LCP 10.6s, “improve image delivery” estimated at 4.1s. Desktop is 94. The fix is the homepage hero image (WebP already exists; confirm it is the LCP element and that `www` redirects are not adding a hop — SEOptimer flagged “avoid multiple page redirects”). Do this after the snippet and canonical work. It will not move the position-74 queries.

### 5.8 What we will not build

- No new “best WhatsApp API” landing page beside the Top 7 article.
- No city or country pages (Hong Kong, MENA, UAE) for single-digit impressions.
- No extra FAQPage blocks for Google rich results. Google retired FAQ rich results for most sites in 2023; the FAQ content can stay as normal HTML.
- No keyword footer, no hidden text, no repeating “best WhatsApp BSP” across home, features, industries, and pricing. That splits the one URL that already owns those impressions.
- No Product Hunt / launch work inside this ranking plan. It is a referral spike, not the GSC head-term fix.

---

## 6. Keyword placement map (only these strings, only these places)

| Phrase from GSC | Where it goes | Where it must not go |
|-----------------|---------------|----------------------|
| best WhatsApp API providers | H1/title of the **existing** Top 7 article, first column header of the new table | Homepage title, features H1, footer |
| easy to set up without a developer | H2 on the Top 7 article only | Every blog post |
| message delivery and uptime | H2 on the Top 7 article only | Homepage |
| small and mid-size marketing teams | H2 on the Top 7 article, one line on `/pricing` under WhatsApp ₹899 plan | Industries page as a keyword list |
| WhatsApp marketing trends 2026 | Trends article title + first paragraph | New trend posts until this URL’s CTR moves |
| WhatsApp API pricing 2026 India | Pricing-guide title | Duplicated as a second pricing URL |
| WhatsApp conversational commerce | That article’s H1, already close | Homepage |
| Samyoj | Homepage title, Organization schema, brand query | Stuffed into provider H2s beyond the product row |

---

## 7. Order of work after you approve

| Step | Change | Effort | First number that should move |
|------|--------|--------|--------------------------------|
| 1 | `www` → apex 301 audit | Small | `www` impressions down |
| 2 | `.html` → clean 301 for features, pricing, flows, blog hub | Small | Duplicate URL rows disappear in GSC |
| 3 | Title/description on trends, API pricing, conversational commerce, CTWA | Small | CTR on those four URLs |
| 4 | Five blocks on the existing Top 7 article (table + 4 H2s), no new URL | Medium | Clicks on the three long-tail queries; head-term position later |
| 5 | Payments article answer block + internal link from the table | Small | Position on that URL (now 30) |
| 6 | GA4 CTA events; noindex UTM app URLs | Small | Key events > 0 |
| 7 | Hero image / redirect hop on mobile | Medium | Mobile LCP, mobile engagement time |
| 8 | One real referring domain (G2/Capterra or a citation) | Outside the website | Top 7 head-term position, slowly |

Deploy the 10 local posts only after they are in the sitemap **and** return HTTP 200. Submitting them now would add 404s. They are not the ranking lever; the Top 7 URL is.

---

## 8. What “better” looks like in the next GSC export

Not a promise. These are the checks:

- Brand query `samyoj` stays position 1–3 and does not lose clicks.
- Trends + API pricing + conversational commerce CTR above 2% if impressions stay above ~50.
- Top 7 long-tail queries (no-code, uptime, SMB teams) show at least one click.
- Head terms (“best whatsapp api provider” and the three siblings) are unchanged or slightly better. If they are still at 70 after a title-only edit, that confirms section 5.3: stop title iteration and do the table plus a link.
- GA4 organic sessions above 6 in a 28-day window, with `cta_start_trial` or `cta_book_demo` greater than zero.
- `www` impressions materially lower than 187.

---

## 9. Data we still do not have

- No GA4 conversion, so “real customers from Google” is unknown. Section 5.6 is what creates that number.
- No query-level data past the top ~100 rows. The head is concentrated; the missing tail will not change the plan.
- CrUX field Core Web Vitals are empty in SEOptimer (“not enough real-world data”). Lab mobile 52 is the only speed evidence.
- Backlink detail beyond Ahrefs DR 0 and SEOptimer’s single backlink. Enough to know links are the constraint on bucket C; not enough to name the linking site.

---

*Sources of the numbers: Composio `GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY` and `GOOGLE_ANALYTICS_RUN_REPORT` on 12 Nov 2026; SEOptimer report `829190.ae4O2FjyooK8I`; Ahrefs domain rating free endpoint. CTR-by-position ranges are from published Advanced Web Ranking organic CTR studies, used as a benchmark, not as Samyoj’s predicted CTR.*
