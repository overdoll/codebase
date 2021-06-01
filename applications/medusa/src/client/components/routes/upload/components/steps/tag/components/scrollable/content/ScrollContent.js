/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  children: Node,
  sx?: any,
};

export default function ScrollContent({ children, sx, ...rest }: Props): Node {
  return (
    <div
      {...rest}
      sx={{
        flex: '0 0 auto',
        ml: 1,
        mr: 1,
        mt: 2,
        mb: 4,
        objectFit: 'cover',
        alignContent: 'stretch',
        overflow: 'hidden',
        borderRadius: 5,
        ...sx,
      }}
    >
      {children}
    </div>
  );
}
