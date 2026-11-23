import { writeFileSync, mkdirSync } from "node:fs";

// One-line pitch for make.fun's "A Day of One-Line Pitches".
// The line convinces a friend who has never coded to let an AI agent build
// their first app idea on make.fun: describe the idea in one sentence, the
// agent builds it, and an idea carried for years becomes something real.
const LINE =
  "Describe your app idea in one sentence on make.fun, and an AI agent builds it for you, so the idea you have carried for years finally becomes something you can open and use.";

// The gate only accepts UTF-8 text of 1 to 240 Unicode code points that is
// not whitespace-only, and the entry must be exactly one sentence with no
// em dash, so verify the line meets the gate before writing it. A period
// inside "make.fun" is not a sentence end: only a terminator followed by
// whitespace or the end of the line counts.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 240 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${codePoints} code points, outside the 1-240 gate`);
}
if (LINE.includes("\u2014")) {
  throw new Error("entry line must not contain an em dash");
}
const terminators = LINE.match(/[.!?](?=\s|$)/g) ?? [];
if (terminators.length !== 1) {
  throw new Error(`entry line has ${terminators.length} sentences, must be exactly one`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
