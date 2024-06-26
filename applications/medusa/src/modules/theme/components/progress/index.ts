import {
  generateStripe,
  getColor,
  mode,
  PartsStyleFunction,
  PartsStyleObject,
  StyleFunctionProps,
  SystemStyleFunction,
  SystemStyleObject
} from '@chakra-ui/theme-tools'
import { progressAnatomy as parts } from '@chakra-ui/anatomy'

function filledStyle (props: StyleFunctionProps): SystemStyleObject {
  const {
    colorScheme: c,
    theme: t,
    isIndeterminate,
    hasStripe
  } = props

  const stripeStyle = mode(
    generateStripe(),
    generateStripe('1rem', 'rgba(0,0,0,0.1)')
  )(props)

  const getValidColor = c === 'primary' ? `${c}.500` : `${c}.300`

  const bgColor = mode(`${c}.500`, getValidColor)(props)

  const gradient = `linear-gradient(
    to right,
    transparent 0%,
    ${getColor(t, bgColor) as string} 50%,
    transparent 100%
  )`

  const addStripe = !(isIndeterminate as boolean) && (hasStripe as boolean)

  return {
    ...(addStripe && stripeStyle),
    ...((isIndeterminate as boolean) ? { bgImage: gradient } : { bgColor })
  }
}

const baseStyleLabel: SystemStyleObject = {
  lineHeight: '1',
  fontSize: '0.25em',
  fontWeight: 'bold',
  fontFamily: 'heading',
  color: 'gray.300'
}

const baseStyleTrack: SystemStyleFunction = (props) => {
  return {
    borderRadius: 'md',
    bg: mode('gray.300', 'gray.700')(props)
  }
}

const baseStyleFilledTrack: SystemStyleFunction = (props) => {
  return {
    transitionProperty: 'dimensions',
    transitionDuration: 'slow',
    ...filledStyle(props)
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  label: baseStyleLabel,
  filledTrack: baseStyleFilledTrack(props),
  track: baseStyleTrack(props)
})

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  xs: {
    track: { h: '0.25rem' }
  },
  sm: {
    track: { h: '0.5rem' }
  },
  md: {
    track: { h: '0.75rem' }
  },
  lg: {
    track: { h: '1rem' }
  }
}

const defaultProps = {
  size: 'md',
  colorScheme: 'teal'
}

export default {
  parts: parts.keys,
  sizes,
  baseStyle,
  defaultProps
}
