import { getColor, mode, SystemStyleFunction, SystemStyleObject, transparentize } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleObject = {
  px: 1,
  textTransform: 'uppercase',
  fontSize: 'xs',
  borderRadius: 'sm',
  fontWeight: 500
}

const variantSolid: SystemStyleFunction = (props) => {
  const {
    colorScheme: c,
    theme
  } = props
  const dark = transparentize(`${c}.500`, 0.3)(theme)
  return {
    bg: mode(`${c}.500`, dark)(props),
    color: mode('white', 'whiteAlpha.800')(props)
  }
}

const variantSubtle: SystemStyleFunction = (props) => {
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

const variantOutline: SystemStyleFunction = (props) => {
  const {
    colorScheme: c,
    theme
  } = props
  const darkColor = transparentize(`${c}.200`, 0.8)(theme)
  const lightColor = getColor(theme, `${c}.500`)
  const color = mode(lightColor, darkColor)(props)

  if (c === 'gray') {
    const grayColor = transparentize(`${c as string}.100`, 0.7)(theme)
    const grayColorBorder = mode(grayColor, grayColor)(props) as string
    return {
      color: grayColor,
      boxShadow: `inset 0 0 0px 2px ${grayColorBorder}`
    }
  }

  return {
    color,
    boxShadow: `inset 0 0 0px 2px ${color as string}`
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
