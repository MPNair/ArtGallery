# Images

This project is designed for **local high-resolution images** in modern formats.

## Expected paths

- `public/images/hero/italian-masterpiece.webp` (homepage background)
- `public/images/artworks/*.webp` (gallery items)
- `public/images/artist/portrait.webp` (artist portrait)

Fallbacks (optional but recommended):

- `public/images/hero/italian-masterpiece.jpg`
- `public/images/artworks/*.jpg`
- `public/images/artist/portrait.jpg`

If an image is missing, the UI falls back to the SVG placeholders in `public/images/placeholders/`.

## Optimization guidance

- Prefer **WebP** or **AVIF**.
- Keep hero background under ~400–700KB if possible.
- For artworks, use:
  - a large version (e.g. 1800–2400px wide)
  - optionally a smaller one (e.g. 900–1200px wide) if you want to add `srcset`.

