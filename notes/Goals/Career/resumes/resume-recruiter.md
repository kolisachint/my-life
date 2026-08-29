# Sachin Koli

**Solution Architect — Cloud Data & AI Platforms**
**Google Cloud Certified Professional Data Engineer**
Pune, India · +91 95522 36200 · kolisachint@gmail.com
linkedin.com/in/kolisachint · github.com/kolisachint · kolisachint.github.io

> **Version 1 of 5 — the workhorse.** Full client detail. Send to named
> recruiters and hiring managers. Do not post publicly.
> `[N]` marks a number you need to supply — see `README.md`.

---

## Summary

**Google Cloud Certified Professional Data Engineer** with **18 years** building
enterprise data platforms, now architecting **real-time streaming and batch data
infrastructure on Google Cloud** for a UK tier-1 retail bank — Confluent Kafka, Cloud Composer, dbt,
BigQuery and Terraform, spanning legacy on-premise and cloud environments.

Before this platform I spent four years architecting **digital cards and
payments** at the same bank, migrating card servicing to GCP. The self-serve
fraud journey I designed won at the **Banking Tech Awards 2024** and the
**Card & Payments Awards 2025**.

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
**Client: Lloyds Banking Group, UK**

#### Data Platform & Real-Time Analytics — *July 2025 – present*

Architecting the bank's batch and streaming data platform end to end.

- **Real-time streaming ingestion.** Engineered high-availability, event-driven
  pipelines on **Confluent Kafka** with Python, delivering low-latency ingestion
  for operational reporting and analytics — `[N]` events/day.
- **Hybrid batch orchestration.** Architected batch ingestion across **Cloud
  Composer (Apache Airflow)** and **IBM Tivoli Workload Scheduler**, managing
  complex dependency graphs that span legacy on-premise and cloud environments —
  `[N]` pipelines. *(Bridging TWS and Airflow rather than replacing one with the
  other is the hard part, and the part most candidates have never done.)*
- **Analytical modelling.** Designed BigQuery warehouse schemas and modular
  **dbt** transformation pipelines with enforced data quality and lineage —
  `[N]` models.
- **Reliability engineering.** Built automated testing, validation and
  monitoring frameworks inside dbt and Airflow so downstream analytics fail
  loudly rather than silently.
- **Infrastructure as code.** Standardised provisioning with **Terraform** —
  Composer environments, BigQuery datasets, Kafka connectors and IAM roles across
  `[N]` environments — and integrated it into CI/CD, cutting configuration drift
  and reducing deployment cycle time by `[N]`.
- **Governance and cost.** Implemented BigQuery and GCP optimisation reducing
  compute overhead by `[N]` while improving query performance and tightening data
  security governance.
- **Strategic alignment.** Partnered with cross-functional leadership, security
  and business units to turn functional requirements into production
  architectural blueprints.

#### Digital Cards Modernisation — *2022 – July 2025*

- Led **end-to-end modernisation of Digital Cards** — Add to Wallet, card
  controls, View PIN / View Card — migrating from on-premise to **GCP**.
- Architected **secure, scalable microservices and cross-cloud API patterns**
  meeting banking compliance and performance requirements.
- **Award-winning self-serve fraud journey** — **Banking Tech Awards 2024** and
  **Card & Payments Awards 2025**. Moved fraud handling from an assisted
  call-centre process to a journey the customer completes.
- Designed service discovery, API gateways, containerisation, load balancing and
  secure inter-service communication across a hybrid estate.

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
