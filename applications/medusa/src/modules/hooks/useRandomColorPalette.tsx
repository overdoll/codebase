import { useMemo } from 'react'
import { Random } from '../utilities/random'
import hash from '../utilities/hash'
import { DEFAULT_SEED, TAG_COLOR_PALETTE } from '../constants/theme'

export default function useRandomColorPalette (seed: string): string {
  const memoized = useMemo(() => new Random(hash(seed ?? DEFAULT_SEED)), [seed])

  const chosenColor = useMemo(() => memoized.nextInt32([0, TAG_COLOR_PALETTE.length]), [seed])

  return TAG_COLOR_PALETTE[chosenColor]
}
