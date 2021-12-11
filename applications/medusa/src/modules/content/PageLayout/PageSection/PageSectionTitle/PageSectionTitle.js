/**
 * @flow
 */
import type { Node } from 'react';
import { Heading } from '@chakra-ui/react';

type Props = {
  children: string
};

export default function PageSectionTitle ({ children }: Props): Node {
  return (
    <>
      <Heading fontSize='2xl' color='gray.00'>{children}</Heading>
    </>
  )
}
