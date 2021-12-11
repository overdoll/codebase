/**
 * @flow
 */
import { Box } from '@chakra-ui/react'

type Props = {
  children: Node,
}

export default function RenderOnMobile ({ children, ...rest }: Props): Node {
  return (
    <Box display={{ base: 'inherit', md: 'none' }} {...rest}>
      {children}
    </Box>
  )
}
