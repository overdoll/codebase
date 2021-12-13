import {
  isDark,
  mode,
  PartsStyleFunction,
  PartsStyleObject,
  randomColor,
  SystemStyleFunction
} from '@chakra-ui/theme-tools'
import { avatarAnatomy as parts } from '@chakra-ui/anatomy'
import themeSizes from '../../sizes'

const baseStyleBadge: SystemStyleFunction = (props) => {
  return {
    transform: 'translate(25%, 25%)',
    border: '0.2em solid',
    borderColor: mode('white', 'gray.800')(props)
  }
}

const baseStyleExcessLabel: SystemStyleFunction = (props) => {
  return {
    bg: mode('gray.200', 'whiteAlpha.400')(props)
  }
}

const baseStyleContainer: SystemStyleFunction = (props) => {
  const {
    name,
    theme
  } = props
  const bg = ((name as string) !== '') ? randomColor({ string: name }) : 'gray.400'
  const isBgDark = isDark(bg)(theme)

  let color = 'white'
  if (!isBgDark) color = 'gray.800'

  const borderColor = mode('white', 'gray.800')(props)

  return {
    bg,
    color,
    borderColor,
    verticalAlign: 'top'
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  badge: baseStyleBadge(props),
  excessLabel: baseStyleExcessLabel(props),
  container: baseStyleContainer(props)
})

function getSize (size: string): PartsStyleObject<typeof parts> {
  const themeSize = themeSizes[size]
  return {
    container: {
      width: size,
      height: size,
      fontSize: `calc(${themeSize as string ?? size} / 2.5)`
    },
    excessLabel: {
      width: size,
      height: size
    },
    label: {
      fontSize: `calc(${themeSize as string ?? size} / 2.5)`,
      lineHeight: size !== '100%' ? themeSize ?? size : undefined
    }
  }
}

const sizes = {
  '2xs': getSize('4'),
  xs: getSize('6'),
  sm: getSize('8'),
  md: getSize('12'),
  lg: getSize('16'),
  xl: getSize('24'),
  '2xl': getSize('32'),
  full: getSize('100%')
}

const defaultProps = {
  size: 'md'
}

export default {
  baseStyle,
  sizes,
  defaultProps
}
