"""Build full onboarding guide blog from PDF content."""
from pathlib import Path
import json

SRC = Path(r"E:\samyojjj-website\samyoj-homepage\blog\whatsapp-business-api-onboarding-india-checklist.html")
OUT = Path(r"E:\samyojjj-website\samyoj-homepage\blog\connect-whatsapp-number-broadcasting-platform-guide.html")
SLUG = "connect-whatsapp-number-broadcasting-platform-guide"
TITLE = "Connect Your WhatsApp Number to a Broadcasting Platform"
SUBTITLE = (
    "A practical guide for new and existing businesses: Standard Cloud API vs Coexistence, "
    "what to prepare, verification, limits, and when you can send your first approved campaign."
)
HERO = "blog_whatsapp_onboarding_platform_guide.jpg"
READ_MINS = 22

EXTRA_CSS = """
    .onboard-method-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 28px 0; }
    @media (max-width: 768px) { .onboard-method-grid { grid-template-columns: 1fr; } }
    .onboard-method-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; }
    .onboard-method-card h3 { margin: 0 0 10px; font-size: 17px; color: #4B2EEB; }
    .onboard-method-card p { margin: 0; font-size: 15px; line-height: 1.55; color: #64748b; }
    .blog-prose table { width: 100%; border-collapse: collapse; margin: 28px 0; font-size: 14.5px; }
    .blog-prose th, .blog-prose td { border: 1px solid #e2e8f0; padding: 12px 14px; text-align: left; vertical-align: top; }
    .blog-prose th { background: #eef2ff; font-weight: 700; color: #0f172a; }
    .onboard-flow { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 24px 0; font-weight: 600; font-size: 14px; color: #334155; }
    .onboard-flow .step { background: #eef2ff; padding: 10px 14px; border-radius: 10px; border: 1px solid #c7d2fe; }
    .onboard-flow .arrow { color: #94a3b8; }
    .onboard-faq details { border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; margin-bottom: 10px; background: #fff; }
    .onboard-faq summary { font-weight: 700; cursor: pointer; color: #0f172a; list-style-position: outside; }
    .onboard-faq p { margin: 12px 0 0; font-size: 15px; }
    .onboard-checklist { list-style: none; padding: 0; margin: 16px 0; }
    .onboard-checklist li { padding: 10px 0 10px 28px; position: relative; border-bottom: 1px solid #f1f5f9; font-size: 15.5px; color: #475569; }
    .onboard-checklist li::before { content: "✓"; position: absolute; left: 0; color: #4B2EEB; font-weight: 800; }
    .onboard-limit-pill { display: inline-block; background: linear-gradient(135deg,#eef2ff,#fff); border: 1px solid #c7d2fe; border-radius: 16px; padding: 20px 28px; margin: 16px 0; }
    .onboard-limit-pill .num { font-size: 42px; font-weight: 800; color: #4B2EEB; line-height: 1; }
    .onboard-limit-pill .lbl { font-size: 14px; color: #64748b; margin-top: 6px; }
"""

