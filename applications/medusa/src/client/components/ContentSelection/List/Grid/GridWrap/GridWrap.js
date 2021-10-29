/**
 * @flow
 */
import type { Node } from 'react'
import { Wrap } from '@chakra-ui/react'

type Props = {}

export default function GridWrap ({ children }: Props): Node {
  return (
    <Wrap justify='center'>
      {children}
    </Wrap>
  )
}
