import { getColor, mode, transparentize } from '@chakra-ui/theme-tools'

const parts = ['container', 'title', 'description', 'icon']

const baseStyle = {
  container: {
    px: 3,
    py: 3,
    borderRadius: 5
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 6,
    marginEnd: 2
  },
  description: {
    lineHeight: 6
  },
  icon: {
    flexShrink: 0,
    mr: 3,
    w: 5,
    h: 5
  }
}

function getBg (props) {
  const { theme, colorScheme: c } = props
  const lightBg = getColor(theme, `${c}.100`, c)
  const darkBg = transparentize(`${c}.300`, 0.10)(theme)
  return mode(lightBg, darkBg)(props)
}

function getBorder (props) {
  const { theme, colorScheme: c } = props
  const lightBg = getColor(theme, `${c}.100`, c)
  const darkBg = transparentize(`${c}.300`, 0.5)(theme)
  return mode(lightBg, darkBg)(props)
}

function variantSubtle (props) {
  const { colorScheme: c } = props
  return {
    container: {
      bg: getBg(props),
      borderWidth: 2,
      borderColor: getBorder(props)
    },
    icon: { color: mode(`${c}.500`, `${c}.300`)(props) },
    title: {
      color: mode(`${c}.500`, `${c}.300`)(props)
    },
    description: {
      color: mode(`${c}.500`, `${c}.300`)(props)
    }
  }
}

function variantLeftAccent (props) {
  const { colorScheme: c } = props
  return {
    container: {
      paddingStart: 3,
      borderStartWidth: '4px',
      borderStartColor: mode(`${c}.500`, `${c}.200`)(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(`${c}.500`, `${c}.200`)(props)
    }
  }
}

function variantTopAccent (props) {
  const { colorScheme: c } = props
  return {
    container: {
      pt: 2,
      borderTopWidth: '4px',
      borderTopColor: mode(`${c}.500`, `${c}.200`)(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(`${c}.500`, `${c}.200`)(props)
    }
  }
}

function variantSolidOriginal (props) {
  const { colorScheme: c } = props
  return {
    container: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      color: mode('white', 'gray.900')(props)
    }
  }
}

function variantSolid (props) {
  const { colorScheme: c } = props
  return {
    boxShadow: 'none',
    container: {
      paddingStart: 3,
      borderStartWidth: '4px',
      borderStartColor: mode(`${c}.500`, `${c}.500`)(props),
      bg: mode(`${c}.500`, 'gray.800')(props),
      color: mode('white', 'gray.00')(props)
    },
    icon: {
      color: mode(`${c}.500`, `${c}.500`)(props),
      width: 4,
      height: 4,
      marginTop: 1
    },
    title: {
      fontWeight: 'normal'
    }
  }
}

const variants = {
  subtle: variantSubtle,
  'solid-base': variantSolidOriginal,
  'left-accent': variantLeftAccent,
  'top-accent': variantTopAccent,
  solid: variantSolid
}

const defaultProps = {
  variant: 'subtle',
  colorScheme: 'teal'
}

export default {
  parts,
  baseStyle,
  variants,
  defaultProps
}
