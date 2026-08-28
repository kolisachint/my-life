# Job options

_Rewritten 2026-08-27 after Gemini said he is underpaid. **Gemini is directionally
right and my earlier framing was too narrow.** Updated 2026-08-28 with the July
2025 TCS profile card — the awards and the payments specialisation._

## The correction

I said income was not the binding constraint, because ₹36.99 L sits above the 75th
percentile for "Solution Architect, Pune". That was **true of the wrong cohort** —
a generic title spanning all experience levels and, crucially, all company tiers.

The useful cohort is **senior GCP / data architect at a product company or GCC**,
and against that he is clearly below band.

| Cohort | Range | Where ₹36.99 L sits |
| --- | --- | --- |
| Solution Architect, Pune (what I used) | avg ₹26.8 L, 75th ₹35 L | **above 75th pct** |
| Data Architect, India | avg ₹27.3 L, Cloud DA 75th ₹38.9 L | around 75th pct |
| Sr. Cloud Architect, India | avg ₹38.6 L, range ₹27–100 L | at the average |
| **Senior GCP architect, product/GCC** | **₹55–95 L** | **well below** |
| Google Sr. Architect, India | avg ₹61 L, range ₹50–90 L | well below |

## But TCS is not shortchanging him

| TCS grade C3B (levels.fyi) | ₹ |
| --- | ---: |
| Median total comp | 22.1 L |
| Range | 12.1 – 30.6 L |
| **Him** | **36.99 L** |

He is **above the top of his own grade's band.** So internal negotiation will not
fix this — there is nothing left to extract. **The constraint is the company tier,
not the employer.** Only a move changes it.

At 15–25 years' experience the market spread is roughly 9× and is driven by
"company tier and specialisation" rather than by the individual. He is in the
services tier.

## What a tier move is worth

| Move to | Gross gain | Net gain/month |
| --- | ---: | ---: |
| ₹45 L | +₹8.0 L | **+₹46,700** |
| ₹50 L | +₹13.0 L | **+₹75,900** |
| ₹55 L | +₹18.0 L | **+₹1,05,000** |

Against every other lever in this repo: spending gap ₹49,000, Lakeshore ₹15,000,
housing ₹6,000–16,000.

**The job move is the biggest lever. I was wrong to demote it.**

Also note ₹8.14 L of his current CTC is **variable**. An offer with a higher fixed
component improves his position by more than the headline difference suggests.

## Where I would temper Gemini

₹55–95 L is the top of the market and mostly describes people at Google-tier GCCs,
usually with product-company pedigree. Realistically:

- **18 years entirely in services** — Mahindra Satyam → Cognizant → Sears → TCS.
  Sears Holdings India was a captive, so there is genuine GCC exposure, but no
  product-company name on the CV.
- **Significant legacy stack** alongside the GCP work — Teradata, DataStage,
  Ab-Initio, Informatica.
- **Certifications are 15–20 years old.** GCP PCA is not yet booked.

**Realistic first move: ₹45–55 L.** ₹60 L+ needs the AI/GenAI angle to land — and
he has real material there (the Rust embedding library, the hoo-code semantic
search work) that almost no competing candidate will have.

## The actual blocker is not the market — updated 2026-08-28

**Originally:** his resume was last modified 14 February 2022, omitted TCS
entirely, still showed Sears as "Till Date", and claimed 14 years against 18.5.
He had no instrument with which to measure the market.

**Now:** he has produced a **TCS consultant profile card, July 2025**
(→ `tcs-profile-2025.md`). It corrects all three factual defects. It is still not
a market resume — it names clients rather than employers, gives no continuous
employment history, carries TCS branding and a "Classification: Public" stamp,
has no AI/GenAI content, and quantifies exactly one achievement.

**The instrument problem is half solved: the material is current, the document is
not sendable.** Assembling the card into a market resume is now a half-day of
work rather than an archaeology project.

### Two things the card adds that change the pitch

**1. Two external awards.** The self-serve fraud journey he architected at Lloyds
won at the **Banking Tech Awards 2024** and the **Card & Payments Awards 2025**.
Nothing in this repo knew about these. On a CV that is otherwise eighteen years of
services delivery, dated third-party recognition is the single most differentiating
line available — it belongs above the fold, not in a footnote.

**2. He is a payments architect, not a generic data architect.** Four years at a
UK tier-1 bank on Digital Cards — Add to Wallet, card controls, View PIN, fraud
journeys, on-prem → GCP. That is a **domain specialisation that prices above the
generic band** and it opens a target list this file has not been working:

| Target class | Examples of the type |
| --- | --- |
| Card networks and payment processors | Visa, Mastercard, PayPal, Adyen, Stripe — all with large India engineering centres |
| Banking GCCs in Pune | Barclays (he already has the history), Deutsche, HSBC, Citi, Mastercard |
| Indian fintech at scale | PhonePe, Razorpay, Juspay, Pine Labs, CRED |

The ₹45–55 L realistic band still holds, but the payments angle is the more
credible route to the top of it than the generic-data-architect framing was.

### The certification question, unresolved

The card claims **Google Cloud Certified Professional Data Engineer**. The Dropbox
evidence behind this repo shows Coursera GCP specialisations and describes his
certifications as all old, with PCA in progress and unbooked. Either:

- **He holds the PDE.** Then "certifications are 15–20 years old" above is wrong,
  the PCA would be his second Google cert, and the story is materially stronger.
- **The card is describing the Coursera specialisation.** Then a client-facing
  TCS document overstates a credential, which is a risk worth closing quietly.

This needs one answer from him before the resume is written either way.

## Order of work

| When | Do |
| --- | --- |
| Week 1 | **Rewrite the resume from the July 2025 card** — reorganise engagement-by-client into employer-by-period, strip TCS branding, lead with the **two awards** and the $600K GCP cost saving, then the Teradata→BigQuery migration. |
| Week 1 | Settle the **PDE certification** question — held, or not held. It changes the top of the resume. |
| Week 1 | Book the GCP PCA exam — a paid, dated slot. |
| Weeks 2–3 | Push the Rust embedding library to GitHub with a design-decisions README. It is the differentiator. |
| Weeks 3–6 | Apply to 20 GCC and product targets, **with office locations recorded** — that list feeds the housing decision. |
| Weeks 6–12 | Work referrals, not portals. Senior roles move that way. |
| Ongoing | Let the market answer the question. Offers settle it; neither model's opinion does. |

## The honest summary

Both readings were true of different questions. Mine: *is he well paid for this
title in this city?* Yes. Gemini's: *could he earn materially more elsewhere?*
Also yes, and that is the question that matters for his plan.

The way to resolve it is not to ask another model. It is to fix the resume and
take four interviews.
