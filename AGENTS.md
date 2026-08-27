# my-life — agent instructions

Personal life-operations repo for Sachin (Pune, Asia/Kolkata). Portable across
Claude Code, OpenCode, Codex, Cursor, or a plain terminal. This file is the
single source of truth; `CLAUDE.md` just points here.

## The one rule that matters

**Never read Todoist through an MCP server.** It returns every task's full
description and costs ~40k tokens. Instead:

```sh
make sync          # or: ./bin/todoist sync   (one HTTP call, incremental)
cat data/brief.md  # ~1.5k tokens, everything urgent
```

That is the whole start-of-session ritual. Do it, then work.

## Reading budget — cheapest first

| Need | Do this | Cost |
| --- | --- | --- |
| What's urgent | `cat data/brief.md` | ~1.5k |
| Find tasks | `grep -i PATTERN data/tasks.tsv` | ~50 |
| All tasks, one line each | `cat data/tasks.tsv` | ~2.5k |
| One task's long note | `cat data/notes/<id>.md` | varies |
| Project/section IDs | `cat data/meta.json` | ~600 |
| Standing decisions | `cat state/decisions.md` | ~400 |

`data/store.json` is the raw cache. **Never read it** — it is large and every
useful field is already in the views above. It exists so the views can be
regenerated offline.

Escalate one row at a time. Most questions are answered by `brief.md` alone.

## Writing

```sh
./bin/todoist add "text" --due "next monday" --pri 1 --project Goals --label Action
./bin/todoist done  <id>...
./bin/todoist resched <id> "every workday"   # edit, never re-create
./bin/todoist pri   <id> 1
./bin/todoist rm    <id>...
```

Every write re-syncs automatically, so the views stay current.

- Priority is `1` = highest, matching the Todoist UI (the API's own numbering is
  inverted; the CLI handles that).
- `done` uses Todoist's *close* semantics: a recurring task advances to its next
  occurrence rather than ending the series.
- `resched` refuses to put a plain date on a recurring task, because that would
  silently destroy the recurrence. Pass a recurring string, or `--force` if
  making it one-off is genuinely the intent.
- **Ask before bulk deletes or rewrites.** This is real personal data.
- Batch related writes into one command run rather than one call per task.

## Repo map

```
AGENTS.md          this file — instructions for every agent
CLAUDE.md          pointer to this file
LIFE-PLAN.md       the standing audit + operating plan (Aug 2026)
bin/todoist        zero-dependency CLI (python3 stdlib only)
data/              generated cache — commit it, that is the point
  brief.md         overdue / today / next 7 days / stalled goals
  tasks.tsv        one greppable line per task
  notes/<id>.md    long task descriptions, on demand
  meta.json        project + section + label id→name maps
  store.json       raw merged state — do not read
state/
  decisions.md     standing answers, preferences, open questions
  log.md           what changed, newest first
```

## Standing context

Do not re-derive this — it is settled.

- Two kids: **Srishti** (daughter), **Samarth** (son). Wife holds ancestral land,
  matter is in court.
- Four projects: ⚽️ Goals, 🪣 BucketList, ✅ Everyday Life, Inbox.
- Sachin writes goals as `As a X, I want Y, so that Z`. They are aspirations, not
  tasks — a goal is only live if it has a **dated child action**. `brief.md`
  reports the ones that don't.
- The `Action` label marks a real next action. `QuarterlyGoal` marks a theme.
- Open money contradiction: goal descriptions commit ₹1,32,000/month; a P1
  subtask says the real floor is ₹20,000. Unresolved — see `state/decisions.md`.
- ₹2,00,000 outstanding with Tayadi; ₹2,10,000 already written off.
- He is a Solution Architect working toward GCP PCA certification.

## Working style

- Answer from the brief. Don't reload the world to confirm something you read.
- Prefer editing existing tasks over creating parallel ones.
- After any session that changes Todoist or a decision, append to `state/log.md`
  and commit. The next session starts from that.
- Keep `LIFE-PLAN.md` current; it is the standing plan, not a historical record.
