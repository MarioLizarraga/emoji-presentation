import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRoom } from '../realtime/useRoom'
import { allSlides } from '../slides/slideData'
import type { SlideContent } from '../slides/types'

interface BuzzEntry {
  playerName: string
  color: string
  timestamp: number
}

function isQuizSlide(content: SlideContent): boolean {
  return content.type === 'quiz-question'
}

function getQuizAnswer(content: SlideContent): string | null {
  if (content.type === 'quiz-question') {
    return (content as { answer: string }).answer
  }
  return null
}

export function RemoteView() {
  const [searchParams] = useSearchParams()
  const roomCode = searchParams.get('room')

  if (!roomCode) {
    return <NoRoomError />
  }

  return <RemoteController roomCode={roomCode} />
}

function NoRoomError() {
  return (
    <div style={styles.container}>
      <div style={styles.errorBox}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          No Room Code
        </h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.5 }}>
          Open this page with a room code in the URL:
        </p>
        <code style={styles.codeBlock}>
          /#/remote?room=XXXX
        </code>
      </div>
    </div>
  )
}

function RemoteController({ roomCode }: { roomCode: string }) {
  const { connected, broadcast, on } = useRoom(roomCode)
  const [slideIndex, setSlideIndex] = useState(0)
  const [buzzes, setBuzzes] = useState<BuzzEntry[]>([])

  const totalSlides = allSlides.length
  const currentSlide = allSlides[slideIndex]
  const quiz = currentSlide ? isQuizSlide(currentSlide.content) : false
  const answer = currentSlide ? getQuizAnswer(currentSlide.content) : null

  // Listen for buzzes
  useEffect(() => {
    const unsub = on('player:buzz', (payload) => {
      const entry: BuzzEntry = {
        playerName: (payload.playerName as string) ?? 'Unknown',
        color: (payload.color as string) ?? 'var(--neon-yellow)',
        timestamp: Date.now(),
      }
      setBuzzes((prev) => [...prev, entry])
    })
    return unsub
  }, [on])

  // Clear buzzes when slide changes
  useEffect(() => {
    setBuzzes([])
  }, [slideIndex])

  const goTo = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= totalSlides) return
      setSlideIndex(newIndex)
      broadcast('presenter:slide', {
        slideIndex: newIndex,
        slideId: allSlides[newIndex].id,
        timestamp: Date.now(),
      })
    },
    [totalSlides, broadcast],
  )

  const goPrev = useCallback(() => goTo(slideIndex - 1), [goTo, slideIndex])
  const goNext = useCallback(() => goTo(slideIndex + 1), [goTo, slideIndex])

  const scorePlayer = useCallback(
    (playerName: string, correct: boolean) => {
      broadcast('presenter:score', {
        playerName,
        delta: correct ? 100 : 0,
        correct,
        timestamp: Date.now(),
      })
      // Remove that buzz from the list
      setBuzzes((prev) => prev.filter((b) => b.playerName !== playerName))
    },
    [broadcast],
  )

  return (
    <div style={styles.container}>
      {/* Status Bar */}
      <div style={styles.statusBar}>
        <div style={styles.statusLeft}>
          <span
            style={{
              ...styles.statusDot,
              backgroundColor: connected ? 'var(--neon-green)' : 'var(--neon-red)',
              boxShadow: connected
                ? '0 0 8px var(--neon-green)'
                : '0 0 8px var(--neon-red)',
            }}
          />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            {connected ? 'Connected' : 'Connecting...'}
          </span>
        </div>
        <span style={styles.roomBadge}>{roomCode}</span>
      </div>

      {/* Slide Info */}
      <div style={styles.slideInfo}>
        <div style={styles.slideCounter}>
          Slide {slideIndex + 1} / {totalSlides}
        </div>
        {currentSlide && (
          <>
            <div style={styles.slideId}>"{currentSlide.id}"</div>
            {currentSlide.speakerNotes && (
              <div style={styles.speakerNotes}>
                Notes: "{currentSlide.speakerNotes}"
              </div>
            )}
          </>
        )}
      </div>

      {/* Navigation */}
      <div style={styles.navRow}>
        <button
          onClick={goPrev}
          disabled={slideIndex <= 0}
          style={{
            ...styles.navButton,
            ...styles.prevButton,
            opacity: slideIndex <= 0 ? 0.3 : 1,
          }}
        >
          &#9664; PREV
        </button>
        <button
          onClick={goNext}
          disabled={slideIndex >= totalSlides - 1}
          style={{
            ...styles.navButton,
            ...styles.nextButton,
            opacity: slideIndex >= totalSlides - 1 ? 0.3 : 1,
          }}
        >
          NEXT &#9654;
        </button>
      </div>

      {/* Game Master Section (quiz slides only) */}
      {quiz && (
        <div style={styles.gameMaster}>
          <div style={styles.gmHeader}>GAME MASTER</div>
          {answer && (
            <div style={styles.gmAnswer}>
              Answer: <strong>{answer}</strong>
            </div>
          )}
          {buzzes.length === 0 && (
            <div style={styles.gmWaiting}>Waiting for buzzes...</div>
          )}
          {buzzes.map((buzz, i) => (
            <div key={`${buzz.playerName}-${buzz.timestamp}`} style={styles.buzzRow}>
              <div style={styles.buzzInfo}>
                <span style={{ fontSize: '1.1rem' }}>
                  {i === 0 ? '\uD83D\uDD14' : '\uD83D\uDD15'}
                </span>
                <span
                  style={{
                    fontWeight: 700,
                    color: buzz.color,
                  }}
                >
                  {buzz.playerName}
                </span>
                {i === 0 && (
                  <span style={styles.firstBadge}>1st</span>
                )}
              </div>
              <div style={styles.buzzActions}>
                <button
                  onClick={() => scorePlayer(buzz.playerName, true)}
                  style={styles.correctBtn}
                >
                  +100
                </button>
                <button
                  onClick={() => scorePlayer(buzz.playerName, false)}
                  style={styles.incorrectBtn}
                >
                  &#10060;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Styles ─────────────────────────────────────────────── */

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100dvh',
    background: 'var(--bg)',
    color: 'var(--text)',
    fontFamily: 'var(--font)',
    display: 'flex',
    flexDirection: 'column',
    padding: '0.75rem',
    gap: '0.75rem',
    overflow: 'auto',
    maxWidth: '428px',
    margin: '0 auto',
  },

  errorBox: {
    textAlign: 'center' as const,
    padding: '2rem',
    margin: 'auto',
  },

  codeBlock: {
    display: 'block',
    marginTop: '0.75rem',
    padding: '0.5rem 1rem',
    background: 'var(--bg-elevated)',
    borderRadius: '8px',
    fontSize: '0.85rem',
    color: 'var(--neon-purple)',
  },

  // Status bar
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    background: 'var(--bg-surface)',
    borderRadius: '12px',
  },

  statusLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  statusDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    display: 'inline-block',
  },

  roomBadge: {
    fontWeight: 700,
    fontSize: '0.9rem',
    letterSpacing: '0.1em',
    color: 'var(--neon-purple)',
    background: 'var(--bg-elevated)',
    padding: '0.25rem 0.6rem',
    borderRadius: '6px',
  },

  // Slide info
  slideInfo: {
    padding: '1rem',
    background: 'var(--bg-surface)',
    borderRadius: '12px',
    flex: '1 0 auto',
    minHeight: '120px',
  },

  slideCounter: {
    fontWeight: 700,
    fontSize: '1rem',
    color: 'var(--neon-blue)',
    marginBottom: '0.4rem',
  },

  slideId: {
    fontSize: '0.95rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: 'var(--text)',
  },

  speakerNotes: {
    fontStyle: 'italic',
    fontSize: '0.85rem',
    color: 'var(--text-dim)',
    lineHeight: 1.5,
  },

  // Navigation
  navRow: {
    display: 'flex',
    gap: '0.75rem',
  },

  navButton: {
    flex: 1,
    minHeight: '56px',
    border: 'none',
    borderRadius: '14px',
    fontSize: '1rem',
    fontWeight: 700,
    fontFamily: 'var(--font)',
    cursor: 'pointer',
    touchAction: 'manipulation',
    transition: 'opacity 0.15s, transform 0.1s',
    color: '#fff',
  },

  prevButton: {
    background: 'var(--bg-elevated)',
  },

  nextButton: {
    background: 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))',
  },

  // Game master
  gameMaster: {
    padding: '1rem',
    background: 'var(--bg-surface)',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },

  gmHeader: {
    fontWeight: 900,
    fontSize: '0.8rem',
    letterSpacing: '0.15em',
    color: 'var(--neon-yellow)',
    textTransform: 'uppercase' as const,
  },

  gmAnswer: {
    fontSize: '1rem',
    color: 'var(--text)',
    padding: '0.5rem 0.75rem',
    background: 'var(--bg-elevated)',
    borderRadius: '8px',
    borderLeft: '3px solid var(--neon-green)',
  },

  gmWaiting: {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    fontStyle: 'italic',
    textAlign: 'center' as const,
    padding: '0.5rem 0',
  },

  buzzRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    background: 'var(--bg-elevated)',
    borderRadius: '10px',
  },

  buzzInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  firstBadge: {
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '0.1rem 0.35rem',
    background: 'var(--neon-yellow)',
    color: '#000',
    borderRadius: '4px',
  },

  buzzActions: {
    display: 'flex',
    gap: '0.4rem',
  },

  correctBtn: {
    minWidth: '48px',
    minHeight: '48px',
    border: 'none',
    borderRadius: '10px',
    background: 'var(--neon-green)',
    color: '#000',
    fontWeight: 700,
    fontSize: '0.9rem',
    cursor: 'pointer',
    touchAction: 'manipulation',
    fontFamily: 'var(--font)',
  },

  incorrectBtn: {
    minWidth: '48px',
    minHeight: '48px',
    border: 'none',
    borderRadius: '10px',
    background: 'var(--neon-red)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.1rem',
    cursor: 'pointer',
    touchAction: 'manipulation',
    fontFamily: 'var(--font)',
  },
}
