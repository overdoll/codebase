import { extendTheme } from '@chakra-ui/react'
import colors from './colors'
import typography from './typography'
import radius from './radius'
import breakpoints from './breakpoints'
import zIndices from './zIndex'
import sizes from './sizes'
import { spacing } from './spacing'
import shadows from './shadows'
import borders from './borders'
import transition from './transition'
import components from './components'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import glob from './global'

const theme = extendTheme({
  config: {
    cssVarPrefix: 'od',
    initialColorMode: 'dark'
  },
  colors: colors,
  ...typography,
  radii: radius,
  breakpoints,
  zIndices,
  sizes,
  shadows,
  space: spacing,
  borders,
  transition,
  components,
  styles: {
    global: glob
  }
})

export default theme
