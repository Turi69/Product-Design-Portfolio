import sharp from 'sharp'; import fs from 'node:fs'; import path from 'node:path';
const [,, dir, filter, out, tw = '160', th = '340'] = process.argv;
const files = fs.readdirSync(dir).filter(f => f.startsWith(filter)).sort();
const W = Number(tw), H = Number(th), cols = Math.min(files.length, 6), rows = Math.ceil(files.length / cols);
const tiles = await Promise.all(files.map(async (f, i) => ({ input: await sharp(path.join(dir, f)).resize(W, H, { fit: 'cover', position: 'top' }).toBuffer(), left: (i % cols) * (W + 8), top: Math.floor(i / cols) * (H + 8) })));
await sharp({ create: { width: cols * (W + 8), height: rows * (H + 8), channels: 3, background: '#333' } }).composite(tiles).jpeg({ quality: 80 }).toFile(out);
console.log(files.join(' '));
