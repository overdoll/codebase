/**
 * @flow
 */
import { Flex } from '@chakra-ui/react'
import type { Node } from 'react'

type Props = {
  children: Node
}

export default function NavigationContainer ({ children }: Props): Node {
  return (
    <>
      <Flex
        align='center' right={0} left={0} top={0} h='54px'
      />
      <Flex
        zIndex='docked' boxShadow='sm' align='center' right={0} left={0} top={0}
        position='fixed' h='54px'
        bg='gray.800'
      >
        {children}
      </Flex>
    </>
  )
}