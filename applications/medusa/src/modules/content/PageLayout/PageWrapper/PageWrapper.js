/**
 * @flow
 */
import type { Node } from 'react';
import { Box, Center } from '@chakra-ui/react';

type Props = {
  children: Node
};

export default function PageWrapper ({ children }: Props): Node {
  return (
    <Center mt={8}>
      <Box
        w={['full', 'sm', 'md', 'lg']}
        pl={[1, 0]}
        pr={[1, 0]}
        mb={6}
      >
        {children}
      </Box>
    </Center>
  )
}
