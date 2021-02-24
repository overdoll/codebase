/**
 * @flow
 */
import type { Node } from 'react';

import CanUseDOM from '@//:modules/utilities/CanUseDOM';

type Props = {
  children: Node,
};

/**
 * Sometimes, when the server prefetches data, we want to set an explicit boundary for this.
 *
 * For example, we want the server to fetch the initial "data" for the page, but we dont want the server to fetch data in
 * dropdown menus. This is useful to create a "bailout" boundary, where the server won't render the children components
 * so that not all of our GraphQL requests are done on the server. Some requests, like websockets, we want to be done in
 * the client.
 */
export default function BailoutBoundary(props: Props): Node {
  if (CanUseDOM) {
    return props.children;
  }

  return null;
}
