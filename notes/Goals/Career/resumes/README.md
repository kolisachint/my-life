# Resume set — five versions, one set of facts

_Built 2026-08-29 from the Dropbox career folder (`/Cloud Documents/Sachin/Career/`),
the July 2025 TCS profile card, and his own account of the July 2025 – present
workstream. Every date is from a source document._

**Repositioned 2026-08-29 (same day): the core profile is now DATA & AI, not
payments.** Payments is a domain credential, not the identity.

## THE FILES TO ACTUALLY SEND

Built 2026-08-29. These live one level up, in `notes/Goals/Career/`:

| Send this | Format | To whom |
| --- | --- | --- |
| **`Sachin_Koli_Resume.pdf`** | PDF, 2 pages | Recruiters and hiring managers — **the main one** |
| **`Sachin_Koli_Resume_ATS.docx`** | DOCX, plain | Naukri, Workday, Easy Apply, agency databases |
| **`Sachin_Koli_OnePager.pdf`** | PDF, 1 page | A friend forwarding you to a hiring manager |

The `.html` beside each PDF is the source — edit it and re-run:

```sh
bin/pub notes/Goals/Career/Sachin_Koli_Resume.html --project Goals --section Career --repo --pdf
```

The ATS `.docx` is generated from `resumes/build_ats.js` (`node build_ats.js out.docx`).

**LinkedIn and the public bio are not documents** — they are text you paste into
fields on a website. They stay as Markdown below; there is nothing to render.

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

## The Data & AI question — read this before sending anything

You said the core profile is **data and AI**, and that you want to move toward
it. Those are two different statements and the resumes treat them differently.

**Data is earned.** The July 2025 – present workstream — Confluent Kafka, Cloud
Composer, dbt, BigQuery, Terraform — is a genuine modern data platform build. It
is the most current and most marketable thing on your CV, and it now leads every
one of these documents.

**AI is not, yet.** The work you described contains **no AI at all**: no models,
no ML pipelines, no GenAI, no inference serving, no vector search. Not one line.
If a resume claims AI and an interviewer asks "what have you shipped?", the
honest answer today is "nothing in production."

So every document here:

- **Headlines "Data & AI Platforms"** — legitimate, because it describes where
  the platform work points and what you are building toward.
- **Sells the data platform on its own merits** — it does not need AI to be
  impressive.
- **Carries your real AI material in an "Independent Engineering" section** —
  the Rust embedding library and the semantic-search work. That is genuine
  applied-AI engineering and almost no competing services candidate has it.
- **Never claims AI experience you cannot demonstrate.**

### The single action that closes the gap

**Publish the Rust embedding library.** `decisions.md` has said this since
27 Aug and it has not moved. Right now your AI claim rests on work no one can
see. A public repo with a README explaining the design decisions converts
"interested in AI" into "here is applied AI I built" — and it is the difference
between the ₹45–55 L band and the one above it.

It is one weekend. It is the highest-leverage career action in this repo.

### The second action

**Get AI into the day job.** You are already the architect of a BigQuery data
platform — that is the natural substrate for a first ML or GenAI use case
(anomaly detection on the streams, a semantic layer, BigQuery ML on existing
tables, an LLM interface over the warehouse). One shipped use case at Lloyds
would move this from aspiration to experience within a quarter.

---

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
