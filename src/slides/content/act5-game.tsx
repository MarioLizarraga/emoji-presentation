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

  /* ── Ronda 1: Películas (9 preguntas, fácil → difícil) ───── */
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
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🦁', '👑'], answer: 'El Rey León', answerEmoji: '🦁' },
  },
  {
    id: 'quiz-movie-2',
    position: { x: 56000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🧙‍♂️', '💍', '🌋'], answer: 'El Señor de los Anillos', answerEmoji: '💍' },
  },
  {
    id: 'quiz-movie-3',
    position: { x: 58000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🚢', '❄️', '💑', '💀'], answer: 'Titanic', answerEmoji: '🚢' },
  },
  {
    id: 'quiz-movie-4',
    position: { x: 60000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🐀', '👨‍🍳', '🇫🇷'], answer: 'Ratatouille', answerEmoji: '🐀' },
  },
  /* ── Preguntas más difíciles ───────────────────────────── */
  {
    id: 'quiz-movie-5',
    position: { x: 62000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🐠', '🔍', '👨', '👦'], answer: 'Buscando a Nemo', answerEmoji: '🐠' },
  },
  {
    id: 'quiz-movie-6',
    position: { x: 64000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🦖', '🦴', '🏞️'], answer: 'Jurassic Park', answerEmoji: '🦖' },
  },
  {
    id: 'quiz-movie-7',
    position: { x: 66000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🦈', '🏊', '🏖️'], answer: 'Tiburón (Jaws)', answerEmoji: '🦈' },
  },
  {
    id: 'quiz-movie-8',
    position: { x: 68000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🤖', '🌱', '❤️', '🌌'], answer: 'WALL·E', answerEmoji: '🤖' },
  },
  {
    id: 'quiz-movie-9',
    position: { x: 70000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🕴️', '🌀', '🛏️'], answer: 'El Origen (Inception)', answerEmoji: '🌀' },
  },

  /* ── Ronda 2: Series (9 preguntas) ──────────────────────── */
  {
    id: 'quiz-tv-intro',
    position: { x: 72000, y: 0, scale: 1, rotation: 0 },
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
    position: { x: 74000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🧪', '👨‍🔬', '💊', '💰'], answer: 'Breaking Bad', answerEmoji: '🧪' },
  },
  {
    id: 'quiz-tv-2',
    position: { x: 76000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['👑', '⚔️', '🐉'], answer: 'Game of Thrones', answerEmoji: '👑' },
  },
  {
    id: 'quiz-tv-3',
    position: { x: 78000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🦑', '🎮', '💀'], answer: 'El Juego del Calamar', answerEmoji: '🦑' },
  },
  {
    id: 'quiz-tv-4',
    position: { x: 80000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['👽', '🚲', '🔦', '👦'], answer: 'Stranger Things', answerEmoji: '👽' },
  },
  /* ── Preguntas más difíciles ───────────────────────────── */
  {
    id: 'quiz-tv-5',
    position: { x: 82000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🦹', '💰', '🏦', '🇪🇸'], answer: 'La Casa de Papel', answerEmoji: '🎭' },
  },
  {
    id: 'quiz-tv-6',
    position: { x: 84000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🧟', '🔫', '🏚️'], answer: 'The Walking Dead', answerEmoji: '🧟' },
  },
  {
    id: 'quiz-tv-7',
    position: { x: 86000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🏢', '😐', '📎', '🤝'], answer: 'The Office', answerEmoji: '📎' },
  },
  {
    id: 'quiz-tv-8',
    position: { x: 88000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🏎️', '🏁', '🇫1'], answer: 'Drive to Survive', answerEmoji: '🏎️' },
  },
  {
    id: 'quiz-tv-9',
    position: { x: 90000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['⚖️', '👨‍⚖️', '📞', '🧃'], answer: 'Better Call Saul', answerEmoji: '⚖️' },
  },

  /* ── Ronda 3: Países (9 preguntas) ──────────────────────── */
  {
    id: 'quiz-countries-intro',
    position: { x: 92000, y: 0, scale: 1, rotation: 0 },
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
    position: { x: 94000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🗼', '🥐', '🍷'], answer: 'Francia', answerEmoji: '🇫🇷' },
  },
  {
    id: 'quiz-country-2',
    position: { x: 96000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🌮', '🌶️', '💀'], answer: 'México', answerEmoji: '🇲🇽' },
  },
  {
    id: 'quiz-country-3',
    position: { x: 98000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🍕', '🏛️', '🤌'], answer: 'Italia', answerEmoji: '🇮🇹' },
  },
  {
    id: 'quiz-country-4',
    position: { x: 100000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🦘', '🏏', '🕷️'], answer: 'Australia', answerEmoji: '🇦🇺' },
  },
  /* ── Preguntas más difíciles ───────────────────────────── */
  {
    id: 'quiz-country-5',
    position: { x: 102000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🍻', '🥨', '⚽'], answer: 'Alemania', answerEmoji: '🇩🇪' },
  },
  {
    id: 'quiz-country-6',
    position: { x: 104000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['💃', '🎸', '🐂'], answer: 'España', answerEmoji: '🇪🇸' },
  },
  {
    id: 'quiz-country-7',
    position: { x: 106000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🧉', '🥩', '⚽'], answer: 'Argentina', answerEmoji: '🇦🇷' },
  },
  {
    id: 'quiz-country-8',
    position: { x: 108000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['⛪', '❄️', '🐻', '🪆'], answer: 'Rusia', answerEmoji: '🇷🇺' },
  },
  {
    id: 'quiz-country-9',
    position: { x: 110000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🐘', '🕌', '💃', '🍛'], answer: 'India', answerEmoji: '🇮🇳' },
  },

  /* ── Ronda 4: Dichos Mexicanos (9 preguntas) ────────────── */
  {
    id: 'quiz-sayings-intro',
    position: { x: 112000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'emoji-magic', duration: 2.2, emoji: '✨' },
    content: {
      type: 'title',
      title: 'Ronda 4: Dichos Mexicanos',
      subtitle: 'Adivina el dicho por los emojis',
      emoji: '🇲🇽',
    },
  },
  /* Fáciles */
  {
    id: 'quiz-saying-1',
    position: { x: 114000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🐴', '🎁', '🦷'], answer: 'A caballo regalado no se le ve el colmillo', answerEmoji: '🐴' },
  },
  {
    id: 'quiz-saying-2',
    position: { x: 116000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🐕', '📢', '🚫'], answer: 'Perro que ladra no muerde', answerEmoji: '🐕' },
  },
  {
    id: 'quiz-saying-3',
    position: { x: 118000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🦐', '😴', '🌊'], answer: 'Camarón que se duerme se lo lleva la corriente', answerEmoji: '🦐' },
  },
  {
    id: 'quiz-saying-4',
    position: { x: 120000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['👄', '🤐', '🪰'], answer: 'En boca cerrada no entran moscas', answerEmoji: '🤐' },
  },
  /* Más difíciles */
  {
    id: 'quiz-saying-5',
    position: { x: 122000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🐒', '👗', '👗'], answer: 'Aunque la mona se vista de seda, mona se queda', answerEmoji: '🐒' },
  },
  {
    id: 'quiz-saying-6',
    position: { x: 124000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🪵', '➡️', '🪵'], answer: 'De tal palo, tal astilla', answerEmoji: '🪵' },
  },
  {
    id: 'quiz-saying-7',
    position: { x: 126000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['✨', '🥇', '❌'], answer: 'No todo lo que brilla es oro', answerEmoji: '✨' },
  },
  {
    id: 'quiz-saying-8',
    position: { x: 128000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['👀', '🙈', '❤️', '💔'], answer: 'Ojos que no ven, corazón que no siente', answerEmoji: '👀' },
  },
  {
    id: 'quiz-saying-9',
    position: { x: 130000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🐓', '🌅', '⏰', '❌'], answer: 'No por mucho madrugar amanece más temprano', answerEmoji: '🐓' },
  },

  /* ── Final: Scoreboard ──────────────────────────────────── */
  {
    id: 'scoreboard-final',
    position: { x: 132000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'spiral-zoom', duration: 3.0 },
    content: {
      type: 'scoreboard-final',
    },
    speakerNotes: '¡Celebra al ganador! Dales un aplauso.',
  },

  /* ── Cierre ─────────────────────────────────────────────── */
  {
    id: 'gg',
    position: { x: 134000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'split-confetti', duration: 2.5 },
    content: {
      type: 'title',
      title: '¡GG!',
      subtitle: '¡Gracias por jugar!',
      emoji: '🎉',
    },
    speakerNotes: '¡Gracias a todos! Suelta el micrófono. Aléjate lentamente.',
  },
]
