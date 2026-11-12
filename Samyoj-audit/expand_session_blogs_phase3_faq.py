"""Add long FAQ sections to session blogs for AI citability."""
from pathlib import Path

ROOT = Path(r"E:\samyojjj-website\samyoj-homepage\blog")
SLUGS = [
    "whatsapp-api-no-code-setup-india-guide",
    "whatsapp-multichannel-inbox-india-guide",
    "whatsapp-quality-rating-improvement-guide-india",
    "whatsapp-shared-inbox-software-buyers-guide-india",
    "whatsapp-broadcast-opt-in-compliance-india",
    "whatsapp-message-templates-approval-guide",
    "meta-tech-provider-vs-whatsapp-bsp-explained",
    "click-to-whatsapp-ads-cost-india-guide",
    "whatsapp-crm-pricing-india-breakdown-2026",
    "whatsapp-business-api-onboarding-india-checklist",
    "whatsapp-crm-small-teams-india-guide",
    "connect-whatsapp-number-broadcasting-platform-guide",
]

FAQ_BLOCK = """
<section class="onboard-faq"><h2>Extra questions teams ask in week one</h2>
<details><summary>How long does WhatsApp API onboarding take?</summary><p>Meta and your provider control the clock. A clean Standard signup can finish in a day; display-name or portfolio issues can add a week. Coexistence depends on Meta eligibility—not a promise from any vendor.</p></details>
<details><summary>Do I lose my WhatsApp Business App chats?</summary><p>On Standard Cloud API registration, the same number usually leaves the mobile app. On Coexistence, the app can stay—read Meta’s current coexistence docs before you promise staff anything.</p></details>
<details><summary>What is the first template I should submit?</summary><p>A utility template tied to a real process you already run—order update, appointment confirmation, or payment receipt. Marketing templates should wait until utility is approved and quality rating is stable.</p></details>
<details><summary>How does Samyoj pricing work with Meta?</summary><p>Public plans: Launch trial, WhatsApp ₹899/month, Multi-channel ₹1,499/month, five teammates, 200 AI credits/month on paid plans. Meta conversation charges bill at actuals without Samyoj markup on published Meta rates—confirm on <a href="../pricing.html">pricing</a>.</p></details>
<details><summary>Can I run Click-to-WhatsApp ads on day one?</summary><p>Only if the number is active, billing works, agents reply fast, and you can track leads in one inbox. Slow replies waste ad spend more than slow SEO.</p></details>
<details><summary>What is a Meta Tech Provider?</summary><p>A partner track for software on WhatsApp Cloud API. Samyoj uses this wording today. BSP is a different track—verify in Meta’s directory before sales collateral says “official BSP.”</p></details>
<details><summary>How do I collect opt-in for broadcasts?</summary><p>Checkbox at checkout, keyword opt-in, or signed form at events—document the wording. Never buy phone lists.</p></details>
<details><summary>What happens at the 250-recipient limit?</summary><p>Many new portfolios start around 250 unique recipients per rolling 24 hours. Plan campaigns accordingly; scaling requires Meta’s quality and verification path.</p></details>
<details><summary>Should I connect Instagram on day one?</summary><p>Only if someone will answer Instagram daily. Otherwise master WhatsApp on the ₹899 plan first.</p></details>
<details><summary>Where do I get official policy updates?</summary><p><a href="https://developers.facebook.com/docs/whatsapp" target="_blank" rel="noopener noreferrer">Meta WhatsApp documentation</a> and WhatsApp Business Terms—blogs summarize; Meta decides.</p></details>
</section>
"""

for slug in SLUGS:
    p = ROOT / f"{slug}.html"
    text = p.read_text(encoding="utf-8")
    if "Extra questions teams ask in week one" in text:
        continue
    anchor = '<p class="blog-sources">'
    if anchor in text:
        text = text.replace(anchor, FAQ_BLOCK + anchor, 1)
        p.write_text(text, encoding="utf-8", newline="\n")
        print("faq", slug)
