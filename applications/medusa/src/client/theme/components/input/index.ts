import type { PartsStyleFunction, PartsStyleObject, SystemStyleObject } from '@chakra-ui/theme-tools'
import { getColor, mode } from '@chakra-ui/theme-tools'
import { inputAnatomy as parts } from '@chakra-ui/anatomy'

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
      return 3
    default:
      return 1
  }
}

const baseStyle: PartsStyleObject<typeof parts> = {
  field: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transition: 'all 0.2s'
  }
}

const size: Record<string, SystemStyleObject> = {
  xl: {
    fontSize: 'xl',
    pt: 5,
    px: 3,
    h: 16,
    borderRadius: 'lg',
    fontWeight: 'semibold'
  },

  lg: {
    fontSize: 'lg',
    px: 4,
    h: 12,
    borderRadius: 'md',
    fontWeight: 'semibold'
  },

  md: {
    fontSize: 'md',
    px: 4,
    h: 10,
    borderRadius: 'semi',
    fontWeight: 'semibold'
  },

  sm: {
    fontSize: 'sm',
    px: 3,
    h: 8,
    borderRadius: 'base',
    fontWeight: 'semibold'
  },

  xs: {
    fontSize: 'xs',
    px: 2,
    h: 6,
    borderRadius: 'sm'
  }
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  xl: {
    field: size.xl,
    addon: size.xl
  },
  lg: {
    field: size.lg,
    addon: size.lg
  },
  md: {
    field: size.md,
    addon: size.md
  },
  sm: {
    field: size.sm,
    addon: size.sm
  },
  xs: {
    field: size.xs,
    addon: size.xs
  }
}

// errorBorderColor: 'orange.300',
// focusBorderColor: 'gray.300',
// borderColor: 'gray.800'

function getDefaults (props: Record<string, any>): Record<string, string> {
  const {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = props
  return {
    focusBorderColor: fc ?? mode('blue.700', 'pink.500')(props),
    errorBorderColor: ec ?? mode('red.500', 'orange.500')(props)
  }
}

const variantOutline: PartsStyleFunction<typeof parts> = (props) => {
  const {
    theme,
    size
  } = props
  const {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = getDefaults(props)

  return {
    field: {
      borderWidth: determineBorderWidth(size),
      borderColor: 'gray.500',
      bg: 'gray.900',
      _hover: {
        borderColor: mode('gray.300', 'gray.300')(props)
      },
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all'
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed'
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0 0 0 0.5px ${getColor(theme, ec) as string}`
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 0.5px ${getColor(theme, fc) as string}`,
        _invalid: {
          borderColor: getColor(theme, ec),
          boxShadow: `0 0 0 1px ${getColor(theme, ec) as string}`
        }
      }
    },
    addon: {
      border: 'none',
      bg: mode('gray.100', 'gray.500')(props),
      color: mode('gray.100', 'gray.100')(props)
    }
  }
}

const variantFilled: PartsStyleFunction<typeof parts> = (props) => {
  const {
    theme,
    size
  } = props
  const {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = getDefaults(props)

  return {
    field: {
      borderStyle: 'solid',
      borderWidth: determineBorderWidth(size),
      borderColor: 'transparent',
      bg: mode('gray.100', 'gray.800')(props),
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all'
      },
      _hover: {
        bg: mode('gray.100', 'gray.700')(props)
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed'
      },
      _invalid: {
        borderColor: getColor(theme, ec)
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        _invalid: {
          borderColor: getColor(theme, ec),
          boxShadow: `0 0 0 0.5px ${getColor(theme, ec) as string}`
        }
      }
    },
    addon: {
      border: '2px solid',
      borderColor: 'transparent',
      bg: mode('gray.100', 'gray.50')(props)
    }
  }
}

const variantFlushed: PartsStyleFunction<typeof parts> = (props) => {
  const { theme } = props
  const {
    focusBorderColor: fc,
    errorBorderColor: ec
  } = getDefaults(props)

  return {
    field: {
      borderBottom: '1px solid',
      borderColor: 'inherit',
      borderRadius: 0,
      px: 0,
      bg: 'transparent',
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all'
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, ec) as string}`
      },
      _focus: {
        borderColor: getColor(theme, fc),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, fc) as string}`
      }
    },
    addon: {
      borderBottom: '2px solid',
      borderColor: 'inherit',
      borderRadius: 0,
      px: 0,
      bg: 'transparent'
    }
  }
}

const variantUnstyled = {
  field: {
    bg: 'transparent',
    px: 0,
    height: 'auto'
  },
  addon: {
    bg: 'transparent',
    px: 0,
    height: 'auto'
  }
}

const variants = {
  outline: variantOutline,
  filled: variantFilled,
  flushed: variantFlushed,
  unstyled: variantUnstyled
}

const defaultProps = {
  size: 'md',
  variant: 'outline'
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  variants,
  defaultProps
}
