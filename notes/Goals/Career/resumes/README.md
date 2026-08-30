# Resume set — five versions, one set of facts

_Built 2026-08-29 from the Dropbox career folder (`/Cloud Documents/Sachin/Career/`),
the July 2025 TCS profile card, and his own account of the July 2025 – present
workstream. Every date is from a source document._

**Repositioned 2026-08-29 (same day): the core profile is now DATA & AI, not
payments.** Payments is a domain credential, not the identity.

## THE FILES TO ACTUALLY SEND

Built 2026-08-29. These live one level up, in `notes/Goals/Career/`:

| Send this | Format | To whom | Editable twin |
| --- | --- | --- | --- |
| **`Sachin_Koli_Resume.pdf`** | PDF, 2 pages | Recruiters and hiring managers — **the main one** | `Sachin_Koli_Resume.docx` |
| **`Sachin_Koli_Resume_ATS.docx`** | DOCX, plain | Naukri, Workday, Easy Apply, agency databases | *is the .docx* |
| **`Sachin_Koli_OnePager.pdf`** | PDF, 1 page | A friend forwarding you to a hiring manager | `Sachin_Koli_OnePager.docx` |
| **`Sachin_Koli_Profile_Card.pdf`** / `.png` | Visual, **A4 landscape**, 1 page | TCS/client staffing decks · LinkedIn Featured image · your site · handing to someone | `Sachin_Koli_Profile_Card.docx` |

The `.html` beside each PDF is the source — edit it and re-run:

```sh
bin/pub notes/Goals/Career/Sachin_Koli_Resume.html --project Goals --section Career --repo --pdf
```

## Every document also has a Word version — built from the same HTML

Added 2026-08-30. **Each rendered document has a `.docx` twin that looks like the
PDF**, because both come from the same file:

```
Sachin_Koli_Resume.html ──┬── Chromium print-to-PDF ──> Sachin_Koli_Resume.pdf
                          └── resumes/docx/fromhtml.js ─> Sachin_Koli_Resume.docx
```

Open the `.docx` in Word or Google Docs, fix a line, hand it back.

```sh
bin/docx                    # rebuild all four .docx from the HTML
bin/docx resume             # just one:  resume | onepager | card | ats
bin/docx --check            # build, validate, render BOTH, side-by-side PNGs
bin/docx --diff notes/Goals/Career/Sachin_Koli_Resume.docx    # what YOU changed
```

**Send the PDF. Edit the DOCX.** Your Word edits do not flow back on their own —
that is what `--diff` is for: it rebuilds from the HTML into a temp file,
compares your copy against it, and prints exactly the lines you rewrote. Hand me
that and I fold the changes into the `.html` and `data/career-facts.md`, then
rebuild everything.

The exception is the **ATS** file, which has always been a `.docx` and is still
generated in code (`resumes/docx/ats.js`) — it is deliberately plain, one column
with no tables or styling, so there is nothing to render it from.

### How close is close?

Checked by rendering both and putting the pages side by side. The resume is two
pages in both, breaking at the same place, with the same line wrapping. The
one-pager and the profile card are one page each. `bin/docx --check` regenerates
those comparison images any time you want to see for yourself.

The renderer (`resumes/docx/fromhtml.js`, with `docx/css.js` reading the
stylesheet) handles what these documents actually use: `@page` margins and
landscape, fonts and colours, `line-height`, margin collapsing, borders and
backgrounds, `break-after: avoid`, justified text, flex rows, **CSS grid** as
Word tables, lists, and images with borders. It is not a browser — run
`bin/docx --verbose` and it names every CSS property it could not map.

**LinkedIn and the public bio are not documents** — they are text you paste into
fields on a website. They stay as Markdown below; there is nothing to render.

### On the visual card — is that format any good?

**Yes, as a supplement. Never as your primary resume.** It is worth being precise
about where each one wins:

| Use it for | Do NOT use it for |
| --- | --- |
| The TCS/client staffing context the original was built for | **Any ATS or job portal** — two columns, a photo and boxed text parse to garbage, and you are rejected by a machine no human overrules |
| A LinkedIn **Featured** image, or your site | A recruiter's inbox, where they want text they can scan, copy and forward |
| Handing to someone in person, or a slide | Anywhere a hiring manager expects a standard CV — a designed card outside consulting reads as unusual, not impressive |

`Sachin_Koli_Profile_Card.pdf` is the replacement for the July 2025 TCS card.

**It is landscape, deliberately.** A glance artefact should be the shape of the
thing it is glanced on — a screen, a slide, a shared window. Portrait forces a
scroll or a scan down the page; landscape puts the whole profile in one look.
The top band carries identity, then a four-tile proof strip (**18 yrs · $600K ·
2024 · 2025**) does the three-second read, then three columns take the eye
left-to-right: what he builds, what he has shipped publicly, and who he has
worked for.

