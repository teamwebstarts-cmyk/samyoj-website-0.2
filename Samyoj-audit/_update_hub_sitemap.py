"""Add new blog URLs to sitemap.xml and blog.html hub."""
from pathlib import Path

ROOT = Path(r"E:\samyojjj-website\samyoj-homepage")
SITEMAP = ROOT / "sitemap.xml"
BLOG_HTML = ROOT / "blog.html"
LASTMOD = "2026-11-12"

EXTRA_POSTS = [
    ("whatsapp-api-no-code-setup-india-guide", "WhatsApp API No-Code Setup (India)"),
    ("whatsapp-quality-rating-improvement-guide-india", "WhatsApp Quality Rating (India)"),
    ("whatsapp-multichannel-inbox-india-guide", "WhatsApp + Instagram + Facebook Inbox"),
]

THUMB = {
    "whatsapp-crm-small-teams-india-guide": "blog_crm_small_teams_india.jpg",
    "whatsapp-crm-pricing-india-breakdown-2026": "blog_whatsapp_payments.webp",
    "click-to-whatsapp-ads-cost-india-guide": "blog_ctwa_cost_india.jpg",
    "whatsapp-business-api-onboarding-india-checklist": "blog_api_onboarding_india.jpg",
    "whatsapp-message-templates-approval-guide": "blog_message_templates_india.jpg",
    "meta-tech-provider-vs-whatsapp-bsp-explained": "blog_integrations_3d.webp",
    "whatsapp-shared-inbox-software-buyers-guide-india": "blog_shared_inbox_india.jpg",
    "whatsapp-broadcast-opt-in-compliance-india": "blog_broadcast_compliance_india.jpg",
    "whatsapp-api-no-code-setup-india-guide": "blog_automation_robot_3d.webp",
    "whatsapp-quality-rating-improvement-guide-india": "blog_faq_robot_3d.webp",
    "whatsapp-multichannel-inbox-india-guide": "shared-inbox-people.webp",
}

NEW_POSTS = [
    ("whatsapp-crm-small-teams-india-guide", "WhatsApp CRM for Small Teams in India (2026)"),
    ("whatsapp-crm-pricing-india-breakdown-2026", "WhatsApp CRM Pricing in India: Software + Meta Fees"),
    ("click-to-whatsapp-ads-cost-india-guide", "Click-to-WhatsApp Ads Cost in India"),
    ("whatsapp-business-api-onboarding-india-checklist", "WhatsApp Business API Onboarding in India"),
    ("whatsapp-message-templates-approval-guide", "WhatsApp Message Templates: Approval Guide"),
    ("meta-tech-provider-vs-whatsapp-bsp-explained", "Meta Tech Provider vs WhatsApp BSP"),
    ("whatsapp-shared-inbox-software-buyers-guide-india", "WhatsApp Shared Inbox Software: India Buyer’s Guide"),
    ("whatsapp-broadcast-opt-in-compliance-india", "WhatsApp Broadcast Rules: Opt-In for India"),
] + EXTRA_POSTS

CARD_BLOCK = """
            <a href="blog/{slug}.html" class="blog-card" data-topic="crm">
                          <div class="blog-card-thumb"><img src="images/{thumb}" alt="" width="300" height="180" style="object-fit: cover;" decoding="async" loading="lazy" /></div>
                          <div class="blog-card-body">
                            <span class="blog-tag purple">Guides</span>
                            <h3 class="blog-card-title">{title}</h3>
                            <p class="blog-card-meta">November 12, 2026 &middot; 12+ min read</p>
                          </div>
            </a>
"""


def update_sitemap():
    text = SITEMAP.read_text(encoding="utf-8")
    for slug, _ in NEW_POSTS:
        loc = f"https://samyoj.com/blog/{slug}"
        if loc in text:
            continue
        entry = (
            f'  <url><loc>{loc}</loc><changefreq>monthly</changefreq>'
            f"<priority>0.7</priority><lastmod>{LASTMOD}</lastmod></url>\n"
        )
        text = text.replace("</urlset>", entry + "</urlset>")
    SITEMAP.write_text(text, encoding="utf-8", newline="\n")


def update_blog_html():
    text = BLOG_HTML.read_text(encoding="utf-8")
    for old_count, new_count in (("27", "38"), ("35", "38")):
        text = text.replace(f'"numberOfItems": {old_count},', f'"numberOfItems": {new_count},')
    marker = '<div class="blog-latest-left-grid">'
    if marker not in text:
        raise SystemExit("blog grid marker missing")
    def card_html(s, t):
        thumb = THUMB.get(s, "blog_hero_dashboard_3d.webp")
        if slug_exists(text, s):
            return ""
        return CARD_BLOCK.format(slug=s, title=t, thumb=thumb)

    def slug_exists(html_text, slug):
        return f"blog/{slug}.html" in html_text

    cards = "".join(card_html(s, t) for s, t in NEW_POSTS)
    if cards:
        text = text.replace(marker, marker + cards, 1)
    # ItemList JSON entries at end before closing ]
    insert_before = '          { "@type": "ItemList"'
    # append before last item in itemListElement - find position 27 track-multichannel
    list_entries = []
    for i, (slug, title) in enumerate(NEW_POSTS, start=28):
        list_entries.append(
            f'          {{ "@type": "ListItem", "position": {i}, "name": {title!r}, '
            f'"url": "https://samyoj.com/blog/{slug}" }}'
        )
    block = ",\n".join(list_entries) + ",\n"
    if "whatsapp-crm-small-teams-india-guide" not in text.split("ItemList")[1][:5000]:
        needle = '"url": "https://samyoj.com/blog/track-multichannel-campaign-attribution" }\n        ]'
        if needle in text:
            text = text.replace(
                needle,
                '"url": "https://samyoj.com/blog/track-multichannel-campaign-attribution" },\n'
                + block
                + "        ]",
            )
    # Fix automation examples title in JSON if still wrong
    text = text.replace(
        "5 WhatsApp Automation Examples That Boost Sales by 300%",
        "5 WhatsApp Automation Examples for Sales Teams",
    )
    BLOG_HTML.write_text(text, encoding="utf-8", newline="\n")


def main():
    update_sitemap()
    update_blog_html()
    print("updated sitemap and blog.html")


if __name__ == "__main__":
    main()
