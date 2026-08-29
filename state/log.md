# Session log

Newest first. One entry per session that changed Todoist, a decision, or the plan.

## 2026-08-29 — PDE confirmed, Cisco dropped

Two corrections from him, both applied across all five resumes.

**He holds the Google Cloud Professional Data Engineer certification.**
**Decision I is closed.** My evidence pointed the other way — no certificate
anywhere in Dropbox, and his own 2022 resume listing only the Coursera course —
but the document is simply unfiled. It now sits in the header, summary and
certifications block of every version, and in the LinkedIn headline, where it
replaced "18 yrs enterprise data" (the years are visible from the dates; the
certification is the term recruiters filter on). It also repairs the standing
"certifications are 15–20 years old" criticism — the Oracle and Teradata ones are
old, the headline credential is not.

Three follow-ups: get the credential ID and Credly link onto LinkedIn, file the
certificate in Dropbox, and **check the expiry** — PDE runs two years from issue,
and an expired certification stated as current is worse than omitting it. That
last is now decision **K**.

**Cisco is off every resume.** He no longer remembers the EDW2B work
(Jul 2009 – Nov 2010, via Mahindra Satyam). It is real and appears in his own
2022 resume, so it stays in `profile.md` as history — but a resume line he cannot
discuss is a liability, because an interviewer picks the unfamiliar item
precisely *because* it looks distinctive.

No date gap results: the Satyam block keeps its true employment dates and now
shows Telstra as the client with no per-project sub-dates, with the
Informatica/Oracle→Teradata work folded into the Telstra bullets. **Resume client
list is now five** — Lloyds, Sears, Saudi Telecom, Barclays, Telstra.

## 2026-08-29 — repositioned to Data & AI (same day, after his correction)

He supplied the July 2025 – present workstream and named his own heading: **data
and AI, and he wants to move toward it.** The five resumes had just been built
around *payments architect*. Rewritten, all five.

**Two things he told me that the repo did not know:**

1. **Lloyds is two workstreams.** Digital Cards 2022 – Jul 2025, then a **data
   platform build from Jul 2025** — Confluent Kafka, Cloud Composer/Airflow,
   IBM Tivoli Workload Scheduler, BigQuery, dbt, Terraform, CI/CD. Same client.
   **The July 2025 profile card is therefore already stale** on his newest and
   most marketable work.
2. **The direction is data and AI**, not payments. Payments is demoted to a
   domain credential across every document.

**Where I did not simply comply.** The half he asked for is not one thing:

| | Status |
| --- | --- |
| **Data** | **Earned.** The Jul 2025 platform is current, modern and marketable. It now leads all five documents. |
| **AI** | **A direction, not experience.** That workstream contains no AI whatsoever — no models, no ML pipelines, no GenAI, no serving. |

His only AI material is the **Rust embedding library** and **semantic code
search**, both his own time, **both unpublished**. So the documents headline
"Data & AI Platforms", sell the data platform on its merits, carry the AI
material honestly in an Independent Engineering section, and claim nothing that
would collapse in a technical screen. He picked that framing from three options.

**The gating action is publishing the Rust library.** `decisions.md` has carried
it since 27 Aug and it has not moved. Until it is public, half of his own chosen
positioning rests on work nobody can open. One weekend, and it is now the
highest-leverage career action in the repo.

**Also flagged: his pasted draft had no numbers in it at all** — the same defect
as the profile card, which quantifies one thing in a full page. Six `[N]`
placeholders are marked in the resumes for him to fill.

Files: all five resumes and their README rewritten; `profile.md` gained a
Direction section and the two-workstream correction; `decisions.md` records the
settled direction and the gating action.

## 2026-08-29 — five resumes, built from the source documents

Read the Dropbox career folder properly for the first time. Egress blocks the
CLIs in this environment exactly as AGENTS.md predicts, so this went through the
Dropbox MCP fallback.

**The tree had been renamed.** It is `/Cloud Documents/`, not `/Digital_Drive/`,
and the career folder is `/Cloud Documents/Sachin/Career/`. Every earlier note
pointed at a path that no longer exists.

