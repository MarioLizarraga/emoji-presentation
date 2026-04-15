import type { SlideData } from '../types'

export const act1Slides: SlideData[] = [
  /* ── Slide 1: Title ──────────────────────────────────────── */
  {
    id: 'title',
    position: { x: 0, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'mega-zoom', duration: 1200, emoji: '😂' },
    content: {
      type: 'title',
      title: 'The Emoji Story',
      subtitle: 'From 176 Pixels to World Domination',
      emoji: '😂',
    },
    speakerNotes: 'Welcome slide. Let the mega-zoom land, then pause for dramatic effect.',
  },

  /* ── Slide 2: The Problem ────────────────────────────────── */
  {
    id: 'the-problem',
    position: { x: 2000, y: -400, scale: 0.8, rotation: -2 },
    transition: { id: 'slide', duration: 800 },
    content: {
      type: 'text',
      title: 'The Problem',
      body: "It's 1999. Japan. 80 million people are texting like crazy, but every message reads like a tax form. \"I'll be there at 7.\" Are they excited? Angry? Plotting your demise? Nobody knows. Texts had zero emotion and it was causing actual misunderstandings. Something had to change.",
      emoji: '📱',
    },
    speakerNotes: 'Set the scene: Japan in the late 90s was WAY ahead on mobile.',
  },

  /* ── Slide 3: The Creator ────────────────────────────────── */
  {
    id: 'the-creator',
    position: { x: 4000, y: 200, scale: 0.6, rotation: 1 },
    transition: { id: 'zoom-in', duration: 900 },
    content: {
      type: 'text',
      title: 'One Guy. One Weekend.',
      body: "Meet Shigetaka Kurita. He's 25, works at NTT DoCoMo (Japan's biggest carrier), and his boss says \"fix texting.\" So this absolute legend grabs graph paper, a mechanical pencil, and draws 176 tiny 12x12 pixel icons. Weather symbols, smiley faces, a pile of poo. You know, the essentials.",
      emoji: '👨‍💻',
    },
    speakerNotes: 'Kurita literally sketched these by hand on graph paper. The poo emoji was in the ORIGINAL set.',
  },

  /* ── Slide 4: Original 176 ───────────────────────────────── */
  {
    id: 'original-176',
    position: { x: 6000, y: -600, scale: 0.3, rotation: 0 },
    transition: { id: 'emoji-unlock', duration: 1000, emoji: '🔓' },
    content: {
      type: 'grid',
      title: 'The Original 176',
      items: [
        { emoji: '☀️', label: 'Sun' }, { emoji: '☁️', label: 'Cloud' },
        { emoji: '☂️', label: 'Umbrella' }, { emoji: '❄️', label: 'Snow' },
        { emoji: '⚡', label: 'Lightning' }, { emoji: '🌊', label: 'Wave' },
        { emoji: '🔥', label: 'Fire' }, { emoji: '💧', label: 'Water' },
        { emoji: '😃', label: 'Happy' }, { emoji: '😢', label: 'Sad' },
        { emoji: '😠', label: 'Angry' }, { emoji: '😍', label: 'Love' },
        { emoji: '💀', label: 'Skull' }, { emoji: '💩', label: 'Poo' },
        { emoji: '❤️', label: 'Heart' }, { emoji: '💔', label: 'Broken' },
        { emoji: '🎵', label: 'Music' }, { emoji: '🎮', label: 'Game' },
        { emoji: '📱', label: 'Phone' }, { emoji: '📷', label: 'Camera' },
        { emoji: '🏠', label: 'House' }, { emoji: '🚗', label: 'Car' },
        { emoji: '✈️', label: 'Plane' }, { emoji: '🚃', label: 'Train' },
        { emoji: '🍔', label: 'Burger' }, { emoji: '🍕', label: 'Pizza' },
        { emoji: '🍺', label: 'Beer' }, { emoji: '🎂', label: 'Cake' },
        { emoji: '🌸', label: 'Cherry' }, { emoji: '🌙', label: 'Moon' },
        { emoji: '⭐', label: 'Star' }, { emoji: '🎁', label: 'Gift' },
        { emoji: '🔔', label: 'Bell' }, { emoji: '⏰', label: 'Clock' },
        { emoji: '📩', label: 'Mail' }, { emoji: '📞', label: 'Call' },
        { emoji: '💡', label: 'Bulb' }, { emoji: '🔑', label: 'Key' },
        { emoji: '✂️', label: 'Scissors' }, { emoji: '📝', label: 'Note' },
        { emoji: '🎯', label: 'Target' }, { emoji: '🏆', label: 'Trophy' },
        { emoji: '👟', label: 'Shoe' }, { emoji: '👕', label: 'Shirt' },
        { emoji: '👑', label: 'Crown' }, { emoji: '💎', label: 'Gem' },
        { emoji: '🚬', label: 'Smoke' }, { emoji: '💊', label: 'Pill' },
        { emoji: '🐶', label: 'Dog' }, { emoji: '🐱', label: 'Cat' },
        { emoji: '🐟', label: 'Fish' }, { emoji: '🐦', label: 'Bird' },
        { emoji: '👀', label: 'Eyes' }, { emoji: '👂', label: 'Ear' },
        { emoji: '✋', label: 'Hand' }, { emoji: '👆', label: 'Up' },
        { emoji: '✌️', label: 'Peace' }, { emoji: '👍', label: 'Thumb' },
        { emoji: '🙏', label: 'Pray' }, { emoji: '💪', label: 'Flex' },
        { emoji: '🚶', label: 'Walk' }, { emoji: '🏃', label: 'Run' },
      ],
    },
    speakerNotes: 'These were 12x12 pixel art. The poo emoji was right there from day one. Priorities.',
  },

  /* ── Slide 5: They Were Ugly ─────────────────────────────── */
  {
    id: 'they-were-ugly',
    position: { x: 8000, y: 400, scale: 0.7, rotation: 3 },
    transition: { id: 'emoji-split', duration: 900, variant: 'electric' },
    content: {
      type: 'comparison',
      title: 'Glow-Up of the Century',
      left: {
        label: '1999: 12x12 Pixels',
        emoji: '💩',
        description: "12 pixels wide. No shading. No gradients. Just vibes and a dream. It looked like a chocolate soft-serve designed by someone who'd never seen chocolate.",
      },
      right: {
        label: '2026: Full Color Glory',
        emoji: '💩',
        description: "4K-ready, gradient-shaded, shadow-casting masterpiece. The poo emoji now has better lighting than most LinkedIn headshots.",
      },
    },
    speakerNotes: 'Get a laugh comparing old pixel art to the modern versions.',
  },

  /* ── Slide 6: The Name ───────────────────────────────────── */
  {
    id: 'the-name',
    position: { x: 10000, y: -200, scale: 0.5, rotation: -3 },
    transition: { id: 'emoji-magic', duration: 1000, emoji: '✨' },
    content: {
      type: 'text',
      title: 'The Name is a Lie',
      body: 'You think "emoji" comes from "emotion"? NOPE. It\'s Japanese: 絵 (e = picture) + 文字 (moji = character). "Picture character." The fact that it sounds like "emotion" in English is a complete coincidence. The universe just has a sick sense of humor.',
      emoji: '🤯',
    },
    speakerNotes: 'This genuinely blows people\'s minds. Pause after the reveal.',
  },

  /* ── Slide 7: Japan Only ─────────────────────────────────── */
  {
    id: 'japan-only',
    position: { x: 12000, y: 600, scale: 0.8, rotation: 2 },
    transition: { id: 'emoji-door', duration: 900, emoji: '🚪' },
    content: {
      type: 'text',
      title: 'Japan\'s Best-Kept Secret',
      body: "For TEN YEARS, emoji was Japan-only. The rest of the world was still typing :-) like animals. And it gets worse: each Japanese carrier had their OWN emoji that didn't work on other networks. Send a heart on DoCoMo, get a blank square on SoftBank. Chaos.",
      emoji: '🇯🇵',
    },
    speakerNotes: 'Transition to Act 2 which covers the carrier wars in detail.',
  },
]
