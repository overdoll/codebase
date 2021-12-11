/**
 * @flow
 */
import { Box } from '@chakra-ui/react';
import type { Node } from 'react';

type Props = {
  children: Node
}

export default function PageContents ({ children }: Props): Node {
  return (
    <Box className='page-contents' w='100%'>
      {children}
    </Box>
  )
}
