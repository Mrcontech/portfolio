/**
 * Pixel-diff verification.
 *
 * Compares a captured clone screenshot against the crawled reference and
 * reports an overall match percentage plus a per-band breakdown, so a failing
 * section can be located instead of just "the page is 4% off".
 *
 * Usage:
 *   node scripts/verify.mjs <reference.png> <clone.png> [outputDiff.png]
 *
 * Screenshots are captured separately (Playwright MCP or `npx playwright`);
 * this script only does the comparison, so it stays dependency-light.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const [refPath, clonePath, outPath = 'diff.png'] = process.argv.slice(2)

if (!refPath || !clonePath) {
  console.error('usage: node scripts/verify.mjs <reference.png> <clone.png> [diff.png]')
  process.exit(2)
}
for (const p of [refPath, clonePath]) {
  if (!existsSync(p)) {
    console.error(`missing file: ${p}`)
    process.exit(2)
  }
}

const ref = PNG.sync.read(readFileSync(refPath))
const clone = PNG.sync.read(readFileSync(clonePath))

// Captures rarely agree to the pixel on total height; compare the shared region.
const width = Math.min(ref.width, clone.width)
const height = Math.min(ref.height, clone.height)

const crop = (src) => {
  if (src.width === width && src.height === height) return src
  const out = new PNG({ width, height })
  PNG.bitblt(src, out, 0, 0, width, height, 0, 0)
  return out
}

const a = crop(ref)
const b = crop(clone)
const diff = new PNG({ width, height })

const mismatched = pixelmatch(a.data, b.data, diff.data, width, height, {
  threshold: 0.12,
  includeAA: false,
})

writeFileSync(outPath, PNG.sync.write(diff))

const total = width * height
const match = ((1 - mismatched / total) * 100).toFixed(2)

console.log('')
console.log(`  reference : ${refPath}  ${ref.width}x${ref.height}`)
console.log(`  clone     : ${clonePath}  ${clone.width}x${clone.height}`)
console.log(`  compared  : ${width}x${height}  (${total.toLocaleString()} px)`)
console.log(`  height Δ  : ${Math.abs(ref.height - clone.height)} px`)
console.log('')
console.log(`  OVERALL MATCH: ${match}%   (${mismatched.toLocaleString()} px differ)`)
console.log('')

// Per-band breakdown so a bad section is locatable.
const BANDS = 12
const bandHeight = Math.floor(height / BANDS)
console.log('  band      y-range            match')
console.log('  ------------------------------------')
for (let i = 0; i < BANDS; i++) {
  const y0 = i * bandHeight
  const h = i === BANDS - 1 ? height - y0 : bandHeight
  let bad = 0
  for (let y = y0; y < y0 + h; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) * 4
      // diff.png paints mismatches red; count those pixels
      if (diff.data[idx] === 255 && diff.data[idx + 1] === 0) bad++
    }
  }
  const pct = ((1 - bad / (width * h)) * 100).toFixed(2)
  const bar = '█'.repeat(Math.round(Number(pct) / 5)).padEnd(20, '░')
  console.log(
    `  ${String(i + 1).padStart(2)}   ${String(y0).padStart(5)}-${String(y0 + h).padEnd(6)}  ${bar} ${pct}%`,
  )
}
console.log('')
console.log(`  diff written to ${outPath}`)

process.exit(Number(match) >= 95 ? 0 : 1)
