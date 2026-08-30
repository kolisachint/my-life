#!/usr/bin/env node
// build_ats.js — kept because this is the command written down in the skill, the
// README and career-facts.md. The ATS resume is now rendered from
// ../Sachin_Koli_Resume_ATS.html like every other document; this just delegates.
//
//   node build_ats.js ../Sachin_Koli_Resume_ATS.docx
//   node build_docx.js ats                              # same thing
const path = require('path');
const { write } = require('./docx/pack');
const fromHtml = require('./docx/fromhtml');

const src = path.join(__dirname, '..', 'Sachin_Koli_Resume_ATS.html');
const out = process.argv[2] || path.join(__dirname, '..', 'Sachin_Koli_Resume_ATS.docx');
write(fromHtml(src), out).then((bytes) => console.log('wrote', out, bytes, 'bytes'));
