import type { SlideData } from '../types'

export const act4Slides: SlideData[] = [
  /* ── Slide 21: Cross-Platform Chaos ─────────────────────── */
  {
    id: 'cross-platform',
    position: { x: 50000, y: 200, scale: 0.6, rotation: -3 },
    transition: { id: 'emoji-tv', duration: 2.2, emoji: '📺' },
    content: {
      type: 'emoji-showcase',
      emoji: '🙂',
      title: 'Mismo Emoji, Aspectos Diferentes',
      description: 'Cada plataforma diseña su PROPIA versión. Mismo código Unicode, energía completamente diferente.',
      platforms: [
        { platform: 'apple' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/smile-apple.png' },
        { platform: 'google' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/smile-google.png' },
        { platform: 'samsung' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/smile-samsung-old.png' },
        { platform: 'microsoft' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/smile-microsoft.png' },
      ],
    },
    speakerNotes: '🎤 DI: "Ahora pongan atención porque esto explota cabezas. Cada plataforma — Apple, Google, Samsung, Microsoft, WhatsApp — diseña SU PROPIA versión de cada emoji." 🎭 ACCIÓN: Cara de disbelief. "Mismo código Unicode. Arte completamente distinto. Mandas \'cara ligeramente sonriente\' desde iPhone y se ve amable. El mismo emoji en Samsung parece que está planeando un HOMICIDIO. Literalmente la misma data. Energía MUY diferente."',
  },

  /* ── Slide 22: Samsung Was Wild ─────────────────────────── */
  {
    id: 'samsung-worst',
    position: { x: 53000, y: -600, scale: 0.5, rotation: 4 },
    transition: { id: 'scan-line', duration: 1.8 },
    content: {
      type: 'emoji-showcase',
      emoji: '😬',
      title: 'Samsung: El Peor Infractor',
      description: 'La "cara de mueca" 😬 — mira cómo Apple la hizo incómoda y Samsung la hizo... ¿feliz? Un universo paralelo donde todo estaba ligeramente maldito.',
      platforms: [
        { platform: 'apple' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/grimace-apple.png' },
        { platform: 'samsung' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/grimace-samsung-old.png' },
        { platform: 'samsung' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/grimace-samsung-new.png' },
      ],
    },
    speakerNotes: '🎤 DI: "Samsung, mis compadres. Samsung tuvo una ÉPOCA." 🎭 ACCIÓN: Cabeza hacia atrás, cara de frustración. "Su cara de mueca se veía FELIZ. Su bailarina estaba mirando al lado contrario. Su galleta parecía una galleta salada. Era como si vivieran en un universo paralelo donde todo estaba ligeramente MALDITO." Pausa. "Finalmente arreglaron todo en 2018 pero los viejos… viven en la infamia. El internet nunca olvida."',
  },

  /* ── Slide 23: Cookie Incident ──────────────────────────── */
  {
    id: 'cookie-incident',
    position: { x: 56000, y: 500, scale: 0.7, rotation: -1 },
    transition: { id: 'emoji-snapshot', duration: 2.2, emoji: '📸' },
    content: {
      type: 'comparison',
      title: 'La Crisis de la Galleta',
      left: {
        label: 'Lo Que Esperabas (Apple)',
        image: import.meta.env.BASE_URL + 'images/platforms/cookie-apple.png',
        description: 'Una deliciosa galleta con chispas de chocolate. Doradita, suavecita, como las de la abuelita.',
      },
      right: {
        label: 'Lo Que Samsung Te Dio',
        image: import.meta.env.BASE_URL + 'images/platforms/cookie-samsung-old.png',
        description: 'Esto. La "galleta" de Samsung parecía una galleta de arroz con crisis de identidad.',
      },
    },
    speakerNotes: '🎤 DI: "Exhibit A: la GALLETA." 🎭 ACCIÓN: Señala cada lado. "A la izquierda: lo que todos esperamos cuando mandan \'🍪\'. Una galletita tibia con chispas de chocolate. Como las de la abuela." Pausa. "A la derecha: LO QUE SAMSUNG NOS DIO DURANTE AÑOS. Eso no es una galleta. Eso es una galleta de ARROZ con CRISIS DE IDENTIDAD. La gente LITERALMENTE no sabía qué comida era. Samsung eventualmente lo arregló, pero el trauma PERMANECE."',
  },

  /* ── Slide 24: Pistol Timeline ──────────────────────────── */
  {
    id: 'pistol-timeline',
    position: { x: 59000, y: -200, scale: 0.4, rotation: 0 },
    transition: { id: 'emoji-clapper', duration: 2.5, emoji: '🎬' },
    content: {
      type: 'emoji-showcase',
      emoji: '🔫',
      title: 'De Revólver a Pistola de Agua',
      description: '2016: Apple cambia a pistola de agua. Microsoft hace LO OPUESTO. 2018: todos se alinean. 2024: X (Twitter) regresa a pistola real.',
      platforms: [
        { platform: 'apple' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/pistol-apple.png' },
        { platform: 'google' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/pistol-google.png' },
        { platform: 'samsung' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/pistol-samsung-old.png' },
        { platform: 'microsoft' as const, imageUrl: import.meta.env.BASE_URL + 'images/platforms/pistol-microsoft.png' },
      ],
    },
    speakerNotes: '🎤 DI: "Y aquí viene una de las ANÉCDOTAS más absurdas de la historia de los emojis." 🎭 ACCIÓN: Repasa los años. "1 de agosto de 2016: Apple cambia su revólver por una pistolita de agua. Un DÍA DESPUÉS — no una semana, UN DÍA — Microsoft hace LO OPUESTO. Tenía una pistolita de rayos de juguete y la cambió… a un REVÓLVER REALISTA." Pausa. "Se pasaron al lado OSCURO mientras todos se iban al lado lindo. En 2018 se rindieron junto con Google, Samsung, Facebook y Twitter." Pausa dramática. "Y cuando creías que ya habíamos cerrado el tema… en julio del 2024, X — el Twitter de Elon — regresó a PISTOLA REAL. El drama nunca termina."',
  },

  /* ── Slide 25: Microsoft Plot Twist ──────────────────────── */
  {
    id: 'microsoft-plot-twist',
    position: { x: 62000, y: 900, scale: 0.5, rotation: -4 },
    transition: { id: 'whip-pan', duration: 1.8 },
    content: {
      type: 'comparison',
      title: 'Microsoft: 24 Horas Para Arruinarlo Todo',
      left: {
        label: '1 Ago 2016 — Apple',
        image: import.meta.env.BASE_URL + 'images/platforms/pistol-apple.png',
        description: 'Cambia el revólver realista por una pistolita de agua verde brillante. Mensaje de paz.',
      },
      right: {
        label: '2 Ago 2016 — Microsoft',
        image: import.meta.env.BASE_URL + 'images/platforms/pistol-microsoft.png',
        description: 'AL DÍA SIGUIENTE, Microsoft cambia su pistolita de rayos por un REVÓLVER REAL. 24 horas en el lado oscuro.',
      },
    },
    speakerNotes: '🎤 DI: "Ok, este slide merece su propio momento." 🎭 ACCIÓN: Mira al público, cara cómplice. "Es tan absurdo que cuando lo cuento la gente cree que estoy exagerando. Pero NO. Literalmente en 24 horas: Apple se va hacia la paz, Microsoft se va hacia LA GUERRA. Fueron al REVÉS. Completamente." Pausa. "¿Ustedes se imaginan la junta en Microsoft ese lunes? \'Oigan, Apple acaba de poner una pistolita de agua… ¿qué hacemos?\' \'Pongámosle BALAS.\' \'Sí, eso.\' Genio puro."',
  },
]
