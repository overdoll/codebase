import { mode } from '@chakra-ui/theme-tools';

const baseStylePopper = {
  zIndex: 10
}

const baseStyleContent = (props) => {
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

const baseStyleHeader = {
  px: 3,
  py: 2,
  borderBottomWidth: '1px'
}

const baseStyleBody = {
  px: 3,
  py: 2
}

const baseStyleFooter = {
  px: 3,
  py: 2,
  borderTopWidth: '1px'
}

const baseStyleCloseButton = {
  position: 'absolute',
  borderRadius: 'md',
  top: 1,
  insetEnd: 2,
  padding: 2
}

const baseStyle = (props) => ({
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
