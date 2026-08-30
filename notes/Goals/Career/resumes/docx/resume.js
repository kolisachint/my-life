// Sachin_Koli_Resume.docx — the editable twin of Sachin_Koli_Resume.pdf.
//
// Same words, same order, same two-page shape; Word furniture instead of print
// CSS. Send the PDF; edit this. No [N] placeholders — the PDF does not have
// them and neither does this.
const S = require('./style');

module.exports = function resume() {
  const c = [];

  c.push(S.name('Sachin Koli'));
  c.push(S.subtitle('Solution Architect — Cloud Data & AI Platforms'));
  c.push(S.subtitle('Google Cloud Certified — Professional Data Engineer',
    { size: S.pt(9.5), color: '35424A', after: 0 }));
  c.push(S.contact([
    'Pune, India', '+91 95522 36200', 'kolisachint@gmail.com',
    'linkedin.com/in/kolisachint', 'github.com/kolisachint', 'kolisachint.github.io',
  ]));

  // ---- summary -----------------------------------------------------------
  c.push(S.heading('Summary', { before: 60 }));
  c.push(S.para('**Google Cloud Certified Professional Data Engineer** with **18 years** building enterprise data platforms, now architecting **real-time streaming and batch data infrastructure on Google Cloud** for a UK tier-1 retail bank — Confluent Kafka, Cloud Composer, dbt, BigQuery and Terraform, spanning legacy on-premise and cloud environments.', { after: 70 }));
  c.push(S.para('Previously architected **digital cards and payments** at the same bank, migrating card servicing to GCP. The self-serve fraud journey I designed won at the **Banking Tech Awards 2024** and the **Card & Payments Awards 2025**.', { after: 70 }));
  c.push(S.para('Across twelve prior years in retail, telecom and banking data: a **Teradata → BigQuery** lake migration, and a customer preference API on GCP that **cut $600,000 a year** in operating cost. Alongside all of it I **ship applied-AI tooling in the open** — a terminal coding agent published to npm, and the Rust beneath it: ONNX inference, an ANN index written from scratch, hybrid dense/lexical retrieval.', { after: 40 }));

  // ---- experience --------------------------------------------------------
  c.push(S.heading('Experience'));

  c.push(S.roleHead('Tata Consultancy Services', 'Sep 2021 – Present', { before: 40 }));
  c.push(S.roleSub('Solution Architect  ·  Pune, India'));
  c.push(S.client('Client: Lloyds Banking Group, United Kingdom'));

  c.push(S.roleSub('**Data Platform & Real-Time Analytics**  — Jul 2025 – Present', { after: 30 }));
  [
    "Architected the bank's **end-to-end batch and real-time streaming data platform** on Google Cloud, supporting high-throughput analytics, operational reporting and machine learning workloads.",
    'Engineered high-availability, event-driven ingestion pipelines on **Confluent Kafka** with Python, delivering low-latency data for operational reporting and instant business insight.',
    'Architected hybrid batch orchestration across **Cloud Composer (Apache Airflow)** and **IBM Tivoli Workload Scheduler**, managing complex dependency graphs that span legacy on-premise and cloud environments.',
    'Designed optimised **BigQuery** warehouse schemas and modular **dbt** transformation pipelines with enforced data quality and lineage; built automated testing, validation and monitoring frameworks so downstream analytics fail loudly rather than silently.',
    'Standardised infrastructure with **Terraform** — Composer environments, BigQuery datasets, Kafka connectors and IAM roles — and integrated it into **CI/CD**, cutting configuration drift and deployment cycle time.',
    'Implemented BigQuery and GCP **cost optimisation and governance**, reducing compute overhead while improving query performance and data security.',
    'Partnered with leadership, security and business units to turn requirements into production-ready architectural blueprints.',
  ].forEach((b) => c.push(S.bullet(b)));

  c.push(S.roleSub('**Digital Cards Modernisation**  — 2022 – Jul 2025', { after: 30 }));
  [
    'Led end-to-end modernisation of **Digital Cards** — Add to Wallet, card controls, View PIN / View Card — migrating from on-premise infrastructure to **GCP**.',
    'Architected secure, scalable **microservices and cross-cloud API patterns** meeting banking compliance and performance requirements.',
    '**Award-winning self-serve fraud journey** — recognised at the Banking Tech Awards 2024 and the Card & Payments Awards 2025 — moving fraud handling from an assisted call-centre process to a journey the customer completes.',
    'Designed service discovery, API gateways, containerisation, load balancing and secure inter-service communication across a hybrid estate.',
  ].forEach((b) => c.push(S.bullet(b)));

  c.push(S.roleHead('Sears IT and Management Services India', 'Feb 2018 – Sep 2021'));
  c.push(S.roleSub('Technical Specialist → Architect  ·  Pune, India'));
  c.push(S.client('Client: Sears Holdings Corporation, United States — Targeted Interactions / TI Mart'));
  [
    'Built the **Email Preference Center API** on GCP App Engine, Pub/Sub, DataFlow and BigQuery, serving millions of customers — **reduced annual cost by $600,000**.',
    '**Migrated DataMarts from Teradata to BigQuery**, on schedule and without significant incident.',
    'Built an **API management layer** decoupling applications from cloud complexity across a multicloud estate — reused as the blueprint by other teams.',
    'Replaced self-hosted tooling with cloud-native across five stacks: Teradata → BigQuery · Unix → Compute Engine · Control-M → Airflow · shell/ETL → Python · GitLab Enterprise → Cloud Source Repositories.',
    'Designed shared datamarts (CDW, NSegment, Campaign) in BigQuery; led enterprise migration from **IBM Unica to Adobe Campaign** and Telluride, coordinating vendors (Adobe, BounceX) and internal teams.',
    'Delivered Tableau and Data Studio reporting; ran continuous GCP cost optimisation.',
  ].forEach((b) => c.push(S.bullet(b)));

  c.push(S.roleHead('Cognizant Technology Solutions', 'Nov 2010 – Feb 2018'));
  c.push(S.roleSub('Senior Associate – Projects  ·  Pune, India'));
  c.push(S.client('Client: Saudi Telecom Company, Saudi Arabia — STC EDW (CLDM7 / CLDM12) · Onsite IT Delivery Lead · Feb 2015 – Feb 2018'));
  [
    'Led data modelling for the enterprise warehouse covering customers, accounts, subscriptions, offers and products across all channels and business units.',
    'Extended the model by **snowflaking dimensions** — demographics, account status, subscription status.',
    'Built an **automation tool** propagating a new key through every dimension table, Teradata utility script (FastLoad, MultiLoad, FastExport, BTEQ) and Ab-Initio object automatically.',
    'Ran a big-data POC on **Apache Hive and HDFS** for CDR ingestion.',
  ].forEach((b) => c.push(S.bullet(b)));

  c.push(S.client('Client: Barclays, United Kingdom — Emerging Markets DW & One Africa Program · Team Lead · Nov 2010 – Feb 2015'));
  [
    'Built staging from core banking (FLEX), ATM/POS (SPARROW) and online transaction sources, then the DataMarts above them.',
    '**One Africa:** unified emerging-market data across African countries into a single source of truth, letting one DataMart span new countries with no rework.',
    'Designed the **logical and physical data models**; built reusable automation — TWS object-creation tool, Teradata acquisition code generator, Unix deployment tooling.',
    'Implemented archiving and purging against the active warehouse, tiering history to **Greenplum**.',
  ].forEach((b) => c.push(S.bullet(b)));

  c.push(S.roleHead('Mahindra Satyam', 'Jan 2008 – Nov 2010'));
  c.push(S.roleSub('Software Developer – S2  ·  Hyderabad / Bangalore, India'));
  c.push(S.client('Client: Telstra Corporation, Australia — TR2.1 / TR2.2 EDW Data-In'));
  [
    'Built **DataStage 7.5** jobs, Teradata utility scripts and Perl/Unix tooling for the retail customer warehouse — registrations, demographics, segmentation, billed and unbilled call records.',
    'Built **Informatica** mappings and workflows migrating Oracle to Teradata for an enterprise data warehouse.',
  ].forEach((b) => c.push(S.bullet(b)));

  // ---- open source -------------------------------------------------------
  c.push(S.heading('Open Source — Applied AI & Agent Tooling'));
  c.push(S.para('Built in my own time and shipped in public — **github.com/kolisachint**',
    { size: S.pt(9), color: S.MUTED, strongColor: S.INK, italics: true, after: 50 }));
  [
    '**hoocode** — deterministic terminal coding agent, **published to npm**. TypeScript monorepo of four packages: CLI, agent runtime with tool calling, a **unified LLM API across 25+ providers**, and a differential-rendering TUI. Permission gate on every edit and command, four scoped modes, MCP servers and subagents. ~470 commits since May 2026, extending a fork of the MIT-licensed pi-mono.',
    '**embeddingsearchtools** (Rust) — embedding search engine. MiniLM via **ONNX Runtime**, int8 weights bundled into the binary; exact and **HNSW approximate-nearest-neighbour** indexes written from scratch; **BM25 fusion for hybrid retrieval**; mmap-friendly store behind a library API, CLI and daemon.',
    '**voicetools** (Rust) — offline speech-to-text. Mic capture through voice-activity detection into **Parakeet-TDT on ONNX Runtime** (25 languages, int8), whisper.cpp fallback.',
    '**webtools** (Rust) — token-efficient fetch and search for LLM agents; reference-style URL preservation collapses links to single-token markers under a total token budget.',
  ].forEach((b) => c.push(S.bullet(b)));

  // ---- technical ---------------------------------------------------------
  c.push(S.heading('Technical'));
  c.push(S.labelledRows([
    ['Cloud', 'Google Cloud Platform — BigQuery, Cloud Composer, DataFlow, Pub/Sub, App Engine, Cloud Functions, DataProc, Cloud Storage, Compute Engine, Memorystore, Cloud SQL, VPC, IAM · AWS (S3)'],
    ['Streaming', 'Confluent Kafka, Pub/Sub, Apache Beam, event-driven architecture'],
    ['Orchestration', 'Cloud Composer / Apache Airflow, IBM Tivoli Workload Scheduler, Control-M'],
    ['Transformation', 'dbt, Python, SQL, Apache Spark, Informatica, IBM DataStage, Ab-Initio'],
    ['Infrastructure', 'Terraform, Git, CI/CD, containerisation'],
    ['Architecture', 'Microservices, API gateways, service discovery, load balancing, multicloud and hybrid patterns, data governance, cost optimisation'],
    ['Databases', 'BigQuery, Teradata, Oracle, Greenplum'],
    ['BI', 'Tableau, Looker Studio, Cognos'],
    ['Domains', 'Banking, cards & payments · Retail · Telecom'],
  ]));

  // ---- education ---------------------------------------------------------
  c.push(S.heading('Education & Certifications'));
  c.push(S.para('**BE, Computer Science and Engineering** — Walchand College of Engineering, Sangli (Shivaji University), 2003–2007', { after: 50 }));
  [
    '**Google Cloud Certified — Professional Data Engineer**',
    'Google Cloud Professional Cloud Architect — in progress',
    'Data Engineering, Big Data and Machine Learning on GCP — Coursera specialisation',
    'Teradata Basics V2R5 · Teradata SQL V2R5 · Introduction to Oracle9i: SQL',
  ].forEach((b) => c.push(S.bullet(b, { after: 20 })));

  return S.makeDoc({
    children: c,
    title: 'Sachin Koli — Solution Architect, Cloud Data & AI Platforms',
    description: 'Editable Word copy of Sachin_Koli_Resume.pdf.',
    margin: { top: 620, right: 680, bottom: 600, left: 680 },
  });
};
