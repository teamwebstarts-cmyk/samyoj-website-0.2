"""Build Cloud API vs Coexistence blog from markdown source."""
from __future__ import annotations

import json
import re
import urllib.parse
from pathlib import Path

import markdown

MD = Path(r"E:\samyojjj-website\Samyoj-audit\content\cloud_api_coexistence_guide.md")
OUT = Path(
    r"E:\samyojjj-website\samyoj-homepage\blog\connect-whatsapp-number-broadcasting-platform-guide.html"
)
SLUG = "connect-whatsapp-number-broadcasting-platform-guide"
TITLE = (
    "How to Connect a WhatsApp Number to a Broadcasting Platform: "
    "Cloud API vs Coexistence"
)
OLD_TITLE = "Connect Your WhatsApp Number to a Broadcasting Platform"
SUBTITLE = (
    "Standard Cloud API vs Coexistence for Indian businesses: Meta Embedded Signup, "
    "phone and business verification, approved templates, customer opt-in, messaging "
    "limits, and when you can launch your first broadcast."
)
HERO = "blog_cloud_api_coexistence_hero.jpg"
HERO_ALT = (
    "How to connect a WhatsApp number to a broadcasting platform — "
    "Cloud API vs Coexistence"
)
INLINE_FIG = (
    '<figure class="blog-inline-media"><img src="../images/blog_whatsapp_broadcast_checklist_inline.jpg" '
    'alt="WhatsApp broadcast checklist: template approval and opt-in" width="900" height="900" '
    'loading="lazy" decoding="async" /></figure>'
)
READ_MINS = 32
CANONICAL = f"https://samyoj.com/blog/{SLUG}"

INTRO = (
    '<p><strong>Customer onboarding · guide.</strong> This walkthrough is for businesses '
    "connecting a WhatsApp number through a supported WhatsApp Business Platform provider "
    'such as <a href="https://app.samyoj.com/" target="_blank" rel="noopener noreferrer">'
    "Samyoj</a> (Meta Tech Provider on Cloud API). Samyoj software is "
    '<a href="../pricing.html">₹899/month</a> for WhatsApp-only or '
    '<a href="../pricing.html">₹1,499/month</a> for multi-channel — plus Meta message '
    "charges at actuals. Final eligibility and screen labels are controlled by "
    '<a href="https://developers.facebook.com/docs/whatsapp" target="_blank" '
    'rel="noopener noreferrer">Meta</a> and your provider.</p>'
)

CTA = """
<div class="blog-cta-banner">
  <div>
    <h3>Connect WhatsApp in Samyoj</h3>
    <p>14-day Launch trial · No-code Cloud API onboarding · WhatsApp ₹899/mo · Multi-channel ₹1,499/mo</p>
    <a href="https://app.samyoj.com/" class="btn primary" target="_blank" rel="noopener noreferrer">Start free trial</a>
  </div>
</div>
""".strip()

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
    .blog-inline-media { margin: 32px 0; border-radius: 14px; overflow: hidden; }
    .blog-inline-media img { width: 100%; height: auto; display: block; }
