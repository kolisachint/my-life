# LinkedIn profile — no client names

> **Version 2 of 5 — for the public web.** Every client is anonymised. Copy each
> block straight into the matching LinkedIn field.

---

## Headline
*(220 characters — the highest-leverage field on the profile)*

```
Solution Architect — Cloud Data & AI Platforms | GCP Certified Professional Data Engineer | Kafka, BigQuery, dbt, Airflow, Terraform | Award-winning fraud journeys (Banking Tech 2024, Card & Payments 2025)
```

**Why this order.** "Data & AI" first because both halves are now earned; **the
certification second because it is a searchable, verifiable credential** and
recruiters filter on it explicitly; the named stack third because those are the
exact tokens they search; the awards last because they are proof, and proof works
best after a claim.

*(197 characters — under the 220 limit. "18 yrs enterprise data" came out to make
room for the certification, which is the better signal: the years are visible
from your dates anyway.)*

## Location / Open to

`Pune, Maharashtra, India` — set **Open to work**, recruiters only. Titles:
*Solution Architect · Data Architect · Cloud Architect · Principal Data Engineer
· Platform Architect*. Locations: *Pune · Bengaluru · Hyderabad · Remote (India)*.

---

## About

```
I build the data platforms large enterprises run on, and I ship the applied-AI
tooling that sits on top of them. Google Cloud Certified Professional Data
Engineer.

Right now I architect the batch and real-time streaming platform for a UK tier-1
retail bank: event-driven ingestion on Confluent Kafka, orchestration across
Cloud Composer and a legacy enterprise scheduler, modelling in BigQuery and dbt,
all of it provisioned through Terraform and CI/CD. The interesting part is not
any single tool — it is making a modern cloud stack and a twenty-year-old
on-premise estate agree with each other, reliably, every night.

Before the data platform I spent four years on digital cards at the same bank,
moving Add-to-Wallet, card controls and View-PIN from on-premise onto Google
Cloud. The self-serve fraud journey I architected won at the Banking Tech Awards
2024 and the Card & Payments Awards 2025 — it took fraud reporting out of the
call-centre queue and gave it to the customer.

Earlier: twelve years of enterprise data across retail, telecom and banking. A
Teradata-to-BigQuery lake migration. A customer preference API on GCP serving
millions of people that took $600,000 a year out of running cost. Warehouses
unifying a global bank's data across several African markets.

I also ship applied AI in the open. hoocode is a deterministic terminal coding
agent I publish to npm — a permission gate on every edit, four scoped modes, and
a unified API across 25+ LLM providers. Underneath it sits Rust I wrote: an
embedding search engine with ONNX inference, an HNSW index built from scratch and
BM25 fusion for hybrid retrieval; offline speech-to-text; token-efficient web
retrieval for agents. The platforms I design are exactly the substrate retrieval
and ML workloads need, and I would rather build that layer than hand it over.

Open to Solution Architect, Data Architect and Cloud Architect roles — especially
where the data platform is the product.
```

---

## Experience entries

### Tata Consultancy Services
**Solution Architect** · Sep 2021 – Present · Pune, India

```
Data platform and digital cards architecture for a UK tier-1 retail bank.

Data Platform & Real-Time Analytics (Jul 2025 – present)
• Architected end-to-end batch and real-time streaming data platform on Google
  Cloud supporting analytics, operational reporting and ML workloads.
• Engineered high-availability event-driven ingestion on Confluent Kafka with
  Python for low-latency data delivery.
• Architected hybrid batch orchestration across Cloud Composer (Apache Airflow)
  and a legacy enterprise scheduler, managing dependency graphs spanning
  on-premise and cloud.
• Designed BigQuery warehouse schemas and modular dbt transformation pipelines
  with enforced data quality and lineage.
• Standardised infrastructure with Terraform — Composer environments, BigQuery
  datasets, Kafka connectors, IAM — integrated into CI/CD to cut configuration
  drift and deployment time.
• Implemented BigQuery cost and governance optimisation, reducing compute
  overhead while improving query performance.

Digital Cards Modernisation (2022 – Jul 2025)
• Led end-to-end modernisation of digital card features — Add to Wallet, card
  controls, View PIN/Card — migrating from on-premise to Google Cloud.
• Architected secure, scalable microservices and cross-cloud API patterns meeting
  banking compliance and performance requirements.
• Architected a self-serve fraud journey recognised at the Banking Tech Awards
  2024 and the Card & Payments Awards 2025.

Kafka · BigQuery · dbt · Airflow · Terraform · GCP · microservices · payments
```

### Sears IT and Management Services India
**Architect** (joined as Technical Specialist) · Feb 2018 – Sep 2021 · Pune

```
Cloud data platform and marketing technology for a US Fortune-500 retailer.

• Built a customer email preference API on GCP App Engine, Pub/Sub, DataFlow and
  BigQuery serving millions of customers — reduced annual cost by $600,000.
• Migrated enterprise DataMarts from Teradata to BigQuery on schedule.
• Built an API management layer decoupling applications from cloud complexity
  across a multicloud estate — reused as the blueprint by other teams.
• Replaced self-hosted tooling with cloud-native across five stacks: Teradata to
  BigQuery, Unix to Compute Engine, Control-M to Airflow, shell to Python,
  GitLab Enterprise to Cloud Source Repositories.
• Led enterprise marketing-platform migration from IBM Unica to Adobe Campaign,
  coordinating external vendors and internal engineering.
```

