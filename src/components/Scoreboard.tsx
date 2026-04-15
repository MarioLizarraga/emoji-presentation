import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface ScoreboardProps {
  redScore: number
  blueScore: number
  redName?: string
  blueName?: string
  style?: React.CSSProperties
}

export function Scoreboard({ redScore, blueScore, redName = '🔥', blueName = '🧊', style }: ScoreboardProps) {
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
        gap: '1.25rem',
        padding: '0.5rem 1rem',
        background: 'rgba(10, 10, 15, 0.6)',
        backdropFilter: 'blur(8px)',
        borderRadius: '999px',
        fontFamily: 'var(--font)',
        border: '1px solid rgba(255,255,255,0.08)',
        ...style,
      }}
    >
      {/* Team Red */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#ff4444',
            boxShadow: redLeading ? '0 0 8px #ff4444' : 'none',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontWeight: 600,
            fontSize: '0.85rem',
            color: '#ff6666',
            opacity: redLeading ? 1 : 0.75,
            whiteSpace: 'nowrap',
            maxWidth: '120px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {redName}
        </span>
        <span
          ref={redRef}
          style={{
            fontWeight: 900,
            fontSize: '1.1rem',
            color: '#ff4444',
            fontVariantNumeric: 'tabular-nums',
            display: 'inline-block',
            minWidth: '2ch',
            textAlign: 'right',
            textShadow: redLeading ? '0 0 10px #ff444488' : 'none',
          }}
        >
          {redScore}
        </span>
      </div>

      {/* Divider */}
      <span
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          fontWeight: 300,
        }}
      >
        &#x2022;
      </span>

      {/* Team Blue */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span
          ref={blueRef}
          style={{
            fontWeight: 900,
            fontSize: '1.1rem',
            color: '#4488ff',
            fontVariantNumeric: 'tabular-nums',
            display: 'inline-block',
            minWidth: '2ch',
            textAlign: 'left',
            textShadow: blueLeading ? '0 0 10px #4488ff88' : 'none',
          }}
        >
          {blueScore}
        </span>
        <span
          style={{
            fontWeight: 600,
            fontSize: '0.85rem',
            color: '#66aaff',
            opacity: blueLeading ? 1 : 0.75,
            whiteSpace: 'nowrap',
            maxWidth: '120px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {blueName}
        </span>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#4488ff',
            boxShadow: blueLeading ? '0 0 8px #4488ff' : 'none',
            display: 'inline-block',
          }}
        />
      </div>
    </div>
  )
}
