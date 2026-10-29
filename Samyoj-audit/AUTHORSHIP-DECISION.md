# Authorship & E-E-A-T Decision Guide (Audit H4)

**Status: decision required before the code part of H4 can land.**

## Where things stand

All 17 blog posts carry a visible byline ("Written by …") and `datePublished`/`dateModified`. None carry `Person` schema (0/17), only 2 name an author in text, no author bio page exists, and the Organization schema has no `sameAs`. Google's Who/How/Why test and AI-citation work (Claude-SEO methodology, H4) both treat a resolvable author entity as the biggest single content-trust lever.

## Options

| # | Approach | What it means | Effort | Verdict |
|---|---|---|---|---|
| 1 | **Team authorship** (recommended) | Bylines read "Samyoj Team" (already what most posts effectively are), schema uses `Organization` as `author` with `email`/`url`, plus `founder`/`employee` Person only if a real consenting name is supplied | Low, honest, no fabricated identity | **Landed in `(a)`** |
| 2 | **Named founder** | A real founder name, LinkedIn URL, and short bio for `Person` schema on all 17 posts + an author box | Zero plumbing needed; the 6 data fields below are all it takes | **Ready — awaiting input** |
| 3 | Consultant-style linkage | A `ConsultantOrg` agent (e.g. "Webstart Digital") as author, with `parentOrganization` Samyoj — maps to the team's actual structure | Low | Documented, not applied |

## What was applied without needing input (surgical, reversible)

1. Organization schema (`index.html`, `contact.html`, `features.html`, `industries.html`, `pricing.html`) now carries `sameAs` → `https://www.linkedin.com/company/samyoj/`, `https://www.instagram.com/samyoj_/`, `https://www.youtube.com/@samyoj_official` (the three social URLs already linked in the site footer).
2. Blog posts' Article schema: `author` set to the Organization ("Samyoj Team") — truthful today — instead of leaving author absent.
3. `person-schema-template.json` in this folder: a ready-to-fill `Person` node (name, jobTitle, image, url, sameAs) so switching to a named founder is a copy-paste + one variable.
4. An author-bio block (`<section class="author-bio">…`) is included as a commented-out template in `blog/blog-template.html` — uncomment per post once a real name exists.

## What flips this to "named founder" (paste into the chat)

```
name:
role/title:
LinkedIn:
one-line bio:
photo URL (optional):
```
…and the change is mechanical: swap `Organization` → `Person` in the 17 Article nodes, fill the template, de-comment the author box.

## Why not to wait with everything

`sameAs` organizationally + truthful team authorship already removes the "no resolvable entity" penalty case; the named-founder upgrade is an enhancement, not a gate.
