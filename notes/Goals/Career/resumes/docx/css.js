// A deliberately small CSS reader: enough of the career stylesheets to drive a
// Word build, and nothing else.
//
// The stylesheets these documents use are flat and class-based — no cascade
// tricks, no media queries beyond @page, no inheritance games. So "collect the
// declarations for each simple selector, then look them up by tag and class" is
// the whole algorithm. Anything more would be a browser.
//
// Properties understood are listed in PROPS. A declaration outside that set is
// ignored silently — the renderer prints what it dropped when run with --verbose.
const PROPS = new Set([
  'font-size', 'font-weight', 'font-style', 'font-family', 'color',
  'line-height', 'letter-spacing', 'text-transform', 'text-align',
  'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
  'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom',
  'aspect-ratio', 'height',
  'border', 'border-bottom', 'border-top', 'border-left', 'border-right',
  'background', 'background-color',
  'width', 'white-space', 'display', 'justify-content', 'list-style',
  'position', 'left', 'grid-template-columns', 'gap', 'column-gap',
  'break-after', 'page-break-after', 'break-inside', 'page-break-inside',
]);

// Properties CSS inherits. Everything else applies to the element alone —
// margins, borders and backgrounds must never leak down into a child run.
const INHERITED = new Set([
  'font-size', 'font-weight', 'font-style', 'font-family', 'color',
  'line-height', 'letter-spacing', 'text-transform', 'text-align', 'white-space',
]);

// Word paragraph styles a stylesheet may ask for with `--docx-style`.
// Structure a parser can read, which explicit formatting alone does not give it.
const DOCX_STYLES = new Set(['Heading1', 'Heading2', 'Heading3', 'Heading4',
                             'Heading5', 'Heading6', 'Title']);

// ---------------------------------------------------------------------------
// units — everything lands in points, because Word thinks in half-points and
// twips and both divide cleanly from pt.
// ---------------------------------------------------------------------------
function toPt(v, base) {
  if (v === undefined || v === null) return undefined;
  const s = String(v).trim();
  let m;
  if ((m = /^(-?[\d.]+)pt$/.exec(s))) return parseFloat(m[1]);
  if ((m = /^(-?[\d.]+)mm$/.exec(s))) return parseFloat(m[1]) * 72 / 25.4;
  if ((m = /^(-?[\d.]+)px$/.exec(s))) return parseFloat(m[1]) * 0.75;
  if ((m = /^(-?[\d.]+)em$/.exec(s))) return base === undefined ? undefined : parseFloat(m[1]) * base;
  if ((m = /^(-?[\d.]+)$/.exec(s))) return parseFloat(m[1]);   // unitless: caller decides
  return undefined;
}

const NAMED = { black: '000000', white: 'FFFFFF', red: 'FF0000' };

function toHex(v) {
  if (!v) return undefined;
  const s = String(v).trim().toLowerCase();
  let m;
  if ((m = /^#([0-9a-f]{6})$/.exec(s))) return m[1].toUpperCase();
  if ((m = /^#([0-9a-f]{3})$/.exec(s))) return m[1].split('').map((c) => c + c).join('').toUpperCase();
  if ((m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(s))) {
    return [m[1], m[2], m[3]].map((n) => (+n).toString(16).padStart(2, '0')).join('').toUpperCase();
  }
  if (NAMED[s]) return NAMED[s];
  return undefined;
}

// "0.8pt solid #d8dee2" -> { width, color }.  Word hairlines are eighths of a
// point, so a sub-point CSS rule still has to round up to 1/8pt = size 1.
function toBorder(v) {
  if (!v || /^\s*none/.test(v)) return undefined;
  const width = toPt((/(-?[\d.]+(?:pt|px|mm))/.exec(v) || [])[1]);
  const color = toHex((/(#[0-9a-fA-F]{3,6}|rgba?\([^)]*\))/.exec(v) || [])[1]);
  return { width: width === undefined ? 0.75 : width, color: color || '000000' };
}

// ---------------------------------------------------------------------------
// parse
// ---------------------------------------------------------------------------
function parseCss(text) {
  const rules = [];       // [{ selector, decls }] in source order
  const page = {};
  const vars = {};        // custom properties, collected wherever declared
  const body = text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@media[^{]*\{[\s\S]*?\n\}/g, '');   // print-only blocks: not ours

  // Pass one: custom properties. They are almost always on :root, and these
  // documents put every colour there — miss them and the whole palette reads
  // as black.
  const varRe = /(--[\w-]+)\s*:\s*([^;}]+)/g;
  let vm;
  while ((vm = varRe.exec(body)) !== null) vars[vm[1]] = vm[2].trim();
  const resolve = (v) => {
    let out = v;
    for (let i = 0; i < 4 && out.includes('var('); i += 1) {
      out = out.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*))?\)/g,
                        (_, name, fallback) => (vars[name] !== undefined ? vars[name] : (fallback || '')));
    }
    return out.trim();
  };

  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    const selectors = m[1].trim();
    const decls = {};
    const dropped = [];
    m[2].split(';').forEach((d) => {
      const i = d.indexOf(':');
      if (i < 0) return;
      const k = d.slice(0, i).trim().toLowerCase();
      const v = resolve(d.slice(i + 1).trim());
      // `--docx-*` custom properties are instructions to THIS renderer — the
      // browser ignores them, so one stylesheet can carry both. Everything else
      // beginning with `--` is a variable and was resolved above.
      if (!k || !v) return;
      if (k.startsWith('--docx-')) { decls[k] = v; return; }
      if (k.startsWith('--')) return;
      if (PROPS.has(k)) decls[k] = v; else dropped.push(k);
    });
    if (selectors === '@page') { Object.assign(page, decls, { raw: m[2] }); continue; }
    selectors.split(',').forEach((sel) => rules.push({ selector: sel.trim(), decls, dropped }));
  }
  return { rules, page, vars };
}

// grid-template-columns -> twips, given the space available. Fixed lengths are
// honoured; fr units share what is left; `auto` is treated as one share, which
// is the closest a fixed table layout can get.
function gridColumns(spec, total, gap = 0) {
  if (!spec) return null;
  const tokens = [];
  spec.replace(/repeat\(\s*(\d+)\s*,\s*([^)]+)\)/g, (_, n, what) => {
    for (let i = 0; i < +n; i += 1) tokens.push(...what.trim().split(/\s+/));
    return '';
  });
  if (!tokens.length) tokens.push(...spec.trim().split(/\s+/));
  const parsed = tokens.map((t) => {
    const fr = /^([\d.]+)fr$/.exec(t);
    if (fr) return { fr: parseFloat(fr[1]) };
    if (t === 'auto' || t === 'min-content' || t === 'max-content') return { fr: 1 };
    const pt = toPt(t);
    return pt === undefined ? { fr: 1 } : { fixed: Math.round(pt * 20) };
  });
  const gaps = gap * Math.max(0, parsed.length - 1);
  const fixed = parsed.reduce((a, c) => a + (c.fixed || 0), 0);
  const frTotal = parsed.reduce((a, c) => a + (c.fr || 0), 0);
  const spare = Math.max(0, total - fixed - gaps);
  return parsed.map((c) => (c.fixed !== undefined ? c.fixed : Math.round(spare * (c.fr / frTotal))));
}

