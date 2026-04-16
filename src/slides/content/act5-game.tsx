import type { SlideData } from '../types'

export const act5Slides: SlideData[] = [
  /* ── Slide 25: Game Reveal ──────────────────────────────── */
  {
    id: 'game-reveal',
    position: { x: 65000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'glitch', duration: 2.5 },
    content: {
      type: 'game-reveal',
      text: '¿Pero qué tan bien conoces TÚ los emojis?',
    },
    speakerNotes: '🎤 DI: "Ok, hasta aquí la clase de historia. Ahora…" 🎭 ACCIÓN: Avanza y deja que el glitch se despliegue. Después del caos visual, mira al público con sonrisa maliciosa. "Ahora quiero saber… ¿qué tan bien los conocen USTEDES?" Pausa dramática. Observa cómo se prenden los ojos. ESTE es el momento sorpresa. Saboréalo.',
  },

  /* ── Slide 26: QR Lobby ─────────────────────────────────── */
  {
    id: 'qr-lobby',
    position: { x: 67000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade-black', duration: 1.8 },
    content: {
      type: 'qr-lobby',
      roomCode: '',
    },
    speakerNotes: '🎤 DI: "¡BIENVENIDOS AL JUEGO! Agarren sus celulares, ESCANEEN el QR, escojan un EQUIPO, y prepárense. Porque nos vamos a reír mucho y alguien va a quedar mal." 🎭 ACCIÓN: Espera 30-60 segundos. Ve los nombres (con emojis) apareciendo abajo. Hazle bullying cariñoso al que elija nombre raro. "Ay sí, \'🍕🐢🔥\' muy bonito. Vamos a ver si juegas igual de bien."',
  },

  /* ── Ronda 1: Películas (25 preguntas, fácil → difícil) ──── */
  {
    id: 'quiz-movies-intro',
    position: { x: 69000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'emoji-clapper', duration: 2.2, emoji: '🎬' },
    content: {
      type: 'title',
      title: 'Ronda 1: Películas',
      subtitle: 'Adivina la película por los emojis',
      emoji: '🎬',
    },
    speakerNotes: '🎤 DI: "¡PRIMERA RONDA! Películas. El primero que BUZZEE y atine se lleva 100 puntitos. Si falla, el otro equipo puede ROBAR la pregunta. Prepárense, empezamos fácil pero se pone feo." 🎭 ACCIÓN: Haz sonidos de redoble de tambor con la boca.',
  },
  {
    id: 'quiz-movie-1',
    position: { x: 71000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🦁', '👑'], answer: 'El Rey León' },
  },
  {
    id: 'quiz-movie-2',
    position: { x: 73000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🧙‍♂️', '💍', '🌋'], answer: 'El Señor de los Anillos' },
  },
  {
    id: 'quiz-movie-3',
    position: { x: 75000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🚢', '❄️', '💑', '💀'], answer: 'Titanic' },
  },
  {
    id: 'quiz-movie-4',
    position: { x: 77000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🐀', '👨‍🍳', '🧀', '🥖'], answer: 'Ratatouille' },
  },
  {
    id: 'quiz-movie-5',
    position: { x: 79000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🐠', '🔍', '👨', '👦'], answer: 'Buscando a Nemo' },
  },
  {
    id: 'quiz-movie-6',
    position: { x: 81000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🦖', '🦴', '🏞️'], answer: 'Jurassic Park' },
  },
  {
    id: 'quiz-movie-7',
    position: { x: 83000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🦈', '🏊', '🏖️'], answer: 'Tiburón (Jaws)' },
  },
  {
    id: 'quiz-movie-8',
    position: { x: 85000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🤖', '🌱', '❤️', '🌌'], answer: 'WALL·E' },
  },
  {
    id: 'quiz-movie-9',
    position: { x: 87000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🕴️', '🌀', '🛏️'], answer: 'El Origen (Inception)' },
  },
  /* ── 5 más difíciles del lote original ─────────────────── */
  {
    id: 'quiz-movie-10',
    position: { x: 89000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🚗', '⚡', '⏪'], answer: 'Volver al Futuro' },
  },
  {
    id: 'quiz-movie-11',
    position: { x: 91000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🏃', '🍫', '📦'], answer: 'Forrest Gump' },
  },
  {
    id: 'quiz-movie-12',
    position: { x: 93000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🚀', '🌌', '🕳️', '⏰'], answer: 'Interestelar' },
  },
  {
    id: 'quiz-movie-13',
    position: { x: 95000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['💀', '🎸', '🌺', '👦'], answer: 'Coco' },
  },
  {
    id: 'quiz-movie-14',
    position: { x: 97000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🧙', '⚡', '🦉'], answer: 'Harry Potter' },
  },
  /* ── 11 películas NUEVAS ───────────────────────────────── */
  {
    id: 'quiz-movie-15',
    position: { x: 99000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🕷️', '🏙️', '🕸️'], answer: 'Spider-Man' },
  },
  {
    id: 'quiz-movie-16',
    position: { x: 101000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['❄️', '👸', '⛄', '🐴'], answer: 'Frozen' },
  },
  {
    id: 'quiz-movie-17',
    position: { x: 103000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🦇', '🃏', '🌃'], answer: 'Batman (El Caballero de la Noche)' },
  },
  {
    id: 'quiz-movie-18',
    position: { x: 105000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['💊', '🔴', '🔵', '🕶️'], answer: 'The Matrix' },
  },
  {
    id: 'quiz-movie-19',
    position: { x: 107000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['👽', '📞', '🚲', '🌕'], answer: 'E.T. el Extraterrestre' },
  },
  {
    id: 'quiz-movie-20',
    position: { x: 109000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🎈', '🏠', '👴', '🐶'], answer: 'Up (Una Aventura de Altura)' },
  },
  {
    id: 'quiz-movie-21',
    position: { x: 111000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🐉', '🏹', '🔥', '👦'], answer: 'Cómo Entrenar a tu Dragón' },
  },
  {
    id: 'quiz-movie-22',
    position: { x: 113000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🏴‍☠️', '🚢', '⚓', '💀'], answer: 'Piratas del Caribe' },
  },
  {
    id: 'quiz-movie-23',
    position: { x: 115000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🐰', '🦊', '👮‍♀️', '🏙️'], answer: 'Zootopia' },
  },
  {
    id: 'quiz-movie-24',
    position: { x: 117000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🍫', '🎫', '👦', '🏭'], answer: 'Charlie y la Fábrica de Chocolate' },
  },
  {
    id: 'quiz-movie-25',
    position: { x: 119000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🧞‍♂️', '🪔', '🐅', '🏰'], answer: 'Aladdín' },
  },
  /* ── 8 películas extra (picantes/divertidas) ─────────────── */
  {
    id: 'quiz-movie-26',
    position: { x: 121000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['👩', '🧛', '🐺'], answer: 'Crepúsculo (Twilight)' },
  },
  {
    id: 'quiz-movie-27',
    position: { x: 123000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['👻', '👻', '🔫'], answer: 'Los Cazafantasmas (Ghostbusters)' },
  },
  {
    id: 'quiz-movie-28',
    position: { x: 125000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🍆', '🍑', '🔞', '◻️'], answer: '50 Sombras de Grey' },
  },
  {
    id: 'quiz-movie-29',
    position: { x: 127000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['👧', '🔄', '👩'], answer: 'Un Viernes de Locos (Freaky Friday)' },
  },
  {
    id: 'quiz-movie-30',
    position: { x: 129000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['👸', '❤️', '🌹', '🐻'], answer: 'La Bella y la Bestia' },
  },
  {
    id: 'quiz-movie-31',
    position: { x: 131000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['👉', '👌', '🌆'], answer: 'Sex and the City' },
  },
  {
    id: 'quiz-movie-32',
    position: { x: 133000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🌃', '🏫', '👱‍♂️', '🔦'], answer: 'Noche en el Museo' },
  },
  {
    id: 'quiz-movie-33',
    position: { x: 135000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['👩', '🐇', '🍄', '🎩', '🐛'], answer: 'Alicia en el País de las Maravillas' },
  },

  /* ── Ronda 2: Series (25 preguntas) ──────────────────────── */
  {
    id: 'quiz-tv-intro',
    position: { x: 137000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'emoji-tv', duration: 2.2, emoji: '📺' },
    content: {
      type: 'title',
      title: 'Ronda 2: Series',
      subtitle: 'Adivina la serie por los emojis',
      emoji: '📺',
    },
    speakerNotes: '🎤 DI: "¡SEGUNDA RONDA! Series. Si tuviste Netflix alguna vez en los últimos 10 años, deberías rompérsela. Si no las conoces, CHUPA CABRAS, a aprender se ha dicho." 🎭 ACCIÓN: Mira a quién no ha ganado punto todavía. Señálalo. "Tú, es tu momento. Lo SÉ."',
  },
  {
    id: 'quiz-tv-1',
    position: { x: 139000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🧪', '👨‍🔬', '💊', '💰'], answer: 'Breaking Bad' },
  },
  {
    id: 'quiz-tv-2',
    position: { x: 141000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['👑', '⚔️', '🐉'], answer: 'Game of Thrones' },
  },
  {
    id: 'quiz-tv-3',
    position: { x: 143000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🦑', '🎮', '💀'], answer: 'El Juego del Calamar' },
  },
  {
    id: 'quiz-tv-4',
    position: { x: 145000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['👽', '🚲', '🔦', '👦'], answer: 'Stranger Things' },
  },
  {
    id: 'quiz-tv-5',
    position: { x: 147000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🦹', '💰', '🏦', '🎭'], answer: 'La Casa de Papel' },
  },
  {
    id: 'quiz-tv-6',
    position: { x: 149000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🧟', '🔫', '🏚️'], answer: 'The Walking Dead' },
  },
  {
    id: 'quiz-tv-7',
    position: { x: 151000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🏢', '😐', '📎', '🤝'], answer: 'The Office' },
  },
  {
    id: 'quiz-tv-8',
    position: { x: 153000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['👥', '☕', '🛋️'], answer: 'Friends' },
  },
  {
    id: 'quiz-tv-9',
    position: { x: 155000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['⚖️', '👨‍⚖️', '📞', '🧃'], answer: 'Better Call Saul' },
  },
  /* ── 5 más difíciles del lote original ─────────────────── */
  {
    id: 'quiz-tv-10',
    position: { x: 157000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🎩', '🪒', '💰'], answer: 'Peaky Blinders' },
  },
  {
    id: 'quiz-tv-13',
    position: { x: 159000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🏝️', '✈️', '💥'], answer: 'Lost' },
  },
  /* ── 11 series NUEVAS ──────────────────────────────────── */
  {
    id: 'quiz-tv-15',
    position: { x: 161000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🧟', '🍄', '👨', '👧'], answer: 'The Last of Us' },
  },
  {
    id: 'quiz-tv-16',
    position: { x: 163000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['👑', '👸', '🏰', '☕'], answer: 'The Crown' },
  },
  {
    id: 'quiz-tv-17',
    position: { x: 165000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['📺', '🛋️', '🍩', '🏠'], answer: 'Los Simpsons' },
  },
  {
    id: 'quiz-tv-18',
    position: { x: 167000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🔬', '🛋️', '🚀', '🤓'], answer: 'The Big Bang Theory' },
  },
  {
    id: 'quiz-tv-19',
    position: { x: 169000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🛸', '🧪', '👴', '👦'], answer: 'Rick and Morty' },
  },
  {
    id: 'quiz-tv-20',
    position: { x: 171000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['💀', '🖤', '👧', '🎻'], answer: 'Merlina (Wednesday)' },
  },
  {
    id: 'quiz-tv-23',
    position: { x: 173000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🗡️', '🐺', '🎵', '💊'], answer: 'The Witcher' },
  },
  {
    id: 'quiz-tv-25',
    position: { x: 175000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🎻', '👸', '🤴', '🏰'], answer: 'Bridgerton' },
  },

  /* ── Ronda 3: Países (14 preguntas, sin banderas) ────────── */
  {
    id: 'quiz-countries-intro',
    position: { x: 177000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'emoji-portal', duration: 2.2, emoji: '🌍' },
    content: {
      type: 'title',
      title: 'Ronda 3: Países',
      subtitle: 'Adivina el país por los emojis',
      emoji: '🌍',
    },
    speakerNotes: '🎤 DI: "¡TERCERA RONDA! Países. Y ojito: NO hay banderas. Porque eso sería facilísimo. Tienen que adivinar por los ESTEREOTIPOS culturales." 🎭 ACCIÓN: Haz un gesto de comer tacos. "Ya saben, lo típico. Sin polemizar."',
  },
  {
    id: 'quiz-country-1',
    position: { x: 179000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🗼', '🥐', '🍷'], answer: 'Francia' },
  },
  {
    id: 'quiz-country-2',
    position: { x: 181000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🌮', '🌶️', '💀'], answer: 'México' },
  },
  {
    id: 'quiz-country-3',
    position: { x: 183000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🍕', '🏛️', '🤌'], answer: 'Italia' },
  },
  {
    id: 'quiz-country-4',
    position: { x: 185000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🦘', '🏏', '🕷️'], answer: 'Australia' },
  },
  {
    id: 'quiz-country-5',
    position: { x: 187000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🍻', '🥨', '⚽'], answer: 'Alemania' },
  },
  {
    id: 'quiz-country-6',
    position: { x: 189000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['💃', '🎸', '🐂'], answer: 'España' },
  },
  {
    id: 'quiz-country-7',
    position: { x: 191000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🧉', '🥩', '⚽'], answer: 'Argentina' },
  },
  {
    id: 'quiz-country-8',
    position: { x: 193000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['⛪', '❄️', '🐻', '🪆'], answer: 'Rusia' },
  },
  {
    id: 'quiz-country-9',
    position: { x: 195000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🐘', '🕌', '💃', '🍛'], answer: 'India' },
  },
  /* ── 5 más difíciles ───────────────────────────────────── */
  {
    id: 'quiz-country-10',
    position: { x: 197000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🍣', '🗻', '🌸'], answer: 'Japón' },
  },
  {
    id: 'quiz-country-11',
    position: { x: 199000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🐫', '🏜️', '🕌'], answer: 'Egipto' },
  },
  {
    id: 'quiz-country-12',
    position: { x: 201000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🌷', '🚲', '🧀'], answer: 'Países Bajos (Holanda)' },
  },
  {
    id: 'quiz-country-13',
    position: { x: 203000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🍀', '🍺', '🧚'], answer: 'Irlanda' },
  },
  {
    id: 'quiz-country-14',
    position: { x: 205000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🛕', '🐘', '🌶️'], answer: 'Tailandia' },
  },

  /* ── Ronda 4: Dichos Mexicanos (9 preguntas) ────────────── */
  {
    id: 'quiz-sayings-intro',
    position: { x: 207000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'emoji-magic', duration: 2.2, emoji: '✨' },
    content: {
      type: 'title',
      title: 'Ronda 4: Dichos Mexicanos',
      subtitle: 'Adivina el dicho por los emojis',
      emoji: '🇲🇽',
    },
    speakerNotes: '🎤 DI: "Y ahora: la RONDA FINAL. DICHOS MEXICANOS. Si aquí le fallan, me van a avergonzar. Mi abuela los está viendo desde el cielo." 🎭 ACCIÓN: Cara solemne. "Vamos a ver quién tiene sangre mexicana en las venas y quién no."',
  },
  /* Fáciles */
  {
    id: 'quiz-saying-2',
    position: { x: 209000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🐕', '📢', '🚫'], answer: 'Perro que ladra no muerde' },
  },
  {
    id: 'quiz-saying-3',
    position: { x: 211000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🦐', '😴', '🌊'], answer: 'Camarón que se duerme se lo lleva la corriente' },
  },
  /* Más difíciles */
  {
    id: 'quiz-saying-5',
    position: { x: 213000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🐒', '👗', '👗'], answer: 'Aunque la mona se vista de seda, mona se queda' },
  },
  {
    id: 'quiz-saying-6',
    position: { x: 215000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🪵', '➡️', '🪵'], answer: 'De tal palo, tal astilla' },
  },
  {
    id: 'quiz-saying-8',
    position: { x: 217000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['👀', '🙈', '❤️', '💔'], answer: 'Ojos que no ven, corazón que no siente' },
  },

  /* ── Final: Scoreboard ──────────────────────────────────── */
  {
    id: 'scoreboard-final',
    position: { x: 219000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'spiral-zoom', duration: 3.0 },
    content: {
      type: 'scoreboard-final',
    },
    speakerNotes: '🎤 DI: "Señoras y señores… los resultados finales…" 🎭 ACCIÓN: Redoble de tambor con la boca. Deja que la animación de celebración ocurra. Ve el confetti. Observa quién ganó. "¡APLAUSOS para los ganadores! Y para los que perdieron… pues a entrenar más con los emojis. Apple lanza actualización en otoño, tienen hasta entonces."',
  },

  /* ── Cierre ─────────────────────────────────────────────── */
  {
    id: 'gg',
    position: { x: 221000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'split-confetti', duration: 2.5 },
    content: {
      type: 'title',
      title: '¡GG!',
      subtitle: '¡Gracias por jugar!',
      emoji: '🎉',
    },
    speakerNotes: '🎤 DI: "Y eso fue todo. Espero que aprendieron algo, se rieron un poco, y ahora ven su teléfono con ojos distintos." 🎭 ACCIÓN: Pausa. Sonrisa. "GG a todos. Los quiero. Vámonos a comer." Deja caer el micrófono (metafóricamente). Aléjate lentamente.',
  },
]
