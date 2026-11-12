from pathlib import Path

root = Path(r"E:\samyojjj-website\samyoj-homepage")
reps = [
    ("Flat ₹1,499/mo Plan", "WhatsApp from ₹899/mo"),
    (
        "Get unlimited agent seats, shared team inbox, and advanced flows.",
        "Paid plans include 5 team members. Multi-channel is ₹1,499/mo.",
    ),
    (
        "Automate up to 80% of customer queries instantly, 24/7.",
        "Paid plans include 200 AI credits a month.",
    ),
    (
        "Free green tick verification and dedicated support to get you live.",
        "Help connecting your number. Meta decides green-tick eligibility.",
    ),
    (
        "Samyoj provides direct Meta billing with zero per-message markup fees. You pay Meta's official rates directly, while benefiting from Samyoj's flat $29/month plan with unlimited agent seats, built-in AI agents, and cost optimization features.",
        "Samyoj bills Meta message charges at actuals, with no markup. WhatsApp is ₹899/month and Multi-channel is ₹1,499/month, each with 5 team members and 200 AI credits a month.",
    ),
]
changed = 0
for path in root.rglob("*.html"):
    text = path.read_text(encoding="utf-8")
    updated = text
    for old, new in reps:
        updated = updated.replace(old, new)
    if updated != text:
        path.write_text(updated, encoding="utf-8", newline="\n")
        changed += 1
        print(path.relative_to(root))
print("files", changed)
