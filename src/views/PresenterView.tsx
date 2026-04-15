import { useState, useCallback, useMemo } from 'react'
import { SlideEngine } from '../engine/SlideEngine'
import { QRDisplay } from '../components/QRCode'
import { Scoreboard } from '../components/Scoreboard'
import { usePresenter } from '../realtime/usePresenter'
import { allSlides } from '../slides/slideData'
import type { BuzzEvent } from '../realtime/usePresenter'

const GAME_SLIDE_TYPES = new Set(['qr-lobby', 'quiz-question', 'scoreboard-final'])

export function PresenterView() {
  const {
    roomCode,
    connected,
    players,
    buzzes,
    clearBuzzes,
    sendSlide,
    updateScore,
    endGame,
  } = usePresenter()

  const [scores, setScores] = useState({ red: 0, blue: 0 })
  const [gameActive, setGameActive] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [showQR, setShowQR] = useState(false)

  // Inject roomCode into the qr-lobby slide
  const slides = useMemo(
    () =>
      allSlides.map((s) =>
        s.content.type === 'qr-lobby'
          ? { ...s, content: { ...s.content, roomCode } }
          : s,
      ),
    [roomCode],
  )

  // Handle slide changes from SlideEngine
  const handleSlideChange = useCallback(
    (index: number) => {
      setCurrentSlideIndex(index)
      sendSlide(index)
      clearBuzzes()

      const slide = slides[index]
      if (!slide) return

      const isGameSlide = GAME_SLIDE_TYPES.has(slide.content.type)
      if (isGameSlide && !gameActive) {
        setGameActive(true)
      }

      // Show QR overlay on lobby slide
      setShowQR(slide.content.type === 'qr-lobby')

      // On scoreboard-final, broadcast end game
      if (slide.content.type === 'scoreboard-final') {
        const winner: 'red' | 'blue' | 'tie' =
          scores.red > scores.blue ? 'red' : scores.blue > scores.red ? 'blue' : 'tie'
        endGame(scores, winner)
      }
    },
    [sendSlide, clearBuzzes, slides, gameActive, scores, endGame],
  )

  // Award or deny points when a buzz is handled
  const handleBuzzResult = useCallback(
    (buzz: BuzzEvent, correct: boolean) => {
      if (correct) {
        const newTotal = scores[buzz.team] + 100
        const newScores = { ...scores, [buzz.team]: newTotal }
        setScores(newScores)
        updateScore(buzz.team, 100, newTotal)
      }
      // Remove handled buzz (keep the rest)
      clearBuzzes()
    },
    [scores, updateScore, clearBuzzes],
  )

  // Determine if the current slide is the QR lobby
  const currentSlide = slides[currentSlideIndex]
  const isLobbySlide = currentSlide?.content.type === 'qr-lobby'

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Main slide engine (always rendered, but may be covered by QR overlay) */}
      <SlideEngine
        slides={slides}
        onSlideChange={handleSlideChange}
      />

      {/* QR overlay on lobby slide */}
      {(showQR || isLobbySlide) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 30,
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <QRDisplay roomCode={roomCode} />
          {/* Player count */}
          {players.length > 0 && (
            <div
              style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                background: 'var(--bg-surface)',
                borderRadius: '12px',
                fontSize: '1rem',
                fontFamily: 'var(--font)',
                color: 'var(--text)',
              }}
            >
              <span style={{ color: 'var(--neon-green)', fontWeight: 700 }}>
                {players.length}
              </span>
              <span style={{ color: 'var(--text-dim)' }}>
                player{players.length !== 1 ? 's' : ''} joined
              </span>
            </div>
          )}
        </div>
      )}

      {/* Scoreboard overlay during game mode (not on lobby) */}
      {gameActive && !showQR && !isLobbySlide && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 25,
          }}
        >
          <Scoreboard redScore={scores.red} blueScore={scores.blue} />
        </div>
      )}

      {/* Buzz notifications during game mode */}
      {gameActive && buzzes.length > 0 && !showQR && (
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          {buzzes.map((buzz, i) => (
            <div
              key={`${buzz.name}-${buzz.timestamp}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(10, 10, 15, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '14px',
                border: `2px solid ${buzz.team === 'red' ? '#ff4444' : '#4488ff'}`,
                boxShadow: `0 0 20px ${buzz.team === 'red' ? '#ff444444' : '#4488ff44'}`,
                fontFamily: 'var(--font)',
                minWidth: '300px',
              }}
            >
              {/* First buzzer badge */}
              {i === 0 && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.4rem',
                    background: 'var(--neon-yellow)',
                    color: '#000',
                    borderRadius: '4px',
                  }}
                >
                  1st
                </span>
              )}

              {/* Player name */}
              <span
                style={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: buzz.team === 'red' ? '#ff4444' : '#4488ff',
                  flex: 1,
                }}
              >
                {buzz.name}
              </span>

              {/* Action buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleBuzzResult(buzz, true)
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'var(--neon-green)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font)',
                }}
              >
                +100
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleBuzzResult(buzz, false)
                }}
                style={{
                  padding: '0.5rem 0.75rem',
                  background: 'var(--neon-red)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font)',
                }}
              >
                &#x2716;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Room code indicator (top-right corner) */}
      {connected && !showQR && (
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1.5rem',
            zIndex: 25,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.75rem',
            background: 'rgba(10, 10, 15, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '8px',
            fontFamily: 'var(--font)',
            fontSize: '0.8rem',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              display: 'inline-block',
              backgroundColor: 'var(--neon-green)',
              boxShadow: '0 0 6px var(--neon-green)',
            }}
          />
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{roomCode}</span>
          <span style={{ color: 'var(--text-muted)' }}>
            ({players.length} player{players.length !== 1 ? 's' : ''})
          </span>
        </div>
      )}
    </div>
  )
}
