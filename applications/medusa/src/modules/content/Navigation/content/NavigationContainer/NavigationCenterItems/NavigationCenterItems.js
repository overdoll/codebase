/**
 * @flow
 */
import { Flex, HStack, SimpleGrid, Grid, Spacer, Box } from '@chakra-ui/react'
import type { Node } from 'react'
import { Fragment } from 'react'

type Props = {
  children: Node
}

export default function NavigationCenterItems ({ children }: Props): Node {
  return (
    <Flex
      zIndex={-1} position='absolute' w='100%' justify='center'
      margin='auto'
    >
      <HStack spacing={{ base: 2, md: 12, lg: 28 }}>
        {children}
      </HStack>
    </Flex>
  )
}
