import gsap from 'gsap'
import { registerTransition, posToCamera } from '../TransitionManager'
import type { SlidePosition, TransitionConfig } from '../../slides/types'

/* ── helpers ──────────────────────────────────────────────── */

function snap(worldEl: HTMLElement, to: SlidePosition) {
  gsap.set(worldEl, posToCamera(to))
}

function rnd(min: number, max: number) {
  return gsap.utils.random(min, max)
}

/* ── shared createEmojiSplit ──────────────────────────────── */

function createEmojiSplit(
  worldEl: HTMLElement,
  toPos: SlidePosition,
  overlay: HTMLElement,
  config: TransitionConfig,
  effectHtml: string,
): gsap.core.Timeline {
  const tl = gsap.timeline()
  const dur = config.duration
  const emoji = config.emoji ?? '🔪'

  tl.set(overlay, { opacity: 1 })

  // two halves — left and right — each showing one half of the emoji
  const halfLeft = document.createElement('div')
  halfLeft.style.cssText =
    'position:absolute;top:0;left:0;width:50%;height:100%;overflow:hidden;z-index:10;' +
    'background:var(--bg,#0a0a0a);'
  const emojiLeft = document.createElement('div')
  emojiLeft.textContent = emoji
  emojiLeft.style.cssText =
    'position:absolute;top:50%;left:100%;transform:translate(-50%,-50%);font-size:40vmin;'
  halfLeft.appendChild(emojiLeft)

  const halfRight = document.createElement('div')
  halfRight.style.cssText =
    'position:absolute;top:0;right:0;width:50%;height:100%;overflow:hidden;z-index:10;' +
    'background:var(--bg,#0a0a0a);'
  const emojiRight = document.createElement('div')
  emojiRight.textContent = emoji
  emojiRight.style.cssText =
    'position:absolute;top:50%;right:100%;transform:translate(50%,-50%);font-size:40vmin;'
  halfRight.appendChild(emojiRight)

  overlay.appendChild(halfLeft)
  overlay.appendChild(halfRight)

  // inject effect HTML between halves
  if (effectHtml) {
    const effectContainer = document.createElement('div')
    effectContainer.innerHTML = effectHtml
    effectContainer.style.cssText = 'position:absolute;inset:0;z-index:11;pointer-events:none;'
    overlay.appendChild(effectContainer)
  }

  // brief pause showing the full emoji
  tl.from([halfLeft, halfRight], { opacity: 0, duration: dur * 0.1, ease: 'power1.in' })

  // flash at split moment
  const flash = document.createElement('div')
  flash.style.cssText =
    'position:absolute;top:0;left:48%;width:4%;height:100%;z-index:12;opacity:0;' +
    'background:linear-gradient(90deg,transparent,#fff,transparent);'
  overlay.appendChild(flash)
  tl.to(flash, { opacity: 1, duration: dur * 0.04, ease: 'expo.in' })

  // snap camera
  tl.call(() => snap(worldEl, toPos))

  // slide halves apart
  tl.to(halfLeft, { x: '-105%', duration: dur * 0.35, ease: 'power3.inOut' })
  tl.to(halfRight, { x: '105%', duration: dur * 0.35, ease: 'power3.inOut' }, '<')
  tl.to(flash, { opacity: 0, duration: dur * 0.15 }, '<')

  tl.call(() => {
    overlay.innerHTML = ''
    gsap.set(overlay, { opacity: 0 })
  })

  return tl
}

/* ── emoji-split (clean vertical) ─────────────────────────── */

registerTransition(
  'emoji-split',
  (worldEl, _from, to, overlay, config) => {
    return createEmojiSplit(worldEl, to, overlay, config, '')
  },
)

/* ── split-blood ──────────────────────────────────────────── */

