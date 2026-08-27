---
name: life-ops
description: Planning and reviewing Sachin's life system — his goals, the weekly and quarterly review, money decisions, and LIFE-PLAN.md. Use when the work is about his plans rather than about operating Todoist.
---

# Life operations

**Todoist mechanics are not here.** Doist ships the `todoist-cli` skill in this
repo covering every `td` command, flag and gotcha. Use it. This file is only what
is specific to Sachin.

Start with `make brief`, then `cat memory/learned.txt`.

## The failure mode in this system

**Aspiration without a next action.** Sachin writes excellent goal statements
(`As a X, I want Y, so that Z`) and then attaches nothing doable. Twelve of
seventeen goals were in that state in Aug 2026; two were over three years old.

When you find one there are exactly three moves. There is no fourth:

1. Attach one concrete, dated action.
2. Move it to ⛔️ Neglect, deliberately, for a named period.
3. Delete it.

"Leave it and revisit" is how a goal reaches four years old.

## What makes an action real

Names a physical thing to do, fits one sitting, has a date. Rewrite anything that
fails that test.

- Bad: `Complete 20% of PCA Certification Learning path`, every workday — five
  workdays would finish the certification. Impossible tasks train skipping.
- Good: `PCA study — 45 min`, every workday, anchored to a booked exam date.

Check the arithmetic of a recurrence before writing it, and check that a parent is
not dated after its own children.

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

Append to `memory/learned.txt` and `state/log.md`, then commit.
