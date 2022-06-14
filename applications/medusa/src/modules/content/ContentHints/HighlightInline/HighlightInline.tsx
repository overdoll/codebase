import { Text, TextProps } from '@chakra-ui/react'
import { ColorScheme } from '@//:types/components'

interface Props extends TextProps {
  children: string
  colorScheme?: ColorScheme | undefined
}

export default function HighlightInline ({
  children,
  colorScheme = 'gray',
  ...rest
}: Props): JSX.Element {
  const color = colorScheme == null ? undefined : (colorScheme === 'gray' ? `${colorScheme}.00` : `${colorScheme}.300`)

  return (
    <Text
      as='b'
      fontWeight='inherit'
      color={color}
      {...rest}
    >
      {children}
    </Text>
  )
}
