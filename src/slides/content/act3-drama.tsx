import type { SlideData } from '../types'

export const act3Slides: SlideData[] = [
  /* ── Slide 13: Peach Incident (was 14, gun-debate removed — covered in act4 pistol-timeline) ── */
  {
    id: 'peach-incident',
    position: { x: 35000, y: -300, scale: 0.7, rotation: 4 },
    transition: { id: 'emoji-pop', duration: 1.8, emoji: '🍑' },
    content: {
      type: 'text',
      title: 'El Incidente del Durazno',
      body: 'En 2016, Apple intentó hacer que el emoji de durazno se pareciera más a un durazno real. El internet SE REBELÓ. Se firmaron peticiones. Se escribieron artículos de opinión. Apple discretamente lo regresó a su forma, digamos... familiar. El pueblo habló, y el pueblo quería pastel. Pastel de durazno.',
      emoji: '🍑',
    },
    speakerNotes: '🎤 DI: "2016. Apple intenta cambiar el emoji del durazno 🍑 para que parezca un durazno REAL." 🎭 ACCIÓN: Cara seria, casi indignada. "El internet se VOLVIÓ LOCO. Se firmaron peticiones. Se escribieron artículos. Hubo MARCHAS metafóricas. ¿Y saben por qué?" Pausa. "Porque el durazno ya no era un durazno. Era algo MÁS. Algo… familiar. Apple se dobló. El pueblo habló. Y el pueblo quería… bueno, ustedes saben qué quería el pueblo." Sonrisa cómplice.',
  },

  /* ── Slide 15: Burger War ───────────────────────────────── */
  {
    id: 'burger-war',
    position: { x: 37000, y: 600, scale: 0.5, rotation: -2 },
    transition: { id: 'whip-pan', duration: 1.6 },
    content: {
      type: 'comparison',
      title: 'La Guerra de la Hamburguesa',
      left: {
        label: 'Google (Antes)',
        image: import.meta.env.BASE_URL + 'images/burger-before.png',
        description: 'Google puso el queso DEBAJO de la carne. Debajo. Como un monstruo.',
      },
      right: {
        label: 'Google (Después)',
        image: import.meta.env.BASE_URL + 'images/burger-after.png',
        description: 'El queso ENCIMA de la carne. Como debe ser. El CEO priorizó esto.',
      },
    },
    speakerNotes: '🎤 DI: "Ok, esto es REAL. Google, por años, tenía el emoji de hamburguesa con el QUESO DEBAJO DE LA CARNE." 🎭 ACCIÓN: Cara de horror. "DEBAJO. Como un MONSTRUO." Pausa. "Alguien lo notó en Twitter. Se armó la tremenda. ¿Y saben qué hizo el CEO de Google, Sundar Pichai, el señor que maneja una empresa de UN BILLÓN de dólares? Literalmente tuiteó: \'Voy a dejar TODO lo que estoy haciendo para arreglar esto el lunes.\' Un billón de dólares. Priorizando una HAMBURGUESA EMOJI. Qué época."',
  },

  /* ── Slide 16: Word of the Year ─────────────────────────── */
  {
    id: 'word-of-year',
    position: { x: 39000, y: -700, scale: 0.3, rotation: 0 },
    transition: { id: 'spotlight', duration: 2.5 },
    content: {
      type: 'stat',
      value: '😂',
      label: 'Palabra del Año 2015 de Oxford',
      sublabel: 'No es una palabra. Ni siquiera son letras. Un emoji. El Diccionario Oxford dijo "esto está bien" y los profesores de inglés de todo el mundo sintieron una perturbación en la Fuerza.',
    },
    speakerNotes: '🎤 DI: "El Diccionario de OXFORD. El diccionario más respetado del idioma inglés. En 2015 eligió COMO PALABRA DEL AÑO… 😂." 🎭 ACCIÓN: Pausa larga. Señala el emoji. "No es una palabra. Ni siquiera son letras. Es una carita llorando de risa. Los profesores de inglés de todo el mundo sintieron una PERTURBACIÓN en la Fuerza ese día." Pausa cómica. "\'Cara con lágrimas de alegría\' es su nombre oficial. No estoy mintiendo."',
  },

  /* ── Slide 17: Eggplant Ban ─────────────────────────────── */
  {
    id: 'eggplant-ban',
    position: { x: 41000, y: 400, scale: 0.7, rotation: 5 },
    transition: { id: 'emoji-freeze', duration: 1.8, emoji: '🍆' },
    content: {
      type: 'text',
      title: 'Prohibido en Instagram',
      body: 'Instagram prohibió el emoji de berenjena en las búsquedas de hashtags. No drogas. No armas. Una verdura. Porque aparentemente la humanidad no era de confianza con una verdura morada. La berenjena no hizo nada malo, y sin embargo aquí estamos.',
      emoji: '🍆',
    },
    speakerNotes: '🎤 DI: "Instagram. Año 2015. Prohibió el emoji de la berenjena 🍆 en las búsquedas de hashtags." 🎭 ACCIÓN: Cara de inocente. "No drogas. No armas. No violencia. UNA VERDURA." Pausa. "Aparentemente la humanidad no era de confianza con una verdura morada. La berenjena no hizo NADA malo y sin embargo aquí estamos. Y no, no les voy a explicar por qué la prohibieron. Ustedes sabrán."',
  },

  /* ── Slide 18: Finland Emoji ────────────────────────────── */
  {
    id: 'finland-emoji',
    position: { x: 43000, y: -100, scale: 0.6, rotation: -4 },
    transition: { id: 'emoji-portal', duration: 2.5, emoji: '🇫🇮' },
    content: {
      type: 'text',
      title: 'Finlandia Tiene Su Propio Emoji',
      body: 'Finlandia es el ÚNICO país que creó su propio set nacional de emojis. Hicieron emojis para saunas, teléfonos Nokia, headbangers de heavy metal, y un señor que no puede dejar de hablar del clima. Son reales. Finlandia no está jugando.',
      emoji: '🇫🇮',
    },
    speakerNotes: '🎤 DI: "Dato curioso: Finlandia es el ÚNICO país en TODO EL MUNDO que creó su propio set oficial de emojis." 🎭 ACCIÓN: Sonrisa. "Y los hicieron a su ESTILO. Hay un emoji de SAUNA. Un teléfono NOKIA que no se rompe. Un señor HEADBANGER de heavy metal. Y un señor que no puede dejar de hablar del clima. Son reales, son oficiales, y son GLORIOSOS. El gobierno finlandés gastó dinero en ESTO. Amo a los finlandeses."',
  },

  /* ── Slide 19: Approval Process ─────────────────────────── */
  {
    id: 'approval-process',
    position: { x: 45000, y: 700, scale: 0.5, rotation: 2 },
    transition: { id: 'loading-bar', duration: 3.0 },
    content: {
      type: 'timeline',
      title: '¿Quieres un Emoji Nuevo? Buena Suerte.',
      events: [
        { year: 'Paso 1', text: 'Escribe una propuesta formal con datos de uso', emoji: '📝' },
        { year: 'Paso 2', text: 'Envíala al Subcomité de Emoji de Unicode', emoji: '📮' },
        { year: 'Paso 3', text: 'Sobrevive múltiples rondas de revisión', emoji: '😰' },
        { year: 'Paso 4', text: 'Espera 2+ años para una decisión final', emoji: '⏳' },
        { year: 'Dato', text: 'La "🤌" (dedos juntos italianos) tardó 2 años de propuestas y debates', emoji: '🤌' },
      ],
    },
    speakerNotes: '🎤 DI: "Ok preguntita: ¿quién aquí ha pensado \'ay, debería existir un emoji de X\'?" 🎭 ACCIÓN: Levantar mano. "Bueno, pues pueden pedirlo. Pero no es fácil." Repasa los pasos en pantalla. "Primero: propuesta formal con datos. Segundo: la mandas al Subcomité de Emojis. Tercero: sobrevives varias rondas de revisión. Y cuarto: esperas DOS AÑOS mínimo." Pausa. "El 🤌 italiano — los ‘deditos juntos’ — tardó DOS años de propuestas. Esa manita vio más trámites que yo sacando el pasaporte."',
  },

  /* ── Slide 20: The Numbers ──────────────────────────────── */
  {
    id: 'the-numbers',
    position: { x: 47000, y: -500, scale: 0.15, rotation: 0 },
    transition: { id: 'dolly-zoom', duration: 2.8 },
    content: {
      type: 'stat',
      value: '3,953',
      label: 'Emojis existen en 2026 (Unicode 17.0)',
      sublabel: 'Pero la persona promedio usa como 50. Eso significa que 3,903 emojis están ahí... sentaditos. Sin usar. Sin amor. Piensa en eso.',
    },
    speakerNotes: '🎤 DI: "En 2026 existen TRES MIL NOVECIENTOS CINCUENTA Y TRES emojis. Unicode 17.0, septiembre del 2025." 🎭 ACCIÓN: Deja que el número pegue. "Pero la persona promedio usa como… 50. Los mismos 50 de siempre: 😂 ❤️ 🔥 👍 🙏. Eso significa que 3,903 emojis están ahí sentaditos. Sin usar. Sin amor." Pausa cómica. "¿Quién aquí HA USADO alguna vez el emoji del teleférico? ¿Del frasco de medicina? ¿Del fax? Exacto. Nadie. Pobres emojis."',
  },
]
