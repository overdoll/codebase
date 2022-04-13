const baseStyle = {
  opacity: 1,
  borderColor: 'gray.500',
  borderWidth: 3
}

const variantSolid = {
  borderStyle: 'solid'
}

const variantDashed = {
  borderStyle: 'dashed'
}

const variants = {
  solid: variantSolid,
  dashed: variantDashed
}

const defaultProps = {
  variant: 'solid'
}

export default {
  baseStyle,
  variants,
  defaultProps
}
