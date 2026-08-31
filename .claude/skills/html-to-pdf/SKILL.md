---
name: html-to-pdf
description: Rendering an HTML file to a print-quality PDF with headless Chromium — print CSS, page-fitting, fonts and images, and the rasterise-and-look check. Use whenever a PDF is the deliverable, a rendered document is being edited, or a render came out with the wrong page count, an orphaned heading or dead space.
---

# HTML → PDF

The renderer is headless Chromium, driven by `bin/pub` (render + publish) or
`bin/pdfcheck` (render + rasterise). **Never shell out to Chromium yourself and
never write a Markdown→PDF converter** — if the tooling is missing something,
extend it.

```sh
bin/pub FILE.html --project Goals --section Career --repo --pdf   # render + place
bin/pdfcheck FILE.html          # render, then rasterise to page PNGs
bin/pdfcheck FILE.pdf --dpi 150 --out /tmp/look
```

## The two checks, and why one is not enough

```sh
bin/pdfcheck FILE.html                    # render, rasterise, then READ the PNGs
bin/rendercheck FILE.html --pdf-only      # did every word survive the render?
```

**Rasterise the result and Read the PNGs. Every time.**

Page count, orphaned headings, dead space at a page foot, text collided with a
rule, a placeholder you meant to fill — **none of these are visible in the
HTML**. On 2026-08-29 a resume looked perfect in source and came out three pages
with the last nearly empty, an orphaned `TECHNICAL` heading and half a page of
gap. Every layout defect ever found in this repo was found by looking, and none
of them any other way.

**And looking still cannot tell you what is MISSING.** A dropped block leaves a
page that looks fine. `bin/rendercheck` compares the source's own text against
the text extracted from the render and names anything lost; it exits non-zero
when something is. Run both — they answer different questions. Details in
`render-parity`.

## Print CSS that behaves

```css
@page { size: A4; margin: 11mm 12mm; }        /* landscape: size: A4 landscape */
h2 { break-after: avoid; page-break-after: avoid; }   /* never strand a heading */
li { break-inside: avoid; }                            /* keep list items whole */
```

- **`break-after: avoid` on every heading**, and on any sub-heading that owns the
  block under it (a role title, a workstream label). This is what stops an
  employer name sitting alone at the foot of a page.
- **Do NOT put `break-inside: avoid` on a long multi-block section.** If it
  cannot fit, the whole thing jumps to the next page and leaves a half-page
  hole. Put it on the small units — the `li`, the table, the card — instead.
- **Density that works:** 9.05pt / 1.33 line-height / 11–12mm margins fits an
  18-year CV onto exactly two A4 pages. Start there before cutting content.

## Fitting a fixed-size page

A landscape card, a one-pager, anything with a hard page budget:

**If it paginates, a block is genuinely too tall — shrinking `body { height }`
does nothing.** That was tested at 209.4, 208, 206 and 204mm and every one still
produced two pages. Diagnose it properly: rasterise the overflow page, find
where the ink is, and cut from whichever column or section is actually longest.

## Fonts and images

Chromium renders from `file://` **with no network**. So:

- **No CDN fonts, no remote images, no external stylesheets.** They silently do
  not load and the render is wrong in a way that looks deliberate.
- Inline all CSS; embed images as `data:` URIs.
- The system stack here is **Liberation Sans** and **DejaVu Sans Mono**. Ask for
  them by a metric-compatible name (`Helvetica, Arial, sans-serif`) so the same
  file renders the same way elsewhere.
- `-webkit-print-color-adjust: exact; print-color-adjust: exact;` on `html`, or
  backgrounds and tinted panels drop out of the print.

## Traps that have cost a cycle each

**A render that looks unchanged may not have been written.** `bin/pub` used to
fail on `cp` when the source was already at its destination, and `set -e`
aborted *before* copying the new PDF — silently leaving the old one in place.
Fixed with an `-ef` check, but the lesson stands: if a render looks identical to
the last one, confirm the file actually got written.

**Never ship a visible placeholder.** Markdown masters may carry `[N]`; a
rendered document must not. Rewrite the sentence so it reads properly without
the figure.

## When the same HTML also has to become a Word file

That is a separate skill: **`html-to-docx`**. Both renderers read the same
`.html`, so print CSS choices show up in both — and **`render-parity`** is how
to check they still agree.
