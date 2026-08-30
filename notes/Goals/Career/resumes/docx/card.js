// Sachin_Koli_Profile_Card.docx — the editable twin of the A4 **landscape**
// profile card. The PDF/PNG stay the artefacts he sends; this is the copy he
// opens to fix the words before a rebuild.
//
// Layout follows the card: header band (headshot · identity · contact), then a
// four-tile proof strip, then three columns. Tables, not text boxes — a text
// box looks the same and cannot be edited comfortably.
const fs = require('fs');
const path = require('path');
const S = require('./style');
const { Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle,
        ImageRun, AlignmentType } = S.docx;

const CARD_HTML = path.join(__dirname, '..', '..', 'Sachin_Koli_Profile_Card.html');

// The headshot lives as a data URI inside the card HTML — one source, so a new
// photograph swapped into the HTML lands here too.
function headshot() {
  if (!fs.existsSync(CARD_HTML)) return null;
  const m = /src="data:image\/(\w+);base64,([^"]+)"/.exec(fs.readFileSync(CARD_HTML, 'utf8'));
  if (!m) return null;
  return { type: m[1], data: Buffer.from(m[2], 'base64') };
}

const HAIR = { style: BorderStyle.SINGLE, size: 4, color: S.RULE };

function tile(fig, cap, sub) {
  return new TableCell({
    width: { size: 25, type: WidthType.PERCENTAGE },
    margins: { top: 90, bottom: 90, left: 120, right: 120 },
    borders: { top: HAIR, bottom: HAIR, left: HAIR, right: HAIR },
    children: [
      new Paragraph({ spacing: { after: 20, line: 240 }, children: [
        new TextRun({ text: fig, bold: true, size: S.pt(17), color: S.TEAL, font: S.FONT })] }),
      new Paragraph({ spacing: { after: 10, line: 220 }, children: [
        new TextRun({ text: cap, bold: true, size: S.pt(9), color: S.INK, font: S.FONT })] }),
      new Paragraph({ spacing: { after: 0, line: 220 }, children: [
        new TextRun({ text: sub, size: S.pt(8), color: S.MUTED, font: S.FONT })] }),
    ],
  });
}

function colHeading(text, opts = {}) {
  return new Paragraph({
    keepNext: true,
    spacing: { before: opts.before || 0, after: 60, line: 240 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: S.TEAL, space: 2 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: S.pt(8.5),
                             color: S.TEAL, font: S.FONT, characterSpacing: 20 })],
  });
}

// "Cloud Data Platform" with its period set right, then the prose, then the
// monospace token line that carries the stack.
function block(title, when, body, tokens) {
  return [
    new Paragraph({ keepNext: true, spacing: { before: 90, after: 10, line: 230 }, children: [
      new TextRun({ text: title + '  ', bold: true, size: S.pt(9.5), color: S.INK, font: S.FONT }),
      new TextRun({ text: when, italics: true, size: S.pt(8), color: S.MUTED, font: S.FONT }),
    ] }),
    new Paragraph({ spacing: { after: 20, line: 230 }, children: S.rich(body, { size: S.pt(8.5) }) }),
    new Paragraph({ spacing: { after: 0, line: 230 }, children: [
      new TextRun({ text: tokens, size: S.pt(7.5), color: S.TEAL, font: S.MONO })] }),
  ];
}

function repo(nm, stack, body) {
  return [
    new Paragraph({ keepNext: true, spacing: { before: 90, after: 10, line: 230 }, children: [
      new TextRun({ text: nm, bold: true, size: S.pt(9.5), color: S.INK, font: S.MONO }),
      new TextRun({ text: '   ' + stack, size: S.pt(7.5), color: S.MUTED, font: S.MONO }),
    ] }),
    new Paragraph({ spacing: { after: 0, line: 230 }, children: S.rich(body, { size: S.pt(8.5) }) }),
  ];
}

