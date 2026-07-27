# Samyoj Blog System & Article Creator Guide 🚀

This directory contains all individual blog post detail pages for Samyoj website. Every article follows a **100% pixel-identical design system** matching the official Samyoj UI specification.

---

## 📁 Directory Structure

```
samyoj-homepage/
├── blog/
│   ├── README.md                      <-- This Guide
│   ├── blog-template.html             <-- Master Reusable Blog Template
│   └── whatsapp-marketing-2026-trends.html <-- Sample Pixel-Perfect Blog Article
├── blog.html                          <-- Main Blog Listing Hub
└── images/                            <-- 3D Image Assets for Blog Posts
```

---

## 🛠️ How to Add a New Blog Post (3 Easy Steps)

### Step 1: Duplicate `blog-template.html`
Copy `blog/blog-template.html` and rename it using your new article's URL slug:
> Example: `blog/my-new-whatsapp-guide.html`

### Step 2: Replace Template Placeholders
Open the newly created file and fill in the placeholder tags:

| Placeholder Tag | Description | Example |
| :--- | :--- | :--- |
| `{{ARTICLE_TITLE}}` | The main H1 title of the article | `5 Proven Ways to Generate More Leads` |
| `{{ARTICLE_EXCERPT}}` | Short 1-2 sentence article summary | `Learn how top brands capture lead data...` |
| `{{ARTICLE_SLUG}}` | The URL slug name | `my-new-whatsapp-guide` |
| `{{CATEGORY_NAME}}` | Category pill badge text | `WHATSAPP MARKETING` |
| `{{FEATURED_IMAGE_FILENAME}}` | Image filename in `images/` directory | `blog_leads_3d.jpg` |
| `{{PUBLISH_DATE}}` | Article publish date | `July 24, 2026` |
| `{{READ_TIME}}` | Estimated reading duration | `6 min read` |
| `{{ARTICLE_BODY_HTML}}` | Full HTML content of the article | `<h2>Heading</h2><p>Content...</p>` |

### Step 3: Add Redirect Mapping (Optional)
To support clean URLs without `.html` extensions (e.g. `samyoj.com/blog/my-new-whatsapp-guide`), add a line to `_redirects`:

```
/blog/my-new-whatsapp-guide /blog/my-new-whatsapp-guide.html 200
```

---

## 🎨 Design System Components Included in Template

Every blog post created with this template automatically includes:
- **Header & Announcement Bar**: Fixed `#aisensy-magic-bar` top banner and logo header with mobile drawer toggle.
- **Breadcrumb Trail**: Automatic `Home > Blog > Article Title` hierarchy.
- **Verified Author Badge**: Avatar circle + `Samyoj Team` verified badge.
- **Social Sharing Bar**: 1-click sharing to WhatsApp, LinkedIn, X, and Clipboard.
- **Table of Contents Box**: Automatic 2-column green-tinted TOC jump box.
- **Formatted Prose & Feature Cards**: Styled H2 headings, bold highlights, and green icon cards.
- **In-Article CTA Banner**: Conversational D2C banner promoting Samyoj platform with 3D graphics.
- **Prev / Next Article Pagination**: Contextual bottom navigation links.
- **Sidebar Widgets**:
  - Author bio box
  - Related articles list with 3D thumbnails
  - Categories list with post count badges
  - Newsletter subscription form widget
- **Site Footer**: Complete official Samyoj footer component.