"""


def strip_page_h1(md: str) -> str:
    """Drop markdown H1; template already has the article title."""
    lines = md.splitlines()
    out: list[str] = []
    skipped = False
    for line in lines:
        if not skipped and line.startswith("# "):
            skipped = True
            continue
        out.append(line)
    return "\n".join(out).lstrip()


def markdown_to_html(md: str) -> str:
    body_md = strip_page_h1(md)
    return markdown.markdown(
        body_md,
        extensions=["tables", "fenced_code", "sane_lists", "smarty"],
    )


def checklist_uls(html: str) -> str:
    def repl(match: re.Match[str]) -> str:
        inner = match.group(1)
        if "[ ]" not in inner:
            return match.group(0)
        items = re.findall(r"<li>\[ \]\s*(.*?)</li>", inner, flags=re.DOTALL)
        if not items:
            return match.group(0)
        lis = "".join(f"<li>{text.strip()}</li>" for text in items)
        return f'<ul class="onboard-checklist">{lis}</ul>'

    return re.sub(r"<ul>(.*?)</ul>", repl, html, flags=re.DOTALL)


def assign_h2_ids(html: str) -> tuple[str, list[tuple[str, str]]]:
    toc: list[tuple[str, str]] = []
    section_num = 0

    def repl(match: re.Match[str]) -> str:
        nonlocal section_num
        inner = match.group(1)
        plain = re.sub(r"<[^>]+>", "", inner).strip()
        if re.match(r"^\d+\.", plain):
            section_num += 1
            hid = f"section-{section_num}"
        elif plain.lower().startswith("conclusion"):
            hid = "section-conclusion"
        elif "reference" in plain.lower():
            hid = "section-references"
        else:
            section_num += 1
            hid = f"section-{section_num}"
        label = re.sub(r"^\d+\.\s*", "", plain)
        toc.append((hid, label))
        return f'<h2 id="{hid}">{inner}</h2>'

    html = re.sub(r"<h2>(.*?)</h2>", repl, html, flags=re.DOTALL)
    return html, toc


def wrap_faq_block(html: str) -> str:
    pat = re.compile(
        r'(<h2 id="section-12">.*?</h2>)(.*?)(<h2 id="section-13")',
        re.DOTALL,
    )
    match = pat.search(html)
    if not match:
        return html
    head, body, tail = match.group(1), match.group(2), match.group(3)
    chunks = re.findall(r"<h3>(.*?)</h3>\s*(.*?)(?=<h3>|$)", body, flags=re.DOTALL)
    if not chunks:
        return html
    faq_inner = "".join(
        f"<details><summary>{q.strip()}</summary>{ans.strip()}</details>"
        for q, ans in chunks
    )
    new_body = f'<div class="onboard-faq">{faq_inner}</div>'
    return html[: match.start()] + head + new_body + tail + html[match.end() :]


def insert_after_section(html: str, section_id: str, fragment: str) -> str:
    needle = f'<h2 id="{section_id}">'
    start = html.find(needle)
    if start < 0:
        return html
    nxt = re.search(r'<h2 id="section-', html[start + len(needle) :])
    if not nxt:
        insert_at = len(html)
    else:
        insert_at = start + len(needle) + nxt.start()
    return html[:insert_at] + "\n" + fragment + "\n" + html[insert_at:]


def insert_before_h2(html: str, section_id: str, fragment: str) -> str:
    needle = f'<h2 id="{section_id}">'
    pos = html.find(needle)
    if pos < 0:
        return html
    return html[:pos] + fragment + "\n" + html[pos:]


def build_body(md: str) -> tuple[str, list[tuple[str, str]]]:
    html = markdown_to_html(md)
    html = checklist_uls(html)
    html, toc = assign_h2_ids(html)
    html = wrap_faq_block(html)
    html = insert_after_section(html, "section-7", INLINE_FIG)
    html = insert_before_h2(html, "section-conclusion", CTA)
    return INTRO + "\n" + html, toc


def render_toc(toc: list[tuple[str, str]]) -> str:
    items = "".join(f'                <li><a href="#{hid}">{label}</a></li>\n' for hid, label in toc)
    return f"""              <ul class="blog-toc-list">
{items}              </ul>"""


def ensure_extra_css(text: str) -> str:
    if ".blog-inline-media" in text:
        return text
    anchor = '  </style>\n  <link rel="stylesheet" href="../samyoj-nav.css">'
    if anchor not in text:
        return text
    return text.replace(anchor, EXTRA_CSS + anchor, 1)


def apply_metadata(text: str, toc_html: str) -> str:
    share_title = urllib.parse.quote(TITLE)
    text = text.replace(OLD_TITLE, TITLE)
    text = text.replace("blog_whatsapp_onboarding_platform_guide.jpg", HERO)
    text = text.replace(
        "Connect WhatsApp number to broadcasting platform — Cloud API and Coexistence",
        HERO_ALT,
    )
    text = text.replace(
        'content="A practical guide for new and existing businesses: Standard Cloud API vs Coexistence, what to prepare, verification, limits, and when you can send your first approved campaign."',
        f'content="{SUBTITLE}"',
    )
    text = text.replace(
        "whatsapp, business, api, onboarding, india, checklist",
        "whatsapp cloud api, coexistence, broadcasting, onboarding, india, meta embedded signup",
    )
    text = re.sub(
        r"November 12, 2026 · \d+ min read",
        f"November 12, 2026 · {READ_MINS} min read",
        text,
    )
    text = re.sub(
        r'"headline":\s*"[^"]*"',
        f'"headline": {json.dumps(TITLE)}',
        text,
        count=1,
    )
    text = re.sub(
        r'"description":\s*"[^"]*"',
        f'"description": {json.dumps(SUBTITLE)}',
        text,
        count=1,
    )
    text = text.replace(
        f"text={urllib.parse.quote(OLD_TITLE)}&url=",
        f"text={share_title}&url=",
    )
    text = text.replace(
        f"text={OLD_TITLE}%20",
        f"text={share_title}%20",
    )
    text = ensure_extra_css(text)
    text = re.sub(
        r'<ul class="blog-toc-list">.*?</ul>',
        toc_html.strip(),
        text,
        count=1,
        flags=re.DOTALL,
    )
    return text


def replace_prose(text: str, body: str) -> str:
    start = '<div class="blog-prose">'
    end = "          <!-- Bottom Pagination Links -->"
    i0, i1 = text.find(start), text.find(end)
    if i0 < 0 or i1 < 0:
        raise RuntimeError("Could not locate blog-prose region")
    return text[: i0 + len(start)] + "\n" + body + "\n          </div>\n\n          " + text[i1:]


def word_count(body_html: str) -> int:
    plain = re.sub(r"<[^>]+>", " ", body_html)
    return len(plain.split())


def main() -> None:
    if not MD.is_file():
        raise SystemExit(f"Missing markdown source: {MD}")
    md = MD.read_text(encoding="utf-8")
    body, toc = build_body(md)
    tpl = OUT.read_text(encoding="utf-8")
    tpl = apply_metadata(tpl, render_toc(toc))
    tpl = replace_prose(tpl, body)
    OUT.write_text(tpl, encoding="utf-8", newline="\n")
    wc = word_count(body)
    print(f"wrote {OUT.name}")
    print(f"estimated_words={wc}")
    if '"headline"' not in tpl:
        raise SystemExit("JSON-LD headline missing")


if __name__ == "__main__":
    main()
