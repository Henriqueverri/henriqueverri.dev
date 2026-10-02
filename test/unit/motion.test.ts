import { describe, expect, it } from 'vitest'
import {
  clamp,
  damp,
  easeInOutCubic,
  nextScrollDirection,
  poseToTransform,
  revealProgress,
  stackPose,
} from '../../app/utils/motion'

describe('nextScrollDirection', () => {
  it('is always "up" near the top of the page', () => {
    expect(nextScrollDirection(0, 40, 'down')).toBe('up')
  })

  it('ignores jitter below the threshold', () => {
    expect(nextScrollDirection(500, 503, 'up')).toBe('up')
    expect(nextScrollDirection(500, 497, 'down')).toBe('down')
  })

  it('follows the scroll direction past the threshold', () => {
    expect(nextScrollDirection(500, 540, 'up')).toBe('down')
    expect(nextScrollDirection(540, 500, 'down')).toBe('up')
  })
})

describe('damp', () => {
  it('moves towards the target without overshooting', () => {
    const next = damp(0, 100, 16, 170)
    expect(next).toBeGreaterThan(0)
    expect(next).toBeLessThan(100)
    expect(damp(100, 100, 16, 170)).toBe(100)
  })

  it('does not depend on the frame rate', () => {
    const oneFrame = damp(0, 100, 32, 170)
    const twoFrames = damp(damp(0, 100, 16, 170), 100, 16, 170)
    expect(twoFrames).toBeCloseTo(oneFrame, 10)
  })

  it('is slower with a larger smoothing time', () => {
    expect(damp(0, 100, 16, 240)).toBeLessThan(damp(0, 100, 16, 90))
  })
})

describe('stack math', () => {
  const target = { left: 800, top: 200, width: 300, height: 225 }

  it('aligns the card center with the stack target and matches its width', () => {
    const card = { left: 100, top: 1200, width: 600, height: 450 }
    const pose = stackPose(card, target, 3)
    // index 3 → layout offset (-8, 4), rotation -3
    expect(pose.scale).toBe(0.5)
    expect(pose.x).toBe(950 - 400 - 8)
    expect(pose.y).toBe(312.5 - 1425 + 4)
    expect(pose.rotate).toBe(-3)
  })

  it('never divides by zero for unmeasured cards', () => {
    expect(stackPose({ left: 0, top: 0, width: 0, height: 0 }, target, 0).scale).toBe(1)
  })

  it('serializes a pose to a CSS transform', () => {
    expect(poseToTransform({ x: 10, y: -5, rotate: 7, scale: 0.5 })).toBe(
      'translate3d(10.0px, -5.0px, 0) rotate(7deg) scale(0.5000)',
    )
  })

  it('maps scroll position to a clamped progress', () => {
    expect(revealProgress(-50, 0, 1000)).toBe(0)
    expect(revealProgress(250, 0, 1000)).toBe(0.25)
    expect(revealProgress(5000, 0, 1000)).toBe(1)
    expect(revealProgress(10, 100, 100)).toBe(1)
  })

  it('eases within bounds', () => {
    expect(easeInOutCubic(0)).toBe(0)
    expect(easeInOutCubic(1)).toBe(1)
    expect(easeInOutCubic(0.5)).toBe(0.5)
    expect(clamp(2)).toBe(1)
  })
})
