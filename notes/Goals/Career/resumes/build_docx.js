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
// The ATS file is the one exception and stays hand-built: it is deliberately
// plain — one column, no tables, no styling for a parser to trip on — so it has
// no HTML twin to render from.
const path = require('path');

const CAREER = path.join(__dirname, '..');
const fromHtml = require('./docx/fromhtml');

const DOCS = {
  resume:   { file: 'Sachin_Koli_Resume.docx',       html: 'Sachin_Koli_Resume.html' },
  onepager: { file: 'Sachin_Koli_OnePager.docx',     html: 'Sachin_Koli_OnePager.html' },
  card:     { file: 'Sachin_Koli_Profile_Card.docx', html: 'Sachin_Koli_Profile_Card.html' },
  ats:      { file: 'Sachin_Koli_Resume_ATS.docx',   build: require('./docx/ats') },
};

async function main() {
  const args = process.argv.slice(2);
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
