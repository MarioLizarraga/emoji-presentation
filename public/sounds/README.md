# Sound Files

This directory contains MP3 sound effects used by the presentation.

## Required Files

| File | Description | Volume |
|------|-------------|--------|
| `whoosh.mp3` | Slide transition swoosh | 0.3 |
| `boom.mp3` | Impact / explosion | 0.6 |
| `correct.mp3` | Correct answer chime | 0.5 |
| `wrong.mp3` | Wrong answer buzzer | 0.5 |
| `buzz.mp3` | Timer buzz | 0.7 |
| `drumroll.mp3` | Suspense drumroll | 0.5 |
| `fanfare.mp3` | Victory fanfare | 0.6 |
| `tick.mp3` | Timer tick | 0.3 |
| `game-intro.mp3` | Game start jingle | 0.6 |
| `neon-flicker.mp3` | Neon sign flicker | 0.4 |
| `slash.mp3` | Slash / swipe effect | 0.5 |
| `shatter.mp3` | Glass shatter | 0.5 |
| `click.mp3` | UI button click | 0.2 |
| `freeze.mp3` | Freeze / ice effect | 0.4 |
| `unlock.mp3` | Unlock / reveal | 0.4 |

## Replacing Placeholder Sounds

The placeholder files are silent MP3s. Replace them with real sound effects:

1. Find royalty-free sound effects (e.g., freesound.org, pixabay.com/sound-effects)
2. Download as MP3 format
3. Keep files short (0.5-2 seconds for most effects, longer for drumroll/fanfare)
4. Name them exactly as listed above
5. The SoundManager will pick them up automatically

## Generating Placeholders

If placeholder files are missing, generate them with ffmpeg:

```bash
for name in whoosh boom correct wrong buzz drumroll fanfare tick game-intro neon-flicker slash shatter click freeze unlock; do
  ffmpeg -f lavfi -i anullsrc=r=44100:cl=mono -t 0.5 -q:a 9 "public/sounds/$name.mp3" -y 2>/dev/null
done
```

Or run the Node.js generator script:

```bash
node scripts/generate-placeholder-sounds.mjs
```
