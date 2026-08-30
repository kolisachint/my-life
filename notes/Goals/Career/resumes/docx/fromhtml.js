// HTML -> Word. The same file Chromium prints to PDF is the file this reads,
// so the two documents cannot drift: one source, two renderers.
//
//   const doc = require('./fromhtml')('…/Sachin_Koli_Resume.html');
//
// What it maps, and how:
//
//   @page margin           -> section margins        font-size (pt)  -> half-points
//   @page size: landscape  -> page orientation       line-height     -> w:line auto
//   margin-top/bottom      -> spacing before/after   letter-spacing  -> characterSpacing
//   border-top/bottom      -> paragraph borders      text-transform  -> uppercased text
//   background             -> paragraph shading      text-align      -> alignment
//   break-after: avoid     -> keepNext               break-inside    -> keepLines
//   display:flex + justify-content:space-between  -> one paragraph, right tab stop
//   ul > li                -> real Word bullets, indented from the ul's padding-left
//   table                  -> a real Word table, cell borders from the td rules
//   <strong> <b> <em> <i> <br> <img>              -> runs, breaks, inline images
//
// It is not a browser: no flow layout, no floats, no grid, no shorthand
// expansion beyond @page. It handles what these stylesheets actually use, and
// --verbose lists every declaration it ignored so a new one cannot pass unseen.
const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const {
  Document, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  AlignmentType, BorderStyle, WidthType, LevelFormat, convertInchesToTwip,
  TabStopType, ShadingType, TableLayoutType,
} = require('docx');
const CSS = require('./css');

// Word gets a metric-compatible face for whatever the stylesheet asked for, so
// the line breaks land in the same places as the Chromium render.
const FONT_MAP = [
  [/helvetica|arial|liberation sans|sans-serif/i, 'Arial'],
  [/times|georgia|serif/i, 'Times New Roman'],
  [/mono|consolas|courier|menlo/i, 'Consolas'],
];
const DEFAULT_FONT = 'Arial';
const BULLETS = 'html-bullets';

const pt2hp = (v) => Math.max(2, Math.round(v * 2));            // pt -> half-points
const pt2tw = (v) => Math.round(v * 20);                        // pt -> twips
const pt2eighth = (v) => Math.max(1, Math.round(v * 8));        // pt -> border units

// The browser's own default stylesheet, reduced to what these documents lean
// on. Author rules are applied on top, so a stylesheet that sets its own
// weight still wins.
const UA_DEFAULTS = {
  h1: { 'font-weight': '700' }, h2: { 'font-weight': '700' }, h3: { 'font-weight': '700' },
  h4: { 'font-weight': '700' }, h5: { 'font-weight': '700' }, h6: { 'font-weight': '700' },
  b: { 'font-weight': '700' }, strong: { 'font-weight': '700' },
  i: { 'font-style': 'italic' }, em: { 'font-style': 'italic' },
};

function fontFor(family) {
  if (!family) return DEFAULT_FONT;
  for (const [re, name] of FONT_MAP) if (re.test(family)) return name;
  return DEFAULT_FONT;
}

function decodeText(s) {
  return s
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&middot;/g, '·')
    .replace(/&rarr;/g, '→').replace(/&hellip;/g, '…')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function borderOf(css, side) {
  const b = CSS.toBorder(css[`border-${side}`]);
  if (!b) return undefined;
  return { style: BorderStyle.SINGLE, size: pt2eighth(b.width), color: b.color, space: 2 };
}

function alignOf(css) {
  switch ((css['text-align'] || '').trim()) {
    case 'justify': return AlignmentType.JUSTIFIED;
    case 'center': return AlignmentType.CENTER;
    case 'right': return AlignmentType.RIGHT;
    case 'left': return AlignmentType.LEFT;
    default: return undefined;
  }
}

// ---------------------------------------------------------------------------
// runs
// ---------------------------------------------------------------------------
// Word has no per-run padding. `.sep { padding: 0 4pt }` around a separator
// glyph is the only place these documents use it, and a space on each side is
// a truer rendering than dropping it.
function inlinePad(css) {
  const short = css.padding ? css.padding.trim().split(/\s+/) : null;
  const right = css['padding-right'] !== undefined ? CSS.toPt(css['padding-right'])
    : short && short.length > 1 ? CSS.toPt(short[1]) : undefined;
  const left = css['padding-left'] !== undefined ? CSS.toPt(css['padding-left'])
    : short && short.length > 3 ? CSS.toPt(short[3])
    : short && short.length > 1 ? CSS.toPt(short[1]) : undefined;
  return { left: left || 0, right: right || 0 };
}

