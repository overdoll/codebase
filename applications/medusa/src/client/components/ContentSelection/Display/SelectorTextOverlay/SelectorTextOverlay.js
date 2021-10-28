/**
 * @flow
 */
import type { Node } from 'react'

import { Stack, Box, Heading, Text, Wrap, WrapItem, Flex } from '@chakra-ui/react'

type Props = {
  label: string,
}

export default function SelectorTextOverlay ({ label, children }: Props): Node {
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
        bg='dimmers.700'
        w='100%'
        h='inherit'
        position='absolute'
        align='center'
        justify='center'
      >
        <Text fontSize='lg' color='gray.00'>
          {label}
        </Text>
      </Flex>
    </Flex>
  )
}
