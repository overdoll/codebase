/**
 * @flow
 */
import { Flex } from '@chakra-ui/react'
import type { Node } from 'react'

type Props = {
  children: Node,
}

export default function NavigationContents ({ children }: Props): Node {
  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      {children}
    </Flex>
  )
}