// Blocks are collected as plain specs and only turned into Paragraphs at the
// end. A wrapper's margins are not known until its children exist, and docx
// freezes paragraph properties at construction — so mutating a built Paragraph
// silently does nothing. This was exactly that bug.
// A parent's margin collapses with its first/last child's — the larger wins,
// they do not add. Same rule as between siblings, below.
function addSpacing(spec, key, twips) {
  if (!twips || !spec || spec.kind !== 'p') return;
  spec.props.spacing = { ...spec.props.spacing };
  spec.props.spacing[key] = Math.max(spec.props.spacing[key] || 0, twips);
}

// CSS collapses the vertical margins between adjacent blocks to the larger of
// the two. Word simply adds spacing.after to the next paragraph's
// spacing.before, so every gap in the document comes out too big — which is
// what pushed this onto a third page. Collapse them here instead.
function collapseMargins(nodes) {
  let prevAfter = null;
  for (const n of nodes) {
    if (n.kind !== 'p') { prevAfter = null; continue; }
    const sp = (n.props.spacing = { ...n.props.spacing });
    if (prevAfter !== null) sp.before = Math.max(0, (sp.before || 0) - prevAfter);
    prevAfter = sp.after || 0;
  }
  return nodes;
}

// Two tables that touch are merged into one by Word, which would collapse the
// card's stacked bands into a single grid. A paragraph has to sit between them
// — one pinned to a 1-twip exact line so it takes no visible space.
function separateTables(nodes) {
  const out = [];
  nodes.forEach((n, i) => {
    if (i > 0 && n.kind === 'table' && nodes[i - 1].kind === 'table') {
      out.push({ kind: 'p', props: { spacing: { before: 0, after: 0, line: 1, lineRule: 'exact' } },
                 children: [new TextRun({ text: '', size: 2 })] });
    }
    out.push(n);
  });
  return out;
}

function materialise(nodes) {
  return separateTables(collapseMargins(nodes)).map((n) => {
    if (n.kind !== 'p') return n.value;
    // Exact line spacing is what makes the text match the browser, but it also
    // CLIPS anything taller than the line — an inline image comes out as a
    // squashed strip. Let a paragraph carrying one size itself.
    const props = n.children.some((c) => c instanceof ImageRun)
      ? { ...n.props, spacing: { ...n.props.spacing, line: undefined, lineRule: undefined } }
      : n.props;
    return new Paragraph({ ...props, children: n.children });
  });
}

function runFrom(text, css, extra = {}) {
  const size = CSS.toPt(css['font-size']);
  const spacing = CSS.toPt(css['letter-spacing']);
  const weight = (css['font-weight'] || '').trim();
  let out = text;
  if ((css['text-transform'] || '').trim() === 'uppercase') out = out.toUpperCase();
  return new TextRun({
    text: out,
    font: fontFor(css['font-family']),
    size: size === undefined ? undefined : pt2hp(size),
    color: CSS.toHex(css.color),
    bold: weight === 'bold' || parseInt(weight, 10) >= 600 || undefined,
    italics: (css['font-style'] || '').trim() === 'italic' || undefined,
    characterSpacing: spacing === undefined ? undefined : pt2tw(spacing),
    ...extra,
  });
}

// ---------------------------------------------------------------------------
// the renderer
// ---------------------------------------------------------------------------
class Renderer {
  constructor(sheet, dir, opts = {}) {
    this.sheet = sheet;
    this.dir = dir;
    this.verbose = !!opts.verbose;
    this.scale = opts.scale || 1;         // one knob, for fitting a page
    this.ignored = new Map();
    this.images = 0;
  }

  css(chain) {
    const tag = (chain[chain.length - 1] || {}).tag;
    const c = { ...(UA_DEFAULTS[tag] || {}), ...CSS.computed(this.sheet, chain) };
    if (this.scale !== 1 && c['font-size'] !== undefined) {
      const v = CSS.toPt(c['font-size']);
      if (v !== undefined) c['font-size'] = `${v * this.scale}pt`;
    }
    return c;
  }

  node(el, i, siblings) {
    return {
      tag: el.rawTagName ? el.rawTagName.toLowerCase() : '',
      classes: (el.classNames || '').split(/\s+/).filter(Boolean),
      isFirst: i === 0,
      isLast: i === siblings - 1,
      el,
    };
  }

  noteIgnored(chain) {
    if (!this.verbose) return;
    for (const r of this.sheet.rules) {
      for (const d of r.dropped || []) {
        this.ignored.set(d, (this.ignored.get(d) || 0) + 1);
      }
    }
  }

