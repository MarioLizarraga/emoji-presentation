import gsap from 'gsap'
import { registerTransition } from '../TransitionManager'
import type { SlidePosition } from '../../slides/types'

/* ── helpers ──────────────────────────────────────────────── */

function snap(
  worldEl: HTMLElement,
  to: SlidePosition,
) {
  gsap.set(worldEl, {
    x: -to.x * to.scale,
    y: -to.y * to.scale,
    scale: to.scale,
    rotation: -to.rotation,
  })
}

function rnd(min: number, max: number) {
  return gsap.utils.random(min, max)
}

/* ── emoji-bomb ───────────────────────────────────────────── */

registerTransition(
  'emoji-bomb',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration
    const emoji = config.emoji ?? '💣'

    tl.set(overlay, { opacity: 1 })

    // bomb element
    const bomb = document.createElement('div')
    bomb.textContent = emoji
    bomb.style.cssText =
      'position:absolute;top:-20%;left:50%;transform:translateX(-50%);font-size:8rem;z-index:10;'
    overlay.appendChild(bomb)

    // fuse spark
    const spark = document.createElement('div')
    spark.style.cssText =
      'position:absolute;top:-20%;left:calc(50% + 2rem);width:12px;height:12px;' +
      'border-radius:50%;background:var(--neon-red,#f44);box-shadow:0 0 12px var(--neon-red,#f44);z-index:11;'
    overlay.appendChild(spark)

    // drop bomb with bounce
    tl.to(bomb, {
      top: '45%',
      duration: dur * 0.3,
      ease: 'bounce.out',
    })
    tl.to(
      spark,
      {
        top: '42%',
        duration: dur * 0.3,
        ease: 'bounce.out',
      },
      '<',
    )

    // fuse pulsing
    tl.to(spark, {
      scale: 1.8,
      opacity: 0.5,
      duration: dur * 0.08,
      repeat: 3,
      yoyo: true,
      ease: 'power1.inOut',
    })

    // BOOM flash
    const flash = document.createElement('div')
    flash.style.cssText =
      'position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,' +
      'var(--neon-red,#f44) 0%,transparent 70%);opacity:0;z-index:12;'
    overlay.appendChild(flash)

    tl.to(flash, { opacity: 1, duration: dur * 0.05, ease: 'expo.in' })
    tl.set(bomb, { display: 'none' })
    tl.set(spark, { display: 'none' })

    // snap camera
    tl.call(() => snap(worldEl, to))

    // debris fragments
    const FRAG_COUNT = 20
    const frags: HTMLDivElement[] = []
    for (let i = 0; i < FRAG_COUNT; i++) {
      const f = document.createElement('div')
      const size = rnd(6, 18)
      f.style.cssText =
        `position:absolute;top:50%;left:50%;width:${size}px;height:${size}px;` +
        `border-radius:${rnd(0, 50)}%;opacity:1;z-index:13;` +
        `background:${['var(--neon-red,#f44)', 'var(--neon-purple,#a855f7)', '#ffa500', '#333'][Math.floor(rnd(0, 4))]};`
      overlay.appendChild(f)
      frags.push(f)
    }

    frags.forEach((f) => {
      tl.to(
        f,
        {
          x: rnd(-500, 500),
          y: rnd(-500, 500),
          rotation: rnd(-720, 720),
          opacity: 0,
          duration: dur * 0.35,
          ease: 'expo.out',
        },
        '<',
      )
    })

    // flash fade + smoke clear
    tl.to(flash, { opacity: 0, duration: dur * 0.2, ease: 'power2.out' }, `-=${dur * 0.15}`)

    // cleanup
    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)

/* ── emoji-slash ──────────────────────────────────────────── */

