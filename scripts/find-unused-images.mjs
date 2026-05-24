import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'])

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['node_modules', 'dist', '.git'].includes(e.name)) continue
      walk(p, files)
    } else if (IMAGE_EXT.has(path.extname(e.name).toLowerCase())) {
      files.push(p)
    }
  }
  return files
}

const corpusParts = []
function readDir(d) {
  if (!fs.existsSync(d)) return
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) {
      if (['node_modules', 'dist', '.git', '.chatgpt-zip-staging'].includes(e.name)) continue
      readDir(p)
    } else if (/\.(ts|tsx|js|jsx|css|html|json|md|mjs)$/.test(p)) {
      corpusParts.push(fs.readFileSync(p, 'utf8'))
    }
  }
}
readDir(path.join(ROOT, 'src'))
readDir(path.join(ROOT, 'scripts'))
const indexHtml = path.join(ROOT, 'index.html')
if (fs.existsSync(indexHtml)) corpusParts.push(fs.readFileSync(indexHtml, 'utf8'))
const corpus = corpusParts.join('\n')

const refs = new Set()
for (const m of corpus.matchAll(/['"`](\/(?:images|brand)\/[^'"`\s]+)['"`]/g)) {
  refs.add(m[1].split('?')[0])
}
for (const m of corpus.matchAll(/`\$\{P\}\/([^`]+)`/g)) {
  refs.add(`/images/cursor-pack/${m[1]}`)
}
for (const m of corpus.matchAll(/p\('([^']+)'\)/g)) {
  refs.add(`/images/supplify-cursor-pack/${m[1]}`)
}
for (const m of corpus.matchAll(/`\$\{BASE\}\/([^`]+)`/g)) {
  refs.add(`/images/cookie-dough-homepage/${m[1]}`)
}
for (const m of corpus.matchAll(/`\$\{CURSOR_PACK\.screenshots\}\/([^`]+)`/g)) {
  refs.add(`/images/cursor-pack/08-original-screenshots/${m[1]}`)
}

const imageFiles = walk(path.join(ROOT, 'public'))
const unused = []

for (const file of imageFiles) {
  const rel = path.relative(path.join(ROOT, 'public'), file).replace(/\\/g, '/')
  const webPath = `/images/${rel}`
  const basename = path.basename(file)
  const found =
    refs.has(webPath) ||
    [...refs].some((r) => r.endsWith('/' + basename)) ||
    corpus.includes(webPath) ||
    corpus.includes(rel)
  if (!found) unused.push(`public/${rel}`)
}

const dupDirs = [
  'public/images/cursor-pack/_unzip',
  'public/images/cursor-pack/_fresh',
  'public/images/cursor-pack/cookie_dough_cursor_image_pack',
  'public/images/supplify-cursor-pack/supplify_cursor_asset_pack',
].filter((d) => fs.existsSync(path.join(ROOT, d)))

console.log(
  JSON.stringify(
    { refs: refs.size, total: imageFiles.length, unused: unused.length, dupDirs, files: unused.sort() },
    null,
    2,
  ),
)