  // ---- inline: element subtree -> runs ------------------------------------
  // A block's own computed style is the starting point; runsWith walks down
  // from there so nested <strong>/<em>/<span class> refine it.
  runs(el, chain) {
    const out = this.runsWith(el, chain, this.css(chain));
    while (out.length && out[0].options && out[0].options.text === ' ') out.shift();
    return out;
  }

  runsWith(el, chain, css) {
    return this.runsOf(el.childNodes || [], chain, css);
  }

  // Inline nodes -> runs, carrying `css` down and refining it per element.
  runsOf(nodes, chain, css) {
    const out = [];
    nodes.forEach((k, i, kids) => {
      if (k.nodeType === 3) {
        let raw = decodeText(k.rawText).replace(/\s+/g, ' ');
        if (out.length === 0) raw = raw.replace(/^ /, '');
        if (raw !== '') out.push(runFrom(raw, css));
        return;
      }
      if (k.nodeType !== 1) return;
      const tag = k.rawTagName.toLowerCase();
      if (tag === 'br') { out.push(new TextRun({ break: 1 })); return; }
      if (tag === 'img') { const r = this.image(k); if (r) out.push(r); return; }
      const child = [...chain, this.node(k, i, kids.length)];
      let sub = this.css(child);
      if (tag === 'strong' || tag === 'b') sub = { ...sub, 'font-weight': '700' };
      if (tag === 'em' || tag === 'i') sub = { ...sub, 'font-style': 'italic' };
      const pad = inlinePad(sub);
      if (pad.left >= 1) out.push(runFrom(' ', sub));
      out.push(...this.runsWith(k, child, sub));
      if (pad.right >= 1) out.push(runFrom(' ', sub));
    });
    return out;
  }

  // data: URIs and local files both work; a remote src is skipped, because
  // Word cannot fetch it either.
  image(el) {
    const src = el.getAttribute('src') || '';
    let data, type;
    const m = /^data:image\/(\w+);base64,(.*)$/s.exec(src);
    if (m) { type = m[1]; data = Buffer.from(m[2], 'base64'); }
    else if (!/^https?:/.test(src)) {
      const p = path.resolve(this.dir, src);
      if (!fs.existsSync(p)) return null;
      type = path.extname(p).slice(1).toLowerCase();
      data = fs.readFileSync(p);
    } else return null;

    const style = el.getAttribute('style') || '';
    const cls = (el.classNames || '').split(/\s+/).filter(Boolean);
    const decls = CSS.declsFor(this.sheet, [{ tag: 'img', classes: cls, isFirst: true, isLast: true }]);
    const widthPt = CSS.toPt((/width:\s*([\d.]+\w+)/.exec(style) || [])[1]) || CSS.toPt(decls.width) || 72;
    const ratio = (() => {
      const ar = /([\d.]+)\s*\/\s*([\d.]+)/.exec(decls['aspect-ratio']
        || (/aspect-ratio:\s*([^;]+)/.exec(style) || [])[1] || '');
      if (ar) return +ar[2] / +ar[1];
      if (type === 'png' && data.length > 24) return data.readUInt32BE(20) / data.readUInt32BE(16);
      return 1;
    })();
    this.images += 1;
    const frame = CSS.toBorder(decls.border);
    return new ImageRun({
      type: type === 'jpg' ? 'jpg' : type,
      data,
      transformation: { width: Math.round(widthPt * 4 / 3), height: Math.round(widthPt * ratio * 4 / 3) },
      outline: frame ? {
        type: 'solidFill', solidFillType: 'rgb', value: frame.color,
        width: Math.max(3175, Math.round(frame.width * 12700)),   // pt -> EMU
      } : undefined,
    });
  }

