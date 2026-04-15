import type { SlideData } from '../types'

export const act2Slides: SlideData[] = [
  /* ── Slide 8: Carrier Wars ──────────────────────────────── */
  {
    id: 'carrier-wars',
    position: { x: 14000, y: -800, scale: 0.6, rotation: -4 },
    transition: { id: 'glitch', duration: 0.8 },
    content: {
      type: 'comparison',
      title: 'The Carrier Wars',
      left: {
        label: 'What You Sent',
        emoji: '❤️',
        description: 'A beautiful red heart on DoCoMo. Love is in the air. You poured your soul into that text message.',
      },
      right: {
        label: 'What They Got',
        emoji: '⬜',
        description: "A blank square on SoftBank. Your declaration of love rendered as... nothing. Relationships ended over this. Probably.",
      },
    },
    speakerNotes: 'Three carriers, three incompatible emoji sets. The definition of chaos.',
  },

  /* ── Slide 9: Apple Sneaks In ───────────────────────────── */
  {
    id: 'apple-sneaks-in',
    position: { x: 16000, y: 300, scale: 0.7, rotation: 2 },
    transition: { id: 'emoji-telescope', duration: 1.0, emoji: '🔭' },
    content: {
      type: 'text',
      title: 'Apple\'s Secret Keyboard',
      body: "2008. Apple launches the iPhone in Japan and hides an emoji keyboard in the OS. It was supposed to be Japan-only, but people worldwide figured out how to enable it. Apple accidentally created global emoji demand. Oops. Best \"bug\" ever.",
      emoji: '🍎',
    },
    speakerNotes: 'The hidden keyboard was a hack to compete in the Japanese market. It leaked globally.',
  },

  /* ── Slide 10: Unicode Saves the Day ────────────────────── */
  {
    id: 'unicode-saves',
    position: { x: 18000, y: -400, scale: 0.5, rotation: -1 },
    transition: { id: 'terminal', duration: 0.9 },
    content: {
      type: 'timeline',
      title: 'Unicode to the Rescue',
      events: [
        { year: '2007', text: 'Google engineers propose emoji standardization', emoji: '📋' },
        { year: '2009', text: 'Apple & Google formally petition Unicode Consortium', emoji: '📨' },
        { year: '2010', text: 'Unicode 6.0 includes 722 emoji. Order is restored.', emoji: '✅' },
        { year: '2011', text: 'Apple adds emoji keyboard to iOS worldwide', emoji: '🌍' },
      ],
    },
    speakerNotes: 'The Unicode Consortium is a non-profit in Mountain View, CA. They decide which emoji exist.',
  },

  /* ── Slide 11: The Explosion ────────────────────────────── */
  {
    id: 'the-explosion',
    position: { x: 20000, y: 500, scale: 0.4, rotation: 3 },
    transition: { id: 'emoji-bomb', duration: 1.1, emoji: '💥' },
    content: {
      type: 'text',
      title: 'And Then... BOOM',
      body: "Once Apple shipped emoji to every iPhone on Earth, Android followed. Then Twitter. Then Facebook. In 3 years, emoji went from a quirky Japanese phone feature to the world's fastest-growing language. No Duolingo required.",
      emoji: '💥',
    },
    speakerNotes: 'The explosion was incredibly fast. 2011-2014 was the gold rush.',
  },

  /* ── Slide 12: The Stats ────────────────────────────────── */
  {
    id: 'the-stats',
    position: { x: 22000, y: -200, scale: 0.15, rotation: 0 },
    transition: { id: 'dolly-zoom', duration: 1.2 },
    content: {
      type: 'stat',
      value: '10,000,000,000',
      label: 'Emoji sent every single day',
      sublabel: '92% of all online humans use emoji. Your grandma is statistically an emoji user.',
    },
    speakerNotes: 'Ten BILLION per day. Let that number sink in. Zoom effect makes it hit harder.',
  },
]
