/**
 * @flow
 */
import type { Node } from 'react'
import { Box } from '@chakra-ui/react'

type Props = {
  children: string
};

export default function LargeBackgroundBox ({ children, ...rest }: Props): Node {
  return (
    <Box bg='gray.800' p={4} borderRadius='md' {...rest}>
      {children}
    </Box>
  )
}
