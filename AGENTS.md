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

`bin/setup` installs both. Do **not** call the Todoist or Dropbox MCP servers.
Do **not** write a client for either — check `td <command> --help` first; the
surface is large and almost certainly already covers it.

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

| Kind of artefact | Destination | How |
| --- | --- | --- |
| For a human to read or keep (report, plan, chart, PDF) | **Dropbox** `/my-life` | `bin/pub file.html --pdf` |
| Long-term memory — things I must know next session | **this repo** | commit it |
| Tentative, one-off, exploratory | **nowhere** | `bin/pub x.html --tmp`, then delete |

Never leave a scratch file in the repo. Never commit something a human wants to
open — that belongs in Dropbox. `bin/pub` prints a share link.

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
bin/pub              artefact -> optional PDF -> Dropbox -> share link
bin/doctor           verify tools, tokens, connectivity
data/brief.md        generated, committed, regenerate with `make brief`
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
