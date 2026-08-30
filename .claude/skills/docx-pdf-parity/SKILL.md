---
name: docx-pdf-parity
description: Proving a generated .docx still looks like its PDF — rendering both, comparing pages side by side, and locating where a layout drifts. Use after building or changing a Word document, when a .docx and its PDF disagree on page count or layout, or when a .docx needs to be looked at at all.
---

# Checking a DOCX against its PDF

**A `.docx` cannot be trusted from its XML any more than a PDF can from its
HTML.** Render both, put the pages beside each other, and look.

```sh
bin/docx --check      # build, OOXML-validate, render BOTH, write side-by-side PNGs
bin/pdfcheck FILE.docx    # a .docx on its own -> page PNGs (via LibreOffice)
bin/pdfcheck FILE.html    # its PDF twin -> page PNGs
```

`--check` writes to `/tmp/docxcheck/<name>-side/pageN.png`, **left PDF, right
DOCX**. Read them. Page counts agreeing is not the same as the two documents
looking alike.

## The environment, and the misdiagnosis worth remembering

Rendering a `.docx` needs **LibreOffice Writer**, not just LibreOffice.

Two sessions recorded *"soffice is broken here, it fails even on a plain `.txt`,
do not debug it"* — and that was wrong. `libreoffice-core` was installed
**without `libreoffice-writer`**, so there was no module that could load a text
document at all. The symptom (`Error: source file could not be loaded`, on
every input) reads exactly like a broken install and is not one.

```sh
apt-get update && apt-get install -y libreoffice-writer   # update first: pinned versions 404
```

`bin/setup` installs it; `make doctor` reports it as the **docx engine**. If a
future session sees soffice failing on everything, check for
`/usr/lib/libreoffice/program/libswlo.so` before concluding anything.

LibreOffice's rendering is close to Word's, not identical. It is enough to
settle page count, page breaks, line wrapping and column widths — which is what
actually goes wrong.

## What to compare, in order

1. **Page count.** If it differs, nothing else matters yet.
2. **Where the page breaks fall.** Same block starting page 2 in both?
3. **Line wrapping.** Do paragraphs break after the same words? If yes, the font
   mapping and text widths are right and any remaining difference is vertical.
4. **Column widths** in tables and grids — a column grabbing half the page is
   the classic unsized-cell symptom.
5. **Dead space and doubled rules** — a hairline drawn twice is a hairline drawn
   on the cell *and* on the paragraph inside it.

## Locating a vertical drift

Do not guess where the extra height is. Measure it: find the full-width rules
(section borders) in both renders and compare their y positions. Wherever they
first diverge is where the drift starts.

```python
from PIL import Image
im = Image.open(png).convert('L'); px = im.load(); w, h = im.size
rules = [y for y in range(h) if sum(1 for x in range(0, w, 2) if px[x, y] < 205) > w // 4]
ink   = [y for y in range(h) if any(px[x, y] < 205 for x in range(0, w, 2))]
print('rules at', rules, '| ink', ink[0], '-', ink[-1])
```

Same trick for a page that has almost nothing on it: measure where the ink ends
to see whether one line spilled or a whole section did.

Row pitch inside a table is worth measuring the same way — banding the ink rows
showed 26px per row against the PDF's 23px, which is what exposed a border being
drawn twice.

## Reading the diff of the words, not the pixels

Layout is one question; content is another.

```sh
bin/docx --text FILE.docx        # paragraph-per-line text, in order
bin/docx --diff FILE.docx        # rebuild from source, diff a human's copy against it
```

`--diff` is how a person's Word edits get back into the real source: it rebuilds
the document into a temp file and prints exactly the lines they rewrote. Run it
**before** any rebuild, or their edits are silently overwritten.

## What "close enough" means

Chromium and Word will never be pixel-identical, and chasing that is waste. The
bar that matters:

- **same page count**, always;
- **the same page break points**, because a reader comparing the two notices
  nothing else so quickly;
- no doubled rules, no clipped images, no column overflowing its neighbour.

Differences of a point or two in a gap, or a separator sitting slightly tighter,
are fine — say so plainly rather than burning cycles on them.

## Related

`html-to-pdf` for the print-CSS side. `html-to-docx` for the renderer, its CSS
mapping, and the four bugs that each cost a page.
