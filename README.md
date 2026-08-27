# my-life

Life operations for Sachin, in a git repo. Portable across Claude Code, OpenCode,
Codex, Cursor, or a plain terminal — no vendor lock-in, no MCP server required.

## Setup (once, ~2 minutes)

```sh
git clone <this repo> && cd my-life
cp .env.example .env
# paste your token: Todoist → Settings → Integrations → Developer → API token
$EDITOR .env

make doctor    # checks token, connectivity, cache
make sync      # first full pull — populates data/
git add -A data && git commit -m "sync: initial cache"
```

Requires `python3` (3.8+) and nothing else. No pip, no npm, no MCP server.

## Daily use

```sh
make sync      # incremental pull, ~1 second
make brief     # what's overdue / today / next 7 days, from cache
make review    # sync + brief + standing decisions (the Sunday ritual)
```

```sh
./bin/todoist ls --overdue
./bin/todoist ls --project Goals --label Action
./bin/todoist add "Book PSK appointment" --due "friday" --pri 1 --project Everyday --label Action
./bin/todoist done 6h9qvH87vv8638rV
./bin/todoist resched 6X5xq7HGXPXXvMPc "every workday"
./bin/todoist show 6h9qqVCjfFwf4xWV
```

Run `./bin/todoist --help` for everything.

## Using it with an agent

Every agent reads the same file: **`AGENTS.md`**. `CLAUDE.md` is a five-line
pointer to it, so there is one set of instructions, not two that drift.

| Tool | Reads | Commands | Config |
| --- | --- | --- | --- |
| Claude Code | `CLAUDE.md` → `AGENTS.md` | `.claude/commands/` | `.claude/settings.json` |
| OpenCode | `AGENTS.md` | `.opencode/command/` → symlinks | `opencode.json` |
| Codex / Cursor / Amp | `AGENTS.md` | — | — |

`.opencode/command/*.md` are **symlinks** into `.claude/commands/`, so a command
is written once and works in both. Frontmatter is kept to `description` only —
the field both parsers agree on.

Slash commands: `/sync`, `/brief`, `/review`, `/capture`, `/plan`.

### OpenCode with free models

Nothing here depends on the model. Point OpenCode at whatever you like:

```sh
opencode              # then /models to pick
```

Free options that work fine for this repo's work (sync, triage, editing tasks):
free tiers on OpenRouter, or a local model via Ollama. The heavy lifting is done
by `bin/todoist`, not by the model — which is the point. A small model reading a
1.5k-token brief does this job well.

If your OpenCode version rejects a key in `opencode.json`, delete that key. The
repo still works: `AGENTS.md` plus the CLI is the whole system, and everything
else is convenience.

## Why it's fast

Reading Todoist through an MCP server pulls every task's full description —
around **40,000 tokens** for this account, most of it 2,000-word goal essays that
are irrelevant to "what's due Friday".

This repo syncs once over HTTP and writes small derived views:

| File | Size | Purpose |
| --- | --- | --- |
| `data/brief.md` | ~1.5k tokens | Overdue, today, next 7 days, stalled goals |
| `data/tasks.tsv` | ~2.5k tokens | One greppable line per task |
| `data/notes/<id>.md` | on demand | A single task's long description |
| `data/meta.json` | ~600 tokens | Project / section / label IDs |
| `data/store.json` | never read | Raw cache, only used to regenerate the above |

A session now starts at roughly **1.5k tokens instead of 40k**. Sync is
incremental — the first call is a full pull, every call after sends a
`sync_token` and gets back only what changed.

`data/` is committed on purpose. That is what makes the next session start warm.

## Layout

```
AGENTS.md              instructions for every agent — the single source of truth
CLAUDE.md              pointer to AGENTS.md
LIFE-PLAN.md           the standing audit and operating plan
Makefile               sync / brief / review / doctor
bin/todoist            the CLI (python3 stdlib only)
data/                  generated cache, committed
state/decisions.md     standing answers and open questions
state/log.md           what changed, newest first
.claude/               commands, skill, permission allowlist
.opencode/             symlinked commands, agent definition
```

## Notes

- `.env` is gitignored. The token never enters the repo.
- `./bin/todoist done` uses Todoist's *close* semantics, so a recurring task
  advances to its next occurrence instead of ending the series.
- `./bin/todoist resched` refuses to put a plain date on a recurring task,
  because that silently destroys the recurrence. Use `--force` to override.
- Behind a TLS-inspecting proxy, set `SSL_CERT_FILE` to your CA bundle.
