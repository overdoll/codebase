import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import typography from './typography';
import radius from './radius';

const theme = extendTheme({
  config: {
    cssVarPrefix: 'od',
    initialColorMode: 'dark',
  },
  colors: colors,
  fonts: typography,
  radii: radius,
});

export default theme;
