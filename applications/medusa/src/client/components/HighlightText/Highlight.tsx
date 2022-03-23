import { Text } from '@chakra-ui/react'
import { ColorScheme } from '@//:types/components'

interface Props {
  children: string
  colorScheme: ColorScheme
}

export default function Highlight ({
  children,
  colorScheme = 'gray'
}: Props): JSX.Element {
  const color = colorScheme === 'gray' ? `${colorScheme}.00` : `${colorScheme}.400`

  return (
    <Text
      as='b'
      fontWeight='inherit'
      color={color}
    >
      {children}
    </Text>
  )
}
