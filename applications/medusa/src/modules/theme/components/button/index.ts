import type { SystemStyleFunction, SystemStyleObject } from '@chakra-ui/theme-tools'
import { getColor, mode, transparentize } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleObject = {
  lineHeight: '1.2',
  borderRadius: 'md',
  fontWeight: 'bold',
  fontFamily: 'body',
  letterSpacing: 'wide',
  _focus: {
    boxShadow: 'outline'
  },
  _disabled: {
    cursor: 'not-allowed',
    boxShadow: 'none'
  },
  _hover: {
    _disabled: {
      bg: 'initial'
    }
  }
}

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props
  const { theme } = props

  if (c === 'gray') {
    const bg = mode('gray.500', 'gray.700')(props)

    return {
      bg,
      _hover: {
        bg: mode('gray.200', 'gray.600')(props),
        color: mode('gray.200', 'gray.100')(props),
        _disabled: {
          bg,
          color: mode('gray.200', 'gray.100')(props)
        }
      },
      _active: {
        bg: mode('gray.300', 'gray.800')(props),
        color: mode('gray.200', 'gray.200')(props)
      }
    }
  }

  if (c === 'white') {
    const bg = 'white'

    return {
      bg,
      color: mode('gray.200', 'gray.900')(props),
      _hover: {
        opacity: 0.8,
        _disabled: {
          bg,
          color: mode('gray.200', 'gray.100')(props)
        }
      },
      _active: {
        opacity: 1,
        bg: mode('gray.300', 'white')(props),
        boxShadow: `0 0 0 2.5px ${getColor(theme, transparentize('white', 0.7)(theme)) as string}`
      }
    }
  }

  const {
    bg = `${c}.500`,
    color = 'white'
  } = accessibleColorMap[c] ?? {}

  return {
    fontWeight: 'extrabold',
    bg: c === 'primary' ? mode(color, `${c}.400`)(props) : mode(color, `${c}.300`)(props),
    color: mode(color, `${c}.900`)(props),
    _hover: {
      bg: c === 'primary' ? mode(bg, transparentize(`${c}.400`, 0.9)(theme))(props) : mode(bg, transparentize(`${c}.300`, 0.9)(theme))(props),
      _disabled: {
        bg: mode(bg, `${c}.400`)(props)
      }
    },
    _active: {
      bg: c === 'primary' ? mode(color, `${c}.400`)(props) : mode(color, `${c}.300`)(props),
      boxShadow: `0 0 0 2.5px ${getColor(theme, transparentize(c === 'primary' ? `${c}.500` : `${c}.400`, 0.7)(theme)) as string}`
    }
  }
}

const variantGhost: SystemStyleFunction = (props) => {
  const {
    colorScheme: c,
    theme
  } = props

  if (c === 'gray') {
    return {
      bg: 'transparent',
      color: mode('inherit', 'gray.100')(props),
      _hover: {
        bg: 'transparent',
        color: mode('gray.200', 'gray.100')(props)
      },
      _active: {
        bg: 'transparent',
        color: mode('gray.300', 'gray.100')(props)
      }
    }
  }

  return {
    color: mode(`${c}.600`, `${c}.300`)(props),
    bg: 'transparent',
    _hover: {
      bg: 'dimmers.100',
      color: mode(`${c}.50`, `${c}.300`)(props)
    },
    _active: {
      bg: 'dimmers.100',
      boxShadow: `0 0 0 3px ${getColor(theme, transparentize(`${c}.300`, 0.25)(theme)) as string}`,
      color: mode(`${c}.50`, `${c}.300`)(props)
    }
  }
}

const variantOutline: SystemStyleFunction = (props) => {
  const {
    colorScheme: c,
    size
  } = props
  const { theme } = props
  const borderColor = mode('gray.200', 'gray.300')(props)
  const combinedColor = mode(`${c}.200`, `${c}.500`)(props)

  const determineBorderWidth = (size): number => {
    switch (size) {
      case 'xs':
        return 1
      case 'sm':
        return 2
      case 'md':
        return 2
      case 'lg':
        return 3
      case 'xl':
        return 4
      default:
        return 1
    }
  }

  if (c === 'gray') {
    return {
      borderStyle: 'solid',
      borderWidth: determineBorderWidth(size),
      color: mode('inherit', 'gray.100')(props),
      _hover: {
        bg: mode('gray.100', 'gray.500')(props)
      },
      _active: {
        bg: mode('gray.200', 'gray.700')(props)
      }
    }
  }

  return {
    borderStyle: 'solid',
    borderWidth: determineBorderWidth(size),
    color: c === 'gray' ? borderColor : combinedColor,
    bg: 'transparent',
    _hover: {
      color: mode(`${c}.50`, `${c}.500`)(props),
      bg: 'transparent'
    },
    _active: {
      color: mode(`${c}.100`, `${c}.400`)(props),
      bg: 'transparent',
      boxShadow: `0 0 0 3px ${getColor(theme, transparentize(`${c}.400`, 0.25)(theme)) as string}`
    },
    _disabled: {
      borderStyle: 'dashed'
    }
  }
}

