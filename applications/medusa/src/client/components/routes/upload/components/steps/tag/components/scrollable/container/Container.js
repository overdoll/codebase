/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  children: Node,
};

export default function ImageSmall(props: Props): Node {
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
