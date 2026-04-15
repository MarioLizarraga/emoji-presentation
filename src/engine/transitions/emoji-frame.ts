import gsap from 'gsap'
import { registerTransition, posToCamera } from '../TransitionManager'
import type { SlidePosition } from '../../slides/types'

/* ── helpers ──────────────────────────────────────────────── */

function snap(worldEl: HTMLElement, to: SlidePosition) {
  gsap.set(worldEl, posToCamera(to))
}

function rnd(min: number, max: number) {
  return gsap.utils.random(min, max)
}

/* ── emoji-tv ─────────────────────────────────────────────── */

registerTransition(
  'emoji-tv',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration

    tl.set(overlay, { opacity: 1 })

    // TV frame
    const tv = document.createElement('div')
    tv.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
      'width:70vmin;height:55vmin;border-radius:12px;z-index:10;' +
      'border:8px solid #333;background:#111;box-shadow:0 0 40px rgba(0,0,0,0.8);' +
      'overflow:hidden;'

    // TV emoji decoration on top
    const tvEmoji = document.createElement('div')
    tvEmoji.textContent = config.emoji ?? '📺'
    tvEmoji.style.cssText =
      'position:absolute;top:-4rem;left:50%;transform:translateX(-50%);font-size:3rem;z-index:12;'
    tv.appendChild(tvEmoji)

    // static noise canvas
    const staticEl = document.createElement('div')
    staticEl.style.cssText =
      'position:absolute;inset:0;z-index:1;opacity:1;' +
      'background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.03) 2px,rgba(255,255,255,0.03) 4px);'

    // scan lines + noise overlay
    const noise = document.createElement('div')
    noise.style.cssText =
      'position:absolute;inset:0;z-index:2;' +
      'background:repeating-linear-gradient(0deg,' +
      'rgba(0,0,0,0) 0px,rgba(0,0,0,0) 1px,rgba(0,0,0,0.3) 1px,rgba(0,0,0,0.3) 2px);'

    // white noise bars
    const noiseBars: HTMLDivElement[] = []
    for (let i = 0; i < 12; i++) {
      const bar = document.createElement('div')
      const top = rnd(0, 100)
      const height = rnd(2, 8)
      bar.style.cssText =
        `position:absolute;top:${top}%;left:0;width:100%;height:${height}%;z-index:3;` +
        `background:rgba(255,255,255,${rnd(0.05, 0.15)});`
      noiseBars.push(bar)
      staticEl.appendChild(bar)
    }

    tv.appendChild(staticEl)
    tv.appendChild(noise)
    overlay.appendChild(tv)

    // TV appears
    tl.from(tv, { scale: 0, rotation: -10, duration: dur * 0.15, ease: 'back.out(2)' })

    // animate noise bars (flickering)
    noiseBars.forEach((bar) => {
      tl.to(
        bar,
        {
          top: `${rnd(0, 100)}%`,
          opacity: rnd(0, 1),
          duration: dur * 0.1,
          repeat: 3,
          ease: 'steps(3)',
        },
        dur * 0.15,
      )
    })

    // "tune in" — static fades
    tl.to(staticEl, { opacity: 0, duration: dur * 0.15, ease: 'power2.inOut' }, dur * 0.35)

    // snap camera
    tl.call(() => snap(worldEl, to), [], dur * 0.4)

    // TV screen shows content (represented by clear inner)
    const screen = document.createElement('div')
    screen.style.cssText = 'position:absolute;inset:0;background:transparent;z-index:0;'
    tv.appendChild(screen)

    // zoom TV to fill viewport
    tl.to(tv, {
      width: '110vw',
      height: '110vh',
      borderWidth: 0,
      borderRadius: 0,
      duration: dur * 0.3,
      ease: 'power3.inOut',
    })
    tl.to(noise, { opacity: 0, duration: dur * 0.15 }, '<')

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)

/* ── emoji-door ───────────────────────────────────────────── */

registerTransition(
  'emoji-door',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration
    const emoji = config.emoji ?? '🚪'

    tl.set(overlay, { opacity: 1 })

    // background wall
    const wall = document.createElement('div')
    wall.style.cssText =
      'position:absolute;inset:0;background:var(--bg,#0a0a0a);z-index:8;'
    overlay.appendChild(wall)

    // door frame
    const doorFrame = document.createElement('div')
    doorFrame.style.cssText =
      'position:absolute;top:10%;left:30%;width:40%;height:80%;z-index:9;' +
      'border:6px solid var(--neon-purple,#a855f7);background:transparent;' +
      'perspective:1200px;overflow:hidden;'
    overlay.appendChild(doorFrame)

    // door panel (will rotate open in 3D)
    const door = document.createElement('div')
    door.style.cssText =
      'position:absolute;inset:0;z-index:10;transform-origin:left center;' +
      'background:var(--bg,#0a0a0a);border:1px solid rgba(168,85,247,0.3);'

    // door emoji + handle
    const doorEmojiEl = document.createElement('div')
    doorEmojiEl.textContent = emoji
    doorEmojiEl.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:6rem;'
    door.appendChild(doorEmojiEl)

    const handle = document.createElement('div')
    handle.style.cssText =
      'position:absolute;top:50%;right:10%;width:14px;height:14px;border-radius:50%;' +
      'background:var(--neon-blue,#00bfff);box-shadow:0 0 10px var(--neon-blue,#00bfff);' +
      'transform:translateY(-50%);'
    door.appendChild(handle)

    doorFrame.appendChild(door)

    // door appears
    tl.from(doorFrame, { scale: 0.3, opacity: 0, duration: dur * 0.15, ease: 'power2.out' })

    // handle jiggles
    tl.to(handle, { rotation: 30, duration: dur * 0.05, repeat: 1, yoyo: true })

    // door opens with 3D rotation
    tl.to(door, {
      rotationY: -110,
      duration: dur * 0.3,
      ease: 'power2.inOut',
    })

    // snap camera behind the door
    tl.call(() => snap(worldEl, to))

    // zoom through the doorway
    tl.to(doorFrame, {
      scale: 5,
      opacity: 0,
      duration: dur * 0.25,
      ease: 'expo.in',
    })
    tl.to(wall, { opacity: 0, duration: dur * 0.2 }, '<')

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)

