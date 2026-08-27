---
description: Refresh the Todoist brief and say what needs attention
---

Run `make brief`, then summarise in under 150 words:

1. Anything overdue, and how many days it has slipped
2. What is due today
3. Any blocking chain — a dated task whose prerequisite is undated or overdue

Use the `todoist` CLI only. Do not call a Todoist MCP server. If you need one
task's full detail, `todoist show <id>` for that task alone.
