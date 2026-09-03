# LBG 5-Year Profile (2021–2026) — source document

**What this is.** Sachin's own evidence-based profile of his five years at Lloyds
Banking Group, compiled by him from **150 Confluence pages he authored** on
`lbg.atlassian.net`, plus a content review of ~20 key MVDs, KDDs, ADRs and data
contracts. It is the richest primary source that exists for the 2021–2026 window
— every other career document should defer to it on *what he actually did*.

**Provenance.** Transcribed 2026-09-03 from seven photographs of his screen
(Notepad++, `C:\Users\8524310\github\my-life\lbg-5-year-profile.md`, 230 lines /
25,919 chars). **Complete — all ten sections, lines 1–230.** The photos are
committed beside this file in `lbg-5-year-profile.src/`.

**One caveat:** items marked `[?]` are the handful of strings the photographs
could not resolve with certainty (glare, small type) — a Vault namespace pattern,
one service-name list, two Confluence page IDs and one tooling line. Everything
else is transcribed as written, including his own abbreviations and
inconsistencies. The original still lives only in his local clone of this repo
and has never been pushed; pushing it would replace this transcription with the
real bytes.

---

## Transcription

# Sachin Tatyaso Koli — LBG 5-Year Profile (2021–2026)

**Role:** Solution Architect (title on record: *Solution Architect E*, Everyday
Banking Platform, Lloyds Banking Group)

**Positioning:** Solution architect with 18 years of experience, recent 5 years
deep in **Google Cloud (GCP) solution architecture** at Lloyds Banking Group —
spanning **card & payments platform modernisation on GCP** and **GCP-native data
platform / Foundational Data Product** contracts. Evidence appendix at the bottom.

> Source: 150 Confluence pages authored by me on LBG Confluence
> (lbg.atlassian.net) in the 5-year window, plus page content review of ~20 key
> MVDs, KDDs, ADRs and data contracts.

## 1. Snapshot

| | |
|---|---|
| Employer | Lloyds Banking Group (LBG) |
| Value stream | Consumer Relationships — Consumer Servicing & Engagement → **Everyday Banking Platform** |
| Labs / domains | **Debit Card & Payments Lab** (Digital Cards & Ways to Pay), **CDP Lab** (Customer Data / operational data platform) with Comms Lab |
| Programmes (project codes) | AL08169 (Card Controls — Debit Freeze), AL16776 (Card Platform on GCP), AL16992 / CPR703 (PTW GCP journey modernization), AL22853 (ODP / IMI SMS / Tealium / GCP 2.0), GOADCF (CDF delivery), JR098-IN044/IN022/IN040 (CMT features) |
| Artifacts authored | 150+ pages: MVDs, Key Design Decisions (KDDs), ADRs, data contracts, environment/infra docs, TAG minutes, security/DSOC docs |
| Core GCP stack | GKE, Cloud Storage (GCS), BigQuery, Cloud Composer/Airflow, Pub/Sub, Apigee X, Cloud KMS/Vault (HashiCorp), IAM, VPC-SC, Jenkins, Terraform, dbt, Istio service mesh |
| Timeline | 2023–2024: Push to Wallet / Click to Pay → 2024–2025: Card & Wallet GCP journey modernization → 2025–2026: GCP Operational Data Platform + Digital Behaviour Foundational Data Products + CNE 1.0 → Google 2.0/IDP migration |

## 2. Five-Year Arc (evidence-based timeline)

