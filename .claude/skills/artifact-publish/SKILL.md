---
name: artifact-publish
description: Producing any artefact for Sachin — HTML page, PDF, report, chart, deck, export — and placing it correctly. Use whenever the output is a file rather than a chat answer. Covers PDF rendering, Dropbox publishing, and the Project/Section tree.
---

# Publishing artefacts

## One command does all of it

```sh
bin/pub FILE --project <P> --section <S> [--pdf]     # -> Dropbox, prints share link
bin/pub FILE --task <id> --pdf                       # infers P/S from the task
bin/pub FILE --project <P> --section <S> --repo      # -> notes/, long-term memory
bin/pub FILE --tmp                                   # -> nowhere, delete after
```

Never call `dbxcli` by hand, never shell out to Chromium yourself, never write a
Markdown→PDF converter, never `mkdir` a destination. `bin/pub` does render →
lazy-mkdir → upload → share link. If it is missing something, extend it.

## Where it goes — decide before writing the file

| Kind | Destination | Flag |
| --- | --- | --- |
| A human will read or keep it | Dropbox `/my-life/…` | *(default)* |
| I must know it next session | `notes/…` in this repo | `--repo` |
| Tentative, exploratory, one-off | nowhere | `--tmp`, then delete |

A report that lands in the repo is in the wrong place; a scratch file that gets
committed is noise forever.

## The tree mirrors Todoist

Both Dropbox and `notes/` use **Project / Section**, exactly as Todoist does.
Emoji are stripped, spaces become hyphens — pass either form, `bin/pub` slugifies.

```
Todoist   ⚽️ Goals  >  💲Money  >  task
Dropbox   /my-life/Goals/Money/2026-08-27-plan.pdf
repo      notes/Goals/Money/plan.md
```

**Use this table instead of querying `td` — that is the whole token saving:**

| Project | Sections |
| --- | --- |
| `Goals` | `Money` · `Career` · `Care` · `Neglect` · `Identity` · `Socialise` · `Productivity` |
| `BucketList` | `Leisure` · `Travel` · `Shopping` |
| `Everyday-Life` | `Household` · `Money` · `Productivity` · `Care` · `OfficeWork` |

Only run `td project list` if something you need is genuinely absent above — then
append it here so the next session does not have to.

Folders are created on demand. Nothing is pre-built, and no project or section is
created in Dropbox until an artefact actually needs it. With no `--project`,
files land in `_inbox` — treat that as a bug in your own reasoning, not a default.

## Writing HTML that will become a PDF

Chromium prints it, so print rules apply:

- Set an explicit `background` on `body`; Chromium prints white otherwise.
- `break-inside: avoid` on tables and cards; use `@media print` for page breaks.
- Single column, under ~700px of content width. Screen layouts print badly.
- Fully self-contained — inline CSS, no external stylesheets, no remote images,
  no CDN fonts. It renders from a `file://` URL with no network.

**For anything denser than a one-page report** — a document with a page budget,
headings that must not strand, or a fixed-size landscape page — read the
**`html-to-pdf`** skill. It has the print CSS that works, the page-fitting rules
and the rasterise-and-look step. If the same file also has to become a Word
document, that is **`html-to-docx`**, and **`docx-pdf-parity`** checks the two
still agree.

## After publishing

Print the share link in your reply — that is what Sachin actually wants. If the
artefact matters beyond this session, append one line to `memory/learned.txt`
naming what it is and where it lives.
