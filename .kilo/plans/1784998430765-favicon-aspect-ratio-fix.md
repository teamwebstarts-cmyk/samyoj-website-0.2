# Plan: Fix Favicon Aspect Ratio (Squished Width)

## Context
- The current favicon is generated from `images/favicon-icon.svg` (2048×1365, landscape aspect ratio).
- Because browsers force favicons into square slots, the wider source image is squished horizontally or cropped, producing a thin-looking tab icon.
- The user sees reduced width; height looks acceptable but width is "shrinking."

## Goal
Use a square source image to generate crisp, properly-proportioned favicon PNGs at standard sizes, and update `index.html` to reference them.

## Affected files
- `samyoj-homepage/images/logo-mark.webp` — 256×256 square logo mark, ideal source
- `samyoj-homepage/images/favicon-*.png` — to be regenerated
- `samyoj-homepage/index.html` — `<link rel="icon">` and `<link rel="apple-touch-icon">` tags

## Steps
1. **Generate favicon PNGs from square source**
   - Use `logo-mark.webp` (256×256) to render:
     - `favicon-32x32.png`
     - `favicon-48x48.png`
     - `favicon-192x192.png`
   - Use Pillow / cairosvg to resize with antialiasing.

2. **Remove old non-square assets**
   - Delete `images/favicon-icon.svg` and any remaining non-square derived images.

3. **Update HTML links**
   - Replace the current `<link rel="icon">` block with:
     - `images/favicon-32x32.png` (32×32)
     - `images/favicon-48x48.png` (48×48)
     - `images/favicon-192x192.png` (192×192)
   - Keep `apple-touch-icon` referencing `favicon-192x192.png`.

4. **Validation**
   - Verify all generated PNGs are square and non-zero size.
   - Verify `index.html` references only square images.
   - Confirm old SVG/landscape files are removed.

## Out of scope
- Adding new `.ico` bundling or dark-mode favicon variants.
- Modifying any page other than `index.html` for favicon links.

## Decision
Square source + raster multiplex = no browser re-cropping, consistent appearance across Chrome pinned tabs, mobile home screens, and desktop tabs.