registerTransition(
  'emoji-slash',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration
    const emoji = config.emoji ?? '⚔️'

    tl.set(overlay, { opacity: 1 })

    // katana
    const katana = document.createElement('div')
    katana.textContent = emoji
    katana.style.cssText =
      'position:absolute;top:40%;right:-20%;font-size:10rem;z-index:10;transform:rotate(-30deg);'
    overlay.appendChild(katana)

    // speed lines
    const lineContainer = document.createElement('div')
    lineContainer.style.cssText = 'position:absolute;inset:0;overflow:hidden;z-index:9;opacity:0;'
    for (let i = 0; i < 8; i++) {
      const line = document.createElement('div')
      const top = 15 + i * 10
      line.style.cssText =
        `position:absolute;top:${top}%;left:0;width:100%;height:2px;` +
        'background:linear-gradient(90deg,transparent,var(--neon-pink,#f0f) 40%,transparent);'
      lineContainer.appendChild(line)
    }
    overlay.appendChild(lineContainer)

    // slash across screen
    tl.to(katana, {
      right: '120%',
      rotation: -15,
      duration: dur * 0.25,
      ease: 'power4.in',
    })
    tl.to(lineContainer, { opacity: 1, duration: dur * 0.08 }, '<')
    tl.to(lineContainer, { opacity: 0, duration: dur * 0.08 }, `-=${dur * 0.05}`)

    // flash
    const flash = document.createElement('div')
    flash.style.cssText = 'position:absolute;inset:0;background:#fff;opacity:0;z-index:14;'
    overlay.appendChild(flash)
    tl.to(flash, { opacity: 1, duration: dur * 0.04, ease: 'expo.in' })

    // snap camera
    tl.call(() => snap(worldEl, to))

    // slide split — two halves falling apart
    const topHalf = document.createElement('div')
    topHalf.style.cssText =
      'position:absolute;top:0;left:0;width:100%;height:50%;' +
      'background:var(--bg,#0a0a0a);z-index:13;'
    const bottomHalf = document.createElement('div')
    bottomHalf.style.cssText =
      'position:absolute;bottom:0;left:0;width:100%;height:50%;' +
      'background:var(--bg,#0a0a0a);z-index:13;'
    overlay.appendChild(topHalf)
    overlay.appendChild(bottomHalf)

    tl.to(flash, { opacity: 0, duration: dur * 0.1 })
    tl.to(topHalf, { y: '-110%', rotation: -3, duration: dur * 0.35, ease: 'power2.in' }, '<')
    tl.to(bottomHalf, { y: '110%', rotation: 3, duration: dur * 0.35, ease: 'power2.in' }, '<')

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)

/* ── emoji-magic ──────────────────────────────────────────── */

registerTransition(
  'emoji-magic',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration
    const emoji = config.emoji ?? '🪄'

    tl.set(overlay, { opacity: 1 })

    // wand
    const wand = document.createElement('div')
    wand.textContent = emoji
    wand.style.cssText =
      'position:absolute;top:50%;left:-15%;font-size:6rem;z-index:10;transform:rotate(-20deg);'
    overlay.appendChild(wand)

    // sparkle trail container
    const SPARKLE_COUNT = 40
    const sparkles: HTMLDivElement[] = []
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const s = document.createElement('div')
      s.textContent = '✨'
      s.style.cssText =
        `position:absolute;top:${50 + rnd(-15, 15)}%;left:-5%;font-size:${rnd(0.8, 2.4)}rem;` +
        'opacity:0;z-index:9;'
      overlay.appendChild(s)
      sparkles.push(s)
    }

    // sweep wand across the screen
    tl.to(wand, {
      left: '110%',
      rotation: 10,
      duration: dur * 0.5,
      ease: 'power2.inOut',
    })

    // sparkle trail follows wand
    sparkles.forEach((s, i) => {
      const delay = (i / SPARKLE_COUNT) * dur * 0.45
      tl.to(
        s,
        {
          left: `${(i / SPARKLE_COUNT) * 100}%`,
          opacity: 1,
          duration: dur * 0.05,
          ease: 'power1.out',
        },
        delay,
      )
      tl.to(
        s,
        {
          opacity: 0,
          y: rnd(-40, 40),
          duration: dur * 0.2,
          ease: 'power2.out',
        },
        delay + dur * 0.1,
      )
    })

    // snap camera at midpoint
    tl.call(() => snap(worldEl, to), [], dur * 0.5)

    // final shimmer
    const shimmer = document.createElement('div')
    shimmer.style.cssText =
      'position:absolute;inset:0;' +
      'background:radial-gradient(ellipse at 50% 50%,var(--neon-purple,#a855f7) 0%,transparent 60%);' +
      'opacity:0;z-index:8;'
    overlay.appendChild(shimmer)
    tl.to(shimmer, { opacity: 0.5, duration: dur * 0.1 }, dur * 0.48)
    tl.to(shimmer, { opacity: 0, duration: dur * 0.25 })

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)

/* ── emoji-snapshot ───────────────────────────────────────── */

