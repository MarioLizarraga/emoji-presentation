import type { SlideData } from '../types'

export const act3Slides: SlideData[] = [
  /* ── Slide 13: Gun Debate ───────────────────────────────── */
  {
    id: 'gun-debate',
    position: { x: 24000, y: 800, scale: 0.6, rotation: -3 },
    transition: { id: 'split-blood', duration: 2.5 },
    content: {
      type: 'emoji-showcase',
      emoji: '🔫',
      title: 'The Great Gun Debate',
      description: "In 2016, Apple quietly changed the pistol emoji from a realistic revolver to a bright green water gun. Other platforms panicked and followed. For about 6 months, you could send a water gun from an iPhone and your Android friend would receive a real Glock. Peak miscommunication.",
      platforms: [],
    },
    speakerNotes: 'The mismatch period was genuinely dangerous for legal contexts. People sent gun emoji in threats that rendered as toys on some phones.',
  },

  /* ── Slide 14: Peach Incident ───────────────────────────── */
  {
    id: 'peach-incident',
    position: { x: 26000, y: -300, scale: 0.7, rotation: 4 },
    transition: { id: 'emoji-pop', duration: 1.8, emoji: '🍑' },
    content: {
      type: 'text',
      title: 'The Peach Must Stay Thicc',
      body: "In 2016, Apple tried to make the peach emoji look more like an actual peach. The internet REVOLTED. Petitions were signed. Think pieces were written. Apple quietly reverted it back to its, uh, familiar shape. The people spoke, and the people wanted cake. Peach cake.",
      emoji: '🍑',
    },
    speakerNotes: 'The backlash was immediate and overwhelming. Apple caved in the next beta.',
  },

  /* ── Slide 15: Burger War ───────────────────────────────── */
  {
    id: 'burger-war',
    position: { x: 28000, y: 600, scale: 0.5, rotation: -2 },
    transition: { id: 'whip-pan', duration: 1.6 },
    content: {
      type: 'comparison',
      title: 'Burgergate',
      left: {
        label: 'Google (Before)',
        emoji: '🍔',
        description: "Google put the cheese UNDER the patty. Under it. Like a monster. The internet lost its mind. Google's CEO Sundar Pichai tweeted he would \"drop everything\" to fix it.",
      },
      right: {
        label: 'The Correct Way',
        emoji: '🍔',
        description: "Cheese goes ON TOP of the patty. This is not debatable. The CEO of a trillion-dollar company prioritized a burger emoji over... everything else. Respect.",
      },
    },
    speakerNotes: 'Sundar Pichai actually tweeted about this. A CEO prioritizing emoji placement. What a time to be alive.',
  },

  /* ── Slide 16: Word of the Year ─────────────────────────── */
  {
    id: 'word-of-year',
    position: { x: 30000, y: -700, scale: 0.3, rotation: 0 },
    transition: { id: 'spotlight', duration: 2.5 },
    content: {
      type: 'stat',
      value: '😂',
      label: "Oxford's 2015 Word of the Year",
      sublabel: "Not a word. Not even letters. An emoji. Oxford Dictionary said \"this is fine\" and English teachers everywhere felt a disturbance in the Force.",
    },
    speakerNotes: 'The official name is "Face with Tears of Joy." Oxford picked it because it was the most-used emoji globally that year.',
  },

  /* ── Slide 17: Eggplant Ban ─────────────────────────────── */
  {
    id: 'eggplant-ban',
    position: { x: 32000, y: 400, scale: 0.7, rotation: 5 },
    transition: { id: 'emoji-freeze', duration: 1.8, emoji: '🍆' },
    content: {
      type: 'text',
      title: 'Banned Produce',
      body: "Instagram banned the eggplant emoji from hashtag searches. Not drugs. Not weapons. A vegetable. Because apparently humanity couldn't be trusted with a purple vegetable. The eggplant did nothing wrong, and yet here we are.",
      emoji: '🍆',
    },
    speakerNotes: 'The peach was also restricted but not fully banned. The eggplant got it worse.',
  },

  /* ── Slide 18: Finland Emoji ────────────────────────────── */
  {
    id: 'finland-emoji',
    position: { x: 34000, y: -100, scale: 0.6, rotation: -4 },
    transition: { id: 'emoji-portal', duration: 2.5, emoji: '🇫🇮' },
    content: {
      type: 'text',
      title: 'Finland Said "Hold My Sauna"',
      body: "Finland is the ONLY country that created its own national emoji set. They made emoji for saunas, Nokia phones, heavy metal headbangers, and a guy who can't stop talking about the weather. These are real. Finland is not messing around.",
      emoji: '🇫🇮',
    },
    speakerNotes: 'Google "Finland emoji" to see them. The heavy metal one is *chef\'s kiss*.',
  },

  /* ── Slide 19: Approval Process ─────────────────────────── */
  {
    id: 'approval-process',
    position: { x: 36000, y: 700, scale: 0.5, rotation: 2 },
    transition: { id: 'loading-bar', duration: 3.0 },
    content: {
      type: 'timeline',
      title: 'Getting an Emoji Approved is BRUTAL',
      events: [
        { year: 'Step 1', text: 'Write a formal proposal with usage data', emoji: '📝' },
        { year: 'Step 2', text: 'Submit to the Unicode Emoji Subcommittee', emoji: '📮' },
        { year: 'Step 3', text: 'Survive multiple rounds of review', emoji: '😰' },
        { year: 'Step 4', text: 'Wait 2+ years for a final decision', emoji: '⏳' },
        { year: 'Fun Fact', text: '🫠 (Melting Face) took 3 years to approve', emoji: '🫠' },
      ],
    },
    speakerNotes: 'The Unicode Consortium meets quarterly. Your emoji proposal competes with hundreds of others.',
  },

  /* ── Slide 20: The Numbers ──────────────────────────────── */
  {
    id: 'the-numbers',
    position: { x: 38000, y: -500, scale: 0.15, rotation: 0 },
    transition: { id: 'dolly-zoom', duration: 2.8 },
    content: {
      type: 'stat',
      value: '3,782',
      label: 'Emoji exist as of 2026',
      sublabel: "But the average person uses about 50. That means 3,732 emoji are just... sitting there. Unused. Unloved. Think about that.",
    },
    speakerNotes: 'Ask the audience: who has ever used the aerial tramway emoji? Exactly.',
  },
]
