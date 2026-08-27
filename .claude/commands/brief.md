---
description: Refresh the Todoist brief and say what needs attention
---

Run `make brief`, then summarise in under 150 words:

1. Anything overdue, and how many days it has slipped
2. What is due today
3. Any blocking chain — a dated task whose prerequisite is undated or overdue

Use the `td` CLI only, never a Todoist MCP server. For one task's full detail,
`td task <id>` for that task alone.
