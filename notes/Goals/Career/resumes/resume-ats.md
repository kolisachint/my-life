# ATS / job-portal version

> **Version 4 of 5 — for machines.** Naukri, LinkedIn Easy Apply, Workday,
> Taleo, SuccessFactors, agency databases. A human may never see the file; a
> parser will. Everything below is deliberately plain.

## How to produce the file

**Do not send a designed document.** The July 2025 profile card — two columns,
coloured header bars, a photo, icons, text in boxes — parses into scrambled
nonsense. Applications get rejected for reasons no human ever reviews.

Rules for the exported file:

1. **One column. No tables, no text boxes, no headers/footers, no photo.**
2. **Standard section headings only:** Summary, Skills, Professional Experience,
   Education, Certifications. Parsers match on these exact words.
3. **Dates as `Mon YYYY – Mon YYYY`** on the same line as the employer.
4. **`.docx` when the portal accepts it**, PDF otherwise. Never a scan or image.
5. **Spell out and abbreviate both** on first use — "Google Cloud Platform (GCP)"
   — because keyword matching is literal and recruiters search both.
6. Contact details as plain text lines at the top, never in a header.

---

```
SACHIN KOLI
Pune, Maharashtra, India
+91 9552236200
kolisachint@gmail.com
linkedin.com/in/kolisachint
kolisachint.github.io


SUMMARY

Solution Architect with 18 years of experience in cloud architecture, enterprise
data platforms and digital payments. Four years architecting digital cards and
payments systems for a UK tier-1 retail bank, migrating card servicing from
on-premise infrastructure to Google Cloud Platform (GCP). Expertise in
microservices architecture, API design and management, cross-cloud integration,
data warehousing and cloud migration. Recognised at the Banking Tech Awards 2024
and the Card and Payments Awards 2025 for an award-winning self-serve fraud
journey. Domains: banking, cards and payments, retail, telecom.


SKILLS

Cloud Platforms: Google Cloud Platform (GCP), Amazon Web Services (AWS),
multicloud architecture, hybrid cloud architecture

Google Cloud: BigQuery, Dataflow, Pub/Sub, Cloud Composer, App Engine, Cloud
Functions, Dataproc, Cloud Storage, Compute Engine, Memorystore, Cloud SQL,
Cloud Source Repositories, VPC Network, Google Cloud SDK

Architecture: Solution architecture, cloud architecture, application
architecture, enterprise architecture, microservices, RESTful APIs, API
gateways, API management, service discovery, containerisation, load balancing,
secure communication, system design, technical design, cloud migration

Data Engineering: Apache Beam, Apache Airflow, Apache Spark, Apache Kafka,
Apache Hive, HDFS, IBM DataStage, Informatica, Ab Initio, ETL, ELT, data
pipelines, data ingestion, real-time streaming, batch processing

Databases and Warehousing: Teradata, Oracle, Greenplum, BigQuery, data
modelling, dimensional modelling, star schema, snowflake schema, data warehouse,
data lake, data mart, OLAP

Programming: SQL, Python, Unix shell scripting, VBA, BTEQ, FastLoad, MultiLoad,
FastExport, TPump

Business Intelligence: Tableau, Google Data Studio, Looker Studio, Cognos,
reporting, data visualisation, analytics

Marketing Technology: Adobe Campaign Classic, Adobe Campaign Standard, IBM
Unica, marketing automation, campaign management

Domain: Digital payments, cards, digital wallets, fraud prevention, retail
banking, financial services, regulatory compliance, retail, e-commerce,
telecommunications

Practices: Agile, stakeholder management, vendor management, technical
leadership, mentoring, cost optimisation, FinOps


PROFESSIONAL EXPERIENCE

Tata Consultancy Services (TCS)
Solution Architect / Associate Consultant
Sep 2021 - Present | Pune, India
Client: Lloyds Banking Group, United Kingdom (Banking)

- Led end-to-end modernisation of Digital Cards features including Add to
  Wallet, card controls and View PIN/View Card, migrating from on-premise
  infrastructure to Google Cloud Platform.
- Architected secure and scalable microservices and cross-cloud API patterns
  ensuring regulatory compliance and performance for a tier-1 retail bank.
- Architected an award-winning self-serve fraud journey recognised at the
  Banking Tech Awards 2024 and the Card and Payments Awards 2025.
- Delivered mobile-led customer journeys, aligning cloud strategy with business
  objectives.
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
- Delivered stakeholder reporting and visualisation using Tableau and Google
  Data Studio; performed continuous cloud cost optimisation on GCP.

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
- Pioneered big data proof of concept using Apache Hive and HDFS for call detail
  record (CDR) ingestion.
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
Clients: Cisco, United States (Networking); Telstra Corporation, Australia
(Telecom)

- Developed Informatica mappings and workflows migrating data from Oracle to
  Teradata for a next-generation enterprise data warehouse.
- Developed DataStage jobs, Teradata utility scripts, Perl and Unix shell
  scripts for ETL of retail customer data including registrations, demographics,
  segmentation and billed and unbilled call records.
- Performed unit testing, data validation and defect resolution using Mercury
  and HP Quality Centre.


EDUCATION

Bachelor of Engineering, Computer Science and Engineering
Walchand College of Engineering, Sangli (Shivaji University)
2003 - 2007


CERTIFICATIONS

Data Engineering, Big Data and Machine Learning on Google Cloud Platform -
Specialization, Coursera
Teradata Basics V2R5 - Teradata
Teradata SQL V2R5 - Teradata
Introduction to Oracle9i SQL - Oracle
Google Cloud Professional Cloud Architect - In Progress


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
- **Mirror the job advert's vocabulary.** If the posting says "Cloud Solution
  Architect" and you have written "Solution Architect", add their exact phrase to
  the Summary. Matching is literal, not semantic.
- **Do not add a CTC or expected-salary line to the document.** Portals ask
  separately; putting it in the file anchors you before a conversation exists.
- **The clients are named here.** That is the norm for private applications and
  agency databases — but note that an agency database is less private than an
  addressed email. If a particular client relationship is sensitive, use the
  anonymised descriptors from `resume-linkedin.md` for that line.
