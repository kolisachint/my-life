---
description: Publish a file to Dropbox or the repo, in the Todoist Project/Section tree
---

Publish: $ARGUMENTS

Use `bin/pub` — one command covers render, folder creation, upload and link.

Pick the destination first (AGENTS.md): human-facing → Dropbox (default);
long-term memory → `--repo`; tentative → `--tmp` then delete. Always pass
`--project` and `--section`, taking the names from the `artifact-publish` skill
rather than querying `td`. Add `--pdf` for HTML.

Report the share link back.
