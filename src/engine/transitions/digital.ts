import gsap from 'gsap'
import { registerTransition, posToCamera } from '../TransitionManager'
import type { SlidePosition } from '../../slides/types'

/* ── helpers ──────────────────────────────────────────────── */

function snapCamera(worldEl: HTMLElement, to: SlidePosition) {
  gsap.set(worldEl, posToCamera(to))
}

function rnd(min: number, max: number) {
  return gsap.utils.random(min, max)
}

/* ── glitch ──────────────────────────────────────────────── */

registerTransition('glitch', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  tl.set(overlay, { opacity: 1 })

  // RGB split layers
  const redShift = document.createElement('div')
  redShift.style.cssText =
    'position:absolute;inset:0;background:rgba(255,0,0,0.15);z-index:10;mix-blend-mode:screen;'
  const blueShift = document.createElement('div')
  blueShift.style.cssText =
    'position:absolute;inset:0;background:rgba(0,0,255,0.15);z-index:10;mix-blend-mode:screen;'
  overlay.appendChild(redShift)
  overlay.appendChild(blueShift)

  // Scanlines
  const scanlines = document.createElement('div')
  scanlines.style.cssText =
    'position:absolute;inset:0;z-index:11;opacity:0;' +
    'background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px);'
  overlay.appendChild(scanlines)

  // Glitch slice containers
  const SLICE_COUNT = 6
  const slices: HTMLDivElement[] = []
  for (let i = 0; i < SLICE_COUNT; i++) {
    const slice = document.createElement('div')
    const h = 100 / SLICE_COUNT
    slice.style.cssText =
      `position:absolute;top:${i * h}%;left:0;width:100%;height:${h}%;` +
      'z-index:12;background:transparent;'
    overlay.appendChild(slice)
    slices.push(slice)
  }

  // Phase 1: glitch onset
  tl.to(scanlines, { opacity: 1, duration: dur * 0.05, ease: 'none' })
  tl.to(redShift, { x: -8, duration: dur * 0.05, ease: 'none' })
  tl.to(blueShift, { x: 8, duration: dur * 0.05, ease: 'none' }, '<')

  // Random skew/offset glitch pulses
  for (let pulse = 0; pulse < 4; pulse++) {
    slices.forEach((slice) => {
      tl.to(
        slice,
        {
          x: rnd(-40, 40),
          skewX: rnd(-5, 5),
          duration: dur * 0.04,
          ease: 'none',
        },
        `>-=${dur * 0.02}`,
      )
    })
    // Reset between pulses
    tl.to(
      slices,
      { x: 0, skewX: 0, duration: dur * 0.02, ease: 'none' },
    )
  }

  // Big glitch at midpoint
  tl.to(redShift, { x: -20, y: 5, duration: dur * 0.03, ease: 'none' })
  tl.to(blueShift, { x: 20, y: -5, duration: dur * 0.03, ease: 'none' }, '<')

  tl.call(() => snapCamera(worldEl, to))

  // Phase 2: recovery
  tl.to(redShift, { x: -4, y: 0, duration: dur * 0.08, ease: 'power2.out' })
  tl.to(blueShift, { x: 4, y: 0, duration: dur * 0.08, ease: 'power2.out' }, '<')

  // Final cleanup pulses
  tl.to(redShift, { x: 0, duration: dur * 0.1, ease: 'power2.out' })
  tl.to(blueShift, { x: 0, duration: dur * 0.1, ease: 'power2.out' }, '<')
  tl.to(scanlines, { opacity: 0, duration: dur * 0.1, ease: 'power2.out' }, '<')

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── pixel-dissolve ──────────────────────────────────────── */

registerTransition('pixel-dissolve', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  // Pixelation effect via backdrop-filter blur
  const pixel = document.createElement('div')
  pixel.style.cssText =
    'position:absolute;inset:0;z-index:10;backdrop-filter:blur(0px);-webkit-backdrop-filter:blur(0px);'
  overlay.appendChild(pixel)

  tl.set(overlay, { opacity: 1 })

  // Blur in (pixelate)
  tl.to(pixel, {
    backdropFilter: 'blur(30px)',
    webkitBackdropFilter: 'blur(30px)',
    duration: dur * 0.4,
    ease: 'power2.in',
  })

  tl.call(() => snapCamera(worldEl, to))

  // Blur out (resolve)
  tl.to(pixel, {
    backdropFilter: 'blur(0px)',
    webkitBackdropFilter: 'blur(0px)',
    duration: dur * 0.4,
    ease: 'power2.out',
  })

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── matrix ──────────────────────────────────────────────── */

registerTransition('matrix', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  tl.set(overlay, { opacity: 1 })

  // Matrix-style rain container
  const container = document.createElement('div')
  container.style.cssText =
    'position:absolute;inset:0;z-index:10;overflow:hidden;background:rgba(0,0,0,0.85);'
  overlay.appendChild(container)

  // Emoji set for "matrix rain"
  const emojiChars = config.emoji
    ? [config.emoji]
    : ['0', '1', '/', '\\', '{', '}', '<', '>', '=', '+', '*', '#']
  const COL_COUNT = 30

  const columns: HTMLDivElement[] = []
  for (let c = 0; c < COL_COUNT; c++) {
    const col = document.createElement('div')
    const leftPct = (c / COL_COUNT) * 100
    col.style.cssText =
      `position:absolute;top:-100%;left:${leftPct}%;width:${100 / COL_COUNT}%;` +
      'font-family:monospace;font-size:1rem;line-height:1.2;' +
      'color:var(--neon-green,#0f0);text-align:center;z-index:11;opacity:0.8;' +
      'text-shadow:0 0 8px var(--neon-green,#0f0);'

    // Fill column with random characters
    const charCount = 20
    let text = ''
    for (let i = 0; i < charCount; i++) {
      text += emojiChars[Math.floor(rnd(0, emojiChars.length))] + '\n'
    }
    col.textContent = text
    container.appendChild(col)
    columns.push(col)
  }

  // Rain down columns with staggered start
  columns.forEach((col, _i) => {
    const delay = rnd(0, dur * 0.2)
    tl.to(
      col,
      {
        top: '110%',
        duration: dur * 0.5,
        ease: 'none',
      },
      delay,
    )
  })

  // Snap camera at ~40% through
  tl.call(() => snapCamera(worldEl, to), [], dur * 0.4)

  // Fade out the matrix
  tl.to(container, {
    opacity: 0,
    duration: dur * 0.25,
    ease: 'power2.in',
  })

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── loading-bar ─────────────────────────────────────────── */

registerTransition('loading-bar', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  tl.set(overlay, { opacity: 1 })

  // Dark background
  const bg = document.createElement('div')
  bg.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.9);z-index:10;'
  overlay.appendChild(bg)

  // Loading text
  const label = document.createElement('div')
  label.textContent = 'LOADING...'
  label.style.cssText =
    'position:absolute;top:42%;left:50%;transform:translateX(-50%);' +
    'font-family:monospace;font-size:1.2rem;color:var(--text,#fff);z-index:12;' +
    'letter-spacing:0.3em;text-transform:uppercase;opacity:0;'
  overlay.appendChild(label)

  // Bar track
  const track = document.createElement('div')
  track.style.cssText =
    'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
    'width:60%;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;z-index:12;overflow:hidden;'
  overlay.appendChild(track)

  // Bar fill
  const fill = document.createElement('div')
  fill.style.cssText =
    'width:0%;height:100%;border-radius:3px;' +
    'background:linear-gradient(90deg,var(--neon-pink,#f0f),var(--neon-purple,#a855f7),var(--neon-blue,#00bfff));' +
    'box-shadow:0 0 15px var(--neon-pink,#f0f),0 0 30px var(--neon-purple,#a855f7);'
  track.appendChild(fill)

  // Percentage text
  const pct = document.createElement('div')
  pct.textContent = '0%'
  pct.style.cssText =
    'position:absolute;top:55%;left:50%;transform:translateX(-50%);' +
    'font-family:monospace;font-size:0.9rem;color:var(--text-muted,#999);z-index:12;opacity:0;'
  overlay.appendChild(pct)

  tl.to(label, { opacity: 1, duration: dur * 0.08 })
  tl.to(pct, { opacity: 1, duration: dur * 0.05 }, '<')

  // Animate the bar with steps
  const steps = [
    { w: '23%', t: '23%', d: dur * 0.12 },
    { w: '47%', t: '47%', d: dur * 0.1 },
    { w: '52%', t: '52%', d: dur * 0.08 }, // stall
    { w: '78%', t: '78%', d: dur * 0.12 },
    { w: '93%', t: '93%', d: dur * 0.08 },
    { w: '100%', t: '100%', d: dur * 0.06 },
  ]

  steps.forEach(({ w, t, d }) => {
    tl.to(fill, { width: w, duration: d, ease: 'power1.inOut' })
    tl.call(() => { pct.textContent = t })
  })

  tl.call(() => snapCamera(worldEl, to))

  // Flash and reveal
  const flash = document.createElement('div')
  flash.style.cssText = 'position:absolute;inset:0;background:#fff;opacity:0;z-index:14;'
  overlay.appendChild(flash)

  tl.to(flash, { opacity: 1, duration: dur * 0.04, ease: 'expo.in' })
  tl.to(flash, { opacity: 0, duration: dur * 0.15, ease: 'power2.out' })
  tl.to(bg, { opacity: 0, duration: dur * 0.1 }, '<')

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── scan-line ───────────────────────────────────────────── */

registerTransition('scan-line', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  tl.set(overlay, { opacity: 1 })

  // Bright horizontal line
  const line = document.createElement('div')
  line.style.cssText =
    'position:absolute;top:-5px;left:0;width:100%;height:5px;z-index:10;' +
    'background:var(--neon-blue,#00bfff);' +
    'box-shadow:0 0 20px var(--neon-blue,#00bfff),0 0 60px var(--neon-blue,#00bfff),0 0 100px rgba(0,191,255,0.3);'
  overlay.appendChild(line)

  // Faint glow trail behind the line
  const trail = document.createElement('div')
  trail.style.cssText =
    'position:absolute;top:-5px;left:0;width:100%;height:80px;z-index:9;opacity:0.4;' +
    'background:linear-gradient(180deg,var(--neon-blue,#00bfff) 0%,transparent 100%);'
  overlay.appendChild(trail)

  // Sweep down
  tl.to(line, { top: '105%', duration: dur * 0.45, ease: 'power1.inOut' })
  tl.to(trail, { top: '105%', duration: dur * 0.45, ease: 'power1.inOut' }, '<')

  tl.call(() => snapCamera(worldEl, to), [], dur * 0.45)

  // Sweep back up
  tl.to(line, { top: '-5px', duration: dur * 0.45, ease: 'power1.inOut' })
  tl.to(trail, { top: '-80px', duration: dur * 0.45, ease: 'power1.inOut' }, '<')

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})

/* ── terminal ────────────────────────────────────────────── */

registerTransition('terminal', (worldEl, _from, to, overlay, config) => {
  const tl = gsap.timeline()
  const dur = config.duration

  tl.set(overlay, { opacity: 1 })

  // Terminal background
  const terminal = document.createElement('div')
  terminal.style.cssText =
    'position:absolute;inset:0;background:rgba(0,0,0,0.95);z-index:10;padding:2rem;' +
    'font-family:monospace;font-size:1rem;color:var(--neon-green,#0f0);overflow:hidden;' +
    'display:flex;flex-direction:column;gap:0.3rem;'
  overlay.appendChild(terminal)

  const lines = [
    '> initializing transition...',
    '> loading slide assets...',
    '> rendering viewport... [OK]',
    '> applying transforms...',
    '> transition complete.',
    '',
  ]

  const lineEls: HTMLDivElement[] = []
  lines.forEach((text) => {
    const lineEl = document.createElement('div')
    lineEl.style.cssText = 'opacity:0;white-space:nowrap;'
    lineEl.textContent = text
    terminal.appendChild(lineEl)
    lineEls.push(lineEl)
  })

  // Cursor blink
  const cursor = document.createElement('span')
  cursor.textContent = '_'
  cursor.style.cssText = 'animation:none;'
  const lastLine = lineEls[lineEls.length - 1]
  lastLine.appendChild(cursor)

  // Type out each line sequentially
  const lineDelay = (dur * 0.6) / lines.length
  lineEls.forEach((el, i) => {
    tl.to(el, { opacity: 1, duration: 0.01 }, i * lineDelay)
  })

  // Cursor blink effect
  tl.to(cursor, {
    opacity: 0,
    duration: 0.3,
    repeat: 3,
    yoyo: true,
    ease: 'steps(1)',
  })

  tl.call(() => snapCamera(worldEl, to))

  // Terminal fades out
  tl.to(terminal, { opacity: 0, duration: dur * 0.2, ease: 'power2.in' })

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
})
