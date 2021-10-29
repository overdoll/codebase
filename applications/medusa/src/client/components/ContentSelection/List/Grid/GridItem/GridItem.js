/**
 * @flow
 */
import type { Node } from 'react'
import { WrapItem } from '@chakra-ui/react'

type Props = {}

export default function GridItem ({ children }: Props): Node {
  return (
    <WrapItem h={150} w={120}>
      {children}
    </WrapItem>
  )
}