registerTransition(
  'emoji-snapshot',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration
    const emoji = config.emoji ?? '📷'

    tl.set(overlay, { opacity: 1 })

    // camera emoji
    const cam = document.createElement('div')
    cam.textContent = emoji
    cam.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
      'font-size:10rem;z-index:10;opacity:0;'
    overlay.appendChild(cam)

    tl.to(cam, { opacity: 1, scale: 1.1, duration: dur * 0.15, ease: 'back.out(2)' })
    tl.to(cam, { scale: 0.95, duration: dur * 0.05, ease: 'power2.in' })

    // flash
    const flash = document.createElement('div')
    flash.style.cssText = 'position:absolute;inset:0;background:#fff;opacity:0;z-index:14;'
    overlay.appendChild(flash)

    tl.to(flash, { opacity: 1, duration: dur * 0.04, ease: 'expo.in' })
    tl.set(cam, { display: 'none' })

    // snap camera
    tl.call(() => snap(worldEl, to))

    // polaroid develop effect
    const polaroid = document.createElement('div')
    polaroid.style.cssText =
      'position:absolute;inset:5%;background:#fff;border-radius:4px;z-index:13;' +
      'box-shadow:0 8px 40px rgba(0,0,0,0.5);'
    const inner = document.createElement('div')
    inner.style.cssText =
      'position:absolute;top:5%;left:5%;right:5%;bottom:15%;background:var(--bg,#0a0a0a);opacity:0;'
    polaroid.appendChild(inner)
    overlay.appendChild(polaroid)

    tl.to(flash, { opacity: 0, duration: dur * 0.15 })
    tl.fromTo(
      polaroid,
      { scale: 0.3, rotation: rnd(-5, 5) },
      { scale: 1, rotation: 0, duration: dur * 0.2, ease: 'power2.out' },
      '<',
    )
    tl.to(inner, { opacity: 1, duration: dur * 0.25, ease: 'power1.inOut' })

    // zoom polaroid to fill and fade
    tl.to(polaroid, {
      scale: 1.5,
      opacity: 0,
      duration: dur * 0.15,
      ease: 'power2.in',
    })

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)

/* ── emoji-unlock ─────────────────────────────────────────── */

registerTransition(
  'emoji-unlock',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration

    tl.set(overlay, { opacity: 1 })

    // lock emoji
    const lock = document.createElement('div')
    lock.textContent = '🔒'
    lock.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
      'font-size:10rem;z-index:10;'
    overlay.appendChild(lock)

    // appear
    tl.from(lock, { scale: 0, duration: dur * 0.12, ease: 'back.out(3)' })

    // shake
    tl.to(lock, {
      x: -15,
      duration: dur * 0.03,
      repeat: 7,
      yoyo: true,
      ease: 'power1.inOut',
    })

    // transform to unlocked
    tl.to(lock, { scale: 1.3, duration: dur * 0.08, ease: 'power2.out' })
    tl.call(() => {
      lock.textContent = '🔓'
    })
    tl.to(lock, { scale: 1, duration: dur * 0.06, ease: 'power2.in' })

    // gate halves
    const gateLeft = document.createElement('div')
    gateLeft.style.cssText =
      'position:absolute;top:0;left:0;width:50%;height:100%;' +
      'background:var(--bg,#0a0a0a);z-index:9;border-right:3px solid var(--neon-purple,#a855f7);'
    const gateRight = document.createElement('div')
    gateRight.style.cssText =
      'position:absolute;top:0;right:0;width:50%;height:100%;' +
      'background:var(--bg,#0a0a0a);z-index:9;border-left:3px solid var(--neon-purple,#a855f7);'
    overlay.appendChild(gateLeft)
    overlay.appendChild(gateRight)

    // snap camera
    tl.call(() => snap(worldEl, to))

    // lock flies up
    tl.to(lock, { y: -200, opacity: 0, duration: dur * 0.1, ease: 'power2.in' })

    // gates slide open
    tl.to(gateLeft, { x: '-105%', duration: dur * 0.3, ease: 'power3.inOut' }, '<+=0.05')
    tl.to(gateRight, { x: '105%', duration: dur * 0.3, ease: 'power3.inOut' }, '<')

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)

/* ── emoji-freeze ─────────────────────────────────────────── */

