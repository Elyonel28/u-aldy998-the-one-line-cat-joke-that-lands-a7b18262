// The One-Line Cat Joke That Lands
// Writes one single-line cat joke to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace, one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Setup: the cat stares at nothing. Turn: the cat blames YOU for
// not seeing the ghost. Short, visual, retellable, no tired pun.
const JOKE =
  "My cat stares at the wall for an hour, then looks at me like I'm the one who can't see the ghost.";

function main(): void {
  const line = JOKE.trim();
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`joke must be 1-200 characters, got ${chars}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  if (!/\S/.test(line)) {
    throw new Error("joke must not be only whitespace");
  }
  // The task is a joke *about cats*: fail loudly if the line ever
  // stops being one, instead of shipping a valid-but-off-topic entry.
  if (!/cat/i.test(line)) {
    throw new Error("joke must be about cats");
  }
  // Tie-breaks favour fewer bytes, so the joke stays short on purpose.
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line, "utf8");
  console.log(`wrote ${chars} chars to ${outPath}`);
}

main();
