from pathlib import Path
import re

ROOT = Path(r"E:\samyojjj-website\samyoj-homepage\blog")
SLUGS = [
    "whatsapp-crm-small-teams-india-guide",
    "whatsapp-crm-pricing-india-breakdown-2026",
    "click-to-whatsapp-ads-cost-india-guide",
    "whatsapp-business-api-onboarding-india-checklist",
    "whatsapp-message-templates-approval-guide",
    "meta-tech-provider-vs-whatsapp-bsp-explained",
    "whatsapp-shared-inbox-software-buyers-guide-india",
    "whatsapp-broadcast-opt-in-compliance-india",
    "whatsapp-api-no-code-setup-india-guide",
    "whatsapp-quality-rating-improvement-guide-india",
    "whatsapp-multichannel-inbox-india-guide",
]

OLD_SHARE = "How to Stop Missing Leads Across WhatsApp, Instagram and Facebook"


for slug in SLUGS:
    path = ROOT / f"{slug}.html"
    text = path.read_text(encoding="utf-8")
    m = re.search(r"<title>(.+?) \| Samyoj Blog</title>", text)
    if not m:
        continue
    title = m.group(1)
    text = text.replace(OLD_SHARE, title)
    path.write_text(text, encoding="utf-8", newline="\n")
    print("fixed", slug)
