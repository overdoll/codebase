import React, { Suspense } from 'react'
import darkTheme from './dark'
import theme from '../src/modules/theme'
import { ChakraProvider } from '@chakra-ui/react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: darkTheme
  }
}

export const decorators = [
  Story => (
    <Suspense fallback="">
      <ChakraProvider theme={theme}>
        <Story/>
      </ChakraProvider>
    </Suspense>
  )
]
