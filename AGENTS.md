# my-life — agent instructions

Personal life-operations repo for Sachin (Pune, Asia/Kolkata). Portable across
Claude Code, OpenCode, Codex, Cursor, or a plain terminal. This file is the
single source of truth; `CLAUDE.md` just points here.

## Tools — use these, never MCP, never write your own

| Job | Tool | Notes |
| --- | --- | --- |
| Todoist | `td` — [Doist/todoist-cli](https://github.com/Doist/todoist-cli), official | `--json` / `--ndjson`, built for agents. **Needs Node ≥24.** |
| Dropbox | `dbxcli` — [dropbox/dbxcli](https://github.com/dropbox/dbxcli), official | `--output json`, non-interactive auth |
| HTML→PDF | headless Chromium via `bin/pub` | Present wherever Chrome is |

`bin/setup` installs both. Do **not** write a client for either — check
`td <command> --help` first; the surface is large and almost certainly covers it.

### Transport: the CLI is the system. MCP is a fallback.

```sh
make doctor        # reports egress, auth and versions in one call
```

Use the CLI. It is the whole point of this repo: it works on any machine, with
any model, with no vendor in the middle. Reach for MCP **only** when `make
doctor` shows the API hosts are unreachable, and say so in your reply when you do.

**Known blocked environment: Claude Code on the web.** Its egress policy denies
`api.todoist.com` and `api.dropboxapi.com` with a 403 at CONNECT, so the CLIs
cannot work there regardless of credentials. This is an organisation policy
denial — never retry it and never route around it.

*The fix, and it is worth doing:* allow these hosts in the environment's network
policy, and the CLI works everywhere with one code path.

```
api.todoist.com  todoist.com
api.dropboxapi.com  content.dropboxapi.com  www.dropbox.com
```

Installs already work in that environment (`registry.npmjs.org` and
`proxy.golang.org` are permitted), so only runtime calls are affected.

### If you are genuinely stuck on MCP

MCP is not inherently expensive; **one tool is**. The 40k-token session that
started all this was `get-overview`, not MCP as such.

- **Never call `get-overview`.** It dumps every task with its full description.
- Use `find-tasks` with a raw `filter` string — the *same* Todoist filter syntax
  the CLI uses: `overdue`, `today`, `7 days`, `p1 & no date`, `##Goals & @Action`.
- Use `find-tasks-by-date` for date windows; it is already compact.
- Read one task's description with `fetch-object`, one at a time, never in a loop.
- For artefacts, the Dropbox MCP stands in for `bin/pub` — keep the identical
  `/my-life/<Project>/<Section>/` tree, the same placement rule, folders on
  demand. Nothing about the structure changes.

Everything outside the transport — the tree, the placement rule, the memory
files, the review cadence — is identical on both paths.

**Doist ships the official `todoist-cli` skill in `.claude/skills/todoist-cli/`.**
It documents every command, flag and gotcha. Read it instead of guessing, and
never duplicate it into another file.

## Start of session

```sh
make brief        # td today + upcoming + undated p1 -> data/brief.md
```

That is the whole ritual. `td`'s default `--json` returns a lean field set;
`--full` is what drags in every long description, so never reach for it casually.

## Reading budget — cheapest first

| Need | Do this |
| --- | --- |
| What's urgent | `cat data/brief.md` |
| A specific query | `td task list --filter '<expr>' --json` |
| One task's full detail | `td task <id>` — one at a time, never in a loop |
| Projects / sections | `td project list --json` · `td section list --json` |
| What I already learned | `cat memory/learned.txt` |
| Standing decisions | `cat state/decisions.md` |

Todoist filter syntax is the query language — let the server select, rather than
listing everything and filtering yourself. Examples: `overdue`, `today`,
`7 days`, `p1 & no date`, `##Goals & @Action`, `search: passport`.

## Writing to Todoist

See the official skill for the full surface. The rules that are mine, not Doist's:

- **Ask before deleting.** This is real personal data.
- Use `--dry-run` on anything you are unsure about; every mutating command has it.
- Batch related writes into one shell invocation.
- Prefer editing an existing task over creating a parallel one.

## Where output goes — decide before you create anything

Dropbox and the repo both mirror the **Todoist Project / Section** tree. One
command handles render, folder creation, upload and share link:

```sh
bin/pub FILE --project Goals --section Money --pdf    # -> Dropbox + share link
bin/pub FILE --task <id> --pdf                        # infers P/S from the task
bin/pub FILE --project Goals --section Career --repo  # -> notes/, memory
bin/pub FILE --tmp                                    # -> nowhere, delete after
```

| Kind of artefact | Destination |
| --- | --- |
| A human will read or keep it | **Dropbox** `/my-life/<Project>/<Section>/` |
| I must know it next session | **repo** `notes/<Project>/<Section>/` |
| Tentative, one-off, exploratory | **nowhere** — `--tmp`, then delete |

Folders are created on demand; nothing is pre-built. The project and section
names are listed in the `artifact-publish` skill — read them there rather than
querying `td`. Never `mkdir`, `dbxcli put` or render a PDF yourself.

## Never store secrets or identity numbers

This repo is pushed to GitHub. Treat it as public.

**Never write to any file here:**

- Identity numbers — PAN, Aadhaar, UAN, passport number, driving licence, voter ID
- Account numbers — bank account, loan account, credit/debit card, demat, folio,
  policy numbers, employee ID
- Credentials — passwords, API tokens, OTPs, security answers, mandate/UMRN refs
- Full account statements, Form 16s, payslips or ITRs pasted verbatim

**Planning figures are fine** — salary totals, balances, EMIs, valuations. It is
the *identifiers* that must not leak, because a number without an identifier
attached is only information; with one it is an attack surface.

If a document is needed, reference its **Dropbox path**, never its contents. When
a user pastes something containing an identifier, use the figures and silently
drop the identifier — do not echo it back into a file or a commit message.

`.env` is gitignored and holds tokens. Nothing else in this repo should ever
contain one.

## Memory — I do not learn between sessions

Anything worth carrying forward goes in a file, or it is gone:

- `memory/learned.txt` — append-only, one line per fact, newest at the bottom.
  Preferences, gotchas, corrections, "he always wants X". Append immediately when
  you learn it, not at the end of the session.
- `state/decisions.md` — settled answers and open blocking questions.
- `state/log.md` — what changed, newest first.

Read `memory/learned.txt` at the start of any planning work. Append to it before
you finish. A session that discovered something and wrote nothing down wasted it.

## Repo map

```
AGENTS.md            this file
CLAUDE.md            pointer to this file
LIFE-PLAN.md         the standing audit and operating plan
bin/setup            install td + dbxcli, install Doist's official skill
bin/brief            td today + upcoming -> data/brief.md
bin/pub              artefact -> PDF -> Dropbox or notes/, mirroring Todoist
bin/doctor           verify tools, tokens, connectivity
data/brief.md        generated, committed, regenerate with `make brief`
notes/<P>/<S>/       long-term artefacts, same tree as Todoist (lazy)
memory/learned.txt   append-only facts
state/decisions.md   settled answers + open questions
state/log.md         session log
.claude/skills/todoist-cli/   Doist's official skill — do not edit, `td skill update`
```

## Standing context

Settled — do not re-derive.

- Two kids: **Srishti** (daughter), **Samarth** (son). Wife holds ancestral land,
  matter in court.
- Projects: ⚽️ Goals, 🪣 BucketList, ✅ Everyday Life, Inbox.
- Goals are written `As a X, I want Y, so that Z`. A goal is only live if it has a
  **dated child action**. Otherwise: attach one, neglect it, or delete it.
- `Action` label = a real next action. `QuarterlyGoal` = a theme.
- Open money contradiction: goal descriptions commit ₹1,32,000/month; a P1 subtask
  says the floor is ₹20,000. Unresolved — see `state/decisions.md`.
- ₹2,00,000 outstanding with Tayadi; ₹2,10,000 already written off.
- Solution Architect, working toward GCP PCA certification.

## Working style

- Answer from the brief. Don't reload the world to confirm what you just read.
- After any session that changes Todoist or settles something: append to
  `memory/learned.txt` and `state/log.md`, then commit.
