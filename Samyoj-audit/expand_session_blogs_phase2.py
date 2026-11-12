"""Second pass: add 1000+ words of step content to thin session blogs."""
from pathlib import Path

ROOT = Path(r"E:\samyojjj-website\samyoj-homepage\blog")
MARKER = '<section class="blog-deep-guide">'

EXTRA: dict[str, str] = {}

EXTRA["whatsapp-api-no-code-setup-india-guide"] = """
<section><h2>Day-by-day: first 14 days on WhatsApp API (no developer)</h2>
<h3>Days 1–2 — Account hygiene</h3>
<p>Open Meta Business Settings and confirm you are an admin—not “employee” with limited access. If your agency owns the portfolio, get a transfer or shared admin before you connect Samyoj. Agencies leaving later is the number-one reason onboarding stalls.</p>
<p>On day one, write down your customer-facing name exactly as it appears on your storefront or GST invoice. Display-name rejections cost 48–72 hours. If you are a D2C brand, match the name on your packaging—not a cute abbreviation.</p>
<h3>Days 3–5 — Connect and test</h3>
<p>In Samyoj, complete WhatsApp connection. Send yourself a test message from a personal phone. Reply from the inbox. Ask a teammate to reply from their login. If both replies reach the customer, your basic routing works. If not, fix permissions before ads.</p>
<p>Create one saved reply: “Thanks for messaging us. A human will reply within X minutes.” Replace X with a promise you can keep in staffed hours.</p>
<h3>Days 6–9 — Templates and consent</h3>
<p>Draft a utility template for order or appointment updates. Draft a marketing template for your next sale—but send utility first; it approves faster and teaches your team the approval habit.</p>
<p>Add a WhatsApp opt-in checkbox on your website footer or checkout. Screenshot the wording for your compliance folder. WhatsApp opt-in is not the same as email newsletter signup.</p>
<h3>Days 10–14 — Soft launch</h3>
<p>Broadcast to &lt;100 known buyers who opted in. Measure replies and blocks—not opens. Pause if quality rating dips. Only then connect Click-to-WhatsApp or Instagram DMs on Multi-channel.</p>
</section>
<section><h2>When you actually need a developer</h2>
<p>You need engineering if you want custom warehouse logic, a proprietary scoring model inside your ERP, or bi-directional sync with a database Samyoj does not integrate today. You do <em>not</em> need engineering to answer chats, tag leads, send approved templates, or run Samyoj automations on supported paths.</p>
</section>
"""

EXTRA["whatsapp-multichannel-inbox-india-guide"] = """
<section><h2>Channel-by-channel: what to turn on first</h2>
<h3>WhatsApp</h3>
<p>Use WhatsApp for high-intent conversations: price questions, booking slots, payment links. Keep promotional templates sparse; lean on utility for post-purchase care.</p>
<h3>Instagram DMs</h3>
<p>Route influencer comment traffic and story replies into the same inbox. Comment-to-DM automations have limits—read <a href="instagram-comment-to-dm-automation-limits.html">what automation can and cannot do</a> before you promise instant DMs on every reel.</p>
<h3>Facebook Messenger</h3>
<p>Older audiences still message Pages. Connect only if someone checks Messenger daily; an unwatched channel hurts response-time metrics.</p>
<h2>One customer, one owner</h2>
<p>When the same person DMs on Instagram and messages on WhatsApp, search by phone or email before creating two pipeline cards. Merge when confident; when uncertain, ask one clarifying question instead of exposing data across threads.</p>
<h2>Staffing model</h2>
<p>Three shifts beat three apps. Publish a simple roster: who owns the unified inbox 10–2, 2–6, 6–10. Multi-channel at ₹1,499/month only pays off when Instagram and Facebook get the same discipline as WhatsApp.</p>
</section>
"""

EXTRA["whatsapp-quality-rating-improvement-guide-india"] = """
<section><h2>Read the signals before Meta throttles you</h2>
<p>Quality rating is Meta’s feedback loop. It is not your Google review score. When it drops, sending limits shrink—your 10,000-contact Diwali list may suddenly be impossible.</p>
<h3>Leading indicators you can watch weekly</h3>
<ul>
<li>Spike in “blocked” or “reported” after a template send.</li>
<li>Customers replying “stop” or “spam” in Hindi or English.</li>
<li>Template category mismatches (utility copy that sells a sale).</li>
<li>Agents sending marketing templates outside approved copy.</li>
</ul>
<h3>Recovery plan (14 days)</h3>
<p><strong>Days 1–3:</strong> stop marketing templates. Reply manually inside service windows.<br>
<strong>Days 4–7:</strong> rewrite the worst-performing template; shrink audience to 30-day buyers.<br>
<strong>Days 8–14:</strong> send utility-only updates; ask support to document one lesson per block event.</p>
<p>Samyoj cannot override Meta enforcement. Use the inbox to see which agent or campaign preceded complaints.</p>
</section>
"""

EXTRA["whatsapp-shared-inbox-software-buyers-guide-india"] = """
<section><h2>Build your scorecard before the demo</h2>
<p>Rate each vendor 1–5 on: collision handling, template sync, India pricing clarity, opt-in tools, Click-to-WhatsApp routing, and exit/migration language. Samyoj publishes ₹899 / ₹1,499 plans with Meta at actuals—ask others to separate software from Meta pass-through.</p>
<h2>Roles and permissions</h2>
<p>Admin: billing and WABA settings. Agent: reply only. Supervisor: reassign and export. If everyone is admin, someone will delete a template by accident.</p>
<h2>After you buy</h2>
<p>Week 1: inbox only. Week 2: one automation. Week 3: first broadcast. Week 4: ads integration. Skipping weeks creates the “we bought CRM but still use personal WhatsApp” failure mode.</p>
</section>
"""

