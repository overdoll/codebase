import React from 'react';
import darkTheme from './dark';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@//:modules/theme';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n';
import { Suspense } from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: darkTheme,
  },
};

export const decorators = [
  Story => (
    <Suspense fallback="">
      <I18nextProvider i18n={i18next}>
        <ChakraProvider theme={theme}>
          <Story />
        </ChakraProvider>
      </I18nextProvider>
    </Suspense>
  ),
];
