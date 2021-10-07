const baseStyle = {
  fontFamily: 'heading',
  fontWeight: 'bold'
}

const sizes = {
  '4xl': {
    letterSpacing: 'wide',
    fontSize: ['6xl', null, '7xl'],
    lineHeight: 1
  },
  '3xl': {
    letterSpacing: 'wide',
    fontSize: ['5xl', null, '6xl'],
    lineHeight: 1
  },
  '2xl': {
    letterSpacing: 'wide',
    fontSize: ['4xl', null, '5xl'],
    lineHeight: [1.2, null, 1]
  },
  xl: {
    letterSpacing: 'wide',
    fontSize: ['3xl', null, '4xl'],
    lineHeight: [1.33, null, 1.2]
  },
  lg: {
    letterSpacing: 'wide',
    fontSize: ['2xl', null, '3xl'],
    lineHeight: [1.33, null, 1.2]
  },
  md: { fontWeight: 'semibold', fontSize: 'xl', lineHeight: 1.2 },
  sm: { fontWeight: 'semibold', fontSize: 'md', lineHeight: 1.2 },
  xs: { fontWeight: 'semibold', fontSize: 'sm', lineHeight: 1.2 }
}

const defaultProps = {
  size: 'xl'
}

export default {
  baseStyle,
  sizes,
  defaultProps
}
