---
name: life-ops
description: Planning, reviewing and restructuring Sachin's life system in this repo. Use when the task involves Todoist tasks, goals, the weekly or quarterly review, money planning, or updating LIFE-PLAN.md. Not needed for ordinary code work.
---

# Life operations

## Before anything else

`make sync && cat data/brief.md`. Never reach for a Todoist MCP server — the CLI
exists precisely because MCP reads cost ~20x more tokens.

## How this system fails, and what to do about it

The recurring failure mode here is **aspiration without a next action**. Sachin
writes excellent goal statements (`As a X, I want Y, so that Z`) and then does
not attach anything doable. `data/brief.md` reports these under *Goals with no
dated next action*.

When you find one, you have exactly three moves. Never a fourth:

1. Attach one concrete, dated action.
2. Move it to the ⛔️ Neglect section, deliberately, for a named period.
3. Delete it.

"Leave it and revisit" is how a goal reaches four years old. Two of his have.

## Writing a good action

A next action names a physical thing to do, fits one sitting, and has a date.
Rewrite anything that fails that test.

- Bad: `Complete 20% of PCA Certification Learning path` (every workday) — five
  workdays would finish the certification. Impossible tasks train skipping.
- Good: `PCA study — 45 min` (every workday), anchored to a booked exam date.

Check recurrence arithmetic before you write it. Check that a task's parent is
not dated *after* its children.

## Reviews

- **Weekly** (Sun 7pm) — triage overdue, name the week's two real priorities.
- **Monthly** (1st) — budget and investment transfers, before spending.
- **Quarterly** — set the neglect list. That is the whole agenda.

If you find yourself proposing a new recurring review, don't. There were five
overlapping ones; they were collapsed to two plus a quarterly for a reason.

## Money

Any number you state must reconcile against `state/decisions.md`. The stated
monthly investing commitment (₹1.32L across three goals) and the actual floor
(₹20k) differ by 6.6x and the gap is unresolved. Do not quietly plan against
either figure — if it matters to the answer, say which one you used and that it
is still open.

## Finishing

Any session that changes Todoist or settles a decision must append to
`state/log.md` and commit. That log is how the next session starts warm.
