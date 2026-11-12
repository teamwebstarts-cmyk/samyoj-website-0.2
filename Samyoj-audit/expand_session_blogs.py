"""Inject long, step-by-step marketing-style sections into session blogs."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(r"E:\samyojjj-website\samyoj-homepage\blog")

FIG = lambda img, alt: (
    f'<figure class="blog-hero-media" style="margin:28px 0"><img src="../images/{img}" alt="{alt}" loading="lazy" decoding="async" width="800" height="450" /></figure>'
)

COMMON_STEP_CSS = """
.blog-step-block { counter-reset: step; margin: 32px 0; }
.blog-step-block h3 { font-size: 18px; margin: 24px 0 12px; color: #0f172a; }
.blog-step { position: relative; padding: 16px 16px 16px 52px; margin-bottom: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; }
.blog-step::before { counter-increment: step; content: counter(step); position: absolute; left: 16px; top: 16px; width: 28px; height: 28px; border-radius: 50%; background: #4B2EEB; color: #fff; font-weight: 800; font-size: 14px; display: flex; align-items: center; justify-content: center; }
.blog-callout { border-left: 4px solid #4B2EEB; background: #eef2ff; padding: 16px 20px; border-radius: 0 12px 12px 0; margin: 24px 0; font-size: 15px; color: #334155; }
"""

def block(title: str, steps: list[str], tip: str = "") -> str:
    steps_html = "".join(f'<div class="blog-step"><p style="margin:0">{s}</p></div>' for s in steps)
    tip_html = f'<div class="blog-callout"><strong>Practical tip:</strong> {tip}</div>' if tip else ""
    return f'<section class="blog-deep-guide"><h2>{title}</h2><div class="blog-step-block">{steps_html}</div>{tip_html}</section>'


EXPANSIONS: dict[str, str] = {}

EXPANSIONS["whatsapp-crm-small-teams-india-guide"] = (
    FIG("blog_what_is_whatsapp_crm.webp", "WhatsApp CRM dashboard for a small India team")
    + block(
        "Week 1 playbook: set up WhatsApp CRM without overthinking",
        [
            "Write one sentence: who answers WhatsApp between 10 am and 7 pm, and who covers Sunday?",
            "Open Samyoj Launch trial. Connect WhatsApp via Standard Cloud API if you are on a new number, or ask support about Coexistence if you already live on WhatsApp Business App.",
            "Create three pipeline labels only: <em>New</em>, <em>Working</em>, <em>Closed</em>. Do not add ten custom stages on day one.",
            "Import or collect 50 opted-in test contacts—not your entire old spreadsheet.",
            "Submit one utility template (order update or appointment reminder) before any promotional blast.",
            "Run a 30-minute team drill: two agents reply to the same test chat and confirm only one customer-facing answer goes out.",
            "End the week by exporting a simple report: chats opened, first human reply time, deals marked closed.",
        ],
        "Teams that win treat WhatsApp like a shop counter: someone is always on duty, and every chat has an owner.",
    )
    + block(
        "Keyword map: what “whatsapp crm” buyers actually mean",
        [
            "They want a <strong>shared inbox</strong>—not five reps logging into one phone.",
            "They want <strong>broadcasts that will not get the number banned</strong>—templates + opt-in.",
            "They want <strong>₹ predictable software cost</strong>—compare Samyoj ₹899 vs Meta conversation fees separately.",
            "They want <strong>Click-to-WhatsApp ad leads in CRM</strong>—not screenshots in a group chat.",
        ],
    )
    + """<h2>What Samyoj does on day one (honest list)</h2>
<ul>
<li>Shared WhatsApp inbox with up to five teammates on the ₹899 plan (verify on <a href="../pricing.html">pricing</a>).</li>
<li>CRM records tied to chats, tags, and follow-ups—no custom code required for basic flows.</li>
<li>Broadcasts and automations that respect Meta template rules.</li>
<li>Meta message charges billed at actuals; Samyoj does not markup published Meta rates.</li>
</ul>
<p>Samyoj is a <strong>Meta Tech Provider</strong>, not an official BSP unless Meta’s partner directory says otherwise. Do not promise green tick or unlimited AI—paid plans include <strong>200 AI credits/month</strong>.</p>"""
)

EXPANSIONS["whatsapp-crm-pricing-india-breakdown-2026"] = (
    FIG("blog_whatsapp_payments.webp", "Breaking down WhatsApp CRM software and Meta message fees")
    + block(
        "How to explain pricing to your founder in five minutes",
        [
            "Line 1 — Software: Samyoj WhatsApp ₹899/month or Multi-channel ₹1,499/month (5 teammates, 200 AI credits on paid plans).",
            "Line 2 — Meta: conversation fees per category (marketing, utility, service, authentication). Pull India rows from Meta’s pricing doc before you quote a campaign.",
            "Line 3 — People: who writes templates, who cleans the contact list, who replies after ads?",
            "Line 4 — Ads: Click-to-WhatsApp spend is separate—it lives in Meta Ads Manager.",
            "Line 5 — Trial: 14-day Launch trial to validate inbox + one template before annual billing.",
        ],
        "Never tell finance “all inclusive ₹X” unless Meta invoices are included in that number.",
    )
    + """<h2>Sample monthly math (replace with your real Meta rates)</h2>
<p>Imagine 2,000 utility conversations and 400 marketing conversations in a month. Software stays flat at ₹899. Meta cost = (2,000 × utility rate) + (400 × marketing rate). Your spreadsheet should update when Meta changes tables—not when a blog post from 2024 says a flat ₹0.80.</p>
<p>Read the full rate context in our <a href="meta-whatsapp-api-pricing-2026-guide.html">Meta WhatsApp API pricing guide</a>.</p>"""
)

EXPANSIONS["click-to-whatsapp-ads-cost-india-guide"] = (
    FIG("blog_ctwa_cost_india.jpg", "Click-to-WhatsApp ad funnel to WhatsApp inbox")
    + block(
        "Step-by-step: measure real CPL, not dashboard vanity",
        [
            "In Ads Manager, note spend and Click-to-WhatsApp clicks for one ad set.",
            "In Samyoj inbox, tag every chat that arrived from that campaign (UTM or manual source tag).",
            "Define <em>qualified</em> in writing: e.g. asked price + shared city + budget band.",
            "Count qualified leads seven days after the ad set ends—late replies happen.",
            "CPL = ad spend ÷ qualified leads. Compare to landing-page CPL only with the same definition.",
            "Repeat with one new creative weekly; do not change audience, offer, and copy all at once.",
        ],
    )
    + """<h2>After the click: costs people forget</h2>
<p>Meta may bill a <strong>conversation</strong> when the customer messages you, depending on category and window rules. Samyoj software is separate. Train agents to reply inside the service window before firing expensive marketing templates.</p>
<p>Setup help: <a href="how-to-set-up-click-to-whatsapp-ads.html">Click-to-WhatsApp ads setup</a>.</p>"""
)

EXPANSIONS["whatsapp-business-api-onboarding-india-checklist"] = (
    """<p><strong>Short checklist.</strong> For the full Cloud API vs Coexistence walkthrough, read <a href="connect-whatsapp-number-broadcasting-platform-guide.html">Connect your WhatsApp number to a broadcasting platform</a>.</p>"""
    + block(
        "48-hour onboarding checklist",
        [
            "Hour 0–2: gather legal business name, address, website, admin Facebook login.",
            "Hour 2–4: start Samyoj connect flow; pick Standard vs Coexistence honestly.",
            "Hour 4–8: verify phone OTP; fix display name rejections early.",
            "Day 2: submit utility + one marketing template drafts.",
            "Day 2: document opt-in language you will use on site and checkout.",
            "Day 3: dry-run broadcast to 10 internal numbers.",
        ],
    )
)

EXPANSIONS["whatsapp-message-templates-approval-guide"] = (
    FIG("blog_message_templates_india.jpg", "WhatsApp message template review workflow")
    + block(
        "Write a template that reviewers understand",
        [
            "Open with the customer benefit in plain Hindi/English—no hidden promo inside a utility category.",
            "Add {{{1}}} variables only where needed; provide sample values in Business Manager.",
            "Include opt-out line for marketing: “Reply STOP to opt out” if your lawyer agrees.",
            "Avoid URL shorteners; use your primary domain.",
            "Submit 48 hours before Diwali/Sale—queues spike.",
            "If rejected, copy Meta’s reason verbatim into a shared doc; fix one issue per resubmit.",
        ],
    )
)

EXPANSIONS["meta-tech-provider-vs-whatsapp-bsp-explained"] = (
    FIG("blog_integrations_3d.webp", "Meta partner paths for WhatsApp Business Platform")
    + block(
        "Questions to ask sales before you sign",
        [
            "Show me your Meta partner listing today—not a logo from 2022.",
            "Who signs Meta’s WhatsApp terms—you or the vendor?",
            "Where do templates live, and who can edit them?",
            "How do I exit with my phone number if I switch?",
            "Are message fees invoiced by Meta directly or through the vendor?",
        ],
        "Samyoj publicly describes itself as a Meta Tech Provider on Cloud API. Treat BSP claims as false until verified on Meta’s directory.",
    )
)

EXPANSIONS["whatsapp-shared-inbox-software-buyers-guide-india"] = (
    FIG("blog_shared_inbox_india.jpg", "Shared WhatsApp inbox for multiple agents")
    + block(
        "Demo script for your ops lead (30 minutes)",
        [
            "Agent A and B both open the same new chat—show assignment or lock behavior.",
            "Add internal note; prove customer does not see it.",
            "Search old chat by phone number.",
            "Send approved template; show failure message if template paused.",
            "Export or screenshot one conversation for training.",
        ],
    )
)

EXPANSIONS["whatsapp-broadcast-opt-in-compliance-india"] = (
    FIG("blog_broadcast_compliance_india.jpg", "Opt-in compliance for WhatsApp broadcasts in India")
    + block(
        "Build opt-in the simple way",
        [
            "Checkbox on checkout: “Send order updates on WhatsApp.” Store timestamp + IP if you can.",
            "Keyword opt-in: customer texts “YES” on your official number—log it.",
            "Never import purchased lists—TRAI and Meta both punish this differently, but customers punish fastest.",
            "Segment: buyers vs inquiries vs support—three lists, not one blast to 50k.",
            "Weekly: remove numbers that replied STOP or bounced templates.",
        ],
    )
    + """<p>Legal note: this is operational guidance, not legal advice. Pair with <a href="customer-messaging-consent-india-multichannel.html">India consent checklist</a>.</p>"""
)

EXPANSIONS["whatsapp-api-no-code-setup-india-guide"] = (
    FIG("blog_automation_robot_3d.webp", "No-code WhatsApp automation for marketers")
    + block(
        "Marketer-friendly setup (no developer)",
        [
            "Log in with the Facebook account that already administers your Meta Business Portfolio.",
            "In Samyoj, choose WhatsApp → connect. Read each Meta permission screen—do not rush.",
            "Use a display name customers already recognize from your shop sign.",
            "Skip Shopify/Zapier on day one unless a webhook is blocking revenue today.",
            "Invite two teammates only; add the rest after week two.",
            "Book a calendar reminder Friday to review quality rating in WhatsApp Manager.",
        ],
    )
)

EXPANSIONS["whatsapp-quality-rating-improvement-guide-india"] = (
    FIG("blog_faq_robot_3d.webp", "Monitoring WhatsApp quality rating")
    + block(
        "If rating drops this week",
        [
            "Pause all marketing templates for 72 hours.",
            "Call the last 10 customers who blocked you—ask what felt spammy (sample of 10, not a survey claim).",
            "Rewrite template to match ad promise exactly.",
            "Shrink audience to engaged buyers only.",
            "Re-enable sends at 20% volume; watch rating daily.",
        ],
    )
)

EXPANSIONS["whatsapp-multichannel-inbox-india-guide"] = (
    FIG("shared-inbox-people.webp", "Multichannel WhatsApp Instagram Facebook inbox")
    + block(
        "Roll out Multi-channel without chaos",
        [
            "Week 1: WhatsApp only until response time stable.",
            "Week 2: add Instagram DMs; same owners as WhatsApp where possible.",
            "Week 3: Facebook Messenger; map Page roles in Meta.",
            "Write one routing rule: education leads → counselor A, support → counselor B.",
            "Upgrade to ₹1,499 Multi-channel plan only when IG/FB volume justifies daily checks.",
        ],
    )
)

EXPANSIONS["connect-whatsapp-number-broadcasting-platform-guide"] = (
    block(
        "Samyoj customer path (after Meta approves your number)",
        [
            "Sign up at app.samyoj.com → Launch trial.",
            "Settings → WhatsApp → follow Embedded Signup screens.",
            "Sync templates; wait for Approved status before Diwali promos.",
            "Upload opt-in segment; send test to internal numbers.",
            "Assign ad leads from Click-to-WhatsApp using inbox filters.",
            "Go live: one campaign, one audience, one template—measure replies for seven days.",
        ],
        "If you are migrating from another API vendor, tell Samyoj support before you start Coexistence—wrong path wastes a week.",
    )
    + FIG("contact/platforms/Friendly-3D-Onboarding-Checklist.webp", "Onboarding checklist for WhatsApp broadcasting")
)

LONG_TAIL: dict[str, str] = {}


def prose_block(keyword: str, audience: str, metric: str) -> str:
    return f"""
<h2>Think like a marketing lead, not a software shopper</h2>
<p>Most teams search <strong>{keyword}</strong> when WhatsApp already drives revenue—but ops is messy. Your buyer is usually {audience}. They do not want another login; they want fewer missed chats and a number that still works after Diwali campaigns.</p>
<p>Success in 30 days is simple to say and hard to do: every inbound message has an owner within business hours, promotional sends use an <em>approved</em> template, and you can report {metric} without opening five apps.</p>
<h3>Monday to Friday rhythm</h3>
<p><strong>Monday:</strong> review weekend chats; assign overdue threads.<br>
<strong>Tuesday:</strong> template performance—any spikes in blocks?<br>
<strong>Wednesday:</strong> ad → WhatsApp handoff audit if you run Click-to-WhatsApp.<br>
<strong>Thursday:</strong> train one new macro reply; retire one spammy broadcast.<br>
<strong>Friday:</strong> leadership snapshot—chats opened, qualified, closed (definitions unchanged week to week).</p>
<h3>Words that confuse buyers (use carefully)</h3>
<ul>
<li><strong>BSP</strong> vs <strong>Tech Provider</strong>—verify on Meta’s partner directory; Samyoj is a Tech Provider today.</li>
<li><strong>Coexistence</strong>—keep Business App + API; eligibility is Meta’s call.</li>
<li><strong>Quality rating</strong>—not the same as star reviews; it affects sending limits.</li>
</ul>
<p>When you are ready, start the <a href="https://app.samyoj.com/">14-day Launch trial</a> and keep this page open as your operating manual—not a one-time read.</p>
"""


for slug, kw, aud, met in [
    ("whatsapp-crm-small-teams-india-guide", "whatsapp crm", "a 3–10 person sales or admissions team", "median first-reply time"),
    ("whatsapp-crm-pricing-india-breakdown-2026", "whatsapp crm price india", "founders approving a monthly budget", "software + Meta fees on one sheet"),
    ("click-to-whatsapp-ads-cost-india-guide", "click to whatsapp ads cost", "performance marketers", "cost per qualified WhatsApp lead"),
    ("whatsapp-business-api-onboarding-india-checklist", "whatsapp business api onboarding", "ops managers", "time-to-first-approved-template"),
    ("whatsapp-message-templates-approval-guide", "whatsapp message templates", "content + compliance", "template approval rate"),
    ("meta-tech-provider-vs-whatsapp-bsp-explained", "meta tech provider whatsapp", "procurement", "vendor risk checklist signed"),
    ("whatsapp-shared-inbox-software-buyers-guide-india", "whatsapp inbox software", "customer support leads", "collision-free handoffs"),
    ("whatsapp-broadcast-opt-in-compliance-india", "whatsapp broadcast rules india", "growth leads", "opt-in evidence per segment"),
    ("whatsapp-api-no-code-setup-india-guide", "whatsapp api setup without developer", "marketers", "go-live without engineering ticket"),
    ("whatsapp-quality-rating-improvement-guide-india", "whatsapp quality rating", "lifecycle marketers", "stable green/yellow rating week"),
    ("whatsapp-multichannel-inbox-india-guide", "whatsapp instagram facebook inbox", "D2C heads", "one owner per person across channels"),
    ("connect-whatsapp-number-broadcasting-platform-guide", "connect whatsapp to broadcasting platform", "new API customers", "first compliant broadcast sent"),
]:
    LONG_TAIL[slug] = prose_block(kw, aud, met)

for slug, tail in LONG_TAIL.items():
    EXPANSIONS[slug] = EXPANSIONS.get(slug, "") + tail


def inject_css(text: str) -> str:
    if "blog-step-block" in text:
        return text
    return text.replace(
        "</style>\n  <link rel=\"stylesheet\" href=\"../samyoj-nav.css\">",
        COMMON_STEP_CSS + "\n  </style>\n  <link rel=\"stylesheet\" href=\"../samyoj-nav.css\">",
    )


def inject_body(text: str, extra: str) -> str:
    if "blog-deep-guide" in text:
        return text  # already expanded
    marker = '<p class="blog-sources">'
    if marker in text:
        return text.replace(marker, extra + "\n" + marker, 1)
    end = "          </div>\n\n          <!-- Bottom Pagination Links -->"
    if end in text:
        return text.replace(end, extra + "\n          </div>\n\n          <!-- Bottom Pagination Links -->", 1)
    return text + extra


def bump_read_time(text: str) -> str:
    return re.sub(
        r"· \d+ min read",
        lambda m: "· 25 min read" if int(re.search(r"\d+", m.group()).group()) < 20 else m.group(),
        text,
        count=1,
    )


def main():
    for slug, extra in EXPANSIONS.items():
        path = ROOT / f"{slug}.html"
        if not path.exists():
            print("skip missing", slug)
            continue
        text = path.read_text(encoding="utf-8")
        text = inject_css(text)
        text = inject_body(text, extra)
        text = bump_read_time(text)
        path.write_text(text, encoding="utf-8", newline="\n")
        print("expanded", slug)


if __name__ == "__main__":
    main()
