/**
 * @flow
 */
import {
  Box
} from '@chakra-ui/react'

type Props = {
  children: Node,
}

export default function RenderOnDesktop ({ children }: Props): Node {
  return (
    <Box display={{ base: 'none', md: 'inherit' }}>
      {children}
    </Box>
  )
}
