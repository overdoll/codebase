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
import { IconSizes } from '../../../../HookedComponents/Media/fragments/Media/IconImageMedia/IconImageMedia'

interface Props {
  seed: string | undefined
  size?: IconSizes
}

export default function RandomIcon (props: Props): JSX.Element {
  const {
    size,
    seed
  } = props

  const memoized = useMemo(() => new Random(hash(seed ?? DEFAULT_SEED)), [seed])

  const icons = [
    PlaceholderResourceRabbit,
    PlaceholderResourceSkull,
    PlaceholderResourceRobot
  ]

  const chosenColor = useMemo(() => memoized.nextInt32([0, TAG_COLOR_PALETTE.length]), [seed])

  const chosenIcon = useMemo(() => memoized.nextInt32([0, 3]), [seed])

  const randomValues = useConst({
    icons: chosenIcon,
    colors: chosenColor
  })

  const randomIcon = icons[randomValues.icons]
  const randomColor = TAG_COLOR_PALETTE[randomValues.colors]

  return (
    <Icon flexShrink={0} icon={randomIcon} fill={randomColor} w='100%' h='100%' p={size === 'sm' ? 1 : 2} />
  )
}