BODY = r"""
<p><strong>Customer onboarding · quick guide.</strong> This article is for businesses connecting a WhatsApp number to a supported WhatsApp Business Platform provider such as <a href="https://app.samyoj.com/" target="_blank" rel="noopener noreferrer">Samyoj</a> (Meta Tech Provider on Cloud API). Final eligibility and steps are controlled by <a href="https://developers.facebook.com/docs/whatsapp" target="_blank" rel="noopener noreferrer">Meta</a> and your provider—treat screen labels as examples.</p>

<section id="choose-method"><h2>01 · Choose your connection method</h2>
<div class="onboard-method-grid">
  <div class="onboard-method-card">
    <h3>A · Standard Cloud API</h3>
    <p><strong>Dedicated API number.</strong> Connect a new, eligible number to the WhatsApp Business Platform. Manage messages from your provider dashboard instead of the WhatsApp mobile app. Choose this if you are starting with a new API number.</p>
  </div>
  <div class="onboard-method-card">
    <h3>B · Coexistence</h3>
    <p><strong>Keep your Business App.</strong> Connect a Meta-eligible number already active in WhatsApp Business App. Continue everyday mobile chats and use the platform for API campaigns. Choose this if you already use WhatsApp Business App.</p>
  </div>
</div>
</section>

<section id="differences"><h2>02 · Key differences at a glance</h2>
<table>
<thead><tr><th>Question</th><th>Standard Cloud API</th><th>Coexistence</th></tr></thead>
<tbody>
<tr><td>Can I keep using the same number in WhatsApp Business App?</td><td>No, not in standard API registration.</td><td>Yes, for individual chats.</td></tr>
<tr><td>Which number should I use?</td><td>A number eligible for API registration.</td><td>An established, eligible Business App number.</td></tr>
<tr><td>Can I broadcast through the platform?</td><td>Yes, once sending is enabled.</td><td>Yes, once sending is enabled.</td></tr>
<tr><td>Do Meta limits and API charges apply?</td><td>Yes.</td><td>Yes, to API messages.</td></tr>
<tr><td>Are existing mobile chats retained?</td><td>No continued app access on that number.</td><td>App chats remain; optional sync may be offered.</td></tr>
</tbody>
</table>
</section>

<section id="prepare-info"><h2>03 · What information do you need?</h2>
<h3>New business · create a profile</h3>
<p>If you have no Meta Business Portfolio account, prepare:</p>
<ul>
<li>Facebook login with admin access; business email.</li>
<li>Business: brand name, category, country.</li>
<li>Business info: legal name, full address, contact phone, website.</li>
<li>WhatsApp: display name, business category, eligible phone number for OTP.</li>
</ul>
<h3>Existing business · reuse details</h3>
<ul>
<li>Admin access to the business-owned Meta Portfolio (or create one).</li>
<li>Confirm legal name, address, website, email, business phone.</li>
<li>Keep WhatsApp Business App active and updated on your phone.</li>
<li>Have the same number ready for Meta in-app approval / QR step.</li>
</ul>
<p><strong>Not normally required to start:</strong> Facebook Page, Instagram, a customer-created Meta Developer App, verified badge, or completed legal-business verification at the initial tier. You still need accurate business information and phone/account authorisation. A website may be required by your signup flow or provider.</p>
</section>

<section id="standard-setup"><h2>04A · Standard Cloud API setup</h2>
<p>For a fresh API number, with or without an existing Meta business portfolio:</p>
<ol>
<li><strong>Choose a dedicated API number</strong> — In Samyoj, open the WhatsApp connection page and select Standard Cloud API. Use a number eligible for registration; an existing consumer-app number may need a separate transition.</li>
<li><strong>Sign in and select your business</strong> — Owner/admin Facebook login; create or select the business-owned Meta Business Portfolio.</li>
<li><strong>Fill business fields</strong> — New: brand, email, country, category, website, legal name, address, business phone. Existing: review and correct.</li>
<li><strong>WhatsApp profile and number</strong> — Display name, category, description if asked; verify ownership via SMS/voice OTP.</li>
<li><strong>Authorize and activate</strong> — Confirm Meta permissions; wait until registration, messaging access, and billing are ready; submit your first marketing template.</li>
</ol>
<p><strong>Result:</strong> The number is managed through the API; the same number is not normally used in the WhatsApp mobile app on standard registration.</p>
</section>

<section id="coexistence-setup"><h2>04B · Coexistence setup (existing Business App)</h2>
<ol>
<li><strong>Check your Business App</strong> — Latest app on your main phone; providers often expect real activity (commonly cited ~7 days)—Meta decides eligibility.</li>
<li><strong>Start Coexistence signup</strong> — From your platform, connect an existing Business App number; Meta login; select/create Portfolio.</li>
<li><strong>Confirm portfolio and profile</strong> — Review business fields; enter the number already in the Business App.</li>
<li><strong>Approve in the app</strong> — On your phone, complete Meta/WhatsApp prompts, codes, and QR if shown. Do not uninstall the app.</li>
<li><strong>Optional sync and activate</strong> — Choose whether to sync eligible chats/contacts; confirm API sending/billing are active. Business App stays usable.</li>
</ol>
<p><strong>Already on another API provider?</strong> Use supported migration or partner-sharing—do not treat it as unused-number signup.</p>
</section>

<section id="verification"><h2>05 · Which verification is required?</h2>
<ul>
<li><strong>Required:</strong> Phone/account confirmation (OTP or in-app approval for Coexistence).</li>
<li><strong>Usually not needed for first send:</strong> Legal Business Verification for the 250-recipient tier (later limits may require documents).</li>
<li><strong>Not required:</strong> Verified badge or GST certificate unless a specific Meta review asks.</li>
<li><strong>Required for promotional outreach:</strong> Approved <a href="whatsapp-message-templates-approval-guide.html">marketing template</a>.</li>
</ul>
<p>Business Portfolio details, legal verification, and verified badge are different things. Coexistence eligibility is decided by Meta; standard legal-business verification may not be available on all Coexistence accounts.</p>
</section>

<section id="first-broadcast"><h2>06 · When can I start broadcasting?</h2>
<p>Connecting the number is only step one. Promotional API sends need activation, billing, template approval, and opt-in—not merely a successful login.</p>
<div class="onboard-flow">
  <span class="step">Number active &amp; billing ready</span><span class="arrow">→</span>
  <span class="step">Marketing template approved</span><span class="arrow">→</span>
  <span class="step">Customers opted in</span><span class="arrow">→</span>
  <span class="step">Launch within current limit</span>
</div>
<ul class="onboard-checklist">
  <li>Number status is active and able to send.</li>
  <li>Meta or partner billing is configured.</li>
  <li>Marketing template status is Approved.</li>
  <li>Contacts opted in to receive messages.</li>
  <li>Recipient list is valid and uploaded.</li>
  <li>Available quota covers this campaign.</li>
</ul>
</section>

<section id="limits"><h2>07 · Initial limits and scaling</h2>
<div class="onboard-limit-pill">
  <div class="num">250</div>
  <div class="lbl">typical starting limit — unique recipients per rolling 24 hours (shared across numbers in the same Meta Business Portfolio)</div>
</div>
<p>This limits how many <em>different people</em> you initiate a business message to—not total messages. The next batch frees as conversations leave the rolling window (not necessarily at midnight). Higher tiers (e.g. 2K → 10K → 100K → unlimited) depend on Meta’s eligible scaling path—often business verification or sustained high-quality activity. See Meta’s <a href="https://developers.facebook.com/docs/whatsapp/messaging-limits" target="_blank" rel="noopener noreferrer">messaging limits</a> documentation.</p>
<p>Samyoj bills Meta message charges at actuals on paid plans—software is <a href="../pricing.html">₹899–₹1,499/month</a> plus conversation fees per Meta’s rate card.</p>
</section>

<section id="faq"><h2>08 · Frequently asked questions</h2>
<div class="onboard-faq">
<details><summary>Do I need Facebook or a Facebook Page?</summary><p>Standard signup generally uses Facebook login with Meta Business Portfolio access. A Facebook Page is not always required; some Coexistence flows offer alternatives.</p></details>
<details><summary>Is GST or company registration mandatory?</summary><p>Not generally for initial messaging. Enter honest details; registration may be requested later for verification.</p></details>
<details><summary>Do I need a business website?</summary><p>Prepare one if possible. Some Embedded Signup or provider flows require a working website.</p></details>
<details><summary>Can I use my personal WhatsApp number?</summary><p>Personal WhatsApp does not qualify for Business App Coexistence. Standard API registration of an in-use app number may need a separate transition.</p></details>
<details><summary>Will existing Business App chats disappear?</summary><p>Coexistence keeps the app usable; optional history sync may be offered. Keep the main app installed.</p></details>
<details><summary>How soon can my first campaign go live?</summary><p>After number activation, billing readiness, and template approval—no fixed approval time is guaranteed.</p></details>
<details><summary>Can I broadcast without an approved template?</summary><p>No for initiating promotional API conversations. Free-form replies are allowed within an open customer-service window.</p></details>
<details><summary>Is Coexistence broadcasting free?</summary><p>No. Cloud API messages incur Meta charges; Samyoj does not markup Meta rates on published pricing.</p></details>
<details><summary>Can I send to 1,000 people on day one?</summary><p>Only if your portfolio’s actual limit allows it—many new portfolios start at 250 unique recipients per rolling 24 hours.</p></details>
<details><summary>What if Meta rejects my template?</summary><p>Read the reason in WhatsApp Manager, fix content or category, resubmit, or contact your provider. See our <a href="whatsapp-message-templates-approval-guide.html">template approval guide</a>.</p></details>
</div>
</section>

<div class="blog-cta-banner">
  <div>
    <h3>Connect WhatsApp in Samyoj</h3>
    <p>14-day Launch trial · No-code Cloud API onboarding · WhatsApp ₹899/mo · Multi-channel ₹1,499/mo</p>
    <a href="https://app.samyoj.com/" class="btn primary" target="_blank" rel="noopener noreferrer">Start free trial</a>
  </div>
</div>

<p class="blog-sources"><strong>Sources &amp; review:</strong> Based on Samyoj customer onboarding material reviewed 26 October 2026; updated for publication 12 November 2026. Cross-check
<a href="https://developers.facebook.com/docs/whatsapp" target="_blank" rel="noopener noreferrer">Meta WhatsApp Business Platform</a>,
<a href="https://developers.facebook.com/docs/whatsapp/pricing" target="_blank" rel="noopener noreferrer">pricing</a>,
<a href="https://www.whatsapp.com/legal/business-terms" target="_blank" rel="noopener noreferrer">Business Terms</a>.
Requirements, eligibility, and pricing can change.</p>
"""

