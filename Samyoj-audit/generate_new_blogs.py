#!/usr/bin/env python3
"""Generate long-form blog HTML from missed-leads template."""
from __future__ import annotations

import html
import json
from pathlib import Path

TEMPLATE = Path(r"E:\samyojjj-website\samyoj-homepage\blog\missed-leads-across-social-inboxes.html")
OUT_DIR = Path(r"E:\samyojjj-website\samyoj-homepage\blog")
DATE = "November 12, 2026"
ISO_DATE = "2026-11-12"

SOURCES_BLOCK = """
<p class="blog-sources"><strong>Primary sources:</strong>
<a href="https://developers.facebook.com/docs/whatsapp" rel="noopener noreferrer" target="_blank">Meta WhatsApp Business Platform documentation</a>,
<a href="https://developers.facebook.com/docs/whatsapp/pricing" rel="noopener noreferrer" target="_blank">Meta WhatsApp pricing</a>,
<a href="https://www.whatsapp.com/legal/business-terms" rel="noopener noreferrer" target="_blank">WhatsApp Business Terms</a>,
<a href="https://samyoj.com/pricing" rel="noopener noreferrer" target="_blank">Samyoj pricing</a>.
Figures change—verify on Meta before you budget or publish customer promises.</p>
"""

ARTICLES = [
    {
        "slug": "whatsapp-crm-small-teams-india-guide",
        "category": "WhatsApp CRM",
        "title": "WhatsApp CRM for Small Teams in India: A Practical Guide (2026)",
        "description": "What a WhatsApp CRM should do for a 3–10 person India team, how it differs from the consumer app, and how to connect Meta Cloud API without overbuying software.",
        "read_mins": 14,
        "hero_alt": "A small business team reviewing WhatsApp customer conversations in a shared inbox",
        "toc": [
            ("what-whatsapp-crm-means", "What “WhatsApp CRM” means in 2026"),
            ("when-you-need-api", "When the Business app is not enough"),
            ("features-checklist", "Features checklist for small teams"),
            ("costs-india", "Real costs in India"),
            ("samyoj-workflow", "How Samyoj fits the workflow"),
        ],
        "sections_html": """
<section id="what-whatsapp-crm-means"><h2>What “WhatsApp CRM” means in 2026</h2>
<p>A WhatsApp CRM is not a separate WhatsApp account. It is the operating layer around <strong>official WhatsApp Business Platform (Cloud API)</strong> conversations: who owns each chat, what stage the customer is in, what was promised, and what happens next. Meta documents the platform for developers and solution partners on <a href="https://developers.facebook.com/docs/whatsapp" target="_blank" rel="noopener noreferrer">developers.facebook.com</a>.</p>
<p>For a small India team, the useful definition is practical: every inbound WhatsApp message becomes a <em>record</em> with owner, status, and history—so marketing, sales, and support are not guessing in personal phones. That is different from pinning chats in the consumer WhatsApp app, which has no shared pipeline, limited assignment, and no audit trail when staff change devices.</p>
<p>Search demand for “whatsapp crm” in India is largely commercial: teams comparing inbox tools, API access, and monthly software cost before they run broadcasts or ads. Your buying decision should start from daily volume and channels, not from a feature laundry list.</p></section>
<section id="when-you-need-api"><h2>When the Business app is not enough</h2>
<p>The free <strong>WhatsApp Business app</strong> works for a single location and a handful of operators. Meta’s upgrade path to the API is described in their onboarding docs. Teams typically outgrow the app when:</p>
<ul>
<li>More than one person must reply without unlocking a shared phone.</li>
<li>You need approved <strong>message templates</strong> for alerts outside the 24-hour service window.</li>
<li>You run <strong>Click-to-WhatsApp ads</strong> and need every click logged against a contact record.</li>
<li>You must connect Instagram DMs or Facebook Messenger without copying screenshots into a spreadsheet.</li>
</ul>
<p>Moving to Cloud API does not remove Meta’s rules: customers still must opt in to marketing, templates still need approval, and pricing is per conversation category as published in Meta’s <a href="https://developers.facebook.com/docs/whatsapp/pricing" target="_blank" rel="noopener noreferrer">pricing tables</a> (India rows apply to your billing country).</p></section>
<section id="features-checklist"><h2>Features checklist for small teams</h2>
<p>Use this checklist in demos. If a vendor cannot show the workflow live, treat the checkbox as unproven.</p>
<ul>
<li><strong>Shared inbox</strong> with assignment and collision awareness (two agents should not unknowingly contradict each other).</li>
<li><strong>Contact timeline</strong> that stores inbound/outbound messages—not only notes typed by agents.</li>
<li><strong>Pipeline or tags</strong> simple enough that reps actually update status daily.</li>
<li><strong>Template library</strong> with category labels (marketing, utility, authentication) matching Meta’s template manager.</li>
<li><strong>Broadcast tools</strong> that enforce opt-in lists; avoid “upload any CSV” products that encourage spam.</li>
<li><strong>Webhooks or integrations</strong> only if you truly need them—many SMBs fail projects by connecting five systems before inbox hygiene works.</li>
</ul>
<p>Samyoj positions itself as a <strong>Meta Tech Provider</strong> on Cloud API with a shared inbox, CRM records, automation, and optional Instagram/Facebook on the Multi-channel plan—see the <a href="../features.html">features page</a> for current modules rather than assuming unlimited AI or seats.</p></section>
<section id="costs-india"><h2>Real costs in India</h2>
<p>Budget three layers:</p>
<ol>
<li><strong>Software subscription</strong> — Samyoj lists WhatsApp at <strong>₹899/month</strong> and Multi-channel at <strong>₹1,499/month</strong> (5 team members, 200 AI credits/month on paid plans per <a href="../pricing.html">pricing</a>).</li>
<li><strong>Meta conversation charges</strong> — billed per Meta’s rate card; Samyoj states message charges at actuals without markup on Meta rates.</li>
<li><strong>People time</strong> — template creation, weekly list hygiene, and reviewing quality rating in Meta Business Manager.</li>
</ol>
<p>Do not trust single-number “₹X per message” blog posts unless they cite Meta’s table and date. Meta updates categories and free-tier allowances periodically.</p></section>
<section id="samyoj-workflow"><h2>How Samyoj fits the workflow</h2>
<p>A minimal rollout that matches how small teams actually work:</p>
<ol>
<li>Connect the WhatsApp number through Samyoj’s in-app setup (no-code path described on product pages).</li>
<li>Import or collect only <strong>opted-in</strong> contacts before the first marketing broadcast.</li>
<li>Create three pipeline stages (new, working, won/lost) and require a status change before closing a chat.</li>
<li>Link high-intent chats from Click-to-WhatsApp ads using UTM or native ad tooling, then review weekly in one inbox.</li>
</ol>
<p>Start a <strong>14-day Launch trial</strong> on Samyoj if you want to validate inbox + CRM before committing to Multi-channel. For a deeper definition of CRM concepts, read the existing <a href="what-is-whatsapp-crm.html">What is a WhatsApp CRM?</a> guide and update it as your process matures.</p>
<p><strong>Takeaway:</strong> pick a WhatsApp CRM for assignment, compliance, and measurable follow-up—not because a homepage promised unrealistic open-rate percentages.</p></section>
""" + SOURCES_BLOCK,
    },
    {
        "slug": "whatsapp-crm-pricing-india-breakdown-2026",
        "category": "Pricing",
        "title": "WhatsApp CRM Pricing in India: Software + Meta Fees (2026)",
        "description": "Break down WhatsApp CRM price quotes: platform subscription, Meta conversation billing, hidden integration costs, and how Samyoj’s ₹899 and ₹1,499 plans map to real workflows.",
        "read_mins": 12,
        "hero_alt": "Spreadsheet comparing WhatsApp software subscription and Meta message charges",
        "toc": [
            ("line-items", "Every line item on a quote"),
            ("meta-conversations", "How Meta conversation pricing works"),
            ("compare-vendors", "Comparing vendor models fairly"),
            ("samyoj-plans", "Samyoj plans in plain language"),
            ("budget-template", "A simple budget template"),
        ],
        "sections_html": """
<section id="line-items"><h2>Every line item on a quote</h2>
<p>When an Indian buyer searches “whatsapp crm price,” they usually want one number. Honest pricing is always a stack:</p>
<ul>
<li><strong>Inbox / CRM software</strong> (per month, per seat or per workspace).</li>
<li><strong>WhatsApp Platform fees</strong> paid to Meta per conversation rules.</li>
<li><strong>One-time setup</strong> (number migration, template creation, training)—sometimes ₹0 if self-serve.</li>
<li><strong>Optional ads</strong> (Click-to-WhatsApp is Meta Ads spend, not CRM software).</li>
</ul>
<p>Any vendor quoting “all inclusive ₹___” without separating Meta pass-through fees should be asked to show Meta’s invoice path.</p></section>
<section id="meta-conversations"><h2>How Meta conversation pricing works</h2>
<p>Meta prices WhatsApp Business Platform messages using <strong>conversation categories</strong> (marketing, utility, authentication, service) defined in official documentation. Rates depend on country and category; India has its own row in the rate tables. Service conversations opened by a user message within the customer service window follow different rules than outbound marketing templates.</p>
<p>Samyoj states <strong>direct Meta billing for message charges with no markup</strong> on published Meta rates—your finance team should still reconcile Meta Business Manager invoices monthly.</p></section>
<section id="compare-vendors"><h2>Comparing vendor models fairly</h2>
<p>India’s market includes BSPs, tech providers, and resellers. Ask the same four questions everywhere:</p>
<ol>
<li>Are you on <strong>Cloud API</strong> (Meta-hosted) or legacy on-prem?</li>
<li>Who signs Meta’s terms—the customer or the vendor?</li>
<li>Are template sends metered separately from inbox seats?</li>
<li>What happens to your number if you leave—Meta’s number portability rules apply.</li>
</ol>
<p>Our <a href="top-7-whatsapp-business-api-providers.html">provider comparison</a> article is updated for positioning; use it for criteria, not as a promise of rank in Google.</p></section>
<section id="samyoj-plans"><h2>Samyoj plans in plain language</h2>
<p>From the public pricing page (verify before sales calls):</p>
<ul>
<li><strong>Launch trial</strong> — ₹0 for 14 days with limits on teammates and contacts.</li>
<li><strong>WhatsApp</strong> — ₹899/month: one number, five team members, inbox, CRM, broadcasts, automation; 200 AI credits/month on paid plans.</li>
<li><strong>Multi-channel</strong> — ₹1,499/month: adds Instagram and Facebook Messenger.</li>
<li>Quarterly (−5%) and annual (−20%) billing discounts apply to listed monthly prices.</li>
</ul>
<p>Do not quote deprecated Starter/Growth/Pro tiers—they are not on the current pricing page.</p></section>
<section id="budget-template"><h2>A simple budget template</h2>
<p>For leadership approval, model three months:</p>
<pre>Software = plan price × months
Meta = (expected marketing conv × Meta India marketing rate)
      + (expected utility conv × utility rate)
      + (expected service conv × service rate)
People = hours/week × internal hourly cost</pre>
<p>Pull conversation counts from a quiet test week before scaling broadcasts. For Meta’s published tables, use the link in Meta’s pricing doc—not a screenshot in a random blog.</p>
<p>Related reading: <a href="meta-whatsapp-api-pricing-2026-guide.html">Meta WhatsApp API pricing guide</a>.</p></section>
""" + SOURCES_BLOCK,
    },
    {
        "slug": "click-to-whatsapp-ads-cost-india-guide",
        "category": "Meta Ads",
        "title": "Click-to-WhatsApp Ads Cost in India: Budget, CPL, and CRM Tracking",
        "description": "How to estimate Click-to-WhatsApp (CTWA) ad cost in India: Meta Ads spend, conversation fees after the click, and CRM setup so CPL numbers are real.",
        "read_mins": 13,
        "hero_alt": "Mobile ad leading to a WhatsApp business conversation",
        "toc": [
            ("what-ctwa-charges", "What you pay for vs after the click"),
            ("cpl-math", "CPL math without fake benchmarks"),
            ("creative-testing", "Creative and audience levers"),
            ("post-click", "Post-click costs: conversations & CRM"),
            ("measurement", "Measurement checklist"),
        ],
        "sections_html": """
<section id="what-ctwa-charges"><h2>What you pay for vs after the click</h2>
<p><strong>Click-to-WhatsApp ads</strong> are standard Meta ads with a WhatsApp destination. You pay for delivery in Ads Manager (CPM/CPC/CPA objectives per Meta’s ad auction). After a user opens WhatsApp and messages your business, <strong>WhatsApp Platform conversation charges</strong> may apply per Meta’s category rules—not inside Ads Manager’s CPC line item.</p>
<p>Meta documents CTWA setup in Business Help Center and developers’ marketing API guides. Samyoj’s setup walkthrough is in <a href="how-to-set-up-click-to-whatsapp-ads.html">Click-to-WhatsApp Ads Setup</a>.</p></section>
<section id="cpl-math"><h2>CPL math without fake benchmarks</h2>
<p>Cost per lead = total spend ÷ qualified leads you can verify in CRM. Do not copy generic “50% lower CPL” claims from landing-page comparison posts unless you have your own A/B test.</p>
<p>Segment:</p>
<ul>
<li><strong>Cost per click-to-WhatsApp</strong> — Ads Manager.</li>
<li><strong>Cost per first reply</strong> — requires inbox timestamps.</li>
<li><strong>Cost per qualified opportunity</strong> — requires human or documented qualification rules.</li>
</ul>
<p>India CPAs vary by vertical (education, health, D2C). Start with a capped daily budget, one audience, two creatives—then scale.</p></section>
<section id="creative-testing"><h2>Creative and audience levers</h2>
<p>CTWA often works when the ad promises a <em>specific next step</em> (“Get the fee structure on WhatsApp”) instead of a generic brand impression. Match the first auto-reply or human script to that promise within minutes; Meta’s policies still require truthful ad content.</p></section>
<section id="post-click"><h2>Post-click costs: conversations & CRM</h2>
<p>After the chat starts, utility or service conversations may be cheaper than marketing templates used for broad nurture. If your funnel sends a marketing template to everyone who never replied, you may double-pay (ads + marketing conversations).</p>
<p>Samyoj can centralize CTWA leads in the shared inbox and CRM; verify which automations are live on your plan before promising “instant qualification” in ad copy.</p></section>
<section id="measurement"><h2>Measurement checklist</h2>
<ul>
<li>UTM or Meta’s native parameters preserved into the inbox where possible.</li>
<li>One owner per new thread within business hours; define off-hours behavior.</li>
<li>Weekly export: ad spend, chats started, qualified, won—same definitions each week.</li>
<li>Compare against <a href="whatsapp-click-to-chat-ads-vs-landing-pages.html">CTWA vs landing pages</a> only with your data.</li>
</ul></section>
""" + SOURCES_BLOCK,
    },
    {
        "slug": "whatsapp-business-api-onboarding-india-checklist",
        "category": "Implementation",
        "title": "WhatsApp Business API Onboarding in India: Step-by-Step Checklist",
        "description": "Meta Cloud API onboarding for Indian businesses: Meta Business Manager, display name, number rules, template basics, and going live without a developer.",
        "read_mins": 15,
        "hero_alt": "Checklist for connecting a business phone number to WhatsApp Cloud API",
        "toc": [
            ("prerequisites", "Prerequisites Meta checks"),
            ("business-manager", "Business Manager and WABA"),
            ("number-rules", "Phone number rules"),
            ("display-name", "Display name and profile"),
            ("go-live", "Go-live with a tech provider"),
        ],
        "sections_html": """
<section id="prerequisites"><h2>Prerequisites Meta checks</h2>
<p>Before API access, Meta typically expects a legitimate business identity: Business Manager, verifiable business details, and compliance with <a href="https://www.whatsapp.com/legal/business-terms" target="_blank" rel="noopener noreferrer">WhatsApp Business Terms</a>. Policy pages change—read the current version before onboarding customers in regulated industries (finance, health).</p></section>
<section id="business-manager"><h2>Business Manager and WABA</h2>
<p>Create or use a <strong>Meta Business Manager</strong> account. A WhatsApp Business Account (WABA) holds phone numbers, templates, and billing. Tech providers like Samyoj connect your WABA through partner flows described in Meta’s partner documentation—customers still own the business relationship with Meta for message charges.</p></section>
<section id="number-rules"><h2>Phone number rules</h2>
<p>You can migrate a number from the consumer or Business app to API, or use a new eligible number. Meta documents restrictions (VoIP limits, country support, banned histories). Plan a maintenance window: migrating may log everyone out of the old app session.</p></section>
<section id="display-name"><h2>Display name and profile</h2>
<p>Display names are reviewed against brand guidelines. Rejections delay go-live. Prepare website, billing document, or trademark proof if requested. Profile photo and category should match what customers expect when they message you.</p></section>
<section id="go-live"><h2>Go-live with a tech provider</h2>
<p>Samyoj advertises a <strong>no-code connect</strong> path for teams without developers—use the in-app wizard and support contacts on <a href="../contact.html">contact</a> if Meta flags the number. First production tasks:</p>
<ol>
<li>Submit 2–3 utility templates (order update, appointment reminder).</li>
<li>Configure a welcome message for CTWA traffic.</li>
<li>Train agents on the <a href="meta-messaging-window-response-workflow.html">24-hour messaging window</a>.</li>
</ol>
<p><strong>Takeaway:</strong> onboarding is a compliance and data project, not only a technical toggle.</p></section>
""" + SOURCES_BLOCK,
    },
    {
        "slug": "whatsapp-message-templates-approval-guide",
        "category": "Messaging",
        "title": "WhatsApp Message Templates: Approval Guide for Indian Businesses",
        "description": "How WhatsApp template categories work, why Meta rejects templates, and a workable approval workflow for marketing, utility, and authentication messages.",
        "read_mins": 11,
        "hero_alt": "Template message review screen in a WhatsApp business account",
        "toc": [
            ("categories", "Template categories Meta uses"),
            ("common-rejections", "Common rejection reasons"),
            ("writing-rules", "Writing templates that survive review"),
            ("operational-workflow", "Operational workflow for teams"),
            ("samyoj-notes", "Using templates inside Samyoj"),
        ],
        "sections_html": """
<section id="categories"><h2>Template categories Meta uses</h2>
<p>Outbound business-initiated messages generally require <strong>approved templates</strong>. Categories (marketing, utility, authentication, service) affect pricing and policy. Definitions live in Meta’s template documentation—do not guess category to save money; miscategorization can pause the WABA.</p></section>
<section id="common-rejections"><h2>Common rejection reasons</h2>
<ul>
<li>Promotional language in a utility template.</li>
<li>Missing opt-out language where required for marketing.</li>
<li>Variable placeholders without sample values.</li>
<li>URL shorteners or mismatched domains vs verified business.</li>
</ul></section>
<section id="writing-rules"><h2>Writing templates that survive review</h2>
<p>Write the customer-facing text first, then map to category. Keep one clear CTA. For India, English and Hindi templates may need parallel approval if you send both—check current Meta language support for your WABA.</p></section>
<section id="operational-workflow"><h2>Operational workflow for teams</h2>
<ol>
<li>Draft in a shared doc with legal/marketing approval timestamps.</li>
<li>Submit in Business Manager; track status daily near campaign launches.</li>
<li>Version templates instead of editing live names—campaigns break if you hard-delete.</li>
<li>Pair templates with <a href="customer-messaging-consent-india-multichannel.html">consent practices</a> for India outreach.</li>
</ol></section>
<section id="samyoj-notes"><h2>Using templates inside Samyoj</h2>
<p>Samyoj broadcasts and automations should reference templates synced from your WABA. If a flow fails, check template status in Meta first, then Samyoj’s automation logs. See <a href="automating-whatsapp-broadcasts.html">broadcast automation guide</a> for sequencing.</p></section>
""" + SOURCES_BLOCK,
    },
    {
        "slug": "meta-tech-provider-vs-whatsapp-bsp-explained",
        "category": "Meta Partners",
        "title": "Meta Tech Provider vs WhatsApp BSP: What Indian Buyers Should Know",
        "description": "Clarify Meta’s partner tracks: Tech Provider vs Business Solution Provider, what changes for billing and support, and accurate language for Samyoj in 2026.",
        "read_mins": 10,
        "hero_alt": "Diagram concept showing Meta partner types for WhatsApp Business Platform",
        "toc": [
            ("two-tracks", "Two partner tracks"),
            ("tech-provider-role", "What a Tech Provider does"),
            ("bsp-role", "What a BSP does"),
            ("samyoj-status", "Samyoj’s stated status"),
            ("buyer-questions", "Questions to ask any vendor"),
        ],
        "sections_html": """
<section id="two-tracks"><h2>Two partner tracks</h2>
<p>Meta’s partner ecosystem for WhatsApp Business Platform includes different program roles. Public marketing often blurs “official partner,” “BSP,” and “Tech Provider.” Meta’s partner directory and program pages are the source of truth for a vendor’s <em>current</em> designation.</p></section>
<section id="tech-provider-role"><h2>What a Tech Provider does</h2>
<p>Tech Providers typically deliver software that connects customers to Cloud API: inboxes, automation, CRM, integrations. Customers may still hold WABA ownership and Meta billing relationships depending on the commercial model.</p></section>
<section id="bsp-role"><h2>What a BSP does</h2>
<p>Business Solution Providers historically played a stronger hosted API and billing intermediary role in parts of the market. Cloud API reduced some hosting burden, but BSP is still a distinct program track—verify on Meta’s site rather than inferring from a logo on a landing page.</p></section>
<section id="samyoj-status"><h2>Samyoj’s stated status</h2>
<p>Samyoj publicly describes itself as a <strong>Meta Tech Provider</strong> for WhatsApp Business Platform via Cloud API—not as an official BSP unless that changes in Meta’s directory. Site copy and <a href="../llms.txt">llms.txt</a> repeat this to reduce AI misquotes. Do not claim “Meta Business Partner BSP” in ads or sales decks without directory proof.</p></section>
<section id="buyer-questions"><h2>Questions to ask any vendor</h2>
<ol>
<li>Which Meta program are you in today—can you show the listing?</li>
<li>Who invoices Meta conversation fees?</li>
<li>Where do message templates live—customer WABA or vendor sub-account?</li>
<li>What is the exit plan for the phone number?</li>
</ol></section>
""" + SOURCES_BLOCK,
    },
    {
        "slug": "whatsapp-shared-inbox-software-buyers-guide-india",
        "category": "Operations",
        "title": "WhatsApp Shared Inbox Software: Buyer’s Guide for India (2026)",
        "description": "How to evaluate WhatsApp shared inbox tools: assignment, audit trails, multichannel needs, API access, and pricing traps for growing teams.",
        "read_mins": 12,
        "hero_alt": "Multiple support agents collaborating in one WhatsApp inbox",
        "toc": [
            ("shared-inbox-defined", "Shared inbox vs multi-device hack"),
            ("must-have", "Must-have capabilities"),
            ("nice-to-have", "Nice-to-have that can wait"),
            ("evaluation-script", "30-minute demo script"),
            ("samyoj-fit", "Where Samyoj fits"),
        ],
        "sections_html": """
<section id="shared-inbox-defined"><h2>Shared inbox vs multi-device hack</h2>
<p>WhatsApp’s linked devices are not a CRM. A true shared inbox logs which agent replied, supports assignment, and survives staff turnover. For API numbers, the inbox is mandatory once more than one human handles customers.</p></section>
<section id="must-have"><h2>Must-have capabilities</h2>
<ul>
<li>Role-based access (agents vs admins).</li>
<li>Internal notes separate from customer-visible text.</li>
<li>Search by phone, name, or tag.</li>
<li>Export or API access for compliance requests.</li>
</ul></section>
<section id="nice-to-have"><h2>Nice-to-have that can wait</h2>
<p>AI auto-replies, voice bots, and 20-channel unification sound good in demos but fail when basic tagging is missing. Add AI only after you document approved answers and escalation paths—see <a href="ai-agents-in-whatsapp.html">AI agents guide</a> for limits.</p></section>
<section id="evaluation-script"><h2>30-minute demo script</h2>
<ol>
<li>Two agents answer the same test contact—show collision handling.</li>
<li>Trigger a template send; show rejection handling.</li>
<li>Import a 50-contact opt-in list; show broadcast preview.</li>
<li>Ask for downtime SLA in writing—avoid unverifiable “99.9%” unless contract-backed.</li>
</ol></section>
<section id="samyoj-fit"><h2>Where Samyoj fits</h2>
<p>Samyoj combines shared inbox, CRM, automation, and optional Instagram/Facebook on higher tiers. Match plan to channels: WhatsApp-only teams may not need Multi-channel on day one. Trial via <a href="https://app.samyoj.com/" target="_blank" rel="noopener noreferrer">app.samyoj.com</a>.</p></section>
""" + SOURCES_BLOCK,
    },
    {
        "slug": "whatsapp-broadcast-opt-in-compliance-india",
        "category": "Compliance",
        "title": "WhatsApp Broadcast Rules: Opt-In and Compliance for India",
        "description": "Legal and platform rules for WhatsApp marketing broadcasts in India: Meta policies, consent records, TRAI SMS context, and safe list-building.",
        "read_mins": 13,
        "hero_alt": "Consent checklist for WhatsApp marketing broadcasts",
        "toc": [
            ("meta-rules", "Meta’s marketing rules"),
            ("india-consent", "India consent practices"),
            ("list-hygiene", "List hygiene and unsubscribes"),
            ("broadcast-ops", "Operating broadcasts weekly"),
            ("quality-rating", "Quality rating and bans"),
        ],
        "sections_html": """
<section id="meta-rules"><h2>Meta’s marketing rules</h2>
<p>Marketing template messages require user opt-in and must follow WhatsApp Business and Commerce policies. Meta can reduce limits or disable WABAs that generate blocks and reports. Official policy pages supersede any blog summary—re-read before festive campaigns.</p></section>
<section id="india-consent"><h2>India consent practices</h2>
<p>WhatsApp opt-in is separate from email or SMS consent. TRAI regulates telco SMS; WhatsApp is a different channel with Meta as platform enforcer. Document <em>how</em> the user agreed (checkout checkbox, keyword, paper form) and store evidence. Our <a href="customer-messaging-consent-india-multichannel.html">India consent checklist</a> goes deeper on multichannel capture.</p></section>
<section id="list-hygiene"><h2>List hygiene and unsubscribes</h2>
<ul>
<li>Remove numbers that opt out or bounce templates repeatedly.</li>
<li>Segment by language and purchase stage—blanket promos increase blocks.</li>
<li>Never buy phone number lists; it violates platform rules and Indian marketing norms.</li>
</ul></section>
<section id="broadcast-ops"><h2>Operating broadcasts weekly</h2>
<p>Run a calendar: who approves copy, who uploads the segment, who monitors replies in the inbox. Samyoj broadcasts should tie back to tags in CRM so sales can continue threads. Technical steps: <a href="automating-whatsapp-broadcasts.html">broadcast automation guide</a>.</p></section>
<section id="quality-rating"><h2>Quality rating and bans</h2>
<p>Monitor quality rating in Meta Business Manager. If it drops, pause marketing templates and fix relevance. See <a href="how-to-avoid-whatsapp-account-bans-quality-score.html">account bans guide</a> for escalation patterns—not as fear marketing, but as operational discipline.</p></section>
""" + SOURCES_BLOCK,
    },
    {
        "slug": "whatsapp-api-no-code-setup-india-guide",
        "category": "Implementation",
        "title": "WhatsApp Business API Without a Developer: India Setup Guide",
        "description": "How marketing and ops teams connect WhatsApp Cloud API without engineering: Meta Business Manager, tech provider onboarding, templates, and Samyoj’s no-code path.",
        "read_mins": 11,
        "hero_image": "blog_automation_robot_3d.webp",
        "hero_alt": "No-code automation connecting WhatsApp Business API for a marketing team",
        "toc": [
            ("who-this-is-for", "Who this guide is for"),
            ("stack", "What you still need from Meta"),
            ("steps", "No-code setup steps"),
            ("mistakes", "Common mistakes"),
            ("samyoj", "Using Samyoj without code"),
        ],
        "sections_html": """
<section id="who-this-is-for"><h2>Who this guide is for</h2>
<p>GSC already surfaces “which WhatsApp platform providers are easy to set up without a developer.” This guide is for India teams where marketing or sales owns the inbox—not a product engineering squad. Twilio-style APIs are out of scope here; see our <a href="top-7-whatsapp-business-api-providers.html">provider comparison</a> for developer-first tools.</p></section>
<section id="stack"><h2>What you still need from Meta</h2>
<p>No-code does not mean “no Meta account.” You still need Business Manager, a WABA, an eligible phone number, and approved templates for marketing sends. Meta documents each step on <a href="https://developers.facebook.com/docs/whatsapp" target="_blank" rel="noopener noreferrer">developers.facebook.com</a>. Your tech provider (Samyoj is a <strong>Meta Tech Provider</strong>) hosts the inbox UI; Meta still enforces policy and bills conversation categories.</p></section>
<section id="steps"><h2>No-code setup steps</h2>
<ol>
<li>Create or access Meta Business Manager with admin rights.</li>
<li>Start Samyoj Launch trial and follow in-app WhatsApp connect.</li>
<li>Submit 2 utility templates before your first broadcast.</li>
<li>Import only opted-in contacts; document consent source.</li>
<li>Assign one owner per new chat; define escalation to humans.</li>
</ol>
<p>Deeper checklist: <a href="whatsapp-business-api-onboarding-india-checklist.html">API onboarding checklist</a>.</p></section>
<section id="mistakes"><h2>Common mistakes</h2>
<ul>
<li>Broadcasting purchased lists (policy violation).</li>
<li>Using marketing templates for service replies.</li>
<li>Expecting green-tick verification without meeting Meta eligibility.</li>
<li>Connecting five integrations before inbox hygiene works.</li>
</ul></section>
<section id="samyoj"><h2>Using Samyoj without code</h2>
<p>Product pages describe workflow and inbox setup without custom code. Paid WhatsApp is <strong>₹899/month</strong> (5 teammates); Multi-channel adds Instagram and Facebook at <strong>₹1,499/month</strong>. Verify limits on <a href="../pricing.html">pricing</a> before campaigns.</p></section>
""" + SOURCES_BLOCK,
    },
    {
        "slug": "whatsapp-quality-rating-improvement-guide-india",
        "category": "Compliance",
        "title": "WhatsApp Quality Rating: How to Improve and Protect Your Number (India)",
        "description": "Understand Meta quality rating, messaging limits, and practical steps Indian teams take to reduce blocks and keep templates deliverable.",
        "read_mins": 12,
        "hero_image": "blog_faq_robot_3d.webp",
        "hero_alt": "Quality score monitoring for a WhatsApp business account",
        "toc": [
            ("what-rating-is", "What quality rating measures"),
            ("signals", "Signals that hurt delivery"),
            ("playbook", "Improvement playbook"),
            ("limits", "Messaging limits and tiers"),
            ("samyoj-ops", "Operational habits in Samyoj"),
        ],
        "sections_html": """
<section id="what-rating-is"><h2>What quality rating measures</h2>
<p>Meta assigns quality and messaging limits to WhatsApp Business phone numbers based on customer feedback, blocks, and policy adherence. Official explanations live in Meta Business Help and developer policy docs—treat third-party “scores” as guesses unless they cite Meta.</p></section>
<section id="signals"><h2>Signals that hurt delivery</h2>
<ul>
<li>Marketing templates to cold or stale lists.</li>
<li>Content mismatch between ad, template, and first human reply.</li>
<li>High block/report rates after promotional bursts.</li>
<li>Miscategorized templates to escape pricing.</li>
</ul>
<p>Related: <a href="how-to-avoid-whatsapp-account-bans-quality-score.html">account bans guide</a>.</p></section>
<section id="playbook"><h2>Improvement playbook</h2>
<ol>
<li>Pause marketing templates when rating drops; fix relevance first.</li>
<li>Segment by recency and intent; never reuse one promo for all contacts.</li>
<li>Keep service replies inside the customer service window when possible.</li>
<li>Review weekly: template name, audience, replies, blocks.</li>
</ol></section>
<section id="limits"><h2>Messaging limits and tiers</h2>
<p>Limits scale with quality history. Do not promise unlimited sends in sales copy—check Business Manager for your number’s current tier before planning Diwali-scale broadcasts.</p></section>
<section id="samyoj-ops"><h2>Operational habits in Samyoj</h2>
<p>Use tags for consent source, pause automations when quality warnings appear, and route complaints to humans quickly. Samyoj does not override Meta enforcement; it helps teams see conversations in one inbox.</p></section>
""" + SOURCES_BLOCK,
    },
    {
        "slug": "whatsapp-multichannel-inbox-india-guide",
        "category": "Operations",
        "title": "WhatsApp, Instagram & Facebook Inbox: Multichannel Guide for India",
        "description": "Run WhatsApp, Instagram DMs, and Facebook Messenger from one workspace: routing rules, consent, and when Samyoj’s Multi-channel plan fits.",
        "read_mins": 13,
        "hero_image": "shared-inbox-people.webp",
        "hero_alt": "Team managing WhatsApp Instagram and Facebook customer messages together",
        "toc": [
            ("why-multichannel", "Why teams unify channels"),
            ("routing", "Routing and ownership"),
            ("consent", "Consent per channel"),
            ("measurement", "What to measure"),
            ("plan-fit", "Plan fit and Samyoj pricing"),
        ],
        "sections_html": """
<section id="why-multichannel"><h2>Why teams unify channels</h2>
<p>Indian D2C and education brands often acquire on Instagram ads, support on WhatsApp, and retarget on Facebook. Separate apps mean duplicate contacts and missed handoffs. A multichannel inbox is an operations fix, not a vanity integration list.</p></section>
<section id="routing"><h2>Routing and ownership</h2>
<p>Define primary channel per campaign, but one owner per <em>person</em>. When the same buyer DMs twice, search before creating a second opportunity. See <a href="deduplicate-customer-records-multiple-channels.html">deduplication guide</a> and <a href="missed-leads-across-social-inboxes.html">missed leads workflow</a>.</p></section>
<section id="consent"><h2>Consent per channel</h2>
<p>Instagram comment-to-DM automations have limits (<a href="instagram-comment-to-dm-automation-limits.html">read limits</a>). WhatsApp marketing still needs template approval and opt-in evidence (<a href="customer-messaging-consent-india-multichannel.html">India consent checklist</a>).</p></section>
<section id="measurement"><h2>What to measure</h2>
<ul>
<li>Median first human response time by channel.</li>
<li>Qualified leads (defined consistently).</li>
<li>Template block rate (WhatsApp).</li>
</ul></section>
<section id="plan-fit"><h2>Plan fit and Samyoj pricing</h2>
<p>WhatsApp-only teams may start on <strong>₹899/month</strong>. Add Instagram and Facebook on <strong>Multi-channel ₹1,499/month</strong> when those inboxes are staffed daily. <a href="https://app.samyoj.com/">Start trial</a> · <a href="../features.html">Features</a>.</p></section>
""" + SOURCES_BLOCK,
    },
]


