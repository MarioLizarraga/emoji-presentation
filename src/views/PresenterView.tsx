import { SlideEngine } from '../engine/SlideEngine'
import type { SlideData } from '../slides/types'

const testSlides: SlideData[] = [
  {
    id: 'test-1',
    position: { x: 0, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'fade', duration: 1 },
    content: { type: 'title', title: 'The Emoji Story', subtitle: 'From 176 Pixels to World Domination', emoji: '😂' },
  },
  {
    id: 'test-2',
    position: { x: 2000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'slide', duration: 1 },
    content: { type: 'text', title: 'The Problem', body: '1999. Japan. Texting was boring. No way to express emotion. One engineer decided to change that.', emoji: '📱' },
  },
  {
    id: 'test-3',
    position: { x: 4000, y: 0, scale: 1, rotation: 0 },
    transition: { id: 'zoom-in', duration: 1.2 },
    content: { type: 'stat', value: '176', label: 'The Original Emoji Set', sublabel: '12×12 pixels each — created by one person' },
  },
]

export function PresenterView() {
  return <SlideEngine slides={testSlides} />
}
