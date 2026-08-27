# my-life

Life operations for Sachin, in a git repo. Official CLIs do the work; this repo
holds four thin shell scripts, the instructions, and the memory.

## Setup (once per machine)

```sh
cp .env.example .env && $EDITOR .env
make setup            # installs td + dbxcli, installs Doist's official skill
td auth login         # or: export TODOIST_API_TOKEN=... for headless
dbxcli login
make doctor
```

> **Node ≥24 is required.** On older Node, npm silently installs an ancient `td`
> (v2.1.0) instead of failing. `make setup` warns, and `td doctor` catches it.
> Verify with `td --version` — you want 4.x.

## Daily use

```sh
make brief     # today + overdue + next 7 days + undated p1
make review    # brief + standing decisions + memory (the Sunday ritual)
make doctor    # something misbehaving?
```

```sh
td today
td task list --filter '(overdue | today) & p1' --json
td task add "Book PSK appointment" --due friday --priority p1 --labels Action
td task <id>                       # full detail for one task

bin/pub report.html --pdf          # -> Dropbox /my-life, prints a share link
bin/pub chart.png --dir charts
bin/pub draft.html --tmp           # local only, never uploaded
```

Run `td <command> --help` for anything else — the surface is large.

## The tools are not mine

| Job | Tool | Source |
| --- | --- | --- |
| Todoist | `td` | [Doist/todoist-cli](https://github.com/Doist/todoist-cli) — **official**, v4.0.0 |
| Dropbox | `dbxcli` | [dropbox/dbxcli](https://github.com/dropbox/dbxcli) — **official**, v3.7.2 |
| HTML → PDF | headless Chromium | already present wherever Chrome is |

`bin/` holds four shell scripts that wire these together — `setup`, `brief`,
`pub`, `doctor`. That is all the code in this repo.

Doist also ships an **official agent skill**. `make setup` installs it to
`.claude/skills/todoist-cli/` — 424 lines covering every command, flag and
security gotcha. Never hand-write Todoist mechanics; run `td skill update` to
refresh it.

## Where things go

| Kind of artefact | Destination | How |
| --- | --- | --- |
| A human will read or keep it | **Dropbox** `/my-life` | `bin/pub file.html --pdf` |
| An agent must know it next session | **this repo** | commit it |
| Tentative, exploratory, one-off | **nowhere** | `bin/pub file.html --tmp`, delete after |

Nothing human-facing gets committed; nothing scratch survives.

## Memory

An agent does not remember between sessions, so anything learned is written down
or lost:

- `memory/learned.txt` — append-only, one line per fact. Preferences, gotchas,
  corrections.
- `state/decisions.md` — settled answers and open blocking questions.
- `state/log.md` — session log, newest first.

## Using it with an agent

Every agent reads **`AGENTS.md`** — the portable standard, understood by Claude
Code, Codex, Cursor, Amp, OpenCode and others. `CLAUDE.md` is a short pointer to
it, so there is one set of instructions that cannot drift.

Slash commands in `.claude/commands/`: `/brief`, `/review`, `/capture`,
`/publish`, `/remember`, `/plan`.

Skills in `.claude/skills/`:

- `todoist-cli` — Doist's official skill. Do not edit.
- `life-ops` — only what is specific to Sachin: the goals-without-actions failure
  mode, review cadence, the unresolved money gap.
- `artifact-publish` — render, publish, share-link. Do not reinvent `bin/pub`.

Any model works. The CLIs do the work; the model reads a small brief and decides.

## Why it's cheap

Reading Todoist over MCP pulled every task's full description — roughly **40,000
tokens** for this account, mostly 2,000-word goal essays irrelevant to "what's due
Friday".

`td`'s default `--json` already returns a lean field set (`--full` is what drags
in descriptions), and filter queries select server-side. `make brief` writes a
few hundred tokens. Full detail is one command away for one task at a time.

## Layout

```
AGENTS.md            instructions for every agent — single source of truth
CLAUDE.md            pointer to AGENTS.md
LIFE-PLAN.md         the standing audit and operating plan
bin/setup            install td + dbxcli + Doist's official skill
bin/brief            td today + upcoming -> data/brief.md
bin/pub              artefact -> optional PDF -> Dropbox -> share link
bin/doctor           delegates to td doctor, checks Dropbox + PDF engine
data/brief.md        generated, committed
memory/learned.txt   append-only facts
state/               decisions and session log
.claude/             commands, skills, permissions
```

## Notes

- `.env` is gitignored; tokens never enter the repo.
- Prefer `td auth login` and `dbxcli login` over raw tokens — both save
  refreshable OAuth credentials. Tokens in `.env` are for CI or a headless box.
- Every mutating `td` command supports `--dry-run`. An agent must ask before
  deleting anything.
- Behind a TLS-inspecting proxy, set `SSL_CERT_FILE`.