  // ---- paragraph properties from a block element's computed style ---------
  paraProps(css, chain) {
    // Borders, background and padding belong to the cell — drawing them on the
    // paragraph as well doubles the hairline AND adds the padding to every row,
    // which is how the skills table grew a page and the card's columns opened a
    // 6.5mm gap under every heading. `isCell` marks a grid child, which becomes
    // a table cell exactly the same way.
    const node = chain[chain.length - 1] || {};
    const tag = node.tag;
    if (tag === 'td' || tag === 'th' || node.isCell) {
      css = { ...css };
      for (const k of ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
                       'border-top', 'border-bottom', 'border-left', 'background', 'background-color']) {
        delete css[k];
      }
    }
    const size = CSS.toPt(css['font-size']);
    const lh = parseFloat(css['line-height']);
    const marginShorthand = css.margin ? css.margin.trim().split(/\s+/) : null;
    const mTop = css['margin-top'] !== undefined ? CSS.toPt(css['margin-top'])
      : marginShorthand ? CSS.toPt(marginShorthand[0]) : undefined;
    const mBot = css['margin-bottom'] !== undefined ? CSS.toPt(css['margin-bottom'])
      : marginShorthand ? CSS.toPt(marginShorthand[marginShorthand.length > 2 ? 2 : 0]) : undefined;
    const padShort = css.padding ? css.padding.trim().split(/\s+/) : null;
    const padBot = css['padding-bottom'] !== undefined ? CSS.toPt(css['padding-bottom'])
      : padShort ? CSS.toPt(padShort[padShort.length > 2 ? 2 : 0]) : undefined;
    const padTop = css['padding-top'] !== undefined ? CSS.toPt(css['padding-top'])
      : padShort ? CSS.toPt(padShort[0]) : undefined;
    const padLeft = css['padding-left'] !== undefined ? CSS.toPt(css['padding-left'])
      : padShort && padShort.length > 3 ? CSS.toPt(padShort[3])
      : padShort && padShort.length > 1 ? CSS.toPt(padShort[1]) : undefined;
    const padRight = css['padding-right'] !== undefined ? CSS.toPt(css['padding-right'])
      : padShort && padShort.length > 1 ? CSS.toPt(padShort[1]) : undefined;
    const mLeft = CSS.toPt(css['margin-left']);
    const mRight = CSS.toPt(css['margin-right']);

    const border = {};
    let borderPadTop = 0;
    let borderPadBot = 0;
    for (const side of ['top', 'bottom', 'left']) {
      const b = borderOf(css, side);
      if (!b) continue;
      const pad = side === 'top' ? padTop : padBot;
      border[side] = { ...b, space: Math.round(pad || 2) };
      if (side === 'top') borderPadTop = padTop || 0;
      if (side === 'bottom') borderPadBot = padBot || 0;
    }

    const keepNext = /avoid/.test(css['break-after'] || css['page-break-after'] || '');
    const keepLines = /avoid/.test(css['break-inside'] || css['page-break-inside'] || '');
    const bg = CSS.toHex(css.background || css['background-color']);

