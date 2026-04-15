import type { SlideData } from '../types'

export const act1Slides: SlideData[] = [
  /* ── Slide 1: Title ──────────────────────────────────────── */
  {
    id: 'title',
    position: { x: 0, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'mega-zoom', duration: 3.0, emoji: '😂' },
    content: {
      type: 'title',
      title: 'La Historia de los Emojis',
      subtitle: 'De 176 Pixeles al Dominio Mundial',
      emoji: '😂',
    },
    speakerNotes: '🎤 DI: "¡Bienvenidos, bienvenidas! Hoy les voy a contar una historia de drama, guerras, peleas, y… pixeles. La historia de los EMOJIS." 🎭 ACCIÓN: Pausa dramática después del mega-zoom. Sonríe. Deja que el logo aterrice. Cuando todos estén viendo, avanza.',
  },

  /* ── Slide 2: The Problem ────────────────────────────────── */
  {
    id: 'the-problem',
    position: { x: 2000, y: -400, scale: 0.8, rotation: -2 },
    transition: { id: 'slide', duration: 1.8 },
    content: {
      type: 'text',
      title: 'El Problema',
      body: 'Estamos en 1999. Japón. 80 millones de personas mandan mensajes como locos, pero cada mensaje se lee como una declaración de impuestos. "Llego a las 7." ¿Están emocionados? ¿Enojados? ¿Planeando tu fin? Nadie sabe. Los mensajes no tenían emoción y estaban causando malentendidos reales. Algo tenía que cambiar.',
      emoji: '📱',
    },
    speakerNotes: '🎤 DI: "Estamos en 1999. Japón. 80 millones de personas mandando mensajes como locos. Pero cada mensaje se leía como declaración de impuestos. ¿Ustedes se imaginan mandar \'llego a las 7\' sin saber si está emocionado, enojado, o planeando su muerte? CAOS." 🎭 ACCIÓN: Gesto con la mano como escribiendo en un teléfono viejo. Hazlo exagerado.',
  },

  /* ── Slide 3: The Creator ────────────────────────────────── */
  {
    id: 'the-creator',
    position: { x: 4000, y: 200, scale: 0.6, rotation: 1 },
    transition: { id: 'zoom-in', duration: 2.2 },
    content: {
      type: 'text',
      title: 'Un Tipo. Un Fin de Semana.',
      body: 'Les presento a Shigetaka Kurita. Tiene 25 años, trabaja en NTT DoCoMo (la compañía telefónica más grande de Japón), y su jefe le dice "arregla los mensajes." Entonces esta leyenda agarra papel cuadriculado, un lápiz mecánico, y dibuja 176 iconitos de 12x12 pixeles. Símbolos del clima, caritas sonrientes, una caquita. Ya saben, lo esencial.',
      emoji: '👨‍💻',
    },
    speakerNotes: '🎤 DI: "Entra Shigetaka Kurita. 25 años. Ingeniero en NTT DoCoMo — la empresa de celulares más grande de Japón. Su jefe le dice: \'Kurita, arregla los mensajes.\' Y este GALÁN agarra papel cuadriculado, un lapicito mecánico, y dibuja 176 iconitos de 12x12 pixeles a MANO." 🎭 ACCIÓN: Mira al público. "Y sí, incluyó el emoji de la caca desde el DÍA UNO. El tipo tenía visión." Pausa cómica.',
  },

  /* ── Slide 4: Original 176 ───────────────────────────────── */
  {
    id: 'original-176',
    position: { x: 6000, y: -600, scale: 0.3, rotation: 0 },
    transition: { id: 'emoji-unlock', duration: 2.5, emoji: '🔓' },
    content: {
      type: 'grid',
      retro: true,
      subtitle: 'Simulación: así de "simples" se veían en 1999 (12x12 pixeles, blanco y negro)',
      title: 'Los 176 Originales',
      items: [
        { emoji: '☀️', label: 'Sol' }, { emoji: '☁️', label: 'Nube' },
        { emoji: '☂️', label: 'Paraguas' }, { emoji: '❄️', label: 'Nieve' },
        { emoji: '⚡', label: 'Rayo' }, { emoji: '🌊', label: 'Ola' },
        { emoji: '🔥', label: 'Fuego' }, { emoji: '💧', label: 'Agua' },
        { emoji: '😃', label: 'Feliz' }, { emoji: '😢', label: 'Triste' },
        { emoji: '😠', label: 'Enojado' }, { emoji: '😍', label: 'Amor' },
        { emoji: '💀', label: 'Calavera' }, { emoji: '💩', label: 'Caca' },
        { emoji: '❤️', label: 'Corazón' }, { emoji: '💔', label: 'Roto' },
        { emoji: '🎵', label: 'Música' }, { emoji: '🎮', label: 'Juego' },
        { emoji: '📱', label: 'Teléfono' }, { emoji: '📷', label: 'Cámara' },
        { emoji: '🏠', label: 'Casa' }, { emoji: '🚗', label: 'Carro' },
        { emoji: '✈️', label: 'Avión' }, { emoji: '🚃', label: 'Tren' },
        { emoji: '🍔', label: 'Hamburguesa' }, { emoji: '🍕', label: 'Pizza' },
        { emoji: '🍺', label: 'Cerveza' }, { emoji: '🎂', label: 'Pastel' },
        { emoji: '🌸', label: 'Cerezo' }, { emoji: '🌙', label: 'Luna' },
        { emoji: '⭐', label: 'Estrella' }, { emoji: '🎁', label: 'Regalo' },
        { emoji: '🔔', label: 'Campana' }, { emoji: '⏰', label: 'Reloj' },
        { emoji: '📩', label: 'Correo' }, { emoji: '📞', label: 'Llamada' },
        { emoji: '💡', label: 'Foco' }, { emoji: '🔑', label: 'Llave' },
        { emoji: '✂️', label: 'Tijeras' }, { emoji: '📝', label: 'Nota' },
        { emoji: '🎯', label: 'Diana' }, { emoji: '🏆', label: 'Trofeo' },
        { emoji: '👟', label: 'Tenis' }, { emoji: '👕', label: 'Playera' },
        { emoji: '👑', label: 'Corona' }, { emoji: '💎', label: 'Gema' },
        { emoji: '🚬', label: 'Cigarro' }, { emoji: '💊', label: 'Pastilla' },
        { emoji: '🐶', label: 'Perro' }, { emoji: '🐱', label: 'Gato' },
        { emoji: '🐟', label: 'Pez' }, { emoji: '🐦', label: 'Pájaro' },
        { emoji: '👀', label: 'Ojos' }, { emoji: '👂', label: 'Oreja' },
        { emoji: '✋', label: 'Mano' }, { emoji: '👆', label: 'Arriba' },
        { emoji: '✌️', label: 'Paz' }, { emoji: '👍', label: 'Bien' },
        { emoji: '🙏', label: 'Orar' }, { emoji: '💪', label: 'Fuerza' },
        { emoji: '🚶', label: 'Caminar' }, { emoji: '🏃', label: 'Correr' },
      ],
    },
    speakerNotes: '🎤 DI: "Aquí están TODOS los originales. Pixel art de 12x12. En blanco y negro porque los teléfonos de los 90 no tenían pantallas a color." 🎭 ACCIÓN: Señala la pantalla. "Fíjense que ahí están ya: el corazón, la caquita, el diablito, el avión, la cerveza… Básicamente el tipo dijo \'necesitamos lo esencial\' y lo esencial incluía caca. Respeto absoluto."',
  },

  /* ── Slide 5: They Were Ugly ─────────────────────────────── */
  {
    id: 'they-were-ugly',
    position: { x: 8000, y: 400, scale: 0.7, rotation: 3 },
    transition: { id: 'emoji-split', duration: 2.2, variant: 'electric' },
    content: {
      type: 'comparison',
      title: 'El Glow-Up del Siglo',
      left: {
        retro: true,
        label: '1999: 12x12 Pixeles',
        emoji: '💩',
        description: '12 pixeles de ancho. Sin sombreado. Sin degradados. Solo vibras y un sueño. Parecía un helado de chocolate diseñado por alguien que jamás había visto chocolate.',
      },
      right: {
        label: '2026: Gloria a Todo Color',
        emoji: '💩',
        description: 'Listo para 4K, con degradados, sombras y todo. El emoji de caca ahora tiene mejor iluminación que la mayoría de las fotos de perfil de LinkedIn.',
      },
    },
    speakerNotes: '🎤 DI: "Y aquí está el GLOW-UP más grande de la historia de la tecnología." 🎭 ACCIÓN: Señala a la izquierda. "A la izquierda: 1999. 12x12 pixeles. Parecía una galleta de chocolate dibujada por alguien que nunca había visto chocolate." Pausa. Señala a la derecha. "A la derecha: 2026. Con gradientes, sombras, hasta brillo. El emoji de caca hoy tiene mejor iluminación que mis fotos de perfil." Pausa para risa.',
  },

  /* ── Slide 6: The Name ───────────────────────────────────── */
  {
    id: 'the-name',
    position: { x: 10000, y: -200, scale: 0.5, rotation: -3 },
    transition: { id: 'emoji-magic', duration: 2.5, emoji: '✨' },
    content: {
      type: 'text',
      title: 'El Nombre es Mentira',
      body: '¿Crees que "emoji" viene de "emoción"? NOPE. Es japonés: 絵 (e = imagen) + 文字 (moji = carácter). "Carácter de imagen." El hecho de que suene como "emotion" en inglés es pura coincidencia. El universo tiene un sentido del humor bien retorcido.',
      emoji: '🤯',
    },
    speakerNotes: '🎤 DI: "Ok, preguntita: ¿de dónde creen que viene la palabra \'emoji\'? ¿De \'emotion\' en inglés? ¿De \'emoticon\'? ¿Quién lo cree?" 🎭 ACCIÓN: Espera que levanten la mano. "NOPE. Se las voy a volar." Pausa. Señala pantalla. "絵 = imagen. 文字 = carácter. \'Carácter de imagen.\' En JAPONÉS. Que suene como \'emotion\' en inglés es PURA COINCIDENCIA. El universo tiene un sentido del humor bien retorcido." 🤯',
  },

  /* ── Slide 7: Japan Only ─────────────────────────────────── */
  {
    id: 'japan-only',
    position: { x: 12000, y: 600, scale: 0.8, rotation: 2 },
    transition: { id: 'emoji-door', duration: 2.2, emoji: '🚪' },
    content: {
      type: 'text',
      title: 'El Secreto Mejor Guardado de Japón',
      body: 'Por DIEZ AÑOS, los emojis fueron exclusivos de Japón. El resto del mundo seguía escribiendo :-) como cavernícolas. Y se pone peor: cada compañía telefónica japonesa tenía SUS PROPIOS emojis que no funcionaban en otras redes. Mandas un corazón en DoCoMo, llega un cuadrito vacío en SoftBank. Caos total.',
      emoji: '🇯🇵',
    },
    speakerNotes: '🎤 DI: "Y aquí viene lo bueno: por DIEZ AÑOS los emojis fueron EXCLUSIVOS de Japón. Diez. El resto del mundo seguía usando :-) y :-( como CAVERNÍCOLAS." 🎭 ACCIÓN: Cara de incredulidad. "Y se pone peor: cada compañía en Japón tenía SUS propios emojis. Mandabas un corazón en una red, llegaba un cuadrito vacío en otra. Relaciones terminaron por esto. PROBABLEMENTE."',
  },
]
