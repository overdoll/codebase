/**
 * @flow
 */
import type { Node } from 'react';
import { Image } from '@chakra-ui/react';

type Props = {
  src?: string,
  sx?: any,
};

export default function ImageSmall(src: Props): Node {
  return (
    <Image alt="thumbnail" src={src.link} w="100%" h="100%" objectFit="cover" />
  );
}