It is laid out as an engineering spec sheet rather than a brochure: a monospace
utility face carrying the labels and data, hairline rules, and one deep signal
colour. The centrepiece is the **Shipped, in public** column of the four
repositories — the thing no competing profile card has, and the reason this
version is worth sending at all. The headshot is treated as monochrome,
deliberately: the only source available was a photograph of the original card on
a screen, and greyscale reads as a design choice rather than a bad scan.
**Replace it with a proper headshot when you have one** — the file to swap is the
base64 block in `Sachin_Koli_Profile_Card.html`.

### How these were checked

Both PDFs were rendered to images and reviewed. Three defects were found and
fixed: the resume ran to **three pages** with the third nearly empty, the
**TECHNICAL heading was orphaned** at the foot of page 2 with its table pushed
over, and `break-inside: avoid` on long roles left a **large dead gap** at the
foot of page 1. Now two full pages, no orphans, no gaps.

**The `.docx` could not be visually rendered** — LibreOffice is broken in this
environment (it fails on a plain text file, so it is not the document). Instead
it was checked the way that actually matters for an ATS: it passes OOXML schema
validation, and a parser extracts all **93 paragraphs in order** with headings
intact and contact details as separate lines rather than in a header. **Open it
in Word once before you submit it anywhere**, since I could not see it.

---

## The working masters

The Markdown below is where content is edited before regenerating the files
above. Each explains its own audience and rules.

| # | File | Send it to | Names clients? |
| - | --- | --- | --- |
| 1 | `resume-recruiter.md` | Recruiters, hiring managers, agencies — the workhorse | **Yes**, in full |
| 2 | `resume-linkedin.md` | The LinkedIn profile itself — public web | **No** — anonymised |
| 3 | `resume-public.md` | kolisachint.github.io, speaker bios, award entries | **No** |
| 4 | `resume-ats.md` | Naukri, LinkedIn Easy Apply, Workday — machine-parsed | **Yes** |
| 5 | `resume-referral-onepager.md` | A friend forwarding you to a hiring manager | **Yes**, selectively |

**One difference between the masters and the rendered files:** the Markdown
carries `[N]` placeholders for the numbers you have not supplied. **The PDFs do
not** — a final document cannot ship with `[N]` in it, so those bullets were
rewritten to read properly without a figure. Give me the six numbers and I will
put them back in with the numbers attached.

**Why 4 and 5.** An ATS version is not a style choice — the portals that reject
you never show a human your file, and a two-column PDF with tables parses to
garbage. A referral one-pager is the other end: `job-options.md` concluded senior
roles move by referral, and what a referrer needs is one page they can forward
without editing.

---

## The Data & AI question — settled 2026-08-29

Earlier in this session I told you twice that AI was "a direction, not
experience" and that your AI work was unpublished. **That was wrong.** You
pointed me at the repositories and I read them. Both halves of the heading are
earned, and the AI half is arguably the stronger one.

**What is actually shipped** (`github.com/kolisachint`):

| Repo | Stack | Substance |
| --- | --- | --- |
| **hoocode** | TypeScript | Deterministic terminal coding agent **published to npm**. Four packages: CLI, agent runtime with tool calling, unified LLM API across **25+ providers**, differential-rendering TUI. Permission gate on every edit and command, four scoped modes, MCP servers, subagents. ~470 of 1,203 commits are yours, since May 2026. |
| **embeddingsearchtools** | Rust | Embedding search engine. MiniLM via **ONNX Runtime**, int8 weights bundled into the binary. Exact and **HNSW approximate-nearest-neighbour** indexes written from scratch. **BM25 fusion for hybrid retrieval.** mmap-friendly store, library API, CLI, daemon. |
| **voicetools** | Rust | Offline speech-to-text. Mic → VAD → **Parakeet-TDT on ONNX Runtime**, 25 languages, whisper.cpp fallback. |
| **webtools** | Rust | Token-efficient fetch/search for agents. Reference-style URL preservation collapses links to single-token markers under a token budget. |

Plus roughly twenty more public repos in the same ecosystem.

**That is more hands-on LLM and retrieval engineering than most people holding
an "AI Engineer" title.** ONNX inference in two model families, an ANN index
implemented rather than imported, hybrid dense/lexical retrieval, a provider
abstraction across 25+ APIs, and agent architecture with tool calling and
permissioning. All of it public and readable.

### How the documents handle it now

- The AI work has its own section in every version, with the repo names.
- The ATS keyword block runs at **full strength** — LLM agents, MCP, ANN, HNSW,
  hybrid retrieval, RAG, ONNX, ASR — because a repo backs each one.
- **Two words are still deliberately absent: MLOps and model training.** You do
  inference and retrieval, not training pipelines, and claiming those would draw
  a screen on work you have not done.

### One honest framing point

hoocode is a **fork of the MIT-licensed `pi-mono`** by Mario Zechner, credited
in your own README. Every document says "extending a fork", never "built from
scratch" — the ~470 commits and the four-package structure are substantial on
their own, and a reviewer who checks (they do) should find the framing already
matches what the repo says. The Rust tools are wholly yours; those carry no such
caveat.

