#!/usr/bin/env node
// build_docx.js — the editable Word copies of the career documents.
//
//   node build_docx.js               # all four, into ../
//   node build_docx.js resume        # just one
//   node build_docx.js all ../       # explicit output directory
//
// Why these exist: the PDFs are what he SENDS; the .docx is what he OPENS to
// review and correct. Edits made in Word do not flow back on their own — run
// `bin/docx --diff FILE` to see what he changed, then fold it into
// data/career-facts.md and the HTML/master, and rebuild. The .docx is a review
// copy, never the source of truth.
const path = require('path');

const DOCS = {
  resume:   { file: 'Sachin_Koli_Resume.docx',       build: require('./docx/resume') },
  onepager: { file: 'Sachin_Koli_OnePager.docx',     build: require('./docx/onepager') },
  card:     { file: 'Sachin_Koli_Profile_Card.docx', build: require('./docx/card') },
  ats:      { file: 'Sachin_Koli_Resume_ATS.docx',   build: require('./docx/ats') },
};

async function main() {
  const args = process.argv.slice(2);
  const which = !args[0] || args[0] === 'all' ? Object.keys(DOCS) : [args[0]];
  const outDir = args[1] || path.join(__dirname, '..');

  const unknown = which.filter((w) => !DOCS[w]);
  if (unknown.length) {
    console.error(`build_docx: unknown document ${unknown.join(', ')}`);
    console.error(`            try: ${Object.keys(DOCS).join(' | ')} | all`);
    process.exit(2);
  }

  const { write } = require('./docx/style');
  for (const key of which) {
    const { file, build } = DOCS[key];
    const out = path.join(outDir, file);
    const bytes = await write(build(), out);
    console.log(`${key.padEnd(9)} -> ${out}  (${bytes.toLocaleString()} bytes)`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