### Cognizant Technology Solutions
**Senior Associate – Projects** · Nov 2010 – Feb 2018 · Pune

```
Enterprise data warehousing for a Gulf national telecom operator (onsite
delivery lead, 2015–2018) and a global bank's emerging markets (2010–2015).

• Led data modelling for a national telecom enterprise data warehouse spanning
  customers, accounts, subscriptions, offers and products.
• Built an automation tool propagating schema changes through every Teradata
  utility script and Ab-Initio object automatically, removing a large manual
  change surface.
• Ran a big-data POC on Apache Hive and HDFS for call-detail-record ingestion.
• Unified banking data across multiple African countries into a single source of
  truth, letting one DataMart span new countries without rework.
• Designed logical and physical data models; built reusable code-generation,
  deployment and scheduling automation for the team.
```

### Mahindra Satyam
**Software Developer – S2** · Jan 2008 – Nov 2010 · Hyderabad / Bangalore

```
ETL and data warehousing for an Australian telecom operator.

• Developed DataStage jobs, Teradata utility scripts and Perl/Unix tooling for a
  retail customer warehouse handling registrations, demographics, segmentation
  and billed and unbilled call records.
• Built Informatica mappings and workflows migrating Oracle data to Teradata.
```

---

## Projects
*(a real LinkedIn section — use it, this is your AI evidence)*

**hoocode** — `github.com/kolisachint/hoocode`
```
Deterministic terminal coding agent, published to npm. A permission gate on every
edit and shell command, four scoped modes, MCP servers and subagents. Four
packages including a unified LLM API across 25+ providers and a TUI library with
differential rendering. TypeScript.
```

**embeddingsearchtools** — `github.com/kolisachint/embeddingsearchtools`
```
Embedding search engine in Rust. MiniLM via ONNX Runtime with int8 weights
bundled into the binary; exact and HNSW approximate-nearest-neighbour indexes
written from scratch; BM25 lexical fusion for hybrid retrieval; library API, CLI
and long-lived daemon.
```

**voicetools** — `github.com/kolisachint/voicetools`
```
Offline speech-to-text for the terminal, in Rust. Microphone capture through
voice-activity detection into Parakeet-TDT on ONNX Runtime, 25 languages, with a
whisper.cpp fallback.
```

**webtools** — `github.com/kolisachint/webtools`
```
Token-efficient web fetch and search for LLM agents, in Rust. Reference-style URL
preservation collapses links to single-token markers under a total token budget.
```

> **Fill the Projects section — this is your differentiator.** Almost no services
> architect has shipped an npm package, ONNX inference in Rust, or an ANN index.
> Add the repo links, and pin the same four as Featured.

---

## Skills
*(order matters — LinkedIn shows the top three and endorsements follow it)*

```
1. Data Architecture          6. Apache Airflow        11. Rust
2. Google Cloud Platform      7. dbt                   12. Solution Architecture
3. Apache Kafka               8. Terraform             13. Data Engineering
4. BigQuery                   9. Python                14. Vector Databases
5. Real-Time Data Streaming  10. Large Language Models 15. Retrieval-Augmented Generation
```

## Education

Walchand College of Engineering, Sangli — **BE, Computer Science and
Engineering**, 2003–2007

## Licenses & certifications

- **Professional Data Engineer — Google Cloud** *(add the credential ID and the
  Credly badge link; LinkedIn renders verified badges and recruiters filter on
  them)*
- *Data Engineering, Big Data and Machine Learning on GCP* — Coursera
- Teradata Basics V2R5 · Teradata SQL V2R5 — Teradata
- Introduction to Oracle9i: SQL — Oracle

## Honors & awards

- **Banking Tech Awards 2024** — award-winning self-serve fraud journey
- **Card & Payments Awards 2025** — award-winning self-serve fraud journey

---

## The client-name rule, and why it costs you nothing

Lloyds, Sears, Saudi Telecom, Barclays and Telstra all reached you under a
services contract. Naming them on a public profile is a live contractual and
reputational risk — and the kind of thing a compliance team at your *next*
employer notices too.

The descriptors read identically to anyone hiring: "UK tier-1 retail bank",
"US Fortune-500 retailer", "Gulf national telecom operator". **The scale is what
signals; the logo is what creates risk.** Name them in `resume-recruiter.md`,
which goes to one addressed person at a time.

## Three things to do while you are in there

1. **Fill the Projects section and pin the repos as Featured.** The work exists;
   the profile does not show it. That is the single biggest gap on the page.
2. **Post about the fraud journey.** Two industry awards sitting silently in the
   Honors section do almost nothing. One short post about what actually changed
   for customers will out-reach everything else on the profile.
3. **Replace the profile photo.** The card photo is a passport-style crop. A
   plain headshot on a clean background is twenty minutes for a real return.
