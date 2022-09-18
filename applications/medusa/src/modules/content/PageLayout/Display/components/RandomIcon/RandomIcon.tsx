import {
  PlaceholderResourceRabbit,
  PlaceholderResourceRobot,
  PlaceholderResourceSkull
} from '@//:assets/icons/interface'
import { useConst } from '@chakra-ui/react'
import { Icon } from '../../../index'
import { useMemo } from 'react'
import { Random } from '../../../../../utilities/random'
import hash from '../../../../../utilities/hash'
import { DEFAULT_SEED, TAG_COLOR_PALETTE } from '../../../../../constants/theme'

interface Props {
  seed: string | undefined
}

export default function RandomIcon ({ seed }: Props): JSX.Element {
  const memoized = useMemo(() => new Random(hash(seed ?? DEFAULT_SEED)), [seed])

  const icons = [
    PlaceholderResourceRabbit,
    PlaceholderResourceSkull,
    PlaceholderResourceRobot
  ]

  const chosenIcon = useMemo(() => memoized.nextInt32([0, 3]), [seed])
  const chosenColor = useMemo(() => memoized.nextInt32([0, TAG_COLOR_PALETTE.length]), [seed])

  const randomValues = useConst({
    icons: chosenIcon,
    colors: chosenColor
  })

  const randomIcon = icons[randomValues.icons]
  const randomColor = TAG_COLOR_PALETTE[randomValues.colors]

  return (
    <Icon icon={randomIcon} fill={randomColor} w='100%' h='100%' p={2} />
  )
}
