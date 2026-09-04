# Sachin Koli

**Solution Architect — Cloud Data & AI Platforms**
**Google Cloud Certified Professional Data Engineer**
Pune, India · +91 95522 36200 · kolisachint@gmail.com
linkedin.com/in/kolisachint · github.com/kolisachint · kolisachint.github.io

> **Version 1 of 5 — the workhorse.** Full client detail. Send to named
> recruiters and hiring managers. Do not post publicly.
> **No `[N]` placeholders remain.** The six platform figures were confirmed
> unrecoverable from Confluence on 2026-09-03, so every bullet is written to land
> without one — see `data/career-facts.md`.

---

## Summary

**Google Cloud Certified Professional Data Engineer** with **18 years** building
enterprise data platforms, now architecting **real-time streaming and batch data
infrastructure on Google Cloud** for a UK tier-1 retail bank — Confluent Kafka, Cloud Composer, dbt,
BigQuery and Terraform, spanning legacy on-premise and cloud environments.

**Five years** at that bank across three platforms: digital wallets and Click to
Pay, then the migration of its whole card-journey estate to GCP microservices
behind Apigee X, now the data platform. The self-serve fraud journey I designed
won at the **Banking Tech Awards 2024** and the **Card & Payments Awards 2025**.

Across twelve prior years in retail, telecom and banking data: a **Teradata →
BigQuery** lake migration, and a customer preference API on GCP that **cut
$600,000 a year** in operating cost.

Alongside all of it I **ship applied-AI tooling in the open** — a terminal coding
agent published to npm, and the Rust beneath it: ONNX inference, an ANN index
written from scratch, hybrid dense/lexical retrieval. I work the full arc, from
platform selection through build to the stakeholder conversation that gets it
funded.

---

## Experience

### Tata Consultancy Services — Pune
**Solution Architect** (Associate Consultant, Grade C3B)
*September 2021 – present*
**Client: Lloyds Banking Group, UK — five years, Everyday Banking Platform**
*(Title on record at the client: Solution Architect E)*

#### GCP Data Platform & Real-Time Analytics — *July 2025 – present*

- Architecting the bank's move off its **Group Data Warehouse** onto a GCP-native
  operational data platform against a **Q3-2026 decommissioning date** — authoring
  the shared **Microbatch Ingestion Service** (GKE, Cloud Storage landing zones,
  **BigQuery**, **Cloud Composer**, Jenkins CI) that every source system onboards
  through, with formal **data contracts** for five of them.
- Engineered high-availability, event-driven ingestion on **Confluent Kafka** and
  **Pub/Sub** with Python, and hybrid batch orchestration spanning **Airflow** and
  **IBM Tivoli Workload Scheduler** — bridging the legacy on-premise estate to
  cloud rather than stopping at one or the other. *(Bridging TWS and Airflow rather
  than replacing one with the other is the hard part, and the part most candidates
  have never done.)*
- Designed BigQuery schemas and modular **dbt** transformation pipelines with
  delta-load audit tables, enforced data quality and end-to-end lineage; automated
  testing and monitoring so downstream analytics fail loudly rather than silently.
- Authored the **full architecture-decision baseline (ADR-001–013)** for the bank's
  digital-behaviour data products — nested STRUCT/ARRAY modelling, partition and
  cluster strategy per entity, and an identifier strategy that **achieved exact
  parity with the Adobe Analytics dashboards** while removing the window-function
  sessionization compute the previous design depended on.
- Standardised provisioning with **Terraform** and designed the platform's FinOps
  controls; co-owned the **migration recommendation** — ship the MVP on the current
  GCP foundation (CNE 1.0) to protect the warehouse-exit date, with a pre-planned
  parallel run onto the strategic one (Google 2.0 / IDP) and explicit cutover,
  rollback and DR criteria.

#### Card Platform Modernisation on GCP — *2024 – July 2025*

- Owned the solution design migrating the **entire card-journey estate** —
  controls, limits, freeze, wallet provisioning, view card and PIN — from
  on-premise to **GCP microservices behind Apigee X**, sequenced as a
  **three-tranche** release plan.
- Won approval for the **ID & Auth onboarding pattern** now used across the estate,
  from a ten-criteria options analysis covering token exchange,
  proof-of-possession, scaling and traceability.
- Designed **shared scheme-connectivity microservices** for VISA and Fiserv, reused
  across feature teams on a common certificate-management pattern — every design
  carried through the bank's architecture, security-assurance and API governance
  forums.

#### Digital Wallets, Click to Pay & Card Controls — *2021 – 2024*

- **Award-winning self-serve fraud journey** — **Banking Tech Awards 2024** and
  **Card & Payments Awards 2025**. Moved card freeze from an assisted call-centre
  process to one the customer completes.
- Authored the solution designs putting the bank's four card brands into
  **Apple Pay, Google Pay and VISA Click to Pay**, including the push-provisioning
  extension that made wallet-added cards usable for **online** checkout rather than
  offline only.
- Designed the payment-token security to PCI standards — scheme and wallet
  **token generation**, PGP key exchange with the wallet provider, HSM-backed keys
  on **HashiCorp Vault** — plus the lineage, quality and monitoring governance for
  the wallet data flows.

### Sears IT and Management Services India (Transformco) — Pune
**Technical Specialist → Architect**
*15 February 2018 – 27 September 2021*
**Client: Sears Holdings Corporation, US — Targeted Interactions / TI Mart**

- Built the **Email Preference Center API** on **GCP App Engine, Pub/Sub,
  DataFlow and BigQuery**, serving millions of customers. **Reduced annual cost
  by $600,000.**
- **Migrated DataMarts from Teradata to BigQuery**, on schedule and without
  significant incident.