| Period | Domain | What I did |
|---|---|---|
| 2023–2024 | **Digital Card & Wallet (DCWTP)** | Authored MVDs and design docs for **Push to Wallet** (GooglePay Credit/Debit/Unified Push, ApplePay Credit VISA & MasterCard) and **Click to Pay (VISA)**; card-token (OPC) generation & PGP security design; HashiCorp Vault key-management onboarding; CMAS card-system integration options; Card Controls FE (CWA) on GCP; ATM limits & card-freeze fraud journey MVD |
| 2024–2025 | **Card & Wallet on GCP modernization** | **C&L GCP Journey Modernization MVD** (3 tranches: Lloyds Reimagined + CWA GCP migration + co-servicing; CMH 3.0 integration + CWA UI redesign + API GCP migration for debit then credit); PTW GCP Debit Journey Modernization MVD (CMH ApplePay/GooglePay push provisioning); ViewCard/ViewPIN journey modernization; ID & Auth onboarding decision (DP SSO token exchange, JWK PoP); shared **VISA/Fiserv connectivity microservices** decision; TAG/SDF/SDA governance; App 1st C2P registration |
| 2025–2026 | **GCP Data Platform (ODP) & Foundational Data Products** | Microbatch Ingestion Service MVD **on GKE**; Batch Transformation Service on **dbt**; Event Streaming Framework (Pub/Sub); data contracts for **CDMS, IMI SMS, Tealium, Pega, Celebrus** ODPs; Digital Behaviour FDP suite (Session, Event, Visitor Profile, Funnel Progress) with full **ADR baseline**; KDDs for ingestion/curation; **CNE 1.0 → Google 2.0/IDP (VDC-IDP) migration design**; GDW-exit (Group Data Warehouse decommission) readiness; CID engineering standards, DSOC, vulnerability & patch management, Jira hygiene, CDF onboarding |

## 3. Era 1 — Push to Wallet, Click to Pay & Card Controls on GCP (2023–2024)

**Business context:** enable LBG cards (Lloyds, Bank of Scotland, Halifax, MBNA)
in Apple Pay / Google Pay and VISA Click to Pay; make wallet-added cards usable
for **online** (Autofill) transactions, not just offline. Business case
documented in my MVDs: ~3–5% purchase-volume uplift from autofill suggestions;
<100 average online order; 55% of US card transactions in Chrome via Autofill.

### Concrete work

- **Push to Wallet MVDs (5):** GooglePay Unified Push, GooglePay Debit,
  GooglePay Credit, ApplePay Credit (VISA), ApplePay Credit (MasterCard) —
  Android/iOS push provisioning, card registration flows, scheme
  (VISA/Mastercard) & Google OPC handling.
- **GooglePay Unified Push MVD** — full solution design:
  - Android Push Provisioning API extension to enable **FPAN online
    transactions** at card-add time (vs offline-only today).
  - Logical dataflow: NGA (New Generation App) Android → Push to Wallet API →
    **CMAS** (card info, expiry, status) + **OCIS** (product offerings, billing
    address) → device ID/Wallet ID/session ID via Push Provisioning SDK →
    **scheme OPC + Google OPC creation** → PGP-encrypted/signed, Base64-encoded
    payload push.
  - Google OPC encryption/encoding design per Google issuer spec (PGP key
    exchange, non-URL-safe Base64).
  - Scope control MVP = NGA Android, tokenizable debit+credit, 4 brands, "Add to
    GooglePay" digital journey.
- **Security & key management:**
  - **HashiCorp Vault onboarding** (FMO / Push to Wallet application) — CSR
    creation/sharing workflow, environment onboarding.
  - **DG004** — HashiCorp Vault configuration for C2P/P2W credit solution;
    **DG021** — Mastercard Credit key storage options; **"Where should we
    implement PAN encryption logic"** decision; PGP key exchange with Google.
  - **Security assessment** doc: certificate management (Data Security &
    Lifecycle).
- **Click to Pay (VISA):** C2P VISA connectivity options, VISA API call
  catalogue, **VISA OPC generation for GooglePay**, CMAS requirements for C2P,
  C2P/P2W credit-card design decision, issuer-offered C2P requirement for Visa
  cards issued in Europe (2024).
- **CMAS dependency analysis** — "Understand what's needed to remove our
  dependency on CMAS"; CMAS & CTM table mapping; CMAS SOAP API consumption
  pattern (ATM limits).
- **Card Controls on GCP:**
  - **Card Controls FE CWA on GCP MVD** — client-side CWA (Card Wallet
    Application) hosting on GCP.
  - **Card Controls — Freeze Card — Fraud Journey (MVD)**; **ATM limits — CMH
    integration options + MVD**; ID & Auth approach from CWA/NGA (**DG020**).
  - Google Sandbox end-to-end connectivity testing for provisioning flows.

**Outcome/impact:** wallet & C2P journeys delivered with GCP-hosted services,
scheme-token security design (OPC, PGP, HSM-backed key storage via Vault), and a
card-platform footprint (AL16776) "card microservices behind Apigee X" in
ServiceNow CMDB.

