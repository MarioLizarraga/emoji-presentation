import { QRCodeSVG } from 'qrcode.react'
import type { SlideContent } from '../slides/types'

interface SlideRendererProps {
  content: SlideContent
}

export function SlideRenderer({ content }: SlideRendererProps) {
  switch (content.type) {
    case 'title':
      return <TitleSlide {...content} />
    case 'text':
      return <TextSlide {...content} />
    case 'stat':
      return <StatSlide {...content} />
    case 'comparison':
      return <ComparisonSlide {...content} />
    case 'grid':
      return <GridSlide {...content} />
    case 'timeline':
      return <TimelineSlide {...content} />
    case 'emoji-showcase':
      return <EmojiShowcaseSlide {...content} />
    case 'game-reveal':
      return <GameRevealSlide {...content} />
    case 'qr-lobby':
      return <QrLobbySlide {...content} />
    case 'quiz-question':
      return <QuizQuestionSlide {...content} />
    case 'quiz-multichoice':
      return <QuizMultichoiceSlide {...content} />
    case 'quiz-platform':
      return <QuizPlatformSlide {...content} />
    case 'scoreboard-final':
      return <ScoreboardFinalSlide />
    case 'custom':
      return <>{content.render()}</>
  }
}

/* ── Title ─────────────────────────────────────────────── */

function TitleSlide({ title, subtitle, emoji }: { title: string; subtitle?: string; emoji?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1.5rem', textAlign: 'center', padding: '2rem' }}>
      {emoji && <div className="emoji-xl">{emoji}</div>}
      <h1 className="slide-title neon-pink">{title}</h1>
      {subtitle && <p className="slide-subtitle" style={{ color: 'var(--text-dim)' }}>{subtitle}</p>}
    </div>
  )
}

/* ── Text ──────────────────────────────────────────────── */

function TextSlide({ title, body, emoji }: { title: string; body: string; emoji?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem', textAlign: 'center', padding: '3rem', maxWidth: '80%', margin: '0 auto' }}>
      {emoji && <div className="emoji-lg">{emoji}</div>}
      <h2 className="slide-subtitle neon-blue">{title}</h2>
      <p className="slide-body">{body}</p>
    </div>
  )
}

/* ── Stat ──────────────────────────────────────────────── */

function StatSlide({ value, label, sublabel }: { value: string; label: string; sublabel?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
      <div className="slide-title neon-purple" style={{ fontSize: 'clamp(5rem, 12vw, 12rem)', fontWeight: 900, lineHeight: 1 }}>{value}</div>
      <p className="slide-subtitle">{label}</p>
      {sublabel && <p className="slide-caption">{sublabel}</p>}
    </div>
  )
}

/* ── Comparison ────────────────────────────────────────── */

function ComparisonSlide({ title, left, right }: { title: string; left: { label: string; emoji?: string; description?: string }; right: { label: string; emoji?: string; description?: string } }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      gap: '2rem',
      padding: '2rem 3rem',
      boxSizing: 'border-box',
    }}>
      <h2 className="slide-subtitle neon-blue" style={{ flexShrink: 0, textAlign: 'center' }}>{title}</h2>
      <div style={{
        display: 'flex',
        gap: '3rem',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxHeight: 'calc(100% - 80px)',
      }}>
        <ComparisonCard item={left} color="var(--neon-pink)" />
        <div style={{
          fontSize: '2.5rem',
          color: 'var(--text-muted)',
          fontWeight: 900,
          flexShrink: 0,
        }}>vs</div>
        <ComparisonCard item={right} color="var(--neon-blue)" />
      </div>
    </div>
  )
}

