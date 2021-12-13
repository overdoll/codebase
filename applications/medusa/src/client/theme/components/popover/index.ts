import { mode, PartsStyleFunction, SystemStyleFunction, SystemStyleObject } from '@chakra-ui/theme-tools'
import { popoverAnatomy as parts } from '@chakra-ui/anatomy'

const baseStylePopper = {
  zIndex: 10
}

const baseStyleContent: SystemStyleFunction = (props) => {
  const bg = mode('white', 'gray.700')(props)
  const shadowColor = mode('gray.200', 'whiteAlpha.300')(props)

  return {
    bg: bg,
    width: 'xs',
    borderWidth: 0,
    borderColor: 'inherit',
    borderRadius: 'md',
    boxShadow: 'sm',
    zIndex: 'inherit',
    _focus: {
      outline: 0,
      boxShadow: 'outline'
    }
  }
}

const baseStyleHeader: SystemStyleObject = {
  px: 3,
  py: 2,
  borderBottomWidth: '1px'
}

const baseStyleBody: SystemStyleObject = {
  px: 3,
  py: 2
}

const baseStyleFooter: SystemStyleObject = {
  px: 3,
  py: 2,
  borderTopWidth: '1px'
}

const baseStyleCloseButton: SystemStyleObject = {
  position: 'absolute',
  borderRadius: 'md',
  top: 1,
  insetEnd: 2,
  padding: 2
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  popper: baseStylePopper,
  content: baseStyleContent(props),
  header: baseStyleHeader,
  body: baseStyleBody,
  footer: baseStyleFooter,
  arrow: {},
  closeButton: baseStyleCloseButton
})

export default {
  baseStyle
}
