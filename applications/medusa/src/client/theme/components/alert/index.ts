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

function getBg (props): any {
  const {
    theme,
    colorScheme: c
  } = props
  const lightBg = getColor(theme, `${c as string}.100`, c)
  const darkBg = transparentize(`${c as string}.300`, 0.10)(theme)
  return mode(lightBg, darkBg)(props)
}

function getBorder (props): any {
  const {
    theme,
    colorScheme: c
  } = props
  const lightBg = getColor(theme, `${c as string}.100`, c)
  const darkBg = transparentize(`${c as string}.300`, 0.5)(theme)
  return mode(lightBg, darkBg)(props)
}

function variantSubtle (props): any {
  const { colorScheme: c } = props
  return {
    container: {
      bg: getBg(props),
      borderWidth: 2,
      borderColor: getBorder(props)
    },
    icon: { color: mode(`${c as string}.500`, `${c as string}.300`)(props) },
    title: {
      color: mode(`${c as string}.500`, `${c as string}.300`)(props)
    },
    description: {
      color: mode(`${c as string}.500`, `${c as string}.300`)(props)
    }
  }
}

function variantLeftAccent (props): any {
  const { colorScheme: c } = props
  return {
    container: {
      paddingStart: 3,
      borderStartWidth: '4px',
      borderStartColor: mode(`${c as string}.500`, `${c as string}.200`)(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(`${c as string}.500`, `${c as string}.200`)(props)
    }
  }
}

function variantTopAccent (props): any {
  const { colorScheme: c } = props
  return {
    container: {
      pt: 2,
      borderTopWidth: '4px',
      borderTopColor: mode(`${c as string}.500`, `${c as string}.200`)(props),
      bg: getBg(props)
    },
    icon: {
      color: mode(`${c as string}.500`, `${c as string}.200`)(props)
    }
  }
}

function variantSolidOriginal (props): any {
  const { colorScheme: c } = props
  return {
    container: {
      bg: mode(`${c as string}.500`, `${c as string}.200`)(props),
      color: mode('white', 'gray.900')(props)
    }
  }
}

function variantSolid (props): any {
  const { colorScheme: c } = props
  return {
    boxShadow: 'none',
    container: {
      paddingStart: 3,
      borderStartWidth: '4px',
      borderStartColor: mode(`${c as string}.500`, `${c as string}.500`)(props),
      bg: mode(`${c as string}.500`, 'gray.800')(props),
      color: mode('white', 'gray.00')(props)
    },
    icon: {
      color: mode(`${c as string}.500`, `${c as string}.500`)(props),
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