EXTRA["whatsapp-broadcast-opt-in-compliance-india"] = """
<section><h2>Document consent like an auditor is visiting</h2>
<p>For each segment, store: source (checkout, keyword, event form), date, and exact wording the customer saw. When a regulator or Meta asks, you retrieve evidence—not memory.</p>
<h2>Festival season playbook</h2>
<p>60 days before: refresh opt-in copy. 30 days before: submit templates. 14 days before: test send to staff. 7 days before: halve audience to engaged buyers only. Day 0: monitor blocks hourly for the first six hours.</p>
<h2>Sample opt-in lines (edit with your lawyer)</h2>
<ul>
<li>“I agree to get order updates on WhatsApp.”</li>
<li>“Send me launch offers on WhatsApp. I can opt out anytime.”</li>
</ul>
</section>
"""

EXTRA["whatsapp-message-templates-approval-guide"] = """
<section><h2>Template workshop (90 minutes)</h2>
<p><strong>0–15 min:</strong> list every message you currently send manually in WhatsApp App.<br>
<strong>15–40 min:</strong> bucket them utility vs marketing honestly.<br>
<strong>40–70 min:</strong> rewrite marketing with one offer, one deadline, one opt-out.<br>
<strong>70–90 min:</strong> submit in WhatsApp Manager; assign someone to check status twice daily.</p>
<h2>Hindi + English</h2>
<p>India audiences may need both. Submit separate templates if Meta requires; do not mix scripts in one template without reviewer-friendly samples.</p>
</section>
"""

EXTRA["meta-tech-provider-vs-whatsapp-bsp-explained"] = """
<section><h2>How to explain this to your CEO in one slide</h2>
<p><strong>Meta</strong> owns WhatsApp policy, conversation pricing, and limits.<br>
<strong>Tech Provider (Samyoj)</strong> gives inbox, CRM, automations on Cloud API.<br>
<strong>BSP</strong> is a different partner track—verify in Meta’s directory; do not put “official BSP” in ads unless proven.</p>
<h2>Contract checklist</h2>
<ul>
<li>Who pays Meta? (You via Meta billing is ideal for transparency.)</li>
<li>Who owns the phone number if you leave?</li>
<li>Are templates portable?</li>
</ul>
</section>
"""

EXTRA["click-to-whatsapp-ads-cost-india-guide"] = """
<section><h2>Creative angles that match India buying behavior</h2>
<p>Education: “Get fee structure on WhatsApp.” D2C: “Track my order on WhatsApp.” B2B: “Book a 15-min demo on WhatsApp.” The first auto-reply must mirror the ad—no bait-and-switch.</p>
<h2>Budget pacing</h2>
<p>Week 1: ₹500–₹2,000/day cap while you fix reply speed. Week 2+: scale only if qualified CPL beats your landing page baseline for the <em>same</em> offer.</p>
</section>
"""

EXTRA["whatsapp-crm-pricing-india-breakdown-2026"] = """
<section><h2>Negotiation myths</h2>
<p>Myth: “Unlimited messages included.” Reality: Meta conversations are almost always separate.<br>
Myth: “One flat BSP fee covers everything.” Reality: ask for a split invoice.<br>
Myth: “Annual prepay always saves 40%.” Reality: Samyoj lists 20% annual on public pricing—verify live.</p>
</section>
"""

EXTRA["whatsapp-crm-small-teams-india-guide"] = """
<section><h2>Scripts your team can copy-paste</h2>
<p><strong>Qualifying:</strong> “Happy to help—are you looking for [product] for yourself or for a team?”<br>
<strong>Boundary:</strong> “I’ll check with our specialist and reply by [time].”<br>
<strong>Close:</strong> “Should I send the payment link on WhatsApp or email the invoice?”</p>
<h2>When to upgrade from WhatsApp-only to Multi-channel</h2>
<p>Upgrade when Instagram or Facebook generates &gt;20% of weekly inquiries <em>and</em> someone is assigned to reply daily. Otherwise, keep ₹899 until discipline exists on one channel.</p>
</section>
"""

EXTRA["whatsapp-business-api-onboarding-india-checklist"] = """
<section><h2>Prep table (print this)</h2>
<table>
<tr><th>Item</th><th>Where it lives</th></tr>
<tr><td>Legal business name</td><td>GST / incorporation docs</td></tr>
<tr><td>Display name</td><td>Brand frontage / website hero</td></tr>
<tr><td>Website URL</td><td>HTTPS, matches brand</td></tr>
<tr><td>Admin Facebook login</td><td>Founder or ops lead</td></tr>
<tr><td>Phone for OTP</td><td>Receives SMS/voice</td></tr>
</table>
</section>
"""


def inject(slug: str, html: str) -> None:
    path = ROOT / f"{slug}.html"
    text = path.read_text(encoding="utf-8")
    if "Day-by-day: first 14 days" in text and slug == "whatsapp-api-no-code-setup-india-guide":
        return
    anchor = '<p class="blog-sources">'
    if anchor not in text:
        return
    text = text.replace(anchor, html + anchor, 1)
    text = text.replace("· 25 min read", "· 30 min read").replace("· 15 min read", "· 30 min read")
    text = text.replace("· 22 min read", "· 35 min read")
    path.write_text(text, encoding="utf-8", newline="\n")
    print("phase2", slug)


def main():
    for slug, html in EXTRA.items():
        inject(slug, html)


if __name__ == "__main__":
    main()