**Six factual corrections**, all from offer, appointment and experience letters:

| Was | Actually |
| --- | --- |
| TCS from "~2022" | **29 Sep 2021**, Associate Consultant, Grade C3B |
| Sears "Feb 2018 – ~2022" | **15 Feb 2018 – 27 Sep 2021**; joined Technical Specialist, left Architect |
| Four clients | **Six** — Cisco and Telstra were missing entirely |
| "~18.5 years" | **18 years 8 months** |
| — | **Still Grade C3B after five years.** No movement since Sep 2021 |
| — | **Three outside offers on file** — Wipro 2015, UST 2018, Datametica 2021 |

The C3B finding matters most. He was hired into that grade and has not moved out
of it in four years, which is the strongest evidence yet that the ceiling in
`job-options.md` is structural rather than performance. The offer history is the
counterweight: he is not untested in the market.

**Decision I is close to resolved.** A full Dropbox search found **no Google
Cloud certificate anywhere**. His own 2022 resume lists the GCP credential as a
Coursera specialisation. The July 2025 card's "Google Cloud Certified
Professional Data Engineer" is most likely that course written up as a
certification. Not proof — but no resume carries it until he confirms, because
hiring managers verify certifications and TCS is showing that card to clients.

**Five resumes**, at `notes/Goals/Career/resumes/`, all from one verified fact
set:

| File | For | Clients named |
| --- | --- | --- |
| `resume-recruiter.md` | Named recruiters and hiring managers | Yes |
| `resume-linkedin.md` | The public LinkedIn profile | **No** — anonymised |
| `resume-public.md` | Personal site, speaker and award bios | **No** |
| `resume-ats.md` | Naukri, Workday, Easy Apply — machine-parsed | Yes |
| `resume-referral-onepager.md` | A friend forwarding him to a hiring manager | Yes |

He specified the first three; ATS and the referral one-pager were the two open
slots. Both are real gaps rather than style variants — portals reject designed
documents before a human sees them, and `job-options.md` already concluded senior
roles move by referral.

The governing rule, written into the README: **name clients only in privately
addressed documents.** Lloyds, Barclays, Saudi Telecom, Sears, Cisco and Telstra
all came through services contracts.

**Also stored:** the July 2025 profile card image, now committed at
`notes/Goals/Career/tcs-profile-2025.jpg` — the copy that the permission
classifier blocked yesterday.

**Flagged, not acted on:** `/Cloud Documents/Sachin/DigitalRecovery/` holds
`github-recovery-codes.txt` and `angellist_two_factor_recovery_codes.txt` in
cleartext. Not opened. 2FA recovery codes in plain cloud storage defeat the
second factor — they belong in a password manager.

## 2026-08-28 — the repo is private; the redaction rule is withdrawn

Sachin corrected a standing assumption: **the repo is private and stays private**,
and he secures and deletes clones. Verified independently through the GitHub API —
`kolisachint/my-life` is `visibility: private`, zero forks.

The 27 Aug rule said *"this repo is pushed to GitHub, treat it as public"* and
banned identity numbers, account numbers and source documents. That rule shaped
every note written since, including this morning's decision not to commit his
profile photograph. **It is withdrawn.**

| | Before | Now |
| --- | --- | --- |
| Identity / account numbers | Banned | **Store them** |
| Images, scans, documents | Dropbox only, reference the path | **Commit beside the note** |
| Contact details | Stripped | **Recorded** |
| Live credentials | Banned | **Still banned** — see below |

**The one carve-out.** A working key — API token, password, OTP, private key,
session cookie — still never gets committed. Not because the repo leaks, but
because git history is permanent and a live key stays exploitable by anyone who
ever holds a clone, including one that was not deleted. `.env`, `*.pem`,
`*credentials*`, `*secret*`, `*.key`, `*.token` remain gitignored; the document
patterns were removed from `.gitignore` deliberately.

**Applied.** `AGENTS.md` policy section rewritten. `.gitignore` reduced to
credentials. Contact details restored to `profile.md` and
`tcs-profile-2025.md`. Convention set: binary artefacts live beside their note,
same directory, same base name.