function ComparisonCard({
  item,
  color,
}: {
  item: { label: string; emoji?: string; image?: string; description?: string; retro?: boolean }
  color: string
}) {
  const isRetro = item.retro
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      flex: 1,
      maxWidth: '40%',
      textAlign: 'center',
      minHeight: 0,
    }}>
      {item.image ? (
        <div style={{
          padding: '0.5rem',
          borderRadius: '8px',
        }}>
          <img
            src={item.image}
            alt={item.label}
            style={{
              width: '10rem',
              height: '10rem',
              objectFit: 'contain',
              imageRendering: isRetro ? 'pixelated' : 'auto',
              display: 'block',
              filter: isRetro ? 'invert(1) brightness(1.5)' : undefined,
            }}
          />
        </div>
      ) : item.emoji ? (
        <div style={{
          fontSize: isRetro ? '3rem' : '8rem',
          lineHeight: 1,
          filter: isRetro
            ? 'grayscale(1) contrast(1.8) brightness(0.9) saturate(0)'
            : undefined,
          opacity: isRetro ? 0.9 : 1,
          padding: isRetro ? '1rem' : undefined,
          background: isRetro ? 'rgba(100,200,100,0.08)' : undefined,
          borderRadius: isRetro ? '8px' : undefined,
          border: isRetro ? '1px dashed rgba(120,200,120,0.3)' : undefined,
          fontFamily: isRetro ? 'monospace' : undefined,
        }}>
          {item.emoji}
        </div>
      ) : null}
      <h3 style={{
        fontSize: 'clamp(1.2rem, 2.4vw, 2.2rem)',
        fontWeight: 700,
        color,
        lineHeight: 1.2,
        fontFamily: isRetro ? 'monospace' : undefined,
      }}>
        {item.label}
      </h3>
      {item.description && (
        <p style={{
          fontSize: 'clamp(0.95rem, 1.6vw, 1.5rem)',
          color: 'var(--text-dim)',
          lineHeight: 1.4,
        }}>
          {item.description}
        </p>
      )}
    </div>
  )
}

/* ── Grid ──────────────────────────────────────────────── */

// CSS filter that makes modern emojis look like 1999 pixel-art monochrome icons
const RETRO_FILTER = 'grayscale(1) contrast(1.6) brightness(0.95) saturate(0)'