function defRow(term, value, sub) {
  const children = [
    new TextRun({ text: term, size: S.pt(7.5), color: S.MUTED, font: S.MONO }),
    new TextRun({ text: '   ' }),
    new TextRun({ text: value, bold: true, size: S.pt(9), color: S.INK, font: S.FONT }),
  ];
  if (sub) children.push(new TextRun({ text: '  ' + sub, size: S.pt(8), color: S.MUTED, font: S.FONT }));
  return new Paragraph({ spacing: { after: 40, line: 230 }, children });
}

module.exports = function card() {
  const c = [];
  const shot = headshot();

  // ---- header band -------------------------------------------------------
  const identity = [
    new Paragraph({ spacing: { after: 20, line: 260 }, children: [
      new TextRun({ text: 'Sachin Koli', bold: true, size: S.pt(24), color: S.INK, font: S.FONT })] }),
    new Paragraph({ spacing: { after: 20, line: 240 }, children: [
      new TextRun({ text: 'Solution Architect — Cloud Data & AI Platforms', bold: true,
                    size: S.pt(11), color: S.TEAL, font: S.FONT })] }),
    new Paragraph({ spacing: { after: 0, line: 240 }, children: [
      new TextRun({ text: 'Google Cloud Certified — Professional Data Engineer', bold: true,
                    size: S.pt(8.5), color: '35424A', font: S.FONT }),
      new TextRun({ text: ' · Cloud Architect in progress', size: S.pt(8.5), color: S.MUTED, font: S.FONT })] }),
  ];

  const contactLines = ['Pune, India', '+91 95522 36200', 'kolisachint@gmail.com',
                        'linkedin.com/in/kolisachint', 'github.com/kolisachint']
    .map((t) => new Paragraph({ spacing: { after: 0, line: 220 }, alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: t, size: S.pt(8), color: S.MUTED, font: S.FONT })] }));

  const headCells = [];
  if (shot) {
    headCells.push(new TableCell({
      width: { size: 9, type: WidthType.PERCENTAGE },
      margins: { top: 0, bottom: 0, left: 0, right: 160 },
      borders: S.NONE_ALL,
      children: [new Paragraph({ spacing: { after: 0 }, children: [new ImageRun({
        type: shot.type, data: shot.data,
        transformation: { width: 74, height: 87 },   // 26mm wide, 360:421
      })] })],
    }));
  }
  headCells.push(new TableCell({
    width: { size: shot ? 61 : 70, type: WidthType.PERCENTAGE },
    margins: { top: 0, bottom: 0, left: 0, right: 120 },
    borders: S.NONE_ALL, children: identity,
  }));
  headCells.push(new TableCell({
    width: { size: 30, type: WidthType.PERCENTAGE },
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    borders: S.NONE_ALL, children: contactLines,
  }));

  c.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: S.NONE_ALL,
    rows: [new TableRow({ cantSplit: true, children: headCells })],
  }));
  c.push(new Paragraph({ spacing: { before: 60, after: 120, line: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: S.INK, space: 2 } }, children: [] }));

  // ---- proof strip — the three-second read -------------------------------
  c.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: S.NONE_ALL,
    rows: [new TableRow({ cantSplit: true, children: [
      tile('18 yrs', 'Enterprise data & cloud', 'Banking · Retail · Telecom'),
      tile('$600K', 'Annual cost removed', 'Preference Center API on GCP, Sears'),
      tile('2024', 'Banking Tech Awards', 'Self-serve fraud journey — architect'),
      tile('2025', 'Card & Payments Awards', 'Self-serve fraud journey — architect'),
    ] })],
  }));
  c.push(S.spacer(160));

  // ---- three columns -----------------------------------------------------
  const colA = [colHeading('What I build')];
  block('Cloud Data Platform', '2025 —',
    'Architect of the batch and real-time streaming platform for a **UK tier-1 retail bank**. Event-driven ingestion, hybrid orchestration bridging a legacy enterprise scheduler with cloud workflows, modelled warehouse, provisioned as code.',
    'Confluent Kafka · Cloud Composer · Airflow · dbt · BigQuery · Terraform · CI/CD').forEach((p) => colA.push(p));
  block('Applied AI', 'open source',
    'A published agent ecosystem: a **terminal coding agent on npm**, and the Rust beneath it — embedding search with an ANN index written from scratch, offline speech recognition, token-efficient web retrieval.',
    'Rust · TypeScript · ONNX Runtime · HNSW · BM25 hybrid retrieval · MCP · 25+ LLM providers').forEach((p) => colA.push(p));
  block('Payments & Cards', '2022 — 2025',
    'Led modernisation of **Digital Cards** — Add to Wallet, card controls, View PIN — from on-premise to GCP, with the secure microservice and cross-cloud API patterns a regulated estate needs.',
    'GCP · microservices · API gateways · containerisation · compliance').forEach((p) => colA.push(p));

  const colB = [colHeading('Shipped, in public  ·  github.com/kolisachint')];
  repo('hoocode', 'TypeScript · npm', 'Deterministic terminal coding agent. Permission gate on every edit and command; four scoped modes; MCP servers and subagents. Four packages, including a unified LLM API across 25+ providers.').forEach((p) => colB.push(p));
  repo('embeddingsearchtools', 'Rust', 'Embedding search engine. MiniLM via ONNX Runtime, int8 weights bundled into the binary; exact and **HNSW approximate** indexes; BM25 lexical fusion for hybrid retrieval; mmap store, CLI and daemon.').forEach((p) => colB.push(p));
  repo('voicetools', 'Rust', 'Offline speech-to-text. Microphone capture through voice-activity detection into Parakeet-TDT on ONNX Runtime, 25 languages, Whisper fallback.').forEach((p) => colB.push(p));
  repo('webtools', 'Rust', 'Token-efficient fetch and search for LLM agents. Reference-style URL preservation turns links into single-token markers under a token budget.').forEach((p) => colB.push(p));

  const colC = [colHeading('Clients')];
  [['Banking UK', 'Lloyds Banking Group'], ['Retail US', 'Sears Holdings'],
   ['Telecom SAU', 'Saudi Telecom'], ['Banking UK', 'Barclays'],
   ['Telecom AU', 'Telstra']].forEach(([t, v]) => colC.push(defRow(t, v)));
  colC.push(colHeading('Track', { before: 160 }));
  [['2021—', 'Tata Consultancy Services', 'Solution Architect'],
   ['2018—21', 'Sears India', 'Architect'],
   ['2010—18', 'Cognizant', 'Sr. Associate — Projects'],
   ['2008—10', 'Mahindra Satyam', 'Software Developer'],
   ['2003—07', 'BE Computer Science', 'Walchand COE, Sangli']].forEach(([t, v, s]) => colC.push(defRow(t, v, s)));

  const col = (children, width, last) => new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    margins: { top: 0, bottom: 0, left: last ? 200 : 0, right: last ? 0 : 200 },
    borders: last ? S.NONE_ALL : { ...S.NONE_ALL, right: { style: BorderStyle.SINGLE, size: 4, color: S.RULE } },
    children,
  });

  c.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: S.NONE_ALL,
    rows: [new TableRow({ cantSplit: false, children: [
      col(colA, 36), col(colB, 38), col(colC, 26, true),
    ] })],
  }));

  c.push(new Paragraph({
    spacing: { before: 200, after: 0, line: 220 },
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: S.RULE, space: 4 } },
    children: [
      new TextRun({ text: 'Sachin Koli — Solution Architect, Cloud Data & AI Platforms',
                    size: S.pt(7.5), color: S.MUTED, font: S.FONT }),
      new TextRun({ text: '        github.com/kolisachint', size: S.pt(7.5), color: S.MUTED, font: S.MONO }),
    ],
  }));

  return S.makeDoc({
    children: c,
    landscape: true,
    title: 'Sachin Koli — Profile Card',
    description: 'Editable Word copy of Sachin_Koli_Profile_Card.pdf (A4 landscape).',
    margin: { top: 560, right: 620, bottom: 500, left: 620 },
  });
};
