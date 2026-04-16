import { useState } from 'react'
import { usePlayer } from '../realtime/usePlayer'
import { Scoreboard } from '../components/Scoreboard'
import { allSlides } from '../slides/slideData'

interface BuzzerViewProps {
  roomCode: string
}

/**
 * Filters a string to keep only emoji characters.
 * Allows: Extended_Pictographic (core emojis), Emoji_Modifier (skin tones),
 * Regional_Indicator (for flags), ZWJ (for compound emojis like 👨‍👩‍👦),
 * and Variation_Selector (U+FE0F).
 */
function keepOnlyEmojis(input: string): string {
  const matches = input.match(
    /(\p{Extended_Pictographic}|\p{Emoji_Modifier}|\p{Regional_Indicator}|\u200d|\uFE0F)/gu,
  )
  return matches ? matches.join('') : ''
}

/** Counts actual emoji "grapheme clusters" — multi-codepoint emojis count as 1 */
function countEmojis(input: string): number {
  // Use Intl.Segmenter if available (modern browsers)
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const seg = new (Intl as { Segmenter: new (locale: string, opts: { granularity: string }) => { segment: (s: string) => Iterable<unknown> } }).Segmenter('es', { granularity: 'grapheme' })
    let count = 0
    for (const _ of seg.segment(input)) count++
    return count
  }
  // Fallback: count code points
  return Array.from(input).length
}

