---
name: life-ops
description: Planning, reviewing and restructuring Sachin's life system — Todoist tasks, goals, weekly or quarterly review, money planning, updating LIFE-PLAN.md. Use whenever the work touches his tasks or plans rather than code.
---

# Life operations

## Before anything

```sh
make brief          # four filter queries, a few hundred tokens
cat memory/learned.txt
```

Use the `todoist` CLI, never the MCP server. Query with Todoist's own filter
syntax rather than listing everything and filtering yourself:

```sh
todoist list --filter 'overdue & p1' --csv --header
todoist list --filter '##Goals & @Action' --csv --header
todoist list --filter 'search: passport' --csv --header
todoist show <id>          # full detail for ONE task — never loop this
```

## The failure mode in this system

**Aspiration without a next action.** Sachin writes excellent goal statements
(`As a X, I want Y, so that Z`) and then attaches nothing doable. Twelve of
seventeen goals were in that state in Aug 2026; two were over three years old.

When you find one you have exactly three moves. There is no fourth:

1. Attach one concrete, dated action.
2. Move it to ⛔️ Neglect, deliberately, for a named period.
3. Delete it.

"Leave it and revisit" is how a goal reaches four years old.

Finding them needs a parent/child join that filters cannot express, so do it by
eye during a review, not on every brief.

## Writing a good action

Names a physical thing to do, fits one sitting, has a date. Rewrite anything that
fails that test.

- Bad: `Complete 20% of PCA Certification Learning path`, every workday — five
  workdays would finish the certification. Impossible tasks train skipping.
- Good: `PCA study — 45 min`, every workday, anchored to a booked exam date.

Check the arithmetic of a recurrence before writing it, and check that a parent
is not dated after its own children.

## Reviews

- **Weekly**, Sun 7pm — triage overdue, name the week's two real priorities.
- **Monthly**, 1st — budget and investment transfers, before spending.
- **Quarterly** — set the neglect list. That is the whole agenda.

Do not propose a new recurring review. There were five overlapping ones; they were
collapsed to two plus a quarterly for a reason.

## Money

Reconcile any figure against `state/decisions.md`. The stated monthly investing
commitment (₹1.32L across three goals) and the actual floor (₹20k) differ by 6.6x
and the gap is unresolved. Never present a projection built on either number
without saying which one you used and that it is still open.

## Finishing

Append to `memory/learned.txt` and `state/log.md`, then commit. That log is how
the next session starts warm.
