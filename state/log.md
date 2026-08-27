# Session log

Newest first. One entry per session that changed Todoist, a decision, or the plan.

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