**Not applied — blocked.** Copying the profile photograph into
`notes/Goals/Career/tcs-profile-2025.jpg` was denied by the sandbox permission
classifier, twice. The note points at the filename; the file is not there yet.
Needs a Bash permission rule, or he can drop the image in himself.

**Also outstanding:** the identity and account numbers were never transcribed in
the first place, because the old rule forbade it. They are still only in Dropbox.
Next session that opens those documents should copy the numbers in.

## 2026-08-28 — the July 2025 profile card lands

Sachin supplied a photograph of his **TCS consultant profile card, dated July
2025**. Transcribed to `notes/Goals/Career/tcs-profile-2025.md`; the image is not
committed — it carries his photograph, mobile number and TCS e-mail, and this repo
is public. It belongs in `Digital_Drive/Sachin/Job_Resume/`.

**What it settles.** Three of the five resume defects recorded on 27 Aug are gone:
TCS is present, Sears is correctly closed at 2021, and the tenure reads 18 years.
The "he cannot test the market with that document" framing is retired.

**What it does not.** The card is a client-facing TCS artefact — clients not
employers, no continuous employment history, TCS branding, no AI/GenAI content,
one quantified achievement in the whole page. The rewrite is now **assembly, not
archaeology**, but it is still unwritten.

**What is new and material.**

| | |
| --- | --- |
| **Two industry awards** | Self-serve fraud journey at Lloyds — Banking Tech Awards **2024**, Card & Payments Awards **2025**. Nothing in the repo knew about these. |
| **A payments specialisation** | Four years on LBG Digital Cards — wallets, card controls, View PIN, fraud, on-prem → GCP. Prices above generic "data architect"; opens card networks, banking GCCs and fintech as targets. |

**New open questions** (`state/decisions.md`): **I** — does he actually hold the
Google Cloud **Professional Data Engineer** certification the card claims, or is
that a Coursera specialisation written up? It changes the top of the resume either
way. **J** — the card reads 2022–**2026**; is the LBG engagement ending?

Files touched: `notes/Goals/Career/tcs-profile-2025.md` (new),
`notes/Goals/Identity/profile.md`, `notes/Goals/Career/job-options.md`,
`state/decisions.md`, `memory/learned.txt`. No Todoist changes.

## 2026-08-27 — first Todoist edits applied (approved)

Six changes to the passport chain and property tax. Nothing deleted.

| Task | Change |
| --- | --- |
| Gather passport documents | 25 Aug -> **27 Aug (today)**, p4 -> **p1**. Description rewritten: birth certificate is a PCMC e-services download, school ID from SNBP Moshi. |
| **NEW** Request bonafide from SNBP Moshi | **28 Aug, p1**, child of "Get passport for Samarth". The longest lead time in the chain and the item with no task of its own. |
| Book PSK appointment | date unchanged (28 Aug), p4 -> **p1**. Added POPSK Pimpri-Chinchwad address, the fill -> pay -> book order, and a morning-slot rationale. |
| PSK visit - both parents | left undated, p4 -> **p1** so it surfaces under "Undated p1" instead of vanishing. |
| Pay property tax | 25 Aug -> **27 Aug**, p4 -> **p1**. Noted PCMC not PMC, batch with the birth certificate, and check Lakeshore's Wakad-ward dues. |

The fix underneath all of it: the container task was p1 while every step that
actually blocked was p4. That inversion is why the chain slipped.

Used reschedule-tasks for dates rather than update-tasks, per the Todoist MCP
guidance, so no recurrence was touched. All four passport subtasks verified after.

Still not done, awaiting separate decisions: deleting Sprint Planning and the
duplicate quarterly budget review, rewriting the two impossible recurrences
(PCA 20%/workday, 10K steps), and attaching next actions to the twelve stalled
goals.

## 2026-08-27 — artefacts mirror the Todoist tree

- `bin/pub` now places files under **Project / Section**, the same structure as
  Todoist: `/my-life/<Project>/<Section>/` in Dropbox, `notes/<Project>/<Section>/`
  in the repo. Emoji are stripped and spaces hyphenated, so `⚽️ Goals` / `💲Money`
  becomes `Goals/Money`; either form can be passed.
