/**
 * Generador de la guía del presentador (HTML que luego se imprime a PDF).
 * Lee los slides reales + el registro de transiciones y produce un documento
 * completo con: contenido de cada diapositiva, animaciones CSS, y qué hace
 * cada transición entre diapositivas.
 *
 * Uso: npx tsx scripts/generate-docs.mts
 * Output: docs/presentation-guide.html
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { act1Slides } from '../src/slides/content/act1-origins'
import { act2Slides } from '../src/slides/content/act2-chaos'
import { act3Slides } from '../src/slides/content/act3-drama'
import { act4Slides } from '../src/slides/content/act4-platforms'
import { act5Slides } from '../src/slides/content/act5-game'
import type { SlideData } from '../src/slides/types'

/* ──────────────────────────────────────────────────────────────
 * Diccionario de transiciones: qué hace cada una visualmente.
 * Escrito a mano basado en lectura del código en
 * src/engine/transitions/*.ts
 * ────────────────────────────────────────────────────────────── */

interface TransitionDoc {
  family: string
  title: string
  description: string
  defaultEmoji?: string
}

const TRANSITIONS: Record<string, TransitionDoc> = {
  /* ── camera.ts ────────────────────────────────────────── */
  'zoom-in': {
    family: 'Cámara',
    title: 'Zoom In',
    description:
      'Interpolación suave (ease expo.inOut) desde la cámara actual hasta la cámara destino. Hace un zoom directo sin efectos extras. Ideal para aterrizar con foco en una diapositiva.',
  },
  'zoom-out': {
    family: 'Cámara',
    title: 'Zoom Out',
    description:
      'Primero se aleja a 40% de la escala destino (como si retrocediera en el espacio), luego regresa al zoom destino. Da la sensación de "ver el panorama" antes de enfocar.',
  },
  'mega-zoom': {
    family: 'Cámara',
    title: 'Mega Zoom',
    description:
      'Hace un zoom BRUTAL: escala ×8 en el punto medio entre la diapositiva actual y la siguiente, luego vuela y aterriza en el destino. Efecto de "impulso espacial". Usado en la diapositiva de título.',
  },
  slide: {
    family: 'Cámara',
    title: 'Slide (deslizar)',
    description:
      'Movimiento de cámara directo con ease power3.inOut. Es el default más simple — solo desliza de un slide al otro sin efectos adicionales.',
  },
  'whip-pan': {
    family: 'Cámara',
    title: 'Whip Pan',
    description:
      'Paneo rápido estilo cinematográfico con motion blur (un gradiente horizontal oscuro que barre la pantalla mientras la cámara se mueve). Perfecto para cortes de "mira esto".',
  },
  orbit: {
    family: 'Cámara',
    title: 'Orbit (órbita)',
    description:
      'La cámara hace una curva en arco entre las dos diapositivas, perpendicular a la línea recta, con una ligera rotación de -15°. Como dar la vuelta alrededor de algo.',
  },
  'dolly-zoom': {
    family: 'Cámara',
    title: 'Dolly Zoom (zoom brutal con impacto)',
    description:
      'Zoom súper rápido con sobrepaso de 25%, un flash blanco en el impacto, shake de pantalla (3 sacudidas), y un radial motion blur. Simula el efecto "Vertigo" de Hitchcock. Usado en el slide de los números grandes.',
  },
  'spiral-zoom': {
    family: 'Cámara',
    title: 'Spiral Zoom (zoom en espiral)',
    description:
      'Zoom + rotación 360° completa mientras se acerca al destino. Ease expo.inOut. Ideal para cierres dramáticos o revelaciones grandes.',
  },
  boomerang: {
    family: 'Cámara',
    title: 'Boomerang',
    description:
      'Primero se aleja en dirección opuesta al destino (40% más lejos y escala reducida), luego regresa volando al destino. Como un resorte que se estira y se suelta.',
  },

  /* ── cinematic.ts ──────────────────────────────────────── */
  fade: {
    family: 'Cine',
    title: 'Fade (a negro)',
    description:
      'Cortina del color de fondo (--bg) que sube al 100% de opacidad, se cambia la cámara, y baja a 0. Es el fade básico. Usado para la mayoría de las transiciones del juego.',
  },
  'fade-black': {
    family: 'Cine',
    title: 'Fade a Negro',
    description:
      'Igual que fade pero la cortina es #000 puro y se mantiene visible un momento antes de revelar. Da un respiro dramático antes de la siguiente diapositiva.',
  },
  spotlight: {
    family: 'Cine',
    title: 'Spotlight (reflector)',
    description:
      'Un círculo "hueco" sobre fondo casi negro que se mueve por la pantalla como buscando algo (4 posiciones), aterriza al centro, y luego el hueco se expande hasta llenar el viewport revelando la siguiente diapositiva.',
  },
  'tv-flip': {
    family: 'Cine',
    title: 'TV Flip (apagado de TV CRT)',
    description:
      'Estática aparece, la pantalla colapsa en una línea horizontal blanca (como apagar un TV viejo), flash corto, se cambia la diapositiva, y la línea se expande de vuelta.',
  },
  iris: {
    family: 'Cine',
    title: 'Iris (apertura circular)',
    description:
      'Un iris circular negro se cierra desde los bordes hasta el centro (con clip-path circle), se cambia la cámara, y se abre de vuelta. Estilo cine mudo.',
  },
  letterbox: {
    family: 'Cine',
    title: 'Letterbox (barras de cine)',
    description:
      'Dos barras negras entran desde arriba y abajo hasta juntarse en el centro, se cambia la cámara, se mantienen un momento, y se retraen. Estilo "cinemascope".',
  },

  /* ── digital.ts ────────────────────────────────────────── */
  glitch: {
    family: 'Digital',
    title: 'Glitch',
    description:
      'RGB split (sombras roja y azul), scanlines, y 6 tiras horizontales que se desplazan aleatoriamente 4 veces para simular un "error" digital. Gran glitch al centro, luego recuperación.',
  },
  'pixel-dissolve': {
    family: 'Digital',
    title: 'Pixel Dissolve (mosaico)',
    description:
      'Grid de 20×12 = 240 celdas de colores aleatorios (tonos del fondo) que aparecen en orden random para formar un mosaico que cubre todo, se cambia la cámara, y desaparecen en orden random para revelar la nueva diapositiva.',
  },
  matrix: {
    family: 'Digital',
    title: 'Matrix Rain',
    description:
      'Lluvia estilo Matrix con 30 columnas de caracteres (0/1/símbolos, o el emoji especificado si hay uno) cayendo con delays aleatorios sobre fondo casi negro. La cámara cambia al 40% del tiempo.',
  },
  'loading-bar': {
    family: 'Digital',
    title: 'Loading Bar',
    description:
      'Fondo negro, texto "CARGANDO...", barra de progreso con gradiente neón (rosa → morado → azul) que sube en 6 pasos (23%, 47%, 52% stall, 78%, 93%, 100%), flash al terminar, y revela.',
  },
  'scan-line': {
    family: 'Digital',
    title: 'Scan Line',
    description:
      'Línea horizontal azul neón con glow que barre la pantalla de arriba abajo (cambiando la cámara al 45%), luego regresa hacia arriba. Efecto "escaneo".',
  },
  terminal: {
    family: 'Digital',
    title: 'Terminal',
    description:
      'Pantalla negra con texto verde monoespaciado que imprime 5 líneas de "> inicializando... > cargando recursos... [OK]... transición completa." con un cursor parpadeante. Estilo hacker.',
  },

  /* ── emoji-action.ts ───────────────────────────────────── */
  'emoji-bomb': {
    family: 'Emoji: Acción',
    title: 'Bomba Emoji',
    description:
      'Cae una bomba (💣 o el emoji config) desde arriba con bounce, una mecha roja prende, la bomba tiembla mientras "arde", EXPLOTA (se cambia a 💥), flash radial naranja/rojo, shake, 26 fragmentos de colores de fuego salen disparados en todas direcciones.',
    defaultEmoji: '💣',
  },
  'emoji-slash': {
    family: 'Emoji: Acción',
    title: 'Tajo (Emoji Slash)',
    description:
      'Una katana (⚔️ o emoji config) cruza la pantalla en diagonal con speed lines rosa neón, flash blanco, y la pantalla se parte en dos mitades (superior vuela arriba con rotación, inferior vuela abajo).',
    defaultEmoji: '⚔️',
  },
  'emoji-magic': {
    family: 'Emoji: Acción',
    title: 'Magia con Varita',
    description:
      'Una varita (✨ o emoji config) cruza la pantalla de izquierda a derecha con 40 destellos ✨ siguiéndola, y al final un shimmer radial morado cubre el viewport.',
    defaultEmoji: '🪄',
  },
  'emoji-snapshot': {
    family: 'Emoji: Acción',
    title: 'Snapshot (foto Polaroid)',
    description:
      'Fondo oscuro, viewfinder con esquinas de cámara y mira roja, indicador "REC" parpadeante, cámara (📸) aparece con bounce, FLASH blanco (se cambia la cámara), y una Polaroid aparece rotada, se revela (fade-in del contenido), y hace zoom hasta desaparecer.',
    defaultEmoji: '📸',
  },
  'emoji-unlock': {
    family: 'Emoji: Acción',
    title: 'Unlock (candado)',
    description:
      'Un candado 🔒 aparece al centro con rebote, tiembla 7 veces, se transforma en 🔓 (con punch de escala), vuela hacia arriba, y dos puertas negras con borde morado se abren hacia los lados.',
  },
  'emoji-freeze': {
    family: 'Emoji: Acción',
    title: 'Freeze (congelación)',
    description:
      'Escarcha azul se acumula en los bordes, una cara fría (🥶 o emoji config) aparece al centro, aparecen grietas SVG, flash azul neón, y la pantalla "se rompe" en 15 fragmentos de hielo que salen disparados.',
    defaultEmoji: '🥶',
  },

  /* ── emoji-frame.ts ────────────────────────────────────── */
  'emoji-tv': {
    family: 'Emoji: Marco',
    title: 'Emoji TV',
    description:
      'Aparece un televisor (📺 o emoji config) con estática, 12 barras de ruido blanco parpadeando, la estática se va (como sintonizar un canal), y la TV crece hasta llenar toda la pantalla.',
    defaultEmoji: '📺',
  },
  'emoji-door': {
    family: 'Emoji: Marco',
    title: 'Puerta Emoji',
    description:
      'Un marco de puerta con borde morado aparece al centro, una puerta (🚪 o emoji config) con manija azul aparece dentro, la manija tiembla, la puerta se abre en 3D (rotationY -110°), y hacemos zoom a través del hueco.',
    defaultEmoji: '🚪',
  },
  'emoji-clapper': {
    family: 'Emoji: Marco',
    title: 'Claqueta de Cine',
    description:
      'Una claqueta (🎬 o emoji config) cae desde arriba con rotación, aparece el texto "SIGUIENTE ESCENA", la claqueta se aplasta (scaleY 0.85) como si cerrara, corte a negro, y el negro se desliza hacia arriba como telón.',
    defaultEmoji: '🎬',
  },
  'emoji-telescope': {
    family: 'Emoji: Marco',
    title: 'Telescopio',
    description:
      'Oscuro total con un "hueco" circular pequeño en el centro (como ver por un telescopio). Un telescopio 🔭 aparece en la esquina inferior, un lens flare breve, y el hueco se expande gradualmente hasta revelar toda la pantalla.',
    defaultEmoji: '🔭',
  },

  /* ── emoji-transform.ts ────────────────────────────────── */
  'emoji-split': {
    family: 'Emoji: Transformación',
    title: 'Split (división limpia)',
    description:
      'Dos mitades del viewport cada una mostrando la mitad de un emoji (🔪 default) que se encuentran al centro. Flash blanco vertical, y las mitades se separan dejando ver la nueva diapositiva.',
    defaultEmoji: '🔪',
  },
  'split-blood': {
    family: 'Emoji: Transformación',
    title: 'Split con Sangre',
    description:
      'Variante de split con 12 gotas de sangre (rojo a granate) que caen en la línea de corte después de que se abren las mitades.',
    defaultEmoji: '🔪',
  },
  'split-electric': {
    family: 'Emoji: Transformación',
    title: 'Split Eléctrico',
    description:
      'Variante de split con un arco de rayo azul neón zigzagueante (SVG) corriendo por la línea de corte con drop-shadow.',
    defaultEmoji: '⚡',
  },
  'split-lava': {
    family: 'Emoji: Transformación',
    title: 'Split de Lava',
    description:
      'Variante de split con una columna vertical de lava (gradiente naranja/rojo) con glow y 8 gotas de lava cayendo por la línea de corte.',
    defaultEmoji: '🌋',
  },
  'split-confetti': {
    family: 'Emoji: Transformación',
    title: 'Split con Confetti',
    description:
      'Variante de split con una explosión de 50 confettis en 6 colores neón que salen del centro después de que se abren las mitades. Ideal para cierres.',
    defaultEmoji: '🎉',
  },
  'emoji-portal': {
    family: 'Emoji: Transformación',
    title: 'Portal',
    description:
      'Un portal (🌀 o emoji config) aparece al centro con rebote, gira 720° mientras se expande hasta llenar la pantalla, y luego el relleno radial morado se contrae revelando la nueva diapositiva.',
    defaultEmoji: '🌀',
  },
  'emoji-pop': {
    family: 'Emoji: Transformación',
    title: 'Pop de Globo',
    description:
      'Un globo (🎈 o emoji config) se infla desde pequeño a enorme, tambalea, POP flash rosa neón, y 40 confettis salen volando en direcciones aleatorias.',
    defaultEmoji: '🎈',
  },
}

