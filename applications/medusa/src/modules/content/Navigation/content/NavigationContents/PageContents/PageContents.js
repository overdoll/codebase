/**
 * @flow
 */
import { Box } from '@chakra-ui/react'
import type { Node } from 'react'

type Props = {
  children: Node
}

export default function PageContents ({ children }: Props): Node {
  return (
    <Box ml={{ base: 0, md: 290, xl: 0 }}>
      {children}
    </Box>
  )
}
