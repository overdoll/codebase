/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  src?: string,
  size?: number,
  sx?: any,
};

export default function ImageSmall(src, size: Props): Node {
  return (
    <img
      alt="thumbnail"
      src={src.link}
      sx={{
        backgroundColor: 'neutral.800',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      }}
    />
  );
}
