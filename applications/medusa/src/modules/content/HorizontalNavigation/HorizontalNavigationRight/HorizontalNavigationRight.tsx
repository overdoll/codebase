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
        bg={{
          base: 'transparent',
          md: 'gray.900'
        }}
        p={1}
        align='center'
      >
        <HStack spacing={3}>
          {children}
        </HStack>
      </Flex>
    </Flex>
  )
}