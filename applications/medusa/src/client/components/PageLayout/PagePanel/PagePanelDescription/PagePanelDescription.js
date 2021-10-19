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

    <Text fontFamily='body' fontWeight='semibold' textAlign='left' color='gray.200' fontSize='sm'>
      {children}
    </Text>
  )
}
