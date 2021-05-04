/**
 * @flow
 */
import type { Node } from 'react';
import { chakra } from '@chakra-ui/react';

type Props = {
  alt?: any,
  title?: any,
  icon: any,
  color?: any,
  fill?: any,
  sx?: any,
};

export default function Icon({
  title,
  alt,
  icon,
  color,
  fill,
  sx,
  ...rest
}: Props): Node {
  return (
    <chakra.svg
      as={icon}
      sx={{
        path: { stroke: color ?? 'none', fill: fill ?? 'none' },
        ...sx,
      }}
      {...rest}
    />
  );
}
