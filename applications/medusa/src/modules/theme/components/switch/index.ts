import {
  mode,
  PartsStyleFunction,
  PartsStyleObject,
  SystemStyleFunction,
  SystemStyleObject
} from '@chakra-ui/theme-tools'
import { switchAnatomy as parts } from '@chakra-ui/anatomy'

const baseStyleTrack: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props

  return {
    borderRadius: 'base',
    p: '2px',
    width: 'var(--slider-track-width)',
    height: 'var(--slider-track-height)',
    transitionProperty: 'common',
    transitionDuration: 'fast',
    bg: mode('gray.300', 'whiteAlpha.400')(props),
    _focus: {
      boxShadow: 'outline'
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    },
    _checked: {
      bg: mode(`${c}.500`, `${c}.300`)(props)
    }
  }
}

const baseStyleThumb: SystemStyleObject = {
  bg: 'white',
  transitionProperty: 'transform',
  transitionDuration: 'normal',
  borderRadius: 'inherit',
  width: 'var(--slider-track-height)',
  height: 'var(--slider-track-height)',
  _checked: {
    transform: 'translateX(var(--slider-thumb-x))'
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  container: {
    '--slider-track-diff':
      'calc(var(--slider-track-width) - var(--slider-track-height))',
    '--slider-thumb-x': 'var(--slider-track-diff)',
    _rtl: {
      '--slider-thumb-x': 'calc(-1 * var(--slider-track-diff))'
    }
  },
  track: baseStyleTrack(props),
  thumb: baseStyleThumb
})

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    container: {
      '--slider-track-width': '1.375rem',
      '--slider-track-height': '0.75rem'
    }
  },
  md: {
    container: {
      '--slider-track-width': '1.875rem',
      '--slider-track-height': '1rem'
    }
  },
  lg: {
    container: {
      '--slider-track-width': '2.875rem',
      '--slider-track-height': '1.5rem'
    }
  }
}

const defaultProps = {
  size: 'md',
  colorScheme: 'red'
}

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps
}
