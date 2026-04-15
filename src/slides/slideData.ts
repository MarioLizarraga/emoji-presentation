import { act1Slides } from './content/act1-origins'
import { act2Slides } from './content/act2-chaos'
import { act3Slides } from './content/act3-drama'
import { act4Slides } from './content/act4-platforms'
import { act5Slides } from './content/act5-game'
import type { SlideData } from './types'

export const allSlides: SlideData[] = [
  ...act1Slides,
  ...act2Slides,
  ...act3Slides,
  ...act4Slides,
  ...act5Slides,
]
