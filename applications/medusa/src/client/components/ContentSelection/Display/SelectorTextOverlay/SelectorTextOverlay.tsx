import { Flex, Text } from '@chakra-ui/react'

interface Props {
  label: string
  description?: string
  children: JSX.Element
}

export default function SelectorTextOverlay ({
  label,
  children,
  description
}: Props): JSX.Element {
  return (
    <Flex
      objectFit='cover'
      align='center'
      justify='center'
      h='inherit'
      w='inherit'
      position='relative'
    >
      {children}
      <Flex
        bg='dimmers.700'
        w='100%'
        h='inherit'
        position='absolute'
        align='center'
        justify='center'
        direction='column'
        whiteSpace='normal'
      >
        <Text
          fontSize='lg'
          color='gray.00'
        >
          {label}
        </Text>
        {description != null && (
          <Text
            fontSize='sm'
            color='gray.100'
          >
            {description}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}
