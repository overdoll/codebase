/**
 * @flow
 */
import type { Node } from 'react'
import { WrapItem } from '@chakra-ui/react'

type Props = {
  children: Node
}

export default function LargeGridItem ({ children, ...rest }: Props): Node {
  return (
    <WrapItem h='45%' w='45%' {...rest}>
      {children}
    </WrapItem>
  )
}
