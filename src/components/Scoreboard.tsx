import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface ScoreboardProps {
  redScore: number
  blueScore: number
  redName?: string
  blueName?: string
  style?: React.CSSProperties
}

export function Scoreboard({ redScore, blueScore, redName = 'Equipo Fuego', blueName = 'Equipo Hielo', style }: ScoreboardProps) {
  const redRef = useRef<HTMLSpanElement>(null)
  const blueRef = useRef<HTMLSpanElement>(null)
  const prevRedRef = useRef(redScore)
  const prevBlueRef = useRef(blueScore)

  useEffect(() => {
    if (redRef.current && prevRedRef.current !== redScore) {
      // Counter-roll animation
      const obj = { val: prevRedRef.current }
      gsap.to(obj, {
        val: redScore,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          if (redRef.current) {
            redRef.current.textContent = String(Math.round(obj.val))
          }
        },
      })
      // Scale-pop
      gsap.fromTo(
        redRef.current,
        { scale: 1.4 },
        { scale: 1, duration: 0.4, ease: 'back.out(2)' },
      )
      prevRedRef.current = redScore
    }
  }, [redScore])

  useEffect(() => {
    if (blueRef.current && prevBlueRef.current !== blueScore) {
      const obj = { val: prevBlueRef.current }
      gsap.to(obj, {
        val: blueScore,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          if (blueRef.current) {
            blueRef.current.textContent = String(Math.round(obj.val))
          }
        },
      })
      gsap.fromTo(
        blueRef.current,
        { scale: 1.4 },
        { scale: 1, duration: 0.4, ease: 'back.out(2)' },
      )
      prevBlueRef.current = blueScore
    }
  }, [blueScore])

  const redLeading = redScore > blueScore
  const blueLeading = blueScore > redScore

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3rem',
        padding: '1rem 2rem',
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        fontFamily: 'var(--font)',
        ...style,
      }}
    >
      {/* Team Red */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>&#x1F534;</span>
        <span
          style={{
            fontWeight: 700,
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: '#ff4444',
            textShadow: redLeading ? '0 0 12px #ff444488, 0 0 24px #ff444444' : 'none',
          }}
        >
          {redName}
        </span>
        <span
          ref={redRef}
          style={{
            fontWeight: 900,
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: '#ff4444',
            fontVariantNumeric: 'tabular-nums',
            display: 'inline-block',
            textShadow: redLeading ? '0 0 16px #ff444488, 0 0 32px #ff444444' : 'none',
          }}
        >
          {redScore}
        </span>
      </div>

      {/* Divider */}
      <span
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          color: 'var(--text-muted)',
          fontWeight: 300,
        }}
      >
        :
      </span>

      {/* Team Blue */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          ref={blueRef}
          style={{
            fontWeight: 900,
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: '#4488ff',
            fontVariantNumeric: 'tabular-nums',
            display: 'inline-block',
            textShadow: blueLeading ? '0 0 16px #4488ff88, 0 0 32px #4488ff44' : 'none',
          }}
        >
          {blueScore}
        </span>
        <span
          style={{
            fontWeight: 700,
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: '#4488ff',
            textShadow: blueLeading ? '0 0 12px #4488ff88, 0 0 24px #4488ff44' : 'none',
          }}
        >
          {blueName}
        </span>
        <span style={{ fontSize: '1.5rem' }}>&#x1F535;</span>
      </div>
    </div>
  )
}
