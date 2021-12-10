import { mode } from '@chakra-ui/theme-tools';

const parts = ['text', 'icon']

function baseStyleText (props) {
  return {
    color: mode('orange.500', 'orange.300')(props),
    mt: 1,
    fontSize: 'sm'
  }
}

function baseStyleIcon (props) {
  return {
    marginEnd: '0.5em',
    color: mode('orange.500', 'orange.300')(props)
  }
}

const baseStyle = (props) => ({
  text: baseStyleText(props),
  icon: baseStyleIcon(props)
})

export default {
  parts,
  baseStyle
}
