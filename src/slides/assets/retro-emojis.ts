/**
 * Pixel-art SVG representations of Shigetaka Kurita's original 1999 DoCoMo emoji set.
 * Each emoji is drawn as a 12×12 pixel grid in authentic retro style.
 *
 * These are NOT the modern Unicode emojis — they are recreations of how emojis
 * actually looked on Japanese flip phones in 1999.
 */

function pixelBox(
  cells: Array<[number, number, string?]>,
  color = '#eee',
): string {
  // cells = [[x, y, color?], ...] positions on a 12x12 grid
  const rects = cells
    .map(([x, y, c]) => `<rect x="${x}" y="${y}" width="1" height="1" fill="${c || color}"/>`)
    .join('')
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" shape-rendering="crispEdges" style="image-rendering:pixelated;width:100%;height:100%;">
  <rect width="12" height="12" fill="#000"/>
  ${rects}
</svg>`.trim()
}

/** Encode an SVG string as a data URL */
function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

/* ── Original DoCoMo pixel emojis ──────────────────────── */

// 😃 smiling face — eyes on top row, smile bottom
const smile = pixelBox([
  [4, 2], [5, 2], [6, 2], [7, 2],
  [3, 3], [8, 3],
  [2, 4], [9, 4],
  [2, 5], [4, 5], [7, 5], [9, 5], // eyes
  [2, 6], [9, 6],
  [2, 7], [3, 7], [8, 7], [9, 7], // smile start
  [4, 8], [5, 8], [6, 8], [7, 8], // smile
  [3, 9], [8, 9],
  [4, 10], [5, 10], [6, 10], [7, 10],
])

// ❤ heart
const heart = pixelBox(
  [
    [2, 3], [3, 3], [8, 3], [9, 3],
    [1, 4], [2, 4], [3, 4], [4, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
    [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
    [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
    [4, 8], [5, 8], [6, 8], [7, 8],
    [5, 9], [6, 9],
  ],
  '#c33',
)

// ☀ sun
const sun = pixelBox(
  [
    [5, 1], [6, 1],
    [2, 2], [5, 2], [6, 2], [9, 2],
    [3, 3], [8, 3],
    [4, 4], [5, 4], [6, 4], [7, 4],
    [1, 5], [2, 5], [4, 5], [7, 5], [9, 5], [10, 5],
    [1, 6], [2, 6], [4, 6], [7, 6], [9, 6], [10, 6],
    [4, 7], [5, 7], [6, 7], [7, 7],
    [3, 8], [8, 8],
    [2, 9], [5, 9], [6, 9], [9, 9],
    [5, 10], [6, 10],
  ],
  '#eeaa00',
)

// 💩 poop (pixelated stack)
const poop = pixelBox(
  [
    [5, 2], [6, 2],
    [4, 3], [5, 3], [6, 3], [7, 3],
    [4, 4], [5, 4], [6, 4], [7, 4],
    [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5],
    [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6],
    [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7],
    [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
    [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10],
  ],
  '#7a4a20',
)
// Add eyes to the poop
const poopWithEyes = poop.replace(
  '</svg>',
  '<rect x="4" y="7" width="1" height="1" fill="#fff"/><rect x="7" y="7" width="1" height="1" fill="#fff"/></svg>',
)

// ⚡ lightning bolt
const bolt = pixelBox(
  [
    [6, 1], [7, 1],
    [5, 2], [6, 2],
    [4, 3], [5, 3],
    [3, 4], [4, 4], [6, 4], [7, 4], [8, 4],
    [2, 5], [3, 5], [5, 5], [6, 5], [7, 5],
    [4, 6], [5, 6], [6, 6],
    [3, 7], [4, 7], [5, 7],
    [2, 8], [3, 8], [4, 8],
    [3, 9],
    [2, 10],
  ],
  '#ffd633',
)

// ☂ umbrella
const umbrella = pixelBox(
  [
    [5, 1], [6, 1],
    [4, 2], [5, 2], [6, 2], [7, 2],
    [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
    [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
    [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5],
    [5, 7], [6, 7],
    [5, 8], [6, 8],
    [5, 9], [6, 9],
    [5, 10], [6, 10],
  ],
  '#44aaff',
)

// ♥ simpler heart
const simpleHeart = heart

// 🎵 music note
const music = pixelBox(
  [
    [6, 2], [7, 2], [8, 2],
    [6, 3], [8, 3],
    [6, 4], [8, 4],
    [6, 5], [7, 5], [8, 5],
    [6, 6],
    [5, 7], [6, 7],
    [4, 8], [5, 8], [6, 8],
    [3, 9], [4, 9], [5, 9],
    [4, 10], [5, 10],
  ],
  '#fff',
)

// 🔥 fire (simple pixel flame)
const fire = pixelBox(
  [
    [6, 1],
    [5, 2], [6, 2], [7, 2],
    [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
    [4, 4], [5, 4], [6, 4], [7, 4], [8, 4],
    [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
    [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
    [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7],
    [4, 8], [5, 8], [6, 8], [7, 8], [8, 8],
    [4, 9], [5, 9], [6, 9], [7, 9], [8, 9],
    [5, 10], [6, 10], [7, 10],
  ],
  '#ff6600',
)

// 📱 mobile phone
const phone = pixelBox(
  [
    [4, 1], [5, 1], [6, 1], [7, 1], [8, 1],
    [4, 2], [5, 2], [6, 2], [7, 2], [8, 2],
    [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
    [4, 4], [5, 4], [6, 4], [7, 4], [8, 4],
    [4, 5], [5, 5], [6, 5], [7, 5], [8, 5],
    [4, 6], [5, 6], [6, 6], [7, 6], [8, 6],
    [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
    [4, 8], [5, 8], [6, 8], [7, 8], [8, 8],
    [4, 9], [6, 9], [8, 9],
    [4, 10], [5, 10], [6, 10], [7, 10], [8, 10],
  ],
  '#cccccc',
)

// ⭐ star
const star = pixelBox(
  [
    [6, 1],
    [5, 2], [6, 2], [7, 2],
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],
    [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
    [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5],
    [2, 6], [3, 6], [4, 6], [7, 6], [8, 6], [9, 6],
    [1, 7], [2, 7], [9, 7], [10, 7],
  ],
  '#ffd633',
)

// ☕ coffee
const coffee = pixelBox(
  [
    [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
    [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
    [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
    [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
    [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
    [4, 8], [5, 8], [6, 8], [7, 8],
  ],
  '#aa8844',
)

// 🐱 cat
const cat = pixelBox(
  [
    [3, 2], [4, 2], [7, 2], [8, 2],
    [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
    [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4],
    [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5],
    [2, 6], [3, 6], [4, 6], [7, 6], [8, 6], [9, 6], // eyes spot
    [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7],
    [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
    [3, 9], [8, 9],
  ],
  '#888',
)

/* ── Export as data URLs for easy <img src=...> use ─────── */

export const retroEmojis: Record<string, string> = {
  smile: svgToDataUrl(smile),
  heart: svgToDataUrl(heart),
  sun: svgToDataUrl(sun),
  poop: svgToDataUrl(poopWithEyes),
  bolt: svgToDataUrl(bolt),
  umbrella: svgToDataUrl(umbrella),
  music: svgToDataUrl(music),
  fire: svgToDataUrl(fire),
  phone: svgToDataUrl(phone),
  star: svgToDataUrl(star),
  coffee: svgToDataUrl(coffee),
  cat: svgToDataUrl(cat),
  simpleHeart: svgToDataUrl(simpleHeart),
}

/* ── Hamburger diagrams (for slide 15: cheese placement) ───────── */

// Google's infamous burger (cheese BELOW the patty)
const googleBurgerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" style="width:100%;height:100%;">
  <!-- top bun with sesame -->
  <ellipse cx="60" cy="32" rx="48" ry="18" fill="#e6b877"/>
  <ellipse cx="60" cy="32" rx="48" ry="14" fill="#f4c98d"/>
  <circle cx="40" cy="28" r="2" fill="#fff"/>
  <circle cx="55" cy="25" r="2" fill="#fff"/>
  <circle cx="70" cy="28" r="2" fill="#fff"/>
  <circle cx="82" cy="26" r="2" fill="#fff"/>
  <!-- lettuce -->
  <path d="M 12 50 Q 20 45 30 50 Q 40 44 50 50 Q 60 45 70 50 Q 80 44 90 50 Q 100 45 108 50 L 108 58 L 12 58 Z" fill="#6bcc4f"/>
  <!-- CHEESE (under patty) -->
  <rect x="10" y="58" width="100" height="10" fill="#ffcc33" rx="2"/>
  <path d="M 10 68 L 20 74 L 30 68 L 40 74 L 50 68 L 60 74 L 70 68 L 80 74 L 90 68 L 100 74 L 110 68 L 110 72 L 10 72 Z" fill="#ffcc33"/>
  <!-- PATTY (above cheese — WRONG!) -->
  <rect x="10" y="74" width="100" height="16" fill="#7a3e1a" rx="3"/>
  <rect x="10" y="74" width="100" height="3" fill="#9a4e22" rx="2"/>
  <!-- bottom bun -->
  <ellipse cx="60" cy="96" rx="48" ry="14" fill="#d9a660"/>
  <!-- marker: big WRONG X in corner -->
  <g transform="translate(95,10)">
    <circle cx="12" cy="12" r="14" fill="#ff2222" stroke="#fff" stroke-width="2"/>
    <text x="12" y="18" font-size="20" font-weight="900" fill="#fff" text-anchor="middle" font-family="Arial">✗</text>
  </g>
</svg>`

// Correct burger (cheese ABOVE the patty)
const correctBurgerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" style="width:100%;height:100%;">
  <!-- top bun -->
  <ellipse cx="60" cy="32" rx="48" ry="18" fill="#e6b877"/>
  <ellipse cx="60" cy="32" rx="48" ry="14" fill="#f4c98d"/>
  <circle cx="40" cy="28" r="2" fill="#fff"/>
  <circle cx="55" cy="25" r="2" fill="#fff"/>
  <circle cx="70" cy="28" r="2" fill="#fff"/>
  <circle cx="82" cy="26" r="2" fill="#fff"/>
  <!-- lettuce -->
  <path d="M 12 50 Q 20 45 30 50 Q 40 44 50 50 Q 60 45 70 50 Q 80 44 90 50 Q 100 45 108 50 L 108 58 L 12 58 Z" fill="#6bcc4f"/>
  <!-- CHEESE (above patty — CORRECT!) -->
  <rect x="10" y="58" width="100" height="10" fill="#ffcc33" rx="2"/>
  <path d="M 10 68 L 20 74 L 30 68 L 40 74 L 50 68 L 60 74 L 70 68 L 80 74 L 90 68 L 100 74 L 110 68 L 110 72 L 10 72 Z" fill="#ffcc33"/>
  <!-- PATTY (below cheese - RIGHT!) -->
  <rect x="10" y="74" width="100" height="16" fill="#7a3e1a" rx="3"/>
  <rect x="10" y="74" width="100" height="3" fill="#9a4e22" rx="2"/>
  <!-- bottom bun -->
  <ellipse cx="60" cy="96" rx="48" ry="14" fill="#d9a660"/>
  <!-- marker: big CHECK in corner -->
  <g transform="translate(95,10)">
    <circle cx="12" cy="12" r="14" fill="#22cc44" stroke="#fff" stroke-width="2"/>
    <text x="12" y="18" font-size="20" font-weight="900" fill="#fff" text-anchor="middle" font-family="Arial">✓</text>
  </g>
</svg>`

export const burgerImages = {
  google: svgToDataUrl(googleBurgerSvg),
  correct: svgToDataUrl(correctBurgerSvg),
}

/* ── The original 176 grid as retro images ─────────────── */

export const retroGridItems: Array<{ image: string; label: string }> = [
  { image: retroEmojis.smile, label: 'Feliz' },
  { image: retroEmojis.heart, label: 'Corazón' },
  { image: retroEmojis.sun, label: 'Sol' },
  { image: retroEmojis.umbrella, label: 'Paraguas' },
  { image: retroEmojis.bolt, label: 'Rayo' },
  { image: retroEmojis.fire, label: 'Fuego' },
  { image: retroEmojis.music, label: 'Música' },
  { image: retroEmojis.phone, label: 'Teléfono' },
  { image: retroEmojis.star, label: 'Estrella' },
  { image: retroEmojis.coffee, label: 'Café' },
  { image: retroEmojis.cat, label: 'Gato' },
  { image: retroEmojis.poop, label: 'Caca' },
]
