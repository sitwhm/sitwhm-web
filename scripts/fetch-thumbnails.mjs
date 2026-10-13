#!/usr/bin/env node
/**
 * Download the YouTube thumbnail for every talk into public/thumbnails/<year>/.
 *
 * Why not just point an <img> at i.ytimg.com: that fires a request to Google
 * on every page load, before the visitor has done anything, which hands them
 * the visitor's IP address and undoes the reason we bothered with
 * click-to-load in the first place. Fetching once at setup time and serving
 * the file from our own domain keeps the page free of third-party requests
 * until someone actually presses play.
 *
 * Run it after adding or changing a youtubeId in lib/content/<year>/talks.ts,
 * then commit the images:
 *
 *   npm run thumbnails
 */

import { mkdir, writeFile, readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const YEAR = 2026
const OUT_DIR = path.join(ROOT, "public", "thumbnails", String(YEAR))

/** Best first. maxresdefault is 16:9 but doesn't exist for every video. */
const VARIANTS = ["maxresdefault", "sddefault", "hqdefault"]

async function readYoutubeIds() {
  const source = await readFile(
    path.join(ROOT, "lib", "content", String(YEAR), "talks.ts"),
    "utf8",
  )
  const ids = [...source.matchAll(/youtubeId:\s*"([^"]+)"/g)]
    .map((m) => m[1])
    .filter((id) => id !== "PLACEHOLDER")
  return [...new Set(ids)]
}

async function download(id) {
  for (const variant of VARIANTS) {
    const url = `https://i.ytimg.com/vi/${id}/${variant}.jpg`
    const res = await fetch(url)
    if (!res.ok) continue
    const buf = Buffer.from(await res.arrayBuffer())
    // YouTube answers 200 with a tiny grey placeholder when a variant is
    // missing, so size is the only reliable signal that we got a real image.
    if (buf.byteLength < 3000) continue
    await writeFile(path.join(OUT_DIR, `${id}.jpg`), buf)
    return { variant, bytes: buf.byteLength }
  }
  return null
}

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true })

  const ids = await readYoutubeIds()
  if (ids.length === 0) {
    console.log("No youtubeIds found in talks.ts, nothing to do.")
    return 0
  }

  let failed = 0
  for (const id of ids) {
    const result = await download(id)
    if (result) {
      console.log(`${id}.jpg  ${result.variant}  ${result.bytes} bytes`)
    } else {
      failed++
      console.error(`${id}  FAILED, no usable thumbnail`)
    }
  }

  console.log(`\n${ids.length - failed}/${ids.length} thumbnails in public/thumbnails/${YEAR}/`)
  return failed > 0 ? 1 : 0
}

process.exit(await main())
