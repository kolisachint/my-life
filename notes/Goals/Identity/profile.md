# Profile — Sachin Tatyaso Koli

_Established 2026-08-27 from the TCS CTC letter, July 2026 payslip, Dropbox
Digital_Drive, and a handwritten budget plan._

_**Policy change 2026-08-28:** the repo is verified private and stays that way,
so identifiers (PAN, UAN, bank and loan account numbers) and source documents
**may** now be recorded here. They are simply not transcribed **yet** — the
earlier sessions deliberately left them out. Next time a document is open, copy
the numbers in rather than pointing at Dropbox. Live credentials remain the one
exception. See AGENTS.md._

## Personal

- **Sachin Tatyaso Koli**, born **24 Apr 1986** → age **40**.
- Married to **Dipali**. Children **Srishti** and **Samarth**. Father **Tatyaso**.
- D303, Anjani Gaatha, Dehu Alandi Road, Chikhali, Pune **411062**.
- Tel **+91 95522 36200** · **kolisachint@gmail.com** · work
  **koli.sachin1@tcs.com**
- LinkedIn `in/kolisachint` · site `kolisachint.github.io`

## Direction — DATA & AI (settled 2026-08-29, both halves earned)

**He chose the heading himself and both halves hold up.** Payments is a *domain
credential*, not his identity.

- **Data** — the Jul 2025– Lloyds platform: Kafka, Composer, dbt, BigQuery,
  Terraform. Current and marketable.
- **AI** — **shipped, public, and substantial.** See below.

### Correction: the AI work was never unpublished

Twice on 2026-08-29 I recorded that AI was "a direction, not experience" and that
his AI material was unpublished. **Both statements were wrong**; he pointed me at
the repositories. **Never repeat that framing.**

`github.com/kolisachint` — around 25 public repos. The four that matter:

| Repo | Stack | What it is |
| --- | --- | --- |
| **hoocode** | TypeScript | Deterministic terminal coding agent, **published to npm** (`@kolisachint/hoocode-agent`). Four packages: CLI, agent runtime with tool calling, **unified LLM API across 25+ providers**, differential-rendering TUI. Permission gate per edit/command, four modes, MCP, subagents. 1,203 commits since May 2026, ~473 his. **A fork of MIT-licensed `pi-mono`** — say "extended a fork", never "built from scratch". |
| **embeddingsearchtools** | Rust | Embedding search engine. MiniLM via **ONNX Runtime**, int8 weights bundled in the binary. Exact + **HNSW ANN written from scratch** (>0.9 recall @k=10). **BM25 fusion for hybrid retrieval.** mmap store, library API, CLI, daemon. *His most impressive single artefact.* |
| **voicetools** | Rust | Offline ASR. Mic → VAD → **Parakeet-TDT on ONNX Runtime**, 25 languages, whisper.cpp fallback. Found and documented a real bug: multi-threaded int8 ONNX is non-deterministic and garbles greedy decode. |
| **webtools** | Rust | Token-efficient fetch/search for LLM agents. Reference-style URL preservation → single-token markers under a token budget. |

**This is more hands-on LLM and retrieval engineering than most people holding an
"AI Engineer" title.** Check these repos before ever suggesting he lacks evidence.

**Still true:** he does *inference and retrieval*, not model training. Keep
"MLOps" and "model training" off his documents.

## Career — he is a DATA architect, not a generic Solution Architect

_Verified 2026-08-29 against the offer, appointment and experience letters in
`/Cloud Documents/Sachin/Career/`. Supersedes the earlier approximate dates._

| Organisation | Role | Period |
| --- | --- | --- |
| **TCS**, Pune | Associate Consultant, Grade **C3B** (role: Solution Architect). Associate no. 2051164 | **29 Sep 2021** → present |
| Sears IT & Management Services India (Transformco), Pune | Technical Specialist → **Architect**. Emp. ID SHI00003888 | **15 Feb 2018 – 27 Sep 2021** |
| Cognizant, Pune | Senior Associate – Projects | **29 Nov 2010 – 13 Feb 2018** |
| Mahindra Satyam, Hyderabad / Bangalore | Software Developer – S2 | **7 Jan 2008 – 23 Nov 2010** |

**18 years 8 months** (Aug 2026), all in data platforms / BI / analytics, the
last four in **cards and payments**.

