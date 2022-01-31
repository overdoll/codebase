import {
  PlaceholderResourceRabbit,
  PlaceholderResourceRobot,
  PlaceholderResourceSkull
} from '@//:assets/icons/interface'
import { Icon } from '../../index'
import { useConst } from '@chakra-ui/react'

export default function RandomIcon (): JSX.Element {
  const icons = [
    PlaceholderResourceRabbit,
    PlaceholderResourceSkull,
    PlaceholderResourceRobot
  ]

  const colors = [
    'gray.00',
    'purple.400',
    'orange.400',
    'teal.400',
    'green.400',
    'primary.400'
  ]

  // take mod of a number (from id) (3 mod id) and then use that as the number
  // for selecting the random icon

  const randomValues = useConst({
    icons: Math.random() * 3,
    colors: Math.random() * 6
  })

  const randomIcon = icons[Math.floor(randomValues.icons)]
  const randomColor = colors[Math.floor(randomValues.colors)]

  return (
    <Icon icon={randomIcon} fill={randomColor} w='100%' h='100%' p={2} />
  )
}
