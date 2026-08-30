---
name: career-docs
description: Building, updating and rendering Sachin's career documents — the five resume versions, the visual profile card, the ATS file, his LinkedIn and public bio. Use whenever a resume, CV, profile, bio, portfolio or job-application artefact is the deliverable, or when a new job, engagement, certification, award or repo needs folding in.
---

# Career documents

**Facts live in one place: `data/career-facts.md`.** Read it first. Nine
documents derive from it, and it names all nine. Never take a date, title or
figure from a resume — resumes drift, that file is checked against the letters
in Dropbox.

## The twelve, and what each is for

| Document | Kind | Audience | Clients named? |
| --- | --- | --- | --- |
| `Sachin_Koli_Resume.pdf` | Rendered, 2pp | Recruiters, hiring managers — **the main one** | Yes |
| `Sachin_Koli_Resume_ATS.docx` | Generated | Naukri, Workday, Easy Apply, agency DBs | Yes |
| `Sachin_Koli_OnePager.pdf` | Rendered, 1pp | A referrer forwarding him | Yes |
| `Sachin_Koli_Profile_Card.pdf` / `.png` | Rendered, visual, **A4 landscape** | Staffing decks, LinkedIn Featured, in person | Yes |
| `Sachin_Koli_Resume.docx` | Generated **from the same HTML as the PDF** | **him**, to review and correct in Word | Yes |
| `Sachin_Koli_OnePager.docx` | Generated from the HTML | **him**, same | Yes |
| `Sachin_Koli_Profile_Card.docx` | Generated from the HTML, landscape | **him**, same | Yes |
| `resumes/resume-recruiter.md` | Master | source for the resume PDF | Yes |
| `resumes/resume-ats.md` | Master | source for the DOCX | Yes |
| `resumes/resume-referral-onepager.md` | Master | source for the one-pager | Yes |
| `resumes/resume-linkedin.md` | Master | **paste into LinkedIn fields** — not a file | **No** |
| `resumes/resume-public.md` | Master | **paste into his site / bios** — not a file | **No** |

LinkedIn and the public bio are **text, not documents**. Do not render them.

## One HTML, two renderers — the PDF and the Word copy come from the same file

