import { OverlappingBubbles, OverlappingCircles, OverlappingPlus } from '@//:assets/icons/patterns'
import IconPattern from './IconPattern/IconPattern'
import { useMemo } from 'react'
import { Random } from '../../../../../utilities/random'
import hash from '../../../../../utilities/hash'

interface Props {
  seed: string | undefined
}

const defaultSeed = 'DETERMINISTIC_SEED'

export default function RandomPattern ({ seed }: Props): JSX.Element {
  const memoized = useMemo(() => new Random(hash(seed ?? defaultSeed)), [seed])

  const icons = [
    {
      icon: OverlappingBubbles,
      zoom: 'large'
    },
    {
      icon: OverlappingCircles,
      zoom: 'small'
    },
    {
      icon: OverlappingPlus,
      zoom: 'medium'
    }
  ]

  const chosen = useMemo(() => memoized.nextInt32([0, 3]), [seed])

  const randomIcon = icons[chosen]

  // TODO center it or position randomly so it doesnt look clipped on right/bottom edge
  return (
    <IconPattern
      opacity='0.05'
      zoom={randomIcon.zoom}
      icon={randomIcon.icon}
      fill='gray.00'
    />
  )
}
