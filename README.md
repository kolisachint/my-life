# my-life

Life operations for Sachin, in a git repo. Portable across Claude Code, OpenCode,
Codex, Cursor, or a plain terminal. No vendor lock-in, no MCP servers, no
hand-rolled clients.

## Setup (once per machine)

```sh
cp .env.example .env && $EDITOR .env    # paste your Todoist API token
make setup                              # installs todoist + dbxcli
dbxcli login                            # one-time Dropbox OAuth
make doctor                             # verify everything
```

Needs `go` or `brew` for the install step, and Chrome/Chromium if you want PDFs.
Nothing else.

## Daily use

```sh
make brief     # what's overdue / today / next 7 days
make review    # brief + standing decisions + memory (the Sunday ritual)
make doctor    # something misbehaving?
```

```sh
todoist list --filter '(overdue | today) & p1' --csv --header
todoist add "Book PSK appointment" -P Everyday -d friday -p 1 -L Action
todoist close <id>
todoist show <id>

bin/pub report.html --pdf          # -> Dropbox /my-life, prints a share link
bin/pub chart.png --dir charts
bin/pub draft.html --tmp           # local only, never uploaded
```

## The tools are not mine

| Job | Tool | Source |
| --- | --- | --- |
| Todoist | `todoist` | [sachaos/todoist](https://github.com/sachaos/todoist) — Go, maintained, current API |
| Dropbox | `dbxcli` | [dropbox/dbxcli](https://github.com/dropbox/dbxcli) — official, v3.7.2 |
| HTML → PDF | headless Chromium | already on any machine with Chrome |

`bin/` holds four thin shell scripts that wire these together — `setup`, `brief`,
`pub`, `doctor`. That is all the code in this repo.

> Todoist shut down Sync API v9 and REST API v2 on **10 February 2026**. Any
> Todoist client older than sachaos/todoist v0.23 is dead. `make setup` always
> pulls latest.

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

Every agent reads **`AGENTS.md`**. `CLAUDE.md` is a five-line pointer to it, so
there is one set of instructions that cannot drift.

| Tool | Reads | Commands | Config |
| --- | --- | --- | --- |
| Claude Code | `CLAUDE.md` → `AGENTS.md` | `.claude/commands/` | `.claude/settings.json` |
| OpenCode | `AGENTS.md` | `.opencode/command/` (symlinks) | `opencode.json` |
| Codex / Cursor / Amp | `AGENTS.md` | — | — |

`.opencode/command/*.md` are symlinks into `.claude/commands/`, so a command is
written once and works in both. Frontmatter is limited to `description`, the one
field both parsers accept.

Slash commands: `/brief`, `/review`, `/capture`, `/publish`, `/remember`, `/plan`.

Skills in `.claude/skills/` carry the procedures — `life-ops` for planning and
reviews, `artifact-publish` for producing files — so the same thing is not
re-derived every session.

### OpenCode with free models

Nothing here depends on the model. The CLIs do the work; the model reads a
few-hundred-token brief and decides. A free OpenRouter model or a local Ollama
model handles this fine.

```sh
opencode        # /models to pick
```

If your OpenCode version rejects a key in `opencode.json`, delete that key —
`AGENTS.md` plus the CLIs is the whole system; everything else is convenience.

## Why it's cheap

Reading Todoist over MCP pulled every task's full description — roughly **40,000
tokens** for this account, mostly 2,000-word goal essays irrelevant to "what's due
Friday".

`make brief` runs four Todoist filter queries and writes a few hundred tokens of
CSV. Full detail is one command away (`todoist show <id>`) for one task at a
time. Filter syntax does the selection server-side, so nothing large is ever
transferred, parsed, or read into context.

## Layout

```
AGENTS.md            instructions for every agent — single source of truth
CLAUDE.md            pointer to AGENTS.md
LIFE-PLAN.md         the standing audit and operating plan
bin/setup            install todoist + dbxcli, write configs from .env
bin/brief            todoist filters -> data/brief.md
bin/pub              artefact -> optional PDF -> Dropbox -> share link
bin/doctor           verify tools, tokens, connectivity, PDF engine
data/brief.md        generated, committed
memory/learned.txt   append-only facts
state/               decisions and session log
.claude/  .opencode/ commands, skills, permissions
```

## Notes

- `.env` is gitignored. Tokens never enter the repo — `bin/setup` writes the
  Todoist one to `~/.config/todoist/config.json` (mode 600).
- Prefer `dbxcli login` over a raw Dropbox token; it saves refreshable OAuth
  credentials. A token in `.env` is only for CI or a headless box.
- `todoist close` advances a recurring task to its next occurrence. `todoist
  delete` ends it — an agent must ask first.
- Behind a TLS-inspecting proxy, set `SSL_CERT_FILE`.