TOC = """
              <ul class="blog-toc-list">
                <li><a href="#choose-method">Connection methods</a></li>
                <li><a href="#differences">Cloud API vs Coexistence</a></li>
                <li><a href="#prepare-info">Information to prepare</a></li>
                <li><a href="#standard-setup">Standard setup steps</a></li>
                <li><a href="#coexistence-setup">Coexistence setup</a></li>
                <li><a href="#verification">Verification requirements</a></li>
                <li><a href="#first-broadcast">First broadcast checklist</a></li>
                <li><a href="#limits">Messaging limits</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
"""


def main():
    text = SRC.read_text(encoding="utf-8")
    text = text.replace("whatsapp-business-api-onboarding-india-checklist", SLUG)
    text = text.replace(
        "<title>WhatsApp Business API Onboarding in India: Step-by-Step Checklist | Samyoj Blog</title>",
        f"<title>{TITLE} | Samyoj Blog</title>",
    )
    text = text.replace(
        "WhatsApp Business API Onboarding in India: Step-by-Step Checklist",
        TITLE,
    )
    text = text.replace(
        "Meta Cloud API onboarding for Indian businesses: Meta Business Manager, display name, number rules, template basics, and going live without a developer.",
        SUBTITLE,
    )
    text = text.replace("blog_api_onboarding_india.jpg", HERO)
    text = text.replace(
        "Checklist for connecting a business phone number to WhatsApp Cloud API",
        "Connect WhatsApp number to broadcasting platform — Cloud API and Coexistence",
    )
    text = text.replace(
        '<div class="blog-category-badge">Implementation</div>',
        '<div class="blog-category-badge">Customer Onboarding</div>',
    )
    text = text.replace("November 12, 2026 · 15 min read", f"November 12, 2026 · {READ_MINS} min read")
    text = text.replace(
        '"WhatsApp Business API Onboarding in India: Step-by-Step Checklist",',
        f'"headline": {json.dumps(TITLE)},',
    )
    import re

    text = text.replace("</style>\n  <link rel=\"stylesheet\" href=\"../samyoj-nav.css\">", EXTRA_CSS + "\n  </style>\n  <link rel=\"stylesheet\" href=\"../samyoj-nav.css\">")
    text = re.sub(r"<ul class=\"blog-toc-list\">.*?</ul>", TOC.strip(), text, count=1, flags=re.DOTALL)
    start = '<div class="blog-prose">'
    end = "          </div>\n\n          <!-- Bottom Pagination Links -->"
    i0, i1 = text.find(start), text.find(end)
    text = text[:i0] + start + "\n" + BODY + "\n" + text[i1:]
    text = text.replace(
        'related-list"><a href="meta-lead-forms-not-syncing-crm.html"',
        'related-list"><a href="whatsapp-business-api-onboarding-india-checklist.html" class="related-item"><img src="../images/blog_api_onboarding_india.jpg" alt="" class="related-thumb" width="68" height="68" loading="lazy" decoding="async" /><div class="related-info"><span class="related-cat">ONBOARDING</span><span class="related-title">Short India API checklist</span><span class="related-meta">November 12, 2026</span></div></a><a href="whatsapp-message-templates-approval-guide.html" class="related-item"><img src="../images/blog_message_templates_india.jpg" alt="" class="related-thumb" width="68" height="68" loading="lazy" decoding="async" /><div class="related-info"><span class="related-cat">TEMPLATES</span><span class="related-title">Message template approval guide</span><span class="related-meta">November 12, 2026</span></div></a><a href="meta-lead-forms-not-syncing-crm.html"',
    )
    OUT.write_text(text, encoding="utf-8", newline="\n")
    print("wrote", OUT.name)


if __name__ == "__main__":
    main()