    return {
      alignment: alignOf(css),
      spacing: {
        before: pt2tw((mTop || 0) + (padTop || 0) - borderPadTop),
        after: pt2tw((mBot || 0) + (padBot || 0) - borderPadBot),
        // CSS line-height is an exact box. Word's "auto" rule multiplies its
        // OWN single spacing (~1.15em), which inflates every line by ~15% and
        // is what pushed this resume onto a third page. "exact" reproduces the
        // browser: line-height x font-size, in twips.
        line: lh && size ? pt2tw(size * lh) : undefined,
        lineRule: lh && size ? 'exact' : undefined,
      },
      // Right padding needs a right indent of its own, or text runs out past the
      // panel it is supposed to sit inside.
      indent: (padLeft || mLeft || padRight || mRight) ? {
        left: pt2tw((padLeft || 0) + (mLeft || 0)),
        right: pt2tw((padRight || 0) + (mRight || 0)) || undefined,
      } : undefined,
      border: Object.keys(border).length ? border : undefined,
      shading: bg && bg !== 'FFFFFF' ? { type: ShadingType.CLEAR, color: 'auto', fill: bg } : undefined,
      keepNext: keepNext || undefined,
      keepLines: keepLines || undefined,
    };
  }

  // ---- blocks -------------------------------------------------------------
  // A tag's default display, plus whatever the stylesheet says — the card sets
  // `.tl dd b { display: block }` to put a job title on its own line.
  isBlock(el, chain) {
    if (el.nodeType !== 1) return false;
    const tag = el.rawTagName.toLowerCase();
    if (['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
         'ul', 'ol', 'li', 'table', 'dl', 'dt', 'dd', 'section', 'article'].includes(tag)) return true;
    if (!chain) return false;
    const d = (this.css(chain).display || '').trim();
    return d === 'block' || d === 'grid' || d === 'flex';
  }

  block(el, chain, out, ctx = {}) {
    const tag = el.rawTagName.toLowerCase();
    const css = this.css(chain);

    if (tag === 'table') { out.push({ kind: 'table', value: this.table(el, chain, ctx) }); return; }
    // An <img> that is the child of a block wrapper reaches block(), not runs()
    if (tag === 'img') {
      const run = this.image(el);
      if (run) out.push({ kind: 'p', props: this.paraProps(css, chain), children: [run] });
      return;
    }

    if (tag === 'ul' || tag === 'ol') { this.list(el, chain, out, ctx); return; }

    // display: grid -> a Word table. Children flow row-major into
    // grid-template-columns, which is what a browser does with them, and a
    // fixed-layout table is the only thing in Word that holds columns still.
    if ((css.display || '').trim() === 'grid' && css['grid-template-columns']) {
      const t = this.grid(el, chain, css, ctx);
      if (t) { out.push({ kind: 'table', value: t }); return; }
    }

    const kids = (el.childNodes || []).filter((k) => k.nodeType !== 3 || k.rawText.trim() !== '');
    const isBlockKid = (k, i) => this.isBlock(k, k.nodeType === 1 ? [...chain, this.node(k, i, kids.length)] : null);
    const blockKids = kids.filter(isBlockKid);

    // display:flex with space-between: two columns on one line. Word does that
    // with a right tab stop, which is also what a human would reach for.
    if ((css.display || '').includes('flex') && (css['justify-content'] || '').includes('space-between')
        && blockKids.length === 0 && kids.length >= 2) {
      const runs = [];
      kids.forEach((k, i) => {
        if (i > 0) runs.push(new TextRun({ text: '\t' }));
        const child = [...chain, this.node(k, i, kids.length)];
        runs.push(...this.runsWith(k, child, this.css(child)));
      });
      out.push({
        kind: 'p',
        props: { ...this.paraProps(css, chain), tabStops: [{ type: TabStopType.RIGHT, position: ctx.textWidth }] },
        children: runs,
      });
      return;
    }

    if (blockKids.length) {
      // A wrapper contributes no paragraph of its own, so its margins would be
      // lost — .role { margin-bottom: 6.5pt } is what separates one employer
      // from the next. Push them onto the first and last paragraph it produces.
      const before = out.length;
      // An absolutely-positioned inline child sitting at left:0 inside a padded
      // box is a MARKER — the one-pager's big teal numerals work that way. Word
      // has no absolute positioning, but a hanging indent puts the glyph in
      // exactly the same place, so hold it back and prefix the first paragraph.
      const marker = [];
      kids.forEach((k, i) => {
        if (k.nodeType !== 1 || isBlockKid(k, i)) return;
        const kc = this.css([...chain, this.node(k, i, kids.length)]);
        if ((kc.position || '').trim() !== 'absolute') return;
        marker.push(...this.runsWith(k, [...chain, this.node(k, i, kids.length)], kc));
      });

      // Inline content sitting between block children forms an anonymous block
      // of its own — the sentence after an <h3> inside an <li>, for instance.
      // Without this it gets shredded: each <strong> becomes its own paragraph
      // and the plain text between them disappears.
      let pending = [];
      const flush = () => {
        if (!pending.length) return;
        const runs = this.runsOf(pending, chain, css);
        pending = [];
        while (runs.length && runs[0].options && runs[0].options.text === ' ') runs.shift();
        if (runs.length) out.push({ kind: 'p', props: this.paraProps(css, chain), children: runs });
      };
      kids.forEach((k, i) => {
        if (k.nodeType === 1 && isBlockKid(k, i)) {
          flush();
          this.block(k, [...chain, this.node(k, i, kids.length)], out, ctx);
          return;
        }
        if (k.nodeType === 1) {
          const kc = this.css([...chain, this.node(k, i, kids.length)]);
          if ((kc.position || '').trim() === 'absolute') return;   // held back as a marker
        }
        pending.push(k);
      });
      flush();
      if (marker.length) {
        const first = out.slice(before).find((n) => n.kind === 'p');
        if (first) {
          const hang = CSS.toPt(css['padding-left']) || 0;
          first.children = [...marker, new TextRun({ text: '\t' }), ...first.children];
          first.props = {
            ...first.props,
            indent: { left: pt2tw(hang), hanging: pt2tw(hang) },
            tabStops: [{ type: TabStopType.LEFT, position: pt2tw(hang) }],
          };
        }
      }
      const made = out.slice(before).filter((n) => n.kind === 'p');
      if (made.length) {
        const own = this.paraProps(css, chain);
        addSpacing(made[0], 'before', own.spacing.before);
        addSpacing(made[made.length - 1], 'after', own.spacing.after);
      }
      return;
    }

    const runs = this.runs(el, chain);
    if (!runs.length) return;
    out.push({ kind: 'p', props: this.paraProps(css, chain), children: runs });
  }

  list(el, chain, out, ctx = {}) {
    const css = this.css(chain);
    const padLeft = CSS.toPt(css['padding-left']) || 11;
    const own = this.paraProps(css, chain);
    // list-style: none means the author is drawing their own marker — putting a
    // Word bullet there too would double it.
    const marked = !/none/.test(css['list-style'] || '');
    const items = (el.childNodes || []).filter((k) => k.nodeType === 1 && k.rawTagName.toLowerCase() === 'li');
    const before = out.length;
    items.forEach((li, i) => {
      const child = [...chain, this.node(li, i, items.length)];
      const liSpecs = [];
      this.block(li, child, liSpecs, ctx);
      if (marked) {
        const first = liSpecs.find((n) => n.kind === 'p');
        if (first) first.props = { ...first.props, indent: undefined,
                                   numbering: { reference: BULLETS, level: 0 } };
      }
      out.push(...liSpecs);
    });
    const made = out.slice(before).filter((n) => n.kind === 'p');
    if (made.length) {
      addSpacing(made[0], 'before', own.spacing.before);
      addSpacing(made[made.length - 1], 'after', own.spacing.after);
    }
    this.listIndent = pt2tw(padLeft);
  }

  // `auto` in grid-template-columns means "as wide as the content needs", which
  // a fixed-layout Word table cannot work out for itself. Estimate it from the
  // text: average glyph width is close enough to 0.5em for a humanist sans and
  // 0.6em for a monospace, and being a few points out only shifts a column
  // edge, never the words.
  measureLines(el, chain) {
    const lines = [[]];
    const walk = (node, nodeChain, css) => {
      (node.childNodes || []).forEach((k, i, kids) => {
        if (k.nodeType === 3) {
          const t = decodeText(k.rawText).replace(/\s+/g, ' ');
          if (t.trim() !== '') lines[lines.length - 1].push({ text: t, css });
          return;
        }
        if (k.nodeType !== 1) return;
        const tag = k.rawTagName.toLowerCase();
        if (tag === 'br') { lines.push([]); return; }
        const kidChain = [...nodeChain, this.node(k, i, kids.length)];
        if (this.isBlock(k, kidChain)) lines.push([]);
        walk(k, kidChain, this.css(kidChain));
        if (this.isBlock(k, kidChain)) lines.push([]);
      });
    };
    walk(el, chain, this.css(chain));
    return lines.map((line) => line.reduce((w, part) => {
      const size = CSS.toPt(part.css['font-size']) || 10;
      const mono = /mono|consolas|courier|menlo/i.test(part.css['font-family'] || '');
      const bold = parseInt((part.css['font-weight'] || '400'), 10) >= 600;
      return w + part.text.length * size * (mono ? 0.62 : (bold ? 0.56 : 0.52));
    }, 0));
  }

  grid(el, chain, css, ctx) {
    const total = ctx.textWidth || 9000;
    const gap = pt2tw(CSS.toPt((css['column-gap'] || css.gap || '0').trim().split(/\s+/).pop()) || 0);
    const pad = {
      top: pt2tw(CSS.toPt((css.padding || '0').trim().split(/\s+/)[0]) || 0),
      right: pt2tw(CSS.toPt((css.padding || '0').trim().split(/\s+/)[1]) || 0),
      bottom: pt2tw(CSS.toPt((css.padding || '0').trim().split(/\s+/)[2]
                             || (css.padding || '0').trim().split(/\s+/)[0]) || 0),
      left: pt2tw(CSS.toPt((css.padding || '0').trim().split(/\s+/)[3]
                           || (css.padding || '0').trim().split(/\s+/)[1]) || 0),
    };
    const inner = total - pad.left - pad.right;
    const kids = (el.childNodes || []).filter((k) => k.nodeType === 1);
    if (!kids.length) return null;

    // Resolve any `auto` track against the widest content in that COLUMN — a
    // definition list flows many rows through the same two tracks, so measuring
    // only the first row makes every later row wrap.
    let spec = css['grid-template-columns'];
    if (/\bauto\b/.test(spec)) {
      const tokens = spec.trim().split(/\s+/);
      spec = tokens.map((t, col) => {
        if (t !== 'auto') return t;
        let est = 0;
        for (let i = col; i < kids.length; i += tokens.length) {
          const kidChain = [...chain, this.node(kids[i], i, kids.length)];
          const kp = (this.css(kidChain).padding || '0').trim().split(/\s+/);
          const sidePad = (CSS.toPt(kp[1] !== undefined ? kp[1] : kp[0]) || 0) * 2;
          // err generous: an auto column that is a little wide only moves an
          // edge; one a little narrow wraps text meant to stay on one line —
          // and these are usually the columns marked white-space: nowrap.
          est = Math.max(est, Math.max(...this.measureLines(kids[i], kidChain), 0) * 1.12 + sidePad + 6);
        }
        return `${Math.round(est)}pt`;
      }).join(' ');
    }
    const widths = CSS.gridColumns(spec, inner, gap);
    if (!widths || !widths.length) return null;
    const bg = CSS.toHex(css.background || css['background-color']);
    const bottom = borderOf(css, 'bottom');
    const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
    const rowCount = Math.ceil(kids.length / widths.length);

    const rows = [];
    const cellWidths = [];
    for (let r = 0; r < rowCount; r += 1) {
      const cells = [];
      for (let c = 0; c < widths.length; c += 1) {
        const kid = kids[r * widths.length + c];
        const paras = [];
        let kidCss = {};
        let kidChain = null;
        if (kid) {
          kidChain = [...chain, { ...this.node(kid, r * widths.length + c, kids.length), isCell: true }];
          kidCss = this.css(kidChain);
        }
        const kp = (kidCss.padding || '0').trim().split(/\s+/);
        const kpad = {
          top: pt2tw(CSS.toPt(kp[0]) || 0),
          right: pt2tw(CSS.toPt(kp[1] !== undefined ? kp[1] : kp[0]) || 0),
          bottom: pt2tw(CSS.toPt(kp[2] !== undefined ? kp[2] : kp[0]) || 0),
          left: pt2tw(CSS.toPt(kp[3] !== undefined ? kp[3] : (kp[1] !== undefined ? kp[1] : kp[0])) || 0),
        };
        if (kid) {
          // the child's padding becomes cell margins, so what is left for text
          // is narrower than the column — everything inside must be told so
          const usable = widths[c] - kpad.left - kpad.right
            - (c === 0 ? pad.left : 0) - (c === widths.length - 1 ? pad.right : 0);
          this.block(kid, kidChain, paras, { ...ctx, textWidth: Math.max(600, usable) });
        }
        const right = borderOf(kidCss, 'right');
        // A cell's width in OOXML INCLUDES its margins, and the container
        // padding and gaps were already taken out of the track widths — so add
        // them back here or the content is squeezed out of its own column.
        const extraL = c === 0 ? pad.left : 0;
        const extraR = c === widths.length - 1 ? pad.right : gap;
        const margins = {
          top: kpad.top + (r === 0 ? pad.top : 0),
          bottom: kpad.bottom + (r === rowCount - 1 ? pad.bottom : 0),
          left: kpad.left + extraL,
          right: kpad.right + extraR,
        };
        // The child's own padding sits INSIDE its track (border-box), so only
        // the container's padding and the gap widen the cell beyond the track.
        cellWidths[c] = widths[c] + extraL + extraR;
        cells.push(new TableCell({
          width: { size: cellWidths[c], type: WidthType.DXA },
          shading: bg && bg !== 'FFFFFF' ? { type: ShadingType.CLEAR, color: 'auto', fill: bg } : undefined,
          margins,
          borders: {
            top: none,
            left: none,
            right: (c === widths.length - 1 ? none : (right || none)),
            bottom: (r === rowCount - 1 && bottom) ? bottom : none,
          },
          children: paras.length ? materialise(paras) : [new Paragraph({ children: [] })],
        }));
      }
      rows.push(new TableRow({ children: cells }));
    }

    return new Table({
      width: { size: cellWidths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
      layout: TableLayoutType.FIXED,
      columnWidths: cellWidths,
      borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none },
      rows,
    });
  }

  // Word lays tables out by the widths you give it, and gives an unsized cell
  // an equal share — so a stylesheet that sizes only the label column
  // ("td.k { width: 84pt }") comes out half-and-half unless the remainder is
  // computed here and the layout pinned to fixed.
  table(el, chain, ctx = {}) {
    const total = ctx.textWidth || 9000;
    const rows = el.querySelectorAll('tr');
    const widths = (() => {
      const first = rows[0];
      if (!first) return [];
      const tds = (first.childNodes || []).filter((k) => k.nodeType === 1
        && ['td', 'th'].includes(k.rawTagName.toLowerCase()));
      const trChain = [...chain, this.node(first, 0, rows.length)];
      const fixed = tds.map((td, ci) => {
        const w = CSS.toPt(this.css([...trChain, this.node(td, ci, tds.length)]).width);
        return w === undefined ? null : pt2tw(w);
      });
      const used = fixed.reduce((a, b) => a + (b || 0), 0);
      const flexible = fixed.filter((f) => f === null).length;
      const each = flexible ? Math.max(600, Math.round((total - used) / flexible)) : 0;
      return fixed.map((f) => (f === null ? each : f));
    })();

    const built = rows.map((tr, ri) => {
      const trChain = [...chain, this.node(tr, ri, rows.length)];
      const tds = (tr.childNodes || []).filter((k) => k.nodeType === 1
        && ['td', 'th'].includes(k.rawTagName.toLowerCase()));
      return new TableRow({
        cantSplit: true,
        children: tds.map((td, ci) => {
          const tdChain = [...trChain, this.node(td, ci, tds.length)];
          const css = this.css(tdChain);
          const width = CSS.toPt(css.width);
          const padV = CSS.toPt((css.padding || '').split(/\s+/)[0]);
          const bottom = borderOf(css, 'bottom');
          const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
          const paras = [];
          this.block(td, tdChain, paras, { ...ctx, textWidth: Math.max(600, (widths[ci] || 2000) - pt2tw(8)) });
          return new TableCell({
            width: { size: widths[ci] || (width ? pt2tw(width) : 2000), type: WidthType.DXA },
            margins: { top: pt2tw(padV || 0), bottom: pt2tw(padV || 0), left: 0, right: pt2tw(8) },
            borders: { top: none, left: none, right: none, bottom: bottom || none },
            children: paras.length ? materialise(paras) : [new Paragraph({ children: [] })],
          });
        }),
      });
    });
    const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
    return new Table({
      width: { size: total, type: WidthType.DXA },
      layout: TableLayoutType.FIXED,
      columnWidths: widths.length ? widths : undefined,
      borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none },
      rows: built,
    });
  }
}

