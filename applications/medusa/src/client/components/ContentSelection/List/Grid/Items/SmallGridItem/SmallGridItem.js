/**
 * @flow
 */
import type { Node } from 'react'
import { WrapItem } from '@chakra-ui/react'

type Props = {}

export default function SmallGridItem ({ children, ...rest }: Props): Node {
  return (
    <WrapItem h='35%' w='30%' {...rest}>
      {children}
    </WrapItem>
  )
}