## 4. Era 2 — Card & Wallet GCP Journey Modernization (2024–2025)

**Programme:** "Card Platform on Google Cloud" (AL16776) — moving card management
journeys (Controls & Limits, Push to Wallet, ViewCard/ViewPIN, Click to Pay) from
legacy on-prem to **GCP microservices behind Apigee X**, with modern ID & Auth and
reusable cross-feature services.

### Concrete work

- **MVD — C&L GCP — Journey Modernization** (flagship document, 45 KB):
  - 3-tranche release plan: T1 Lloyds Reimagined + CWA GCP migration +
    co-servicing (debit & credit) → T2 CMH 3.0 integration + CWA UI redesign +
    **API GCP migration (debit)** → T3 same for credit.
  - As-is/to-be solution design with full sequence diagrams: NGA app → DP SSO
    (IBSession cookie) → client CWA → **Galaxy Platform token provider** (SAML
    assertion) → **Apigee X gateway** → Card Controls channel API → core service
    → **CMH crypto service**, CMAS bridge proxy, APIC internal, CMAS, Audit API,
    VISA API, CMS (IIS).
  - Governance trail: **Digital TAG** reviews (08/14/2024, 12/16/2024,
    01/21/2025, 03/11/2025), **CoDA Workbench security design** (IN04 security
    design artefact), **Cloud Solution Design Assurance (SDA)** checklist,
    **Apigee X solution design approved in API Cloud DWG**, DPSSO token-exchange
    pattern onboarding.
- **MVD — PTW GCP — Journey Modernization** (CPR703/AL16992): transition-state
  design with CMH 3.0 integration first, then CMH ApplePay/GooglePay **debit**
  push provisioning; Jira feature mapping (JK098-IN022 debit, IN040 credit);
  SDF-endorsed security design; ApigeeX solution design template; ID & Access
  token client onboarding (DPSSO token exchange).
- **ViewCard / ViewPIN Journey Modernization MVDs** (2025) — card-detail journey
  modernization on GCP.
- **Key design decisions I authored (KDDs):**
  - **C&L GCP — ID & Auth Onboarding Options** (status: APPROVED): full
    10-criteria analysis (traceability/SNOW app ID, CWA sharing, parent journey,
    sub/aud, category, scaling rates, platform, AuthZ app ID, dPoP vs JWK-based
    PoP) → onboarding pattern for multiple journeys under one parent (CMH).
  - **GCP — VISA/Fiserv Connectivity Service Options**: reusable **common
    connectivity microservices** shared across feature teams; shared Vault
    namespace pattern `gcp/{bldint|pre|prd}/XXXXXXX_AL16776` for external
    certificates (SEC-P4 external certificate management pattern); trade-off
    analysis of coupling, certificate blast radius, DEV/OE conflicts.
  - **C&L GCP — Data Source options** (`ns-kcl-dmn01-cptmsa-visa-connect-core`,
    `/…fiserv-connect-core`, `cpt-visa-connect-ms`, `cpt-fiserv-connect-ms`),
    namespaces integration options; transition-state options. `[?]`
- **PTW DSOC suite** (2024): **Data Lineage, Data Quality, Data Controls, Data
  Monitoring** — data security & lifecycle governance for the wallet data flows.
- **Operational readiness:** SIW0011330 controls (application alerting setup),
  SSL/TLS certificate issuance per policy; daily dashboard & journey inventory
  for DCWTP; Swagger/API design docs (e.g., `cpt-cc-debit-card-freeze-ch-ms`).
- **App 1st** (Apple-side program, 2024): architectural decisions, C2P
  integration options, MVD for App 1st C2P registration.

**Outcome/impact:** delivered the architecture for multi-tranche GCP migration of
the entire card-journey estate (controls, limits, freeze, wallet provisioning,
view card/PIN) with approved ID & Auth pattern, shared scheme-connectivity
services, and full TAG/SDF/SDA sign-off trail.

## 5. Era 3 — GCP Operational Data Platform & Foundational Data Products (2025–2026)

**Context:** Everyday Banking Platform is exiting the **GDW (Group Data
Warehouse)** and building a **GCP-native Operational Data Platform (ODP)** and
**Foundational Data Products (FDPs)** — with CDF Lab as delivery lab (with Comms
Lab). CNE 1.0 (GCP foundation v1) must be **decommissioned by end-2026**;
strategic target is **Google 2.0 / IDP (VDC-IDP)**.

