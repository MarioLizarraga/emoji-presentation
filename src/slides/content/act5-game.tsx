import type { SlideData } from '../types'

export const act5Slides: SlideData[] = [
  /* ── Slide 25: Game Reveal ──────────────────────────────── */
  {
    id: 'game-reveal',
    position: { x: 48000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'glitch', duration: 2.5 },
    content: {
      type: 'game-reveal',
      text: "But how well do YOU know emoji?",
    },
    speakerNotes: 'BIG MOMENT. Let the glitch transition land. Pause. Watch faces light up.',
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
    speakerNotes: 'Room code generates automatically. Give people 30-60 seconds to join.',
  },

  /* ── Round 1: Movies ────────────────────────────────────── */
  {
    id: 'quiz-movies-intro',
    position: { x: 52000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'emoji-clapper', duration: 2.2, emoji: '🎬' },
    content: {
      type: 'title',
      title: 'Round 1: Movies',
      subtitle: 'Guess the movie from the emoji',
      emoji: '🎬',
    },
  },

  {
    id: 'quiz-movie-1',
    position: { x: 54000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Movies',
      emojis: ['🦁', '👑'],
      answer: 'The Lion King',
      answerEmoji: '🦁',
    },
  },

  {
    id: 'quiz-movie-2',
    position: { x: 56000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Movies',
      emojis: ['🧙‍♂️', '💍', '🌋'],
      answer: 'Lord of the Rings',
      answerEmoji: '💍',
    },
  },

  {
    id: 'quiz-movie-3',
    position: { x: 58000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Movies',
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
      category: 'Movies',
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
      title: 'Round 2: TV Shows',
      subtitle: 'Guess the show from the emoji',
      emoji: '📺',
    },
  },

  {
    id: 'quiz-tv-1',
    position: { x: 64000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'TV Shows',
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
      category: 'TV Shows',
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
      category: 'TV Shows',
      emojis: ['🦑', '🎮', '💀'],
      answer: 'Squid Game',
      answerEmoji: '🦑',
    },
  },

  {
    id: 'quiz-tv-4',
    position: { x: 70000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'TV Shows',
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
      title: 'Round 3: Countries',
      subtitle: 'Guess the country from the emoji',
      emoji: '🌍',
    },
  },

  {
    id: 'quiz-country-1',
    position: { x: 74000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Countries',
      emojis: ['🗼', '🥐', '🍷'],
      answer: 'France',
      answerEmoji: '🇫🇷',
    },
  },

  {
    id: 'quiz-country-2',
    position: { x: 76000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Countries',
      emojis: ['🌮', '🌶️', '💀'],
      answer: 'Mexico',
      answerEmoji: '🇲🇽',
    },
  },

  {
    id: 'quiz-country-3',
    position: { x: 78000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Countries',
      emojis: ['🍕', '🏛️', '🤌'],
      answer: 'Italy',
      answerEmoji: '🇮🇹',
    },
  },

  {
    id: 'quiz-country-4',
    position: { x: 80000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Countries',
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
      title: 'Round 4: Sayings',
      subtitle: 'Guess the common saying from the emoji',
      emoji: '💬',
    },
  },

  {
    id: 'quiz-saying-1',
    position: { x: 84000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Sayings',
      emojis: ['🐘', '🏠'],
      answer: 'Elephant in the room',
      answerEmoji: '🐘',
    },
  },

  {
    id: 'quiz-saying-2',
    position: { x: 86000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Sayings',
      emojis: ['😢', '🥛'],
      answer: "Don't cry over spilled milk",
      answerEmoji: '🥛',
    },
  },

  {
    id: 'quiz-saying-3',
    position: { x: 88000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Sayings',
      emojis: ['🐔', '❓', '🥚'],
      answer: 'Chicken or the egg',
      answerEmoji: '🐔',
    },
  },

  {
    id: 'quiz-saying-4',
    position: { x: 90000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: {
      type: 'quiz-question',
      category: 'Sayings',
      emojis: ['⏰', '💣'],
      answer: 'Ticking time bomb',
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
    speakerNotes: 'Celebrate the winner! Give them a round of applause.',
  },

  /* ── Slide 36: Thanks / GG ─────────────────────────────── */
  {
    id: 'gg',
    position: { x: 94000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'split-confetti', duration: 2.5 },
    content: {
      type: 'title',
      title: 'GG',
      subtitle: 'Made with 😂 and Claude Code',
      emoji: '🎉',
    },
    speakerNotes: 'Thanks everyone! Drop the mic. Walk away slowly.',
  },
]
