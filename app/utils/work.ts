import type { WorkData } from '#shared/content-schema'

type WorkLike = Pick<WorkData, 'detail' | 'externalUrl'> & {
  path: string
  links?: Partial<WorkData['links']>
}

export type WorkAction = 'case' | 'github' | 'live'

export function workSlug(path: string): string {
  return path.split('/').filter(Boolean).pop() ?? ''
}

/** Where a card leads: its own case page, or straight to GitHub / the live project. */
export function workTarget(work: WorkLike): { action: WorkAction; href: string; external: boolean } {
  if (work.detail === 'case') {
    return { action: 'case', href: `/projects/${workSlug(work.path)}`, external: false }
  }
  const href = work.externalUrl ?? work.links?.github ?? work.links?.live ?? ''
  const action: WorkAction = href.startsWith('https://github.com/') ? 'github' : 'live'
  return { action, href, external: true }
}

export function sortWork<T extends Pick<WorkData, 'order'>>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order)
}

/**
 * Home grid: the first item spans the full row, the rest pair up in two columns.
 * An odd remainder is completed with the "more cases in progress" card instead of leaving a hole.
 */
export function homeGridNeedsPlaceholder(count: number): boolean {
  return count > 1 && (count - 1) % 2 === 1
}

/** In two-column lists, a lone last card spans the row. */
export function spansFullRow(index: number, count: number): boolean {
  return count % 2 === 1 && index === count - 1
}

export function relatedWork<T extends { path: string; order: number }>(
  items: readonly T[],
  currentPath: string,
): T[] {
  return sortWork(items.filter((item) => item.path !== currentPath))
}
