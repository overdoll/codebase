import {
  PlaceholderResourceRabbit,
  PlaceholderResourceRobot,
  PlaceholderResourceSkull
} from '@//:assets/icons/interface'
import { useConst } from '@chakra-ui/react'
import { Icon } from '../../PageLayout'
import { useMemo } from 'react'
import { Random } from '../../../utilities/random'
import hash from '../../../utilities/hash'

interface Props {
  seed: string | undefined
}

const defaultSeed = 'DETERMINISTIC_SEED'

export default function RandomIcon ({ seed }: Props): JSX.Element {
  const memoized = useMemo(() => new Random(hash(seed ?? defaultSeed)), [seed])

  const icons = [
    PlaceholderResourceRabbit,
    PlaceholderResourceSkull,
    PlaceholderResourceRobot
  ]

  const colors = [
    'gray.00',
    'purple.300',
    'orange.300',
    'teal.300',
    'green.300',
    'primary.300'
  ]

  const chosenIcon = useMemo(() => memoized.nextInt32([0, 3]), [seed])
  const chosenColor = useMemo(() => memoized.nextInt32([0, 6]), [seed])

  const randomValues = useConst({
    icons: chosenIcon,
    colors: chosenColor
  })

  const randomIcon = icons[randomValues.icons]
  const randomColor = colors[randomValues.colors]

  return (
    <Icon icon={randomIcon} fill={randomColor} w='100%' h='100%' p={2} />
  )
}
