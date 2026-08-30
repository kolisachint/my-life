---
name: career-docs
description: Building, updating and rendering Sachin's career documents — the five resume versions, the visual profile card, the ATS file, his LinkedIn and public bio. Use whenever a resume, CV, profile, bio, portfolio or job-application artefact is the deliverable, or when a new job, engagement, certification, award or repo needs folding in.
---

# Career documents

**Facts live in one place: `data/career-facts.md`.** Read it first. Twelve
documents derive from it, and it names all twelve. Never take a date, title or
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
| `resumes/resume-recruiter.md` | Master | source for the resume HTML → PDF + DOCX | Yes |
| `resumes/resume-ats.md` | Master | source for the **ATS** DOCX | Yes |
| `resumes/resume-referral-onepager.md` | Master | source for the one-pager | Yes |
| `resumes/resume-linkedin.md` | Master | **paste into LinkedIn fields** — not a file | **No** |
| `resumes/resume-public.md` | Master | **paste into his site / bios** — not a file | **No** |

LinkedIn and the public bio are **text, not documents**. Do not render them.

## Rendering: three skills own the mechanics, this file does not

He asked for editable copies (*"in resume or job profile also have docx version
so that i can review and update"*), then for them to match: *"pdf looks
structuring perfect. so docx should look same... workflow can be html to pdf and
html to docx"*. That is how it works — **one HTML, two renderers**:

```
Sachin_Koli_Resume.html ──┬── Chromium print-to-PDF ──> .pdf
                          └── resumes/docx/fromhtml.js ─> .docx
```

**Read the skill, do not re-derive it.**

| Skill | Owns |
| --- | --- |
| **`html-to-pdf`** | print CSS, page fitting, fonts, `bin/pub` / `bin/pdfcheck`, rasterise-and-look |
| **`html-to-docx`** | the DOCX renderer, its CSS mapping, and the four bugs that each cost a page |
| **`docx-pdf-parity`** | rendering both and comparing them, and locating a drift |

```sh
bin/docx                  # HTML -> all four Word copies
bin/docx --check          # build, validate, render both, side-by-side PNGs
bin/docx --diff FILE      # what HE changed in Word, before you overwrite it
```

**What is career-specific, and belongs here:**

1. **The `.docx` is his review copy, never a source.** Content lives in
   `data/career-facts.md` and the `.html`. If he has been through one in Word,
   run `bin/docx --diff` **first**, fold what he changed into the real sources,
   then rebuild.
2. **Change the HTML, rebuild both.** `bin/pub … --pdf`, then `bin/docx`.
3. **The ATS file is the exception** — built in code (`resumes/docx/ats.js`)
   because it is deliberately plain: one column, no tables, no styling for a
   parser to trip on. It has no HTML twin.

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

Mechanics for each of those steps: `html-to-pdf`, `html-to-docx`,
`docx-pdf-parity`.

`/resume` runs this sweep and checks all twelve. Use it rather than remembering.

## Traps — the career-specific ones

Rendering traps live in `html-to-pdf`, `html-to-docx` and `docx-pdf-parity`.
Read those before touching a render. What is left here is about *these
documents*.

**Always rasterise and look.** `bin/pdfcheck` for a PDF, `bin/docx --check` for
the Word copies, then Read the PNGs. The first resume render was three pages
with the last nearly empty, an orphaned `TECHNICAL` heading and half a page of
dead space — **none of it visible in the HTML**. Non-negotiable, still.

**Density for a dense CV:** 9.05pt / 1.33 line-height / 11–12mm margins fits
18 years onto exactly two A4 pages. Start there before cutting content.

**The profile card is landscape; the read documents are portrait.** His call, and
right: a glance artefact should be the shape of the screen or slide it is glanced
on. The resume and the referral one-pager are *read*, not glanced, so they stay
portrait — landscape would make a long text column worse.

**A landscape card that paginates has a column genuinely too tall.** Shrinking
`body { height }` does nothing — 208/206/204mm all still produced two pages. Cut
from the longest column instead.

**Never ship a visible placeholder.** The masters keep `[N]`; rendered files must
not. Rewrite the bullet to read properly without the figure.

**Dropbox: MCP reads metadata and text, but not bytes.** `download_link` returns
a `dl.dropboxusercontent.com` URL the egress policy blocks, so images and
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
