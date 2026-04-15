import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import type { PlayerStats } from '../realtime/usePresenter'

interface FinalScoreboardProps {
  redScore: number
  blueScore: number
  redName: string
  blueName: string
  playerStats: Record<string, PlayerStats>
}

export function FinalScoreboard({
  redScore,
  blueScore,
  redName,
  blueName,
  playerStats,
}: FinalScoreboardProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const winnerRef = useRef<HTMLDivElement>(null)
  const scoreRedRef = useRef<HTMLSpanElement>(null)
  const scoreBlueRef = useRef<HTMLSpanElement>(null)
  const confettiRef = useRef<HTMLDivElement>(null)

  const winner: 'red' | 'blue' | 'tie' =
    redScore > blueScore ? 'red' : blueScore > redScore ? 'blue' : 'tie'

  const winnerName = winner === 'red' ? redName : winner === 'blue' ? blueName : 'Empate'
  const winnerColor = winner === 'red' ? '#ff4444' : winner === 'blue' ? '#4488ff' : '#ffbe0b'

  const statsArray = Object.values(playerStats).sort((a, b) => b.points - a.points)
  const redPlayers = statsArray.filter((p) => p.team === 'red')
  const bluePlayers = statsArray.filter((p) => p.team === 'blue')

  const redMvp = redPlayers[0]
  const blueMvp = bluePlayers[0]

  /* ── Celebration animation ─────────────────────────────── */

  useEffect(() => {
    const tl = gsap.timeline()

    // Drumroll (title appears with rapid scale pulse)
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.3, y: -100 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(2)' },
      )
    }

    // Winner reveal with BIG dramatic scale
    if (winnerRef.current) {
      tl.fromTo(
        winnerRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
        },
        '+=0.3',
      )
      // Heartbeat pulse on the winner (continuous)
      tl.to(winnerRef.current, {
        scale: 1.05,
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      })
    }

    // Score counters roll up
    if (scoreRedRef.current) {
      const obj = { v: 0 }
      gsap.to(obj, {
        v: redScore,
        duration: 2,
        ease: 'power2.out',
        delay: 1.2,
        onUpdate: () => {
          if (scoreRedRef.current) scoreRedRef.current.textContent = String(Math.round(obj.v))
        },
      })
    }
    if (scoreBlueRef.current) {
      const obj = { v: 0 }
      gsap.to(obj, {
        v: blueScore,
        duration: 2,
        ease: 'power2.out',
        delay: 1.2,
        onUpdate: () => {
          if (scoreBlueRef.current) scoreBlueRef.current.textContent = String(Math.round(obj.v))
        },
      })
    }

    // Confetti burst
    if (confettiRef.current) {
      const colors = ['#ff006e', '#8338ec', '#3a86ff', '#ffbe0b', '#00ff88', '#ff4044']
      const pieces: HTMLDivElement[] = []
      for (let i = 0; i < 80; i++) {
        const p = document.createElement('div')
        const size = 6 + Math.random() * 10
        p.style.cssText = `
          position:absolute;
          top:50%;
          left:50%;
          width:${size}px;
          height:${size * 1.4}px;
          background:${colors[Math.floor(Math.random() * colors.length)]};
          border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
          z-index:60;
        `
        confettiRef.current.appendChild(p)
        pieces.push(p)
      }

      gsap.fromTo(
        pieces,
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        {
          x: () => gsap.utils.random(-800, 800),
          y: () => gsap.utils.random(-600, 600),
          rotation: () => gsap.utils.random(-720, 720),
          opacity: 0,
          duration: 2.5,
          stagger: 0.01,
          ease: 'power2.out',
          delay: 0.5,
        },
      )
    }

    return () => {
      tl.kill()
      if (confettiRef.current) confettiRef.current.innerHTML = ''
    }
  }, [redScore, blueScore])

  return (
    <div
      ref={rootRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'hidden',
        fontFamily: 'var(--font)',
      }}
    >
      {/* Confetti container */}
      <div
        ref={confettiRef}
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: 0,
          height: 0,
          pointerEvents: 'none',
          zIndex: 60,
        }}
      />

      {/* Title */}
      <div
        ref={titleRef}
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 5rem)',
          fontWeight: 900,
          color: 'var(--neon-yellow)',
          textShadow: '0 0 30px #ffbe0b66, 0 0 60px #ffbe0b33',
          marginBottom: '1rem',
          letterSpacing: '0.05em',
        }}
      >
        🏆 GANADOR 🏆
      </div>

      {/* Winner team (HUGE) */}
      <div
        ref={winnerRef}
        style={{
          fontSize: 'clamp(5rem, 10vw, 10rem)',
          fontWeight: 900,
          color: winnerColor,
          textShadow: `0 0 40px ${winnerColor}88, 0 0 80px ${winnerColor}44`,
          marginBottom: '2rem',
          textAlign: 'center',
          lineHeight: 1,
        }}
      >
        {winner === 'tie' ? '¡Empate!' : winnerName}
      </div>

      {/* Both team scores side by side */}
      <div
        style={{
          display: 'flex',
          gap: '4rem',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
      >
        {/* Red team */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: winner === 'blue' ? 0.5 : 1,
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ff4444',
              textShadow: winner === 'red' ? '0 0 20px #ff444488' : 'none',
            }}
          >
            {redName}
          </div>
          <span
            ref={scoreRedRef}
            style={{
              fontSize: 'clamp(4rem, 8vw, 8rem)',
              fontWeight: 900,
              color: '#ff4444',
              fontVariantNumeric: 'tabular-nums',
              textShadow: winner === 'red' ? '0 0 40px #ff4444aa' : '0 0 10px #ff444444',
              lineHeight: 1,
            }}
          >
            0
          </span>
          {redMvp && (
            <div
              style={{
                marginTop: '0.75rem',
                fontSize: '0.95rem',
                color: 'var(--text-dim)',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#ffbe0b', fontWeight: 700, marginBottom: '0.25rem' }}>
                ⭐ MVP: {redMvp.name}
              </div>
              <div>
                {redMvp.correctAnswers} {redMvp.correctAnswers === 1 ? 'acierto' : 'aciertos'} · {redMvp.points} pts
              </div>
            </div>
          )}
        </div>

        <div style={{ fontSize: '3rem', color: 'var(--text-muted)', fontWeight: 300 }}>
          vs
        </div>

        {/* Blue team */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: winner === 'red' ? 0.5 : 1,
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#4488ff',
              textShadow: winner === 'blue' ? '0 0 20px #4488ff88' : 'none',
            }}
          >
            {blueName}
          </div>
          <span
            ref={scoreBlueRef}
            style={{
              fontSize: 'clamp(4rem, 8vw, 8rem)',
              fontWeight: 900,
              color: '#4488ff',
              fontVariantNumeric: 'tabular-nums',
              textShadow: winner === 'blue' ? '0 0 40px #4488ffaa' : '0 0 10px #4488ff44',
              lineHeight: 1,
            }}
          >
            0
          </span>
          {blueMvp && (
            <div
              style={{
                marginTop: '0.75rem',
                fontSize: '0.95rem',
                color: 'var(--text-dim)',
                textAlign: 'center',
              }}
            >
              <div style={{ color: '#ffbe0b', fontWeight: 700, marginBottom: '0.25rem' }}>
                ⭐ MVP: {blueMvp.name}
              </div>
              <div>
                {blueMvp.correctAnswers} {blueMvp.correctAnswers === 1 ? 'acierto' : 'aciertos'} · {blueMvp.points} pts
              </div>
            </div>
          )}
        </div>
      </div>

      {/* All player stats (compact) */}
      {statsArray.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            maxWidth: '80%',
            marginTop: '1.5rem',
          }}
        >
          {/* Red roster */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '0.9rem',
                color: '#ff6666',
                fontWeight: 700,
                marginBottom: '0.5rem',
                textAlign: 'center',
                letterSpacing: '0.1em',
              }}
            >
              {redName}
            </div>
            {redPlayers.length > 0 ? (
              redPlayers.map((p) => (
                <div
                  key={p.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.3rem 0.75rem',
                    background: 'rgba(255,68,68,0.08)',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    marginBottom: '0.25rem',
                  }}
                >
                  <span style={{ color: 'var(--text)' }}>{p.name}</span>
                  <span style={{ color: 'var(--text-dim)' }}>
                    {p.correctAnswers} aciertos · {p.points} pts
                  </span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                Sin respuestas correctas
              </div>
            )}
          </div>

          {/* Blue roster */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '0.9rem',
                color: '#66aaff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                textAlign: 'center',
                letterSpacing: '0.1em',
              }}
            >
              {blueName}
            </div>
            {bluePlayers.length > 0 ? (
              bluePlayers.map((p) => (
                <div
                  key={p.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.3rem 0.75rem',
                    background: 'rgba(68,136,255,0.08)',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    marginBottom: '0.25rem',
                  }}
                >
                  <span style={{ color: 'var(--text)' }}>{p.name}</span>
                  <span style={{ color: 'var(--text-dim)' }}>
                    {p.correctAnswers} aciertos · {p.points} pts
                  </span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                Sin respuestas correctas
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
