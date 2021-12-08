/**
 * @flow
 */
import {
  Flex, HStack
} from '@chakra-ui/react'
import type { Node } from 'react'
import { RenderOnMobile, RenderOnDesktop } from '@//:modules/content/PageLayout'

type Props = {
  children: Node
}

export default function NavigationBarCenter ({ children }: Props): Node {
  return (
    <Flex
      zIndex={-1} position='absolute' justify='center'
      margin='auto' w='100%'
    >
      <RenderOnDesktop>
        <HStack spacing={{ base: 2, md: 12, lg: 28 }}>
          {children}
        </HStack>
      </RenderOnDesktop>
      <RenderOnMobile w='100%'>
        <Flex w='100%' justify='space-evenly'>
          {children}
        </Flex>
      </RenderOnMobile>
    </Flex>
  )
}
