import {
  PlaceholderResourceRabbit,
  PlaceholderResourceRobot,
  PlaceholderResourceSkull
} from '@//:assets/icons/interface'
import { Icon } from '../../index'

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

  const randomIcon = icons[Math.floor(Math.random() * 3)]
  const randomColor = colors[Math.floor(Math.random() * 6)]

  return (
    <Icon icon={randomIcon} fill={randomColor} w='100%' h='100%' p={2} />
  )
}
