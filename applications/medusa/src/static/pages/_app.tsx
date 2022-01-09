import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

import theme from '../../client/theme'

function MyApp ({
  Component,
  pageProps
}: any): ReactNode {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
