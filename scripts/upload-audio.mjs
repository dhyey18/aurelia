// Uploads every file in public/audio/ to Vercel Blob storage, printing the
// resulting public URL for each. Run this after dropping new mp3s into
// public/audio/ and updating data/songs.ts to reference their Blob URLs.
//
// Requires a BLOB_READ_WRITE_TOKEN — run `vercel env pull .env.local` first
// (the project must already be linked via `vercel link`).
import { put } from "@vercel/blob";
import { readFileSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(root, "..", ".env.local");
try {
  const envLocal = readFileSync(envPath, "utf8");
  for (const line of envLocal.split("\n")) {
    const match = /^([A-Z_]+)=(.*)$/.exec(line.trim());
    if (match) process.env[match[1]] = match[2].replace(/^"(.*)"$/, "$1");
  }
} catch {
  console.error("No .env.local found — run `vercel env pull .env.local` first.");
  process.exit(1);
}

const audioDir = path.join(root, "..", "public", "audio");
const files = readdirSync(audioDir).filter((f) => f.endsWith(".mp3"));

if (files.length === 0) {
  console.log("No mp3 files found in public/audio/.");
  process.exit(0);
}

for (const file of files) {
  const data = readFileSync(path.join(audioDir, file));
  const blob = await put(file, data, {
    access: "public",
    contentType: "audio/mpeg",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
  console.log(`${file} -> ${blob.url}`);
}
