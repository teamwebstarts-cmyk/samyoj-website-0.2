"""Sitewide deploy prep: claims, sidebar titles, automation-examples title."""
from pathlib import Path
import re

root = Path(r"E:\samyojjj-website\samyoj-homepage")

REPLACEMENTS = [
    (
        "WhatsApp Marketing Trends in 2026: What Every Marketer Needs to Know",
        "WhatsApp Marketing Trends 2026",
    ),
    (
        "How to Set Up Click-to-WhatsApp Ads for Maximum ROI",
        "Click-to-WhatsApp Ads Setup",
    ),
    (
        "WhatsApp Conversational Commerce: The Future of Checkout in 2026",
        "WhatsApp Conversational Commerce: In-Chat Checkout",
    ),
    (
        "Click to WhatsApp Ads Setup for Maximum ROI",
        "Click-to-WhatsApp Ads setup",
    ),
    (
        "5 WhatsApp Automation Examples That Boost Sales by 300%",
        "5 WhatsApp Automation Examples for Sales Teams",
    ),
    (
        "Boost Sales by 300%",
        "for Sales Teams",
    ),
    ("boost sales by 300%", "support follow-up and lead handling"),
    (
        "deliver 45%+ lead capture rates, 98% open rates, and 50% lower CPL",
        "can reduce friction versus mobile landing pages; measure CPL and reply rates in your own ad account",
    ),
    (
        "deliver 45%+ lead capture rates, 98% open rates, and 50% lower CPL in 2026.",
        "can reduce friction versus mobile landing pages. Verify CPL and reply rates in your own ad account.",
    ),
    ("98% open rate", "open rates that are often higher than email for opted-in chats"),
    ("~98% open rate", "open rates that are often higher than email for opted-in chats"),
    ("an astonishing ~98% open rate", "open rates that are often higher than email for opted-in chats"),
    ("a staggering <strong>98% open rate</strong>", "open rates that are often <strong>higher than email</strong> for opted-in chats"),
    ("achieve a 98% open rate", "can achieve strong open rates"),
    ("Delivering <strong>98% open rates</strong>", "Messaging apps can deliver <strong>strong engagement</strong> when customers have opted in"),
    (
        "automated 80% of routine qualification",
        "automated routine qualification on approved paths",
    ),
    (
        "qualify them with AI has cut our response times to under 5 seconds",
        "route common questions to approved replies so counselors can focus on complex cases",
    ),
]

REGEX_REPLACEMENTS = [
    (
        re.compile(r"enrollment\s+rate jumped 40%!", re.I),
        "handoffs between marketing and counseling are easier to track.",
    ),
    (
        re.compile(r"Our ad spend ROI doubled because", re.I),
        "Click-to-WhatsApp and Instagram ad clicks route into one inbox so",
    ),
    (
        re.compile(r"repeat order rates doubled in weeks!", re.I),
        "follow-up workflows are easier to run from one place.",
    ),
    (
        re.compile(r"Show-up rates are up by 65%.", re.I),
        "Reminder templates help us confirm appointments without manual chasing.",
    ),
]


def process(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    updated = text
    for old, new in REPLACEMENTS:
        updated = updated.replace(old, new)
    for pattern, repl in REGEX_REPLACEMENTS:
        updated = pattern.sub(repl, updated)
    if updated != text:
        path.write_text(updated, encoding="utf-8", newline="\n")
        return True
    return False


def main():
    changed = 0
    for path in root.rglob("*.html"):
        if path.name == "blog-template.html":
            continue
        if process(path):
            changed += 1
            print(path.relative_to(root))
    print("files_changed", changed)


if __name__ == "__main__":
    main()
