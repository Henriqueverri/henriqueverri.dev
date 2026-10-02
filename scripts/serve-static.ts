/**
 * Serves `.output/public` the way Cloudflare static assets do: `/projects` → `projects.html`,
 * directories → `index.html`, unknown paths → `404.html` with status 404.
 * Used by `bun run preview` and by the Playwright suite.
 */
import { stat } from 'node:fs/promises'
import { join, normalize } from 'node:path'

const root = join(import.meta.dir, '..', '.output', 'public')
const port = Number(process.env.PORT ?? 3000)

async function resolve(pathname: string) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '')
  const candidates = clean.endsWith('/')
    ? [join(clean, 'index.html')]
    : [clean, `${clean}.html`, join(clean, 'index.html')]
  for (const candidate of candidates) {
    const path = join(root, candidate)
    const info = await stat(path).catch(() => null)
    if (info?.isFile()) return Bun.file(path)
  }
  return null
}

const server = Bun.serve({
  port,
  async fetch(request) {
    const { pathname } = new URL(request.url)
    const file = await resolve(pathname)
    if (file) return new Response(file)
    return new Response(Bun.file(join(root, '404.html')), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  },
})

console.log(`Serving ${root} at http://localhost:${server.port}`)
