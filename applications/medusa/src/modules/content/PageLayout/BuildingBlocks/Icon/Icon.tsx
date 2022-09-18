import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { IconType } from '@//:types/components'

export interface IconProps extends HTMLChakraProps<any> {
  fill?: string
  alt?: string
  title?: string
  icon: IconType
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
}: IconProps): JSX.Element {
  return (
    <chakra.svg
      as={icon}
      sx={{
        path: {
          boxShadow: 'lg',
          stroke: color ?? undefined,
          fill: fill ?? undefined
        },
        circle: {
          stroke: color ?? undefined,
          fill: fill ?? undefined
        },
        rect: {
          stroke: color ?? undefined,
          fill: fill ?? undefined
        },
        ...sx
      }}
      {...rest}
    />
  )
}
