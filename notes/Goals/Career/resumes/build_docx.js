#!/usr/bin/env node
// build_docx.js — the editable Word copies of the career documents.
//
//   node build_docx.js               # all of them, into ../
//   node build_docx.js resume        # just one
//   node build_docx.js all ../       # explicit output directory
//   node build_docx.js resume ../ --verbose    # report CSS it could not map
//
// **One source, two renderers.** Chromium prints the .html to PDF; docx/fromhtml
// reads the same .html and its stylesheet and writes the .docx. The two cannot
// drift, because there is nothing to keep in step — change the HTML and both
// follow. Check the result with `bin/docx --check`, which renders the .docx back
// to PNGs beside the PDF's.
//
// The ATS file comes from HTML too, and its stylesheet is where its plainness
// is enforced: one column, no tables, no images, and `--docx-style: Heading1`
// on the section headings so a parser gets real outline structure rather than
// text that merely looks like a heading.
const path = require('path');

const CAREER = path.join(__dirname, '..');
const fromHtml = require('./docx/fromhtml');

const DOCS = {
  resume:   { file: 'Sachin_Koli_Resume.docx',       html: 'Sachin_Koli_Resume.html' },
  onepager: { file: 'Sachin_Koli_OnePager.docx',     html: 'Sachin_Koli_OnePager.html' },
  card:     { file: 'Sachin_Koli_Profile_Card.docx', html: 'Sachin_Koli_Profile_Card.html' },
  // Paste sheets, not documents to send: the words go into fields on a website.
  // They still get a .docx, because reviewing and correcting copy is the same
  // job whatever the destination.
  linkedin: { file: 'Sachin_Koli_LinkedIn.docx',     html: 'Sachin_Koli_LinkedIn.html',
              noPdf: 'paste sheet — nobody prints it, and the two renderers pick different monospace faces' },
  bio:      { file: 'Sachin_Koli_Public_Bio.docx',   html: 'Sachin_Koli_Public_Bio.html',
              noPdf: 'paste sheet — nobody prints it' },
  ats:      { file: 'Sachin_Koli_Resume_ATS.docx',   html: 'Sachin_Koli_Resume_ATS.html',
              noPdf: 'the .docx IS the deliverable — no ATS PDF is ever published' },
};

async function main() {
  const args = process.argv.slice(2);
  // bin/docx asks for this so it does not have to know which documents have a
  // PDF worth comparing against. Some HTML here is a build source, not a
  // deliverable: nothing is ever printed from it, so a page-count difference is
  // not a defect.
  if (args[0] === '--no-pdf-compare') {
    Object.values(DOCS).filter((d) => d.noPdf)
      .forEach((d) => console.log(`${d.file}\t${d.noPdf}`));
    return;
  }
  const flags = args.filter((a) => a.startsWith('--'));
  const rest = args.filter((a) => !a.startsWith('--'));
  const verbose = flags.includes('--verbose');
  const which = !rest[0] || rest[0] === 'all' ? Object.keys(DOCS) : [rest[0]];
  const outDir = rest[1] || CAREER;

  const unknown = which.filter((w) => !DOCS[w]);
  if (unknown.length) {
    console.error(`build_docx: unknown document ${unknown.join(', ')}`);
    console.error(`            try: ${Object.keys(DOCS).join(' | ')} | all`);
    process.exit(2);
  }

  const { write } = require('./docx/pack');
  for (const key of which) {
    const spec = DOCS[key];
    const out = path.join(outDir, spec.file);
    const doc = spec.html ? fromHtml(path.join(CAREER, spec.html), { verbose }) : spec.build();
    const bytes = await write(doc, out);
    const from = spec.html || 'docx/ats.js';
    console.log(`${key.padEnd(9)} ${from.padEnd(32)} -> ${out}  (${bytes.toLocaleString()} bytes)`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
