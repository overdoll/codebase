import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

interface Props extends HTMLChakraProps<any> {
  fill?: string
  icon: FunctionComponent<any>
  color?: string
  sx?: {}
  zoom?: string
}

export default function IconPattern ({
  icon,
  color,
  fill,
  sx,
  zoom = 'small',
  ...rest
}: Props): JSX.Element {
  const determineZoom = (): string => {
    switch (zoom) {
      case 'small':
        return '60'
      case 'medium':
        return '90'
      case 'large':
        return '120'
      default:
        return '60'
    }
  }

  return (
    <chakra.svg w='100%' h='100%'>
      <pattern
        id='pattern'
        x='0'
        y='0'
        width={determineZoom()}
        height={determineZoom()}
        patternUnits='userSpaceOnUse'
        viewBox='0 0 80 80'
      >
        <chakra.svg
          as={icon}
          sx={{
            path: {
              stroke: color ?? 'none',
              fill: fill ?? 'none'
            },
            circle: {
              stroke: color ?? 'none',
              fill: fill ?? 'none'
            },
            rect: {
              stroke: color ?? 'none',
              fill: fill ?? 'none'
            },
            ...sx
          }}
          {...rest}
        />
      </pattern>
      <rect x='0' y='0' width='100%' height='100%' fill='url(#pattern)' />
    </chakra.svg>
  )
}