### 5.1 Platform architecture (services & patterns)

- **Microbatch Ingestion Service MVD [using GKE]** — the shared batch ingestion
  design:
  - GKE-hosted ingestion services, GCS landing zones, BigQuery targets, Cloud
    Composer/Airflow orchestration, Jenkins CI, IaC deployment paths; FinOps
    section (rightsizing, autoscaling, storage tiering/lifecycle, tagging, quota
    limits).
  - Pattern library applied: **Authorised View data-access pattern**, BigQuery
    dataset/table deployment via Jenkins, DATA-P3 "System of Insight", **dbt
    transformation framework**, Data Product Pipeline Patterns (EA), strategic
    data transfer patterns (on-prem → cloud → SaaS).
- **Batch Transformation Service [using dbt]** — curation design incl.
  **delta-load audit & transformation plan (ODP → FDP)** and audit-table design.
- **Event Streaming Framework** — Pub/Sub-based streaming environment design
  (environment details doc).
- **Shared ingestion assets reuse:** CMS ingestion pipeline reused for IMI SMS
  MVP (KDD1); Celebrus batch ingestion service design decisions (application
  hosting options, integration & pipeline options, **GCS bucket lifecycle
  policy**, **Airflow DAGs in GitHub repo deployed to ap-peccon Composer**).
- **Pega ODP KDDs** (5): contact-history file checkpoint, **data sync vs File
  Transfer Hub (SFG)**, common base container image, dedicated vs shared GCS
  buckets, dedicated vs shared processing images, GCS bucket lifecycle policy.
- **CID (Customer Identity Data) engineering foundations** I authored:
  engineering hub, coding standards & naming conventions, ingestion & curation
  Jira hygiene, **vulnerability log + vulnerability & patching management**,
  sensitive-data governance summary (Celebrus 9.9), approved-data-source control,
  DSOC, CDF onboarding welcome hub, infra & repo wiki.

### 5.2 Data products & contracts (per source)

Authored formal **GCP data contracts** and MVDs for each ODP family:

| ODP / source | Artifacts |
|---|---|
| **CDMS** | CDMS-ODP(GCP) data contract (technical requirements incl. BigQuery/Composer/GKE specifics); KDD2 **historical data transfer GDW→GCP**; KDD6 dedup approach in ingestion |
| **IMI SMS** (O2SMS CVM DATA / TRM SMS Feedback) | IMI SMS-IMS SMS ODP(GCP) data contract (24 KB: source extracts, BigQuery target tables, Composer orchestration, GKE, SLA/volume); MVD: KDD hub with 13 KDDs (pipeline reuse, RACI Comms Lab/CDF Lab, scope tiering, XML handling, GCP foundation) |
| **Tealium** | AL22853; Tealium ODP MVD (tech/infra design, environment details doc) |
| **Pega / Celebrus** | ODP KDDs, ingestion service design decisions, sensitive data governance |

### 5.3 Digital Behaviour Foundational Data Products (flagship 2026 work)

Authored the **full ADR baseline (ADR-001 … ADR-013)** and entity specs for the
Digital Behaviour FDP layer on BigQuery:

- **Entities:** SESSION, EVENT (consolidated interactions), VISITOR_PROFILE,
  FUNNEL_PROGRESS — plus governance/NFR/usage-guidance/SLA/release-readiness
  (RAG DoD) docs for the FDP family.
- **Representative decisions I drove:**
  - **ADR-001**: nested STRUCT/ARRAY patterns (BigQuery denormalization: session
    device, marketing, privacy consents, visitor devices,
    content_classification, funnel_context).
  - **ADR-002**: event consolidation — 3 interaction tables
    (clicks/forms/fields) → single EVENT with `event_type_code` discriminator.
  - **ADR-006**: partition & cluster strategy per entity (e.g., EVENT
    partitioned by `DATE(event_timestamp)`, clustered `session_identifier`,
    `visitor_identifier`, `event_type_code`).
  - **ADR-007**: identifier & key strategy — replaced custom 4-tier COALESCE
    visitor key and cookie-anchored sessionization with **Adobe-native canonical
    keys** (`post_visid_high`/`low` visitor; `visit_num` + `visit_start_time_gmt`
    session), achieving **exact Adobe Analytics dashboard parity**, removing
    window-function sessionization compute cost, and retaining legacy keys as
    `resolved_*` columns for reconciliation (full risk/mitigation table;
    superseded-decision log Apr 2026).
  - **ADR-003 amendment** — funnel context populated directly from native Adobe
    props (evar71–evar88) instead of reference joins.
