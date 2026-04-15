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
    speakerNotes: 'Slide de bienvenida. Deja que el mega-zoom aterrice, luego pausa para efecto dramático.',
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
    speakerNotes: 'Pon la escena: Japón a finales de los 90 iba MUY adelantado en tecnología móvil.',
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
    speakerNotes: 'Kurita literalmente los dibujó a mano en papel cuadriculado. El emoji de caca estaba en el SET ORIGINAL.',
  },

  /* ── Slide 4: Original 176 ───────────────────────────────── */
  {
    id: 'original-176',
    position: { x: 6000, y: -600, scale: 0.3, rotation: 0 },
    transition: { id: 'emoji-unlock', duration: 2.5, emoji: '🔓' },
    content: {
      type: 'grid',
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
    speakerNotes: 'Eran pixel art de 12x12. El emoji de caca estaba ahí desde el día uno. Prioridades.',
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
    speakerNotes: 'Saca risas comparando el pixel art viejo con las versiones modernas.',
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
    speakerNotes: 'Esto genuinamente le vuela la cabeza a la gente. Pausa después de la revelación.',
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
    speakerNotes: 'Transición al Acto 2 que cubre las guerras entre compañías en detalle.',
  },
]