**Still Grade C3B after five years.** Hired into C3B in Sep 2021; the Sep 2025
appraisal letter still references `CC-C3B`. No grade movement in four years —
the strongest evidence yet that the ceiling is structural, not performance.

**Outside offers on file:** Wipro (Jan 2015), UST Global (Dec 2018), Datametica
(Sep 2021 — he took TCS instead). He is not untested in the market.

**Education:** BE Computer Science & Engineering, **Walchand College of
Engineering, Sangli** (Shivaji University, 2003–2007).

**Depth:** GCP — BigQuery, DataFlow, Pub/Sub, Composer, App Engine, Cloud
Functions, DataProc, Memorystore, Cloud Storage. Apache Beam / Airflow / Spark.
Teradata, Oracle, Greenplum. Python, SQL, Unix. Tableau, Data Studio.
Domains: **Banking (Barclays), Telecom (Telstra, Saudi Telecom), Retail (Sears)**.
Marketing stack: Adobe Campaign, IBM Unica.

**Strongest resume line:** built an Email Preference Center API on GCP (App Engine
+ Pub/Sub + DataFlow + BigQuery) serving millions of customers — **reduced annual
cost by $600K**. Also led a Teradata → BigQuery migration and replaced self-hosted
tooling with cloud-native across five stacks.

**Six client engagements**, as distinct from employers — Telstra AU (2008–09,
TR2.1/2.2 EDW Data-In), Cisco US (2009–10, EDW2B), Barclays UK (2010–15,
Emerging Markets DW / One Africa), Saudi Telecom (2015–18, STC EDW CLDM7/12,
onsite delivery lead), Sears US (2018–21, Targeted Interactions / TI Mart),
**Lloyds Banking Group UK (2022–present)**. Cisco and Telstra were missing from
every earlier note.

**Cisco is kept here as history but is OFF every resume** (his call, 2026-08-29 —
he no longer remembers the work, and a line he cannot discuss is a liability in
an interview). This file is the archive; `resumes/` is what gets sent. **Five
clients on the resumes:** Lloyds, Sears, Saudi Telecom, Barclays, Telstra.

**Lloyds is TWO workstreams, not one** (he confirmed 2026-08-29):

| | |
| --- | --- |
| **2022 – Jul 2025** | Digital Cards modernisation on GCP — the award-winning work |
| **Jul 2025 – present** | **Data Platform & real-time analytics** — Confluent Kafka, Cloud Composer/Airflow, IBM Tivoli Workload Scheduler, BigQuery, dbt, Terraform, CI/CD |

The July 2025 profile card describes only the first. **It is already stale** on
his most current and most marketable work.
→ `notes/Goals/Career/tcs-profile-2025.md` · `notes/Goals/Career/resumes/`

**Recognition:** the self-serve fraud journey he architected at LBG won at the
**Banking Tech Awards 2024** and the **Card & Payments Awards 2025**. Two dated,
external, third-party awards — the scarcest asset on a services CV.

**Certifications:** **Google Cloud Certified — Professional Data Engineer**
(confirmed by him 2026-08-29). GCP PCA in progress, still no exam date. Plus the
Coursera specialisation *Data Engineering, Big Data and ML on GCP*, and Teradata
Basics + SQL V2R5, Oracle 9i SQL — those three are old.

**Decision I is closed: he holds the PDE.** The 2026-08-29 Dropbox search found
no certificate on file and his 2022 resume listed only the Coursera course, so
the evidence pointed the other way — he corrected it. **The document is simply
not filed.** Two follow-ups: get the credential ID and Credly link onto LinkedIn,
and file the certificate in Dropbox. Also confirm the expiry — PDE runs two years
from issue.

**Do not re-raise this as doubtful.** The absence of a file was the reason for
the earlier caution; he has answered it.

### Resume problems — half fixed as of the July 2025 profile card

The market resume `Digital_Drive/Sachin/Job_Resume/Sachin_Koli_Resume.docx` was
last modified **14 Feb 2022**. The **TCS profile card of July 2025** is a
different document — client-facing, TCS-branded, organised by engagement — and it
fixes the factual defects without being sendable to a recruiter.

