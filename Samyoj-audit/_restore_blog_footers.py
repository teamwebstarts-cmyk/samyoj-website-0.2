from pathlib import Path

root = Path(r"E:\samyojjj-website\samyoj-homepage\blog")

full = """  <footer class="sy-footer" aria-label="Site footer">
    <div class="sy-footer-inner">
      <div class="sy-footer-grid">
        <div class="sy-footer-brand">
          <a class="sy-footer-logo" href="../index.html" aria-label="Samyoj home">
            <img src="../images/samyoj-logo-new.png" alt="Samyoj — Business Automation &amp; CRM" width="160" height="53" decoding="async" />
          </a>
          <p class="sy-footer-desc">Samyoj helps businesses automate, engage and grow with WhatsApp. Built for scale, backed by reliability.</p>
          <div class="sy-footer-partner">
            <img src="../images/download.webp" alt="Meta Tech Provider" width="160" height="89" decoding="async" />
          </div>
          <p class="sy-footer-made">Made with <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> in India</p>
        </div>

        <div class="sy-footer-links">
          <div class="sy-footer-col">
            <h3 class="sy-footer-title">Product</h3>
            <ul class="sy-footer-list">
              <li><a href="../features.html">Features</a></li>
              <li><a href="../pricing.html">Pricing</a></li>
              <li><a href="../industries.html">Industries</a></li>
              <li><a href="../blog/automating-whatsapp-broadcasts.html">Broadcasts</a></li>
              <li><a href="../blog/ai-agents-in-whatsapp.html">AI Agents</a></li>
              <li><a href="../blog/how-to-collect-payments-on-whatsapp.html">Payments</a></li>
            </ul>
          </div>

          <div class="sy-footer-col">
            <h3 class="sy-footer-title">Resources</h3>
            <ul class="sy-footer-list">
              <li><a href="../blog.html">Blog</a></li>
              <li><a href="../blog/what-is-whatsapp-crm.html">WhatsApp CRM Guide</a></li>
              <li><a href="../blog/top-7-whatsapp-business-api-providers.html">BSP Comparison</a></li>
              <li><a href="../blog/meta-whatsapp-api-pricing-2026-guide.html">API Pricing Guide</a></li>
              <li><a href="../features.html">Feature Tour</a></li>
            </ul>
          </div>

          <div class="sy-footer-col">
            <h3 class="sy-footer-title">Company</h3>
            <ul class="sy-footer-list">
              <li><a href="../contact.html">About Us</a></li>
              <li><a href="../contact.html">Contact</a></li>
              <li><a href="../legal/privacy-policy.html">Privacy Policy</a></li>
              <li><a href="../legal/terms-and-conditions.html">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sy-footer-bottom">
        <p class="sy-footer-copyright">© 2026 Samyoj. All rights reserved.</p>
        <div class="sy-footer-socials">
          <a href="https://twitter.com/samyoj" aria-label="Twitter"><svg viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
          <a href="https://www.linkedin.com/company/samyoj/" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a href="https://www.instagram.com/samyoj_/" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
        </div>
      </div>
    </div>
  </footer>"""

changed = []
skipped = []
for path in sorted(root.glob("*.html")):
    text = path.read_text(encoding="utf-8")
    if "sy-footer-col" in text:
        continue
    start = text.find('<footer class="sy-footer"')
    end = text.find("</footer>", start)
    if start < 0 or end < 0:
        skipped.append(path.name)
        continue
    end += len("</footer>")
    path.write_text(text[:start] + full + text[end:], encoding="utf-8")
    changed.append(path.name)

print(f"updated {len(changed)}")
for name in changed:
    print(name)
if skipped:
    print("SKIPPED")
    print("\n".join(skipped))
