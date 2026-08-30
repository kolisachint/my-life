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
| `Sachin_Koli_Resume.docx` | Generated | **him**, to review and correct in Word | Yes |
| `Sachin_Koli_OnePager.docx` | Generated | **him**, same | Yes |
| `Sachin_Koli_Profile_Card.docx` | Generated, landscape | **him**, same | Yes |
| `resumes/resume-recruiter.md` | Master | source for the resume PDF | Yes |
| `resumes/resume-ats.md` | Master | source for the DOCX | Yes |
| `resumes/resume-referral-onepager.md` | Master | source for the one-pager | Yes |
| `resumes/resume-linkedin.md` | Master | **paste into LinkedIn fields** — not a file | **No** |
| `resumes/resume-public.md` | Master | **paste into his site / bios** — not a file | **No** |

LinkedIn and the public bio are **text, not documents**. Do not render them.

## The Word copies — he reviews in Word, he sends the PDF

Added 2026-08-30 at his request: *"in resume or job profile also have docx
version so that i can review and update"*. A PDF is not markupable, so every
rendered document now has a `.docx` twin with the same words in the same order.

```sh
bin/docx                  # rebuild all four (resume · onepager · card · ats)
bin/docx resume           # one of: resume | onepager | card | ats
bin/docx --check          # build, then OOXML-validate and count paragraphs
bin/docx --diff FILE      # what HE changed, against a fresh build from source
bin/docx --text FILE      # what a parser (or an ATS) actually sees
```

Sources: `resumes/docx/style.js` (shared Word furniture — headings, bullets,
role heads, the label/value table) plus one small file per document. The content
files write prose with `**bold**` and `` `mono` `` markers; `rich()` turns those
into runs, so a bullet stays readable as a sentence.

**Two rules.**

1. **The `.docx` is a review copy, never a source.** Content still lives in
   `career-facts.md`, the masters and the `.html`. Regenerating overwrites his
   Word edits without warning — so if he has been through one, run
   `bin/docx --diff` **first**, fold what he changed into the real sources, then
   rebuild.
2. **Change a PDF, rebuild its twin.** A `.docx` that lags the PDF is worse than
   no `.docx` — he corrects the stale copy and the correction lands nowhere.

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
bin/docx --check                               # rebuild + validate all four .docx
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

**LibreOffice is broken in this environment** — it fails on a plain `.txt`, so
`soffice --convert-to pdf` cannot verify a `.docx`. Re-confirmed 2026-08-30, with
a fresh `-env:UserInstallation` profile: same "source file could not be loaded".
Do not debug it. `bin/docx --check` is the substitute — OOXML schema validation
plus the `w:t` extraction, which is what an ATS actually sees. **Tell him to open
each one in Word once**, since nobody has ever seen these rendered; the specific
thing to ask about is whether the resume still fits two pages.

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
