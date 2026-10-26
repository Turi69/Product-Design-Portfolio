// Fit real screens into the blank black screens of a generated scene.
// node composite.mjs <scene.png> <screen.png>[,<screen2.png>…] <out.webp> [radiusRatio] [threshold] [occlude]
// With several screens (comma-separated), the largest blank screens are filled left to right in the order given.
import sharp from 'sharp';

const [,, scenePath, screenArg, outPath, radiusArg = '0.14', thrArg = '22', occludeArg] = process.argv;
const screenPaths = screenArg.split(',');
const radiusRatio = Number(radiusArg);
const threshold = Number(thrArg);

const scene = sharp(scenePath);
const { width: W, height: H } = await scene.metadata();
const { data } = await scene.clone().removeAlpha().raw().toBuffer({ resolveWithObject: true });

// Mask of near-black pixels.
const dark = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) {
  const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
  dark[i] = Math.max(r, g, b) < threshold ? 1 : 0;
}

// Connected dark components (4-neighbour flood fill), ignoring regions touching the border.
const label = new Int32Array(W * H);
const candidates = [];
let id = 0;
const stack = new Int32Array(W * H);
for (let start = 0; start < W * H; start++) {
  if (!dark[start] || label[start]) continue;
  id++;
  let sp = 0, count = 0, minX = W, minY = H, maxX = 0, maxY = 0, edge = false;
  stack[sp++] = start; label[start] = id;
  while (sp) {
    const p = stack[--sp];
    const x = p % W, y = (p / W) | 0;
    count++;
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    if (x === 0 || y === 0 || x === W - 1 || y === H - 1) edge = true;
    const n = [p - 1, p + 1, p - W, p + W];
    for (const q of n) {
      if (q < 0 || q >= W * H) continue;
      if (Math.abs((q % W) - x) > 1) continue;
      if (dark[q] && !label[q]) { label[q] = id; stack[sp++] = q; }
    }
  }
  const fill = count / ((maxX - minX + 1) * (maxY - minY + 1));
  if (!edge && fill > 0.8) candidates.push({ id, count, minX, minY, maxX, maxY, fill });
}
// The largest blank screens, one per screen given, ordered left to right.
const targets = candidates.sort((a, b) => b.count - a.count).slice(0, screenPaths.length).sort((a, b) => a.minX - b.minX);
if (targets.length < screenPaths.length) throw new Error(`Found ${targets.length} screen(s) for ${screenPaths.length}; try a higher threshold`);

const layers = [];
for (const [k, best] of targets.entries()) {
  // Trim the antialiased bezel edge by a couple of pixels so no black hairline shows.
  const inset = 2;
  const x = best.minX + inset, y = best.minY + inset;
  const w = best.maxX - best.minX + 1 - inset * 2, h = best.maxY - best.minY + 1 - inset * 2;
  const r = Math.round(Math.min(w, h) * radiusRatio);
  console.log(JSON.stringify({ W, H, x, y, w, h, r, fill: best.fill.toFixed(3), screen: screenPaths[k] }));

  const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/></svg>`);
  // Soft glass: a faint diagonal sheen and a slight inner vignette so the screen sits in the scene's light.
  const glass = Buffer.from(`<svg width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.10"/>
      <stop offset="0.45" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" rx="${r}" ry="${r}" fill="url(#g)"/>
</svg>`);

  const screen = await sharp(screenPaths[k])
    .resize(w, h, { fit: 'cover', position: 'top' })
    .modulate({ brightness: 0.94 })
    .composite([{ input: glass }, { input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // "occlude": keep only the screen's own dark pixels, so whatever sits in front of it (a shoulder, a hand) stays in front.
  let layer = screen;
  if (occludeArg === 'occlude') {
    const a = Buffer.alloc(w * h * 4, 255);
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) a[(j * w + i) * 4 + 3] = label[(y + j) * W + (x + i)] === best.id ? 255 : 0;
    }
    const alpha = await sharp(a, { raw: { width: w, height: h, channels: 4 } }).blur(0.8).png().toBuffer();
    layer = await sharp(screen).composite([{ input: alpha, blend: 'dest-in' }]).png().toBuffer();
  }
  layers.push({ input: layer, left: x, top: y });
}

await sharp(scenePath).composite(layers).webp({ quality: 86 }).toFile(outPath);
console.log('wrote', outPath);
