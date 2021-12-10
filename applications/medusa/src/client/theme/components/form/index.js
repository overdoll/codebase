import { mode } from '@chakra-ui/theme-tools';

const parts = ['requiredIndicator', 'helperText']

function baseStyleRequiredIndicator (props) {
  return {
    marginStart: 1,
    color: mode('red.500', 'orange.300')(props)
  }
}

function baseStyleHelperText (props) {
  return {
    lineHeight: 'normal',
    fontSize: 'md',
    color: 'orange.300',
    pl: 1,
    h: 8
  }
}

const baseStyle = (props) => ({
  requiredIndicator: baseStyleRequiredIndicator(props),
  helperText: baseStyleHelperText(props)
})

export default {
  parts,
  baseStyle
}
