/**
 * @flow
 */

import { Node } from 'react'
import { Flex } from '@chakra-ui/react'

type Props = {
  leftProps: Node,
  centerProp: Node,
  rightProps: Node,
}

export default function ContextMenu ({ leftProps, centerProp, rightProps, ...rest }: Props): Node {
  return (
    <Flex direction='row' justify='space-between' position='relative' align='center' {...rest}>
      <Flex h='100%' direction='row'>
        {leftProps}
      </Flex>
      <Flex zIndex='hide' h='100%' left={0} right={0} margin='auto' w='100%' justify='center' position='absolute'>
        {centerProp}
      </Flex>
      <Flex h='100%' direction='row'>
        {rightProps}
      </Flex>
    </Flex>
  )
}
