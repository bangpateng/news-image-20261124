// news-image-20261124 — a one-image summary of Tuesday 24 November 2026.
// Node 22, standard library only, no network: it copies the entry.png that
// ships in this repository to the grader's output directory, so both runs
// write exactly the same bytes. Before copying it validates the image
// against the competition gate (PNG signature, at most 1024x1024, at most
// 1 MiB) and verifies the written bytes round-trip, so a corrupt or
// oversized source fails loudly here instead of at the gate.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576;
const MAX_DIM = 1024;
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(repoDir, "entry.png");
const png = readFileSync(src);

if (!png.subarray(0, 8).equals(PNG_SIG)) {
  throw new Error("entry.png is not a PNG (bad signature)");
}
if (png.length > MAX_BYTES) {
  throw new Error(`entry.png is ${png.length} bytes, over the 1 MiB limit`);
}
// IHDR chunk: bytes 16-19 width, 20-23 height, big-endian.
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width === 0 || height === 0 || width > MAX_DIM || height > MAX_DIM) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 limit`);
}
// Walk every PNG chunk and check its CRC, so a truncated or corrupt file
// fails here instead of at the gate (which requires a whole image: every
// chunk with its checksum, ending exactly at IEND).
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
let off = 8;
let sawIdat = false;
let sawIend = false;
while (off < png.length) {
  if (off + 8 > png.length) {
    throw new Error(`entry.png is truncated inside a chunk header at ${off}`);
  }
  const len = png.readUInt32BE(off);
  const type = png.toString("ascii", off + 4, off + 8);
  if (off === 8 && type !== "IHDR") {
    throw new Error("entry.png does not start with an IHDR chunk");
  }
  if (off + 12 + len > png.length) {
    throw new Error(`entry.png is truncated inside the ${type} chunk`);
  }
  const stored = png.readUInt32BE(off + 8 + len);
  const actual = crc32(png.subarray(off + 4, off + 8 + len));
  if (stored !== actual) {
    throw new Error(`entry.png has a bad CRC in the ${type} chunk`);
  }
  if (type === "IDAT") sawIdat = true;
  if (type === "IEND") {
    sawIend = true;
    off += 12 + len;
    break;
  }
  off += 12 + len;
}
if (!sawIdat || !sawIend || off !== png.length) {
  throw new Error("entry.png is not a whole PNG (missing IDAT/IEND or trailing bytes)");
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
writeFileSync(dest, png);
const written = readFileSync(dest);
if (!written.equals(png)) {
  throw new Error("written entry.png does not match the source bytes");
}
console.log(`wrote ${dest}: ${width}x${height}, ${png.length} bytes`);
