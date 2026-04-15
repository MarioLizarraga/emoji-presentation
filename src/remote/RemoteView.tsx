import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRoom } from '../realtime/useRoom'
import { allSlides } from '../slides/slideData'
import type { SlideContent } from '../slides/types'

interface BuzzEntry {
  playerName: string
  team: 'red' | 'blue'
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
    return <CodeEntryPage />
  }

  return <RemoteController roomCode={roomCode} />
}

/* ── Code Entry Landing Page ──────────────────────────────── */

function CodeEntryPage() {
  const [code, setCode] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 4)
    setCode(cleaned)
  }

  const handleConnect = () => {
    if (code.length === 4) {
      window.location.hash = `/remote?room=${code}`
      // Force reload to pick up the new search params
      window.location.reload()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && code.length === 4) {
      handleConnect()
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.codeEntryScreen}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>&#x1F3AE;</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text)' }}>
          Control Remoto
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Ingresa el código de sala de la presentación
        </p>

        <div style={{ marginTop: '1.5rem', width: '100%' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>
            Código de sala:
          </label>
          <input
            ref={inputRef}
            type="text"
            value={code}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            maxLength={4}
            placeholder="XXXX"
            style={{
              ...styles.codeInput,
              letterSpacing: code.length > 0 ? '0.6em' : '0.2em',
            }}
          />
        </div>

        <button
          onClick={handleConnect}
          disabled={code.length < 4}
          style={{
            ...styles.connectButton,
            opacity: code.length < 4 ? 0.4 : 1,
            cursor: code.length < 4 ? 'not-allowed' : 'pointer',
          }}
        >
          Conectar
        </button>
      </div>
    </div>
  )
}

/* ── Remote Controller ────────────────────────────────────── */

function RemoteController({ roomCode }: { roomCode: string }) {
  const { connected, broadcast, on } = useRoom(roomCode)
  const [slideIndex, setSlideIndex] = useState(0)
  const [buzzes, setBuzzes] = useState<BuzzEntry[]>([])
  const [scores, setScores] = useState({ red: 0, blue: 0 })

  // Team names with localStorage persistence
  const [redTeamName, setRedTeamName] = useState(() => {
    return localStorage.getItem('emoji-remote-redTeam') || '🔥'
  })
  const [blueTeamName, setBlueTeamName] = useState(() => {
    return localStorage.getItem('emoji-remote-blueTeam') || '🧊'
  })
  const [showTeamSettings, setShowTeamSettings] = useState(false)

  const totalSlides = allSlides.length
  const currentSlide = allSlides[slideIndex]
  const quiz = currentSlide ? isQuizSlide(currentSlide.content) : false
  const answer = currentSlide ? getQuizAnswer(currentSlide.content) : null

  // Persist team names
  useEffect(() => {
    localStorage.setItem('emoji-remote-redTeam', redTeamName)
    localStorage.setItem('emoji-remote-blueTeam', blueTeamName)
  }, [redTeamName, blueTeamName])

  // Listen for buzzes
  useEffect(() => {
    const unsub = on('player:buzz', (payload) => {
      const entry: BuzzEntry = {
        playerName: (payload.name as string) ?? (payload.playerName as string) ?? 'Desconocido',
        team: (payload.team as 'red' | 'blue') ?? 'red',
        color: (payload.color as string) ?? 'var(--neon-yellow)',
        timestamp: Date.now(),
      }
      setBuzzes((prev) => [...prev, entry])
    })
    return unsub
  }, [on])

  // Listen for score updates from presenter
  useEffect(() => {
    const unsub1 = on('presenter:updateScore', (payload) => {
      const team = payload.team as 'red' | 'blue'
      const total = payload.total as number
      setScores((prev) => ({ ...prev, [team]: total }))
    })
    const unsub2 = on('presenter:score', (payload) => {
      const team = payload.team as 'red' | 'blue'
      const total = payload.total as number
      setScores((prev) => ({ ...prev, [team]: total }))
    })
    return () => { unsub1(); unsub2() }
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

  const broadcastTeamNames = useCallback(
    () => {
      broadcast('presenter:teamNames', {
        red: redTeamName,
        blue: blueTeamName,
      })
    },
    [broadcast, redTeamName, blueTeamName],
  )

  // Award points from remote
  const awardPoints = useCallback(
    (team: 'red' | 'blue', points: number) => {
      setScores((prev) => {
        const newTotal = Math.max(0, prev[team] + points)
        broadcast('presenter:score', { team, points, total: newTotal })
        broadcast('presenter:updateScore', { team, points, total: newTotal })
        return { ...prev, [team]: newTotal }
      })
    },
    [broadcast],
  )

  const scorePlayer = useCallback(
    (playerName: string, team: 'red' | 'blue', correct: boolean, bonus = false) => {
      if (correct) {
        const pts = bonus ? 200 : 100
        awardPoints(team, pts)
      }
      // Remove that buzz from the list
      setBuzzes((prev) => prev.filter((b) => b.playerName !== playerName))
    },
    [awardPoints],
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
            {connected ? 'Conectado' : 'Conectando...'}
          </span>
        </div>
        <span style={styles.roomBadge}>{roomCode}</span>
      </div>

      {/* Scoreboard on Remote */}
      <div style={styles.scoreSection}>
        <div style={styles.scoreRow}>
          <div style={styles.scoreTeam}>
            <span style={{ color: '#ff4444', fontWeight: 700, fontSize: '0.85rem' }}>
              &#x1F534; {redTeamName}
            </span>
            <span style={{ color: '#ff4444', fontWeight: 900, fontSize: '1.5rem' }}>
              {scores.red}
            </span>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>:</span>
          <div style={styles.scoreTeam}>
            <span style={{ color: '#4488ff', fontWeight: 700, fontSize: '0.85rem' }}>
              &#x1F535; {blueTeamName}
            </span>
            <span style={{ color: '#4488ff', fontWeight: 900, fontSize: '1.5rem' }}>
              {scores.blue}
            </span>
          </div>
        </div>

        {/* Manual score adjustment */}
        <div style={styles.scoreAdjustRow}>
          <button
            onClick={() => awardPoints('red', 100)}
            style={{ ...styles.scoreAdjustBtn, background: '#ff444433', color: '#ff4444', border: '1px solid #ff444444' }}
          >
            +100
          </button>
          <button
            onClick={() => awardPoints('red', -50)}
            style={{ ...styles.scoreAdjustBtn, background: '#ff444422', color: '#ff6666', border: '1px solid #ff444433' }}
          >
            -50
          </button>
          <button
            onClick={() => awardPoints('blue', -50)}
            style={{ ...styles.scoreAdjustBtn, background: '#4488ff22', color: '#6699ff', border: '1px solid #4488ff33' }}
          >
            -50
          </button>
          <button
            onClick={() => awardPoints('blue', 100)}
            style={{ ...styles.scoreAdjustBtn, background: '#4488ff33', color: '#4488ff', border: '1px solid #4488ff44' }}
          >
            +100
          </button>
        </div>
      </div>

      {/* Slide Info */}
      <div style={styles.slideInfo}>
        <div style={styles.slideCounter}>
          Diapositiva {slideIndex + 1} / {totalSlides}
        </div>
        {currentSlide && (
          <>
            <div style={styles.slideId}>"{currentSlide.id}"</div>
            {currentSlide.speakerNotes && (
              <div style={styles.speakerNotes}>
                Notas: "{currentSlide.speakerNotes}"
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
          &#9664; ANTERIOR
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
          SIGUIENTE &#9654;
        </button>
      </div>

      {/* Game Master Section (quiz slides only) */}
      {quiz && (
        <div style={styles.gameMaster}>
          <div style={styles.gmHeader}>GAME MASTER</div>
          {answer && (
            <div style={styles.gmAnswer}>
              Respuesta: <strong>{answer}</strong>
            </div>
          )}
          {buzzes.length === 0 && (
            <div style={styles.gmWaiting}>Esperando buzzes...</div>
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
                    color: buzz.team === 'red' ? '#ff4444' : '#4488ff',
                  }}
                >
                  {buzz.playerName}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  ({buzz.team === 'red' ? redTeamName : blueTeamName})
                </span>
                {i === 0 && (
                  <span style={styles.firstBadge}>1ro</span>
                )}
              </div>
              <div style={styles.buzzActions}>
                <button
                  onClick={() => scorePlayer(buzz.playerName, buzz.team, true)}
                  style={styles.correctBtn}
                  title="Correcto +100"
                >
                  &#x2705; +100
                </button>
                <button
                  onClick={() => scorePlayer(buzz.playerName, buzz.team, true, true)}
                  style={styles.bonusBtn}
                  title="Bonus +200"
                >
                  &#x1F3C6; +200
                </button>
                <button
                  onClick={() => scorePlayer(buzz.playerName, buzz.team, false)}
                  style={styles.incorrectBtn}
                  title="Incorrecto"
                >
                  &#10060;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Team Settings Toggle */}
      <button
        onClick={() => {
          setShowTeamSettings(!showTeamSettings)
          if (showTeamSettings) {
            // When closing, broadcast the names
            broadcastTeamNames()
          }
        }}
        style={styles.settingsToggle}
      >
        &#x2699;&#xFE0F; {showTeamSettings ? 'Guardar Equipos' : 'Nombres de Equipos'}
      </button>

      {showTeamSettings && (
        <div style={styles.teamSettings}>
          <div style={styles.teamInputGroup}>
            <label style={{ fontSize: '0.8rem', color: '#ff4444', fontWeight: 600 }}>
              &#x1F534; Nombre Equipo Rojo:
            </label>
            <input
              type="text"
              value={redTeamName}
              onChange={(e) => setRedTeamName(e.target.value)}
              maxLength={20}
              style={{ ...styles.teamInput, borderColor: '#ff444444' }}
            />
          </div>
          <div style={styles.teamInputGroup}>
            <label style={{ fontSize: '0.8rem', color: '#4488ff', fontWeight: 600 }}>
              &#x1F535; Nombre Equipo Azul:
            </label>
            <input
              type="text"
              value={blueTeamName}
              onChange={(e) => setBlueTeamName(e.target.value)}
              maxLength={20}
              style={{ ...styles.teamInput, borderColor: '#4488ff44' }}
            />
          </div>
          <button onClick={broadcastTeamNames} style={styles.broadcastBtn}>
            Enviar Nombres
          </button>
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

  codeEntryScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    flex: 1,
    padding: '2rem 1rem',
    margin: 'auto 0',
  },

  codeInput: {
    width: '100%',
    marginTop: '0.5rem',
    padding: '1rem',
    fontSize: '2rem',
    fontWeight: 900,
    fontFamily: 'var(--font)',
    background: 'var(--bg-elevated)',
    border: '2px solid var(--bg-surface)',
    borderRadius: '14px',
    color: 'var(--neon-purple)',
    outline: 'none',
    textAlign: 'center' as const,
    textTransform: 'uppercase' as const,
  },

  connectButton: {
    width: '100%',
    marginTop: '1rem',
    padding: '1rem',
    fontSize: '1.2rem',
    fontWeight: 900,
    fontFamily: 'var(--font)',
    letterSpacing: '0.1em',
    background: 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    touchAction: 'manipulation',
    transition: 'opacity 0.2s',
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

  // Score section
  scoreSection: {
    padding: '0.75rem',
    background: 'var(--bg-surface)',
    borderRadius: '12px',
  },

  scoreRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
  },

  scoreTeam: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
  },

  scoreAdjustRow: {
    display: 'flex',
    gap: '0.4rem',
    marginTop: '0.5rem',
    justifyContent: 'center',
  },

  scoreAdjustBtn: {
    padding: '0.35rem 0.6rem',
    fontSize: '0.75rem',
    fontWeight: 700,
    fontFamily: 'var(--font)',
    borderRadius: '8px',
    cursor: 'pointer',
    touchAction: 'manipulation',
    minHeight: '36px',
  },

  // Slide info
  slideInfo: {
    padding: '0.75rem 1rem',
    background: 'var(--bg-surface)',
    borderRadius: '12px',
    flex: '1 0 auto',
    minHeight: '80px',
  },

  slideCounter: {
    fontWeight: 700,
    fontSize: '1rem',
    color: 'var(--neon-blue)',
    marginBottom: '0.3rem',
  },

  slideId: {
    fontSize: '0.9rem',
    fontWeight: 600,
    marginBottom: '0.4rem',
    color: 'var(--text)',
  },

  speakerNotes: {
    fontStyle: 'italic',
    fontSize: '0.8rem',
    color: 'var(--text-dim)',
    lineHeight: 1.4,
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
    fontSize: '0.9rem',
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
    padding: '0.75rem',
    background: 'var(--bg-surface)',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  gmHeader: {
    fontWeight: 900,
    fontSize: '0.8rem',
    letterSpacing: '0.15em',
    color: 'var(--neon-yellow)',
    textTransform: 'uppercase' as const,
  },

  gmAnswer: {
    fontSize: '0.95rem',
    color: 'var(--text)',
    padding: '0.4rem 0.6rem',
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
    flexDirection: 'column',
    gap: '0.4rem',
    padding: '0.5rem 0.6rem',
    background: 'var(--bg-elevated)',
    borderRadius: '10px',
  },

  buzzInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    flexWrap: 'wrap' as const,
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
    flex: 1,
    minHeight: '44px',
    border: 'none',
    borderRadius: '10px',
    background: 'var(--neon-green)',
    color: '#000',
    fontWeight: 700,
    fontSize: '0.8rem',
    cursor: 'pointer',
    touchAction: 'manipulation',
    fontFamily: 'var(--font)',
  },

  bonusBtn: {
    flex: 1,
    minHeight: '44px',
    border: 'none',
    borderRadius: '10px',
    background: 'var(--neon-yellow)',
    color: '#000',
    fontWeight: 700,
    fontSize: '0.8rem',
    cursor: 'pointer',
    touchAction: 'manipulation',
    fontFamily: 'var(--font)',
  },

  incorrectBtn: {
    minWidth: '44px',
    minHeight: '44px',
    border: 'none',
    borderRadius: '10px',
    background: 'var(--neon-red)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    touchAction: 'manipulation',
    fontFamily: 'var(--font)',
  },

  // Team settings
  settingsToggle: {
    padding: '0.6rem',
    background: 'var(--bg-surface)',
    border: '1px solid var(--bg-elevated)',
    borderRadius: '10px',
    color: 'var(--text-dim)',
    fontFamily: 'var(--font)',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    touchAction: 'manipulation',
  },

  teamSettings: {
    padding: '0.75rem',
    background: 'var(--bg-surface)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  teamInputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },

  teamInput: {
    width: '100%',
    padding: '0.6rem 0.75rem',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: 'var(--font)',
    background: 'var(--bg-elevated)',
    border: '2px solid',
    borderRadius: '10px',
    color: 'var(--text)',
    outline: 'none',
  },

  broadcastBtn: {
    padding: '0.6rem',
    background: 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontFamily: 'var(--font)',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    touchAction: 'manipulation',
  },
}
