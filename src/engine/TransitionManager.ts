import gsap from 'gsap'
import type { SlidePosition, TransitionConfig } from '../slides/types'

/* ── Transition Function Signature ─────────────────────── */

export type TransitionFn = (
  worldEl: HTMLElement,
  fromPos: SlidePosition,
  toPos: SlidePosition,
  overlayEl: HTMLElement,
  config: TransitionConfig,
) => gsap.core.Timeline

/* ── Registry ──────────────────────────────────────────── */

const registry = new Map<string, TransitionFn>()

export function registerTransition(id: string, fn: TransitionFn): void {
  registry.set(id, fn)
}

export function getTransition(id: string): TransitionFn | undefined {
  return registry.get(id)
}

export function listTransitions(): string[] {
  return [...registry.keys()]
}

/* ── Default Camera Move (fallback) ────────────────────── */

export function createCameraMove(
  worldEl: HTMLElement,
  toPos: SlidePosition,
  duration: number,
  ease = 'power2.inOut',
): gsap.core.Timeline {
  const tl = gsap.timeline()
  tl.to(worldEl, {
    ...posToCamera(toPos),
    duration,
    ease,
  })
  return tl
}

/**
 * Convert a SlidePosition to the GSAP camera properties for the world element.
 *
 * GSAP applies transforms as:  translate(x, y) rotate(r) scale(s)
 * We need the slide centre (pos.x, pos.y) to end up at (0, 0) on screen.
 */
export function posToCamera(pos: SlidePosition) {
  const s = 1 / pos.scale
  const rotDeg = -pos.rotation
  const rad = (rotDeg * Math.PI) / 180
  const sx = pos.x * s
  const sy = pos.y * s
  const cosR = Math.cos(rad)
  const sinR = Math.sin(rad)
  return {
    x: -(sx * cosR - sy * sinR),
    y: -(sx * sinR + sy * cosR),
    scale: s,
    rotation: rotDeg,
  }
}
