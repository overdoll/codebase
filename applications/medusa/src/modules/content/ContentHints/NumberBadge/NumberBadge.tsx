import { Flex, Heading } from '@chakra-ui/react'

interface Props {
  value: number
  size?: 'sm' | 'md' | 'lg'
  colorScheme: string
}

export default function NumberBadge ({
  value,
  size = 'sm',
  colorScheme = 'gray'
}: Props): JSX.Element {
  const sizes = {
    sm: {
      w: 4,
      h: 4
    },
    md: {
      w: 5,
      h: 5
    },
    lg: {
      w: 6,
      h: 6
    }
  }

  const fontSizes = {
    sm: 'sm',
    md: 'sm',
    lg: 'md'
  }

  const boxFill = colorScheme === 'gray' ? `${colorScheme}.700` : `${colorScheme}.300`
  const textFill = colorScheme === 'gray' ? `${colorScheme}.100` : 'gray.00'

  const isOverflowing = value > 9

  const formattedValue = isOverflowing ? 9 : value

  return (
    <Flex
      align='center'
      justify='center'
      bg={boxFill}
      borderRadius='base'
      {...sizes[size]}
    >
      <Heading lineHeight={1} color={textFill} fontSize={fontSizes[size]}>
        {formattedValue}
      </Heading>
      {isOverflowing && (
        <Heading lineHeight={1} color={textFill} fontSize='8px'>
          +
        </Heading>)}
    </Flex>
  )
}
