# Career facts — single source of truth

**Every career document derives from this file.** If a date, title, client or
number is wrong here, it is wrong in fifteen places. Fix it here first, then
regenerate.

_Verified 2026-08-29 against the offer, appointment and experience letters in
Dropbox `/Cloud Documents/Sachin/Career/`. Where this file and a document
disagree, this file wins._

_The Lloyds rows were rebuilt 2026-09-03 from
`notes/Goals/Career/lbg-5-year-profile.md` — his own evidence-based profile of
the engagement, compiled from 150 Confluence pages he authored. That note is the
primary source for **what he did at Lloyds**; this file stays the source for
dates, titles and figures._

---

## Identity

| | |
| --- | --- |
| Name | Sachin Tatyaso Koli |
| Positioning | **Solution Architect — Cloud Data & AI Platforms** |
| Title on record at the client | **Solution Architect E**, Everyday Banking Platform, Lloyds Banking Group *(confirmed 2026-09-03)* |
| Location | Pune, Maharashtra, India |
| Phone | +91 95522 36200 |
| Email | kolisachint@gmail.com · work koli.sachin1@tcs.com |
| Links | linkedin.com/in/kolisachint · github.com/kolisachint · kolisachint.github.io |
| Total experience | **18 years 8 months** (from 7 Jan 2008) — recompute, don't copy |

## Employment — exact, from letters

| Employer | Title | From | To |
| --- | --- | --- | --- |
| **Tata Consultancy Services**, Pune | Associate Consultant, Grade C3B (role: Solution Architect). Associate no. 2051164 | **29 Sep 2021** | present |
| **Sears IT and Management Services India** (Transformco), Pune | Technical Specialist → Architect. Emp. ID SHI00003888 | **15 Feb 2018** | **27 Sep 2021** |
| **Cognizant Technology Solutions**, Pune | Senior Associate – Projects | **29 Nov 2010** | **13 Feb 2018** |
| **Mahindra Satyam**, Hyderabad / Bangalore | Software Developer – S2 | **7 Jan 2008** | **23 Nov 2010** |

**Still Grade C3B after five years** — hired into it Sep 2021, still C3B on the
Sep 2025 letter. Never a resume line; it is the evidence that the ceiling is
structural. → `notes/Goals/Career/job-options.md`

## Client engagements

| Client | Domain | Via | Period | Work |
| --- | --- | --- | --- | --- |
| **Lloyds Banking Group**, UK | Banking | TCS | **Sep 2021 – present** | **Three eras** — Push to Wallet / Click to Pay / Card Controls (to 2024), Card & Wallet **GCP journey modernisation** (2024 – Jul 2025), then the **GCP Operational Data Platform** (Jul 2025 – present) |
| **Sears Holdings**, US | Retail | Sears India | 2018 – 2021 | Targeted Interactions / TI Mart |
| **Saudi Telecom**, SAU | Telecom | Cognizant | Feb 2015 – Feb 2018 | STC EDW CLDM7/CLDM12, onsite IT delivery lead |
| **Barclays**, UK | Banking | Cognizant | Nov 2010 – Feb 2015 | Emerging Markets DW, One Africa Program |
| **Telstra**, AU | Telecom | Mahindra Satyam | 2008 – 2010 | TR2.1 / TR2.2 EDW Data-In |

**Cisco** (EDW2B, Jul 2009 – Nov 2010, via Satyam) is real and appears in his
2022 resume, but is **OFF every document** at his request — he no longer recalls
the work, and a line he cannot discuss is an interview liability. Keep it here as
history; never put it back.

**The Lloyds engagement began Sep 2021, with his TCS joining date** — he confirmed
this 2026-09-03. The earlier "2022" here was wrong. Note the profile's own
coverage caveat: his oldest *Confluence* page is May 2023, because 2021–early
2023 was documented on a legacy pre-cloud LBG wiki he can no longer reach. The
engagement is five years; the *written evidence* covers the last three.

### Lloyds — the three eras, and what each is good for

