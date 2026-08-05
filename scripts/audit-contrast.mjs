/**
 * WCAG 2.1 contrast audit for the Virtuoso colour tokens.
 *
 *   node scripts/audit-contrast.mjs
 *
 * Exits non-zero if any pairing drops below its target, so it can be wired
 * into CI. Keep this in sync with the `C` object in src/App.js — if you change
 * a token there, change it here and re-run.
 */

const TOKENS = {
  ivory:      '#f5f0e8',
  stone:      '#ebe5da',
  white:      '#ffffff',
  nearBlack:  '#171512',
  ink:        '#171512',
  mid:        '#4a4540',
  goldText:   '#785417',
  goldOnDark: '#d6a95c',
  goldSolid:  '#8c641e',
  gold:       '#a97b2e',
};

const hex = h => { h = h.replace('#',''); return [0,2,4].map(i => parseInt(h.slice(i,i+2),16)); };
const lin = c => { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
const lum = ([r,g,b]) => 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b);
const ratio = (a, b) => {
  const x = lum(hex(TOKENS[a] ?? a)), y = lum(hex(TOKENS[b] ?? b));
  return +(((Math.max(x,y)+0.05) / (Math.min(x,y)+0.05)).toFixed(2));
};
const composite = (fg, alpha, bg) =>
  '#' + hex(TOKENS[fg]).map((c,i) => Math.round(c*alpha + hex(TOKENS[bg])[i]*(1-alpha)))
                       .map(c => c.toString(16).padStart(2,'0')).join('');

// [label, foreground, background, minimum]
// 4.5 = AA body text · 3 = AA large text (>=24px, or >=18.66px bold) and UI edges
const CHECKS = [
  ['body text on ivory',           'ink',        'ivory',     4.5],
  ['body text on stone',           'ink',        'stone',     4.5],
  ['body text on white',           'ink',        'white',     4.5],
  ['secondary text on ivory',      'mid',        'ivory',     4.5],
  ['secondary text on stone',      'mid',        'stone',     4.5],
  ['secondary text on white',      'mid',        'white',     4.5],
  ['gold text on ivory',           'goldText',   'ivory',     4.5],
  ['gold text on stone',           'goldText',   'stone',     4.5],
  ['gold text on white',           'goldText',   'white',     4.5],
  ['gold text on near-black',      'goldOnDark', 'nearBlack', 4.5],
  ['white on gold fill',           'white',      'goldSolid', 4.5],
  ['white on near-black',          'white',      'nearBlack', 4.5],
  ['gold-text label on gold fill', 'goldText',   'white',     4.5],
  ['decorative rule on ivory',     'gold',       'ivory',     3.0],
  ['decorative rule on near-black','goldOnDark', 'nearBlack', 3.0],
  // The muted-white used for secondary copy on dark surfaces.
  ['white 78% on near-black',      composite('white', 0.78, 'nearBlack'), 'nearBlack', 4.5],
];

let failed = 0;
for (const [label, fg, bg, min] of CHECKS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${String(r).padStart(6)}:1  (min ${min})  ${label}`);
}

console.log(failed ? `\n${failed} pairing(s) below target` : `\nAll ${CHECKS.length} pairings pass.`);
process.exit(failed ? 1 : 0);
