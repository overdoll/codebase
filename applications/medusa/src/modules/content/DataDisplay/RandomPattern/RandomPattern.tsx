import {
  PlaceholderResourceRabbit,
  PlaceholderResourceRobot,
  PlaceholderResourceSkull
} from '@//:assets/icons/interface'
import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Icon } from '../../index'
import { OverlappingCircles } from '@//:assets/icons/patterns'

interface Props {
  children: ReactNode
}

export default function RandomPattern ({ children }: Props): JSX.Element {
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

  const icon = <Icon icon={OverlappingCircles} fill='gray.00' />

  return (
    <Box
      w='100%'
      h='100%'
      backgroundColor='gray.100'
      backgroundRepeat='repeat'
      backgroundImage={`url(data:image/svg+xml;utf8,${OverlappingCircles})`}
    >
      {children}
    </Box>
  )
}