/* ──────────────────────────────────────────────────────────────
 * Render helpers
 * ────────────────────────────────────────────────────────────── */

function htmlEscape(s: string): string {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function renderContentSummary(content: SlideData['content']): string {
  switch (content.type) {
    case 'title':
      return `<div class="content-block"><div class="content-type">Título</div>
        ${content.emoji ? `<div class="big-emoji">${content.emoji}</div>` : ''}
        <div class="content-title">${htmlEscape(content.title)}</div>
        ${content.subtitle ? `<div class="content-subtitle">${htmlEscape(content.subtitle)}</div>` : ''}
      </div>`
    case 'text':
      return `<div class="content-block"><div class="content-type">Texto</div>
        ${content.emoji ? `<div class="big-emoji">${content.emoji}</div>` : ''}
        <div class="content-title">${htmlEscape(content.title)}</div>
        <div class="content-body">${htmlEscape(content.body)}</div>
      </div>`
    case 'stat':
      return `<div class="content-block"><div class="content-type">Stat</div>
        <div class="content-stat">${htmlEscape(content.value)}</div>
        <div class="content-subtitle">${htmlEscape(content.label)}</div>
        ${content.sublabel ? `<div class="content-body">${htmlEscape(content.sublabel)}</div>` : ''}
      </div>`
    case 'comparison':
      return `<div class="content-block"><div class="content-type">Comparación</div>
        <div class="content-title">${htmlEscape(content.title)}</div>
        <table class="compare-table">
          <tr>
            <th>Izquierda ${content.left.emoji ?? ''}</th>
            <th>Derecha ${content.right.emoji ?? ''}</th>
          </tr>
          <tr>
            <td><strong>${htmlEscape(content.left.label)}</strong><br>${htmlEscape(content.left.description ?? '')}</td>
            <td><strong>${htmlEscape(content.right.label)}</strong><br>${htmlEscape(content.right.description ?? '')}</td>
          </tr>
        </table>
      </div>`
    case 'grid': {
      const items = content.items
        .map((it) => `<span class="grid-item">${it.emoji}${it.label ? `<span class="grid-label">${htmlEscape(it.label)}</span>` : ''}</span>`)
        .join('')
      return `<div class="content-block"><div class="content-type">Grid ${content.retro ? '(retro)' : ''}</div>
        <div class="content-title">${htmlEscape(content.title)}</div>
        ${content.subtitle ? `<div class="content-body">${htmlEscape(content.subtitle)}</div>` : ''}
        <div class="grid-items">${items}</div>
        <div class="content-body small">${content.items.length} elementos</div>
      </div>`
    }
    case 'timeline': {
      const rows = content.events
        .map((e) => `<tr><td class="tl-year">${htmlEscape(e.year)}</td><td class="tl-emoji">${e.emoji ?? ''}</td><td>${htmlEscape(e.text)}</td></tr>`)
        .join('')
      return `<div class="content-block"><div class="content-type">Timeline</div>
        <div class="content-title">${htmlEscape(content.title)}</div>
        <table class="timeline-table">${rows}</table>
      </div>`
    }
    case 'emoji-showcase':
      return `<div class="content-block"><div class="content-type">Emoji Showcase</div>
        <div class="big-emoji">${content.emoji}</div>
        <div class="content-title">${htmlEscape(content.title)}</div>
        <div class="content-body">${htmlEscape(content.description)}</div>
      </div>`
    case 'game-reveal':
      return `<div class="content-block"><div class="content-type">Game Reveal</div>
        <div class="content-title">${htmlEscape(content.text)}</div>
      </div>`
    case 'qr-lobby':
      return `<div class="content-block"><div class="content-type">QR Lobby</div>
        <div class="content-title">Pantalla con QR y código de sala</div>
        <div class="content-body small">Título anima con <code>animate-flicker</code> (parpadeo neón 2s infinito).</div>
      </div>`
    case 'quiz-question':
      return `<div class="content-block quiz"><div class="content-type">Quiz: ${htmlEscape(content.category)}</div>
        <div class="quiz-emojis">${content.emojis.join(' ')}</div>
        <div class="content-body"><strong>Respuesta:</strong> ${htmlEscape(content.answer)}</div>
      </div>`
    case 'quiz-multichoice':
      return `<div class="content-block quiz"><div class="content-type">Quiz Multichoice</div>
        <div class="big-emoji">${content.emoji}</div>
        <div class="content-title">${htmlEscape(content.question)}</div>
        <ol>${content.options.map((o, i) => `<li${i === content.correctIndex ? ' class="correct"' : ''}>${htmlEscape(o)}${i === content.correctIndex ? ' ← correcta' : ''}</li>`).join('')}</ol>
      </div>`
    case 'quiz-platform':
      return `<div class="content-block quiz"><div class="content-type">Quiz Plataforma</div>
        <div class="big-emoji">${content.emoji}</div>
        <div class="content-body">Muestra versiones del mismo emoji en ${content.platforms.length} plataformas.</div>
      </div>`
    case 'scoreboard-final':
      return `<div class="content-block"><div class="content-type">Scoreboard Final</div>
        <div class="content-title">Marcador final del juego (muestra puntajes en vivo desde Supabase)</div>
      </div>`
    case 'custom':
      return `<div class="content-block"><div class="content-type">Custom Render</div></div>`
    default:
      return ''
  }
}

function renderSlide(slide: SlideData, index: number): string {
  const trans = TRANSITIONS[slide.transition.id] ?? {
    family: 'Desconocida',
    title: slide.transition.id,
    description: '(transición no registrada en el glosario)',
  }
  const posStr = `x=${slide.position.x}, y=${slide.position.y}, scale=${slide.position.scale}, rotation=${slide.position.rotation}°`
  const cfgBits: string[] = [`<strong>ID:</strong> <code>${slide.transition.id}</code>`, `<strong>duración:</strong> ${slide.transition.duration}s`]
  if (slide.transition.emoji) cfgBits.push(`<strong>emoji:</strong> ${slide.transition.emoji}`)
  if (slide.transition.variant) cfgBits.push(`<strong>variante:</strong> ${slide.transition.variant}`)

  return `
<section class="slide-card">
  <div class="slide-header">
    <div class="slide-num">#${index}</div>
    <div class="slide-id"><code>${slide.id}</code></div>
  </div>
  <div class="slide-grid">
    <div class="slide-col">
      <h4>Contenido</h4>
      ${renderContentSummary(slide.content)}
    </div>
    <div class="slide-col">
      <h4>Transición al llegar</h4>
      <div class="trans-box">
        <div class="trans-title"><span class="trans-family">${trans.family}</span> · <strong>${htmlEscape(trans.title)}</strong></div>
        <div class="trans-config">${cfgBits.join(' · ')}</div>
        <div class="trans-desc">${trans.description}</div>
      </div>
      <h4>Cámara (posición mundial)</h4>
      <div class="pos-box"><code>${posStr}</code></div>
    </div>
  </div>
  ${slide.speakerNotes ? `<div class="slide-notes"><h4>Notas del presentador</h4><div>${htmlEscape(slide.speakerNotes)}</div></div>` : ''}
</section>`.trim()
}

function renderAct(title: string, subtitle: string, slides: SlideData[], startIndex: number): string {
  const cards = slides.map((s, i) => renderSlide(s, startIndex + i)).join('\n')
  return `
<section class="act">
  <h2>${title}</h2>
  <p class="act-sub">${subtitle}</p>
  ${cards}
</section>`.trim()
}

function renderTransitionGlossary(): string {
  const families: Record<string, Array<[string, TransitionDoc]>> = {}
  for (const [id, doc] of Object.entries(TRANSITIONS)) {
    if (!families[doc.family]) families[doc.family] = []
    families[doc.family].push([id, doc])
  }
  const blocks = Object.entries(families)
    .map(
      ([family, entries]) => `
<div class="family-block">
  <h3>${family}</h3>
  ${entries
    .map(
      ([id, doc]) => `
    <div class="trans-entry">
      <div class="trans-entry-head">
        <code class="trans-id">${id}</code>
        <strong>${doc.title}</strong>
        ${doc.defaultEmoji ? `<span class="trans-emoji">emoji default: ${doc.defaultEmoji}</span>` : ''}
      </div>
      <div class="trans-entry-desc">${doc.description}</div>
    </div>`,
    )
    .join('')}
</div>`,
    )
    .join('')
  return `
<section class="act">
  <h2>Glosario de Transiciones</h2>
  <p class="act-sub">Las ${Object.keys(TRANSITIONS).length} transiciones disponibles en el motor, organizadas por familia.</p>
  ${blocks}
</section>`.trim()
}

/* ──────────────────────────────────────────────────────────────
 * Build the HTML
 * ────────────────────────────────────────────────────────────── */

const all = [
  { title: 'Acto 1 — Origen (la historia y el verdadero primer emoji)', subtitle: 'De 1988 a 1999, de Sharp a Kurita. Incluye el plot-twist de la pre-historia.', slides: act1Slides },
  { title: 'Acto 2 — Caos (la explosión global)', subtitle: 'Guerras de compañías, Apple que entra por la puerta trasera, Unicode salva el día.', slides: act2Slides },
  { title: 'Acto 3 — Drama (las peleas más absurdas)', subtitle: 'Pistolas, duraznos, hamburguesas, Oxford, Finlandia.', slides: act3Slides },
  { title: 'Acto 4 — Plataformas (cross-platform hell)', subtitle: 'Samsung, galletas con crisis de identidad, pistolas de agua y el plot-twist de Microsoft.', slides: act4Slides },
  { title: 'Acto 5 — Juego interactivo', subtitle: '25 películas + 25 series + 14 países + 9 dichos, con marcador en vivo.', slides: act5Slides },
]

let running = 1
const actBlocks: string[] = []
for (const a of all) {
  actBlocks.push(renderAct(a.title, a.subtitle, a.slides, running))
  running += a.slides.length
}

const totalSlides = all.reduce((acc, a) => acc + a.slides.length, 0)

const cssAnimationsDoc = `
<section class="act">
  <h2>Animaciones CSS internas de los slides</h2>
  <p class="act-sub">
    Definidas en <code>src/styles/animations.css</code>. Se aplican a elementos del contenido
    (no a las transiciones entre slides). La única que realmente se usa hoy es
    <code>animate-flicker</code> en el título del QR lobby.
  </p>
  <table class="timeline-table">
    <tr><th>Clase</th><th>Keyframe</th><th>Duración</th><th>Efecto</th><th>Dónde se usa</th></tr>
    <tr><td><code>animate-flicker</code></td><td><code>neonFlicker</code></td><td>2s infinito</td><td>Parpadeo estilo letrero de neón viejo (opacidad saltando entre 1 y 0.4 en instantes puntuales)</td><td>Título de la pantalla QR ("ESCANEA PARA JUGAR")</td></tr>
    <tr><td><code>animate-pulse</code></td><td><code>pulseGlow</code></td><td>2s ease-in-out infinito</td><td>Brillo pulsante (brightness 1 → 1.3 → 1)</td><td>No usado actualmente (disponible)</td></tr>
    <tr><td><code>animate-float</code></td><td><code>float</code></td><td>3s ease-in-out infinito</td><td>Flota arriba y abajo 10px</td><td>No usado actualmente (disponible)</td></tr>
    <tr><td><code>animate-shake</code></td><td><code>shake</code></td><td>0.5s (una vez)</td><td>Sacudida horizontal ±4px</td><td>No usado actualmente (disponible)</td></tr>
    <tr><td><code>animate-glitch</code></td><td><code>glitchShift</code></td><td>0.3s steps(1) infinito</td><td>Distorsión con clip-path + translateX (efecto VHS)</td><td>No usado actualmente (disponible)</td></tr>
    <tr><td><code>animate-rgb</code></td><td><code>rgbSplit</code></td><td>0.5s steps(1) infinito</td><td>Text-shadow rosa/azul que salta (separación RGB de tipografía)</td><td>No usado actualmente (disponible)</td></tr>
  </table>
</section>`.trim()

const archDoc = `
<section class="act">
  <h2>Cómo funciona la presentación</h2>
  <p>
    Todas las diapositivas viven en un <strong>"mundo" infinito de 2D</strong> (un contenedor absolute).
    Cada una se coloca en coordenadas <code>(x, y)</code> con <code>scale</code> y <code>rotation</code>.
    La "cámara" es el <strong>transform GSAP</strong> aplicado al contenedor <code>worldEl</code>:
    para mostrar un slide, se calcula la transformación inversa para que el centro del slide caiga
    en el centro del viewport (1920×1080).
  </p>
  <p>
    Al navegar (<kbd>→</kbd>, espacio, click, o control remoto), el engine invoca
    <code>goToSlide(index)</code> que busca la transición configurada del slide DESTINO
    en el registro y ejecuta su timeline GSAP. Cada transición decide CÓMO se mueve la cámara
    + qué efectos overlay (flashes, partículas, glitches) ejecutar durante el movimiento.
    Si la transición no está registrada, cae al fallback <code>createCameraMove</code>
    (ease power2.inOut directo).
  </p>
  <ul>
    <li><strong>Tamaño del viewport:</strong> 1920 × 1080 (slide es fixed-size; el zoom lo da el scale de la cámara).</li>
    <li><strong>Durations:</strong> todas las transiciones tienen un <code>duration</code> en segundos, a veces modificable por slide.</li>
    <li><strong>Timeout de seguridad:</strong> si una transición se cuelga, a los <code>duration + 2s</code> se fuerza el reset (SlideEngine.tsx línea ~78).</li>
    <li><strong>Controles:</strong> ← → para navegar, <kbd>F</kbd> fullscreen, click también avanza. El modo <code>/remote</code> controla la presentación desde otro dispositivo vía Supabase Realtime.</li>
  </ul>
</section>`.trim()

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Guía del Presentador · La Historia de los Emojis</title>
<style>
  @page { size: Letter; margin: 18mm 14mm 16mm 14mm; }
  * { box-sizing: border-box; }
  html { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1a1a2e; }
  body { margin: 0; padding: 0; line-height: 1.45; font-size: 10.5pt; }
  h1, h2, h3, h4 { margin: 0; font-weight: 700; color: #0a0a2a; }
  h1 { font-size: 28pt; line-height: 1.1; margin-bottom: 10pt; }
  h2 { font-size: 18pt; margin-top: 18pt; padding-bottom: 6pt; border-bottom: 2pt solid #a855f7; color: #6d28d9; page-break-before: always; }
  h3 { font-size: 13pt; margin-top: 12pt; color: #1e40af; }
  h4 { font-size: 10pt; margin-top: 6pt; color: #334155; text-transform: uppercase; letter-spacing: 0.06em; }
  p { margin: 4pt 0; }
  code { font-family: 'Cascadia Code', 'Consolas', monospace; font-size: 0.92em; background: #f3f4f6; padding: 1px 4px; border-radius: 3px; }
  kbd { font-family: monospace; padding: 0 5px; border: 1px solid #94a3b8; border-radius: 3px; background: #f1f5f9; font-size: 0.9em; }
  .cover { text-align: center; padding-top: 20vh; height: 100vh; page-break-after: always; background: linear-gradient(135deg, #0a0a2a, #1e1b4b 50%, #581c87); color: white; }
  .cover h1 { color: #fff; font-size: 42pt; }
  .cover .sub { color: #c4b5fd; font-size: 16pt; margin-top: 8pt; }
  .cover .meta { color: #94a3b8; margin-top: 80pt; font-size: 10pt; }
  .cover .big-emoji { font-size: 80pt; margin-bottom: 20pt; }
  .toc { page-break-after: always; }
  .toc h2 { page-break-before: auto; }
  .toc ul { list-style: none; padding-left: 0; }
  .toc li { padding: 3pt 0; border-bottom: 1px dotted #cbd5e1; }
  .act-sub { color: #64748b; font-style: italic; margin-bottom: 12pt; }
  .slide-card { margin: 10pt 0 14pt; padding: 10pt 12pt; border: 1pt solid #e2e8f0; border-radius: 6pt; page-break-inside: avoid; background: #fafbfc; }
  .slide-header { display: flex; align-items: baseline; gap: 10pt; padding-bottom: 6pt; margin-bottom: 6pt; border-bottom: 1pt dashed #cbd5e1; }
  .slide-num { font-size: 13pt; font-weight: 800; color: #a855f7; }
  .slide-id { font-size: 11pt; }
  .slide-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14pt; }
  .slide-col { min-width: 0; }
  .content-block { margin-top: 4pt; }
  .content-type { display: inline-block; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.1em; background: #a855f7; color: white; padding: 2px 8px; border-radius: 3px; margin-bottom: 4pt; }
  .content-title { font-weight: 700; font-size: 12pt; color: #1e40af; margin: 2pt 0; }
  .content-subtitle { color: #475569; font-style: italic; margin: 2pt 0; }
  .content-body { margin: 3pt 0; }
  .content-body.small { font-size: 8.5pt; color: #64748b; }
  .content-stat { font-size: 22pt; font-weight: 900; color: #6d28d9; }
  .big-emoji { font-size: 30pt; line-height: 1; }
  .compare-table { width: 100%; border-collapse: collapse; margin-top: 4pt; }
  .compare-table th, .compare-table td { border: 1pt solid #cbd5e1; padding: 4pt 6pt; text-align: left; vertical-align: top; font-size: 9pt; }
  .compare-table th { background: #ede9fe; color: #5b21b6; }
  .timeline-table { width: 100%; border-collapse: collapse; margin-top: 4pt; font-size: 9.5pt; }
  .timeline-table th, .timeline-table td { padding: 3pt 6pt; border-bottom: 1pt solid #e2e8f0; text-align: left; vertical-align: top; }
  .timeline-table th { background: #f3e8ff; color: #6d28d9; text-transform: uppercase; font-size: 8pt; letter-spacing: 0.06em; }
  .tl-year { font-weight: 700; color: #a855f7; white-space: nowrap; }
  .tl-emoji { font-size: 14pt; width: 24pt; }
  .grid-items { display: flex; flex-wrap: wrap; gap: 6pt 10pt; margin: 4pt 0; }
  .grid-item { font-size: 14pt; display: inline-flex; align-items: center; gap: 3pt; }
  .grid-label { font-size: 8pt; color: #64748b; }
  .quiz .quiz-emojis { font-size: 26pt; letter-spacing: 4pt; margin: 4pt 0; }
  .quiz .content-body { font-size: 10pt; }
  .trans-box { margin-top: 3pt; padding: 6pt 8pt; background: #faf5ff; border-left: 3pt solid #a855f7; border-radius: 3pt; }
  .trans-family { background: #a855f7; color: white; padding: 1px 6px; border-radius: 3px; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.06em; }
  .trans-title { font-size: 10pt; margin-bottom: 3pt; }
  .trans-config { font-size: 8.5pt; color: #475569; margin-bottom: 4pt; }
  .trans-desc { font-size: 9.5pt; color: #1f2937; }
  .pos-box { margin-top: 3pt; padding: 4pt 6pt; background: #f1f5f9; border-radius: 3pt; font-size: 9pt; }
  .slide-notes { margin-top: 6pt; padding: 6pt 8pt; background: #fff7ed; border-left: 3pt solid #f97316; border-radius: 3pt; font-size: 9pt; }
  .slide-notes h4 { color: #c2410c; margin-bottom: 3pt; }
  .family-block { margin: 8pt 0 12pt; page-break-inside: avoid; }
  .trans-entry { padding: 5pt 8pt; margin: 4pt 0; border-left: 2pt solid #c4b5fd; background: #f5f3ff; border-radius: 3pt; page-break-inside: avoid; }
  .trans-entry-head { font-size: 10pt; margin-bottom: 2pt; }
  .trans-id { background: #1e1b4b; color: #c4b5fd; padding: 1px 6px; border-radius: 3px; margin-right: 6pt; }
  .trans-emoji { margin-left: 8pt; font-size: 8.5pt; color: #64748b; }
  .trans-entry-desc { font-size: 9pt; color: #334155; }
  ol.correct li.correct { background: #dcfce7; font-weight: 700; padding: 2pt 4pt; border-radius: 3pt; }
</style>
</head>
<body>

<!-- Cover -->
<section class="cover">
  <div class="big-emoji">😂🎭📺</div>
  <h1>La Historia de los Emojis</h1>
  <div class="sub">Guía del Presentador</div>
  <div class="sub" style="margin-top:4pt;font-size:12pt;">Contenido · Animaciones · Transiciones</div>
  <div class="meta">
    ${totalSlides} diapositivas · ${Object.keys(TRANSITIONS).length} transiciones registradas<br>
    Generado ${new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
  </div>
</section>

<!-- TOC -->
<section class="toc">
  <h2 style="page-break-before:auto;">Contenido</h2>
  <ul>
    <li><strong>1.</strong> Cómo funciona la presentación (arquitectura)</li>
    <li><strong>2.</strong> Animaciones CSS internas</li>
    <li><strong>3.</strong> Glosario de transiciones (${Object.keys(TRANSITIONS).length})</li>
    ${all.map((a, i) => `<li><strong>${4 + i}.</strong> ${htmlEscape(a.title)} (${a.slides.length} slides)</li>`).join('')}
  </ul>
</section>

${archDoc}

${cssAnimationsDoc}

${renderTransitionGlossary()}

${actBlocks.join('\n')}

</body>
</html>`

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, '..', 'docs')
mkdirSync(outDir, { recursive: true })
const outPath = resolve(outDir, 'presentation-guide.html')
writeFileSync(outPath, html, 'utf8')
console.log(`✓ Escrito ${outPath}`)
console.log(`  Total slides: ${totalSlides}`)
console.log(`  Total transiciones: ${Object.keys(TRANSITIONS).length}`)
