import gsap from 'gsap'
import { registerTransition, createCameraMove } from '../TransitionManager'
import type { SlidePosition } from '../../slides/types'

/* ── helpers ──────────────────────────────────────────────── */

/** Convert a SlidePosition to the world-element transform values.
 *
 *  GSAP applies CSS transforms in this order (right-to-left):
 *    translate(x, y)  rotate(r)  scale(s)
 *
 *  So a child at world coordinates (wx, wy) ends up at:
 *    screen = rotate(scale(wx, wy)) + translate
 *
 *  We want the slide centre (pos.x, pos.y) to land at (0, 0)
 *  (viewport centre, because the world div sits at left:50% top:50%).
 *  Solving for translate:
 *    translate = −rotate(scale(pos.x, pos.y))
 */
function toWorld(pos: SlidePosition) {
  const s = 1 / pos.scale
  const rotDeg = -pos.rotation            // GSAP rotation value
  const rad = (rotDeg * Math.PI) / 180
  const sx = pos.x * s
  const sy = pos.y * s
  // CSS standard rotation matrix: rotate(θ) → [cosθ -sinθ; sinθ cosθ]
  const cosR = Math.cos(rad)
  const sinR = Math.sin(rad)
  return {
    x: -(sx * cosR - sy * sinR),
    y: -(sx * sinR + sy * cosR),
    scale: s,
    rotation: rotDeg,
  }
}

/* ── zoom-in ─────────────────────────────────────────────── */

registerTransition('zoom-in', (worldEl, _from, to, _overlay, config) => {
  const tl = gsap.timeline()
  const w = toWorld(to)
  tl.to(worldEl, { ...w, duration: config.duration, ease: 'expo.inOut' })
  return tl
})

/* ── zoom-out ────────────────────────────────────────────── */

registerTransition('zoom-out', (worldEl, _from, to, _overlay, config) => {
  const tl = gsap.timeline()
  const w = toWorld(to)
  // Zoom out first then settle into target
  const mid = { ...w, scale: w.scale * 0.4 }
  tl.to(worldEl, { ...mid, duration: config.duration * 0.5, ease: 'expo.in' })
  tl.to(worldEl, { ...w, duration: config.duration * 0.5, ease: 'expo.out' })
  return tl
})

/* ── mega-zoom ───────────────────────────────────────────── */

registerTransition('mega-zoom', (worldEl, from, to, _overlay, config) => {
  const tl = gsap.timeline()
  const wFrom = toWorld(from)
  const wTo = toWorld(to)
  // Zoom way in, then whip to target and zoom back
  const midX = (wFrom.x + wTo.x) / 2
  const midY = (wFrom.y + wTo.y) / 2
  tl.to(worldEl, {
    x: midX,
    y: midY,
    scale: wFrom.scale * 8,
    rotation: wFrom.rotation,
    duration: config.duration * 0.4,
    ease: 'expo.in',
  })
  tl.to(worldEl, {
    ...wTo,
    duration: config.duration * 0.6,
    ease: 'expo.out',
  })
  return tl
})

/* ── slide ───────────────────────────────────────────────── */

registerTransition('slide', (worldEl, _from, to, _overlay, config) => {
  return createCameraMove(worldEl, to, config.duration, 'power3.inOut')
})

/* ── whip-pan ────────────────────────────────────────────── */

registerTransition('whip-pan', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const w = toWorld(to)
  const dur = config.duration

  // Motion blur overlay
  const blur = document.createElement('div')
  blur.style.cssText =
    'position:absolute;inset:0;' +
    'background:linear-gradient(90deg,transparent 0%,rgba(0,0,0,0.3) 30%,rgba(0,0,0,0.3) 70%,transparent 100%);' +
    'opacity:0;z-index:5;'
  overlay.appendChild(blur)

  tl.set(overlay, { opacity: 1 })
  tl.to(blur, { opacity: 1, duration: dur * 0.15, ease: 'power2.in' })
  tl.to(worldEl, { ...w, duration: dur * 0.7, ease: 'power4.inOut' }, 0)
  tl.to(blur, { opacity: 0, duration: dur * 0.2, ease: 'power2.out' }, `-=${dur * 0.25}`)

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── orbit ───────────────────────────────────────────────── */

registerTransition('orbit', (worldEl, from, to, _overlay, config) => {
  const tl = gsap.timeline()
  const wFrom = toWorld(from)
  const wTo = toWorld(to)
  const dur = config.duration

  // Orbit through a midpoint offset perpendicular to the line between slides
  const dx = wTo.x - wFrom.x
  const dy = wTo.y - wFrom.y
  const midX = (wFrom.x + wTo.x) / 2 - dy * 0.3
  const midY = (wFrom.y + wTo.y) / 2 + dx * 0.3
  const midScale = (wFrom.scale + wTo.scale) / 2 * 0.7

  tl.to(worldEl, {
    x: midX,
    y: midY,
    scale: midScale,
    rotation: wFrom.rotation - 15,
    duration: dur * 0.5,
    ease: 'power2.inOut',
  })
  tl.to(worldEl, {
    ...wTo,
    duration: dur * 0.5,
    ease: 'power2.inOut',
  })

  return tl
})

/* ── dolly-zoom ──────────────────────────────────────────── */

registerTransition('dolly-zoom', (worldEl, _from, to, _overlay, config) => {
  const tl = gsap.timeline()
  const w = toWorld(to)
  const dur = config.duration

  // Dramatic "punch-in" zoom with slight overshoot and settle — feels deliberate
  // Phase 1 (70%): Move to target position, zoom slightly PAST target scale (impact!)
  const overshootScale = w.scale * 1.15
  tl.to(worldEl, {
    x: w.x,
    y: w.y,
    scale: overshootScale,
    rotation: w.rotation,
    duration: dur * 0.7,
    ease: 'power3.out',
  })

  // Phase 2 (30%): Gentle spring-back to the exact target scale
  tl.to(worldEl, {
    scale: w.scale,
    duration: dur * 0.3,
    ease: 'back.out(1.4)',
  })

  return tl
})

/* ── spiral-zoom ─────────────────────────────────────────── */

registerTransition('spiral-zoom', (worldEl, _from, to, _overlay, config) => {
  const tl = gsap.timeline()
  const w = toWorld(to)
  const dur = config.duration

  // Zoom + 360 degree rotation
  tl.to(worldEl, {
    x: w.x,
    y: w.y,
    scale: w.scale,
    rotation: w.rotation - 360,
    duration: dur,
    ease: 'expo.inOut',
  })
  // Snap rotation to the correct final value (remove the extra 360)
  tl.set(worldEl, { rotation: w.rotation })

  return tl
})

/* ── boomerang ───────────────────────────────────────────── */

registerTransition('boomerang', (worldEl, from, to, _overlay, config) => {
  const tl = gsap.timeline()
  const wFrom = toWorld(from)
  const wTo = toWorld(to)
  const dur = config.duration

  // Fly away from target first, then swing back to it
  const overshootX = wFrom.x + (wFrom.x - wTo.x) * 0.4
  const overshootY = wFrom.y + (wFrom.y - wTo.y) * 0.4

  tl.to(worldEl, {
    x: overshootX,
    y: overshootY,
    scale: wFrom.scale * 0.6,
    rotation: wFrom.rotation + 10,
    duration: dur * 0.3,
    ease: 'power2.in',
  })
  tl.to(worldEl, {
    ...wTo,
    duration: dur * 0.7,
    ease: 'power3.out',
  })

  return tl
})
