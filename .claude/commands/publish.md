---
description: Publish a file to Dropbox /my-life, with a PDF if it is HTML
---

Publish: $ARGUMENTS

Use `bin/pub`. Decide the destination first, per AGENTS.md:
human-facing → Dropbox; long-term memory → repo; tentative → `--tmp` then delete.

Add `--pdf` for HTML. Report the share link back. Do not call `dbxcli` directly
and do not render the PDF yourself — `bin/pub` does both.
