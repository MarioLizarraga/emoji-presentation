import { useRef, useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SlideRenderer } from './SlideRenderer'
import { getTransition, createCameraMove, posToCamera } from './TransitionManager'
import './transitions/index'
import type { SlideData } from '../slides/types'

gsap.registerPlugin(useGSAP)

/* ── Props ─────────────────────────────────────────────── */

interface SlideEngineProps {
  slides: SlideData[]
  startIndex?: number
  onSlideChange?: (index: number) => void
}

/* ── Constants ─────────────────────────────────────────── */

const SLIDE_WIDTH = 1920
const SLIDE_HEIGHT = 1080

/* ── Imperative Handle ─────────────────────────────────── */

export interface SlideEngineHandle {
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  currentIndex: number
}

/* ── Component ─────────────────────────────────────────── */

export const SlideEngine = forwardRef<SlideEngineHandle, SlideEngineProps>(
  function SlideEngine({ slides, startIndex = 0, onSlideChange }, ref) {
  const containerRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const [currentIndex, setCurrentIndex] = useState(startIndex)

  /* ── Navigate to a slide ──────────────────────────────── */

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating.current) return
      if (index < 0 || index >= slides.length) return
      if (!worldRef.current || !overlayRef.current) return

      const fromSlide = slides[currentIndex]
      const toSlide = slides[index]
      if (!fromSlide || !toSlide) return

      isAnimating.current = true

      const transitionId = toSlide.transition.id
      console.log(
        `[SlideEngine] goToSlide(${currentIndex} -> ${index}) transition="${transitionId}" dur=${toSlide.transition.duration}`,
      )

      // Clean overlay at the START of every transition to prevent leftover artifacts
      if (overlayRef.current) {
        overlayRef.current.innerHTML = ''
        gsap.set(overlayRef.current, { opacity: 0 })
      }

      const registeredFn = getTransition(transitionId)
      let tl: gsap.core.Timeline

      if (registeredFn) {
        tl = registeredFn(
          worldRef.current,
          fromSlide.position,
          toSlide.position,
          overlayRef.current,
          toSlide.transition,
        )
      } else {
        tl = createCameraMove(
          worldRef.current,
          toSlide.position,
          toSlide.transition.duration,
        )
      }

      console.log(
        `[SlideEngine] timeline created for "${transitionId}" totalDuration=${tl.totalDuration().toFixed(3)}s`,
      )

      // Safety timeout: if a transition fails to complete, force-reset after duration + 2s buffer
      const maxWait = (toSlide.transition.duration + 2) * 1000
      const safetyTimer = window.setTimeout(() => {
        if (isAnimating.current) {
          console.warn(
            `[SlideEngine] SAFETY TIMEOUT fired for transition="${transitionId}" (${currentIndex}->${index}) after ${maxWait}ms — timeline progress=${tl.progress().toFixed(3)}`,
          )
          tl.kill()
          if (worldRef.current) {
            gsap.set(worldRef.current, posToCamera(toSlide.position))
          }
          if (overlayRef.current) {
            overlayRef.current.innerHTML = ''
            gsap.set(overlayRef.current, { opacity: 0 })
          }
          isAnimating.current = false
          setCurrentIndex(index)
          onSlideChange?.(index)
        }
      }, maxWait)

      tl.eventCallback('onComplete', () => {
        console.log(`[SlideEngine] onComplete for "${transitionId}" (${currentIndex}->${index})`)
        window.clearTimeout(safetyTimer)
        isAnimating.current = false
        setCurrentIndex(index)
        onSlideChange?.(index)
      })
    },
    [currentIndex, slides, onSlideChange],
  )

  const goNext = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide])
  const goPrev = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide])

  /* ── Expose imperative API for remote control ────────── */

  useImperativeHandle(ref, () => ({
    goTo: goToSlide,
    next: goNext,
    prev: goPrev,
    get currentIndex() { return currentIndex },
  }), [goToSlide, goNext, goPrev, currentIndex])

  /* ── Set initial camera position (no animation) ──────── */

  useGSAP(
    () => {
      if (!worldRef.current || slides.length === 0) return
      const pos = slides[startIndex]?.position
      if (!pos) return
      gsap.set(worldRef.current, posToCamera(pos))
    },
    { dependencies: [startIndex, slides], scope: containerRef },
  )

  /* ── Keyboard input ───────────────────────────────────── */

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault()
          goNext()
          break
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault()
          goPrev()
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  /* ── Click to advance ─────────────────────────────────── */

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Don't advance if clicking a button or interactive element
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, textarea, [role="button"]')) return
      goNext()
    },
    [goNext],
  )

  /* ── Fullscreen toggle ────────────────────────────────── */

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {
        /* silently ignore if not allowed */
      })
    } else {
      document.exitFullscreen().catch(() => {
        /* silently ignore */
      })
    }
  }

  /* ── Render ───────────────────────────────────────────── */

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--bg)',
        cursor: 'pointer',
      }}
    >
      {/* World canvas — GSAP transforms this */}
      <div
        ref={worldRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          willChange: 'transform',
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              width: SLIDE_WIDTH,
              height: SLIDE_HEIGHT,
              overflow: 'hidden',
              left: slide.position.x - SLIDE_WIDTH / 2,
              top: slide.position.y - SLIDE_HEIGHT / 2,
              transform: `scale(${slide.position.scale}) rotate(${slide.position.rotation}deg)`,
              transformOrigin: 'center center',
            }}
          >
            <SlideRenderer content={slide.content} />
          </div>
        ))}
      </div>

      {/* Overlay layer for transition effects (flashes, wipes, etc.) */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Slide counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '2rem',
          fontSize: '1.1rem',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font)',
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 600,
          zIndex: 20,
          userSelect: 'none',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        }}
      >
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  )
  },
)
