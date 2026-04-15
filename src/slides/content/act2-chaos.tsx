import type { SlideData } from '../types'

export const act2Slides: SlideData[] = [
  /* ── Slide 8: Carrier Wars ──────────────────────────────── */
  {
    id: 'carrier-wars',
    position: { x: 14000, y: -800, scale: 0.6, rotation: -4 },
    transition: { id: 'glitch', duration: 1.8 },
    content: {
      type: 'comparison',
      title: 'La Guerra de las Compañías',
      left: {
        label: 'Lo Que Mandaste',
        emoji: '❤️',
        description: 'Un hermoso corazón rojo en DoCoMo. El amor está en el aire. Pusiste toda tu alma en ese mensaje de texto.',
      },
      right: {
        label: 'Lo Que Recibieron',
        emoji: '⬜',
        description: 'Un cuadrito vacío en SoftBank. Tu declaración de amor convertida en... nada. Relaciones terminaron por esto. Probablemente.',
      },
    },
    speakerNotes: 'Tres compañías, tres sets de emojis incompatibles. La definición del caos.',
  },

  /* ── Slide 9: Apple Sneaks In ───────────────────────────── */
  {
    id: 'apple-sneaks-in',
    position: { x: 16000, y: 300, scale: 0.7, rotation: 2 },
    transition: { id: 'emoji-telescope', duration: 2.5, emoji: '🔭' },
    content: {
      type: 'text',
      title: 'Apple Entra por la Puerta Trasera',
      body: '2008. Apple lanza el iPhone en Japón y esconde un teclado de emojis en el sistema. Se suponía que era solo para Japón, pero gente de todo el mundo descubrió cómo activarlo. Apple accidentalmente creó la demanda global de emojis. Ups. El mejor "bug" de la historia.',
      emoji: '🍎',
    },
    speakerNotes: 'El teclado oculto fue un hack para competir en el mercado japonés. Se filtró globalmente.',
  },

  /* ── Slide 10: Unicode Saves the Day ────────────────────── */
  {
    id: 'unicode-saves',
    position: { x: 18000, y: -400, scale: 0.5, rotation: -1 },
    transition: { id: 'terminal', duration: 2.2 },
    content: {
      type: 'timeline',
      title: 'Unicode Salva el Día',
      events: [
        { year: '2007', text: 'Ingenieros de Google proponen estandarizar los emojis', emoji: '📋' },
        { year: '2009', text: 'Apple y Google hacen una petición formal al Consorcio Unicode', emoji: '📨' },
        { year: '2010', text: 'Unicode 6.0 incluye 722 emojis. Se restaura el orden.', emoji: '✅' },
        { year: '2011', text: 'Apple agrega el teclado emoji a iOS en todo el mundo', emoji: '🌍' },
      ],
    },
    speakerNotes: 'El Consorcio Unicode es una organización sin fines de lucro en Mountain View, CA. Ellos deciden qué emojis existen.',
  },

  /* ── Slide 11: The Explosion ────────────────────────────── */
  {
    id: 'the-explosion',
    position: { x: 20000, y: 500, scale: 0.4, rotation: 3 },
    transition: { id: 'emoji-bomb', duration: 2.8, emoji: '💣' },
    content: {
      type: 'text',
      title: 'La Gran Explosión de Emojis',
      body: 'Una vez que Apple mandó emojis a cada iPhone del planeta, Android los siguió. Luego Twitter. Luego Facebook. En 3 años, los emojis pasaron de ser una función rara de teléfonos japoneses al lenguaje de más rápido crecimiento en el mundo. Sin necesidad de Duolingo.',
      emoji: '💥',
    },
    speakerNotes: 'La explosión fue increíblemente rápida. 2011-2014 fue la fiebre del oro.',
  },

  /* ── Slide 12: The Stats ────────────────────────────────── */
  {
    id: 'the-stats',
    position: { x: 22000, y: -200, scale: 0.15, rotation: 0 },
    transition: { id: 'dolly-zoom', duration: 3.0 },
    content: {
      type: 'stat',
      value: '10,000,000,000',
      label: 'Emojis enviados cada día',
      sublabel: 'El 92% de todos los humanos en internet usan emojis. Tu abuelita estadísticamente es usuaria de emojis.',
    },
    speakerNotes: 'Diez MIL MILLONES por día. Deja que ese número pegue. El efecto de zoom lo hace más impactante.',
  },
]
