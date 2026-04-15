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
    speakerNotes: '🎤 DI: "Ok, hasta aquí la clase de historia. Ahora…" 🎭 ACCIÓN: Avanza y deja que el glitch se despliegue. Después del caos visual, mira al público con sonrisa maliciosa. "Ahora quiero saber… ¿qué tan bien los conocen USTEDES?" Pausa dramática. Observa cómo se prenden los ojos. ESTE es el momento sorpresa. Saboréalo.',
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
    speakerNotes: '🎤 DI: "¡BIENVENIDOS AL JUEGO! Agarren sus celulares, ESCANEEN el QR, escojan un EQUIPO, y prepárense. Porque nos vamos a reír mucho y alguien va a quedar mal." 🎭 ACCIÓN: Espera 30-60 segundos. Ve los nombres (con emojis) apareciendo abajo. Hazle bullying cariñoso al que elija nombre raro. "Ay sí, \'🍕🐢🔥\' muy bonito. Vamos a ver si juegas igual de bien."',
  },

  /* ── Ronda 1: Películas (14 preguntas, fácil → difícil) ──── */
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
    speakerNotes: '🎤 DI: "¡PRIMERA RONDA! Películas. El primero que BUZZEE y atine se lleva 100 puntitos. Si falla, el otro equipo puede ROBAR la pregunta. Prepárense, empezamos fácil pero se pone feo." 🎭 ACCIÓN: Haz sonidos de redoble de tambor con la boca.',
  },
  {
    id: 'quiz-movie-1',
    position: { x: 54000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🦁', '👑'], answer: 'El Rey León' },
  },
  {
    id: 'quiz-movie-2',
    position: { x: 56000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🧙‍♂️', '💍', '🌋'], answer: 'El Señor de los Anillos' },
  },
  {
    id: 'quiz-movie-3',
    position: { x: 58000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🚢', '❄️', '💑', '💀'], answer: 'Titanic' },
  },
  {
    id: 'quiz-movie-4',
    position: { x: 60000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🐀', '👨‍🍳', '🧀', '🥖'], answer: 'Ratatouille' },
  },
  {
    id: 'quiz-movie-5',
    position: { x: 62000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🐠', '🔍', '👨', '👦'], answer: 'Buscando a Nemo' },
  },
  {
    id: 'quiz-movie-6',
    position: { x: 64000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🦖', '🦴', '🏞️'], answer: 'Jurassic Park' },
  },
  {
    id: 'quiz-movie-7',
    position: { x: 66000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🦈', '🏊', '🏖️'], answer: 'Tiburón (Jaws)' },
  },
  {
    id: 'quiz-movie-8',
    position: { x: 68000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🤖', '🌱', '❤️', '🌌'], answer: 'WALL·E' },
  },
  {
    id: 'quiz-movie-9',
    position: { x: 70000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🕴️', '🌀', '🛏️'], answer: 'El Origen (Inception)' },
  },
  /* ── 5 más difíciles ───────────────────────────────────── */
  {
    id: 'quiz-movie-10',
    position: { x: 72000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🚗', '⚡', '⏪'], answer: 'Volver al Futuro' },
  },
  {
    id: 'quiz-movie-11',
    position: { x: 74000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🏃', '🍫', '📦'], answer: 'Forrest Gump' },
  },
  {
    id: 'quiz-movie-12',
    position: { x: 76000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🚀', '🌌', '🕳️', '⏰'], answer: 'Interestelar' },
  },
  {
    id: 'quiz-movie-13',
    position: { x: 78000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['💀', '🎸', '🌺', '👦'], answer: 'Coco' },
  },
  {
    id: 'quiz-movie-14',
    position: { x: 80000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Películas', emojis: ['🧙', '⚡', '🦉'], answer: 'Harry Potter' },
  },

  /* ── Ronda 2: Series (14 preguntas) ──────────────────────── */
  {
    id: 'quiz-tv-intro',
    position: { x: 82000, y: 0, scale: 1, rotation: 0 },
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
    position: { x: 84000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🧪', '👨‍🔬', '💊', '💰'], answer: 'Breaking Bad' },
  },
  {
    id: 'quiz-tv-2',
    position: { x: 86000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['👑', '⚔️', '🐉'], answer: 'Game of Thrones' },
  },
  {
    id: 'quiz-tv-3',
    position: { x: 88000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🦑', '🎮', '💀'], answer: 'El Juego del Calamar' },
  },
  {
    id: 'quiz-tv-4',
    position: { x: 90000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['👽', '🚲', '🔦', '👦'], answer: 'Stranger Things' },
  },
  {
    id: 'quiz-tv-5',
    position: { x: 92000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🦹', '💰', '🏦', '🎭'], answer: 'La Casa de Papel' },
  },
  {
    id: 'quiz-tv-6',
    position: { x: 94000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🧟', '🔫', '🏚️'], answer: 'The Walking Dead' },
  },
  {
    id: 'quiz-tv-7',
    position: { x: 96000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🏢', '😐', '📎', '🤝'], answer: 'The Office' },
  },
  {
    id: 'quiz-tv-8',
    position: { x: 98000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['👥', '☕', '🛋️'], answer: 'Friends' },
  },
  {
    id: 'quiz-tv-9',
    position: { x: 100000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['⚖️', '👨‍⚖️', '📞', '🧃'], answer: 'Better Call Saul' },
  },
  /* ── 5 más difíciles ───────────────────────────────────── */
  {
    id: 'quiz-tv-10',
    position: { x: 102000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🎩', '🪒', '💰'], answer: 'Peaky Blinders' },
  },
  {
    id: 'quiz-tv-11',
    position: { x: 104000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🕳️', '🌲', '👨', '👧'], answer: 'Dark' },
  },
  {
    id: 'quiz-tv-12',
    position: { x: 106000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['💊', '💰', '🌴'], answer: 'Narcos' },
  },
  {
    id: 'quiz-tv-13',
    position: { x: 108000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['🏝️', '✈️', '💥'], answer: 'Lost' },
  },
  {
    id: 'quiz-tv-14',
    position: { x: 110000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Series', emojis: ['⚔️', '⛵', '❄️'], answer: 'Vikings' },
  },

  /* ── Ronda 3: Países (14 preguntas, sin banderas) ────────── */
  {
    id: 'quiz-countries-intro',
    position: { x: 112000, y: 0, scale: 1, rotation: 0 },
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
    position: { x: 114000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🗼', '🥐', '🍷'], answer: 'Francia' },
  },
  {
    id: 'quiz-country-2',
    position: { x: 116000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🌮', '🌶️', '💀'], answer: 'México' },
  },
  {
    id: 'quiz-country-3',
    position: { x: 118000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🍕', '🏛️', '🤌'], answer: 'Italia' },
  },
  {
    id: 'quiz-country-4',
    position: { x: 120000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🦘', '🏏', '🕷️'], answer: 'Australia' },
  },
  {
    id: 'quiz-country-5',
    position: { x: 122000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🍻', '🥨', '⚽'], answer: 'Alemania' },
  },
  {
    id: 'quiz-country-6',
    position: { x: 124000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['💃', '🎸', '🐂'], answer: 'España' },
  },
  {
    id: 'quiz-country-7',
    position: { x: 126000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🧉', '🥩', '⚽'], answer: 'Argentina' },
  },
  {
    id: 'quiz-country-8',
    position: { x: 128000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['⛪', '❄️', '🐻', '🪆'], answer: 'Rusia' },
  },
  {
    id: 'quiz-country-9',
    position: { x: 130000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🐘', '🕌', '💃', '🍛'], answer: 'India' },
  },
  /* ── 5 más difíciles ───────────────────────────────────── */
  {
    id: 'quiz-country-10',
    position: { x: 132000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🍣', '🗻', '🌸'], answer: 'Japón' },
  },
  {
    id: 'quiz-country-11',
    position: { x: 134000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🐫', '🏜️', '🕌'], answer: 'Egipto' },
  },
  {
    id: 'quiz-country-12',
    position: { x: 136000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🌷', '🚲', '🧀'], answer: 'Países Bajos (Holanda)' },
  },
  {
    id: 'quiz-country-13',
    position: { x: 138000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🍀', '🍺', '🧚'], answer: 'Irlanda' },
  },
  {
    id: 'quiz-country-14',
    position: { x: 140000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Países', emojis: ['🛕', '🐘', '🌶️'], answer: 'Tailandia' },
  },

  /* ── Ronda 4: Dichos Mexicanos (9 preguntas) ────────────── */
  {
    id: 'quiz-sayings-intro',
    position: { x: 142000, y: 0, scale: 1, rotation: 0 },
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
    id: 'quiz-saying-1',
    position: { x: 144000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🐦', '✋', '🕊️', '🕊️', '🕊️'], answer: 'Más vale pájaro en mano que cien volando' },
  },
  {
    id: 'quiz-saying-2',
    position: { x: 146000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🐕', '📢', '🚫'], answer: 'Perro que ladra no muerde' },
  },
  {
    id: 'quiz-saying-3',
    position: { x: 148000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🦐', '😴', '🌊'], answer: 'Camarón que se duerme se lo lleva la corriente' },
  },
  {
    id: 'quiz-saying-4',
    position: { x: 150000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['👄', '🤐', '🪰'], answer: 'En boca cerrada no entran moscas' },
  },
  /* Más difíciles */
  {
    id: 'quiz-saying-5',
    position: { x: 152000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🐒', '👗', '👗'], answer: 'Aunque la mona se vista de seda, mona se queda' },
  },
  {
    id: 'quiz-saying-6',
    position: { x: 154000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🪵', '➡️', '🪵'], answer: 'De tal palo, tal astilla' },
  },
  {
    id: 'quiz-saying-7',
    position: { x: 156000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['✨', '🥇', '❌'], answer: 'No todo lo que brilla es oro' },
  },
  {
    id: 'quiz-saying-8',
    position: { x: 158000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['👀', '🙈', '❤️', '💔'], answer: 'Ojos que no ven, corazón que no siente' },
  },
  {
    id: 'quiz-saying-9',
    position: { x: 160000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1.4 },
    content: { type: 'quiz-question', category: 'Dichos', emojis: ['🔨', '🏠', '🪵', '🔪'], answer: 'En casa del herrero, cuchillo de palo' },
  },

  /* ── Final: Scoreboard ──────────────────────────────────── */
  {
    id: 'scoreboard-final',
    position: { x: 162000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'spiral-zoom', duration: 3.0 },
    content: {
      type: 'scoreboard-final',
    },
    speakerNotes: '🎤 DI: "Señoras y señores… los resultados finales…" 🎭 ACCIÓN: Redoble de tambor con la boca. Deja que la animación de celebración ocurra. Ve el confetti. Observa quién ganó. "¡APLAUSOS para los ganadores! Y para los que perdieron… pues a entrenar más con los emojis. Apple lanza actualización en otoño, tienen hasta entonces."',
  },

  /* ── Cierre ─────────────────────────────────────────────── */
  {
    id: 'gg',
    position: { x: 164000, y: 0, scale: 1, rotation: 0 },
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