He asked for editable copies (*"in resume or job profile also have docx version
so that i can review and update"*), then for them to **look like the PDFs**:
*"pdf looks structuring perfect. so docx should look same... workflow can be
html to pdf and html to docx"*. That is exactly how it works now.

```
Sachin_Koli_Resume.html ──┬── Chromium print-to-PDF ──> Sachin_Koli_Resume.pdf
                          └── resumes/docx/fromhtml.js ─> Sachin_Koli_Resume.docx
```

```sh
bin/docx                  # rebuild all four (resume · onepager · card · ats)
bin/docx resume           # one of: resume | onepager | card | ats
bin/docx --check          # build, validate, render BOTH, write side-by-side PNGs
bin/docx --diff FILE      # what HE changed, against a fresh build from source
bin/docx --text FILE      # what a parser (or an ATS) actually sees
bin/docx --verbose        # list CSS properties the renderer could not map
```

**There is nothing to keep in step.** Edit the HTML, re-render both, done. The
first version of this hand-wrote the Word content in JavaScript beside the HTML,
which meant two copies of every sentence — he was right to reject it.

### What `fromhtml.js` maps

`docx/css.js` is a small CSS reader (selectors, descendant combinators,
inheritance, `var()`, `@page`) and `docx/fromhtml.js` walks the DOM with it:

| CSS | Word |
| --- | --- |
| `@page` margin / `size: landscape` | section margins, orientation |
| `font-size`, `color`, `font-weight`, `letter-spacing` | run properties |
| `line-height` | **exact** line spacing — see the traps |
| `margin-*`, `padding-*` | paragraph spacing, with CSS margin **collapsing** |
| `border-*` | paragraph borders (`space` = the padding) |
| `background` | paragraph or cell shading |
| `break-after/inside: avoid` | `keepNext` / `keepLines` |
| `text-align: justify` | justified paragraphs |
| `display: flex` + `justify-content: space-between` | one paragraph, right tab stop |
| `display: grid` + `grid-template-columns` | a fixed-layout table, children row-major |
| `ul` / `li`, `list-style: none` | real Word bullets, or none |
| `position: absolute` marker at `left: 0` | a hanging indent |
| `<img>` + `width` / `aspect-ratio` / `border` | inline image with an outline |

It is **not** a browser: no flow layout, floats, or general positioning.
`--verbose` prints every property it ignored, so a new one cannot slip past.

**The ATS file is the exception** and is still built in code
(`resumes/docx/ats.js`): it is deliberately plain — one column, no tables, no
styling — so there is no HTML twin to render from.

**Two rules.**

1. **The `.docx` is a review copy, never a source.** Content lives in
   `career-facts.md` and the `.html`. Regenerating overwrites his Word edits
   without warning — so if he has been through one, run `bin/docx --diff`
   **first**, fold what he changed into the real sources, then rebuild.
2. **Change the HTML, rebuild both.** `bin/pub … --pdf` then `bin/docx`.

## The confidentiality rule — the one that matters

**Client names go only in privately addressed documents.** Lloyds, Sears, Saudi
Telecom, Barclays and Telstra all reached him through a services contract.

- **Private** (recruiter PDF, ATS submission, referral one-pager, profile card) →
  name them. Normal practice; buyers expect it.
- **Public** (LinkedIn, his site, speaker bios) → **never**. Use "a UK tier-1
  retail bank", "a US Fortune-500 retailer", "a Gulf national telecom operator".
  Recruiters read the code fluently. The scale signals; the logo creates risk.

## Positioning — settled, do not re-litigate

**Data & AI. Both halves are earned.** Payments is a *domain credential*, not his
identity.

- **Data** — the Jul 2025– Lloyds platform (Kafka, Composer, dbt, BigQuery,
  Terraform).
- **AI** — shipped and public. Run `bin/portfolio`, read
  `notes/Goals/Career/portfolio.md`. **He is not "moving toward" AI and his work
  is not unpublished** — I asserted both in Aug 2026 and was wrong twice.

Two words stay off every document: **MLOps** and **model training**. He does
inference and retrieval. Everything else is repo-backed and can run at full
strength.

## Updating: the loop

```sh
bin/portfolio                                  # refresh the OSS inventory first
# 1. edit data/career-facts.md
# 2. edit the affected masters + the .html sources
bin/pub notes/Goals/Career/<name>.html --project Goals --section Career --repo --pdf
bin/pdfcheck notes/Goals/Career/<name>.pdf     # THEN READ THE PNGs
bin/docx --check                               # rebuild both, side by side — LOOK
```

`/resume` runs this sweep and checks all nine. Use it rather than remembering.

## Traps — each of these cost a cycle

**Always rasterise and look.** `bin/pdfcheck`, then Read the PNGs. The first
resume render was three pages with the last nearly empty, an orphaned
`TECHNICAL` heading, and half a page of dead space. **None of it was visible in
the HTML.** Non-negotiable step.

**Print CSS for a dense CV.** `break-after: avoid` on `h2` and on role headers so
headings never strand. Do **not** put `break-inside: avoid` on a long
multi-bullet role — it dumps a whole page of whitespace; put it on the `li`
instead. 9.05pt / 1.33 line-height / 11–12mm margins fits 18 years onto exactly
two A4 pages.

**No CDN fonts, no remote images.** Chromium renders from `file://` with no
network. Inline everything; embed images as data URIs. System stack here is
Liberation Sans + DejaVu Sans Mono — the mono carries the character.

**The profile card is landscape; the read documents are portrait.** A glance
artefact should be the shape of the screen or slide it is glanced on. The resume
and the referral one-pager are *read*, not glanced, so they stay portrait —
landscape would make a long text column worse, not better.

**A landscape card that paginates has a column genuinely too tall.** Shrinking
`body { height }` does nothing — I tried 208/206/204mm and all still produced two
pages. Cut content from the longest column instead, and check with `bin/pdfcheck`.

**Never ship a visible placeholder.** The masters keep `[N]`; rendered files must
not. Rewrite the bullet to read properly without the figure.

**LibreOffice was never broken — `libreoffice-writer` was simply not installed.**
Two sessions recorded "soffice fails even on a plain `.txt`, do not debug it" and
that was wrong: `libreoffice-core` was present without the Writer module, so
there was nothing that could load a text document. `apt-get install
libreoffice-writer` (needs `apt-get update` first — the pinned versions 404)
fixed it in one go. `bin/setup` installs it and `make doctor` reports it.
**So a `.docx` CAN be rasterised and looked at** — `bin/pdfcheck FILE.docx`
converts through soffice, and `bin/docx --check` renders the PDF and the DOCX and
writes side-by-side page PNGs. Read them; the rule is the same as for a PDF.

**`line-height` must become EXACT line spacing, not `auto`.** Word's `auto` rule
multiplies its own single spacing (~1.15em), so every line comes out ~15% taller
and a two-page resume becomes three. `w:line` in twips with `lineRule="exact"`
reproduces the browser exactly. The exception is a paragraph holding an image —
exact spacing **clips** it to the line height, so those paragraphs size
themselves.

**CSS collapses adjacent margins; Word adds them.** Without collapsing to the
larger of the two, every gap in the document is too big. Same for a parent's
margin against its first or last child.

**Padding on a cell belongs to the cell, once.** Setting it on the cell margins
*and* leaving it on the paragraph inside doubles it — that is how the skills
table grew a page and the card's columns opened a 6.5mm gap under every heading.
The same goes for borders: drawn twice, they also draw twice.

**A cell's width in OOXML includes its margins**, and two adjacent tables are
merged by Word unless a paragraph sits between them.

**Extracting `w:t` needs a negative lookbehind.** The obvious regex
`<w:t[^>]*>(.*?)</w:t>` also matches `<w:tab .../>` and dumps raw XML into the
text. Use `<w:t(?:\s[^>]*)?(?<!/)>(.*?)</w:t>` — `bin/docx` has it right.

**`docx` is not preinstalled** despite what the `docx` skill says — `npm install
docx` in the working dir first.

**Dropbox: MCP reads metadata and text, but not bytes.** `download_link` returns
a `dl.dropboxusercontent.com` URL that the egress policy blocks, so images and
binaries cannot be pulled. Tree root is `/Cloud Documents/`, not `Digital_Drive`.

**Enumerating his repos cannot be scripted** — the GitHub API is bound to
configured repositories. Use the `list_repos` MCP tool, then add names to
`data/portfolio-repos.txt`. Cloning public repos *does* work anonymously.

## Standing gaps to raise

1. **Six missing numbers** on the Jul 2025– platform work — listed in
   `career-facts.md`. A line with a number is worth three without one.
2. **His LinkedIn Projects section and Featured pins are empty.** The AI work
   exists; the profile does not show it. Biggest remaining gap.
3. **PDE expiry unconfirmed** — two years from issue. Also get the credential ID
   and Credly link onto LinkedIn, and file the certificate in Dropbox.
4. **A real headshot.** The profile card uses a monochrome crop of a photograph
   of a screen, because that was the only source available.
