# Resume set — five versions, one set of facts

_Built 2026-08-29 from the Dropbox career folder (`/Cloud Documents/Sachin/Career/`),
the July 2025 TCS profile card, and his own account of the July 2025 – present
workstream. Every date is from a source document._

**Repositioned 2026-08-29 (same day): the core profile is now DATA & AI, not
payments.** Payments is a domain credential, not the identity.

## Which one to send

| # | File | Send it to | Names clients? |
| - | --- | --- | --- |
| 1 | `resume-recruiter.md` | Recruiters, hiring managers, agencies — the workhorse | **Yes**, in full |
| 2 | `resume-linkedin.md` | The LinkedIn profile itself — public web | **No** — anonymised |
| 3 | `resume-public.md` | kolisachint.github.io, speaker bios, award entries | **No** |
| 4 | `resume-ats.md` | Naukri, LinkedIn Easy Apply, Workday — machine-parsed | **Yes** |
| 5 | `resume-referral-onepager.md` | A friend forwarding you to a hiring manager | **Yes**, selectively |

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

## One thing deliberately NOT on any of these

**The July 2025 profile card claims "Google Cloud Certified Professional Data
Engineer". No such certificate exists anywhere in your Dropbox** — the only GCP
credential on file is the Coursera specialisation *"Data Engineering, Big Data,
and Machine Learning on GCP"*, a course completion rather than a Google
certification. They are different things and hiring managers verify the second.

**If you do hold the PDE, tell me and it goes to the top of all five** — for a
data-and-AI positioning it is a much more valuable line than it was for payments.
If you do not, the card TCS is showing clients should be corrected.

---

## Facts corrected against the repo this session

| Was recorded as | Actually |
| --- | --- |
| TCS from "~2022" | **29 Sep 2021**, Associate Consultant, Grade C3B |
| Sears "Feb 2018 – ~2022" | **15 Feb 2018 – 27 Sep 2021**, joined Technical Specialist, left Architect |
| Satyam "Jan 2008 – Nov 2010" | Confirmed: **7 Jan 2008 – 23 Nov 2010** |
| Cognizant "Nov 2010 – Feb 2018" | Confirmed: **29 Nov 2010 – 13 Feb 2018** |
| Clients: Barclays, STC, Sears, LBG | Also **Cisco** and **Telstra** — six, not four |
| ~18.5 years | **18 years 8 months** as of Aug 2026 |
| LBG = Digital Cards | **Two workstreams**: Digital Cards 2022 – Jul 2025, **Data Platform Jul 2025 – present** |

**Still Grade C3B after five years.** Hired into C3B Sep 2021; the Sep 2025
letter still reads `CC-C3B`. Not a resume line — but the strongest evidence for
the thesis in `job-options.md`: the ceiling is structural, and only a move
clears it.
