/**
 * @flow
 */
import type { Node } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  children: Node
};

export default function PageSectionWrap ({ children }: Props): Node {
  return (
    <Box mb={2}>
      {children}
    </Box>
  )
}