export function BuzzerView({ roomCode }: BuzzerViewProps) {
  const { connected, gameState, hasBuzzed, buzz, join } = usePlayer(roomCode)

  const [playerName, setPlayerName] = useState('')
  const [team, setTeam] = useState<'red' | 'blue' | null>(null)
  const [joined, setJoined] = useState(false)
  const [nameInputFocused, setNameInputFocused] = useState(false)

  const redTeamName = gameState.teamNames.red
  const blueTeamName = gameState.teamNames.blue

  const emojiCount = countEmojis(playerName)
  const canJoin = emojiCount > 0 && !!team

  const handleJoin = () => {
    if (!canJoin || !team) return
    join(playerName, team)
    setJoined(true)
  }

  const handleNameChange = (raw: string) => {
    // Strip anything that isn't an emoji. Cap at 5 emojis.
    const filtered = keepOnlyEmojis(raw)
    // Limit by grapheme clusters (so "👨‍👩‍👦" is 1 emoji, not 5 codepoints)
    const graphemes = Array.from(
      typeof Intl !== 'undefined' && 'Segmenter' in Intl
        ? new (Intl as { Segmenter: new (locale: string, opts: { granularity: string }) => { segment: (s: string) => Iterable<{ segment: string }> } }).Segmenter('es', { granularity: 'grapheme' }).segment(filtered)
        : [...filtered].map((c) => ({ segment: c })),
    )
    const limited = graphemes.slice(0, 5).map((g) => g.segment).join('')
    setPlayerName(limited)
  }

  // Game ended state
  if (joined && gameState.gameEnded) {
    const winner = gameState.winner
    return (
      <div style={{ ...styles.container, background: 'var(--bg)' }}>
        <div style={styles.endScreen}>
          <div style={{ fontSize: '5rem' }}>&#x1F3C6;</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--neon-yellow)' }}>
            ¡Fin del Juego!
          </h1>
          <div style={{ fontSize: '1.2rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
            {winner === 'tie'
              ? '¡Es un empate!'
              : winner === 'red'
                ? `¡${redTeamName} gana!`
                : `¡${blueTeamName} gana!`}
          </div>
          <Scoreboard
            redScore={gameState.scores.red}
            blueScore={gameState.scores.blue}
            redName={redTeamName}
            blueName={blueTeamName}
            style={{ marginTop: '2rem', width: '100%' }}
          />
        </div>
      </div>
    )
  }

  // Joined + game active: buzzer mode
  if (joined) {
    const teamColor = team === 'red' ? '#ff4444' : '#4488ff'
    const teamGradient =
      team === 'red'
        ? 'radial-gradient(circle at center, #ff444422 0%, transparent 70%)'
        : 'radial-gradient(circle at center, #4488ff22 0%, transparent 70%)'

    // Only allow buzzing on quiz-question slides (prevents pre-buzz cheating)
    const currentPresenterSlide = allSlides[gameState.currentSlide]
    const isQuestionActive = currentPresenterSlide?.content.type === 'quiz-question'
    const buzzerDisabled = hasBuzzed || !isQuestionActive

    return (
      <div
        style={{
          ...styles.container,
          background: `${teamGradient}, var(--bg)`,
        }}
      >
        {/* Status bar */}
        <div style={styles.statusBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                display: 'inline-block',
                backgroundColor: connected ? 'var(--neon-green)' : 'var(--neon-red)',
                boxShadow: connected ? '0 0 8px var(--neon-green)' : '0 0 8px var(--neon-red)',
              }}
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              {playerName}
            </span>
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: '0.8rem',
              color: teamColor,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {team === 'red' ? redTeamName : blueTeamName}
          </span>
        </div>

        {/* Scoreboard */}
        <Scoreboard
          redScore={gameState.scores.red}
          blueScore={gameState.scores.blue}
          redName={redTeamName}
          blueName={blueTeamName}
          style={{ width: '100%' }}
        />

        {/* Buzzer button */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => {
              if (team && !buzzerDisabled) {
                buzz(playerName, team)
                // Haptic feedback (vibration) on mobile
                if (navigator.vibrate) navigator.vibrate(100)
                // Play a beep sound using Web Audio API
                try {
                  const ctx = new AudioContext()
                  const osc = ctx.createOscillator()
                  const gain = ctx.createGain()
                  osc.connect(gain)
                  gain.connect(ctx.destination)
                  osc.frequency.value = team === 'red' ? 880 : 660
                  gain.gain.value = 0.3
                  osc.start()
                  osc.stop(ctx.currentTime + 0.15)
                } catch (_e) { /* ignore if audio not available */ }
              }
            }}
            disabled={buzzerDisabled}
            style={{
              width: 'min(80vw, 300px)',
              height: 'min(80vw, 300px)',
              borderRadius: '50%',
              border: 'none',
              cursor: buzzerDisabled ? 'not-allowed' : 'pointer',
              touchAction: 'manipulation',
              fontSize: 'clamp(1.2rem, 4.5vw, 2.5rem)',
              fontWeight: 900,
              fontFamily: 'var(--font)',
              letterSpacing: '0.1em',
              color: '#fff',
              background: buzzerDisabled
                ? '#222'
                : team === 'red'
                  ? 'radial-gradient(circle at 40% 40%, #ff6666, #ff4444, #cc0000)'
                  : 'radial-gradient(circle at 40% 40%, #6688ff, #4488ff, #0044cc)',
              boxShadow: buzzerDisabled
                ? 'none'
                : `0 0 30px ${teamColor}66, 0 0 60px ${teamColor}33, inset 0 -4px 12px rgba(0,0,0,0.3)`,
              transition: 'transform 0.1s, box-shadow 0.2s, background 0.3s',
              transform: buzzerDisabled ? 'scale(0.95)' : 'scale(1)',
              opacity: buzzerDisabled ? 0.45 : 1,
              padding: '1rem',
              lineHeight: 1.2,
            }}
          >
            {hasBuzzed
              ? '¡BUZZEADO!'
              : !isQuestionActive
                ? 'Esperando pregunta...'
                : 'BUZZ'}
          </button>
        </div>

        {/* Last reveal info */}
        {gameState.lastReveal && (
          <div
            style={{
              textAlign: 'center',
              padding: '0.75rem',
              background: gameState.lastReveal.correct
                ? 'rgba(0, 255, 136, 0.15)'
                : 'rgba(255, 0, 68, 0.15)',
              borderRadius: '12px',
              fontSize: '1rem',
              color: gameState.lastReveal.correct ? 'var(--neon-green)' : 'var(--neon-red)',
              fontWeight: 600,
            }}
          >
            {gameState.lastReveal.correct ? '¡Correcto!' : '¡Incorrecto!'}{' '}
            {gameState.lastReveal.answer}
          </div>
        )}
      </div>
    )
  }

  // Not joined: join screen
  return (
    <div style={styles.container}>
      <div style={styles.joinScreen}>
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>&#x1F3AE;</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text)' }}>
          Unirse al Juego
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          Sala: <strong style={{ color: 'var(--neon-purple)', letterSpacing: '0.1em' }}>{roomCode}</strong>
        </p>

        {/* Emoji-only name input */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <input
            type="text"
            placeholder={nameInputFocused ? '' : '😀 🦄 🔥'}
            value={playerName}
            onChange={(e) => handleNameChange(e.target.value)}
            onFocus={() => setNameInputFocused(true)}
            onBlur={() => setNameInputFocused(false)}
            inputMode="text"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            style={{
              ...styles.nameInput,
              letterSpacing: '0.2em',
              fontSize: '1.8rem',
              minHeight: '3.5rem',
              borderColor: nameInputFocused ? 'var(--neon-purple)' : 'var(--bg-surface)',
            }}
          />
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            margin: 0,
            fontStyle: 'italic',
          }}>
            Solo emojis 🎭 — máximo 5. Abre el teclado de emojis de tu celular.
          </p>
        </div>

        {/* Team selection instruction */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.2rem',
            width: '100%',
            marginTop: '0.5rem',
          }}
        >
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            ⬇️ Ahora elige tu equipo ⬇️
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            Asegúrate de escoger el mismo equipo que tus compañeros
          </p>
        </div>

        {/* Team selection */}
        <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
          <button
            onClick={() => setTeam('red')}
            style={{
              ...styles.teamButton,
              background: team === 'red' ? '#ff4444' : 'var(--bg-elevated)',
              color: team === 'red' ? '#fff' : '#ff4444',
              border: team === 'red' ? '2px solid #ff4444' : '2px solid #ff444444',
              boxShadow: team === 'red' ? '0 0 20px #ff444444' : 'none',
            }}
          >
            &#x1F534; {redTeamName}
          </button>
          <button
            onClick={() => setTeam('blue')}
            style={{
              ...styles.teamButton,
              background: team === 'blue' ? '#4488ff' : 'var(--bg-elevated)',
              color: team === 'blue' ? '#fff' : '#4488ff',
              border: team === 'blue' ? '2px solid #4488ff' : '2px solid #4488ff44',
              boxShadow: team === 'blue' ? '0 0 20px #4488ff44' : 'none',
            }}
          >
            &#x1F535; {blueTeamName}
          </button>
        </div>

        {/* Join button */}
        <button
          onClick={handleJoin}
          disabled={!canJoin}
          style={{
            ...styles.joinButton,
            opacity: !canJoin ? 0.4 : 1,
            cursor: !canJoin ? 'not-allowed' : 'pointer',
          }}
        >
          UNIRSE
        </button>

        {/* Connection status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              display: 'inline-block',
              backgroundColor: connected ? 'var(--neon-green)' : 'var(--neon-red)',
            }}
          />
          {connected ? 'Conectado' : 'Conectando...'}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'var(--font)',
    color: 'var(--text)',
    padding: '1rem',
    gap: '0.75rem',
    maxWidth: '428px',
    margin: '0 auto',
  },

  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    background: 'var(--bg-surface)',
    borderRadius: '12px',
  },

  joinScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.25rem',
    flex: 1,
    padding: '2rem 1rem',
  },

  endScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    flex: 1,
    textAlign: 'center',
    padding: '2rem',
  },

  nameInput: {
    width: '100%',
    padding: '0.9rem 1rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    fontFamily: 'var(--font)',
    background: 'var(--bg-elevated)',
    border: '2px solid var(--bg-surface)',
    borderRadius: '14px',
    color: 'var(--text)',
    outline: 'none',
    textAlign: 'center',
  },

  teamButton: {
    flex: 1,
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: 700,
    fontFamily: 'var(--font)',
    borderRadius: '14px',
    cursor: 'pointer',
    touchAction: 'manipulation',
    transition: 'all 0.2s',
  },

  joinButton: {
    width: '100%',
    padding: '1rem',
    fontSize: '1.2rem',
    fontWeight: 900,
    fontFamily: 'var(--font)',
    letterSpacing: '0.15em',
    background: 'linear-gradient(135deg, var(--neon-pink), var(--neon-purple))',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    touchAction: 'manipulation',
    transition: 'opacity 0.2s',
  },
}
