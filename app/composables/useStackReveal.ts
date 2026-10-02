import { damp, easeInOutCubic, poseToTransform, revealProgress, stackPose, type Box } from '~/utils/motion'

const DURATION = 1000
/** How far the cards trail behind the scroll position; larger is a slower, softer glide. */
const SMOOTHING_MS = 240

function documentBox(el: Element): Box {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  }
}

/**
 * Hero stack → grid transition.
 *
 * Grid items (`[data-stack-item]`, never transformed) are measured; their inner `[data-stack-card]`
 * gets a paused WAAPI animation from the stacked pose (over `[data-stack-target]` in the hero) to
 * its place in the grid. Scroll progress drives `currentTime`, smoothed per frame. Without
 * `data-motion` on <html> (reduced motion, no JS) nothing runs and the grid stays as rendered.
 */
export function useStackReveal(section: Ref<HTMLElement | null>) {
  let animations: Animation[] = []
  let start = 0
  let end = 1
  let target = 0
  let current = 0
  let frame = 0
  let lastTime = 0
  let resizeTimer: ReturnType<typeof setTimeout> | undefined
  let resizeObserver: ResizeObserver | undefined

  const setState = (state: 'stacked' | 'revealed') => {
    if (section.value && section.value.dataset.stack !== state) section.value.dataset.stack = state
  }

  const apply = () => {
    const time = easeInOutCubic(current) * DURATION
    for (const animation of animations) animation.currentTime = time
    setState(current > 0.985 ? 'revealed' : 'stacked')
  }

  const tick = (now: number) => {
    const dt = lastTime ? now - lastTime : 16
    lastTime = now
    current = damp(current, target, dt, SMOOTHING_MS)
    if (Math.abs(target - current) < 0.001) current = target
    apply()
    frame = current === target ? 0 : requestAnimationFrame(tick)
  }

  const onScroll = () => {
    target = revealProgress(window.scrollY, start, end)
    if (!frame) {
      lastTime = 0
      frame = requestAnimationFrame(tick)
    }
  }

  /** Falls back to the plain grid. Cards are hidden until ready, so this must always end visible. */
  const release = () => {
    teardownAnimations()
    if (!section.value) return
    delete section.value.dataset.stack
    section.value.dataset.stackReady = ''
  }

  const measure = () => {
    const root = section.value
    const stackTarget = document.querySelector<HTMLElement>('[data-stack-target]')
    if (!root || !stackTarget || stackTarget.offsetParent === null) return release()

    const targetBox = documentBox(stackTarget)
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-stack-item]'))
    teardownAnimations()

    animations = items.flatMap((item, index) => {
      const card = item.querySelector<HTMLElement>('[data-stack-card]')
      if (!card) return []
      const pose = stackPose(documentBox(item), targetBox, index)
      const animation = card.animate([{ transform: poseToTransform(pose) }, { transform: 'none' }], {
        duration: DURATION,
        fill: 'both',
        easing: 'linear',
      })
      animation.pause()
      return [animation]
    })

    const isNarrow = window.innerWidth < 768
    const gridTop = documentBox(root).top
    start = 0
    // The 120px floor stays above the anchors' 6rem scroll margin, so "#work" links land on the finished grid.
    end = Math.max(1, gridTop - Math.max(120, window.innerHeight * (isNarrow ? 0.18 : 0.12)))
    target = revealProgress(window.scrollY, start, end)
    current = target
    apply()
    root.dataset.stackReady = ''
  }

  function teardownAnimations() {
    for (const animation of animations) animation.cancel()
    animations = []
  }

  const onResize = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(measure, 120)
  }

  /** Keyboard users tabbing into a stacked card are taken to the grid, which completes the reveal. */
  const onFocusIn = () => {
    if (section.value?.dataset.stack === 'stacked') {
      section.value.scrollIntoView({ block: 'start' })
    }
  }

  onMounted(() => {
    if (!document.documentElement.hasAttribute('data-motion')) return
    if (!('animate' in Element.prototype)) return release()
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(document.documentElement)
    section.value?.addEventListener('focusin', onFocusIn)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    section.value?.removeEventListener('focusin', onFocusIn)
    resizeObserver?.disconnect()
    clearTimeout(resizeTimer)
    if (frame) cancelAnimationFrame(frame)
    teardownAnimations()
  })
}
