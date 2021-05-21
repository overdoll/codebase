/**
 * @flow
 */
import type { Node } from 'react'
import { chakra } from '@chakra-ui/react'

type Props = {
  alt?: any,
  title?: any,
  icon: any,
  color?: any,
  sx?: any,
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
