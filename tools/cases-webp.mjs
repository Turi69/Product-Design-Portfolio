// Convert case-study captures to WebP and record intrinsic sizes.
// Reads each source into memory first so Windows does not hold a lock on the file.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

sharp.cache(false);
const [,, dir, outTs] = process.argv;

const sources = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f));
for (const f of sources) {
  const src = path.join(dir, f);
  const base = f.replace(/\.(png|jpe?g)$/i, '');
  const buf = fs.readFileSync(src);
  const m = await sharp(buf).metadata();
  const out = await sharp(buf)
    .resize({ width: Math.min(m.width, 2400), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();
  fs.writeFileSync(path.join(dir, `${base}.webp`), out);
  fs.unlinkSync(src);
}

const sizes = {};
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.webp')).sort()) {
  const m = await sharp(fs.readFileSync(path.join(dir, f))).metadata();
  sizes[f.replace(/\.webp$/, '')] = [m.width, m.height];
}

fs.writeFileSync(
  outTs,
  '// Generated: intrinsic sizes of case-study images, so layout is reserved before they load.\n' +
    `export const caseImageSizes: Record<string, [number, number]> = ${JSON.stringify(sizes, null, 2)};\n`,
);
console.log(`${sources.length} converted, ${Object.keys(sizes).length} sized`);
