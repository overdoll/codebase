/**
 * @flow
 */
import type { Node } from 'react'
import { Wrap } from '@chakra-ui/react'

type Props = {
  children: Node
}

export default function GridWrap ({ children }: Props): Node {
  return (
    <Wrap justify='center'>
      {children}
    </Wrap>
  )
}
