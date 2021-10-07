/**
 * @flow
 */
import type { Node } from 'react'
import { Text } from '@chakra-ui/react'

type Props = {
  children: string
};

export default function PageSectionDescription ({ children }: Props): Node {
  return (
    <Text fontSize='sm' color='gray.100'>{children}</Text>
  )
}
