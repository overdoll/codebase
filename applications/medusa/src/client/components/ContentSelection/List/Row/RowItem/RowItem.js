/**
 * @flow
 */
import type { Node } from 'react'
import { Box } from '@chakra-ui/react'

type Props = {}

export default function RowItem ({ children }: Props): Node {
  return (
    <Box w='100%' h={{ base: 58, md: 90 }}>
      {children}
    </Box>
  )
}