| # | Defect (14 Feb 2022 resume) | Status |
| - | --- | --- |
| 1 | **Omits TCS entirely** | **Fixed** on the card |
| 2 | Shows Sears as "Till Date" | **Fixed** — closed at 2021 |
| 3 | Says "14 years"; it is ~18.5 | **Fixed** — card says 18 |
| 4 | **No AI/ML/GenAI content** despite him building embedding search | **Stands** |
| 5 | Leads with 20-year-old certifications | **Stands** |
| 6 | *(new)* Card names **clients, not employers** — no continuous history | Card only |
| 7 | *(new)* Only **one quantified** achievement ($600K) in the whole document | Both |

**So the instrument is half built.** Current material exists; it has not been
assembled into a document he can send to a hiring manager.

## Compensation (TCS, FY 2026–27)

| Component | ₹/year |
| --- | ---: |
| Basic | 6,40,800 |
| Personal Allowance | 5,99,592 |
| City Allowance | 44,400 |
| HRA / Conveyance | 14,93,388 |
| **Fixed salary (A)** | **27,78,180** |
| Provident Fund (employer) | 76,896 |
| Performance Pay | 3,40,800 |
| Performance Bonus | 4,72,800 |
| **Variable (C)** | **8,13,600** |
| Health insurance | 30,655 |
| **CTC excluding gratuity** | **36,99,331** |

**Note: ₹8.14 L — 22% of CTC — is variable and not guaranteed.** Fixed is ₹27.78 L.

**Tax regime: NEW.** Projected annual tax ₹5,08,951 on net taxable ₹30,31,252,
with ₹89,706 of Chapter VIA relief via 80CCD(2). His Todoist tax goal still says
"opt for old regime" — **that advice is now stale and probably wrong for him.**
Worth one CA conversation, not a rewrite by me.

### Real monthly cash

| | ₹ |
| --- | ---: |
| July 2026 net (included ₹81,558 bonus) | 2,34,061 |
| **Normal month net** | **~1,74,000** |
| Food + communication cards | 8,001 |
| **Effective monthly resources** | **~1,82,000** |

## Assets and liabilities

- **D303 Anjani Gaatha, Chikhali** — joint with Dipali. Title deed and completion
  certificate on file; PCMC property tax paid since 2016–17.
- **Lakeshore Flat** — second property, **HDFC home loan**, ACH mandate registered
  June 2022, at least three disbursement tranches (so bought under construction),
  completion certificate 2023, property tax paid 2023–24. **EMI amount unknown —
  this is the biggest remaining gap.**
- **EPF balance ₹28,13,625** · **Gratuity accrued ₹3,43,158** (July 2026).
- Car (documents on file). Ancestral land via Dipali, matter in court.
- Money lent out: ₹2,00,000 outstanding, ₹2,10,000 written off.

## Already-automatic saving

Before he does anything at all:

| | ₹/month |
| --- | ---: |
| Employee PF | 6,408 |
| **Voluntary PF** | **14,952** |
| NPS | 7,384 |
| Employer PF | 6,408 |
| **Total** | **35,152** (₹4.22 L/yr) |

## His own budget plan (handwritten)

| Expenses — ₹80k | ₹ | | Investments — ₹1L | ₹ |
| --- | ---: | --- | --- | ---: |
| To parents (NEFT) | 10,000 | | Gold | 20,000 |
| Leisure | 20,000 | | Real Estate (NACH) | 30,000 |
| Monthly expense | 30,000 | | Stock Market / MF (NACH) | 30,000 |
| Education (NEFT) | 20,000 | | Provident Fund (EPF) | 20,000 |

**Total ₹1.8 lakh — which matches his actual take-home almost exactly.** This is a
well-constructed, income-calibrated plan. The "PF 20k" line is already happening
(PF + VPF = ₹21,360). "Real Estate 30k" is almost certainly the Lakeshore EMI.

## Dropbox layout

`Digital_Drive/` → `Sachin`, `Dipali`, `Srishti`, `Samarth`, `Tatyaso`,
`Sachin_And_Dipali`. Under `Sachin/`: Financial (Payslips, Income_Tax with Form 16
back to 2010, Property), Job_Resume, Job_Experience, Job_Compensation_Letters,
Academics, Personal_Documents, Health. Joint property docs live under
`Sachin_And_Dipali/Financial/Property`.

Filing discipline is genuinely good — ITRs and Form 16s unbroken since 2010.
