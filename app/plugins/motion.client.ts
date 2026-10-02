import { nextScrollDirection, type ScrollDirection } from '~/utils/motion'

declare global {
  interface Window {
    __hvReady?: boolean
  }
}

/**
 * Global UI state lives as data attributes on <html>, consumed by CSS variants:
 * - `data-motion`: set by the inline head script when motion is allowed; kept in sync here.
 * - `data-scroll`: last scroll direction, collapses the header.
 * - `data-revealed` on `[data-reveal]` elements once they enter the viewport.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

  reduced.addEventListener('change', () => {
    if (reduced.matches) delete root.dataset.motion
    else root.dataset.motion = ''
  })

  let lastY = window.scrollY
  let ticking = false
  root.dataset.scroll = nextScrollDirection(lastY, lastY, 'up')

  const updateDirection = () => {
    const y = window.scrollY
    const current = (root.dataset.scroll as ScrollDirection | undefined) ?? 'up'
    const next = nextScrollDirection(lastY, y, current)
    if (next !== current) root.dataset.scroll = next
    lastY = y
    ticking = false
  }

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(updateDirection)
    },
    { passive: true },
  )

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-revealed', '')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )

  const observeAll = () => {
    document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => observer.observe(el))
  }

  nuxtApp.hook('app:mounted', () => {
    window.__hvReady = true
    observeAll()
  })

  nuxtApp.hook('page:finish', () => {
    requestAnimationFrame(observeAll)
  })
})
