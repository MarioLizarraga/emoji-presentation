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

  /* ── Slide 2.5: Plot Twist — la historia empieza antes ───── */
  {
    id: 'plot-twist-prehistory',
    position: { x: 2700, y: 1100, scale: 0.7, rotation: -5 },
    transition: { id: 'glitch', duration: 2.2 },
    content: {
      type: 'title',
      title: 'PLOT TWIST',
      subtitle: 'Todos te dicen que los emojis nacieron en 1999. Pero esta historia empieza 11 años ANTES.',
      emoji: '🕰️',
    },
    speakerNotes: '🎤 DI: "Pero antes de meternos con Kurita, tengo que confesarles algo." 🎭 ACCIÓN: Pausa. Cara seria. "Todo lo que van a encontrar en Wikipedia, en TikTok, en los hilos de Twitter de \'datos curiosos\' les va a decir que el emoji se inventó en 1999. MENTIRA. O más bien: VERDAD INCOMPLETA. La historia empieza ANTES. MUCHO antes. Agárrense."',
  },

  /* ── Slide 2.6: Sharp PA-8500 (1988) ─────────────────────── */
  {
    id: 'sharp-1988',
    position: { x: 3100, y: -1200, scale: 0.55, rotation: 3 },
    transition: { id: 'pixel-dissolve', duration: 2.5 },
    content: {
      type: 'emoji-showcase',
      emoji: '🗓️',
      title: '1988: Sharp PA-8500',
      description: 'Los ~100 iconitos originales a 16x16 pixeles. 11 años ANTES de Kurita. Descubiertos por el investigador Matt Sephton en 2024.',
      image: import.meta.env.BASE_URL + 'images/sharp-pa-8500.jpg',
      imageFilter: 'invert(1) grayscale(1) brightness(1.5) contrast(1.3)',
    },
    speakerNotes: '🎤 DI: "1988. Japón. Sharp saca una agenda electrónica — el PA-8500 — con CIEN ICONITOS. Caritas, clima, símbolos. A 16x16 pixeles. ONCE AÑOS antes de lo que te cuentan en los libros." 🎭 ACCIÓN: Señala la pantalla. "ESTOS son los emojis reales. Los primeros emojis documentados de la HISTORIA. ¿Y por qué nunca lo supiste? Porque nadie lo había documentado hasta 2024, cuando un investigador llamado Matt Sephton se clavó con PDAs japonesas viejas y los sacó a la luz."',
  },

  /* ── Slide 2.7: SoftBank 1997 — la caquita es suya ────────── */
  {
    id: 'softbank-1997',
    position: { x: 3500, y: 900, scale: 0.6, rotation: -2 },
    transition: { id: 'emoji-pop', duration: 2.2, emoji: '💩' },
    content: {
      type: 'emoji-showcase',
      emoji: '📱',
      title: '1997: SoftBank Se Adelanta',
      description: '90 emojis del J-Phone SkyWalker DP-211SW (1997). DOS AÑOS antes que Kurita. Y sí, el emoji de la CAQUITA 💩 ya estaba aquí.',
      image: import.meta.env.BASE_URL + 'images/softbank-1997.jpg',
      imageFilter: 'invert(1) brightness(1.5) contrast(1.3)',
    },
    speakerNotes: '🎤 DI: "1 de noviembre de 1997. Dos años ANTES de Kurita. La compañía J-Phone — que hoy se llama SoftBank — lanza el celular SkyWalker DP-211SW con 90 emojis. A 12x12. En blanco y negro." 🎭 ACCIÓN: Señala la pantalla. "AQUÍ los pueden ver. ¿Adivinen qué emoji VENÍA en ese set de 1997? La. CAQUITA. Todos estos años le dimos el crédito al pobre Kurita. Pero no. El 💩 es de SoftBank. Crédito a quien crédito merece."',
  },

  /* ── Slide 3: The Creator ────────────────────────────────── */
  {
    id: 'the-creator',
    position: { x: 4000, y: 200, scale: 0.6, rotation: 1 },
    transition: { id: 'zoom-in', duration: 2.2 },
    content: {
      type: 'text',
      title: 'Un Tipo. Un Mes. Un Lápiz.',
      body: 'Les presento a Shigetaka Kurita. 26 años, ingeniero en NTT DoCoMo (la compañía de celulares más grande de Japón). Su jefe le dice "arregla los mensajes." Entonces este señor — inspirado en el manga, los kanji y los letreros de tráfico — agarra papel cuadriculado, un lápiz, y en UN MES dibuja 176 iconitos de 12x12 pixeles. A mano. Uno por uno. Hoy esos dibujos están en el MoMA de Nueva York.',
      emoji: '👨‍💻',
    },
    speakerNotes: '🎤 DI: "Entra Shigetaka Kurita. 26 años. Ingeniero en NTT DoCoMo — la empresa de celulares más grande de Japón. Su jefe le dice: \'Kurita, arregla los mensajes.\' Y este GALÁN agarra papel cuadriculado, un lapicito, y en UN MES dibuja 176 iconitos a MANO inspirándose en el MANGA, los KANJI y los letreros de tráfico." 🎭 ACCIÓN: Mira al público. "Y aguanten, porque AHORA viene el plot twist: Kurita NO fue el primero. El emoji de la caca que todos amamos… ni siquiera es suyo. Les voy a explicar." Sonrisa cómplice.',
  },

  /* ── Slide 4: Original 176 ───────────────────────────────── */
  {
    id: 'original-176',
    position: { x: 6000, y: -600, scale: 0.3, rotation: 0 },
    transition: { id: 'emoji-unlock', duration: 2.5, emoji: '🔓' },
    content: {
      type: 'emoji-showcase',
      emoji: '🎨',
      title: 'Los 176 Originales de Kurita',
      description: 'Pixel art de 12x12 para NTT DoCoMo i-mode (1999). SÍ eran a color. Y NO, la caquita 💩 no está — esa es de SoftBank.',
      image: import.meta.env.BASE_URL + 'images/kurita-176.jpg',
    },
    speakerNotes: '🎤 DI: "Aquí están TODOS los originales de Kurita. Pixel art de 12x12. A diferencia de lo que todos creen, SÍ eran a color — los celulares de i-mode tenían una paleta limitada pero funcional." 🎭 ACCIÓN: Señala la pantalla. "Fíjense bien: el corazón, el diablito, el avión, la cerveza, la calavera… pero NO está la caquita. ¿Por qué? Porque el 💩 es de OTRA empresa. De SoftBank. Dos años ANTES. Se las volé, ¿verdad?"',
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
        label: '1997: 12x12 Pixeles',
        emoji: '💩',
        description: '12 pixeles de ancho, en blanco y negro. Así nació la caquita en un celular SoftBank. Sin sombreado, sin degradados. Solo vibras y un sueño. Parecía un helado de chocolate diseñado por alguien que jamás había visto chocolate.',
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
