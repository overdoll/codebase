/**
 * @flow
 */
import type { Node } from 'react'
import { chakra } from '@chakra-ui/react'

type Props = {
  fill?: string,
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
  fill,
  sx,
  ...rest
}: Props): Node {
  return (
    <chakra.svg
      as={icon}
      sx={{
        path: { stroke: color ?? 'none', fill: fill ?? 'none' },
        ...sx
      }}
      {...rest}
    />
  )
}
