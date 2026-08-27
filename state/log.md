# Session log

Newest first. One entry per session that changed Todoist, a decision, or the plan.

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
