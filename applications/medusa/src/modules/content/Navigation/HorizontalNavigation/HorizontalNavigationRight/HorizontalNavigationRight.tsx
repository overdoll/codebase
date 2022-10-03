import { Flex, HStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function HorizontalNavigationRight ({ children }: Props): JSX.Element {
  return (
    <Flex
      m='auto'
      right={0}
      mr={1}
    >
      <Flex
        borderRadius='md'
        align='center'
        bg='gray.900'
      >
        <HStack spacing={1}>
          {children}
        </HStack>
      </Flex>
    </Flex>
  )
}
