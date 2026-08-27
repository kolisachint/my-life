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

### Which transport to use

Decide once, at the start of the session, and say which one you are on:

```sh
td auth status >/dev/null 2>&1 && echo CLI || echo MCP
```

- **CLI available** (his laptop, any machine with network) — use it. Never touch
  the MCP servers there.
- **CLI unavailable** (Claude Code on the web, and any sandbox where the egress
  proxy blocks `api.todoist.com` / `api.dropboxapi.com`) — the MCP servers are
  the only working transport, because MCP traffic bypasses that proxy. Use them,
  under the rules below.

### If you are on MCP

MCP is not inherently expensive; **one tool is**. The 40k-token session that
started all this was `get-overview`, not MCP as such.

- **Never call `get-overview`.** It dumps every task with its full description.
- Use `find-tasks` with a raw `filter` string — the *same* Todoist filter syntax
  the CLI uses: `overdue`, `today`, `7 days`, `p1 & no date`, `##Goals & @Action`.
- Use `find-tasks-by-date` for date windows; it is already compact.
- Read one task's description with `fetch-object`, one at a time, never in a loop.
- For artefacts, the Dropbox MCP replaces `bin/pub` — but keep the identical
  `/my-life/<Project>/<Section>/` tree and the same placement rule. Create
  folders on demand. Nothing else about the structure changes.

Everything outside the transport — the tree, the placement rule, the memory
files, the review cadence — is the same on both paths.

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
