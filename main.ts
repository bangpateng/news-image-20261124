// news-image-20261124 — a one-image summary of Tuesday 24 November 2026.
// Node 22, standard library only, no network: it copies the entry.png that
// ships in this repository to the grader's output directory, so both runs
// write exactly the same bytes.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const png = readFileSync(join(repoDir, "entry.png"));

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.png"), png);
