import { mode, PartsStyleFunction, SystemStyleFunction, SystemStyleObject } from '@chakra-ui/theme-tools'
import { selectAnatomy as parts } from '@chakra-ui/anatomy'
import { mergeWith as merge } from '@chakra-ui/utils'
import Input from '../input'

const baseStyleField: SystemStyleFunction = (props) => {
  return {
    ...Input.baseStyle.field,
    appearance: 'none',
    paddingBottom: '1px',
    lineHeight: 'normal',
    '> option, > optgroup': {
      bg: mode('white', 'gray.700')(props)
    }
  }
}

const baseStyleIcon: SystemStyleObject = {
  width: '1.5rem',
  height: '100%',
  insetEnd: '0.5rem',
  position: 'relative',
  color: 'currentColor',
  fontSize: '1.25rem',
  _disabled: {
    opacity: 0.5
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  field: baseStyleField(props),
  icon: baseStyleIcon
})

const sizes = merge({}, Input.sizes, {
  xs: {
    icon: {
      insetEnd: '0.25rem'
    }
  }
})

export default {
  parts: parts.keys,
  baseStyle,
  sizes,
  variants: Input.variants,
  defaultProps: Input.defaultProps
}
