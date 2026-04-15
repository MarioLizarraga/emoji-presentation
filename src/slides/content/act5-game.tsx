import type { SlideData } from '../types'

export const act5Slides: SlideData[] = [
  /* ── Slide 25: Game Reveal ──────────────────────────────── */
  {
    id: 'game-reveal',
    position: { x: 48000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'glitch', duration: 2.5 },
    content: {
      type: 'game-reveal',
      text: '¿Pero qué tan bien conoces TÚ los emojis?',
    },
    speakerNotes: 'GRAN MOMENTO. Deja que la transición de glitch aterrice. Pausa. Observa las caras iluminarse.',
  },

  /* ── Slide 26: QR Lobby ─────────────────────────────────── */
  {
    id: 'qr-lobby',
    position: { x: 50000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade-black', duration: 1.8 },
    content: {
      type: 'qr-lobby',
      roomCode: '',
    },
    speakerNotes: 'El código de sala se genera automáticamente. Dale 30-60 segundos a la gente para unirse.',
  },

  /* ── Round 1: Movies ────────────────────────────────────── */
  {
    id: 'quiz-movies-intro',
    position: { x: 52000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'emoji-clapper', duration: 2.2, emoji: '🎬' },
    content: {
      type: 'title',
      title: 'Ronda 1: Películas',
      subtitle: 'Adivina la película por los emojis',
      emoji: '🎬',
    },
  },

  {
    id: 'quiz-movie-1',
    position: { x: 54000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Películas',
      emojis: ['🦁', '👑'],
      answer: 'El Rey León',
      answerEmoji: '🦁',
    },
  },

  {
    id: 'quiz-movie-2',
    position: { x: 56000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Películas',
      emojis: ['🧙‍♂️', '💍', '🌋'],
      answer: 'El Señor de los Anillos',
      answerEmoji: '💍',
    },
  },

  {
    id: 'quiz-movie-3',
    position: { x: 58000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Películas',
      emojis: ['🚢', '❄️', '💑', '💀'],
      answer: 'Titanic',
      answerEmoji: '🚢',
    },
  },

  {
    id: 'quiz-movie-4',
    position: { x: 60000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Películas',
      emojis: ['🐀', '👨‍🍳', '🇫🇷'],
      answer: 'Ratatouille',
      answerEmoji: '🐀',
    },
  },

  /* ── Round 2: TV Shows ──────────────────────────────────── */
  {
    id: 'quiz-tv-intro',
    position: { x: 62000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'emoji-tv', duration: 2.2, emoji: '📺' },
    content: {
      type: 'title',
      title: 'Ronda 2: Series',
      subtitle: 'Adivina la serie por los emojis',
      emoji: '📺',
    },
  },

  {
    id: 'quiz-tv-1',
    position: { x: 64000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Series',
      emojis: ['🧪', '👨‍🔬', '💊', '💰'],
      answer: 'Breaking Bad',
      answerEmoji: '🧪',
    },
  },

  {
    id: 'quiz-tv-2',
    position: { x: 66000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Series',
      emojis: ['👑', '⚔️', '🐉'],
      answer: 'Game of Thrones',
      answerEmoji: '👑',
    },
  },

  {
    id: 'quiz-tv-3',
    position: { x: 68000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Series',
      emojis: ['🦑', '🎮', '💀'],
      answer: 'El Juego del Calamar',
      answerEmoji: '🦑',
    },
  },

  {
    id: 'quiz-tv-4',
    position: { x: 70000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Series',
      emojis: ['👽', '🚲', '🔦', '👦'],
      answer: 'Stranger Things',
      answerEmoji: '👽',
    },
  },

  /* ── Round 3: Countries ─────────────────────────────────── */
  {
    id: 'quiz-countries-intro',
    position: { x: 72000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'emoji-portal', duration: 2.2, emoji: '🌍' },
    content: {
      type: 'title',
      title: 'Ronda 3: Países',
      subtitle: 'Adivina el país por los emojis',
      emoji: '🌍',
    },
  },

  {
    id: 'quiz-country-1',
    position: { x: 74000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Países',
      emojis: ['🗼', '🥐', '🍷'],
      answer: 'Francia',
      answerEmoji: '🇫🇷',
    },
  },

  {
    id: 'quiz-country-2',
    position: { x: 76000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Países',
      emojis: ['🌮', '🌶️', '💀'],
      answer: 'México',
      answerEmoji: '🇲🇽',
    },
  },

  {
    id: 'quiz-country-3',
    position: { x: 78000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Países',
      emojis: ['🍕', '🏛️', '🤌'],
      answer: 'Italia',
      answerEmoji: '🇮🇹',
    },
  },

  {
    id: 'quiz-country-4',
    position: { x: 80000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Países',
      emojis: ['🦘', '🏏', '🕷️'],
      answer: 'Australia',
      answerEmoji: '🇦🇺',
    },
  },

  /* ── Round 4: Sayings ───────────────────────────────────── */
  {
    id: 'quiz-sayings-intro',
    position: { x: 82000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'emoji-magic', duration: 2.2, emoji: '✨' },
    content: {
      type: 'title',
      title: 'Ronda 4: Dichos y Frases',
      subtitle: 'Adivina el dicho por los emojis',
      emoji: '💬',
    },
  },

  {
    id: 'quiz-saying-1',
    position: { x: 84000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Dichos',
      emojis: ['🐘', '🏠'],
      answer: 'El elefante en la habitación',
      answerEmoji: '🐘',
    },
  },

  {
    id: 'quiz-saying-2',
    position: { x: 86000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Dichos',
      emojis: ['😢', '🥛'],
      answer: 'No llores sobre la leche derramada',
      answerEmoji: '🥛',
    },
  },

  {
    id: 'quiz-saying-3',
    position: { x: 88000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Dichos',
      emojis: ['🐔', '❓', '🥚'],
      answer: '¿El huevo o la gallina?',
      answerEmoji: '🐔',
    },
  },

  {
    id: 'quiz-saying-4',
    position: { x: 90000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Dichos',
      emojis: ['⏰', '💣'],
      answer: 'Bomba de tiempo',
      answerEmoji: '💣',
    },
  },

  /* ── Slide 35: Final Scoreboard ─────────────────────────── */
  {
    id: 'scoreboard-final',
    position: { x: 92000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'spiral-zoom', duration: 3.0 },
    content: {
      type: 'scoreboard-final',
    },
    speakerNotes: '¡Celebra al ganador! Dales un aplauso.',
  },

  /* ── Slide 36: Thanks / GG ─────────────────────────────── */
  {
    id: 'gg',
    position: { x: 94000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'split-confetti', duration: 2.5 },
    content: {
      type: 'title',
      title: 'GG',
      subtitle: 'Hecho con 😂 y Claude Code',
      emoji: '🎉',
    },
    speakerNotes: '¡Gracias a todos! Suelta el micrófono. Aléjate lentamente.',
  },
]
