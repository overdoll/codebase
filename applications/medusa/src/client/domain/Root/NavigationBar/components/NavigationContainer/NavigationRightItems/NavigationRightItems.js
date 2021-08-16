/**
 * @flow
 */
import { Flex } from '@chakra-ui/react'
import type { Node } from 'react'

type Props = {
  children: Node
}

export default function NavigationRightItems ({ children }: Props): Node {
  return (
    <Flex m='auto' right={0} mr={1}>
      <Flex
        borderRadius={10} bg={{ base: 'transparent', md: 'gray.900' }}
        align='center'
      >
        <Flex m={1}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