- Built an **API management layer** decoupling applications from cloud
  complexity across a multicloud estate — reused as the blueprint by other teams.
- Replaced self-hosted tooling with cloud-native across five stacks: Teradata →
  BigQuery · Unix → Compute Engine · Control-M → **Airflow** · shell/ETL →
  Python · GitLab Enterprise → Cloud Source Repositories.
- Designed shared datamarts (**CDW, NSegment, Campaign**) in BigQuery.
- Led enterprise migration from **IBM Unica to Adobe Campaign and Telluride**,
  coordinating vendors (Adobe, BounceX) and internal teams.
- Delivered **Tableau and Data Studio** reporting; ran continuous GCP cost
  optimisation.

### Cognizant Technology Solutions — Pune
**Senior Associate – Projects**
*29 November 2010 – 13 February 2018*

**Client: Saudi Telecom Company, Saudi Arabia — STC EDW (CLDM7 / CLDM12)**
*Feb 2015 – Feb 2018 · Onsite IT Delivery Lead*

- Data modelling for the enterprise warehouse covering customers, accounts,
  subscriptions, offers and products across all channels and business units.
- Extended the model by **snowflaking dimensions** — demographics, account
  status, subscription status.
- Built an **automation tool** propagating a new key through every dimension
  table, Teradata utility script (FastLoad, MultiLoad, FastExport, BTEQ) and
  Ab-Initio object (pset, plan, mp, dml) automatically.
- Ran a **big-data POC on Apache Hive and HDFS** for CDR ingestion.

**Client: Barclays, UK — Emerging Markets DW & One Africa Program**
*Nov 2010 – Feb 2015 · Team Lead, Consultant*

- Built staging from **core banking (FLEX), ATM/POS (SPARROW)** and online
  transaction sources, then the DataMarts above them.
- **One Africa:** unified emerging-market data across African countries into a
  single source of truth, letting one DataMart span new countries with no rework.
- Designed the **logical and physical data models**; coached development,
  testing and stakeholder groups.
- Built reusable automation: TWS object-creation tool, Teradata acquisition code
  generator, Unix deployment tools, automatic space-reclamation utility.
- Implemented **archiving and purging** against the active warehouse, tiering
  history to **Greenplum**.

### Mahindra Satyam — Hyderabad / Bangalore
**Software Developer – S2**
*7 January 2008 – 23 November 2010*

**Client: Telstra, Australia — TR2.1 / TR2.2 EDW Data-In**

ETL for the retail customer warehouse: registrations, demographics, segmentation,
billed and unbilled call records. Built **DataStage 7.5** jobs, Teradata utility
scripts and Perl/Unix tooling; **Informatica** mappings and workflows for
Oracle → Teradata migration; Control-M scheduling.

---

## Open source — applied AI & agent tooling

Built in my own time and shipped in public — **github.com/kolisachint**

- **hoocode** — a deterministic terminal coding agent, **published to npm** as
  `@kolisachint/hoocode-agent`. TypeScript monorepo of four packages: the CLI, an
  agent runtime with tool calling and state management, a **unified LLM API across
  25+ providers**, and a TUI library with differential rendering. A permission
  gate on every edit and shell command, four scoped modes (ask/plan/build/debug),
  MCP servers and subagents. ~470 commits since May 2026, extending a fork of the
  MIT-licensed *pi-mono*.
- **embeddingsearchtools** (Rust) — an embedding search engine. all-MiniLM-L6-v2
  via **ONNX Runtime** with int8 weights bundled into the binary; exact and
  **HNSW approximate-nearest-neighbour** indexes written from scratch; **BM25
  lexical fusion for hybrid retrieval**; mmap-friendly persistence behind a
  library API, a CLI and a long-lived daemon.
- **voicetools** (Rust) — offline speech-to-text for the terminal. Microphone
  capture through voice-activity detection into **Parakeet-TDT on ONNX Runtime**
  (25 languages, int8), with a whisper.cpp fallback.
- **webtools** (Rust) — token-efficient fetch and search for LLM agents.
  Reference-style URL preservation collapses links to single-token markers;
  total output is capped to a token budget.

*Plus ~20 more public repositories in the same ecosystem — browser, computer and
file tool servers, agent workspaces and experiments.*

## Technical

| | |
| --- | --- |
| **Cloud** | GCP — BigQuery, Cloud Composer, DataFlow, Pub/Sub, App Engine, Cloud Functions, DataProc, Memorystore, Cloud Storage, Compute Engine, Cloud SQL, VPC, IAM · AWS (S3) |
| **Streaming** | **Confluent Kafka**, Pub/Sub, Apache Beam, event-driven architecture |
| **Orchestration** | **Cloud Composer / Apache Airflow**, IBM Tivoli Workload Scheduler, Control-M |
| **Transformation** | **dbt**, Python, SQL, Apache Spark, Informatica, DataStage, Ab-Initio |
| **Infrastructure** | **Terraform**, Git, CI/CD, containerisation |
| **Architecture** | Microservices, API gateways, service discovery, load balancing, multicloud and hybrid patterns, data governance |
| **Databases** | BigQuery, Teradata, Oracle, Greenplum |
| **BI** | Tableau, Looker Studio / Data Studio, Cognos |
| **Domains** | **Banking & cards**, Retail, Telecom |

---

## Education & certifications

- **Google Cloud Certified — Professional Data Engineer**
- **Google Cloud Professional Cloud Architect — in progress**
- *Data Engineering, Big Data and Machine Learning on GCP* — Coursera
  specialisation
- Teradata Basics V2R5 · Teradata SQL V2R5 · Introduction to Oracle9i: SQL

**BE, Computer Science and Engineering** — Walchand College of Engineering,
Sangli (Shivaji University), 2003–2007.
