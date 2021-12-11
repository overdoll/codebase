/**
 * @flow
 */
import type { Node } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  children: string
};

export default function SmallBackgroundBox ({ children, ...rest }: Props): Node {
  return (
    <Box bg='gray.800' p={3} borderRadius='base' {...rest}>
      {children}
    </Box>
  )
}
