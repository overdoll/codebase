import type { PartsStyleFunction, SystemStyleFunction } from '@chakra-ui/theme-tools'
import { mode } from '@chakra-ui/theme-tools'
import { formErrorAnatomy as parts } from '@chakra-ui/anatomy'

const baseStyleText: SystemStyleFunction = (props) => {
  return {
    color: mode('orange.500', 'orange.300')(props),
    mt: 1,
    fontSize: 'sm'
  }
}

const baseStyleIcon: SystemStyleFunction = (props) => {
  return {
    marginEnd: '0.5em',
    color: mode('orange.500', 'orange.300')(props)
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  text: baseStyleText(props),
  icon: baseStyleIcon(props)
})

export default {
  parts: parts.keys,
  baseStyle
}
