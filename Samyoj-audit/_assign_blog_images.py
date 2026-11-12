"""Assign unique hero + OG images per new India guide."""
from pathlib import Path

ROOT = Path(r"E:\samyojjj-website\samyoj-homepage\blog")

MAP = {
    "whatsapp-crm-small-teams-india-guide": "blog_crm_small_teams_india.jpg",
    "whatsapp-crm-pricing-india-breakdown-2026": "blog_whatsapp_payments.webp",
    "click-to-whatsapp-ads-cost-india-guide": "blog_ctwa_cost_india.jpg",
    "whatsapp-business-api-onboarding-india-checklist": "blog_api_onboarding_india.jpg",
    "whatsapp-message-templates-approval-guide": "blog_message_templates_india.jpg",
    "meta-tech-provider-vs-whatsapp-bsp-explained": "blog_integrations_3d.webp",
    "whatsapp-shared-inbox-software-buyers-guide-india": "blog_shared_inbox_india.jpg",
    "whatsapp-broadcast-opt-in-compliance-india": "blog_broadcast_compliance_india.jpg",
}

OLD = "blog_hero_dashboard_3d.webp"


def apply(slug: str, filename: str) -> None:
    path = ROOT / f"{slug}.html"
    text = path.read_text(encoding="utf-8")
    new = filename if filename.endswith(".webp") else filename
    text = text.replace(OLD, new)
    text = text.replace(
        f"https://samyoj.com/images/{OLD}",
        f"https://samyoj.com/images/{new}",
    )
    path.write_text(text, encoding="utf-8", newline="\n")
    print(slug, "->", new)


def main():
    for slug, img in MAP.items():
        apply(slug, img)


if __name__ == "__main__":
    main()
