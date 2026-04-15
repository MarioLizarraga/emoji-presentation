import { useState } from 'react'
import { usePlayer } from '../realtime/usePlayer'
import { Scoreboard } from '../components/Scoreboard'

interface BuzzerViewProps {
  roomCode: string
}

export function BuzzerView({ roomCode }: BuzzerViewProps) {
  const { connected, gameState, hasBuzzed, buzz, join } = usePlayer(roomCode)

  const [playerName, setPlayerName] = useState('')
  const [team, setTeam] = useState<'red' | 'blue' | null>(null)
  const [joined, setJoined] = useState(false)

  const handleJoin = () => {
    if (!playerName.trim() || !team) return
    join(playerName.trim(), team)
    setJoined(true)
  }

  // Game ended state
  if (joined && gameState.gameEnded) {
    const winner = gameState.winner
    return (
      <div style={{ ...styles.container, background: 'var(--bg)' }}>
        <div style={styles.endScreen}>
          <div style={{ fontSize: '5rem' }}>&#x1F3C6;</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--neon-yellow)' }}>
            Game Over!
          </h1>
          <div style={{ fontSize: '1.2rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
            {winner === 'tie'
              ? "It's a tie!"
              : winner === 'red'
                ? 'Team Fire wins!'
                : 'Team Ice wins!'}
          </div>
          <Scoreboard
            redScore={gameState.scores.red}
            blueScore={gameState.scores.blue}
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
            {team === 'red' ? 'Team Fire' : 'Team Ice'}
          </span>
        </div>

        {/* Scoreboard */}
        <Scoreboard
          redScore={gameState.scores.red}
          blueScore={gameState.scores.blue}
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
              if (team) buzz(playerName, team)
            }}
            disabled={hasBuzzed}
            style={{
              width: 'min(80vw, 300px)',
              height: 'min(80vw, 300px)',
              borderRadius: '50%',
              border: 'none',
              cursor: hasBuzzed ? 'not-allowed' : 'pointer',
              touchAction: 'manipulation',
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              fontWeight: 900,
              fontFamily: 'var(--font)',
              letterSpacing: '0.1em',
              color: '#fff',
              background: hasBuzzed
                ? '#333'
                : team === 'red'
                  ? 'radial-gradient(circle at 40% 40%, #ff6666, #ff4444, #cc0000)'
                  : 'radial-gradient(circle at 40% 40%, #6688ff, #4488ff, #0044cc)',
              boxShadow: hasBuzzed
                ? 'none'
                : `0 0 30px ${teamColor}66, 0 0 60px ${teamColor}33, inset 0 -4px 12px rgba(0,0,0,0.3)`,
              transition: 'transform 0.1s, box-shadow 0.2s, background 0.3s',
              transform: hasBuzzed ? 'scale(0.95)' : 'scale(1)',
              opacity: hasBuzzed ? 0.5 : 1,
            }}
          >
            {hasBuzzed ? 'BUZZED!' : 'BUZZ'}
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
            {gameState.lastReveal.correct ? 'Correct!' : 'Wrong!'}{' '}
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
          Join the Game
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          Room: <strong style={{ color: 'var(--neon-purple)', letterSpacing: '0.1em' }}>{roomCode}</strong>
        </p>

        {/* Name input */}
        <input
          type="text"
          placeholder="Your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          maxLength={20}
          style={styles.nameInput}
        />

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
            &#x1F534; Team Fire
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
            &#x1F535; Team Ice
          </button>
        </div>

        {/* Join button */}
        <button
          onClick={handleJoin}
          disabled={!playerName.trim() || !team}
          style={{
            ...styles.joinButton,
            opacity: !playerName.trim() || !team ? 0.4 : 1,
            cursor: !playerName.trim() || !team ? 'not-allowed' : 'pointer',
          }}
        >
          JOIN
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
          {connected ? 'Connected' : 'Connecting...'}
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