- `--task <id>` infers project and section from the task itself. `--repo` writes
  long-term artefacts instead of publishing. `--tmp` keeps tentative work off both.
- Folders are created **on demand**, one level at a time. Nothing is pre-built.
- The project and section names are cached in the `artifact-publish` skill so no
  session needs to run `td project list` to place a file — that is the token saving.
  Verified against all ten of his real project and section names.

## 2026-08-27 — switched to Doist's official CLI, dropped OpenCode

Sachin: "todoist has release todoist cli why other?" Correct again — I had used a
third-party client when Doist ships an official one.

- **Todoist is now `td`** ([Doist/todoist-cli](https://github.com/Doist/todoist-cli),
  `@doist/todoist-cli` v4.0.0). Removed sachaos/todoist. `td` has `--json` /
  `--ndjson`, `--dry-run` on every mutation, and its own `td doctor`.
- **Doist ships an official agent skill.** `td skill install claude-code --local`
  writes 424 lines covering every command, flag and security gotcha. Committed at
  `.claude/skills/todoist-cli/`. Our `life-ops` skill was cut down to only what is
  specific to Sachin; all Todoist mechanics were deleted from it.
- **`bin/doctor` now delegates** to `td doctor` rather than re-checking what the
  tool already checks.
- **Dropped OpenCode config** (`.opencode/`, `opencode.json`). He named OpenCode as
  an example of portability, not a requirement. `AGENTS.md` is the portable layer
  and every major agent reads it.

Gotcha found: `td` v4 requires **Node ≥24**. On Node 22 npm silently resolves to
v2.1.0 instead of failing. `bin/setup` now warns, and `td doctor` catches it too.

## 2026-08-27 — replaced the hand-rolled CLI with real tools

Sachin pushed back on inventing a client. He was right.

- **Removed** `bin/todoist` (600 lines of hand-written Python).
- **Todoist** is now [sachaos/todoist](https://github.com/sachaos/todoist) — Go,
  maintained, on the current API, with `--filter` and `--csv`. Its filter syntax
  replaced every query flag I had written.
- **Dropbox** is [dropbox/dbxcli](https://github.com/dropbox/dbxcli) v3.7.2 —
  official, `--output json`, `DBXCLI_ACCESS_TOKEN` for non-interactive auth.
- Both install via `go install` (verified working) or brew.
- **PDF** comes from headless Chromium, verified end to end: 14KB, 1 page.
- `bin/` is now four thin shell scripts: `setup`, `brief`, `pub`, `doctor`.
- Added `memory/learned.txt` — append-only, because nothing is remembered
  between sessions.
- Placement rule set: human-facing artefacts to Dropbox `/my-life`, long-term
  memory to the repo, tentative work deleted.
- Added the `artifact-publish` skill so the render/upload/link pipeline is not
  re-derived.

Note: Todoist shut down Sync v9 and REST v2 on 2026-02-10 — older clients are dead.

## 2026-08-27 — repo set up for portable, low-token operation

- Added `bin/todoist`, a zero-dependency Python CLI using the Todoist API v1
  `/sync` endpoint with incremental `sync_token`. Replaces MCP reads.
- Added `AGENTS.md` as the single instruction file; `CLAUDE.md` points to it.
- Commands live in `.claude/commands/` and are symlinked into `.opencode/command/`,
  so they are written once and work in both tools.
- `data/` is a committed cache: `brief.md`, `tasks.tsv`, `notes/<id>.md`,
  `meta.json`. Reading the brief costs ~1.5k tokens against ~40k for an MCP dump.
- No Todoist changes made. The four decisions in `state/decisions.md` are open.

## 2026-08-27 — life audit

- Read all 62 tasks, wrote `LIFE-PLAN.md`.
- Findings: 12 of 17 goals have no dated next action; two recurring tasks are
  impossible as written; five overlapping review rituals; ₹1.12L/month gap
  between stated and actual saving; passport deadline chain slipping.
