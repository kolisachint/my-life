---
name: html-to-docx
description: Turning an HTML file and its stylesheet into an editable Word .docx that looks like the PDF, using the repo's own renderer. Use when a Word/.docx version of a rendered document is wanted, when the DOCX build needs a new CSS feature, or when a .docx came out with the wrong page count, doubled rules or squashed images.
---

# HTML → DOCX

**One source, two renderers.** Chromium prints the `.html` to PDF; the renderer
here reads the same `.html` and its stylesheet and writes the `.docx`. There is
no second copy of the content, so the two cannot drift.

```
FILE.html ──┬── Chromium print-to-PDF ──────────> FILE.pdf
            └── resumes/docx/fromhtml.js ───────> FILE.docx
```

```sh
bin/docx                  # build every document
bin/docx resume           # build one
bin/docx --check          # build, validate, render BOTH, side-by-side PNGs
bin/docx --diff FILE      # what a HUMAN changed, vs a fresh build from source
bin/docx --text FILE      # what a parser (or an ATS) actually sees
bin/docx --verbose        # every CSS property the renderer could not map
```

Where it lives: `notes/Goals/Career/resumes/docx/` — `css.js` (a small CSS
reader), `fromhtml.js` (the DOM walker), `pack.js` (writes the file). Driven by
`build_docx.js`. **Every document goes through it**; nothing is hand-built.

Dependencies are `docx` and `node-html-parser`, pinned in the `package.json`
beside them. Neither is preinstalled — `bin/docx` installs them on first run and
`bin/setup` does it up front. Do **not** `npm install docx` into a random working
directory.

**Do not convert with LibreOffice.** `soffice --convert-to docx file.html` was
tried: 4 pages instead of 2, the contact strip became boxed table cells, and
flex rows lost their alignment. It is worse than nothing.

## What it maps

| CSS | Word |
| --- | --- |
| `@page` margin, `size: … landscape` | section margins, orientation |
| `font-size`, `color`, `font-weight`, `font-style`, `letter-spacing` | run properties |
| `font-family` | mapped to a metric-compatible Word face (Arial / Consolas / Times) |
| `line-height` | **exact** line spacing — see below |
| `margin-*`, `padding-*` | paragraph spacing, **with CSS margin collapsing** |
| `border-top/bottom/left` | paragraph borders, `space` from the padding |
| `background` | paragraph or cell shading |
| `break-after: avoid`, `break-inside: avoid` | `keepNext`, `keepLines` |
| `text-align` | alignment, including justified |
| `text-transform: uppercase`, `letter-spacing` | uppercased text, `characterSpacing` |
| `display: flex` + `justify-content: space-between` | one paragraph, right tab stop |
| `display: grid` + `grid-template-columns` | fixed-layout table, children row-major |
| `display: block` on an inline tag | forced to a block |
| `ul`/`li`, `list-style: none`, `li::marker { color }` | Word bullets, or none, in the marker colour |
| `position: absolute` marker at `left: 0` in a padded box | a hanging indent |
| `<img>` + `width`, `aspect-ratio`, `border` | inline image with an outline |
| `var(--custom-properties)` | resolved before anything else |
| `--docx-style: Heading1` | a real Word heading style — see below |

It is **not a browser**: no flow layout, floats, or general positioning. It
handles what the stylesheets actually use. `--verbose` lists what it ignored, so
a newly-introduced property cannot pass unnoticed.

## The four that each cost a page

**1. `line-height` must become EXACT line spacing.** Word's `auto` rule
multiplies its *own* single spacing (~1.15em), so every line lands ~15% taller
and a two-page resume becomes three. Emit `w:line` in twips with
`lineRule="exact"` — `font-size × line-height × 20`.

**2. …except on a paragraph holding an image**, where exact spacing **clips** it
to the line height and the picture renders as a squashed strip. Those paragraphs
must size themselves.

**3. CSS collapses adjacent vertical margins to the larger; Word adds them.**
Collapse them yourself or every gap in the document is too big. The same applies
between a parent's margin and its first or last child.

**4. A cell's padding and borders belong to the cell, once.** Setting them as
cell margins *and* leaving them on the paragraph inside doubles both — that is
how a skills table grew a page and a card's columns opened a 6.5mm gap under
every heading.

## Structural gotchas

- **`docx` freezes paragraph properties at construction.** Mutating
  `para.properties` afterwards silently does nothing. Collect blocks as plain
  specs and build the `Paragraph` objects at the very end — which is also what
  makes wrapper margins and margin collapsing possible at all.
- **A cell's `w:tcW` includes its margins.** Add the container padding and the
  grid gap back on top of the track width, or the content is squeezed out of its
  own column.
- **Two adjacent tables are merged by Word.** Put a paragraph between them,
  pinned to a 1-twip exact line so it takes no visible space.
- **`auto` grid tracks have to be estimated** — a fixed-layout table cannot
  shrink-to-fit. Measure the widest line in that column *across every row*
  (average glyph ≈ 0.52em sans, 0.62em mono) and err generous: a slightly wide
  column moves an edge, a slightly narrow one wraps text that was meant to stay
  on one line.
- **Landscape:** pass A4 portrait-wise (11906 × 16838) and set the orientation.
  The library swaps the two itself; pre-swapping swaps them back.
- **Paragraph shading needs `type: ShadingType.CLEAR`**, or `w:shd` is emitted
  without `w:val` and OOXML validation fails.
- **Mixed inline and block children need anonymous blocks.** An `<li>` holding
  an `<h3>` plus loose text must not have that text shredded into one paragraph
  per `<strong>`; group consecutive inline siblings into their own paragraph.
- **Reject pseudo-elements when matching selectors.** `li::marker { color }`
  styles the bullet glyph; letting it match the `<li>` repaints the whole line.

## Reading a .docx back

```
<w:t(?:\s[^>]*)?(?<!/)>(.*?)</w:t>
```

The obvious `<w:t[^>]*>(.*?)</w:t>` **also matches `<w:tab .../>`** and dumps raw
XML into the extracted text. The negative lookbehind is load-bearing.
`bin/docx --text` has it right — use that rather than rewriting it.

## Extending it

1. Add the property to `PROPS` in `css.js` (and to `INHERITED` if CSS inherits it).
2. Handle it in `runFrom` (a run property) or `paraProps` (a paragraph property),
   or in `block`/`grid`/`table` if it changes structure.
3. **Do both sides of a box property.** `padding-left` was mapped to a left
   indent and `padding-right` to nothing, so text ran out past the right edge of
   every tinted panel. Whatever you add, ask what its mirror does.
4. Rebuild, then **`bin/docx --check`**: it validates the file, runs
   `bin/rendercheck` to prove no text was lost, and writes side-by-side PNGs
   against the PDF. Read them — never judge a `.docx` from its XML. See
   `render-parity`.

**A construct the renderer does not understand is dropped silently.** That is
the failure mode to fear, not a wrong margin: the one-pager lost the prose
around every `<strong>` and the page still looked plausible. `bin/rendercheck`
exists for exactly this, and runs on every `--check`.

## The rule for humans editing the output

**Send the PDF, edit the DOCX, and the DOCX is never a source.** Rebuilding
overwrites their Word edits without warning, so run `bin/docx --diff FILE`
first, fold what changed into the `.html`, and only then rebuild.
