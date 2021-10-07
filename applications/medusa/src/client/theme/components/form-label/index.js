const baseStyle = {
  fontWeight: 'semibold',
  fontFamily: 'heading',
  fontSize: 'md',
  marginEnd: 2,
  mb: 1,
  color: 'gray.00',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
}

const variants = {
  float: {
    position: 'absolute',
    pl: 3,
    pt: 2,
    transform: 'translateX(3.5%)'
  }
}

export default {
  baseStyle,
  variants
}
