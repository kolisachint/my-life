// ATS resume — deliberately plain. One column, no tables, no text boxes,
// no header/footer, no images. Standard headings parsers match on.
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
        LevelFormat, convertInchesToTwip } = require('docx');
const fs = require('fs');

const FONT = 'Calibri';

function line(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after === undefined ? 0 : opts.after, line: 240 },
    alignment: AlignmentType.LEFT,
    children: [new TextRun({ text, bold: !!opts.bold, size: opts.size || 20, font: FONT })],
  });
}

function heading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, font: FONT, color: '000000' })],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'ats-bullets', level: 0 },
    spacing: { after: 40, line: 240 },
    children: [new TextRun({ text, size: 20, font: FONT })],
  });
}

const doc = new Document({
  numbering: {
    config: [{
      reference: 'ats-bullets',
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: '•',
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.18) } } },
      }],
    }],
  },
  styles: {
    default: { document: { run: { font: FONT, size: 20 } } },
  },
  sections: [{
    properties: {
      page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } },
    },
    children: [
      // ---- contact block: plain lines, never a header ----
      line('SACHIN KOLI', { bold: true, size: 28 }),
      line('Pune, Maharashtra, India'),
      line('+91 9552236200'),
      line('kolisachint@gmail.com'),
      line('linkedin.com/in/kolisachint'),
      line('kolisachint.github.io', { after: 60 }),

      heading('SUMMARY'),
      line('Google Cloud Certified Professional Data Engineer and Solution Architect with 18 years of experience in cloud data platforms, real-time streaming architecture and enterprise data engineering. Currently architecting end-to-end batch and real-time streaming data platforms on Google Cloud Platform (GCP) for a UK tier-1 retail bank using Confluent Kafka, Cloud Composer (Apache Airflow), BigQuery, dbt, Python and Terraform. Previously architected digital cards and payments modernisation on GCP at the same bank. Expertise in data architecture, data modelling, real-time streaming ingestion, ELT and ETL pipeline design, infrastructure as code, data governance and cloud cost optimisation. Recognised at the Banking Tech Awards 2024 and the Card and Payments Awards 2025. Domains: banking, cards and payments, retail, telecom.'),

      heading('SKILLS'),
      line('Cloud Platforms: Google Cloud Platform (GCP), Amazon Web Services (AWS), multicloud architecture, hybrid cloud architecture', { after: 60 }),
      line('Google Cloud: BigQuery, Cloud Composer, Dataflow, Pub/Sub, App Engine, Cloud Functions, Dataproc, Cloud Storage, Compute Engine, Memorystore, Cloud SQL, Cloud Source Repositories, VPC Network, Identity and Access Management (IAM), Google Cloud SDK', { after: 60 }),
      line('Streaming and Messaging: Apache Kafka, Confluent Kafka, Confluent Cloud, Kafka Connect, Pub/Sub, Apache Beam, event-driven architecture, real-time data streaming, low-latency ingestion, change data capture (CDC)', { after: 60 }),
      line('Orchestration and Scheduling: Apache Airflow, Cloud Composer, IBM Tivoli Workload Scheduler (TWS), Control-M, dependency management, workflow automation', { after: 60 }),
      line('Transformation and Modelling: dbt (data build tool), SQL, Python, Apache Spark, IBM DataStage, Informatica, Ab Initio, ETL, ELT, data modelling, dimensional modelling, star schema, snowflake schema, data warehouse, data lake, data mart, data lineage, data quality', { after: 60 }),
      line('Infrastructure and DevOps: Terraform, infrastructure as code (IaC), CI/CD, Git, GitHub, containerisation, environment provisioning, deployment automation', { after: 60 }),
      line('Architecture: Solution architecture, data architecture, cloud architecture, enterprise architecture, application architecture, microservices, RESTful APIs, API gateways, API management, service discovery, load balancing, system design, cloud migration, data governance, cloud cost optimisation, FinOps', { after: 60 }),
      line('Databases: BigQuery, Teradata, Oracle, Greenplum, SQL, BTEQ, FastLoad, MultiLoad, FastExport, TPump', { after: 60 }),
      line('Business Intelligence: Tableau, Looker Studio, Google Data Studio, Cognos, reporting, data visualisation, analytics', { after: 60 }),
      line('Machine Learning and AI: Vector embeddings, semantic search, vector similarity retrieval, Rust, applied machine learning (independent projects)', { after: 60 }),
      line('Marketing Technology: Adobe Campaign Classic, Adobe Campaign Standard, IBM Unica, marketing automation, campaign management', { after: 60 }),
      line('Domain: Digital payments, cards, digital wallets, fraud prevention, retail banking, financial services, regulatory compliance, retail, e-commerce, telecommunications', { after: 60 }),
      line('Practices: Agile, stakeholder management, vendor management, technical leadership, mentoring'),

      heading('PROFESSIONAL EXPERIENCE'),

      line('Tata Consultancy Services (TCS)', { bold: true }),
      line('Solution Architect / Associate Consultant'),
      line('Sep 2021 - Present | Pune, India'),
      line('Client: Lloyds Banking Group, United Kingdom (Banking)', { after: 80 }),

      line('Data Platform and Real-Time Analytics (Jul 2025 - Present)', { bold: true, after: 40 }),
      bullet('Architected scalable, fault-tolerant end-to-end batch and real-time streaming data architectures on Google Cloud Platform supporting high-throughput analytics, operational reporting and machine learning workloads.'),
      bullet('Engineered high-availability event-driven streaming pipelines using Confluent Kafka and Python enabling low-latency data ingestion and real-time business insight.'),
      bullet('Architected hybrid batch ingestion workflows using Cloud Composer (Apache Airflow) and IBM Tivoli Workload Scheduler (TWS), managing complex dependency graphs across legacy on-premise and cloud environments.'),
      bullet('Designed optimised data warehouse schemas in Google BigQuery and implemented modular transformation pipelines using dbt and Python, ensuring data quality and lineage.'),
      bullet('Built automated data testing, validation and monitoring frameworks within dbt and Airflow ensuring data reliability across downstream analytics.'),
      bullet('Standardised infrastructure deployment using Terraform to provision Cloud Composer environments, BigQuery datasets, Kafka connectors and IAM roles across multiple environments.'),
      bullet('Integrated Terraform and data pipeline deployments into automated CI/CD workflows, reducing environment configuration drift and deployment cycle time.'),
      bullet('Implemented cloud resource optimisation in BigQuery and GCP, reducing compute overhead while improving query performance and data security governance.'),
      bullet('Partnered with cross-functional leadership, security teams and business units to translate functional requirements into production-ready architectural blueprints.'),

      line('Digital Cards Modernisation (2022 - Jul 2025)', { bold: true, after: 40 }),
      bullet('Led end-to-end modernisation of Digital Cards features including Add to Wallet, card controls and View PIN/View Card, migrating from on-premise infrastructure to Google Cloud Platform.'),
      bullet('Architected secure and scalable microservices and cross-cloud API patterns ensuring regulatory compliance and performance for a tier-1 retail bank.'),
      bullet('Architected an award-winning self-serve fraud journey recognised at the Banking Tech Awards 2024 and the Card and Payments Awards 2025.'),
      bullet('Designed service discovery, API gateway, containerisation, load balancing and secure inter-service communication patterns for mobile applications.'),

      line('Sears IT and Management Services India Private Limited', { bold: true }),
      line('Architect (joined as Technical Specialist)'),
      line('Feb 2018 - Sep 2021 | Pune, India'),
      line('Client: Sears Holdings Corporation, United States (Retail)', { after: 80 }),
      bullet('Designed and deployed an Email Preference Center API using Google App Engine, Pub/Sub, Dataflow and BigQuery, serving millions of customer interactions and reducing annual operational cost by USD 600,000.'),
      bullet('Migrated legacy data lake and data marts from Teradata to BigQuery, replacing costly licensed applications with open-source and cloud-native solutions.'),
      bullet('Built an API management layer abstracting cloud complexity across a multicloud and hybrid cloud environment, establishing reusable integration patterns.'),
      bullet('Replaced self-hosted tooling with cloud-native equivalents across five stacks: Teradata to BigQuery, Unix servers to Compute Engine, Control-M to Apache Airflow, shell and ETL scripting to Python, GitLab Enterprise to Cloud Source Repositories.'),
      bullet('Designed and implemented shared data marts (CDW, NSegment, Campaign) in BigQuery to meet enterprise business requirements.'),
      bullet('Led enterprise product migration from IBM Unica to Adobe Campaign and Telluride, managing external vendors (Adobe, BounceX) and internal teams.'),
      bullet('Delivered stakeholder reporting using Tableau and Google Data Studio; performed continuous cloud cost optimisation on GCP.'),

      line('Cognizant Technology Solutions', { bold: true }),
      line('Senior Associate - Projects'),
      line('Nov 2010 - Feb 2018 | Pune, India'),
      line('Clients: Saudi Telecom Company, Saudi Arabia (Telecom); Barclays, United Kingdom (Banking)', { after: 80 }),
      bullet('Led data modelling for a national telecom enterprise data warehouse covering customers, accounts, subscriptions, offers and products across all channels and business units, as Onsite IT Delivery Lead (2015-2018).'),
      bullet('Automated ETL processes using Teradata, Ab Initio and Unix; introduced dimensional modelling enhancements including snowflaked dimensions for customer demographics, account status and subscription status.'),
      bullet('Developed an automation tool propagating schema changes through Teradata utility scripts (FastLoad, MultiLoad, FastExport, BTEQ) and Ab Initio objects (pset, plan, mp, dml) automatically.'),
      bullet('Pioneered a big data proof of concept using Apache Hive and HDFS for call detail record (CDR) ingestion.'),
      bullet('Led ETL development for an Emerging Markets Data Warehouse and the One Africa Program, unifying banking data across multiple African nations into a single source of truth (2010-2015).'),
      bullet('Designed logical and physical data models; built staging layers from core banking (FLEX), ATM and POS (SPARROW) and online transaction sources.'),
      bullet('Delivered reusable automation tools for code generation, deployment and job scheduling, significantly reducing manual effort.'),
      bullet('Implemented archiving and purging solutions using Greenplum as a cost-efficient historical data tier.'),

      line('Mahindra Satyam', { bold: true }),
      line('Software Developer - S2'),
      line('Jan 2008 - Nov 2010 | Hyderabad and Bangalore, India'),
      line('Client: Telstra Corporation, Australia (Telecom)', { after: 80 }),
      bullet('Developed DataStage jobs, Teradata utility scripts, Perl and Unix shell scripts for ETL of retail customer data including registrations, demographics, segmentation and billed and unbilled call records.'),
      bullet('Developed Informatica mappings and workflows migrating data from Oracle to Teradata for an enterprise data warehouse.'),
      bullet('Performed unit testing, data validation and defect resolution.'),

      heading('INDEPENDENT PROJECTS'),
      line('Rust Embedding Library', { bold: true, after: 40 }),
      bullet('Implemented text embedding generation from scratch in Rust, covering tokenisation, vector generation and similarity computation.'),
      line('Semantic Code Search', { bold: true, after: 40 }),
      bullet('Built retrieval over a source code repository using vector similarity search rather than keyword matching.'),

      heading('EDUCATION'),
      line('Bachelor of Engineering, Computer Science and Engineering', { bold: true }),
      line('Walchand College of Engineering, Sangli (Shivaji University)'),
      line('2003 - 2007'),

      heading('CERTIFICATIONS'),
      line('Google Cloud Certified - Professional Data Engineer (PDE), Google Cloud'),
      line('Google Cloud Professional Cloud Architect (PCA) - In Progress'),
      line('Data Engineering, Big Data and Machine Learning on Google Cloud Platform - Specialization, Coursera'),
      line('Teradata Basics V2R5 - Teradata'),
      line('Teradata SQL V2R5 - Teradata'),
      line('Introduction to Oracle9i SQL - Oracle'),

      heading('ADDITIONAL'),
      line('Total experience: 18 years'),
      line('Notice period: [fill in before submitting]'),
      line('Current location: Pune, India'),
      line('Preferred locations: Pune, Bengaluru, Hyderabad, Remote'),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(process.argv[2], buf);
  console.log('wrote', process.argv[2], buf.length, 'bytes');
});
