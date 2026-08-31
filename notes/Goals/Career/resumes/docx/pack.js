// Write a docx Document to a file. That is the whole module — everything else
// about how these documents look lives in the HTML and its stylesheet, and is
// read by docx/fromhtml.js.
const fs = require('fs');
const { Packer } = require('docx');

async function write(doc, out) {
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(out, buf);
  return buf.length;
}

module.exports = { write };
