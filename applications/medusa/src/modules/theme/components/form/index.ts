import { mode, PartsStyleFunction, SystemStyleFunction } from '@chakra-ui/theme-tools'
import { formAnatomy as parts } from '@chakra-ui/anatomy'

const baseStyleRequiredIndicator: SystemStyleFunction = (props) => {
  return {
    marginStart: 1,
    color: mode('red.500', 'orange.300')(props)
  }
}

const baseStyleHelperText: SystemStyleFunction = (props) => {
  return {
    lineHeight: 'normal',
    fontSize: 'md',
    color: 'gray.200',
    mt: 1,
    display: 'flex',
    alignItems: 'center'
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  requiredIndicator: baseStyleRequiredIndicator(props),
  helperText: baseStyleHelperText(props)
})

export default {
  parts: parts.keys,
  baseStyle
}