/* ── emoji-clapper ────────────────────────────────────────── */

registerTransition(
  'emoji-clapper',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration
    const emoji = config.emoji ?? '🎬'

    tl.set(overlay, { opacity: 1 })

    // clapperboard
    const clapper = document.createElement('div')
    clapper.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10;' +
      'font-size:12rem;'
    clapper.textContent = emoji
    overlay.appendChild(clapper)

    // "SCENE" text
    const sceneText = document.createElement('div')
    sceneText.textContent = 'NEXT SCENE'
    sceneText.style.cssText =
      'position:absolute;top:28%;left:50%;transform:translateX(-50%);z-index:11;' +
      'font-family:monospace;font-size:1.4rem;color:var(--neon-blue,#00bfff);' +
      'letter-spacing:0.3em;opacity:0;'
    overlay.appendChild(sceneText)

    // clapper drops in
    tl.from(clapper, {
      y: -300,
      rotation: -15,
      duration: dur * 0.15,
      ease: 'power3.out',
    })
    tl.to(sceneText, { opacity: 1, duration: dur * 0.08 })

    // top part snaps shut (simulated by scaling + rotation pulse)
    tl.to(clapper, {
      scaleY: 0.85,
      duration: dur * 0.03,
      ease: 'power4.in',
    })
    tl.to(clapper, {
      scaleY: 1,
      duration: dur * 0.02,
      ease: 'power2.out',
    })

    // hard cut to black
    const black = document.createElement('div')
    black.style.cssText = 'position:absolute;inset:0;background:#000;opacity:0;z-index:14;'
    overlay.appendChild(black)

    tl.to(black, { opacity: 1, duration: dur * 0.03, ease: 'none' })
    tl.set(clapper, { display: 'none' })
    tl.set(sceneText, { display: 'none' })

    // snap camera
    tl.call(() => snap(worldEl, to))

    // beat of black
    tl.to(black, { opacity: 1, duration: dur * 0.15 })

    // reveal — black slides up like a curtain
    tl.to(black, {
      y: '-100%',
      duration: dur * 0.25,
      ease: 'power2.inOut',
    })

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)

/* ── emoji-telescope ──────────────────────────────────────── */

registerTransition(
  'emoji-telescope',
  (worldEl, _from, to, overlay, config) => {
    const tl = gsap.timeline()
    const dur = config.duration
    const emoji = config.emoji ?? '🔭'

    tl.set(overlay, { opacity: 1 })

    // dark background with circular vignette hole
    const vignette = document.createElement('div')
    vignette.style.cssText =
      'position:absolute;inset:0;z-index:10;' +
      'background:radial-gradient(circle 5vmin at 50% 50%,transparent 0%,#000 0.1%);'
    overlay.appendChild(vignette)

    // telescope emoji
    const scope = document.createElement('div')
    scope.textContent = emoji
    scope.style.cssText =
      'position:absolute;bottom:5%;right:5%;font-size:4rem;z-index:11;opacity:0;'
    overlay.appendChild(scope)

    // lens flare
    const flare = document.createElement('div')
    flare.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:12;' +
      'width:20px;height:20px;border-radius:50%;opacity:0;' +
      'background:radial-gradient(circle,rgba(255,255,255,0.8),transparent);' +
      'box-shadow:0 0 30px 10px rgba(255,255,255,0.2);'
    overlay.appendChild(flare)

    // show telescope
    tl.to(scope, { opacity: 1, duration: dur * 0.1 })

    // small lens flare
    tl.to(flare, { opacity: 0.6, scale: 2, duration: dur * 0.1, ease: 'power1.out' })
    tl.to(flare, { opacity: 0, duration: dur * 0.1 })

    // snap camera
    tl.call(() => snap(worldEl, to))

    // expand the vignette circle to reveal full screen
    // Animate the gradient by interpolating the circle radius
    const steps = 30
    const startRadius = 5
    const endRadius = 150
    for (let i = 1; i <= steps; i++) {
      const r = startRadius + ((endRadius - startRadius) * i) / steps
      const progress = i / steps
      const easedOpacity = i === steps ? 0 : undefined
      tl.set(
        vignette,
        {
          background: `radial-gradient(circle ${r}vmin at 50% 50%,transparent ${Math.min(r - 1, r * 0.98)}vmin,#000 ${r}vmin)`,
          ...(easedOpacity !== undefined ? { opacity: 0 } : {}),
        },
        dur * 0.35 + (progress * dur * 0.4),
      )
    }

    // fade out telescope
    tl.to(scope, { opacity: 0, duration: dur * 0.1, ease: 'power2.in' }, `-=${dur * 0.15}`)

    tl.call(() => {
      overlay.innerHTML = ''
      gsap.set(overlay, { opacity: 0 })
    })

    return tl
  },
)
