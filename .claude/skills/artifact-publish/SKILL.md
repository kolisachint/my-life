---
name: artifact-publish
description: Producing any artefact for Sachin — an HTML page, PDF, report, chart, deck or export — and deciding where it goes. Use whenever output is a file rather than a chat answer. Covers rendering to PDF and publishing to Dropbox.
---

# Publishing artefacts

## Decide the destination first

| Kind | Destination | Command |
| --- | --- | --- |
| A human will read or keep it | Dropbox `/my-life` | `bin/pub file.html --pdf` |
| I must know it next session | this repo | write the file, commit |
| Tentative, exploratory, one-off | nowhere | `bin/pub file.html --tmp`, then delete |

Decide before you write the file, not after. A report that lands in the repo
instead of Dropbox is in the wrong place, and a scratch file that gets committed
is noise forever.

## Do not reinvent the pipeline

`bin/pub` already does render → upload → share link:

```sh
bin/pub report.html --pdf              # HTML + PDF to /my-life, prints links
bin/pub chart.png --dir charts         # -> /my-life/charts/
bin/pub draft.html --tmp               # local only, never uploaded
bin/pub notes.pdf --no-link            # upload without creating a share link
```

Filenames are prefixed with the date automatically. Never call `dbxcli put` by
hand, never shell out to Chromium yourself, never write a Markdown→PDF
converter. If `bin/pub` is missing something, extend it — do not work around it.

## Writing the HTML

PDF output comes from headless Chromium, so ordinary print rules apply:

- Set an explicit background on `body`; Chromium prints white otherwise.
- Use `@media print` for page breaks: `break-inside: avoid` on tables and cards.
- Keep it single-column and under ~700px of content width — a two-column layout
  designed for a screen prints badly.
- Everything must be self-contained: inline CSS, no external stylesheets or
  images, since the PDF renders from a `file://` URL with no network.
- Fonts from a CDN will not load. Use system stacks for anything destined
  for PDF.

## After publishing

Print the share link in your reply — that is what Sachin actually wants. Then, if
the artefact matters beyond this session, append one line to `memory/learned.txt`
saying what was produced and where it lives.
