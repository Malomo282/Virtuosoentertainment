// Dev-only endpoint used by the "Adjust Photo" panels on the About page.
// setupProxy.js is a Create React App convention: it's loaded ONLY by
// `react-scripts start`, never bundled into a production build — so this
// file, and the file-write it performs, cannot ship or run on the live site.
const fs = require('fs');
const path = require('path');

const APP_FILE = path.join(__dirname, 'App.js');
const VALID_KEYS = new Set(['jesse', 'alek', 'emmanuel']);

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

// Targets the `photoAdjust` useState initializer in AboutPage — NOT the
// <QuaverPhoto> JSX tag. Each card reads its facePosition from that single
// state object, so the live sliders and the saved-to-disk value are the
// exact same source of truth (a literal prop written onto the JSX tag itself
// would sit alongside/after the value and permanently win on every future
// render, freezing the slider — this bit an earlier version of this tool).
function updatePhotoAdjustState(source, personKey, { x, y }) {
  if (!VALID_KEYS.has(personKey)) throw new Error(`Unknown personKey "${personKey}"`);

  const re = new RegExp(`(${personKey}:\\s*)\\{[^}]*\\}`);
  if (!re.test(source)) throw new Error(`Could not find a "${personKey}:" entry in the photoAdjust state`);

  const replacement = `{ x: ${x}, y: ${y} }`;
  return source.replace(re, (_, prefix) => prefix + replacement);
}

module.exports = function (app) {
  app.post('/__dev/save-photo', async (req, res) => {
    try {
      const { personKey, x, y } = await readJsonBody(req);
      if (!personKey) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'personKey is required' }));
      }
      const source = fs.readFileSync(APP_FILE, 'utf8');
      const updated = updatePhotoAdjustState(source, personKey, { x: Number(x), y: Number(y) });
      fs.writeFileSync(APP_FILE, updated);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: e.message }));
    }
  });
};