function GridSlide({
  title,
  items,
  retro,
  subtitle,
}: {
  title: string
  items: { emoji: string; label?: string }[]
  retro?: boolean
  subtitle?: string
}) {
  // Calculate optimal columns/rows to fit 16:9 viewport (1920x1080)
  // Prefer wider layouts for horizontal screens
  const count = items.length
  let cols: number
  if (count <= 4) cols = 2
  else if (count <= 9) cols = 3
  else if (count <= 16) cols = 4
  else if (count <= 25) cols = 5
  else if (count <= 36) cols = 6
  else if (count <= 49) cols = 7
  else if (count <= 64) cols = 8
  else if (count <= 81) cols = 9
  else cols = 10

  // Scale emoji size based on how much space each cell has
  // With 60 items in 10 cols × 6 rows on a 1920x1080 slide (minus title + padding ~200px)
  // Each cell gets ~190px × ~150px
  const emojiSize = count <= 16 ? '4rem' : count <= 36 ? '3rem' : count <= 64 ? '2.5rem' : '2rem'
  const labelSize = count <= 36 ? '0.9rem' : '0.7rem'
  const showLabels = count <= 49 // hide labels for very large grids
  const gap = count <= 16 ? '2rem' : count <= 36 ? '1rem' : '0.5rem'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      gap: '1rem',
      padding: '2rem 3rem',
      boxSizing: 'border-box',
    }}>
      <h2 className="slide-subtitle neon-blue" style={{ flexShrink: 0, textAlign: 'center' }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          flexShrink: 0,
          margin: 0,
          textAlign: 'center',
        }}>
          {subtitle}
        </p>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap,
        width: '100%',
        maxWidth: '90%',
        placeItems: 'center',
      }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            textAlign: 'center',
          }}>
            <span style={{
              fontSize: emojiSize,
              lineHeight: 1,
              filter: retro ? RETRO_FILTER : undefined,
              opacity: retro ? 0.85 : 1,
            }}>
              {item.emoji}
            </span>
            {showLabels && item.label && (
              <span style={{
                fontSize: labelSize,
                color: 'var(--text-dim)',
                lineHeight: 1.1,
                fontFamily: retro ? 'monospace' : undefined,
              }}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Timeline ──────────────────────────────────────────── */

function TimelineSlide({ title, events }: { title: string; events: { year: string; text: string; emoji?: string }[] }) {
  const itemCount = events.length
  const fontSize = itemCount <= 4 ? '1.8rem' : '1.5rem'
  const emojiSize = itemCount <= 4 ? '3rem' : '2.5rem'
  const yearSize = itemCount <= 4 ? '1.8rem' : '1.4rem'
  const gap = itemCount <= 4 ? '1.5rem' : '1rem'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      gap: '1.5rem',
      padding: '2rem 3rem',
      boxSizing: 'border-box',
    }}>
      <h2 className="slide-subtitle neon-blue" style={{ flexShrink: 0, textAlign: 'center' }}>
        {title}
      </h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap,
        width: '100%',
        maxWidth: '85%',
      }}>
        {events.map((evt, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}>
            {evt.emoji && (
              <span style={{ fontSize: emojiSize, lineHeight: 1, flexShrink: 0 }}>{evt.emoji}</span>
            )}
            <span className="neon-pink" style={{
              fontWeight: 700,
              fontSize: yearSize,
              minWidth: '6rem',
              flexShrink: 0,
            }}>
              {evt.year}
            </span>
            <span style={{ fontSize, lineHeight: 1.3, flex: 1 }}>{evt.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Emoji Showcase ────────────────────────────────────── */

function EmojiShowcaseSlide({ emoji, title, description, image, imageFilter, platforms }: { emoji: string; title: string; description: string; image?: string; imageFilter?: string; platforms?: { platform: string; imageUrl: string }[] }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: '1rem',
      textAlign: 'center',
      padding: '2rem',
    }}>
      {image ? (
        <img
          src={image}
          alt={title}
          style={{
            maxHeight: '55%',
            maxWidth: '80%',
            objectFit: 'contain',
            borderRadius: '12px',
            filter: imageFilter || undefined,
            imageRendering: 'pixelated',
          }}
        />
      ) : (
        <div style={{ fontSize: '10rem', lineHeight: 1 }}>{emoji}</div>
      )}
      <h2 className="slide-subtitle neon-pink">{title}</h2>
      <p className="slide-body" style={{ maxWidth: '70%', color: 'var(--text-dim)' }}>{description}</p>
      {platforms && platforms.length > 0 && (
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          {platforms.map((p, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <img src={p.imageUrl} alt={p.platform} style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
              <span className="slide-caption">{p.platform}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Game Reveal ───────────────────────────────────────── */

function GameRevealSlide({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem' }}>
      <h1 className="slide-title neon-green" style={{ textAlign: 'center' }}>{text}</h1>
    </div>
  )
}

/* ── QR Lobby ──────────────────────────────────────────── */

function QrLobbySlide({ roomCode }: { roomCode: string }) {
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin + import.meta.env.BASE_URL
    : ''
  const playerUrl = `${baseUrl}#/play?room=${roomCode}`

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: '2rem',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 className="slide-title neon-pink animate-flicker" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>
        ESCANEA PARA JUGAR
      </h1>
      {roomCode && (
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          boxShadow: 'var(--glow-pink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <QRCodeSVG value={playerUrl} size={360} level="H" />
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className="slide-caption">Sala:</span>
        <span className="slide-subtitle neon-blue" style={{
          letterSpacing: '8px',
          fontWeight: 900,
          fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
        }}>
          {roomCode || '————'}
        </span>
      </div>
    </div>
  )
}

/* ── Quiz Question ─────────────────────────────────────── */

function QuizQuestionSlide({ category, emojis }: { category: string; emojis: string[]; answer: string; answerEmoji?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem', textAlign: 'center', padding: '2rem' }}>
      <p className="slide-caption" style={{ textTransform: 'uppercase', letterSpacing: '0.2em' }}>{category}</p>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {emojis.map((e, i) => (
          <span key={i} className="emoji-xl">{e}</span>
        ))}
      </div>
      <p className="slide-body" style={{ color: 'var(--neon-yellow)' }}>¿Qué significan estos emojis?</p>
    </div>
  )
}

/* ── Quiz Multichoice ──────────────────────────────────── */

function QuizMultichoiceSlide({ question, emoji, options }: { question: string; emoji: string; options: string[]; correctIndex: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem', textAlign: 'center', padding: '2rem' }}>
      <div className="emoji-xl">{emoji}</div>
      <h2 className="slide-subtitle">{question}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '60%' }}>
        {options.map((opt, i) => (
          <div key={i} style={{ padding: '1.5rem', background: 'var(--bg-elevated)', borderRadius: '1rem', fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 600 }}>
            {String.fromCharCode(65 + i)}. {opt}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Quiz Platform ─────────────────────────────────────── */

function QuizPlatformSlide({ emoji, platforms }: { emoji: string; platforms: { platform: string; imageUrl: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem', textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '6rem', lineHeight: 1 }}>{emoji}</div>
      <h2 className="slide-subtitle neon-blue">Mismo Emoji, Diferentes Versiones</h2>
      <div style={{ display: 'flex', gap: '3rem', marginTop: '1rem' }}>
        {platforms.map((p, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <img src={p.imageUrl} alt={p.platform} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            <span className="slide-caption" style={{ textTransform: 'capitalize' }}>{p.platform}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Scoreboard Final ──────────────────────────────────── */

function ScoreboardFinalSlide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem', textAlign: 'center', padding: '2rem' }}>
      <div className="emoji-xl">🏆</div>
      <h1 className="slide-title neon-yellow">Puntaje Final</h1>
      <p className="slide-body" style={{ color: 'var(--text-dim)' }}>El marcador aparecerá aquí</p>
    </div>
  )
}
