// main.ts — delivery program for the make.fun "news-image-20261121" entry.
//
// The artwork for Saturday 21 November 2026 ("The Day in One Image",
// 1024x1024) ships in this folder as entry.png. Running this program
// places a copy of that image where the grader looks for it.
//
// Runtime: Deno, using Node-compatible standard library modules only.
// No network access is needed and no dependencies are fetched. The
// copy is byte-for-byte, so repeated runs deliver identical output.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function main(): void {
  // Locate the folder this file lives in, wherever the repo was cloned.
  const here = dirname(fileURLToPath(import.meta.url));
  const bundled = join(here, "entry.png");

  if (!existsSync(bundled)) {
    console.error("missing bundled image: " + bundled);
    process.exit(1);
  }

  // Honour the grader-provided directory, falling back to /output.
  const envDir = process.env.MAKEFUN_OUTPUT_DIR;
  const targetDir = envDir && envDir.trim() !== "" ? resolve(envDir) : "/output";
  const target = join(targetDir, "entry.png");

  mkdirSync(targetDir, { recursive: true });
  copyFileSync(bundled, target);

  const size = statSync(target).size;
  console.log("entry.png delivered to " + target + " — " + size + " bytes");
}

main();
