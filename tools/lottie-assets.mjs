// Extract embedded raster assets from a Lottie JSON: node lottie-assets.mjs <json> <outDir> <prefix>
import fs from 'node:fs';
import path from 'node:path';
const [,, file, outDir, prefix] = process.argv;
const j = JSON.parse(fs.readFileSync(file, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });
const seen = new Set();
j.assets.filter(a => a.p && a.p.startsWith('data:image')).forEach((a, i) => {
  const m = a.p.match(/^data:image\/(\w+);base64,(.*)$/);
  if (!m || seen.has(m[2].length)) return;
  seen.add(m[2].length);
  const ext = m[1] === 'jpeg' ? 'jpg' : m[1];
  const name = `${prefix}-${String(i).padStart(2, '0')}-${a.w}x${a.h}.${ext}`;
  fs.writeFileSync(path.join(outDir, name), Buffer.from(m[2], 'base64'));
  console.log(name);
});
