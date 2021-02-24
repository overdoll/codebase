/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  children?: Node,
  sx?: any,
};

export default function Frame(props: Props): Node {
  return (
    <div sx={{ display: 'flex', width: '100%', mt: 5 }}>
      <div sx={{ margin: 'auto', width: ['small', 'regular'] }}>
        {props.children}
      </div>
    </div>
  );
}
