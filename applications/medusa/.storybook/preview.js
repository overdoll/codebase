import React from 'react';
import darkTheme from './dark';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@//:modules/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: darkTheme,
  },
};

export const decorators = [
  Story => (
    <ChakraProvider theme={theme}>
      <Story />
    </ChakraProvider>
  ),
];