| Era | Period | Programme | The line that earns its place |
| --- | --- | --- | --- |
| **1. Wallet & Click to Pay** | to 2024 | AL08169 (Card Controls / Debit Freeze) | Five Push-to-Wallet MVDs across GooglePay and ApplePay, four brands; scheme + Google OPC token generation, PGP with Google, HSM-backed keys in HashiCorp Vault. The **award-winning card-freeze fraud journey** sits here |
| **2. GCP journey modernisation** | 2024 – Jul 2025 | AL16776 (Card Platform on GCP), AL16992/CPR703 (PTW) | A **three-tranche** migration of the whole card-journey estate to GCP microservices behind **Apigee X** — with an approved ID & Auth onboarding pattern (10-criteria analysis) and shared VISA/Fiserv connectivity services reused across feature teams |
| **3. GCP data platform** | Jul 2025 – present | AL22853 (ODP / IMI SMS / Tealium / GCP 2.0), GOADCF | Microbatch Ingestion Service on **GKE**, Batch Transformation Service on **dbt**, Pub/Sub Event Streaming Framework; five ODP data contracts; the **ADR-001…013** Digital Behaviour FDP baseline; CNE 1.0 → Google 2.0/IDP parallel-run migration against a **Q3-2026 GDW-exit date** |

**Confluent Kafka and IBM Tivoli Workload Scheduler are real** — he confirmed
2026-09-03 — but appear **nowhere** in the 150-page Confluence evidence base,
which documents Pub/Sub and Cloud Composer instead. They stay on the documents.
Anyone probing them will find no paper trail, so he should expect to describe
that work from memory rather than from an artefact.

## Quantified achievements — the scarce ones, use them

| Claim | Where |
| --- | --- |
| **$600,000/year** operating cost removed — Email Preference Center API on GCP (App Engine, Pub/Sub, DataFlow, BigQuery), millions of customers | Sears |
| **Banking Tech Awards 2024** — self-serve fraud journey | Lloyds |
| **Card & Payments Awards 2025** — self-serve fraud journey | Lloyds |
| **Exact Adobe Analytics dashboard parity** — ADR-007 replaced a custom 4-tier COALESCE visitor key and cookie-anchored sessionization with Adobe-native canonical keys, *removing* window-function sessionization compute and keeping legacy keys as `resolved_*` columns for reconciliation | Lloyds, 2026 |
| **Q3-2026 Group Data Warehouse exit** — the date the whole ODP/FDP programme is architected to protect; his CNE 1.0 vs Google 2.0/IDP recommendation (KDD13) is what keeps it | Lloyds |
| **Three-tranche GCP migration** of the entire card-journey estate — controls, limits, freeze, wallet provisioning, view card/PIN — behind Apigee X | Lloyds |
| Teradata → BigQuery data lake migration | Sears |
| Five stacks replaced with cloud-native: Teradata→BigQuery, Unix→Compute Engine, Control-M→Airflow, shell/ETL→Python, GitLab Enterprise→Cloud Source Repositories | Sears |

### Numbers still missing — and where they are NOT

Six figures have been open since Aug 2026:

`[N]` Kafka throughput (events/day or /sec) · `[N]` pipeline or DAG count ·
`[N]` dbt model count · `[N]` BigQuery cost reduction (% or currency) ·
`[N]` deployment-time before/after · `[N]` environments Terraform provisions

**2026-09-03: they are not recoverable from Confluence.** His own method note
(section 10 of the 5-year profile) is explicit — across all 150 pages the only
figures are a **3–5% autofill purchase-volume uplift** and a **$100 average
online order**, and both are *business-case assumptions he authored*, not
measured outcomes. Stop looking there. They have to come from his recollection,
a Jira or Looker export, or a colleague.

**Never write the 3–5% as a delivered result.** "Built the business case for a
3–5% purchase-volume uplift" is honest and still strong. "Delivered a 3–5%
uplift" is not true.

Meanwhile the platform section no longer *needs* a number to land: ADR-007's
dashboard parity, the Q3-2026 GDW-exit date, the three-tranche migration and the
ADR-001…013 baseline are all concrete, checkable and free of placeholders.

## Education & certifications

- **BE, Computer Science and Engineering** — Walchand College of Engineering,
  Sangli (Shivaji University), 2003–2007
- **Google Cloud Certified — Professional Data Engineer** *(he confirmed this
  2026-08-29; the certificate is not filed in Dropbox, which is why earlier
  drafts omitted it. Do not re-raise it as doubtful. **Check the expiry** — PDE
  runs two years from issue.)*
- Google Cloud Professional Cloud Architect — in progress, no exam date
- *Data Engineering, Big Data and ML on GCP* — Coursera specialisation
- Teradata Basics V2R5 · Teradata SQL V2R5 · Introduction to Oracle9i: SQL

## Open source — the AI evidence

Inventory is generated: `bin/portfolio` → `notes/Goals/Career/portfolio.md`.
The four that carry the story:

| Repo | Stack | Substance |
| --- | --- | --- |
| **hoocode** | TypeScript | Deterministic terminal coding agent, **published to npm** (`@kolisachint/hoocode-agent`). Four packages: CLI, agent runtime with tool calling, **unified LLM API across 25+ providers**, differential-rendering TUI. Permission gate per edit/command, four modes, MCP, subagents. **Extends a fork of MIT-licensed `pi-mono`** — always say "extended a fork", never "built from scratch". |
| **embeddingsearchtools** | Rust | MiniLM via **ONNX Runtime**, int8 weights bundled in-binary. Exact + **HNSW ANN written from scratch**. **BM25 fusion for hybrid retrieval.** mmap store, library API, CLI, daemon. |
| **voicetools** | Rust | Offline ASR — mic → VAD → **Parakeet-TDT on ONNX Runtime**, 25 languages, whisper.cpp fallback. |
| **webtools** | Rust | Token-efficient agent fetch/search; reference-style URL preservation → single-token markers under a token budget. |

**He does inference and retrieval, not model training.** Keep **MLOps** and
**model training** off every document — they invite a screen on work he has not
done. Everything else (LLM agents, MCP, ANN, HNSW, hybrid retrieval, RAG, ONNX,
ASR) is backed by a repo and can run at full strength.

---

## Who consumes this file

Change a fact above and these all need regenerating or editing:

| Consumer | Kind | How to update |
| --- | --- | --- |
| `notes/Goals/Career/Sachin_Koli_Resume.html` → `.pdf` | Rendered | Edit HTML, `bin/pub … --repo --pdf`, then `bin/pdfcheck` |
| `notes/Goals/Career/Sachin_Koli_OnePager.html` → `.pdf` | Rendered | Same |
| `notes/Goals/Career/Sachin_Koli_Profile_Card.html` → `.pdf`/`.png` | Rendered, **landscape** | Same. Export the PNG too — that is the LinkedIn Featured asset |
| `notes/Goals/Career/Sachin_Koli_Resume.docx` | Generated **from `Sachin_Koli_Resume.html`**, his review copy | `bin/docx resume` — no separate content to edit |
| `notes/Goals/Career/Sachin_Koli_OnePager.docx` | Generated from the same HTML as the PDF | `bin/docx onepager` |
| `notes/Goals/Career/Sachin_Koli_Profile_Card.docx` | Generated from the same HTML, landscape | `bin/docx card` |
| `notes/Goals/Career/Sachin_Koli_LinkedIn.html` → `.docx` | **Paste sheet**, not a document to send | Edit the HTML, `bin/docx linkedin` |
| `notes/Goals/Career/Sachin_Koli_Public_Bio.html` → `.docx` | **Paste sheet**, not a document to send | Edit the HTML, `bin/docx bio` |
| `notes/Goals/Career/Sachin_Koli_Resume_ATS.html` → `.docx` | Generated; the `.docx` **is** the deliverable, there is no ATS PDF | Edit the HTML, `bin/docx ats` |
| `notes/Goals/Career/resumes/resume-recruiter.md` | Master | Hand-edit |
| `notes/Goals/Career/resumes/resume-linkedin.md` | Master | Hand-edit |
| `notes/Goals/Career/resumes/resume-public.md` | Master | Hand-edit |
| `notes/Goals/Career/resumes/resume-ats.md` | Master | Hand-edit, then rebuild the `.docx` |
| `notes/Goals/Career/resumes/resume-referral-onepager.md` | Master | Hand-edit |
| `notes/Goals/Identity/profile.md` | Repo memory | Hand-edit |

**Fifteen consumers.** That is why this file exists — and why `/resume` runs the
whole sweep rather than trusting anyone to remember them all. (The count read
"twelve" while the table already listed thirteen; it is counted now.) Every
`.docx` is rendered from the very same `.html` as its PDF or paste sheet, so
`bin/docx` is one command at the end of the sweep and there is no second copy of
any sentence to keep in step.

**Every `.docx` is rendered from HTML — the ATS file too, since 2026-08-30.**
Nothing in this set is hand-built in JavaScript any more.

**Two of them are paste sheets, not documents.** `Sachin_Koli_LinkedIn` and
`Sachin_Koli_Public_Bio` exist so he can review and correct the wording in Word;
the words then go into fields on a website. Nobody sends the file, so their page
count is not compared.

**The `.docx` files are review copies, never sources.** He opens them in Word to
correct a line. Those edits do not flow back on their own — run
`bin/docx --diff <file>` to see exactly what he changed, fold it into *this* file
and the master, then rebuild. Anything else silently forks the facts.
