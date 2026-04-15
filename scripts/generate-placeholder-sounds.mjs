import { writeFileSync } from 'fs';
import { join } from 'path';

// Minimal valid MP3 frame: MPEG1 Layer3 128kbps 44100Hz
const header = Buffer.from([0xFF, 0xFB, 0x90, 0x04]);
const frameSize = 417;
const padding = Buffer.alloc(frameSize - 4, 0);
const silentFrame = Buffer.concat([header, padding]);

// ~0.5 seconds: 19 frames (each frame = 1152 samples at 44100Hz)
const frames = [];
for (let i = 0; i < 19; i++) frames.push(silentFrame);
const mp3Data = Buffer.concat(frames);

const soundsDir = join(import.meta.dirname, '..', 'public', 'sounds');
const names = [
  'whoosh', 'boom', 'correct', 'wrong', 'buzz', 'drumroll',
  'fanfare', 'tick', 'game-intro', 'neon-flicker', 'slash',
  'shatter', 'click', 'freeze', 'unlock'
];

names.forEach(name => {
  const fp = join(soundsDir, `${name}.mp3`);
  writeFileSync(fp, mp3Data);
  console.log(`Created ${name}.mp3 (${mp3Data.length} bytes)`);
});

console.log(`\nDone: ${names.length} placeholder MP3 files created in public/sounds/`);
