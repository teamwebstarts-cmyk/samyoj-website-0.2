import re
from pathlib import Path
root = Path(r"E:\samyojjj-website\samyoj-homepage\blog")
for p in sorted(root.glob("*india*.html")) + [root / "connect-whatsapp-number-broadcasting-platform-guide.html"]:
    t = p.read_text(encoding="utf-8")
    m = re.search(r'<div class="blog-prose">(.*)', t, re.S)
    if not m:
        continue
    body = m.group(1).split("<!-- Bottom Pagination")[0]
    w = len(re.sub(r"<[^>]+>", " ", body).split())
    print(p.name, w)