- **KDDs for the FDP layer:** daily batch for CID curation FDP; FDP-layer data
  product structure; CI-NBX authorised-view placement; NBX metrics tech-debt
  (tactical).

### 5.4 Platform migration — CNE 1.0 → Google 2.0 / IDP

- **KDD13 (with lead SA, co-owned with CNE/GCP Foundation):** "IMI SMS target GCP
  foundation — CNE 1.0 (MVP) vs Google 2.0/IDP (strategic)". Recommendation:
  **deliver Tier-1 MVP on CNE 1.0** to protect the Q3-2026 GDW-exit date and
  reuse proven CDMS pipeline assets, with a **Google 2.0 migration pre-plan** and
  1.0 treated as a time-boxed exception; option matrix with pros/cons and
  decision gates (2.0 backbone GA, CID-onboardable landing zone,
  golden-path/Terraform readiness).
- **AL22853 GCP2.0 Migration design (2026):** phased **parallel-run migration of
  the full IMI SMS ingestion + curation estate** from CNE 1.0 to Google 2.0/IDP —
  explicit temporary legacy bridge (family-by-family cutover, stable data-product
  contracts, managed services + IaC), scope tiering (ingestion → curation →
  ops/monitoring → backfill extensions), cutover/rollback/parallel-run criteria,
  DR/resilience/capacity plan.
- **As-Is Architecture Discovery for GDW ODPs** — discovery of existing GDW ODP
  flows feeding the migration inventory.

## 6. Representative Design Decisions (quick-reference log)

| Decision | Area | Position chosen | Why (abridged) |
|---|---|---|---|
| GooglePay Unified Push MVD | Wallet | FPAN online-enabled push provisioning, NGA Android MVP, 4 brands | Unlock online Autofill revenue uplift (3–5% est.) |
| PAN encryption placement / DG021 key storage | Wallet security | Scheme-compliant key storage via Vault-based management | PCI/PAN handling, rotation control |
| C2P/P2W credit design decision | Payments | Credit-card C2P + P2W on shared card platform | One platform for VISA & MC |
| ID & Auth onboarding (C&L) | Auth | New IDA client under shared CMH parent; JWK PoP; no dPoP reuse | Reuse across teams; central cert rotation |
| VISA/Fiserv connectivity | Platform reuse | Common connectivity microservices + shared Vault cert namespace | Reuse across teams; central cert rotation |
| Card freeze journey (AL08169) | Fraud | GCP microservices behind Apigee X + CMH crypto | Modern fraud journey |
| dbt delta-load audit plan (ODP→FDP) | Data platform | Audited delta curation with audit tables | Traceable ODP→FDP lineage |
| GCS bucket lifecycle policies (x3 KDDs) | Data platform | Enforced lifecycle/tiering on landing & curate zones | Cost control + compliance retention |
| Celebrus hosting KDDs | Data platform | GKE batch ingestion, shared base image, GitHub-Composer DAGs | Golden path, repeatability |
| IMI SMS historical transfer GDW→GCP | Migration | One-time backfill + ongoing ODP streams | GDW exit without coverage gap |
| FDP identifier strategy (ADR-007) | Data products | Adobe-native canonical keys + `resolved_*` legacy columns | Dashboard parity, lower compute, reconciliation clarity |
| CNE 1.0 vs Google 2.0/IDP | Platform | MVP on 1.0 (time-boxed) + 2.0 pre-plan; estate migration to IDP | Protect GDW-exit date, stay strategic |

## 7. Technology stack (as evidenced in my designs)

