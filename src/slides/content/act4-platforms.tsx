import type { SlideData } from '../types'

export const act4Slides: SlideData[] = [
  /* ── Slide 21: Cross-Platform Chaos ─────────────────────── */
  {
    id: 'cross-platform',
    position: { x: 40000, y: 200, scale: 0.6, rotation: -3 },
    transition: { id: 'emoji-tv', duration: 2.2, emoji: '📺' },
    content: {
      type: 'text',
      title: 'Same Emoji, Different Vibes',
      body: "Here's a fun nightmare: every platform designs their own version of each emoji. Send a \"slightly smiling face\" from an iPhone and it looks polite. See it on Samsung and it looks like it's plotting a murder. Same Unicode codepoint. Wildly different energy.",
      emoji: '😅',
    },
    speakerNotes: 'This is the core problem of cross-platform emoji. Same code, different art.',
  },

  /* ── Slide 22: Samsung Was Wild ─────────────────────────── */
  {
    id: 'samsung-worst',
    position: { x: 42000, y: -600, scale: 0.5, rotation: 4 },
    transition: { id: 'scan-line', duration: 1.8 },
    content: {
      type: 'text',
      title: 'Samsung: The Worst Offender',
      body: "Old Samsung emoji were UNHINGED. Their \"grimacing face\" looked gleeful. Their \"dancer\" faced the wrong way. Their \"cookie\" looked like a saltine cracker. Samsung was basically running its own emoji cinematic universe where nothing made sense and everyone was slightly cursed.",
      emoji: '🤦',
    },
    speakerNotes: 'Samsung finally fixed most of these in 2018-2019, but the old ones live in infamy.',
  },

  /* ── Slide 23: Cookie Incident ──────────────────────────── */
  {
    id: 'cookie-incident',
    position: { x: 44000, y: 500, scale: 0.7, rotation: -1 },
    transition: { id: 'emoji-snapshot', duration: 2.2, emoji: '📸' },
    content: {
      type: 'comparison',
      title: 'The Cookie Crisis',
      left: {
        label: 'What You Expected',
        emoji: '🍪',
        description: 'A warm, delicious chocolate chip cookie. Golden brown, slightly gooey, the kind grandma makes.',
      },
      right: {
        label: 'What Samsung Gave You',
        emoji: '🍘',
        description: "This. Samsung\'s \"cookie\" looked like a rice cracker having an identity crisis. People literally couldn't tell what food it was supposed to be. Cookie? Cracker? Ancient artifact? Nobody knew.",
      },
    },
    speakerNotes: 'Samsung eventually fixed the cookie, but the trauma remains.',
  },

  /* ── Slide 24: Pistol Timeline ──────────────────────────── */
  {
    id: 'pistol-timeline',
    position: { x: 46000, y: -200, scale: 0.4, rotation: 0 },
    transition: { id: 'emoji-clapper', duration: 2.5, emoji: '🎬' },
    content: {
      type: 'timeline',
      title: 'The Great Pistol-to-Water-Gun Pipeline',
      events: [
        { year: '2016', text: 'Apple switches revolver to water gun', emoji: '🔫' },
        { year: '2017', text: 'Twitter follows Apple. The dominos begin.', emoji: '🐦' },
        { year: '2018', text: 'Google, Samsung, and Facebook switch', emoji: '💧' },
        { year: '2018', text: 'Microsoft holds out with their revolver (respect)', emoji: '🤠' },
        { year: '2019', text: 'Microsoft finally caves. All platforms: water gun.', emoji: '🏳️' },
      ],
    },
    speakerNotes: 'Microsoft was the last holdout. 3 years of being the only platform with a real gun emoji.',
  },
]
