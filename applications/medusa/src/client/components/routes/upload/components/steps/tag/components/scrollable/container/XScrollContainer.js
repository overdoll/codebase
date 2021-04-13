/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  children: Node,
};

export default function XScrollContainer(props: Props): Node {
  return (
    <div
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
      }}
    >
      {props.children}
    </div>
  );
}
