export type ScrollDirection = 'up' | 'down'

/** Ignores jitter below `threshold` px; near the top the header is always expanded. */
export function nextScrollDirection(
  previousY: number,
  y: number,
  current: ScrollDirection,
  threshold = 6,
  topOffset = 80,
): ScrollDirection {
  if (y <= topOffset) return 'up'
  const delta = y - previousY
  if (Math.abs(delta) < threshold) return current
  return delta > 0 ? 'down' : 'up'
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

/** Frame-rate independent exponential approach of `current` towards `target`; larger `smoothingMs` is slower. */
export function damp(current: number, target: number, dtMs: number, smoothingMs: number): number {
  return current + (target - current) * (1 - Math.exp(-dtMs / smoothingMs))
}

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

export interface Box {
  left: number
  top: number
  width: number
  height: number
}

export interface StackPose {
  x: number
  y: number
  rotate: number
  scale: number
}

/** Small, deterministic offsets so the stack reads as a hand-placed pile. */
const STACK_LAYOUT = [
  { rotate: -7, dx: -18, dy: 14 },
  { rotate: 5, dx: 20, dy: -6 },
  { rotate: 11, dx: 6, dy: -22 },
  { rotate: -3, dx: -8, dy: 4 },
] as const

/**
 * Pose that moves a grid card (measured without transforms) onto the stack target:
 * centers are aligned and every card is scaled to the same visual width.
 */
export function stackPose(card: Box, target: Box, index: number): StackPose {
  const layout = STACK_LAYOUT[index % STACK_LAYOUT.length]!
  const scale = card.width > 0 ? target.width / card.width : 1
  const cardCenterX = card.left + card.width / 2
  const cardCenterY = card.top + card.height / 2
  const targetCenterX = target.left + target.width / 2
  const targetCenterY = target.top + target.height / 2
  return {
    x: targetCenterX - cardCenterX + layout.dx,
    y: targetCenterY - cardCenterY + layout.dy,
    rotate: layout.rotate,
    scale,
  }
}

export function poseToTransform({ x, y, rotate, scale }: StackPose): string {
  return `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rotate}deg) scale(${scale.toFixed(4)})`
}

/** Progress of the stack → grid transition for a scroll position, between `start` and `end` (document px). */
export function revealProgress(scrollY: number, start: number, end: number): number {
  if (end <= start) return 1
  return clamp((scrollY - start) / (end - start))
}
