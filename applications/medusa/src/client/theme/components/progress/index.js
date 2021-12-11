import { generateStripe, getColor, mode } from '@chakra-ui/theme-tools'

const parts = ['track', 'filledTrack', 'label']

function filledStyle (props) {
  const { colorScheme: c, theme: t, isIndeterminate, hasStripe } = props

  const stripeStyle = mode(
    generateStripe(),
    generateStripe('1rem', 'rgba(0,0,0,0.1)')
  )(props)

  const bgColor = mode(`${c}.500`, `${c}.500`)(props)

  const gradient = `linear-gradient(
    to right,
    transparent 0%,
    ${getColor(t, bgColor)} 50%,
    transparent 100%
  )`

  const addStripe = !isIndeterminate && hasStripe

  return {
    ...(addStripe && stripeStyle),
    ...(isIndeterminate ? { bgImage: gradient } : { bgColor })
  }
}

const baseStyleLabel = {
  lineHeight: '1',
  fontSize: '0.25em',
  fontWeight: 'bold',
  fontFamily: 'heading',
  color: 'gray.300'
}

function baseStyleTrack (props) {
  return {
    borderRadius: 'md',
    bg: mode('gray.300', 'gray.700')(props)
  }
}

function baseStyleFilledTrack (props) {
  return {
    transitionProperty: 'common',
    transitionDuration: 'slow',
    ...filledStyle(props)
  }
}

const baseStyle = (props) => ({
  label: baseStyleLabel,
  filledTrack: baseStyleFilledTrack(props),
  track: baseStyleTrack(props)
})

const sizes = {
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
  parts,
  sizes,
  baseStyle,
  defaultProps
}
