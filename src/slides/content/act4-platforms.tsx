import type { SlideData } from '../types'

export const act4Slides: SlideData[] = [
  /* ── Slide 21: Cross-Platform Chaos ─────────────────────── */
  {
    id: 'cross-platform',
    position: { x: 49000, y: 200, scale: 0.6, rotation: -3 },
    transition: { id: 'emoji-tv', duration: 2.2, emoji: '📺' },
    content: {
      type: 'text',
      title: 'Mismo Emoji, Aspectos Diferentes',
      body: 'Aquí viene una pesadilla divertida: cada plataforma diseña su propia versión de cada emoji. Manda una "cara ligeramente sonriente" desde un iPhone y se ve amable. Véla en Samsung y parece que está planeando un asesinato. Mismo código Unicode. Energía completamente diferente.',
      emoji: '😅',
    },
    speakerNotes: '🎤 DI: "Ahora pongan atención porque esto explota cabezas. Cada plataforma — Apple, Google, Samsung, Microsoft, WhatsApp — diseña SU PROPIA versión de cada emoji." 🎭 ACCIÓN: Cara de disbelief. "Mismo código Unicode. Arte completamente distinto. Mandas \'cara ligeramente sonriente\' desde iPhone y se ve amable. El mismo emoji en Samsung parece que está planeando un HOMICIDIO. Literalmente la misma data. Energía MUY diferente."',
  },

  /* ── Slide 22: Samsung Was Wild ─────────────────────────── */
  {
    id: 'samsung-worst',
    position: { x: 51000, y: -600, scale: 0.5, rotation: 4 },
    transition: { id: 'scan-line', duration: 1.8 },
    content: {
      type: 'text',
      title: 'Samsung: El Peor Infractor',
      body: 'Los emojis viejos de Samsung eran DE LOCOS. Su "cara de mueca" se veía feliz. Su "bailarina" miraba al lado contrario. Su "galleta" parecía una galleta salada. Samsung básicamente estaba corriendo su propio universo cinematográfico de emojis donde nada tenía sentido y todos estaban ligeramente malditos.',
      emoji: '🤦',
    },
    speakerNotes: '🎤 DI: "Samsung, mis compadres. Samsung tuvo una ÉPOCA." 🎭 ACCIÓN: Cabeza hacia atrás, cara de frustración. "Su cara de mueca se veía FELIZ. Su bailarina estaba mirando al lado contrario. Su galleta parecía una galleta salada. Era como si vivieran en un universo paralelo donde todo estaba ligeramente MALDITO." Pausa. "Finalmente arreglaron todo en 2018 pero los viejos… viven en la infamia. El internet nunca olvida."',
  },

  /* ── Slide 23: Cookie Incident ──────────────────────────── */
  {
    id: 'cookie-incident',
    position: { x: 53000, y: 500, scale: 0.7, rotation: -1 },
    transition: { id: 'emoji-snapshot', duration: 2.2, emoji: '📸' },
    content: {
      type: 'comparison',
      title: 'La Crisis de la Galleta',
      left: {
        label: 'Lo Que Esperabas',
        emoji: '🍪',
        description: 'Una deliciosa galleta con chispas de chocolate. Doradita, un poco suavecita, como las que hace la abuelita.',
      },
      right: {
        label: 'Lo Que Samsung Te Dio',
        emoji: '🍘',
        description: 'Esto. La "galleta" de Samsung parecía una galleta de arroz con crisis de identidad. La gente literalmente no podía saber qué comida se suponía que era. ¿Galleta? ¿Cracker? ¿Artefacto antiguo? Nadie sabía.',
      },
    },
    speakerNotes: '🎤 DI: "Exhibit A: la GALLETA." 🎭 ACCIÓN: Señala cada lado. "A la izquierda: lo que todos esperamos cuando mandan \'🍪\'. Una galletita tibia con chispas de chocolate. Como las de la abuela." Pausa. "A la derecha: LO QUE SAMSUNG NOS DIO DURANTE AÑOS. Eso no es una galleta. Eso es una galleta de ARROZ con CRISIS DE IDENTIDAD. La gente LITERALMENTE no sabía qué comida era. Samsung eventualmente lo arregló, pero el trauma PERMANECE."',
  },

  /* ── Slide 24: Pistol Timeline ──────────────────────────── */
  {
    id: 'pistol-timeline',
    position: { x: 55000, y: -200, scale: 0.4, rotation: 0 },
    transition: { id: 'emoji-clapper', duration: 2.5, emoji: '🎬' },
    content: {
      type: 'timeline',
      title: 'De Revólver a Pistola de Agua',
      events: [
        { year: '1 Ago 2016', text: 'Apple cambia el revólver por pistola de agua', emoji: '🔫' },
        { year: '2 Ago 2016', text: 'Microsoft hace lo OPUESTO: cambia su pistolita de rayos por un REVÓLVER realista', emoji: '🤠' },
        { year: '2018', text: 'Google, Samsung, Facebook y Twitter se alinean: todos a pistola de agua', emoji: '💧' },
        { year: '2018', text: 'Microsoft por fin se rinde. Pistola de agua universal.', emoji: '🏳️' },
        { year: 'Jul 2024', text: 'Plot twist: X (Twitter) regresa a pistola real. El caos nunca muere.', emoji: '😱' },
      ],
    },
    speakerNotes: '🎤 DI: "Y aquí viene una de las ANÉCDOTAS más absurdas de la historia de los emojis." 🎭 ACCIÓN: Repasa los años. "1 de agosto de 2016: Apple cambia su revólver por una pistolita de agua. Un DÍA DESPUÉS — no una semana, UN DÍA — Microsoft hace LO OPUESTO. Tenía una pistolita de rayos de juguete y la cambió… a un REVÓLVER REALISTA." Pausa. "Se pasaron al lado OSCURO mientras todos se iban al lado lindo. En 2018 se rindieron junto con Google, Samsung, Facebook y Twitter." Pausa dramática. "Y cuando creías que ya habíamos cerrado el tema… en julio del 2024, X — el Twitter de Elon — regresó a PISTOLA REAL. El drama nunca termina."',
  },

  /* ── Slide 25: Microsoft Plot Twist ──────────────────────── */
  {
    id: 'microsoft-plot-twist',
    position: { x: 56000, y: 900, scale: 0.5, rotation: -4 },
    transition: { id: 'whip-pan', duration: 1.8 },
    content: {
      type: 'comparison',
      title: 'Microsoft: 24 Horas Para Arruinarlo Todo',
      left: {
        label: '1 Ago 2016 — Apple',
        emoji: '💧',
        description: 'Cambia el revólver realista por una pistolita de agua verde brillante. Un mensaje de paz. El mundo aplaude.',
      },
      right: {
        label: '2 Ago 2016 — Microsoft',
        emoji: '🤠',
        description: 'AL DÍA SIGUIENTE, Microsoft hace lo EXACTAMENTE opuesto. Tenía una pistolita de rayos de juguete y la cambia… a un REVÓLVER REAL. Se pasaron al lado oscuro en 24 horas.',
      },
    },
    speakerNotes: '🎤 DI: "Ok, este slide merece su propio momento." 🎭 ACCIÓN: Mira al público, cara cómplice. "Es tan absurdo que cuando lo cuento la gente cree que estoy exagerando. Pero NO. Literalmente en 24 horas: Apple se va hacia la paz, Microsoft se va hacia LA GUERRA. Fueron al REVÉS. Completamente." Pausa. "¿Ustedes se imaginan la junta en Microsoft ese lunes? \'Oigan, Apple acaba de poner una pistolita de agua… ¿qué hacemos?\' \'Pongámosle BALAS.\' \'Sí, eso.\' Genio puro."',
  },
]
