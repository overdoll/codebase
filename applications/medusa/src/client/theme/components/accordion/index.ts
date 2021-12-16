import { accordionAnatomy as parts } from '@chakra-ui/anatomy'
import type { PartsStyleObject, SystemStyleObject } from '@chakra-ui/theme-tools'

const baseStyleContainer: SystemStyleObject = {
  borderWidth: 0,
  borderColor: 'inherit',
  _last: {
    borderWidth: 0
  }
}

const baseStyleButton: SystemStyleObject = {
  transitionProperty: 'common',
  transitionDuration: 'normal',
  bg: 'gray.800',
  fontSize: '1rem',
  borderRadius: 'base',
  _focus: {
    boxShadow: 'outline'
  },
  _hover: {
    bg: 'gray.700'
  },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed'
  },
  p: 3
}

const baseStylePanel: SystemStyleObject = {
  mt: 2,
  p: 3,
  bg: 'gray.800',
  borderRadius: 'base'
}

const baseStyleIcon: SystemStyleObject = {
  fontSize: '1.25em'
}

const baseStyle: PartsStyleObject<typeof parts> = {
  container: baseStyleContainer,
  button: baseStyleButton,
  panel: baseStylePanel,
  icon: baseStyleIcon
}

export default {
  parts: parts.keys,
  baseStyle
}