- **GCP:** GKE (batch & API services), Cloud Storage (GCS) + lifecycle policies,
  BigQuery (ODP/FDP, partitioning/clustering, authorised views), Cloud Composer
  (Airflow) — incl. ap-peccon composer, Pub/Sub (event streaming framework),
  Apigee X (API gateway), Cloud IAM + Workload Identity patterns, VPC-SC, Cloud
  KMS / HashiCorp Vault (secrets, scheme keys, external certs), Cloud
  Logging/Monitoring (alerting controls SIW0011330), Terraform/IaC golden paths,
  Istio (service mesh/WSS for scheme connectivity), GitHub (DAG storage/deploy),
  Jenkins CI.
- **Patterns & tooling:** dbt (curation framework), Swagger (API contracts),
  C4/PlantUML (solution diagrams). `[?]`
- **Enterprise integration:** CMAS/CMH (card admin & management hub), OCIS, APIC
  internal, Galaxy Platform (token/SAML), DP SSO (IBSession), JWK PoP/dPoP
  analysis, CMS (IIS), ServiceNow (CMDB, business applications
  AL16776/AL16992), CODA Workbench (security design), ApigeeX DWG Forum.
- **Scheme/wallet:** VISA (Click to Pay, OPC generation), Apple Pay
  (AppleVisa/AppleMC push provisioning, CMH).
- **Data domains:** Adobe Analytics (TMS, evar/prop model), Tealium, CDMS, IMI
  SMS (O2SMS), Pega, Celebrus, NBX.

---

## 8. What this says about me (profile bullets, ready to reuse)

- **GCP solution architecture at bank scale:** authored MVDs/KDDs for card &
  payments journeys and a GCP-native operational data platform; comfortable
  across GKE, GCS, BigQuery, Composer, Pub/Sub, Apigee X, IAM, KMS/Vault.
- **Design-decision discipline:** consistent MVD → KDD/ADR → data-contract
  artefact chain, with options analysis, trade-offs, risk/mitigation, and
  governance sign-off (TAG, SDF, SDA, ARC, ApigeeX DWG).
- **Data architecture depth:** BigQuery physical design (nested STRUCT/ARRAY,
  partition/cluster), identifier strategy that achieved exact Adobe dashboard
  parity, delta-load audit patterns, authorised-view serving, GCS
  lifecycle/FinOps.
- **Payments security:** PAN/OPC handling, PGP with Google, HSM/Vault key
  storage, scheme connectivity (VISA/Mastercard), ID & Auth (SAML, JWK PoP,
  dPoP), certificate lifecycle.
- **Migration & modernization:** 3-tranche on-prem → GCP journey migration,
  CMH 3.0 integration, GDW-exit readiness, CNE 1.0 → Google 2.0/IDP parallel-run
  migration design with rollback/cutover criteria.
- **Operating model:** RACI across labs (Comms Lab/CDF Lab), Jira hygiene,
  vulnerability & patch management, onboarding hubs, release readiness (RAG DoD),
  SLA/NFR/usage guidance for data products.

## 9. Evidence appendix — key Confluence pages (all authored by me)

Base URL: `https://lbg.atlassian.net/wiki`

**Era 1 — Wallet / C2P / Card Controls**

- Push to Wallet — GooglePay Unified Push (MVD) — `/spaces/DCP2W/pages/175429432`
- Push to Wallet — GooglePay Unified Push — Technical Requirements — `/spaces/DCP2W/pages/175429437`
- Push to Wallet — GooglePay Debit (MVD) — `/spaces/CSCSL/pages/303724559`
- Push to Wallet — GooglePay Credit (MVD) — `/spaces/DCP2W/pages/175429178`
- Push to Wallet — ApplePay Credit — VISA (MVD) — `/spaces/CPWA/pages/117146102`
- Push to Wallet — ApplePay Credit — MasterCard (MVD) — `/spaces/CPWA/pages/117146086`
- GooglePay push provisioning flow — Integration Plan — `/spaces/CSCSL/pages/303697232`
- VISA OPC generation for GooglePay — `/spaces/CSCSL/pages/304003529`
- Click to pay — VISA connectivity options — `/spaces/CSCSL/pages/303662834`
- HashiCorp Vault Onboarding (FMO — Push To Wallet) — `/spaces/CSCSL/pages/303663084`
- Where should we implement PAN encryption logic — `/spaces/CSCSL/pages/303639458`
- Card Controls — Freeze Card — Fraud Journey (MVD) — `/spaces/CSCSL/pages/303690160`
- Card Controls — ATM Limits — MVD — `/spaces/DCP2W/pages/175428483`
- Google Sandbox End to End Connectivity — `/spaces/DCWP1/pages/117165638`

