# my-life — agent instructions

Personal life-operations repo for Sachin (Pune, Asia/Kolkata). Portable across
Claude Code, OpenCode, Codex, Cursor, or a plain terminal. This file is the
single source of truth; `CLAUDE.md` just points here.

## Tools — use these, never MCP, never write your own

| Job | Tool | Why |
| --- | --- | --- |
| Todoist | `todoist` ([sachaos](https://github.com/sachaos/todoist)) | Maintained, current API, `--filter` + `--csv` |
| Dropbox | `dbxcli` ([dropbox](https://github.com/dropbox/dbxcli)) | Official, `--output json`, non-interactive auth |
| HTML→PDF | headless Chromium via `bin/pub` | Already installed everywhere Chrome is |

`bin/setup` installs both. Do **not** call the Todoist or Dropbox MCP servers —
they cost ~20x the tokens for the same answer. Do **not** write a new client for
either; if something is missing, check the tool's `--help` first.

## Start of session

```sh
make brief        # four Todoist filter queries -> data/brief.md
```

That is the whole ritual. It is a few hundred tokens and covers overdue, today,
next 7 days, and undated p1.

## Reading budget — cheapest first

| Need | Do this |
| --- | --- |
| What's urgent | `cat data/brief.md` |
| A specific query | `todoist list --filter '<expr>' --csv --header` |
| One task's full detail | `todoist show <id>` — one at a time, never in a loop |
| Projects / sections | `todoist projects` · `todoist sections` |
| What I already learned | `cat memory/learned.txt` |
| Standing decisions | `cat state/decisions.md` |

Todoist filter syntax is the query language — use it instead of listing
everything and filtering yourself. Examples: `overdue`, `today`, `7 days`,
`p1 & no date`, `##Goals & @Action`, `(overdue | today) & p1`, `search: passport`.

## Writing to Todoist

```sh
todoist add "Book PSK appointment" -P Everyday -d friday -p 1 -L Action
todoist modify <id> -d "every workday"
todoist close <id>          # advances a recurring task; does not end the series
todoist delete <id>
```

Check `todoist add --help` before guessing a flag. **Ask before deleting** — this
is real personal data. Batch related writes into one shell invocation.

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
bin/setup            install dbxcli + todoist, write configs from .env
bin/brief            todoist filters -> data/brief.md
bin/pub              artefact -> optional PDF -> Dropbox -> share link
bin/doctor           verify tools, tokens, connectivity
data/brief.md        generated, committed, regenerate with `make brief`
memory/learned.txt   append-only facts
state/decisions.md   settled answers + open questions
state/log.md         session log
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
- Prefer editing an existing task over creating a parallel one.
- After any session that changes Todoist or settles something: append to
  `memory/learned.txt` and `state/log.md`, then commit.
