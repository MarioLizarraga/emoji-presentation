import { Howl } from 'howler'

type SoundId = 'whoosh' | 'boom' | 'correct' | 'wrong' | 'buzz' | 'drumroll' | 'fanfare' | 'tick' | 'game-intro' | 'neon-flicker' | 'slash' | 'shatter' | 'click' | 'freeze' | 'unlock'

const BASE = import.meta.env.BASE_URL

class SoundManagerClass {
  private sounds = new Map<SoundId, Howl>()
  private muted = false

  init() {
    const load = (id: SoundId, src: string, volume = 0.5) => {
      this.sounds.set(id, new Howl({ src: [BASE + src], volume, preload: true }))
    }
    load('whoosh', 'sounds/whoosh.mp3', 0.3)
    load('boom', 'sounds/boom.mp3', 0.6)
    load('correct', 'sounds/correct.mp3', 0.5)
    load('wrong', 'sounds/wrong.mp3', 0.5)
    load('buzz', 'sounds/buzz.mp3', 0.7)
    load('drumroll', 'sounds/drumroll.mp3', 0.5)
    load('fanfare', 'sounds/fanfare.mp3', 0.6)
    load('tick', 'sounds/tick.mp3', 0.3)
    load('game-intro', 'sounds/game-intro.mp3', 0.6)
    load('neon-flicker', 'sounds/neon-flicker.mp3', 0.4)
    load('slash', 'sounds/slash.mp3', 0.5)
    load('shatter', 'sounds/shatter.mp3', 0.5)
    load('click', 'sounds/click.mp3', 0.2)
    load('freeze', 'sounds/freeze.mp3', 0.4)
    load('unlock', 'sounds/unlock.mp3', 0.4)
  }

  play(id: SoundId) { if (!this.muted) this.sounds.get(id)?.play() }
  stop(id: SoundId) { this.sounds.get(id)?.stop() }
  toggleMute() { this.muted = !this.muted; return this.muted }
  isMuted() { return this.muted }
}

export const SoundManager = new SoundManagerClass()
