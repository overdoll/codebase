/**
 * @flow
 */
import { mode, transparentize } from '@chakra-ui/theme-tools';

const baseStyle = {
  lineHeight: '1.2',
  borderRadius: 'md',
  fontWeight: 'medium',
  _focus: {
    boxShadow: 'outline',
  },
  _disabled: {
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  _hover: {
    _disabled: {
      bg: 'initial',
    },
  },
};

function variantGhost(props) {
  const { colorScheme: c, theme } = props;

  if (c === 'gray') {
    return {
      color: mode(`inherit`, `gray.100`)(props),
      _hover: {
        bg: mode(`gray.100`, `gray.200`)(props),
      },
      _active: { bg: mode(`gray.200`, `gray.300`)(props) },
    };
  }

  const darkHoverBg = `${c}.400`;
  const darkActiveBg = `${c}.600`;

  return {
    color: mode(`${c}.600`, `${c}.500`)(props),
    bg: 'transparent',
    _hover: {
      color: mode(`${c}.50`, darkHoverBg)(props),
    },
    _active: {
      color: mode(`${c}.100`, darkActiveBg)(props),
    },
  };
}

function variantOutline(props) {
  const { colorScheme: c } = props;
  const borderColor = mode(`gray.200`, `gray.300`)(props);
  const combinedColor = mode(`${c}.200`, `${c}.500`)(props);

  if (c === 'gray') {
    return {
      borderStyle: 'solid',
      borderWidth: 3.5,
      color: mode(`inherit`, `gray.100`)(props),
      _hover: {
        bg: mode(`gray.100`, `gray.200`)(props),
      },
      _active: {
        bg: mode(`gray.200`, `gray.300`)(props),
      },
    };
  }

  return {
    borderStyle: 'solid',
    borderWidth: 3.5,
    color: c === 'gray' ? borderColor : combinedColor,
    bg: 'transparent',
    _hover: {
      color: mode(`${c}.50`, `${c}.400`)(props),
      bg: 'transparent',
    },
    _active: {
      color: mode(`${c}.100`, `${c}.600`)(props),
      bg: 'transparent',
    },
  };
}

type AccessibleColor = {
  bg?: string,
  color?: string,
  hoverBg?: string,
  activeBg?: string,
};

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: 'yellow.400',
    color: 'black',
    hoverBg: 'yellow.500',
    activeBg: 'yellow.600',
  },
  red: {
    bg: 'red.400',
    color: 'black',
    hoverBg: 'red.500',
    activeBg: 'red.600',
  },
};

function variantSolid(props) {
  const { colorScheme: c } = props;

  if (c === 'gray') {
    const bg = mode(`gray.500`, `gray.700`)(props);

    return {
      bg,
      _hover: {
        bg: mode(`gray.200`, `gray.600`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.300`, `gray.800`)(props) },
    };
  }

  const {
    bg = `${c}.500`,
    color = 'white',
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] || {};

  const background = mode(bg, `gray.700`)(props);

  return {
    bg: background,
    color: mode(color, `${c}.500`)(props),
    _hover: {
      bg: background,
      color: mode(hoverBg, `${c}.400`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: {
      bg: background,
      color: mode(activeBg, `${c}.600`)(props),
    },
  };
}

function variantLink(props) {
  const { colorScheme: c } = props;
  return {
    padding: 0,
    height: 'auto',
    lineHeight: 'normal',
    verticalAlign: 'baseline',
    color: mode(`${c}.500`, `${c}.100`)(props),
    _hover: {
      textDecoration: 'underline',
      _disabled: {
        textDecoration: 'none',
      },
    },
    _active: {
      color: mode(`${c}.700`, `${c}.500`)(props),
    },
  };
}

const variantUnstyled = {
  bg: 'none',
  color: 'inherit',
  display: 'inline',
  lineHeight: 'inherit',
  m: 0,
  p: 0,
};

const variants = {
  ghost: variantGhost,
  outline: variantOutline,
  solid: variantSolid,
  link: variantLink,
  unstyled: variantUnstyled,
};

const sizes = {
  xl: {
    h: 16,
    minW: 14,
    fontSize: '2xl',
    fontWeight: 'medium',
    px: 6,
    borderRadius: 12,
  },
  lg: {
    h: 12,
    minW: 12,
    fontSize: 'lg',
    px: 6,
  },
  md: {
    h: 10,
    minW: 10,
    fontSize: 'md',
    px: 4,
  },
  sm: {
    h: 8,
    minW: 8,
    fontSize: 'sm',
    px: 3,
  },
  xs: {
    h: 6,
    minW: 6,
    fontSize: 'xs',
    px: 2,
  },
};

const defaultProps = {
  variant: 'solid',
  size: 'md',
  colorScheme: 'gray',
};

export default {
  baseStyle,
  variants,
  sizes,
  defaultProps,
};
