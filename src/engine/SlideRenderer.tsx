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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem', padding: '2rem' }}>
      <h2 className="slide-subtitle neon-blue">{title}</h2>
      <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', justifyContent: 'center', width: '100%' }}>
        <ComparisonCard item={left} color="var(--neon-pink)" />
        <div style={{ fontSize: '3rem', alignSelf: 'center', color: 'var(--text-muted)' }}>vs</div>
        <ComparisonCard item={right} color="var(--neon-blue)" />
      </div>
    </div>
  )
}

function ComparisonCard({ item, color }: { item: { label: string; emoji?: string; description?: string }; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '35%', textAlign: 'center' }}>
      {item.emoji && <div className="emoji-lg">{item.emoji}</div>}
      <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, color }}>{item.label}</h3>
      {item.description && <p className="slide-body" style={{ color: 'var(--text-dim)' }}>{item.description}</p>}
    </div>
  )
}

/* ── Grid ──────────────────────────────────────────────── */

function GridSlide({ title, items }: { title: string; items: { emoji: string; label?: string }[] }) {
  const cols = items.length <= 4 ? 2 : items.length <= 9 ? 3 : 4
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem', padding: '2rem' }}>
      <h2 className="slide-subtitle neon-blue">{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '2rem', textAlign: 'center' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span className="emoji-lg">{item.emoji}</span>
            {item.label && <span className="slide-caption">{item.label}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Timeline ──────────────────────────────────────────── */

function TimelineSlide({ title, events }: { title: string; events: { year: string; text: string; emoji?: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem', padding: '2rem' }}>
      <h2 className="slide-subtitle neon-blue">{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '70%' }}>
        {events.map((evt, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {evt.emoji && <span className="emoji-md">{evt.emoji}</span>}
            <span className="neon-pink" style={{ fontWeight: 700, fontSize: '1.5rem', minWidth: '5rem' }}>{evt.year}</span>
            <span className="slide-body">{evt.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Emoji Showcase ────────────────────────────────────── */

function EmojiShowcaseSlide({ emoji, title, description, platforms }: { emoji: string; title: string; description: string; platforms?: { platform: string; imageUrl: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1.5rem', textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '10rem', lineHeight: 1 }}>{emoji}</div>
      <h2 className="slide-subtitle neon-pink">{title}</h2>
      <p className="slide-body" style={{ maxWidth: '60%', color: 'var(--text-dim)' }}>{description}</p>
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '2rem', textAlign: 'center', padding: '2rem' }}>
      <h2 className="slide-subtitle neon-blue">¡Únete al Juego!</h2>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem' }}>
        <p style={{ color: '#000', fontSize: '2rem', fontWeight: 900 }}>{roomCode}</p>
      </div>
      <p className="slide-caption">Ingresa el código en la URL o escanea el código QR</p>
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
