/**
 * @flow
 */
import type { Node } from 'react'
import { Heading } from '@chakra-ui/react'

type Props = {
  children: string
};

export default function PagePanelTitle ({ children }: Props): Node {
  return (
    <Heading color='gray.100' fontSize='lg'>
      {children}
    </Heading>
  )
}