registerTransition(
  'split-blood',
  (worldEl, _from, to, overlay, config) => {
    // blood drip HTML
    let drips = ''
    for (let i = 0; i < 12; i++) {
      const h = gsap.utils.random(30, 120)
      const top = gsap.utils.random(5, 85)
      const delay = gsap.utils.random(0, 0.3)
      drips +=
        `<div style="position:absolute;top:${top}%;left:calc(50% - 3px);width:6px;height:0px;` +
        `background:linear-gradient(180deg,var(--neon-red,#f44),#8b0000);border-radius:0 0 3px 3px;` +
        `animation:none;z-index:12;" data-drip-h="${h}" data-drip-delay="${delay}"></div>`
    }

    const tl = createEmojiSplit(worldEl, to, overlay, { ...config, emoji: config.emoji ?? '🔪' }, drips)

    // animate drips after split opens
    const dripEls = overlay.querySelectorAll<HTMLElement>('[data-drip-h]')
    dripEls.forEach((el) => {
      const h = Number(el.dataset.dripH)
      const delay = Number(el.dataset.dripDelay)
      tl.to(
        el,
        { height: h, duration: config.duration * 0.3, ease: 'power2.in' },
        delay + config.duration * 0.15,
      )
    })

    return tl
  },
)

/* ── split-electric ───────────────────────────────────────── */

registerTransition(
  'split-electric',
  (worldEl, _from, to, overlay, config) => {
    const arcSvg =
      '<svg style="position:absolute;top:0;left:calc(50% - 30px);width:60px;height:100%;" viewBox="0 0 60 100" preserveAspectRatio="none">' +
      '<path d="M30 0 L25 10 L40 20 L20 30 L35 40 L22 50 L38 60 L25 70 L32 80 L28 90 L30 100" ' +
      'stroke="var(--neon-blue,#00bfff)" stroke-width="2" fill="none" ' +
      'filter="drop-shadow(0 0 8px var(--neon-blue,#00bfff)) drop-shadow(0 0 20px var(--neon-blue,#00bfff))"/>' +
      '</svg>'

    return createEmojiSplit(worldEl, to, overlay, { ...config, emoji: config.emoji ?? '⚡' }, arcSvg)
  },
)

/* ── split-lava ───────────────────────────────────────────── */

registerTransition(
  'split-lava',
  (worldEl, _from, to, overlay, config) => {
    let lavaHtml =
      '<div style="position:absolute;top:0;left:calc(50% - 4px);width:8px;height:100%;' +
      'background:linear-gradient(180deg,#ff4500,#ff8c00,#ff4500);z-index:12;' +
      'box-shadow:0 0 20px #ff4500,0 0 40px #ff8c00,0 0 60px #ff4500;"></div>'

    // lava drips
    for (let i = 0; i < 8; i++) {
      const top = gsap.utils.random(10, 85)
      const size = gsap.utils.random(6, 14)
      const xOff = gsap.utils.random(-20, 20)
      lavaHtml +=
        `<div style="position:absolute;top:${top}%;left:calc(50% + ${xOff}px);` +
        `width:${size}px;height:${size * 1.5}px;border-radius:50%;z-index:12;opacity:0.9;` +
        `background:radial-gradient(circle,#ffcc00,#ff4500);` +
        `box-shadow:0 0 ${size}px #ff4500;"></div>`
    }

    return createEmojiSplit(worldEl, to, overlay, { ...config, emoji: config.emoji ?? '🌋' }, lavaHtml)
  },
)

/* ── split-confetti ───────────────────────────────────────── */

registerTransition(
  'split-confetti',
  (worldEl, _from, to, overlay, config) => {
    const tl = createEmojiSplit(worldEl, to, overlay, { ...config, emoji: config.emoji ?? '🎉' }, '')
    const dur = config.duration

    // confetti burst from center after split
    const CONFETTI = 50
    const colors = [
      'var(--neon-pink,#f0f)',
      'var(--neon-blue,#00bfff)',
      'var(--neon-purple,#a855f7)',
      '#ffcc00',
      '#00ff88',
      'var(--neon-red,#f44)',
    ]
    for (let i = 0; i < CONFETTI; i++) {
      const c = document.createElement('div')
      const w = rnd(4, 12)
      const h = rnd(4, 14)
      c.style.cssText =
        `position:absolute;top:50%;left:50%;width:${w}px;height:${h}px;` +
        `background:${colors[Math.floor(rnd(0, colors.length))]};` +
        `border-radius:${rnd(0, 50)}%;z-index:15;opacity:1;`
      overlay.appendChild(c)
      tl.fromTo(
        c,
        { x: 0, y: 0, rotation: 0 },
        {
          x: rnd(-600, 600),
          y: rnd(-600, 600),
          rotation: rnd(-720, 720),
          opacity: 0,
          duration: dur * 0.4,
          ease: 'expo.out',
        },
        dur * 0.2,
      )
    }

    return tl
  },
)

/* ── emoji-portal ─────────────────────────────────────────── */

