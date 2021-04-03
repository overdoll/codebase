/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  src?: string,
  sx?: any,
};

export default function ImageSmall(src: Props): Node {
  return (
    <img
      alt="thumbnail"
      src={src.link}
      sx={{
        backgroundColor: 'neutral.800',
        height: 'fill',
        width: 'fill',
        objectFit: 'cover',
      }}
    />
  );
}
