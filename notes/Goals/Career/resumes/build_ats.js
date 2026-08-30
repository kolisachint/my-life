#!/usr/bin/env node
// build_ats.js — kept because it is the command written down in the skill, the
// README and career-facts.md. The content moved to docx/ats.js; every Word
// build now goes through build_docx.js.
//
//   node build_ats.js ../Sachin_Koli_Resume_ATS.docx
//   node build_docx.js ats                              # same thing
const path = require('path');
const { write } = require('./docx/style');
const ats = require('./docx/ats');

const out = process.argv[2] || path.join(__dirname, '..', 'Sachin_Koli_Resume_ATS.docx');
write(ats(), out).then((bytes) => console.log('wrote', out, bytes, 'bytes'));