**Era 2 — Card & Wallet GCP modernization**

- MVD — C&L GCP — Journey Modernization — `/spaces/DCWP1/pages/117165638`
- MVD — PTW GCP — Journey Modernization — `/spaces/DCWP1/pages/117146947`
- MVD — ViewCard — Journey Modernization — `/spaces/CPWA/pages/117146947` `[?]`
- MVD — ViewPIN — Journey Modernization — `/spaces/DCWP1/pages/117165039`, `/117171576`
- C&L GCP — Technology & Architecture Decisions (hub) — `/spaces/DCWP1/pages/117193933`
- C&L GCP — ID&Auth Onboarding Options — `/spaces/DCWP1/pages/117146333`
- GCP — VISA/Fiserv Connectivity Service Options — `/spaces/DCWP1/pages/117146350`
- PTW DSOC — Data Lineage / Quality / Controls / Monitoring — `/spaces/CPWA/pages/117159695`, `/117158717`, `/117158721`, `/117158750`
- C&L — Governance — `/spaces/DCWP1/pages/117162886`
- 2024/2025 Digital TAG Agenda & Minutes (authored) — `/spaces/DCWP1/pages/117157775`, `/117163713`, `/117162413`

**Era 3 — ODP / FDP / GCP 2.0**

- Microbatch Ingestion Service MVD *[using GKE]* — `/spaces/PEC/pages/553816100`
- Batch Transformation Service *[using DBT]* — Audit Table — `/spaces/PEC/pages/480167373`
- Event Streaming Framework | Environment Details — `/spaces/PEC/pages/632217974`
- 01.4.1 CDMS — CDMS ODP (GCP) Data Contract — `/spaces/PEC/pages/573313781`
- 01.8.1 IMI SMS — IMS SMS ODP (GCP) Data Contract — `/spaces/PEC/pages/783537883`
- 01.8.2 IMI SMS ODP — Key Design Decisions (hub + KDD1–13) — `/spaces/PEC/pages/783446815`, KDD13 `/spaces/PEC/pages/841653221`
- 01.6 CI | AL22853.Tealium ODP MVD — `/spaces/PEC/pages/53415366`
- 02.2 | Digital Behaviour FDPs | ADRs — `/spaces/PEC/pages/689197079`
- Digital Behaviour FDP entities: Session/Visitor Profile/Event/Funnel Progress — `/spaces/PEC/pages/690783938`, `/690849198`, `/690882478`, `/691262255`
- Digital Behaviour FDP governance suite (NFR, usage guidance, SLA, release readiness RAG DoD) — `/spaces/PEC/pages/857097445`, `/857142395`, `/857184602`, `/857145099`, `/859126255` `[?]`
- 05.2.8 Tactical | NBX Metrics | Tech Debt — `/spaces/PEC/pages/886306519`
- Celebrus Batch Ingestion Service — Design Decisions (KDDs) — `/spaces/PEC/pages/135495383`
- Pega ODP Key Design Decisions (KDD1–5) — `/spaces/PEC/pages/135487417`
- As-Is Architecture Discovery for GDW ODPs — `/spaces/PEC/pages/541026763`
- 05.8.2 CI AL22853.GCP2.0 Migration — `/spaces/PEC/pages/912511651`
- CID | Engineering / DSOC / Coding Standards / Vulnerability & Patching / Jira Hygiene / Onboarding — `/spaces/PEC/pages/1355502557`, `/660286228`, `/527622906`, `/135453269`, `/135450779`, `/135346053`

## 10. Method & coverage notes

- **How this was built:** queried LBG Confluence (`lbg.atlassian.net`) for all
  pages where I am the creator, `created >= 2021-09-02` → **150 pages**, then
  read ~20 key MVDs/KDDs/ADRs/data contracts for detail. Project codes, tranche
  plans, decision tables and technical requirements above are quoted from those
  documents.
- **Coverage gap:** the oldest page I authored on this Confluence site dates to
  **May 2023**. Work from 2021–early 2023 (likely the early Click to Pay / Push
  to Wallet credit-card phase) was documented on the legacy pre-cloud LBG wiki
  and is **not visible** via this access — the era-1 dates above are therefore
  the evidenced lower bound. If you have that legacy wiki, a second pass can
  backfill 2021–2022.
