import type { SlideData } from '../types'

export const act4Slides: SlideData[] = [
  /* ── Slide 21: Cross-Platform Chaos ─────────────────────── */
  {
    id: 'cross-platform',
    position: { x: 40000, y: 200, scale: 0.6, rotation: -3 },
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
    position: { x: 42000, y: -600, scale: 0.5, rotation: 4 },
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
    position: { x: 44000, y: 500, scale: 0.7, rotation: -1 },
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
    position: { x: 46000, y: -200, scale: 0.4, rotation: 0 },
    transition: { id: 'emoji-clapper', duration: 2.5, emoji: '🎬' },
    content: {
      type: 'timeline',
      title: 'De Revólver a Pistola de Agua',
      events: [
        { year: '2016', text: 'Apple cambia el revólver por pistola de agua', emoji: '🔫' },
        { year: '2017', text: 'Twitter sigue a Apple. Empiezan las fichas de dominó.', emoji: '🐦' },
        { year: '2018', text: 'Google, Samsung y Facebook hacen el cambio', emoji: '💧' },
        { year: '2018', text: 'Microsoft aguanta con su revólver (respeto)', emoji: '🤠' },
        { year: '2019', text: 'Microsoft finalmente cede. Todas las plataformas: pistola de agua.', emoji: '🏳️' },
      ],
    },
    speakerNotes: '🎤 DI: "La evolución del emoji de pistola es la historia de cómo una empresa se atreve a hacer algo y las demás siguen como borregos." 🎭 ACCIÓN: Repasa los años. "2016 Apple rompe el hielo con su pistolita de agua. 2017 Twitter sigue. 2018 Google, Samsung y Facebook también. ¿Y Microsoft? Microsoft aguantó como CAMPEÓN." Pausa. "Tres años siendo la ÚNICA plataforma con pistola real. Un rebelde. Un icono. Un… \'qué onda con Microsoft\'. Al final cedió en 2019. Todo el mundo: pistola de agua. Fin."',
  },
]
