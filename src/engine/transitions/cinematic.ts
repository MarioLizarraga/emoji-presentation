import gsap from 'gsap'
import { registerTransition, posToCamera } from '../TransitionManager'
import type { SlidePosition } from '../../slides/types'

/* ── helpers ──────────────────────────────────────────────── */

function snapCamera(worldEl: HTMLElement, to: SlidePosition) {
  gsap.set(worldEl, posToCamera(to))
}

/* ── fade ─────────────────────────────────────────────────── */

registerTransition('fade', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  const curtain = document.createElement('div')
  curtain.style.cssText =
    'position:absolute;inset:0;background:var(--bg,#0a0a0a);opacity:0;z-index:10;'
  overlay.appendChild(curtain)

  tl.set(overlay, { opacity: 1 })
  tl.to(curtain, { opacity: 1, duration: dur * 0.4, ease: 'power2.inOut' })
  tl.call(() => snapCamera(worldEl, to))
  tl.to(curtain, { opacity: 0, duration: dur * 0.4, ease: 'power2.inOut' })

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── fade-black ──────────────────────────────────────────── */

registerTransition('fade-black', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  const curtain = document.createElement('div')
  curtain.style.cssText = 'position:absolute;inset:0;background:#000;opacity:0;z-index:10;'
  overlay.appendChild(curtain)

  tl.set(overlay, { opacity: 1 })
  tl.to(curtain, { opacity: 1, duration: dur * 0.3, ease: 'power2.in' })
  // Hold on black
  tl.call(() => snapCamera(worldEl, to))
  tl.to({}, { duration: dur * 0.2 }) // pause on black
  tl.to(curtain, { opacity: 0, duration: dur * 0.3, ease: 'power2.out' })

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── spotlight ───────────────────────────────────────────── */

registerTransition('spotlight', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  // Dark overlay with a circular "spotlight" cut-out via radial-gradient
  const dark = document.createElement('div')
  dark.style.cssText =
    'position:absolute;inset:0;z-index:10;' +
    'background:radial-gradient(circle 60px at 20% 30%, transparent 0%, rgba(0,0,0,0.95) 60px);'
  overlay.appendChild(dark)

  tl.set(overlay, { opacity: 1 })

  // Spotlight searches around
  tl.to(dark, {
    background: 'radial-gradient(circle 60px at 70% 60%, transparent 0%, rgba(0,0,0,0.95) 60px)',
    duration: dur * 0.2,
    ease: 'power1.inOut',
  })
  tl.to(dark, {
    background: 'radial-gradient(circle 60px at 30% 70%, transparent 0%, rgba(0,0,0,0.95) 60px)',
    duration: dur * 0.15,
    ease: 'power1.inOut',
  })
  tl.to(dark, {
    background: 'radial-gradient(circle 60px at 50% 50%, transparent 0%, rgba(0,0,0,0.95) 60px)',
    duration: dur * 0.1,
    ease: 'power1.inOut',
  })

  tl.call(() => snapCamera(worldEl, to))

  // Spotlight expands to reveal
  tl.to(dark, {
    background: 'radial-gradient(circle 2000px at 50% 50%, transparent 0%, rgba(0,0,0,0.95) 2000px)',
    duration: dur * 0.35,
    ease: 'expo.out',
  })

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── tv-flip ─────────────────────────────────────────────── */

registerTransition('tv-flip', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  tl.set(overlay, { opacity: 1 })

  // Static noise (grid of random bright/dark pixels via a repeating gradient)
  const staticNoise = document.createElement('div')
  staticNoise.style.cssText =
    'position:absolute;inset:0;z-index:10;opacity:0;' +
    'background:repeating-conic-gradient(#333 0% 25%, #888 0% 50%) 0 0 / 4px 4px;' +
    'mix-blend-mode:screen;'
  overlay.appendChild(staticNoise)

  // Flash element
  const flash = document.createElement('div')
  flash.style.cssText = 'position:absolute;inset:0;background:#fff;opacity:0;z-index:12;'
  overlay.appendChild(flash)

  // Horizontal line (CRT turn-off effect)
  const line = document.createElement('div')
  line.style.cssText =
    'position:absolute;top:50%;left:0;width:100%;height:100%;' +
    'background:#fff;z-index:11;transform-origin:center center;opacity:0;'
  overlay.appendChild(line)

  // Static appears
  tl.to(staticNoise, { opacity: 1, duration: dur * 0.1, ease: 'none' })

  // CRT collapse: height shrinks to a line
  tl.set(line, { opacity: 1, height: '100%', top: '0%' })
  tl.to(line, {
    height: '3px',
    top: '50%',
    duration: dur * 0.15,
    ease: 'power4.in',
  })

  // Quick flash
  tl.to(flash, { opacity: 1, duration: dur * 0.04, ease: 'expo.in' })

  tl.call(() => snapCamera(worldEl, to))

  // Flash fades, line expands back, static clears
  tl.to(flash, { opacity: 0, duration: dur * 0.08 })
  tl.to(
    line,
    {
      height: '100%',
      top: '0%',
      opacity: 0,
      duration: dur * 0.2,
      ease: 'power4.out',
    },
    '<',
  )
  tl.to(staticNoise, { opacity: 0, duration: dur * 0.15 }, '<+=0.05')

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── iris ────────────────────────────────────────────────── */

registerTransition('iris', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  // Circular iris wipe using clip-path on a solid overlay
  const iris = document.createElement('div')
  iris.style.cssText =
    'position:absolute;inset:0;background:#000;z-index:10;' +
    'clip-path:circle(150% at 50% 50%);'
  overlay.appendChild(iris)

  tl.set(overlay, { opacity: 1 })

  // Iris closes
  tl.to(iris, {
    clipPath: 'circle(0% at 50% 50%)',
    duration: dur * 0.4,
    ease: 'power3.inOut',
  })

  tl.call(() => snapCamera(worldEl, to))

  // Iris opens
  tl.to(iris, {
    clipPath: 'circle(150% at 50% 50%)',
    duration: dur * 0.4,
    ease: 'power3.inOut',
  })

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── letterbox ───────────────────────────────────────────── */

registerTransition('letterbox', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  tl.set(overlay, { opacity: 1 })

  // Top bar
  const barTop = document.createElement('div')
  barTop.style.cssText =
    'position:absolute;top:0;left:0;width:100%;height:0;background:#000;z-index:10;'
  overlay.appendChild(barTop)

  // Bottom bar
  const barBottom = document.createElement('div')
  barBottom.style.cssText =
    'position:absolute;bottom:0;left:0;width:100%;height:0;background:#000;z-index:10;'
  overlay.appendChild(barBottom)

  // Bars close from top/bottom to meet in the middle
  tl.to(barTop, { height: '50%', duration: dur * 0.35, ease: 'power3.inOut' })
  tl.to(barBottom, { height: '50%', duration: dur * 0.35, ease: 'power3.inOut' }, '<')

  tl.call(() => snapCamera(worldEl, to))

  // Small hold
  tl.to({}, { duration: dur * 0.1 })

  // Bars retract
  tl.to(barTop, { height: '0%', duration: dur * 0.35, ease: 'power3.inOut' })
  tl.to(barBottom, { height: '0%', duration: dur * 0.35, ease: 'power3.inOut' }, '<')

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})
