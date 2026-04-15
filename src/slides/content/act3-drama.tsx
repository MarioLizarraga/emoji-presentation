import type { SlideData } from '../types'

export const act3Slides: SlideData[] = [
  /* ── Slide 13: Gun Debate ───────────────────────────────── */
  {
    id: 'gun-debate',
    position: { x: 24000, y: 800, scale: 0.6, rotation: -3 },
    transition: { id: 'split-blood', duration: 2.5 },
    content: {
      type: 'emoji-showcase',
      emoji: '🔫',
      title: 'El Gran Debate de la Pistola',
      description: 'En 2016, Apple cambió en silencio el emoji de pistola de un revólver realista a una pistola de agua verde brillante. Las demás plataformas entraron en pánico y lo copiaron. Durante unos 6 meses, podías mandar una pistola de agua desde un iPhone y tu amigo con Android recibía una Glock real. El pico de la mala comunicación.',
      platforms: [],
    },
    speakerNotes: 'El período de incompatibilidad fue genuinamente peligroso para contextos legales. La gente mandaba el emoji de pistola en amenazas que se veían como juguetes en algunos teléfonos.',
  },

  /* ── Slide 14: Peach Incident ───────────────────────────── */
  {
    id: 'peach-incident',
    position: { x: 26000, y: -300, scale: 0.7, rotation: 4 },
    transition: { id: 'emoji-pop', duration: 1.8, emoji: '🍑' },
    content: {
      type: 'text',
      title: 'El Incidente del Durazno',
      body: 'En 2016, Apple intentó hacer que el emoji de durazno se pareciera más a un durazno real. El internet SE REBELÓ. Se firmaron peticiones. Se escribieron artículos de opinión. Apple discretamente lo regresó a su forma, digamos... familiar. El pueblo habló, y el pueblo quería pastel. Pastel de durazno.',
      emoji: '🍑',
    },
    speakerNotes: 'La reacción fue inmediata y abrumadora. Apple cedió en la siguiente beta.',
  },

  /* ── Slide 15: Burger War ───────────────────────────────── */
  {
    id: 'burger-war',
    position: { x: 28000, y: 600, scale: 0.5, rotation: -2 },
    transition: { id: 'whip-pan', duration: 1.6 },
    content: {
      type: 'comparison',
      title: 'La Guerra de la Hamburguesa',
      left: {
        label: 'Google (Antes)',
        emoji: '🍔',
        description: 'Google puso el queso DEBAJO de la carne. Debajo. Como un monstruo. El internet perdió la cabeza. El CEO de Google, Sundar Pichai, tuiteó que iba a "dejar todo" para arreglarlo.',
      },
      right: {
        label: 'La Forma Correcta',
        emoji: '🍔',
        description: 'El queso va ENCIMA de la carne. Esto no es debatible. El CEO de una empresa de un billón de dólares priorizó un emoji de hamburguesa sobre... todo lo demás. Respeto.',
      },
    },
    speakerNotes: 'Sundar Pichai realmente tuiteó sobre esto. Un CEO priorizando la posición del emoji. Qué época para estar vivo.',
  },

  /* ── Slide 16: Word of the Year ─────────────────────────── */
  {
    id: 'word-of-year',
    position: { x: 30000, y: -700, scale: 0.3, rotation: 0 },
    transition: { id: 'spotlight', duration: 2.5 },
    content: {
      type: 'stat',
      value: '😂',
      label: 'Palabra del Año 2015 de Oxford',
      sublabel: 'No es una palabra. Ni siquiera son letras. Un emoji. El Diccionario Oxford dijo "esto está bien" y los profesores de inglés de todo el mundo sintieron una perturbación en la Fuerza.',
    },
    speakerNotes: 'El nombre oficial es "Cara con Lágrimas de Alegría." Oxford lo eligió porque fue el emoji más usado globalmente ese año.',
  },

  /* ── Slide 17: Eggplant Ban ─────────────────────────────── */
  {
    id: 'eggplant-ban',
    position: { x: 32000, y: 400, scale: 0.7, rotation: 5 },
    transition: { id: 'emoji-freeze', duration: 1.8, emoji: '🍆' },
    content: {
      type: 'text',
      title: 'Prohibido en Instagram',
      body: 'Instagram prohibió el emoji de berenjena en las búsquedas de hashtags. No drogas. No armas. Una verdura. Porque aparentemente la humanidad no era de confianza con una verdura morada. La berenjena no hizo nada malo, y sin embargo aquí estamos.',
      emoji: '🍆',
    },
    speakerNotes: 'El durazno también fue restringido pero no completamente prohibido. A la berenjena le fue peor.',
  },

  /* ── Slide 18: Finland Emoji ────────────────────────────── */
  {
    id: 'finland-emoji',
    position: { x: 34000, y: -100, scale: 0.6, rotation: -4 },
    transition: { id: 'emoji-portal', duration: 2.5, emoji: '🇫🇮' },
    content: {
      type: 'text',
      title: 'Finlandia Tiene Su Propio Emoji',
      body: 'Finlandia es el ÚNICO país que creó su propio set nacional de emojis. Hicieron emojis para saunas, teléfonos Nokia, headbangers de heavy metal, y un señor que no puede dejar de hablar del clima. Son reales. Finlandia no está jugando.',
      emoji: '🇫🇮',
    },
    speakerNotes: 'Busca "Finland emoji" para verlos. El de heavy metal es *chef\'s kiss*.',
  },

  /* ── Slide 19: Approval Process ─────────────────────────── */
  {
    id: 'approval-process',
    position: { x: 36000, y: 700, scale: 0.5, rotation: 2 },
    transition: { id: 'loading-bar', duration: 3.0 },
    content: {
      type: 'timeline',
      title: '¿Quieres un Emoji Nuevo? Buena Suerte.',
      events: [
        { year: 'Paso 1', text: 'Escribe una propuesta formal con datos de uso', emoji: '📝' },
        { year: 'Paso 2', text: 'Envíala al Subcomité de Emoji de Unicode', emoji: '📮' },
        { year: 'Paso 3', text: 'Sobrevive múltiples rondas de revisión', emoji: '😰' },
        { year: 'Paso 4', text: 'Espera 2+ años para una decisión final', emoji: '⏳' },
        { year: 'Dato', text: '🫠 (Cara Derritiéndose) tardó 3 años en aprobarse', emoji: '🫠' },
      ],
    },
    speakerNotes: 'El Consorcio Unicode se reúne trimestralmente. Tu propuesta de emoji compite con cientos de otras.',
  },

  /* ── Slide 20: The Numbers ──────────────────────────────── */
  {
    id: 'the-numbers',
    position: { x: 38000, y: -500, scale: 0.15, rotation: 0 },
    transition: { id: 'dolly-zoom', duration: 2.8 },
    content: {
      type: 'stat',
      value: '3,782',
      label: 'Emojis existen en 2026',
      sublabel: 'Pero la persona promedio usa como 50. Eso significa que 3,732 emojis están ahí... sentaditos. Sin usar. Sin amor. Piensa en eso.',
    },
    speakerNotes: 'Pregunta al público: ¿quién ha usado alguna vez el emoji del teleférico? Exacto.',
  },
]
