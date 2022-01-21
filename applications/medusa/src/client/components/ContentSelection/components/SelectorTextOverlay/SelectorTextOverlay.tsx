import { Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  label: string
  description?: string
  children: ReactNode
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
        p={2}
        bg='dimmers.700'
        w='100%'
        h='inherit'
        position='absolute'
        align='center'
        justify='center'
        direction='column'
        whiteSpace='normal'
        wordBreak='break-word'
      >
        <Text
          fontSize='lg'
          color='gray.00'
          textAlign='center'
        >
          {label}
        </Text>
        {description != null && (
          <Text
            textAlign='center'
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
