"""Point blog.html cards at per-article hero images."""
from pathlib import Path

BLOG_HTML = Path(r"E:\samyojjj-website\samyoj-homepage\blog.html")
PAIRS = [
    ("blog/whatsapp-crm-small-teams-india-guide.html", "blog_crm_small_teams_india.jpg"),
    ("blog/whatsapp-crm-pricing-india-breakdown-2026.html", "blog_whatsapp_payments.webp"),
    ("blog/click-to-whatsapp-ads-cost-india-guide.html", "blog_ctwa_cost_india.jpg"),
    ("blog/whatsapp-business-api-onboarding-india-checklist.html", "blog_api_onboarding_india.jpg"),
    ("blog/whatsapp-message-templates-approval-guide.html", "blog_message_templates_india.jpg"),
    ("blog/meta-tech-provider-vs-whatsapp-bsp-explained.html", "blog_integrations_3d.webp"),
    ("blog/whatsapp-shared-inbox-software-buyers-guide-india.html", "blog_shared_inbox_india.jpg"),
    ("blog/whatsapp-broadcast-opt-in-compliance-india.html", "blog_broadcast_compliance_india.jpg"),
    ("blog/whatsapp-api-no-code-setup-india-guide.html", "blog_automation_robot_3d.webp"),
    ("blog/whatsapp-quality-rating-improvement-guide-india.html", "blog_faq_robot_3d.webp"),
    ("blog/whatsapp-multichannel-inbox-india-guide.html", "shared-inbox-people.webp"),
]

text = BLOG_HTML.read_text(encoding="utf-8")
for href, thumb in PAIRS:
    needle = f'href="{href}"'
    idx = text.find(needle)
    if idx == -1:
        continue
    chunk = text[idx : idx + 600]
    if thumb in chunk:
        continue
    new_chunk = chunk.replace("images/blog_hero_dashboard_3d.webp", f"images/{thumb}", 1)
    text = text[:idx] + new_chunk + text[idx + len(chunk) :]
    print("thumb", href, thumb)
BLOG_HTML.write_text(text, encoding="utf-8", newline="\n")
