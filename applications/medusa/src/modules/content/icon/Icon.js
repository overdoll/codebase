/**
 * @flow
 */
import type { Node } from 'react';
import { chakra, useToken } from '@chakra-ui/react';

type Props = {
  alt?: any,
  title?: any,
  icon: any,
  color?: any,
};

export default function Icon({
  title,
  alt,
  icon,
  color,
  ...rest
}: Props): Node {
  const [col] = useToken('colors', [color ?? 'red.500']);

  return <chakra.svg as={icon} sx={{ path: { stroke: col } }} {...rest} />;
}
