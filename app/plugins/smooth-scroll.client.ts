import { clamp, damp } from '~/utils/motion'

/** How long the page keeps gliding after a wheel step; larger is slower. */
const SMOOTHING_MS = 170
/** Distance per wheel step relative to the native one. */
const WHEEL_SPEED = 0.85

/**
 * Smooth wheel scrolling: wheel steps move a target and the page glides towards it.
 * Only for mouse and trackpad with motion allowed; touch, keyboard, the scrollbar and anchor
 * links keep native scrolling, and any of them interrupts a glide in progress.
 */
export default defineNuxtPlugin(() => {
  const root = document.documentElement
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
  let target = 0
  let current = 0
  let frame = 0
  let lastTime = 0

  const stop = () => {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
  }

  /** Scrollable elements under the pointer (code blocks, panels) scroll natively until they hit an edge. */
  const scrollsInside = (start: EventTarget | null, deltaY: number) => {
    for (
      let node = start instanceof Element ? start : null;
      node && node !== root;
      node = node.parentElement
    ) {
      if (node.scrollHeight <= node.clientHeight) continue
      const { overflowY } = getComputedStyle(node)
      if (overflowY !== 'auto' && overflowY !== 'scroll') continue
      if (deltaY > 0 ? node.scrollTop + node.clientHeight < node.scrollHeight - 1 : node.scrollTop > 0)
        return true
    }
    return false
  }

  const tick = (now: number) => {
    const dt = lastTime ? now - lastTime : 16
    lastTime = now
    current = damp(current, target, dt, SMOOTHING_MS)
    if (Math.abs(target - current) < 0.5) current = target
    window.scrollTo({ top: current, behavior: 'instant' })
    frame = current === target ? 0 : requestAnimationFrame(tick)
  }

  const onWheel = (event: WheelEvent) => {
    if (!('motion' in root.dataset) || !finePointer.matches) return
    if (event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
    if (document.body.style.overflow === 'hidden' || scrollsInside(event.target, event.deltaY)) return

    event.preventDefault()
    if (!frame) {
      current = target = window.scrollY
      lastTime = 0
    }
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
    const max = root.scrollHeight - window.innerHeight
    target = clamp(target + event.deltaY * unit * WHEEL_SPEED, 0, max)
    if (!frame) frame = requestAnimationFrame(tick)
  }

  window.addEventListener('wheel', onWheel, { passive: false })
  for (const type of ['keydown', 'pointerdown', 'touchstart'] as const) {
    window.addEventListener(type, stop, { passive: true })
  }
})
