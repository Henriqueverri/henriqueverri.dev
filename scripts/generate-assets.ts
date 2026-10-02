/**
 * Generates favicons and Open Graph images into /public from the site's own content.
 * Run with `bun run assets` after changing titles, headlines or adding a case; the output is committed.
 * Text uses system fonts available to librsvg (Ubuntu Sans / Noto Sans / DejaVu Sans as fallbacks).
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'
import { parse } from 'yaml'

const root = join(import.meta.dir, '..')
const publicDir = join(root, 'public')
const SANS = "'Ubuntu Sans', 'Noto Sans', 'DejaVu Sans', sans-serif"
const MONO = "'Ubuntu Mono', 'Noto Sans Mono', 'DejaVu Sans Mono', monospace"

const INK = '#0b0c0f'
const MUTED = '#696c76'
const ACCENT = '#10b98a'

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = (line + ' ' + word).trim()
    }
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = lines[maxLines - 1]!.replace(/\s*\S*$/, '') + '…'
  }
  return lines
}

function monogram(size: number, radius: number) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="${INK}"/>
  <text x="29" y="41" text-anchor="middle" font-family="${MONO}" font-weight="700" font-size="25" letter-spacing="-1.5" fill="#ffffff">HV</text>
  <circle cx="48.5" cy="40" r="3.6" fill="${ACCENT}"/>
</svg>`
}

function ogSvg({
  eyebrow,
  title,
  subtitle,
  accent,
}: {
  eyebrow: string
  title: string
  subtitle: string
  accent: string
}) {
  const titleLines = wrap(title, 32, 2)
  const subtitleLines = wrap(subtitle, 52, 2)
  const titleY = 300 - (titleLines.length - 1) * 38
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#e3e3e7" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="0.9" cy="0.05" r="0.75">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#fade)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(80 72)">
    <rect width="56" height="56" rx="28" fill="${INK}"/>
    <text x="25" y="36" text-anchor="middle" font-family="${MONO}" font-weight="700" font-size="21" letter-spacing="-1" fill="#fff">HV</text>
    <circle cx="42" cy="35" r="3.2" fill="${ACCENT}"/>
    <text x="76" y="25" font-family="${SANS}" font-weight="600" font-size="24" fill="${INK}">Henrique Verri</text>
    <text x="76" y="52" font-family="${SANS}" font-size="20" fill="${MUTED}">Frontend Engineer</text>
  </g>
  <text x="80" y="${titleY - 70}" font-family="${MONO}" font-size="20" letter-spacing="1" fill="${MUTED}">${escape(eyebrow.toUpperCase())}</text>
  ${titleLines
    .map(
      (line, i) =>
        `<text x="78" y="${titleY + i * 76}" font-family="${SANS}" font-weight="600" font-size="68" letter-spacing="-2.5" fill="${INK}">${escape(line)}</text>`,
    )
    .join('\n  ')}
  ${subtitleLines
    .map(
      (line, i) =>
        `<text x="80" y="${titleY + titleLines.length * 76 + 18 + i * 38}" font-family="${SANS}" font-size="29" fill="${MUTED}">${escape(line)}</text>`,
    )
    .join('\n  ')}
  <rect x="80" y="540" width="40" height="4" rx="2" fill="${accent}"/>
  <text x="136" y="548" font-family="${MONO}" font-size="22" fill="${INK}">henriqueverri.dev</text>
</svg>`
}

/** ICO container with a single embedded PNG (supported by every current browser). */
function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(22)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  header.writeUInt8(size, 6)
  header.writeUInt8(size, 7)
  header.writeUInt8(0, 8)
  header.writeUInt8(0, 9)
  header.writeUInt16LE(1, 10)
  header.writeUInt16LE(32, 12)
  header.writeUInt32LE(png.length, 14)
  header.writeUInt32LE(22, 18)
  return Buffer.concat([header, png])
}

async function frontmatter(path: string) {
  const source = await readFile(path, 'utf8')
  const match = source.match(/^---\n([\s\S]*?)\n---/)
  return parse(match?.[1] ?? '') as {
    title: string
    headline: string
    category: string
    accent: string
    status: string
  }
}

const COPY = {
  pt: {
    home: {
      eyebrow: 'Portfólio',
      title: 'Frontends consistentes enquanto o produto cresce',
      subtitle: 'Vue, Nuxt e TypeScript · Design Systems, arquitetura de frontend, APIs, testes e CI',
    },
    projects: {
      eyebrow: 'Projetos',
      title: 'Projetos e cases',
      subtitle: 'Projetos autorais e cases profissionais de engenharia frontend',
    },
    case: 'Case',
  },
  en: {
    home: {
      eyebrow: 'Portfolio',
      title: 'Frontends that stay consistent as the product grows',
      subtitle: 'Vue, Nuxt and TypeScript · Design Systems, frontend architecture, APIs, testing and CI',
    },
    projects: {
      eyebrow: 'Work',
      title: 'Projects and case studies',
      subtitle: 'Personal products and professional frontend engineering case studies',
    },
    case: 'Case study',
  },
} as const

async function main() {
  await mkdir(join(publicDir, 'og'), { recursive: true })

  await writeFile(join(publicDir, 'favicon.svg'), monogram(64, 14))
  const png32 = await sharp(Buffer.from(monogram(32, 14)))
    .resize(32, 32)
    .png()
    .toBuffer()
  await writeFile(join(publicDir, 'favicon.ico'), pngToIco(png32, 32))
  await sharp(Buffer.from(monogram(180, 0)))
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'))

  const render = (name: string, svg: string) =>
    sharp(Buffer.from(svg))
      .png({ compressionLevel: 9 })
      .toFile(join(publicDir, 'og', `${name}.png`))

  for (const locale of ['pt', 'en'] as const) {
    const copy = COPY[locale]
    await render(`home-${locale}`, ogSvg({ ...copy.home, accent: ACCENT }))
    await render(`projects-${locale}`, ogSvg({ ...copy.projects, accent: ACCENT }))

    const workDir = join(root, 'content', locale, 'work')
    for (const file of (await readdir(workDir)).filter((name) => name.endsWith('.md'))) {
      const data = await frontmatter(join(workDir, file))
      if (data.status !== 'published') continue
      const slug = file.replace(/\.md$/, '')
      await render(
        `work-${slug}-${locale}`,
        ogSvg({
          eyebrow: `${copy.case} · ${data.category}`,
          title: data.title,
          subtitle: data.headline,
          accent: data.accent,
        }),
      )
    }
  }

  console.log('Assets written to public/ (favicons and og/*.png)')
}

await main()