registerTransition(
  'emoji-freeze',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration
    const emoji = config.emoji ?? '🥶'

    tl.set(overlay, { opacity: 1 })

    // frost overlay
    const frost = document.createElement('div')
    frost.style.cssText =
      'position:absolute;inset:0;z-index:9;opacity:0;' +
      'background:radial-gradient(ellipse at 50% 50%,transparent 30%,' +
      'rgba(173,216,230,0.4) 70%,rgba(173,216,230,0.8) 100%);'
    overlay.appendChild(frost)

    // ice border
    const iceBorder = document.createElement('div')
    iceBorder.style.cssText =
      'position:absolute;inset:0;z-index:10;opacity:0;' +
      'border:0px solid rgba(173,216,230,0.8);border-radius:0;' +
      'box-shadow:inset 0 0 0 0 rgba(100,180,220,0.6);'
    overlay.appendChild(iceBorder)

    // emoji in center
    const face = document.createElement('div')
    face.textContent = emoji
    face.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
      'font-size:6rem;z-index:12;opacity:0;'
    overlay.appendChild(face)

    // frost creeps in
    tl.to(frost, { opacity: 1, duration: dur * 0.25, ease: 'power2.inOut' })
    tl.to(
      iceBorder,
      {
        opacity: 1,
        borderWidth: '20px',
        boxShadow: 'inset 0 0 80px 20px rgba(100,180,220,0.6)',
        duration: dur * 0.25,
        ease: 'power2.inOut',
      },
      '<',
    )

    // face appears
    tl.to(face, { opacity: 1, scale: 1.2, duration: dur * 0.1, ease: 'back.out(2)' })

    // crack SVG overlay
    const crack = document.createElement('div')
    crack.innerHTML =
      '<svg viewBox="0 0 100 100" style="width:100%;height:100%;" preserveAspectRatio="none">' +
      '<path d="M50 0 L48 20 L55 35 L45 50 L52 65 L47 80 L50 100" ' +
      'stroke="var(--neon-blue,#00bfff)" stroke-width="0.5" fill="none" opacity="0"/>' +
      '<path d="M0 50 L20 48 L35 55 L50 45 L65 52 L80 47 L100 50" ' +
      'stroke="var(--neon-blue,#00bfff)" stroke-width="0.5" fill="none" opacity="0"/>' +
      '<path d="M50 50 L30 30" stroke="var(--neon-blue,#00bfff)" stroke-width="0.3" fill="none" opacity="0"/>' +
      '<path d="M50 50 L70 30" stroke="var(--neon-blue,#00bfff)" stroke-width="0.3" fill="none" opacity="0"/>' +
      '<path d="M50 50 L30 70" stroke="var(--neon-blue,#00bfff)" stroke-width="0.3" fill="none" opacity="0"/>' +
      '<path d="M50 50 L70 70" stroke="var(--neon-blue,#00bfff)" stroke-width="0.3" fill="none" opacity="0"/>' +
      '</svg>'
    crack.style.cssText = 'position:absolute;inset:0;z-index:13;'
    overlay.appendChild(crack)

    const paths = crack.querySelectorAll('path')
    paths.forEach((p) => {
      tl.to(p, { opacity: 1, strokeWidth: '1', duration: dur * 0.08, ease: 'power2.in' }, `-=${dur * 0.04}`)
    })

    // shatter flash
    const flash = document.createElement('div')
    flash.style.cssText =
      'position:absolute;inset:0;background:var(--neon-blue,#00bfff);opacity:0;z-index:14;'
    overlay.appendChild(flash)
    tl.to(flash, { opacity: 1, duration: dur * 0.04, ease: 'expo.in' })

    // snap camera
    tl.call(() => snap(worldEl, to))

    // shatter pieces
    const SHARD_COUNT = 15
    for (let i = 0; i < SHARD_COUNT; i++) {
      const shard = document.createElement('div')
      const size = rnd(20, 60)
      shard.style.cssText =
        `position:absolute;top:${rnd(10, 90)}%;left:${rnd(10, 90)}%;` +
        `width:${size}px;height:${size * rnd(0.5, 1.5)}px;z-index:15;opacity:0.8;` +
        `background:rgba(173,216,230,${rnd(0.3, 0.7)});` +
        `clip-path:polygon(${rnd(20, 50)}% 0%,100% ${rnd(20, 50)}%,${rnd(50, 80)}% 100%,0% ${rnd(50, 80)}%);`
      overlay.appendChild(shard)
      tl.fromTo(
        shard,
        { scale: 0 },
        {
          scale: 1,
          x: rnd(-300, 300),
          y: rnd(-300, 300),
          rotation: rnd(-180, 180),
          opacity: 0,
          duration: dur * 0.25,
          ease: 'expo.out',
        },
        '<',
      )
    }

    tl.to(flash, { opacity: 0, duration: dur * 0.15 }, `-=${dur * 0.1}`)

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)
