/**
 * @flow
 */
import type { Node } from 'react';
import { Box } from '@chakra-ui/react';

type Props = {
  color: string,
  size: number,
};

export default function ColorCircle({ color }: Props): Node {
  return <Box bg={color} w={size} h={size} borderRadius="100%" p={4} />;
}
