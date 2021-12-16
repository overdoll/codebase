import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

interface Props extends HTMLChakraProps<any> {
  fill?: string
  alt?: string
  title?: string
  icon: FunctionComponent<any>
  color?: string
  sx?: {}
}

export default function Icon ({
  title,
  alt,
  icon,
  color,
  fill,
  sx,
  w,
  ...rest
}: Props): JSX.Element {
  return (
    <chakra.svg
      as={icon}
      sx={{
        path: {
          stroke: color ?? 'none',
          fill: fill ?? 'none'
        },
        ...sx
      }}
      {...rest}
    />
  )
}