def build_toc_html(toc: list[tuple[str, str]]) -> str:
    items = "\n".join(f'                <li><a href="#{sid}">{html.escape(label)}</a></li>' for sid, label in toc)
    return f"""              <ul class="blog-toc-list">
{items}
              </ul>"""


def build_sections(toc: list[tuple[str, str]], sections_html: str) -> str:
    return sections_html.strip()


def render_article(article: dict) -> str:
    base = TEMPLATE.read_text(encoding="utf-8")
    return render_article_meta(base, article)


def render_article_meta(base: str, article: dict) -> str:
    slug = article["slug"]
    title = article["title"]
    desc = article["description"]
    base = base.replace("missed-leads-across-social-inboxes", slug)
    base = base.replace(
        "<title>How to Stop Missing Leads Across WhatsApp, Instagram and Facebook | Samyoj Blog</title>",
        f"<title>{html.escape(title)} | Samyoj Blog</title>",
    )
    for old_desc in [
        "When customer inquiries arrive in separate social inboxes, ownership and follow-up can disappear. This guide shows how to build a simple, auditable workflow that keeps each inquiry moving.",
    ]:
        base = base.replace(old_desc, desc)
    base = base.replace(
        "<meta name=\"keywords\" content=\"missed leads across social media inboxes\">",
        f"<meta name=\"keywords\" content=\"{slug.replace('-', ', ')}\">",
    )
    base = base.replace(
        '"headline": "How to Stop Missing Leads Across WhatsApp, Instagram and Facebook"',
        json.dumps(title),
    )
    base = base.replace('"datePublished": "2026-10-30"', f'"datePublished": "{ISO_DATE}"')
    base = base.replace('"dateModified": "2026-10-30"', f'"dateModified": "{ISO_DATE}"')
    base = base.replace(
        "<span class=\"current\">How to Stop Missing Leads Across WhatsApp, Instagram and Facebook</span>",
        f"<span class=\"current\">{html.escape(title)}</span>",
    )
    base = base.replace(
        '<div class="blog-category-badge">Customer Operations</div>',
        f'<div class="blog-category-badge">{html.escape(article["category"])}</div>',
    )
    base = base.replace(
        '<h1 class="blog-article-title sy-hero-anim" style="--sy-hero-i:0">How to Stop Missing Leads Across WhatsApp, Instagram and Facebook</h1>',
        f'<h1 class="blog-article-title sy-hero-anim" style="--sy-hero-i:0">{html.escape(title)}</h1>',
    )
    base = base.replace(
        '<p class="blog-article-subtitle sy-hero-anim" style="--sy-hero-i:1">When customer inquiries arrive in separate social inboxes, ownership and follow-up can disappear. This guide shows how to build a simple, auditable workflow that keeps each inquiry moving.</p>',
        f'<p class="blog-article-subtitle sy-hero-anim" style="--sy-hero-i:1">{html.escape(desc)}</p>',
    )
    base = base.replace(
        "<div class=\"blog-author-date\">October 30, 2026 · 4 min read</div>",
        f'<div class="blog-author-date">{DATE} · {article["read_mins"]} min read</div>',
    )
    hero_img = article.get("hero_image", "blog_hero_dashboard_3d.webp")
    base = base.replace("blog_hero_dashboard_3d.webp", hero_img)
    base = base.replace(
        "https://samyoj.com/images/blog_hero_dashboard_3d.webp",
        f"https://samyoj.com/images/{hero_img}",
    )
    base = base.replace(
        'alt="A shared customer conversation workspace bringing several social channels together"',
        f'alt="{html.escape(article["hero_alt"])}"',
    )
    import re

    toc_html = build_toc_html(article["toc"])
    base = re.sub(
        r"<ul class=\"blog-toc-list\">.*?</ul>",
        toc_html,
        base,
        count=1,
        flags=re.DOTALL,
    )
    prose = build_sections(article["toc"], article["sections_html"])
    cta = """
<div class="blog-cta-banner">
  <div>
    <h3>Try Samyoj on official Meta Cloud API</h3>
    <p>14-day Launch trial · WhatsApp from ₹899/mo · Multi-channel ₹1,499/mo · Meta message charges at actuals</p>
    <a href="https://app.samyoj.com/" class="btn primary" target="_blank" rel="noopener noreferrer">Start free trial</a>
  </div>
</div>
"""
    insert_at = prose.rfind("</section>")
    if insert_at != -1:
        prose = prose[:insert_at] + cta + prose[insert_at:]
    start = '<div class="blog-prose">'
    end = "          </div>\n\n          <!-- Bottom Pagination Links -->"
    idx0 = base.find(start)
    idx1 = base.find(end)
    new_prose = f'{start}\n            <!-- Article Body -->\n{prose}\n'
    base = base[:idx0] + new_prose + base[idx1:]
    return base


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for art in ARTICLES:
        out = OUT_DIR / f"{art['slug']}.html"
        content = render_article(art)
        out.write_text(content, encoding="utf-8", newline="\n")
        print("wrote", out.name)


if __name__ == "__main__":
    main()
