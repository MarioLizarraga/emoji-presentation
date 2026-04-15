import { QRCodeSVG } from 'qrcode.react'

interface QRProps {
  roomCode: string
}

export function QRDisplay({ roomCode }: QRProps) {
  const baseUrl = window.location.origin + import.meta.env.BASE_URL
  const url = `${baseUrl}#/play?room=${roomCode}`

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '2rem',
      }}
    >
      <h1
        className="slide-title neon-pink animate-flicker"
        style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
      >
        SCAN TO PLAY
      </h1>
      <div
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: 'var(--glow-pink)',
        }}
      >
        <QRCodeSVG value={url} size={280} level="H" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className="slide-caption">Room:</span>
        <span
          className="slide-subtitle neon-blue"
          style={{ letterSpacing: '8px', fontWeight: 900 }}
        >
          {roomCode}
        </span>
      </div>
      <div
        className="slide-caption"
        style={{ maxWidth: '500px', textAlign: 'center' }}
      >
        Or go to: {url}
      </div>
    </div>
  )
}
