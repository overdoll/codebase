import { getColor, mode, transparentize } from '@chakra-ui/theme-tools'

const baseStyle = {
  px: 1,
  textTransform: 'uppercase',
  fontSize: 'xs',
  borderRadius: 'sm',
  fontWeight: 500
}

function variantSolid (props) {
  const { colorScheme: c, theme } = props
  const dark = transparentize(`${c}.500`, 0.3)(theme)
  return {
    bg: mode(`${c}.500`, dark)(props),
    color: mode('white', 'whiteAlpha.800')(props)
  }
}

function variantSubtle (props) {
  const { colorScheme: c } = props

  if (c === 'gray') {
    return {
      bg: mode(`${c}.50`, `${c}.700`)(props),
      color: mode(`${c}.800`, `${c}.100`)(props)
    }
  }
  return {
    bg: mode(`${c}.100`, `${c}.50`)(props),
    color: mode(`${c}.800`, `${c}.300`)(props)
  }
}

function variantOutline (props) {
  const { colorScheme: c, theme } = props
  const darkColor = transparentize(`${c}.200`, 0.8)(theme)
  const lightColor = getColor(theme, `${c}.500`)
  const color = mode(lightColor, darkColor)(props)

  return {
    color,
    boxShadow: `inset 0 0 0px 1px ${color}`
  }
}

const variants = {
  solid: variantSolid,
  subtle: variantSubtle,
  outline: variantOutline
}

const defaultProps = {
  variant: 'subtle',
  colorScheme: 'gray'
}

export default {
  baseStyle,
  variants,
  defaultProps
}
