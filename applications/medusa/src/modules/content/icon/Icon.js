/**
 * @flow
 */
import type { Node } from 'react'
import { chakra } from '@chakra-ui/react'

type Props = {
  alt?: string,
  title?: string,
  icon: Node,
  color?: string,
  sx?: {},
};

export default function Icon ({
  title,
  alt,
  icon,
  color,
  sx,
  ...rest
}: Props): Node {
  return (
    <chakra.svg
      as={icon}
      sx={{ path: { stroke: color ?? 'red.500' }, ...sx }}
      {...rest}
    />
  )
}
