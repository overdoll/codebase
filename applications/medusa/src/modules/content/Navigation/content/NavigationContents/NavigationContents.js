/**
 * @flow
 */
import { Box, Flex } from '@chakra-ui/react'
import type { Node } from 'react'

type Props = {
  children: Node,
}

export default function NavigationContents ({ children }: Props): Node {
  return (
    <Box
      left={0} right={0} top={54} bottom={0} position='absolute' overflowY='auto'
      overflowX='hidden'
    >
      {children}
    </Box>
  )
}
