import type React from 'react'

/* ── Position & Transition ─────────────────────────────── */

export interface SlidePosition {
  x: number
  y: number
  scale: number
  rotation: number
}

export interface TransitionConfig {
  id: string
  duration: number
  emoji?: string
  variant?: string
}

/* ── Slide Content Union ───────────────────────────────── */

export type SlideContent =
  | { type: 'title'; title: string; subtitle?: string; emoji?: string }
  | { type: 'text'; title: string; body: string; emoji?: string }
  | { type: 'comparison'; title: string; left: ComparisonItem; right: ComparisonItem }
  | { type: 'grid'; title: string; items: GridItem[] }
  | { type: 'timeline'; title: string; events: TimelineEvent[] }
  | { type: 'stat'; value: string; label: string; sublabel?: string }
  | { type: 'emoji-showcase'; emoji: string; title: string; description: string; platforms?: PlatformRender[] }
  | { type: 'game-reveal'; text: string }
  | { type: 'qr-lobby'; roomCode: string }
  | { type: 'quiz-question'; category: string; emojis: string[]; answer: string; answerEmoji?: string }
  | { type: 'quiz-multichoice'; question: string; emoji: string; options: string[]; correctIndex: number }
  | { type: 'quiz-platform'; emoji: string; platforms: PlatformRender[] }
  | { type: 'scoreboard-final' }
  | { type: 'custom'; render: () => React.ReactNode }

/* ── Supporting Types ──────────────────────────────────── */

export interface ComparisonItem {
  label: string
  image?: string
  emoji?: string
  description?: string
}

export interface GridItem {
  emoji: string
  label?: string
}

export interface TimelineEvent {
  year: string
  text: string
  emoji?: string
}

export interface PlatformRender {
  platform: 'apple' | 'google' | 'samsung' | 'microsoft' | 'facebook'
  imageUrl: string
}

/* ── Slide Data ────────────────────────────────────────── */

export interface SlideData {
  id: string
  position: SlidePosition
  transition: TransitionConfig
  content: SlideContent
  speakerNotes?: string
  ambient?: string
}