registerTransition(
  'emoji-portal',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration
    const emoji = config.emoji ?? '🌀'

    tl.set(overlay, { opacity: 1 })

    // portal emoji in center
    const portal = document.createElement('div')
    portal.textContent = emoji
    portal.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);' +
      'font-size:6rem;z-index:10;'
    overlay.appendChild(portal)

    // background fill behind the portal
    const fill = document.createElement('div')
    fill.style.cssText =
      'position:absolute;top:50%;left:50%;width:0;height:0;border-radius:50%;z-index:9;' +
      'transform:translate(-50%,-50%);' +
      'background:radial-gradient(circle,var(--neon-purple,#a855f7),var(--bg,#0a0a0a));'
    overlay.appendChild(fill)

    // grow portal emoji
    tl.to(portal, {
      scale: 1,
      rotation: 180,
      duration: dur * 0.2,
      ease: 'back.out(2)',
    })

    // spin and grow to fill screen
    tl.to(portal, {
      scale: 20,
      rotation: 720,
      opacity: 0.3,
      duration: dur * 0.3,
      ease: 'expo.in',
    })
    tl.to(
      fill,
      {
        width: '300vmax',
        height: '300vmax',
        duration: dur * 0.3,
        ease: 'expo.in',
      },
      '<',
    )

    // snap camera
    tl.call(() => snap(worldEl, to))

    // reverse — shrink fill away to reveal new slide
    tl.to(fill, {
      width: 0,
      height: 0,
      opacity: 0,
      duration: dur * 0.25,
      ease: 'expo.out',
    })
    tl.to(portal, { opacity: 0, duration: dur * 0.1 }, '<')

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)

/* ── emoji-pop ────────────────────────────────────────────── */

registerTransition(
  'emoji-pop',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration
    const emoji = config.emoji ?? '🎈'

    tl.set(overlay, { opacity: 1 })

    // balloon
    const balloon = document.createElement('div')
    balloon.textContent = emoji
    balloon.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
      'font-size:4rem;z-index:10;'
    overlay.appendChild(balloon)

    // inflate balloon
    tl.to(balloon, {
      fontSize: '30rem',
      duration: dur * 0.4,
      ease: 'power2.in',
    })

    // wobble near the end
    tl.to(balloon, {
      scaleX: 1.15,
      scaleY: 0.9,
      duration: dur * 0.04,
      repeat: 3,
      yoyo: true,
      ease: 'power1.inOut',
    })

    // POP flash
    const flash = document.createElement('div')
    flash.style.cssText =
      'position:absolute;inset:0;background:var(--neon-pink,#f0f);opacity:0;z-index:12;' +
      'mix-blend-mode:screen;'
    overlay.appendChild(flash)

    tl.set(balloon, { display: 'none' })
    tl.to(flash, { opacity: 1, duration: dur * 0.03, ease: 'expo.in' })

    // snap camera
    tl.call(() => snap(worldEl, to))

    // confetti burst
    const CONFETTI = 40
    const colors = [
      'var(--neon-pink,#f0f)',
      'var(--neon-blue,#00bfff)',
      'var(--neon-purple,#a855f7)',
      '#ffcc00',
      '#00ff88',
    ]
    for (let i = 0; i < CONFETTI; i++) {
      const c = document.createElement('div')
      const w = rnd(5, 14)
      const h = rnd(5, 16)
      c.style.cssText =
        `position:absolute;top:50%;left:50%;width:${w}px;height:${h}px;` +
        `background:${colors[Math.floor(rnd(0, colors.length))]};` +
        `border-radius:${rnd(0, 50)}%;z-index:13;`
      overlay.appendChild(c)
      tl.fromTo(
        c,
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        {
          x: rnd(-500, 500),
          y: rnd(-500, 500),
          rotation: rnd(-540, 540),
          opacity: 0,
          duration: dur * 0.35,
          ease: 'expo.out',
        },
        '<',
      )
    }

    // string remnant
    const remnant = document.createElement('div')
    remnant.textContent = '🧵'
    remnant.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
      'font-size:2rem;z-index:11;opacity:1;'
    overlay.appendChild(remnant)
    tl.to(remnant, { y: 400, opacity: 0, duration: dur * 0.25, ease: 'power2.in' }, '<')

    tl.to(flash, { opacity: 0, duration: dur * 0.2, ease: 'power2.out' }, '-=0.15')

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)