interface AccessibleColor {
  bg?: string
  color?: string
  hoverBg?: string
  activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: 'yellow.400',
    color: 'black',
    hoverBg: 'yellow.500',
    activeBg: 'yellow.600'
  },
  red: {
    bg: 'red.400',
    color: 'black',
    hoverBg: 'red.500',
    activeBg: 'red.600'
  }
}

const variantLink: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props
  const { theme } = props

  if (c === 'gray') {
    return {
      padding: 0,
      height: 'auto',
      lineHeight: 'normal',
      verticalAlign: 'baseline',
      fontFamily: 'body',
      fontWeight: 'normal',
      color: mode(`${c}.500`, 'gray.100')(props),
      _hover: {
        textDecoration: 'underline',
        _disabled: {
          textDecoration: 'none'
        }
      },
      _active: {
        boxShadow: `0 0 0 3px ${getColor(theme, transparentize(`${c}.400`, 0.25)(theme)) as string}`,
        color: mode(`${c}.700`, 'gray.200')(props)
      }
    }
  }

  return {
    padding: 0,
    height: 'auto',
    lineHeight: 'normal',
    verticalAlign: 'baseline',
    fontFamily: 'body',
    fontWeight: 'normal',
    color: mode(`${c}.500`, `${c}.400`)(props),
    _hover: {
      _disabled: {
        textDecoration: 'none'
      }
    },
    _active: {
      boxShadow: `0 0 0 3px ${getColor(theme, transparentize(`${c}.400`, 0.25)(theme)) as string}`,
      color: mode(`${c}.700`, `${c}.600`)(props)
    }
  }
}

const variantPanel: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  if (c === 'gray') {
    const bg = mode('gray.500', 'gray.800')(props)

    return {
      bg,
      display: 'inline',
      lineHeight: 'inherit',
      m: 0,
      p: 3,
      _hover: {
        bg: mode('gray.200', 'gray.700')(props),
        _disabled: {
          bg
        }
      },
      _active: { bg: mode('gray.300', 'gray.800')(props) }
    }
  }

  const {
    bg = `${c}.500`,
    color = 'white',
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`
  } = accessibleColorMap[c] ?? {}

  const background = mode(bg, 'gray.800')(props)

  return {
    bg: background,
    color: mode(color, `${c}.500`)(props),
    display: 'inline',
    lineHeight: 'inherit',
    m: 0,
    p: 3,
    _hover: {
      bg: background,
      color: mode(hoverBg, `${c}.400`)(props),
      _disabled: {
        bg: background
      }
    },
    _active: {
      bg: background,
      color: mode(activeBg, `${c}.600`)(props)
    }
  }
}

const variantUnstyled = {
  bg: 'none',
  color: 'inherit',
  display: 'inline',
  lineHeight: 'inherit',
  m: 0,
  p: 0
}

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  panel: variantPanel,
  unstyled: variantUnstyled
}

const sizes = {
  xl: {
    h: 16,
    minW: 14,
    fontSize: '2xl',
    fontWeight: 'extrabold',
    px: 6,
    borderRadius: '2xl'
  },
  lg: {
    h: 12,
    minW: 12,
    fontSize: 'lg',
    borderRadius: 'lg',
    px: 6,
    fontWeight: 'bold'
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: 'md',
    px: 5,
    borderRadius: 'semi',
    fontWeight: 'semibold'
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: 'sm',
    px: 3,
    borderRadius: 'semi',
    fontWeight: 'semibold'
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: 'xs',
    px: 2,
    borderRadius: 'sm',
    fontWeight: 'normal'
  }
}

const defaultProps = {
  variant: 'solid',
  size: 'md',
  colorScheme: 'gray'
}

export default {
  baseStyle,
  variants,
  sizes,
  defaultProps
}
