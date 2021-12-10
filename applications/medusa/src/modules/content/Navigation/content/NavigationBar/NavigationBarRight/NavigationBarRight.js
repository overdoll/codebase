/**
 * @flow
 */
import { Flex, HStack } from '@chakra-ui/react'
import type { Node } from 'react'

type Props = {
  children: Node
}

export default function NavigationBarRight ({ children }: Props): Node {
  return (
    <Flex display={{ base: 'none', md: 'flex' }} m='auto' right={0} mr={1}>
      <Flex
        borderRadius='md' bg={{ base: 'transparent', md: 'gray.900' }}
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
