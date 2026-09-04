# Public bio — kolisachint.github.io, speaker bios, award entries

> **Version 3 of 5 — for anyone, anywhere.** No client names, no employer
> confidential detail, no phone number, no address. Assume it is indexed by
> Google and read by people who are not hiring you.
>
> **There is a rendered paste sheet of this:**
> `notes/Goals/Career/Sachin_Koli_Public_Bio.html` → `.docx`, built with
> `bin/docx bio`. Use it to review and correct the wording in Word; the bios
> still get pasted into a site or a programme, and the file is never sent.
> Change one and change the other — this file is the master.

---

## One-line bio
*(conference programme, podcast blurb, social bio)*

```
Solution architect. I build the cloud data platforms large enterprises run on,
and ship the applied-AI tooling that sits on top of them.
```

## Short bio — the ~50-word slot
*(speaker introduction, panel listing, award submission — **62 words** as written)*

```
Sachin Koli is a solution architect and Google Cloud Certified Professional Data
Engineer with eighteen years in enterprise data and cloud. He architects the
real-time streaming and batch data platform for a UK tier-1 retail bank, on
Kafka, BigQuery, dbt and Airflow. The self-serve fraud journey he designed won at
the Banking Tech Awards 2024 and the Card & Payments Awards 2025.
```

## Medium bio — the ~150-word slot
*(personal site "About", meetup organiser, guest post byline — **162 words** as written)*

```
Sachin Koli is a solution architect based in Pune, India, and a Google Cloud
Certified Professional Data Engineer, with eighteen years spent building the data
and cloud platforms underneath large enterprises.

He currently architects the batch and real-time streaming data platform for a UK
tier-1 retail bank — event-driven ingestion on Confluent Kafka, orchestration
across Cloud Composer and a legacy enterprise scheduler, modelling in BigQuery
and dbt, provisioned end to end with Terraform. Before that he led the bank's
digital cards modernisation onto Google Cloud; the self-serve fraud journey he
architected was recognised at the Banking Tech Awards 2024 and the Card &
Payments Awards 2025.

Earlier he built enterprise data platforms across retail, telecom and banking,
including a Teradata-to-BigQuery lake migration and a customer preference API
that removed $600,000 a year in operating cost.

He also ships open-source AI tooling — a terminal coding agent published to npm,
and Rust libraries for embedding search, speech recognition and agent web
retrieval. github.com/kolisachint
```

## Long bio — the site's About page

```
I am a solution architect. For eighteen years I have worked on the layer most
people never see: the data platforms, pipelines and APIs that make a bank's app
show you the right number, or a retailer's email arrive with the right offer.

What I do now is data infrastructure at scale. I architect the batch and
real-time streaming platform for a UK tier-1 retail bank — events arriving
through Kafka, batch work orchestrated across Cloud Composer and a legacy
enterprise scheduler, everything modelled in BigQuery and dbt, and the whole
estate provisioned through Terraform rather than by hand. The genuinely hard part
is not any single tool. It is making a modern cloud stack and a twenty-year-old
on-premise estate agree with each other, reliably, every night, without either
side pretending the other does not exist.

Before the platform work I spent four years on payments at the same bank: first
getting its cards into the wallet on your phone and into click-to-pay checkout,
then moving the whole set of card features — freezing a card when you have
mislaid it, changing a limit, looking up your PIN — from on-premise systems onto
cloud microservices.
The piece I am proudest of is a self-serve fraud journey that let customers
handle a fraud report themselves instead of waiting in a call-centre queue. It
won at the Banking Tech Awards in 2024 and the Card & Payments Awards in 2025.

Earlier still, twelve years of enterprise data. I migrated a retailer's data lake
off Teradata onto BigQuery. I built a customer preference API on GCP that served
millions of people and took six hundred thousand dollars a year out of the
running cost. I built enterprise warehouses for a national telecom operator, and
unified a global bank's data across several African countries into something you
could actually report on.

Lately I have been pulling hard on the AI thread, in the open. I publish a
terminal coding agent to npm — deterministic by design, with a permission gate on
every edit and a unified API across more than twenty-five model providers. Under
it sits Rust I wrote myself: an embedding search engine running MiniLM through
ONNX with an approximate-nearest-neighbour index built from scratch and keyword
fusion on top, offline speech-to-text, and a web fetcher that collapses links to
single tokens so an agent's context is not spent on URLs.

None of that started as a career move. I wanted to understand the mechanics
rather than call somebody's API. But it is the direction the platform work points
anyway: the warehouses and streams I design are exactly the substrate retrieval
and machine learning need, and I would rather build that layer than hand it to
someone else.

I studied Computer Science and Engineering at Walchand College of Engineering,
Sangli, and I am a Google Cloud Certified Professional Data Engineer. I live in
Pune with my wife and two children.

Find me on LinkedIn, or on GitHub.
```

---

## Notes on this version

**No client names, at all.** This is the version a stranger reads. The
descriptors do the work.

**No contact details beyond the public ones.** LinkedIn and GitHub links, and an
email only if you want one on the site. Not the phone number — a public page with
a mobile number on it is a spam magnet, and it is already on the documents that
matter.

**The AI paragraph is the reason to have a personal site at all.** On a resume,
the open-source work is four lines a reader skims. On your own site you can show
it — a post on why HNSW recall behaves the way it does, or what broke when you
ran int8 inference multi-threaded, is worth more than any bullet point and is the
artefact that makes the Data & AI positioning real to someone who has never met
you. You already write this way in your READMEs; the material exists.

**The long bio is deliberately first-person and plain.** A personal site that
reads like a resume is a resume; the point of having one is to sound like a
person. If that feels too informal, the medium bio is the conservative choice and
works fine.

**Award entries** usually want the short bio plus a separate project description
— write that from the fraud-journey material in `resume-recruiter.md`.