// One compound part of a selector — "td.k", ".client", "h2", "tr:last-child".
// Pseudo-ELEMENTS never match: `li::marker { color }` styles the bullet glyph,
// and letting it match the <li> would repaint the whole line grey.
// Two structural pseudo-classes are honoured because the stylesheets use them
// to drop a rule off the last table row.
function partMatches(part, node) {
  if (part.includes('::')) return false;
  const m = /^([a-z0-9]+|\*)?((?:[.#][\w-]+)*)((?::[\w-]+)*)$/i.exec(part);
  if (!m) return false;
  if (m[1] && m[1] !== '*' && m[1].toLowerCase() !== node.tag) return false;
  const want = (m[2] || '').split('.').filter(Boolean);
  if (!want.every((c) => node.classes.includes(c))) return false;
  for (const pseudo of (m[3] || '').split(':').filter(Boolean)) {
    if (pseudo === 'last-child') { if (!node.isLast) return false; }
    else if (pseudo === 'first-child') { if (!node.isFirst) return false; }
    else return false;
  }
  return true;
}

// "table.skills td.k" against the ancestor chain (root first, element last).
// Descendant combinators only — these stylesheets use nothing else, and a
// matcher that pretends otherwise would quietly mis-style things.
function selectorMatches(sel, chain) {
  const parts = sel.trim().split(/\s+/).filter((p) => p !== '>');
  let i = chain.length - 1;
  if (!partMatches(parts[parts.length - 1], chain[i])) return false;
  i -= 1;
  for (let p = parts.length - 2; p >= 0; p -= 1) {
    while (i >= 0 && !partMatches(parts[p], chain[i])) i -= 1;
    if (i < 0) return false;
    i -= 1;
  }
  return true;
}

// Specificity is not modelled: later rules win, which is how these files are
// written anyway (base rule first, modifier after).
function declsFor(sheet, chain) {
  const out = {};
  for (const r of sheet.rules) {
    if (selectorMatches(r.selector, chain)) Object.assign(out, r.decls);
  }
  return out;
}

// The computed style of the last node in the chain: inherited properties from
// each ancestor, then everything the element itself declares.
function computed(sheet, chain) {
  const out = {};
  for (let i = 0; i < chain.length; i += 1) {
    const d = declsFor(sheet, chain.slice(0, i + 1));
    for (const [k, v] of Object.entries(d)) {
      if (i === chain.length - 1 || INHERITED.has(k)) out[k] = v;
    }
  }
  return out;
}

// @page { margin: 11mm 12mm } -> points, CSS shorthand order.
function pageMargins(page) {
  const raw = page.margin;
  if (!raw) return undefined;
  const parts = raw.trim().split(/\s+/).map((p) => toPt(p));
  if (parts.some((p) => p === undefined)) return undefined;
  const [a, b, c, d] = parts;
  if (parts.length === 1) return { top: a, right: a, bottom: a, left: a };
  if (parts.length === 2) return { top: a, right: b, bottom: a, left: b };
  if (parts.length === 3) return { top: a, right: b, bottom: c, left: b };
  return { top: a, right: b, bottom: c, left: d };
}

function pageIsLandscape(page) {
  return /landscape/i.test(page.raw || page.size || '');
}

module.exports = { parseCss, declsFor, computed, gridColumns, pageMargins, pageIsLandscape,
                   toPt, toHex, toBorder, PROPS, INHERITED, DOCX_STYLES };
