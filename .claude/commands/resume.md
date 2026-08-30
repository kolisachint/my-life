---
description: Refresh the career document set — resume, ATS file, one-pager, profile card
---

Refresh the career documents: $ARGUMENTS

Read the `career-docs` skill first. It has the twelve documents, the
confidentiality rule, the print-CSS traps and the environment gotchas.

**The sweep, in order:**

1. `cat data/career-facts.md` — the single source of truth. Everything derives
   from it.
2. `bin/portfolio` — refresh the open-source inventory. His repos move fast; do
   this before claiming anything about the AI half.
3. Apply the change to **`data/career-facts.md` first**, then to every consumer
   it names. There are twelve and the file lists them — do not update three and
   call it done.
4. Re-render each changed artefact:
   `bin/pub notes/Goals/Career/<name>.html --project Goals --section Career --repo --pdf`
5. **`bin/pdfcheck` each rendered PDF, then Read the PNGs.** Page count, orphaned
   headings, dead space, leftover `[N]`. Never skip this — every layout defect
   ever found here was found this way.
6. **`bin/docx --check`** — rebuilds all four Word files (resume, one-pager,
   profile card, ATS) and validates them. They are his review copies; a PDF
   changed without its `.docx` twin leaves him editing a stale document.
   If he has been through one in Word first, run `bin/docx --diff <file>`
   BEFORE rebuilding, or you overwrite his edits.
7. Append what you learned to `memory/learned.txt`, add a `state/log.md` entry,
   commit.

**Before finishing, state plainly:** which of the twelve changed, which you left
alone and why, and anything you could not verify.

If he has supplied new numbers, put them where the `[N]` placeholders are and say
which are still outstanding.
