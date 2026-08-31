---
name: render-parity
description: Checking a rendered document against what it was made from — HTML vs PDF, HTML vs DOCX, and PDF vs DOCX. Covers whether every word survived the render, whether the two renders agree, and how to locate a layout drift. Use after building or changing any rendered document, when a render looks wrong or came out the wrong length, or when a .docx needs to be looked at at all.
---

# Checking a render

Three comparisons, three different questions. Do them in this order — a
beautiful page that lost a paragraph is worse than an ugly one that did not.

| Comparison | Question | Tool |
| --- | --- | --- |
| **HTML → PDF** | did every word survive? | `bin/rendercheck FILE.html --pdf-only` |
| **HTML → DOCX** | did every word survive? | `bin/rendercheck FILE.html --docx-only` |
| **PDF ↔ DOCX** | do the two renders agree? | `bin/docx --check`, then read the PNGs |

`bin/docx --check` runs all three for every document and is the one command to
reach for.

## 1 and 2 — is anything MISSING?

```sh
bin/rendercheck notes/Goals/Career/Sachin_Koli_Resume.html
   docx aligned  100.00%   7273/7273 characters
   pdf  aligned  100.00%   7273/7273 characters
```

**Looking at a page cannot answer this.** A renderer that meets a construct it
does not understand drops it silently, and the result looks fine — the
one-pager lost the prose around every `<strong>` exactly that way, and it was
caught by chance, by reading that paragraph. `rendercheck` extracts the source's
own text, the PDF's text and the DOCX's text, and reports anything present in
the source and absent from a render. It exits non-zero when something is lost.

**It compares character streams with whitespace removed**, which is the only way
this works: Chromium extracts a letter-spaced heading as separate glyphs
(`W H A T`), adjacent table cells and inline spans run together in the source,
and line breaks land wherever each renderer put them. Strip all of it and the
remaining question is the right one — are the same characters present, in the
same order?

**"Moved" is not "lost".** An absolutely positioned marker, or a multi-column
page, extracts in a different reading order. Before reporting a fragment as
missing, `rendercheck` probes for it elsewhere in the render; if it is there, it
says so instead:

```
   pdf  aligned   62.13%   1403/2258 characters
        (all present; 1 block(s) extract in a different reading order —
         normal for absolute positioning or columns)
```

That line is fine. `MISSING from the docx: "…"` is not.

## 3 — do the two renders agree?

**A `.docx` cannot be trusted from its XML any more than a PDF can from its
HTML.** Render both, put the pages beside each other, and look.

```sh
bin/docx --check          # writes /tmp/docxcheck/<name>-side/pageN.png
bin/pdfcheck FILE.docx    # a .docx on its own -> page PNGs (via LibreOffice)
bin/pdfcheck FILE.html    # its PDF twin -> page PNGs
```

Left is the PDF, right is the DOCX. Page counts agreeing is not the same as the
two documents looking alike.

What to compare, in order:

1. **Page count.** If it differs, nothing else matters yet.
2. **Where the page breaks fall.** Same block starting page 2 in both?
3. **Line wrapping.** Breaking after the same words means the font mapping and
   text widths are right, and any remaining difference is vertical.
4. **Column widths** — a column grabbing half the page is the classic unsized-
   cell symptom.
5. **Dead space and doubled rules** — a hairline drawn twice is one drawn on the
   cell *and* on the paragraph inside it.

### Not every HTML has a PDF worth comparing

Some source HTML is a build input, not a deliverable — a paste sheet whose words
go into fields on a website, or a file whose `.docx` **is** what gets sent.
Nothing is printed from those, so a page-count difference is not a defect.
`build_docx.js` marks them with a `noPdf` reason and exposes `--no-pdf-compare`;
`bin/docx --check` prints the reason instead of `MISMATCH`. Add the marker
rather than contorting a stylesheet to make two numbers agree.

## Locating a vertical drift

Do not guess where extra height comes from. Measure it: find the full-width
rules in both renders and compare their y positions. Where they first diverge is
where the drift starts.

```python
from PIL import Image
im = Image.open(png).convert('L'); px = im.load(); w, h = im.size
rules = [y for y in range(h) if sum(1 for x in range(0, w, 2) if px[x, y] < 205) > w // 4]
ink   = [y for y in range(h) if any(px[x, y] < 205 for x in range(0, w, 2))]
print('rules at', rules, '| ink', ink[0], '-', ink[-1])
```

Same trick for a page with almost nothing on it: measure where the ink ends to
see whether one line spilled or a whole section did. Banding the ink rows inside
a table is what exposed 26px rows against the PDF's 23px — a border being drawn
twice.

## The environment, and the misdiagnosis worth remembering

Rendering a `.docx` needs **LibreOffice Writer**, not just LibreOffice.

Two sessions recorded *"soffice is broken here, it fails even on a plain `.txt`,
do not debug it"* — and that was wrong. `libreoffice-core` was installed
**without `libreoffice-writer`**, so there was no module that could load a text
document at all. The symptom (`Error: source file could not be loaded`, on every
input) reads exactly like a broken install and is not one.

```sh
apt-get update && apt-get install -y libreoffice-writer   # update first: pinned versions 404
```

`bin/setup` installs it; `make doctor` reports it as the **docx engine**. If a
future session sees soffice failing on everything, check for
`/usr/lib/libreoffice/program/libswlo.so` before concluding anything.

LibreOffice's rendering is close to Word's, not identical. It settles page
count, page breaks, line wrapping and column widths — which is what actually
goes wrong.

## Content that is not layout

```sh
bin/docx --text FILE.docx        # paragraph-per-line text, in order
bin/docx --diff FILE.docx        # rebuild from source, diff a human's copy against it
```

`bin/docx --check` also lists **any bracketed placeholder** it finds, not just
the `[N]` figures — that is how `Notice period: [fill in before submitting]` on
the ATS file stays visible. Deliberate, but it must never be uploaded as-is.

## What "close enough" means

Chromium and Word will never be pixel-identical, and chasing that is waste. The
bar that matters:

- **nothing missing** — `rendercheck` at 100%, always;
- **same page count**, for anything with a PDF worth comparing;
- **the same page break points**, because a reader comparing the two notices
  nothing else so quickly;
- no doubled rules, no clipped images, no column overflowing its neighbour.

A gap a point or two out, or a separator sitting slightly tighter, is fine — say
so plainly rather than burning cycles on it.

## Related

`html-to-pdf` for the print-CSS side. `html-to-docx` for the renderer, its CSS
mapping, and the four bugs that each cost a page.
