# Working shortlist (not the OpenSEO report)

Date: 12 Nov 2026. India Google suggestions plus Search Console 1 Aug–9 Nov 2026. Volumes are unknown until OpenSEO `get_keyword_metrics` runs. OpenSEO MCP is in `.cursor/mcp.json` but was not connected in this session, so no live SERP rank or US/IN volume was bought.

| Pages | Problem | Evidence | Proposed change | Who searches | Benefit | Effort | Uncertainty |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Trends, API pricing, click-to-WhatsApp, conversational commerce | Page 1, almost no clicks | GSC pos 4–9, 0–1 clicks | Titles already rewritten locally. Deploy, then compare 28-day CTR | People comparing tools or rates, close to a trial | More clicks at the same position | Done locally | Needs deploy + 2 weeks in GSC |
| www + .html twins | Impressions split | www home 187 impr, 0 clicks | 301s in vercel.json | Brand searchers | Recover wasted impressions | Done locally | Only after deploy |
| Top 7 providers | 1,624 impr, 0 clicks, pos ~70 | GSC head terms | No-code column added. Rank will not move without links | Buyers comparing providers | Clicks only after ~page 2 | On-page done | Backlinks unknown |
| GA4 | Cannot see trials | 7 generic clicks, 6 organic sessions | Button + link events in analytics.js | Existing visitors | Next week shows which page starts a trial | Done locally | Must mark key events in GA4 admin |
| India suggest: whatsapp api pricing india calculator, whatsapp crm price, click to whatsapp ads cost | Demand with no dedicated calculator | Google Suggest, India, 12 Nov 2026. No volume | Do not build a calculator until OpenSEO volumes say it beats the pricing guide | Teams estimating Meta cost before signup | Possible trial intent | High | Volume unknown |
| Local Maps / Indore | Not how this product is bought | SaaS, national WhatsApp CRM | Skip local-seo grid | Local walk-ins | Low | n/a | Wrong channel |
| Named testimonials | Unverified lifts can be cited by AI | Homepage + old llms.txt | EdTechLab card and llms customer metrics removed. Other named cards still on the homepage | Not a search query | Avoid a later trust problem | Partial | Cosco, HealthKart, MBA Fundas still on the homepage |