## Numbers you need to supply

Your July 2025 draft has **no quantification at all** — the same defect as the
TCS profile card, which quantifies exactly one thing in a whole page. Placeholders
marked `[N]` appear in the documents. Fill these six and every version improves:

| Placeholder | What to find |
| --- | --- |
| Kafka throughput | Events/second, or daily message volume |
| Pipeline count | How many Airflow DAGs / ingestion pipelines you own |
| dbt scale | Number of dbt models, or tables in the warehouse |
| BigQuery cost | % or ₹/$ reduction from your optimisation work |
| Deployment time | Before/after Terraform + CI/CD, in hours or days |
| Environments | How many environments Terraform provisions |

A resume line with a number is worth three without one. You already have one
excellent number — the $600K at Sears — which is why it appears in all five.

---

## The confidentiality split

Client names are the whole question, and the answer differs per document:

- **Public surfaces** (LinkedIn, personal site) — no client names. Lloyds,
  Barclays, Saudi Telecom, Sears, Cisco and Telstra all reached you through a
  services contract; naming them publicly is a real contractual and reputational
  risk. They become "a UK tier-1 retail bank", "a Gulf national telecom
  operator". **You lose nothing** — the scale descriptor carries the weight and
  every recruiter reads the code fluently.
- **Private, addressed documents** (a resume to a named recruiter, an ATS
  submission, a referral one-pager) — name them. Standard practice, and what
  buyers expect.

## The PDE certification — confirmed, and now on all five

He confirmed on 2026-08-29 that he **holds the Google Cloud Certified
Professional Data Engineer**. It is now in the header, summary and certifications
block of every version, and in the LinkedIn headline.

It carries more weight under this positioning than it would have under payments:
it is Google's own data credential, it is verifiable, and it is one of the terms
recruiters filter on explicitly. It also repairs the "certifications are 15–20
years old" line — the Oracle and Teradata certificates are old, but the headline
credential is not.

**Two things to do:**

1. **Find the credential ID and Credly badge link.** LinkedIn renders verified
   badges, and a certification with an ID attached is materially more credible
   than a line of text. Add both to the LinkedIn entry.
2. **File the certificate in Dropbox** — `/Cloud Documents/Sachin/Career/` or
   `Academics/`. It is not there. A full search on 2026-08-29 found no Google
   Cloud certificate anywhere in the archive, which is why the earlier drafts
   left it off. Your filing is otherwise excellent; this is the one gap.

**Note the check date.** PDE certifications expire two years from issue. Confirm
yours is current before sending — an expired certification stated as current is
worse than not stating it.

---

## Facts corrected against the repo this session

| Was recorded as | Actually |
| --- | --- |
| TCS from "~2022" | **29 Sep 2021**, Associate Consultant, Grade C3B |
| Sears "Feb 2018 – ~2022" | **15 Feb 2018 – 27 Sep 2021**, joined Technical Specialist, left Architect |
| Satyam "Jan 2008 – Nov 2010" | Confirmed: **7 Jan 2008 – 23 Nov 2010** |
| Cognizant "Nov 2010 – Feb 2018" | Confirmed: **29 Nov 2010 – 13 Feb 2018** |
| Clients: Barclays, STC, Sears, LBG | Also **Telstra** (and Cisco — dropped, below) |
| ~18.5 years | **18 years 8 months** as of Aug 2026 |
| LBG = Digital Cards | **Two workstreams**: Digital Cards 2022 – Jul 2025, **Data Platform Jul 2025 – present** |

**Still Grade C3B after five years.** Hired into C3B Sep 2021; the Sep 2025
letter still reads `CC-C3B`. Not a resume line — but the strongest evidence for
the thesis in `job-options.md`: the ceiling is structural, and only a move
clears it.

## Cisco: removed on purpose

The Cisco EDW2B engagement (Jul 2009 – Nov 2010, via Mahindra Satyam) **is listed
in his own 2022 resume**, so it is real. He asked for it out on 2026-08-29
because he no longer remembers the work.

**That is the right call, and it costs nothing.** A resume line you cannot talk
about is a liability — an interviewer picks the unfamiliar item precisely because
it looks distinctive, and "I don't really recall that project" from sixteen years
ago reads as padding. Dropping it removes the risk.

**No gap is created.** The Mahindra Satyam block keeps its true employment dates
(Jan 2008 – Nov 2010) and now shows Telstra as the client without per-project
sub-dates, so the two years read as continuous. The Informatica/Oracle→Teradata
work moved up into the Telstra bullets — those skills are still his, and they are
what the line was actually worth.

**Client count is now five:** Lloyds, Sears, Saudi Telecom, Barclays, Telstra.
The repo's `profile.md` keeps Cisco on record as history, since that file is the
archive rather than a document anyone sends.
