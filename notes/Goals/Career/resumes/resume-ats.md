# ATS / job-portal version

> **Version 4 of 5 — for machines.** Naukri, LinkedIn Easy Apply, Workday,
> Taleo, SuccessFactors, agency databases. A human may never see the file; a
> parser will. Everything below is deliberately plain.

## How to produce the file

**Do not send a designed document.** The July 2025 profile card — two columns,
coloured header bars, a photo, icons, text in boxes — parses into scrambled
nonsense. Applications get rejected for reasons no human ever reviews.

1. **One column. No tables, no text boxes, no headers/footers, no photo.**
2. **Standard section headings only:** Summary, Skills, Professional Experience,
   Education, Certifications. Parsers match on these exact words.
3. **Dates as `Mon YYYY – Mon YYYY`** on the same line as the employer.
4. **`.docx` when the portal accepts it**, PDF otherwise. Never a scan.
5. **Spell out and abbreviate both** — "Google Cloud Platform (GCP)" — because
   keyword matching is literal and recruiters search both forms.
6. Contact details as plain text lines at the top, never in a header.

---

```
SACHIN KOLI
Pune, Maharashtra, India
+91 9552236200
kolisachint@gmail.com
linkedin.com/in/kolisachint
github.com/kolisachint
kolisachint.github.io


SUMMARY

Google Cloud Certified Professional Data Engineer and Solution Architect with 18
years of experience in cloud data platforms, real-time streaming architecture and
enterprise data engineering. Currently architecting
end-to-end batch and real-time streaming data platforms on Google Cloud Platform
(GCP) for a UK tier-1 retail bank using Confluent Kafka, Cloud Composer (Apache
Airflow), BigQuery, dbt, Python and Terraform. Previously architected digital
cards and payments modernisation on GCP at the same bank. Expertise in data
architecture, data modelling, real-time streaming ingestion, ELT and ETL
pipeline design, infrastructure as code, data governance and cloud cost
optimisation. Also ships open-source applied AI: an LLM coding agent published
to npm and Rust libraries for vector embedding search, approximate nearest
neighbour retrieval and speech recognition. Recognised at the Banking Tech
Awards 2024 and the Card and Payments Awards 2025. Domains: banking, cards and
payments, retail, telecom.


SKILLS

Cloud Platforms: Google Cloud Platform (GCP), Amazon Web Services (AWS),
multicloud architecture, hybrid cloud architecture

Google Cloud: BigQuery, Cloud Composer, Dataflow, Pub/Sub, App Engine, Cloud
Functions, Dataproc, Cloud Storage, Compute Engine, Memorystore, Cloud SQL,
Cloud Source Repositories, VPC Network, Identity and Access Management (IAM),
Google Cloud SDK

Streaming and Messaging: Apache Kafka, Confluent Kafka, Confluent Cloud, Kafka
Connect, Pub/Sub, Apache Beam, event-driven architecture, real-time data
streaming, low-latency ingestion, change data capture (CDC)

Orchestration and Scheduling: Apache Airflow, Cloud Composer, IBM Tivoli
Workload Scheduler (TWS), Control-M, dependency management, workflow automation

Transformation and Modelling: dbt (data build tool), SQL, Python, Apache Spark,
IBM DataStage, Informatica, Ab Initio, ETL, ELT, data modelling, dimensional
modelling, star schema, snowflake schema, data warehouse, data lake, data mart,
data lineage, data quality

Infrastructure and DevOps: Terraform, infrastructure as code (IaC), CI/CD, Git,
GitHub, containerisation, environment provisioning, configuration management,
deployment automation

Architecture: Solution architecture, data architecture, cloud architecture,
enterprise architecture, application architecture, microservices, RESTful APIs,
API gateways, API management, service discovery, load balancing, system design,
cloud migration, data governance, cloud cost optimisation, FinOps

Databases: BigQuery, Teradata, Oracle, Greenplum, SQL, BTEQ, FastLoad,
MultiLoad, FastExport, TPump

Business Intelligence: Tableau, Looker Studio, Google Data Studio, Cognos,
reporting, data visualisation, analytics

Machine Learning and AI: Large language models (LLM), LLM agents, agentic
workflows, tool calling, function calling, Model Context Protocol (MCP), vector
embeddings, vector search, semantic search, approximate nearest neighbour (ANN),
HNSW, hybrid retrieval, BM25, retrieval augmented generation (RAG), ONNX Runtime,
sentence transformers, automatic speech recognition (ASR), Rust, TypeScript

Marketing Technology: Adobe Campaign Classic, Adobe Campaign Standard, IBM
Unica, marketing automation, campaign management

Domain: Digital payments, cards, digital wallets, fraud prevention, retail
banking, financial services, regulatory compliance, retail, e-commerce,
telecommunications

Practices: Agile, stakeholder management, vendor management, technical
leadership, mentoring


PROFESSIONAL EXPERIENCE

Tata Consultancy Services (TCS)
Solution Architect / Associate Consultant
Sep 2021 - Present | Pune, India
Client: Lloyds Banking Group, United Kingdom (Banking)

Data Platform and Real-Time Analytics (Jul 2025 - Present)
- Architected scalable, fault-tolerant end-to-end batch and real-time streaming
  data architectures on Google Cloud Platform supporting high-throughput
  analytics, operational reporting and machine learning workloads.
- Engineered high-availability event-driven streaming pipelines using Confluent
  Kafka and Python enabling low-latency data ingestion and real-time business
  insight.
- Architected hybrid batch ingestion workflows using Cloud Composer (Apache
  Airflow) and IBM Tivoli Workload Scheduler (TWS), managing complex dependency
  graphs across legacy on-premise and cloud environments.
- Designed optimised data warehouse schemas in Google BigQuery and implemented
  modular transformation pipelines using dbt and Python, ensuring data quality
  and lineage.
- Built automated data testing, validation and monitoring frameworks within dbt
  and Airflow ensuring data reliability across downstream analytics.
- Standardised infrastructure deployment using Terraform to provision Cloud
  Composer environments, BigQuery datasets, Kafka connectors and IAM roles
  across multiple environments.
- Integrated Terraform and data pipeline deployments into automated CI/CD
  workflows, reducing environment configuration drift and deployment cycle time.
- Implemented cloud resource optimisation in BigQuery and GCP, reducing compute
  overhead while improving query performance and data security governance.
- Partnered with cross-functional leadership, security teams and business units
  to translate functional requirements into production-ready architectural
  blueprints.

Digital Cards Modernisation (2022 - Jul 2025)
- Led end-to-end modernisation of Digital Cards features including Add to
  Wallet, card controls and View PIN/View Card, migrating from on-premise
  infrastructure to Google Cloud Platform.
- Architected secure and scalable microservices and cross-cloud API patterns
  ensuring regulatory compliance and performance for a tier-1 retail bank.
- Architected an award-winning self-serve fraud journey recognised at the
  Banking Tech Awards 2024 and the Card and Payments Awards 2025.
- Designed service discovery, API gateway, containerisation, load balancing and
  secure inter-service communication patterns for mobile applications.

Sears IT and Management Services India Private Limited
Architect (joined as Technical Specialist)
Feb 2018 - Sep 2021 | Pune, India
Client: Sears Holdings Corporation, United States (Retail)

- Designed and deployed an Email Preference Center API using Google App Engine,
  Pub/Sub, Dataflow and BigQuery, serving millions of customer interactions and
  reducing annual operational cost by USD 600,000.
- Migrated legacy data lake and data marts from Teradata to BigQuery, replacing
  costly licensed applications with open-source and cloud-native solutions.
- Built an API management layer abstracting cloud complexity across a multicloud
  and hybrid cloud environment, establishing reusable integration patterns.
- Replaced self-hosted tooling with cloud-native equivalents across five stacks:
  Teradata to BigQuery, Unix servers to Compute Engine, Control-M to Apache
  Airflow, shell and ETL scripting to Python, GitLab Enterprise to Cloud Source
  Repositories.
- Designed and implemented shared data marts (CDW, NSegment, Campaign) in
  BigQuery to meet enterprise business requirements.
- Led enterprise product migration from IBM Unica to Adobe Campaign and
  Telluride, managing external vendors (Adobe, BounceX) and internal teams.
- Delivered stakeholder reporting using Tableau and Google Data Studio; performed
  continuous cloud cost optimisation on GCP.

Cognizant Technology Solutions
Senior Associate - Projects
Nov 2010 - Feb 2018 | Pune, India
Clients: Saudi Telecom Company, Saudi Arabia (Telecom); Barclays, United
Kingdom (Banking)

- Led data modelling for a national telecom enterprise data warehouse covering
  customers, accounts, subscriptions, offers and products across all channels
  and business units, as Onsite IT Delivery Lead (2015-2018).
- Automated ETL processes using Teradata, Ab Initio and Unix; introduced
  dimensional modelling enhancements including snowflaked dimensions for
  customer demographics, account status and subscription status.
- Developed an automation tool propagating schema changes through Teradata
  utility scripts (FastLoad, MultiLoad, FastExport, BTEQ) and Ab Initio objects
  (pset, plan, mp, dml) automatically.
- Pioneered a big data proof of concept using Apache Hive and HDFS for call
  detail record (CDR) ingestion.
- Led ETL development for an Emerging Markets Data Warehouse and the One Africa
  Program, unifying banking data across multiple African nations into a single
  source of truth (2010-2015).
- Designed logical and physical data models; built staging layers from core
  banking (FLEX), ATM and POS (SPARROW) and online transaction sources.
- Delivered reusable automation tools for code generation, deployment and job
  scheduling, significantly reducing manual effort.
- Implemented archiving and purging solutions using Greenplum as a cost-
  efficient historical data tier.

Mahindra Satyam
Software Developer - S2
Jan 2008 - Nov 2010 | Hyderabad and Bangalore, India
Client: Telstra Corporation, Australia (Telecom)

- Developed DataStage jobs, Teradata utility scripts, Perl and Unix shell
  scripts for ETL of retail customer data including registrations, demographics,
  segmentation and billed and unbilled call records.
- Developed Informatica mappings and workflows migrating data from Oracle to
  Teradata for an enterprise data warehouse.
- Performed unit testing, data validation and defect resolution.


OPEN SOURCE PROJECTS

hoocode - github.com/kolisachint/hoocode (TypeScript)
- Deterministic terminal coding agent published to npm as
  @kolisachint/hoocode-agent. Four packages: CLI, agent runtime with tool
  calling and state management, unified LLM API across 25+ providers, and a
  terminal UI library with differential rendering.
- Permission gating on every file edit and shell command, four scoped agent
  modes, Model Context Protocol (MCP) server support, and subagent delegation.

embeddingsearchtools - github.com/kolisachint/embeddingsearchtools (Rust)
- Embedding search engine. Sentence-transformer inference (all-MiniLM-L6-v2)
  via ONNX Runtime with int8 quantised weights bundled into the binary.
- Exact and HNSW approximate nearest neighbour vector indexes implemented from
  scratch; BM25 lexical index fused for hybrid retrieval; memory-mapped
  persistence exposed through a library API, CLI and long-lived daemon.

voicetools - github.com/kolisachint/voicetools (Rust)
- Offline automatic speech recognition for the terminal. Microphone capture,
  voice activity detection and resampling into Parakeet-TDT on ONNX Runtime
  across 25 languages, with a Whisper fallback backend.

webtools - github.com/kolisachint/webtools (Rust)
- Token-efficient web fetch and search tooling for LLM agents, with
  reference-style URL preservation and total output token budgeting.


EDUCATION

Bachelor of Engineering, Computer Science and Engineering
Walchand College of Engineering, Sangli (Shivaji University)
2003 - 2007


CERTIFICATIONS

Google Cloud Certified - Professional Data Engineer (PDE), Google Cloud
Google Cloud Professional Cloud Architect (PCA) - In Progress
Data Engineering, Big Data and Machine Learning on Google Cloud Platform -
Specialization, Coursera
Teradata Basics V2R5 - Teradata
Teradata SQL V2R5 - Teradata
Introduction to Oracle9i SQL - Oracle


ADDITIONAL

Total experience: 18 years
Notice period: [fill in]
Current location: Pune, India
Preferred locations: Pune, Bengaluru, Hyderabad, Remote
```

---

## Before you submit

- **Fill in the notice period.** Portals filter on it and a blank field reads as
  evasive. TCS is typically 90 days — confirm yours.
- **Mirror the advert's exact vocabulary.** If a posting says "Data Platform
  Architect" and you have written "Solution Architect", add their phrase to the
  Summary. Matching is literal, not semantic.
- **The AI keywords are now full strength**, because the shipped repositories
  back every one of them. LLM agents, MCP, ANN/HNSW, hybrid retrieval, ONNX and
  ASR are all things you can open a repo and demonstrate. The two words still
  absent are **MLOps** and **model training** — you do inference and retrieval,
  not training pipelines, and those would draw a screen on work you have not
  done.
- **Do not add a CTC or expected-salary line.** Portals ask separately; putting
  it in the file anchors you before a conversation exists.
- **Clients are named here.** Normal for private applications — but an agency
  database is less private than an addressed email. If a client relationship is
  sensitive, swap in the anonymised descriptors from `resume-linkedin.md`.
