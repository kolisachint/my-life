// Shared Word primitives for the career documents.
//
// Everything here is ordinary Word furniture on purpose — real paragraph
// styles, real bullets, real tables. No text boxes, no frames, no floating
// shapes. He opens these to READ and EDIT them; anything clever gets in the way
// of a cursor.
//
// The palette echoes the rendered PDFs so the Word copy and the PDF are
// recognisably the same document.
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, LevelFormat, TabStopType,
  convertInchesToTwip,
} = require('docx');
const fs = require('fs');

const FONT = 'Calibri';
const MONO = 'Consolas';

const INK = '0B0D0F';   // headings, names
const BODY = '1A1D21';  // body text
const TEAL = '0B5C4D';  // the one accent, same as the PDFs
const MUTED = '5A646C'; // dates, captions
const RULE = 'D8DEE2';  // hairlines
const WASH = 'F4F7F6';  // the tinted panel on the one-pager

const pt = (n) => Math.round(n * 2);          // docx sizes are half-points
const BULLETS = 'career-bullets';

// ---------------------------------------------------------------------------
// rich(): the content files write "**bold** and `mono` text" and get runs back.
// Keeps the content readable as prose instead of a wall of TextRun literals.
// ---------------------------------------------------------------------------
function rich(text, opts = {}) {
  const base = {
    font: opts.font || FONT,
    size: opts.size || pt(10),
    color: opts.color || BODY,
    italics: !!opts.italics,
  };
  const out = [];
  const re = /\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(new TextRun({ ...base, text: text.slice(last, m.index) }));
    if (m[1] !== undefined) {
      out.push(new TextRun({ ...base, text: m[1], bold: true, color: opts.strongColor || INK }));
    } else {
      out.push(new TextRun({ ...base, text: m[2], font: MONO, size: base.size - 1 }));
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(new TextRun({ ...base, text: text.slice(last) }));
  return out;
}

// ---------------------------------------------------------------------------
// paragraph furniture
// ---------------------------------------------------------------------------
function para(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.before || 0, after: opts.after === undefined ? 60 : opts.after, line: opts.line || 250 },
    indent: opts.indent,
    keepNext: !!opts.keepNext,
    keepLines: opts.keepLines !== false,
    border: opts.border,
    shading: opts.shading,
    children: typeof text === 'string' ? rich(text, opts) : text,
  });
}

function name(text) {
  return new Paragraph({
    spacing: { after: 20, line: 240 },
    keepNext: true,
    children: [new TextRun({ text, bold: true, size: pt(25), color: INK, font: FONT })],
  });
}

function subtitle(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after === undefined ? 20 : opts.after, line: 240 },
    keepNext: true,
    children: [new TextRun({ text, bold: true, size: opts.size || pt(11.5), color: opts.color || TEAL, font: FONT })],
  });
}

// A contact strip: plain text on one line, never a Word header — a header is
// invisible to half the parsers that read these files.
function contact(parts, opts = {}) {
  const children = [];
  parts.forEach((p, i) => {
    if (i) children.push(new TextRun({ text: '  ·  ', size: pt(9), color: RULE, font: FONT }));
    children.push(new TextRun({ text: p, size: opts.size || pt(9), color: MUTED, font: FONT }));
  });
  return new Paragraph({
    spacing: { before: 60, after: 120, line: 240 },
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 4 } },
    children,
  });
}

// Section rule — teal, uppercase, letterspaced, and glued to what follows so a
// heading can never strand at the foot of a page.
function heading(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before === undefined ? 200 : opts.before, after: 70, line: 240 },
    keepNext: true,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: TEAL, space: 2 } },
    children: [new TextRun({
      text: text.toUpperCase(),
      bold: true, size: pt(9), color: TEAL, font: FONT, characterSpacing: 22,
    })],
  });
}

// Employer left, dates right, on one line, via a right tab stop.
function roleHead(employer, dates, opts = {}) {
  return new Paragraph({
    keepNext: true,
    spacing: { before: opts.before === undefined ? 100 : opts.before, after: 0, line: 240 },
    // right edge of the text column: A4 (11906) less the resume's 680 margins
    tabStops: [{ type: TabStopType.RIGHT, position: opts.width || 10546 }],
    children: [
      new TextRun({ text: employer, bold: true, size: pt(11), color: INK, font: FONT }),
      new TextRun({ text: '\t' + dates, bold: true, size: pt(9), color: MUTED, font: FONT }),
    ],
  });
}

