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
    x: -toPos.x,
    y: -toPos.y,
    scale: 1 / toPos.scale,
    rotation: -toPos.rotation,
    duration,
    ease,
  })
  return tl
}
