import { getColor, mode, PartsStyleFunction, StyleFunctionProps, transparentize } from '@chakra-ui/theme-tools'
import { alertAnatomy as parts } from '@chakra-ui/anatomy'

const baseStyle = {
  container: {
    px: 3,
    py: 3,
    borderRadius: 'base'
  },
  title: {
    fontWeight: 'bold',
    lineHeight: 6,
    marginEnd: 2
  },
  description: {
    lineHeight: 5,
    fontSize: 'sm'
  },
  icon: {
    flexShrink: 0,
    mr: 3,
    w: 5,
    h: 5
  }
}

function getBg (props: StyleFunctionProps): string {
  const {
    theme,
    colorScheme: c
  } = props

  const lightBg = getColor(theme, `${c}.100`, c)
  const darkBg = transparentize(`${c}.300`, 0.10)(theme)
  return mode(lightBg, darkBg)(props)
}

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    container: {
      bg: getBg(props)
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

const variantLeftAccent: PartsStyleFunction<typeof parts> = (props) => {
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

const variantTopAccent: PartsStyleFunction<typeof parts> = (props) => {
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

const variantSolidOriginal: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    container: {
      bg: mode(`${c}.500`, `${c}.200`)(props),
      color: mode('white', 'gray.900')(props)
    }
  }
}

const variantSolid: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
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
  parts: parts.keys,
  baseStyle,
  variants,
  defaultProps
}
