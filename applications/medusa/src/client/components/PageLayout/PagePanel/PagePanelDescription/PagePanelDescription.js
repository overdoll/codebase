/**
 * @flow
 */
import type { Node } from 'react'
import { Text } from '@chakra-ui/react'

type Props = {
  children: string
};

export default function PagePanelDescription ({ children }: Props): Node {
  return (
    <Text textAlign='left' color='gray.200' fontSize='md'>
      {children}
    </Text>
  )
}
