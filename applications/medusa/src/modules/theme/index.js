import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    cssVarPrefix: 'od',
    initialColorMode: 'dark',
  },
});

export default theme;
