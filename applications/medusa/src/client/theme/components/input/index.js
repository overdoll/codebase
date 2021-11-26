/**
 * @flow
 */

import { getColor, mode } from '@chakra-ui/theme-tools'

const determineBorderWidth = (size) => {
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

const parts = ['field', 'addon']

const baseStyle = {
  field: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transition: 'all 0.2s'
  }
}

const size = {

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
    borderRadius: 'base',
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

const sizes = {
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

function getDefaults (props) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode('blue.700', 'pink.500')(props),
    errorBorderColor: ec || mode('red.500', 'orange.500')(props)
  }
}

function variantOutline (props) {
  const { theme, size } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      borderWidth: determineBorderWidth(size),
      borderColor: 'gray.500',
      bg: 'inherit',
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
        boxShadow: `0 0 0 0.5px ${getColor(theme, ec)}`
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 0.5px ${getColor(theme, fc)}`,
        _invalid: {
          borderColor: getColor(theme, ec),
          boxShadow: `0 0 0 1px ${getColor(theme, ec)}`
        }
      }
    },
    addon: {
      border: '1px solid',
      borderColor: mode('inherit', 'gray.50')(props),
      bg: mode('gray.100', 'gray.300')(props)
    }
  }
}

function variantFilled (props) {
  const { theme, size } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

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
          boxShadow: `0 0 0 0.5px ${getColor(theme, ec)}`
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

function variantFlushed (props) {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

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
        boxShadow: `0px 1px 0px 0px ${getColor(theme, ec)}`
      },
      _focus: {
        borderColor: getColor(theme, fc),
        boxShadow: `0px 1px 0px 0px ${getColor(theme, fc)}`
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
  parts,
  baseStyle,
  sizes,
  variants,
  defaultProps
}
