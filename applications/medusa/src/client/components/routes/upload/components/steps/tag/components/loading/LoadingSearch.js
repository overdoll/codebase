/**
 * @flow
 */
import type { Node } from 'react';
import { Skeleton } from '@chakra-ui/react';

// eslint-disable-next-line node/handle-callback-err
export default function LoadingSearch(): Node {
  return <Skeleton />;
}
