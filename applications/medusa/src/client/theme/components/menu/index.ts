import { mode, PartsStyleFunction, SystemStyleFunction, SystemStyleObject } from '@chakra-ui/theme-tools'
import { menuAnatomy as parts } from '@chakra-ui/anatomy'

const baseStyleList: SystemStyleFunction = (props) => {
  return {
    bg: mode('#fff', 'gray.800')(props),
    boxShadow: mode('sm', 'lg')(props),
    color: 'inherit',
    minW: '4xs',
    py: '2',
    zIndex: 'popover',
    borderRadius: 'md',
    borderWidth: '0px'
  }
}

const baseStyleItem: SystemStyleFunction = (props) => {
  return {
    py: '0.4rem',
    px: '0.8rem',
    letterSpacing: 'wide',
    transition: 'background 50ms ease-in 0s',
    fontWeight: 'semibold',
    _focus: {
      bg: mode('gray.100', 'gray.500')(props)
    },
    _active: {
      bg: mode('gray.200', 'gray.700')(props)
    },
    _expanded: {
      bg: mode('gray.100', 'gray.700')(props)
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  }
}

const baseStyleGroupTitle: SystemStyleObject = {
  mx: 4,
  my: 2,
  fontWeight: 'semibold',
  fontSize: 'sm'
}

const baseStyleCommand: SystemStyleObject = {
  opacity: 0.6
}

const baseStyleDivider: SystemStyleObject = {
  border: 0,
  borderBottom: '1px solid',
  borderColor: 'inherit',
  my: '0.5rem',
  opacity: 0.6
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  list: baseStyleList(props),
  item: baseStyleItem(props),
  groupTitle: baseStyleGroupTitle,
  command: baseStyleCommand,
  divider: baseStyleDivider
})

export default {
  parts: parts.keys,
  baseStyle
}
