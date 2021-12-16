const baseStyleContainer = {
  borderWidth: 0,
  borderColor: 'inherit',
  _last: {
    borderWidth: 0
  }
}

const baseStyleButton = {
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

const baseStylePanel = {
  mt: 2,
  p: 3,
  bg: 'gray.800',
  borderRadius: 'base'
}

const baseStyleIcon = {
  fontSize: '1.25em'
}

const baseStyle = {
  container: baseStyleContainer,
  button: baseStyleButton,
  panel: baseStylePanel,
  icon: baseStyleIcon
}

const defaultProps = {
  allowToggle: true
}

export default {
  baseStyle,
  defaultProps
}