function roleSub(text, opts = {}) {
  return new Paragraph({
    keepNext: true,
    spacing: { after: opts.after === undefined ? 20 : opts.after, line: 240 },
    children: rich(text, { size: pt(9.5), color: opts.color || '35424A', strongColor: opts.color || INK }),
  });
}

function client(text) {
  return new Paragraph({
    keepNext: true,
    spacing: { before: 40, after: 30, line: 240 },
    children: rich(text, { size: pt(9), color: TEAL, strongColor: TEAL }),
  });
}

function bullet(text, opts = {}) {
  return new Paragraph({
    numbering: { reference: BULLETS, level: opts.level || 0 },
    spacing: { after: opts.after === undefined ? 40 : opts.after, line: 250 },
    keepLines: true,
    children: rich(text, { size: opts.size || pt(10) }),
  });
}

function spacer(size = 80) {
  return new Paragraph({ spacing: { after: size, line: 120 }, children: [] });
}

// ---------------------------------------------------------------------------
// tables — used for the skills grid and for the card's columns. Borderless
// except where a hairline is wanted; Word users can still click into any cell.
// ---------------------------------------------------------------------------
const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NONE_ALL = { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER,
                   insideHorizontal: NO_BORDER, insideVertical: NO_BORDER };

function cell(children, opts = {}) {
  return new TableCell({
    width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    margins: opts.margins || { top: 30, bottom: 30, left: 0, right: 120 },
    shading: opts.shading,
    borders: opts.borders || NONE_ALL,
    children: Array.isArray(children) ? children : [children],
  });
}

// Label / value rows with a hairline under each — the TECHNICAL block.
function labelledRows(rows, opts = {}) {
  const keyWidth = opts.keyWidth || 16;
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: NONE_ALL,
    rows: rows.map(([k, v], i) => new TableRow({
      cantSplit: true,
      children: [
        cell(para(k, { after: 0, size: pt(9.5), strongColor: INK, line: 240 }), {
          width: keyWidth,
          borders: { ...NONE_ALL, bottom: { style: BorderStyle.SINGLE, size: 2, color: 'EAEEF0' } },
        }),
        cell(para(v, { after: 0, size: pt(9.5), line: 240 }), {
          width: 100 - keyWidth,
          borders: { ...NONE_ALL, bottom: { style: BorderStyle.SINGLE, size: 2, color: 'EAEEF0' } },
        }),
      ],
    })),
  });
}

// ---------------------------------------------------------------------------
// document assembly
// ---------------------------------------------------------------------------
function makeDoc({ children, landscape = false, margin, title, description }) {
  const m = margin || { top: 640, right: 700, bottom: 620, left: 700 };
  return new Document({
    title,
    description,
    creator: 'Sachin Koli',
    styles: {
      default: {
        document: { run: { font: FONT, size: pt(10), color: BODY } },
      },
      paragraphStyles: [
        { id: 'Normal', name: 'Normal', quickFormat: true,
          run: { font: FONT, size: pt(10), color: BODY },
          paragraph: { spacing: { line: 250 } } },
      ],
    },
    numbering: {
      config: [{
        reference: BULLETS,
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: convertInchesToTwip(0.22), hanging: convertInchesToTwip(0.16) } } } },
          { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: convertInchesToTwip(0.44), hanging: convertInchesToTwip(0.16) } } } },
        ],
      }],
    },
    sections: [{
      properties: {
        page: {
          // A4, always given portrait-wise: docx swaps the two itself when the
          // orientation is landscape. Pre-swapping them swaps them back.
          size: { orientation: landscape ? 'landscape' : 'portrait', width: 11906, height: 16838 },
          margin: m,
        },
      },
      children,
    }],
  });
}

async function write(doc, out) {
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(out, buf);
  return buf.length;
}

module.exports = {
  FONT, MONO, INK, BODY, TEAL, MUTED, RULE, WASH, pt, BULLETS,
  rich, para, name, subtitle, contact, heading, roleHead, roleSub, client,
  bullet, spacer, cell, labelledRows, makeDoc, write,
  NO_BORDER, NONE_ALL,
  docx: require('docx'),
};