- **Role framing:** I am the *creator* of every page listed; on some artefacts
  (e.g., KDD13) a Lead SA is co-owner — ownership of the decision text is
  shared, my authorship is on record.
- Figures like the 3–5% autofill uplift and $100 AOV are **as stated in my own
  MVD business-case sections** (source: Google Pay Unified Push MVD), not
  independently verified.

---

## What this changes, and what it contradicts

Read alongside `data/career-facts.md`. Four things this document settles, three
it puts in doubt.

**Settled — folded into the career documents:**

1. **There is a title on record: "Solution Architect E"**, Everyday Banking
   Platform, Consumer Relationships value stream. Previously the documents
   carried only the TCS grade (C3B) and the generic role name.
2. **The Jul 2025– platform work finally has substance.** It was the thinnest
   section of every document — six `[N]` placeholders and not one named
   artefact. It now has: the Microbatch Ingestion Service on GKE, the dbt Batch
   Transformation Service, the Pub/Sub Event Streaming Framework, five ODP data
   contracts, the ADR-001…013 Digital Behaviour FDP baseline, and the CNE 1.0 →
   Google 2.0/IDP parallel-run migration design against a **Q3-2026 GDW-exit
   date**.
3. **ADR-007 is the best single achievement line in the whole 2025–26 body of
   work** — replacing a custom 4-tier COALESCE visitor key and cookie-anchored
   sessionization with Adobe-native canonical keys, achieving *exact* Adobe
   Analytics dashboard parity while removing window-function compute. It has a
   before, an after, a measurable outcome and a named trade-off. Use it.
4. **The card work is three distinct eras, not one blob.** Wallet/C2P
   (2023–24) → journey modernisation to GCP behind Apigee X (2024–25) → data
   platform (2025–26). The resume had the first two merged into a single
   "Digital Cards Modernisation" block.

**In doubt — he needs to confirm:**

5. **Confluent Kafka and IBM Tivoli Workload Scheduler.** Both are prominent in
   the current resume (summary, first bullet, technical table). **Neither
   appears anywhere in this 150-page evidence base.** The streaming design he
   documents is **Pub/Sub**; the orchestrator throughout is **Cloud
   Composer/Airflow**. → open question in `state/decisions.md`.
6. **When the LBG engagement actually started.** The header says 2021–2026 and
   the Confluence query used `created >= 2021-09-02` — his TCS joining date —
   so the 5-year window is *assumed*, not evidenced. Section 10 is explicit that
   the **oldest page he authored dates to May 2023**, with 2021–early 2023 on a
   legacy pre-cloud wiki he can no longer see. `career-facts.md` says LBG
   "2022 – present". Either he was on LBG from Sep 2021 (making it 5 years) or
   there was a bench/other engagement first (making it 4). He knows; the
   documents should not guess.
7. **The award-winning fraud journey.** `career-facts.md` credits Banking Tech
   Awards 2024 and Card & Payments Awards 2025 to "the self-serve fraud
   journey". This document places that work as **Card Controls — Freeze Card —
   Fraud Journey, programme AL08169**, GCP microservices behind Apigee X. Almost
   certainly the same thing, and a far better-evidenced way to describe it — but
   confirm the citation names that journey before the resume says so.

**Still no numbers — and now we know why.** Section 10 says it plainly: the only
figures in 150 pages are the **3–5% autofill uplift** and **$100 average online
order**, and both are *his own MVD business-case assumptions, not measured
outcomes*. That settles a question that has been open since Aug 2026: the six
missing platform figures (Kafka throughput, pipeline count, dbt model count,
BigQuery cost reduction, deployment time, environment count) are **not
recoverable from Confluence**. They have to come from his own recollection, a
Jira/Looker export, or a colleague. Until then, every rendered document must
carry the achievement *without* the number — which ADR-007, the GDW-exit date and
the three-tranche migration all let it do.

**Do not put the 3–5% figure on a resume as a delivered result.** It is a
business-case estimate he authored. "Built the case for a 3–5% purchase-volume
uplift" is honest; "delivered a 3–5% uplift" is not.
