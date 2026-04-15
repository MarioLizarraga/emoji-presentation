import { useSearchParams } from 'react-router-dom'
import { BuzzerView } from '../game/BuzzerView'

export function PlayerView() {
  const [params] = useSearchParams()
  const roomCode = params.get('room') || ''

  if (!roomCode) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font)',
          color: 'var(--text)',
          background: 'var(--bg)',
          padding: '2rem',
          textAlign: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ fontSize: '3rem' }}>&#x26A0;&#xFE0F;</div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>No Room Code</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.5 }}>
          Scan the QR code on the presentation screen or open this page with a room code:
        </p>
        <code
          style={{
            display: 'block',
            padding: '0.5rem 1rem',
            background: 'var(--bg-elevated)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: 'var(--neon-purple)',
          }}
        >
          /#/play?room=XXXX
        </code>
      </div>
    )
  }

  return <BuzzerView roomCode={roomCode} />
}
