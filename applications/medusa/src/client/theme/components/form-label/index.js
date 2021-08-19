const baseStyle = {
  fontSize: 'md',
  marginEnd: 2,
  mb: 1,
  color: 'gray.00',
  fontWeight: 'medium',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  opacity: 1,
  _disabled: {
    opacity: 0.4
  }
}

const variants = {
  float: {
    fontFamily: 'heading',
    position: 'absolute',
    fontSize: 'm',
    pl: 3,
    pt: 2,
    transform: 'translateX(3.5%)'
  }
}

export default {
  baseStyle,
  variants
}
