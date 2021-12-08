/**
 * @flow
 */
import { Flex } from '@chakra-ui/react'
import type { Node } from 'react'

type Props = {
  children: Node
}

export default function NavigationBarLeft ({ children }: Props): Node {
  return (
    <Flex display={{ base: 'none', md: 'flex' }} left={0} ml={3}>
      {children}
    </Flex>
  )
}