// `li::marker { color: #9aa4ab }` styles the bullet glyph, not the line. The
// matcher refuses pseudo-elements on purpose, so the marker rule is read here
// and applied to the numbering level instead.
function markerRun(sheet) {
  const run = {};
  for (const r of sheet.rules) {
    if (!/::marker\s*$/.test(r.selector)) continue;
    const color = CSS.toHex(r.decls.color);
    if (color) run.color = color;
    const size = CSS.toPt(r.decls['font-size']);
    if (size) run.size = pt2hp(size);
  }
  return Object.keys(run).length ? run : undefined;
}

// ---------------------------------------------------------------------------
module.exports = function fromHtml(file, opts = {}) {
  const html = fs.readFileSync(file, 'utf8');
  const styleText = (/<style[^>]*>([\s\S]*?)<\/style>/i.exec(html) || [, ''])[1];
  const sheet = CSS.parseCss(styleText);
  const root = parse(html, { blockTextElements: { script: false, style: true } });

  const r = new Renderer(sheet, path.dirname(path.resolve(file)), opts);
  const bodyCss = r.css([{ tag: 'body', classes: [], isFirst: true, isLast: true }]);

  const margins = CSS.pageMargins(sheet.page) || { top: 36, right: 36, bottom: 36, left: 36 };
  const landscape = CSS.pageIsLandscape(sheet.page);
  const pageW = landscape ? 16838 : 11906;
  const textWidth = pageW - pt2tw(margins.left) - pt2tw(margins.right);

  const top = (root.childNodes || []).filter((k) => k.nodeType === 1
    && !['style', 'title', 'meta', 'head', 'script', 'link'].includes(k.rawTagName.toLowerCase()));
  const body = top.length === 1 && top[0].rawTagName.toLowerCase() === 'body' ? top[0].childNodes.filter((k) => k.nodeType === 1) : top;

  const specs = [];
  body.forEach((el, i) => {
    r.block(el, [{ tag: 'body', classes: [], isFirst: true, isLast: true },
                 r.node(el, i, body.length)], specs, { textWidth });
  });
  const children = materialise(specs);

  const baseSize = CSS.toPt(bodyCss['font-size']) || 10;
  const doc = new Document({
    creator: 'Sachin Koli',
    title: (/<title>([^<]*)<\/title>/i.exec(html) || [, ''])[1].trim() || undefined,
    styles: { default: { document: { run: {
      font: fontFor(bodyCss['font-family']),
      size: pt2hp(baseSize),
      color: CSS.toHex(bodyCss.color) || '000000',
    } } } },
    numbering: { config: [{
      reference: BULLETS,
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: {
          paragraph: { indent: { left: r.listIndent || pt2tw(11), hanging: pt2tw(8) } },
          run: markerRun(sheet),
        },
      }],
    }] },
    sections: [{
      properties: {
        page: {
          size: { orientation: landscape ? 'landscape' : 'portrait', width: 11906, height: 16838 },
          margin: {
            top: pt2tw(margins.top), right: pt2tw(margins.right),
            bottom: pt2tw(margins.bottom), left: pt2tw(margins.left),
          },
        },
      },
      children,
    }],
  });

  if (opts.verbose) {
    const dropped = new Set();
    sheet.rules.forEach((rule) => (rule.dropped || []).forEach((d) => dropped.add(d)));
    if (dropped.size) console.error(`fromhtml: CSS properties ignored — ${[...dropped].sort().join(', ')}`);
    console.error(`fromhtml: ${children.length} blocks, ${r.images} image(s), text width ${textWidth} twips`);
  }
  return doc;
};
