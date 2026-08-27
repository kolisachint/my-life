---
description: Pull Todoist changes and show what needs attention
---

Run `make sync`, then read `data/brief.md` and summarise:

1. Anything overdue, with how many days it has slipped
2. What is due today
3. Any blocking chain (a dated task whose prerequisite is undated or overdue)

Do not read `data/store.json`. Do not call Todoist MCP tools. If you need a task's
long description, `cat data/notes/<id>.md` for that one task only.
