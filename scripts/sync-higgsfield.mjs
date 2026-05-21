#!/usr/bin/env node
/**
 * Download Higgsfield assets into public/images/ from manifest.json URLs.
 * Generate images in Cursor with /higgs, copy rawUrl from results into manifest.json.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = join(root, 'public', 'images', 'manifest.json')
const outDir = join(root, 'public', 'images')

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const entries = Object.entries(manifest).filter(([k, v]) => !k.startsWith('_') && typeof v === 'string' && v.startsWith('http'))

if (entries.length === 0) {
  console.log('No URLs in public/images/manifest.json — add Higgsfield rawUrl values first.')
  process.exit(0)
}

mkdirSync(outDir, { recursive: true })

for (const [filename, url] of entries) {
  const dest = join(outDir, filename)
  process.stdout.write(`Downloading ${filename}… `)
  const res = await fetch(url)
  if (!res.ok) {
    console.log(`FAILED (${res.status})`)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  writeFileSync(dest, buf)
  console.log(`OK (${(buf.length / 1024).toFixed(0)} KB)`)
}

console.log('Done. Refresh the site to see Higgsfield heroes.')
